export const meta = {
  name: 'brand-deep-dive',
  description: "Deep-dive a brand to build an HONEST design-language profile from sources in the wild (not just its landing page)",
  phases: [
    { title: 'Discover', detail: 'fan out to find honest design sources' },
    { title: 'Harvest', detail: 'extract design signals from each source' },
    { title: 'Synthesize', detail: 'reconcile into one authority-weighted profile' },
  ],
}

// Usage: Workflow({ name: 'brand-deep-dive', args: { brand: 'Linear', url: 'https://linear.app' } })
// A single landing-page URL is a dishonest reflection of a product's real design
// system. This fans out across PUBLIC signals — official design-system/brand sites,
// the real product UI (docs/help-center/review screenshots), open-source token files
// on GitHub, public Storybooks, and the marketing site — harvests design signals
// from each, and reconciles them into ONE authority-weighted profile that flags where
// marketing diverges from the product. Feed the profile into tools/synthesize.mjs.

const brandName = (args && args.brand) || 'the brand'
const brandUrl = (args && args.url) || ''
const hostname = (u) => ((String(u).match(/^https?:\/\/([^/]+)/) || [])[1] || String(u).slice(0, 28)).replace(/^www\./, '')
const dedupeByUrl = (arr) => { const seen = new Set(), out = []; for (const s of arr || []) { const k = String(s.url || '').replace(/\/+$/, ''); if (!k || seen.has(k)) continue; seen.add(k); out.push(s) } return out }

const SOURCE_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['sources'],
  properties: { sources: { type: 'array', items: {
    type: 'object', additionalProperties: false, required: ['url', 'type', 'authority', 'why'],
    properties: {
      url: { type: 'string' },
      type: { type: 'string', enum: ['design-system', 'product-ui', 'github-tokens', 'storybook', 'marketing', 'docs', 'screenshots', 'other'] },
      authority: { type: 'integer', description: '1-5: how honestly this reflects the REAL in-product design system' },
      why: { type: 'string' },
    } } } } }

const HARVEST_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['source', 'authority', 'palette', 'typography', 'summary'],
  properties: {
    source: { type: 'string' }, authority: { type: 'integer' },
    reachable: { type: 'boolean' },
    palette: { type: 'object', additionalProperties: false, properties: {
      background: { type: 'string' }, surface: { type: 'string' }, textPrimary: { type: 'string' },
      textMuted: { type: 'string' }, border: { type: 'string' }, primary: { type: 'string' },
      accents: { type: 'array', items: { type: 'string' } }, semantic: { type: 'string' } } },
    typography: { type: 'object', additionalProperties: false, properties: {
      families: { type: 'array', items: { type: 'string' } }, scale: { type: 'string' }, weights: { type: 'string' } } },
    radius: { type: 'string' }, spacing: { type: 'string' }, shadows: { type: 'string' },
    aesthetic: { type: 'string' }, summary: { type: 'string' },
  } }

const CONSOLIDATED_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['profile', 'authoritativeSources', 'marketingVsProduct', 'caveats'],
  properties: {
    profile: { type: 'object', additionalProperties: false, required: ['palette', 'typography', 'radius', 'spacing', 'aesthetic'],
      properties: {
        palette: { type: 'object', additionalProperties: false, properties: {
          background: { type: 'string' }, surface: { type: 'string' }, textPrimary: { type: 'string' },
          textMuted: { type: 'string' }, border: { type: 'string' }, primary: { type: 'string' },
          destructive: { type: 'string' }, accents: { type: 'array', items: { type: 'string' } } } },
        typography: { type: 'object', additionalProperties: false, properties: {
          display: { type: 'string' }, body: { type: 'string' }, mono: { type: 'string' }, scale: { type: 'string' } } },
        radius: { type: 'string' }, spacing: { type: 'string' }, shadows: { type: 'string' }, aesthetic: { type: 'string' } } },
    authoritativeSources: { type: 'array', items: { type: 'object', additionalProperties: false,
      required: ['url', 'type', 'authority'], properties: { url: { type: 'string' }, type: { type: 'string' }, authority: { type: 'integer' } } } },
    marketingVsProduct: { type: 'string', description: 'how the marketing site differs from the real product design' },
    caveats: { type: 'array', items: { type: 'string' } },
  } }

