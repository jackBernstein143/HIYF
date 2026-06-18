#!/usr/bin/env node
/**
 * hiyf-extract — scan an existing app's design language so it can be STANDARDIZED
 * onto HIYF tokens while PRESERVING the brand.
 *
 *   node tools/extract.mjs <app-dir> [--json out.json]
 *
 * Comprehensive across: existing CSS custom properties (an app's own tokens are
 * the gold source), colors-by-role (hex/rgb/hsl/oklch + Tailwind color classes),
 * corner radius, spacing rhythm, typography, shadows, and which icon library the
 * app uses. Output is an inventory + a DRAFT standardization for human review —
 * it never decides on its own; it surfaces the central tendencies.
 *
 * Static analysis only (regex over source). No deps, no install.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const target = process.argv[2]
if (!target) {
  console.error('usage: node tools/extract.mjs <app-dir> [--json out.json]')
  process.exit(1)
}
const jsonFlag = process.argv.indexOf('--json')
const jsonOut = jsonFlag > -1 ? process.argv[jsonFlag + 1] : null

const SCAN_EXT = new Set([
  '.css', '.scss', '.sass', '.less', '.tsx', '.jsx', '.ts', '.js', '.mjs',
  '.html', '.vue', '.svelte', '.astro',
])
const SKIP_DIR = /(^|\/)(node_modules|dist|build|\.next|\.git|coverage|\.turbo|out)(\/|$)/

function walk(dir) {
  let files = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (SKIP_DIR.test(p)) continue
    const s = statSync(p)
    if (s.isDirectory()) files = files.concat(walk(p))
    else if (SCAN_EXT.has(extname(p))) files.push(p)
  }
  return files
}

// ─── color helpers ────────────────────────────────────────────────────────────
const HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g
const RGB = /rgba?\([^)]*\)/gi
const HSL = /hsla?\([^)]*\)/gi
const OKL = /okl(?:ch|ab)\([^)]*\)/gi

function expandHex(h) {
  let x = h.slice(1)
  if (x.length === 3 || x.length === 4) x = x.split('').map((c) => c + c).join('')
  return '#' + x.slice(0, 6).toLowerCase()
}
function hexToRgb(h) {
  const x = expandHex(h).slice(1)
  return { r: parseInt(x.slice(0, 2), 16), g: parseInt(x.slice(2, 4), 16), b: parseInt(x.slice(4, 6), 16) }
}
function rgbToRgb(v) {
  const n = v.match(/[\d.]+%?/g)
  if (!n || n.length < 3) return null
  const c = n.slice(0, 3).map((s) => (s.endsWith('%') ? Math.round(parseFloat(s) * 2.55) : parseFloat(s)))
  return { r: c[0], g: c[1], b: c[2] }
}
function toRgb(value) {
  try {
    if (value.startsWith('#')) return hexToRgb(value)
    if (/^rgba?\(/i.test(value)) return rgbToRgb(value)
  } catch { /* ignore */ }
  return null
}
function dist(a, b) {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2)
}

// Cluster a role's color values by perceptual nearness (RGB-resolvable ones);
// unresolvable formats (oklch/hsl) are grouped by exact string.
function clusterColors(entries) {
  const clusters = []
  for (const e of entries) {
    const rgb = toRgb(e.value)
    let placed = false
    for (const c of clusters) {
      if (rgb && c.rgb && dist(rgb, c.rgb) <= 12) { c.count += e.count; c.members.add(e.value); placed = true; break }
      if (!rgb && c.value === e.value) { c.count += e.count; placed = true; break }
    }
    if (!placed) clusters.push({ value: e.value, rgb, count: e.count, members: new Set([e.value]) })
  }
  return clusters.sort((a, b) => b.count - a.count)
}

