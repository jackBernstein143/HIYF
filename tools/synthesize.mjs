#!/usr/bin/env node
/**
 * hiyf-synthesize — turn an extractor inventory into a DRAFT HIYF theme that
 * preserves the app's brand while standardizing it.
 *
 *   node tools/extract.mjs <app> --json inv.json
 *   node tools/synthesize.mjs inv.json [--out hiyf.theme.css]
 *
 * Mechanical decisions (radius, spacing, icons) are made directly. The
 * judgment-heavy part — mapping clustered colors to semantic roles — is
 * PROPOSED with confidence notes for human approval. It never silently absorbs
 * the app's inconsistency: each role collapses to one standardized value.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const inPath = process.argv[2]
if (!inPath) {
  console.error('usage: node tools/synthesize.mjs <inventory.json> [--out file.css]')
  process.exit(1)
}
const outFlag = process.argv.indexOf('--out')
const outPath = outFlag > -1 ? process.argv[outFlag + 1] : 'hiyf.theme.css'
const inv = JSON.parse(readFileSync(inPath, 'utf8'))

// ─── color parsing ──────────────────────────────────────────────────────────
function toRgb(v) {
  if (typeof v !== 'string') return null
  if (v.startsWith('#')) {
    let x = v.slice(1)
    if (x.length === 3 || x.length === 4) x = x.split('').map((c) => c + c).join('')
    if (x.length < 6) return null
    return { r: parseInt(x.slice(0, 2), 16), g: parseInt(x.slice(2, 4), 16), b: parseInt(x.slice(4, 6), 16) }
  }
  const rgb = v.match(/^rgba?\(([^)]*)\)/i)
  if (rgb) {
    const n = rgb[1].match(/[\d.]+%?/g)
    if (n && n.length >= 3) return { r: +n[0], g: +n[1], b: +n[2] }
  }
  return null // hsl/oklch/tailwind-class left for human review
}
const lum = ({ r, g, b }) => (0.299 * r + 0.587 * g + 0.114 * b) / 255
const sat = ({ r, g, b }) => { const mx = Math.max(r, g, b), mn = Math.min(r, g, b); return mx === 0 ? 0 : (mx - mn) / mx }

// flatten a role's clusters into resolvable candidates, sorted by frequency
function candidates(role) {
  return (inv.colors?.[role] || [])
    .map((c) => ({ ...c, rgb: toRgb(c.value) }))
    .filter((c) => c.rgb)
    .sort((a, b) => b.count - a.count)
}
const allResolvable = ['background', 'text', 'border', 'ring', 'other']
  .flatMap((r) => candidates(r))

// ─── role inference ─────────────────────────────────────────────────────────
// Prefer the app's OWN named tokens — they are the truest semantic signal and
// the heart of the brand. Only fall back to colors observed in markup (often
// one-off accents/status colors) when no matching token exists.
const lightest = (arr) => [...arr].sort((a, b) => lum(b.rgb) - lum(a.rgb))[0]
const darkest = (arr) => [...arr].sort((a, b) => lum(a.rgb) - lum(b.rgb))[0]
const bg = candidates('background'), text = candidates('text'), border = candidates('border')

// Per role: which token NAMES qualify, and which suffixes to avoid (so we pick
// the "base" token, not -soft/-hover/-strong/-2/-3 variants).
const SPECS = {
  primary:            { want: /accent|primary|brand/i,                       avoid: /soft|hover|alt|light|dark|inverse|[-_][23]\b/i },
  background:         { want: /canvas|background|(^|[-_])bg([-_]|$)|page/i,   avoid: /soft|hover|dark|inverse|[-_][23]\b/i },
  card:               { want: /surface|card|panel/i,                          avoid: /hover|soft|[-_][23]\b/i },
  muted:              { want: /surface[-_]?[23]|muted|subtle/i,               avoid: /fore|text|ink|fg/i },
  foreground:         { want: /(^|[-_])ink([-_]|$)|foreground|(^|[-_])fg([-_]|$)|(^|[-_])text([-_]|$)|(^|[-_])black/i, avoid: /muted|subtle|body|soft|inverse|[-_][23]\b/i },
  'muted-foreground': { want: /muted[-_]?fore|ink[-_]?muted|ink[-_]?subtle|fg[-_]?subtle|text[-_]?muted|secondary/i, avoid: /soft/i },
  border:             { want: /border|divider|outline/i,                      avoid: /strong|hover|soft/i },
  destructive:        { want: /error|danger|destructive/i,                    avoid: /soft|hover|bg|background/i },
}
function byName(role) {
  let best = null
  for (const [name, val] of Object.entries(inv.cssVars || {})) {
    if (!SPECS[role].want.test(name) || SPECS[role].avoid.test(name) || !toRgb(val)) continue
    if (!best || name.length < best.name.length) best = { name, value: val } // shorter ⇒ more "base"
  }
  return best
}
function pick(role, fallback) {
  const n = byName(role)
  if (n) return { value: n.value, why: `from ${n.name}`, confident: true }
  if (fallback?.value) return { value: fallback.value, why: `${fallback.why} — REVIEW`, confident: false }
  return null
}
const fb = (c, why) => (c ? { value: c.value, why } : null)
const saturated = allResolvable.filter((c) => sat(c.rgb) > 0.25).sort((a, b) => b.count - a.count)[0]

const primary = pick('primary', fb(saturated, 'most-used saturated color'))
const background = pick('background', fb(bg[0], 'most-used surface'))
const card = pick('card', fb(bg.find((c) => c.value !== background?.value) || bg[0], 'surface'))
const muted = pick('muted', fb(bg[2], 'subtle surface'))
const foreground = pick('foreground', fb(darkest(text), 'darkest text'))
const mutedFg = pick('muted-foreground', fb(text[1], 'secondary text'))
const borderColor = pick('border', fb(border[0], 'dominant border'))
const destructive = pick('destructive', null)

// ─── radius (mechanical) ────────────────────────────────────────────────────────
const ROUNDED_PX = { rounded: 4, 'rounded-sm': 2, 'rounded-md': 6, 'rounded-lg': 8, 'rounded-xl': 12, 'rounded-2xl': 16, 'rounded-3xl': 24, 'rounded-full': 9999 }
const radiusHist = new Map()
for (const [v, n] of Object.entries(inv.radius || {})) {
  let px = null
  if (ROUNDED_PX[v] !== undefined) px = ROUNDED_PX[v]
  else { const m = v.match(/^([\d.]+)px$/); if (m) px = +m[1]; else { const r = v.match(/^([\d.]+)rem$/); if (r) px = +r[1] * 16 } }
  if (px !== null && px < 9999) radiusHist.set(px, (radiusHist.get(px) || 0) + n)
}
const modalRadius = [...radiusHist.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]

// ─── spacing (report; keep HIYF scale unless clearly different base) ──────────────
const spaceVals = Object.keys(inv.spacing || {})
  .map((v) => parseFloat(v)).filter((n) => n > 0).sort((a, b) => a - b)

// ─── icons (mechanical, from extractor recommendation) ────────────────────────────
const iconRec = inv.iconRecommendation || ''
const iconLib = /standardize on hugeicons/i.test(iconRec) ? 'hugeicons'
  : (iconRec.match(/^(\w[\w-]*)/)?.[1] || 'hugeicons')

// ─── emit theme css ───────────────────────────────────────────────────────────
const L = []
const setRaw = (v, val, note) => L.push(`  ${v}: ${val};  /* ${note} */`)
const setRole = (v, p) =>
  p?.value ? L.push(`  ${v}: ${p.value};  /* ${p.why} */`) : L.push(`  /* ${v}: <no signal — review> */`)
L.push('/* ── Generated by hiyf-synthesize — DRAFT, review before shipping ──')
L.push(' * Brand preserved, standardized: each role collapses to one value.')
L.push(' * "from --x" = mapped from your own token; "REVIEW" = guessed from markup. */')
L.push(':root {')
if (modalRadius !== undefined) setRaw('--radius', `${(modalRadius / 16).toFixed(4).replace(/0+$/, '')}rem`, `dominant radius ${modalRadius}px`)
setRole('--primary', primary)
setRole('--background', background)
setRole('--card', card)
setRole('--muted', muted)
setRole('--foreground', foreground)
setRole('--muted-foreground', mutedFg)
setRole('--border', borderColor)
setRole('--destructive', destructive)
L.push('')
L.push('  /* Box/Text primitive layer */')
if (modalRadius !== undefined) setRaw('--hiyf-radius-m', `${modalRadius}px`, 'aligned to --radius')
setRole('--hiyf-bg-card', card)
setRole('--hiyf-text-primary', foreground)
setRole('--hiyf-border-card', borderColor)
L.push('}')
writeFileSync(outPath, L.join('\n') + '\n')

// ─── decisions report ───────────────────────────────────────────────────────────
const line = (s = '') => console.log(s)
const B = (s) => line(`\n\x1b[1m${s}\x1b[0m`)
line('\x1b[1mhiyf-synthesize\x1b[0m — proposed theme (DRAFT)')
B('Mechanical')
line(`  radius   → --radius: ${modalRadius !== undefined ? (modalRadius / 16) + 'rem (' + modalRadius + 'px)' : 'no signal'}`)
line(`  spacing  → app uses: ${spaceVals.slice(0, 8).map((n) => n + 'px').join(', ') || 'n/a'} (HIYF scale kept unless you say otherwise)`)
line(`  icons    → defineLockdown({ icons: '${iconLib}' })   [${iconRec}]`)
B('Color roles (PROPOSED — approve or correct)')
const show = (label, p) => line(`  ${label.padEnd(18)} ${(p ? p.value : '— no signal —').padEnd(26)} ${p ? p.why : ''}`)
show('--primary', primary)
show('--background', background)
show('--card', card)
show('--muted', muted)
show('--foreground', foreground)
show('--muted-foreground', mutedFg)
show('--border', borderColor)
show('--destructive', destructive)
B('Next')
line(`  • wrote ${outPath} — import it after hiyf theme.css/styles.css`)
line(`  • set eslint: export default defineLockdown({ icons: '${iconLib}' })`)
line('  • apply to ONE page, review in the browser, then migrate the rest')
