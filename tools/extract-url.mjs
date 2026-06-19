#!/usr/bin/env node
/**
 * hiyf-extract-url — copy the design language of a LIVE site (no codebase needed).
 *
 *   node tools/extract-url.mjs https://example.com [--json inv.json]
 *   node tools/synthesize.mjs inv.json --out hiyf.theme.css
 *
 * Drives a real browser and reads COMPUTED styles from the rendered DOM (colors by
 * role, fonts, sizes, weights, radius, spacing, shadows) plus any :root CSS custom
 * properties — i.e. what the site actually ships, not guesses. Output matches the
 * inventory shape tools/synthesize.mjs consumes, so the same theme synthesis runs
 * on top. (Set PUPPETEER_EXECUTABLE_PATH to override the browser.)
 */
import { writeFileSync, existsSync } from 'node:fs'
import puppeteer from 'puppeteer-core'

const url = process.argv[2]
if (!url || !/^https?:\/\//.test(url)) {
  console.error('usage: node tools/extract-url.mjs <https url> [--json inv.json]')
  process.exit(1)
}
const jf = process.argv.indexOf('--json')
const jsonOut = jf > -1 ? process.argv[jf + 1] : null

const exe = process.env.PUPPETEER_EXECUTABLE_PATH ||
  ['/opt/homebrew/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium'].find((p) => existsSync(p))
if (!exe) { console.error('No browser found. Set PUPPETEER_EXECUTABLE_PATH.'); process.exit(1) }

// ─── color clustering (shared with the static extractor) ───────────────────────
function toRgb(v) {
  if (typeof v !== 'string') return null
  const rgb = v.match(/^rgba?\(([^)]*)\)/i)
  if (rgb) { const n = rgb[1].match(/[\d.]+/g); if (n && n.length >= 3) return { r: +n[0], g: +n[1], b: +n[2] } }
  if (v.startsWith('#')) { let x = v.slice(1); if (x.length === 3) x = x.split('').map(c => c + c).join(''); if (x.length >= 6) return { r: parseInt(x.slice(0,2),16), g: parseInt(x.slice(2,4),16), b: parseInt(x.slice(4,6),16) } }
  return null
}
const dist = (a, b) => Math.sqrt((a.r-b.r)**2 + (a.g-b.g)**2 + (a.b-b.b)**2)
function cluster(map) {
  const entries = Object.entries(map).map(([value, count]) => ({ value, count, rgb: toRgb(value) }))
  const out = []
  for (const e of entries.sort((a,b)=>b.count-a.count)) {
    let placed = false
    for (const c of out) {
      if (e.rgb && c.rgb && dist(e.rgb,c.rgb) <= 12) { c.count += e.count; c.nearDuplicates.push(e.value); placed = true; break }
      if (!e.rgb && c.value === e.value) { c.count += e.count; placed = true; break }
    }
    if (!placed) out.push({ value: e.value, count: e.count, rgb: e.rgb, nearDuplicates: [e.value] })
  }
  return out.sort((a,b)=>b.count-a.count).map(({ value, count, nearDuplicates }) => ({ value, count, nearDuplicates }))
}

// ─── drive the browser ──────────────────────────────────────────────────────────
const browser = await puppeteer.launch({ executablePath: exe, headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1024, deviceScaleFactor: 1 })
await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 })
await new Promise(r => setTimeout(r, 1200))

const raw = await page.evaluate(() => {
  const bg = {}, text = {}, border = {}, radius = {}, spacing = {}, families = {}, sizes = {}, weights = {}, shadows = {}
  const inc = (m, k) => { if (k) m[k] = (m[k] || 0) + 1 }
  const live = (c) => c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent' ? c : null
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect()
    if (r.width < 2 || r.height < 2) continue
    const cs = getComputedStyle(el)
    inc(text, live(cs.color))
    inc(bg, live(cs.backgroundColor))
    if (parseFloat(cs.borderTopWidth) > 0) inc(border, live(cs.borderTopColor))
    if (cs.borderTopLeftRadius && cs.borderTopLeftRadius !== '0px') inc(radius, cs.borderTopLeftRadius)
    for (const p of [cs.paddingTop, cs.paddingLeft, cs.gap]) if (p && p !== '0px' && /px$/.test(p)) inc(spacing, p)
    if (cs.fontFamily) inc(families, cs.fontFamily.split(',')[0].replace(/["']/g, '').trim())
    inc(sizes, cs.fontSize)
    inc(weights, cs.fontWeight)
    if (cs.boxShadow && cs.boxShadow !== 'none') inc(shadows, cs.boxShadow)
  }
  // :root custom properties (the site's own tokens, if any)
  const cssVars = {}
  for (const sheet of document.styleSheets) {
    let rules; try { rules = sheet.cssRules } catch { continue }
    for (const rule of rules || []) {
      if (rule.selectorText && /(^|,\s*):root\b/.test(rule.selectorText) && rule.style) {
        for (const name of rule.style) if (name.startsWith('--')) cssVars[name] = rule.style.getPropertyValue(name).trim()
      }
    }
  }
  return { bg, text, border, radius, spacing, families, sizes, weights, shadows, cssVars }
})
await browser.close()

// ─── shape into the synthesizer's inventory format ────────────────────────────────
const inventory = {
  target: url,
  cssVars: raw.cssVars,
  colors: { background: cluster(raw.bg), text: cluster(raw.text), border: cluster(raw.border), ring: [], other: [] },
  radius: raw.radius,
  spacing: raw.spacing,
  typography: { families: raw.families, sizes: raw.sizes, weights: raw.weights },
  shadows: raw.shadows,
  icons: {},
  iconRecommendation: 'hugeicons (default — an icon library cannot be detected from a rendered URL)',
}

// ─── report ─────────────────────────────────────────────────────────────────────
const top = (m, n = 10) => Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0, n)
const L = (s='') => console.log(s)
L(`\x1b[1mhiyf-extract-url\x1b[0m — ${url}`)
L(`\n\x1b[1mExisting CSS variables\x1b[0m: ${Object.keys(raw.cssVars).length} found`)
for (const role of ['background', 'text', 'border']) {
  L(`\n\x1b[1mColors · ${role}\x1b[0m (${inventory.colors[role].length} distinct)`)
  for (const c of inventory.colors[role].slice(0, 8)) {
    const d = c.nearDuplicates.length > 1 ? `  ⚠ ${c.nearDuplicates.length} near-dupes` : ''
    L(`  ${String(c.count).padStart(4)}×  ${c.value}${d}`)
  }
}
L(`\n\x1b[1mRadius\x1b[0m: ${top(raw.radius, 6).map(([v]) => v).join(' · ') || 'n/a'}`)
L(`\x1b[1mSpacing\x1b[0m: ${top(raw.spacing, 8).map(([v]) => v).join(' · ') || 'n/a'}`)
L(`\x1b[1mType\x1b[0m: ${top(raw.families, 4).map(([v]) => v).join(' · ')} | sizes ${top(raw.sizes, 6).map(([v]) => v).join(' ')}`)
L(`\x1b[1mShadows\x1b[0m: ${Object.keys(raw.shadows).length} distinct`)

if (jsonOut) { writeFileSync(jsonOut, JSON.stringify(inventory, null, 2)); L(`\n→ wrote ${jsonOut}  (run: node tools/synthesize.mjs ${jsonOut})`) }