// ─── icon libraries (mirror of the eslint-config list) ──────────────────────────
const ICON_LIBS = {
  hugeicons: /@hugeicons\//,
  lucide: /['"]lucide-react['"]/,
  'react-icons': /['"]react-icons(\/[^'"]*)?['"]/,
  heroicons: /@heroicons\/react/,
  'radix-icons': /@radix-ui\/react-icons/,
  tabler: /@tabler\/icons-react/,
  phosphor: /@phosphor-icons\/react|['"]phosphor-react['"]/,
  fontawesome: /@fortawesome\//,
  feather: /feather-icons/,
}

// ─── accumulators ───────────────────────────────────────────────────────────────
const add = (map, key, n = 1) => map.set(key, (map.get(key) || 0) + n)
const cssVars = new Map()        // --name -> { value, count }
const colorsByRole = { background: new Map(), text: new Map(), border: new Map(), ring: new Map(), other: new Map() }
const twColorClasses = new Map() // bg-blue-500 -> count
const radii = new Map()
const spacing = new Map()
const fontFamilies = new Map()
const fontSizes = new Map()
const fontWeights = new Map()
const shadows = new Map()
const icons = new Map()
const arbitrary = new Map()      // arbitrary Tailwind [..] values -> count

const TW_COLOR = /\b(bg|text|border|ring|fill|stroke|from|via|to|outline|divide|placeholder|accent|caret|decoration)-((?:[a-z]+-)?(?:\d{2,3})|black|white|transparent|current|inherit)\b/g
const roleOf = (prefix) =>
  prefix === 'bg' ? 'background'
  : prefix === 'text' || prefix === 'placeholder' || prefix === 'caret' ? 'text'
  : prefix === 'border' || prefix === 'divide' || prefix === 'outline' ? 'border'
  : prefix === 'ring' ? 'ring' : 'other'

for (const file of walk(target)) {
  const src = readFileSync(file, 'utf8')

  // existing CSS custom properties — the app's own tokens (best signal)
  for (const m of src.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+)/g)) {
    const name = m[1]; const val = m[2].trim()
    if (/^--(tw|chakra|radix|mui)/.test(name)) continue // framework internals
    const cur = cssVars.get(name) || { value: val, count: 0 }
    cur.count++; cssVars.set(name, cur)
  }

  // raw color literals, tagged by nearest CSS property when in a CSS rule
  for (const re of [HEX, RGB, HSL, OKL]) {
    for (const m of src.matchAll(re)) {
      const val = m[0].toLowerCase().replace(/\s+/g, ' ')
      const before = src.slice(Math.max(0, m.index - 40), m.index)
      const role =
        /background/i.test(before) ? 'background'
        : /border-color|border:|outline/i.test(before) ? 'border'
        : /(^|[^-])color\s*:/i.test(before) ? 'text'
        : /box-shadow|shadow/i.test(before) ? 'other'
        : 'other'
      add(colorsByRole[role], val)
    }
  }

  // Tailwind color utility classes
  for (const m of src.matchAll(TW_COLOR)) {
    add(twColorClasses, m[0])
    add(colorsByRole[roleOf(m[1])], m[0])
  }

  // radius
  for (const m of src.matchAll(/border-radius\s*:\s*([^;]+)/gi)) add(radii, m[1].trim())
  for (const m of src.matchAll(/\brounded(?:-(?:none|sm|md|lg|xl|2xl|3xl|full))?\b/g)) add(radii, m[0])
  for (const m of src.matchAll(/\brounded-\[([^\]]+)\]/g)) add(radii, m[1])

  // spacing — CSS px/rem on padding/margin/gap + Tailwind utilities
  for (const m of src.matchAll(/(?:padding|margin|gap)(?:-[a-z]+)?\s*:\s*([^;]+)/gi)) {
    for (const v of m[1].trim().split(/\s+/)) if (/^-?[\d.]+(px|rem|em)$/.test(v)) add(spacing, v)
  }
  for (const m of src.matchAll(/\b(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|space-x|space-y)-(\d+(?:\.\d+)?)\b/g)) {
    add(spacing, `${parseFloat(m[1]) * 4}px`) // tailwind scale: n × 0.25rem
  }

  // typography
  for (const m of src.matchAll(/font-family\s*:\s*([^;]+)/gi)) add(fontFamilies, m[1].trim().replace(/["']/g, ''))
  for (const m of src.matchAll(/\bfont-(sans|serif|mono)\b/g)) add(fontFamilies, m[0])
  for (const m of src.matchAll(/font-size\s*:\s*([^;]+)/gi)) add(fontSizes, m[1].trim())
  for (const m of src.matchAll(/\btext-(xs|sm|base|lg|xl|[2-9]xl)\b/g)) add(fontSizes, m[0])
  for (const m of src.matchAll(/font-weight\s*:\s*([^;]+)/gi)) add(fontWeights, m[1].trim())
  for (const m of src.matchAll(/\bfont-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)\b/g)) add(fontWeights, m[0])

  // shadows
  for (const m of src.matchAll(/box-shadow\s*:\s*([^;]+)/gi)) add(shadows, m[1].trim())
  for (const m of src.matchAll(/\bshadow(?:-(?:sm|md|lg|xl|2xl|inner|none))?\b/g)) add(shadows, m[0])

  // arbitrary Tailwind values (drift markers)
  for (const m of src.matchAll(/\b[a-z-]+-\[[^\]]+\]/g)) add(arbitrary, m[0])

  // icon libraries
  if (/\.(tsx|jsx|ts|js|mjs)$/.test(file)) {
    for (const [name, re] of Object.entries(ICON_LIBS)) if (re.test(src)) add(icons, name)
  }
}