// ── Phase 1: discover honest sources ──────────────────────────────────────────
phase('Discover')
const ANGLES = [
  { key: 'design-system', q: `Find ${brandName}'s OFFICIAL design system, brand guidelines, or component-library docs (e.g. design.<brand>.com, a brand kit, a public design page).` },
  { key: 'product-ui', q: `Find HONEST views of ${brandName}'s ACTUAL PRODUCT UI — not the marketing site: in-app screenshots, demo/feature pages with real UI, review-site screenshots, the help center/docs (which usually show the real app), changelog posts.` },
  { key: 'github-tokens', q: `Search GitHub for ${brandName}'s design tokens or theme source: tailwind config, tokens.json, theme.css, CSS custom properties, or any open-source component library / SDK from their org that reveals colors, type, radius, spacing.` },
  { key: 'storybook', q: `Find any public Storybook, component explorer, or living style guide for ${brandName}.` },
  { key: 'marketing', q: `Find ${brandName}'s main marketing site and key sub-pages (home, pricing, blog, docs landing). Starting URL if known: ${brandUrl || 'unknown'}.` },
]
const discovered = await parallel(ANGLES.map((a) => () => agent(
  `You research the DESIGN LANGUAGE of the brand "${brandName}". ${a.q}\n\nUse web search. Return only REAL, reachable URLs. Score each url's "authority" 1-5 = how honestly it reflects the brand's REAL in-product design system (5 = official design-system/token source or genuine product UI; 1 = marketing fluff). Prefer product/design-system/token sources over marketing.`,
  { label: `discover:${a.key}`, phase: 'Discover', schema: SOURCE_SCHEMA },
)))
const sources = dedupeByUrl(discovered.filter(Boolean).flatMap((r) => r.sources || []))
  .sort((a, b) => (b.authority || 0) - (a.authority || 0)).slice(0, 9)
log(`Discovered ${sources.length} candidate sources (top: ${sources.slice(0, 3).map((s) => `${hostname(s.url)}=${s.authority}`).join(', ')})`)

// ── Phase 2: harvest design signals from each source ───────────────────────────
phase('Harvest')
const harvested = (await parallel(sources.map((s) => () => agent(
  `Extract the DESIGN LANGUAGE from this ${s.type} source for brand "${brandName}":\n${s.url}\n\nFetch/read it (use web fetch; if it's a GitHub file, read the raw token/config values; if it shows UI, read the visible design). Identify concretely (hex/px where visible): color palette by role (background, surface, text primary, text muted, border, primary/brand, accents, semantic/destructive), type family + scale + weights, corner radius, spacing rhythm, shadow style, and the overall component aesthetic. Set reachable=false if you could not actually read it. Re-state how authoritative this source is (1-5) for the REAL product design system.`,
  { label: `harvest:${hostname(s.url)}`, phase: 'Harvest', schema: HARVEST_SCHEMA },
).then((r) => (r ? { ...r, type: s.type, url: s.url } : null))))).filter(Boolean).filter((h) => h.reachable !== false)
log(`Harvested ${harvested.length} reachable sources`)

// ── Phase 3: reconcile into one honest profile ─────────────────────────────────
phase('Synthesize')
const consolidated = await agent(
  `Consolidate these ${harvested.length} design-signal reports into ONE honest design-language profile for "${brandName}". Weight by authority — official design-system/token sources and real PRODUCT UI outweigh the marketing site. Resolve conflicts, collapse near-duplicates to ONE value per role, and explicitly describe how the marketing site differs from the real product (marketingVsProduct). List the most authoritative sources and any caveats (e.g. product UI behind auth, values inferred from screenshots).\n\nREPORTS:\n${JSON.stringify(harvested, null, 1)}`,
  { label: 'synthesize', phase: 'Synthesize', schema: CONSOLIDATED_SCHEMA, effort: 'high' },
)

return { brand: brandName, url: brandUrl, sources, harvested, consolidated }