// ─── report ─────────────────────────────────────────────────────────────────────
const top = (map, n = 12) => [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n)
const line = (s = '') => console.log(s)
const H = (s) => { line(); line(`\x1b[1m── ${s} ──\x1b[0m`) }

line(`\x1b[1mhiyf-extract\x1b[0m — design inventory for ${target}`)

H('Existing design tokens (CSS custom properties) — the gold source')
if (cssVars.size === 0) line('  (none — app has no CSS-variable token layer)')
else for (const [name, { value }] of [...cssVars.entries()].slice(0, 40)) line(`  ${name}: ${value}`)

for (const role of ['background', 'text', 'border', 'ring']) {
  const clusters = clusterColors([...colorsByRole[role].entries()].map(([value, count]) => ({ value, count })))
  if (!clusters.length) continue
  H(`Colors · ${role} — ${clusters.length} distinct (clustered)`)
  for (const c of clusters.slice(0, 14)) {
    const dupes = c.members && c.members.size > 1 ? `  ⚠ ${c.members.size} near-duplicates → standardize` : ''
    line(`  ${String(c.count).padStart(4)}×  ${c.value}${dupes}`)
  }
}

H('Corner radius — pick the dominant for --radius')
for (const [v, n] of top(radii)) line(`  ${String(n).padStart(4)}×  ${v}`)

H('Spacing rhythm — fit to a 4/8/12/16 scale')
for (const [v, n] of top(spacing, 16)) line(`  ${String(n).padStart(4)}×  ${v}`)

H('Typography')
line(' families: ' + top(fontFamilies, 6).map(([v]) => v).join(' · '))
line(' sizes:    ' + top(fontSizes, 12).map(([v]) => v).join(' · '))
line(' weights:  ' + top(fontWeights, 8).map(([v]) => v).join(' · '))

H('Shadows')
for (const [v, n] of top(shadows, 8)) line(`  ${String(n).padStart(4)}×  ${v}`)

H('Icon libraries — sanction one (or hugeicons if scattered)')
const iconList = top(icons, 12)
if (!iconList.length) line('  (no known icon library detected)')
else for (const [v, n] of iconList) line(`  ${String(n).padStart(4)} files  ${v}`)
const dominant = iconList[0]
const recommendation =
  iconList.length === 0 ? 'hugeicons (none found — use the default)'
  : iconList.length === 1 ? `${dominant[0]} (single coherent library → adopt it)`
  : `SCATTERED across ${iconList.length} libraries → standardize on hugeicons`
line(`  → recommendation: ${recommendation}`)

H('Drift markers — arbitrary Tailwind values (these become tokens)')
line(`  ${[...arbitrary.values()].reduce((a, b) => a + b, 0)} total across ${arbitrary.size} distinct`)
for (const [v, n] of top(arbitrary, 10)) line(`  ${String(n).padStart(4)}×  ${v}`)

// ─── machine-readable output ─────────────────────────────────────────────────────
if (jsonOut) {
  const dump = (map) => Object.fromEntries(map)
  const inventory = {
    target,
    cssVars: Object.fromEntries([...cssVars].map(([k, v]) => [k, v.value])),
    colors: Object.fromEntries(Object.entries(colorsByRole).map(([role, m]) => [
      role, clusterColors([...m.entries()].map(([value, count]) => ({ value, count })))
        .map((c) => ({ value: c.value, count: c.count, nearDuplicates: c.members ? [...c.members] : [c.value] })),
    ])),
    twColorClasses: dump(twColorClasses),
    radius: dump(radii), spacing: dump(spacing),
    typography: { families: dump(fontFamilies), sizes: dump(fontSizes), weights: dump(fontWeights) },
    shadows: dump(shadows), icons: dump(icons), iconRecommendation: recommendation,
    arbitrary: dump(arbitrary),
  }
  writeFileSync(jsonOut, JSON.stringify(inventory, null, 2))
  line(`\n→ wrote ${jsonOut}`)
}
