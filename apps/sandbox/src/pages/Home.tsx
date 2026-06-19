import { useEffect, useState } from 'react'
import { Box, Text, Badge, Button, Alert, Icon } from '@jackbernnie/hiyf'
import { ArrowRight01Icon } from '@jackbernnie/hiyf/icons'
import { CodeBlock } from './docKit'
import { HiyfLogo } from '../Logo'

/* ──────────────────────────────────────────────────────────────────────────
 * Home — what this is and how to use it. Built entirely from the design system,
 * so the page itself is a worked example of the rules it describes (and passes
 * the lockdown lint).
 * ────────────────────────────────────────────────────────────────────────── */

// Shared closing step for every path: render the user's OWN design system locally so
// they can see it and iterate — the payoff that closes the loop (no backend needed).
const showcaseStep = `

SHOWCASE & ITERATE  (the payoff — do this last)
- Scaffold a local /showcase page, served at ONE url, that renders MY design system in my
  theme: the palette as labeled swatches, the type scale, radius + spacing, and a
  representative component set (Button intents, Card, Input/Field, Select, Status/Badge/
  Alert, Table, Tabs, a Dialog). Build it only from @jackbernnie/hiyf so it stays lint-clean.
- Give me that url. I review my design system there and tell you what to change; iterate
  with me until I'm happy — the lockdown keeps every change on-system.`

// One prompt to rule it all: hand this to an agentic coding LLM (Claude Code,
// Codex, …) and it installs, wires up, uses, and self-verifies the system. The
// lockdown lint guarantees it can't go off-system without failing the build.
const setupPrompt = `Set up and use the @jackbernnie/hiyf design system in this project.

After installing, read node_modules/@jackbernnie/hiyf/AGENTS.md and follow it — it
has the complete rules, token vocabulary, and component list. Summary below.

First, install and wire it up:
1. Install it: run \`npm install @jackbernnie/hiyf\` and
   \`npm install -D hiyf-eslint-config\`. If the package isn't on the
   default registry, ask me where to find it.
2. Import the styles once in the app's global CSS (no StyleX/bundler plugin
   needed — the styles ship precompiled):
     @import "tailwindcss";
     @import "@jackbernnie/hiyf/theme.css";
     @import "@jackbernnie/hiyf/styles.css";
     @source "../node_modules/@jackbernnie/hiyf/dist";  /* so Tailwind sees the components */
3. Turn on the lockdown lint in eslint.config.mjs:
     import lockdown from 'hiyf-eslint-config'
     export default [...lockdown]

Then build all UI using only this system:
- Use components from @jackbernnie/hiyf for anything interactive
  (Button, Input, Card, Dialog, Select, Table, …).
- Use <Box> for layout and <Text> for all text, with token props only
  (e.g. padding="l", gap="m", variant="heading-s", color="muted").
- Icons: render with <Icon icon={...} /> from @jackbernnie/hiyf and import glyphs
  from @jackbernnie/hiyf/icons (hugeicons ships with the package). Do NOT add
  lucide or any other icon library.
- Never use raw HTML elements (<div>, <span>, <button>…), arbitrary Tailwind
  values (p-[17px]), or inline style={…}. They fail the build on purpose.
- If something you need doesn't exist, work through this in order — don't get
  stuck, and don't expand the design system for a single screen:
    1. Express it with existing tokens and components if you can.
    2. If it's clearly reusable, add a token/variant/component to the system.
    3. If it's a genuine one-off (a dynamic value, a third-party integration,
       or a single bespoke element), use the escape hatch: put
       \`// eslint-disable-next-line no-restricted-syntax\` on that one line with
       a short comment explaining why.
  List any escape hatches you used at the end so I can review them.

Before you finish, run \`npm run lint\` and \`npm run build\`. If either fails,
fix the code until both pass. Green lint means the UI is on-system.${showcaseStep}`

// Brownfield: adopt the app's existing brand, standardize it, then lock it in.
// Includes a hard preview-and-approve gate before the full migration.
const migratePrompt = `You are migrating this existing app to the @jackbernnie/hiyf design system.
Goal: the app looks essentially the SAME — its brand preserved, just standardized
to one value per design decision — and is fully on-system so it can never drift
again. This is a re-platforming of the UI layer, NOT a redesign. (Standardizing
will nudge a few values, e.g. 13px → 12px; that's expected. Anything bigger, ask.)

GROUND RULES
- Preserve behavior exactly: keep every prop, event handler, state, data fetch,
  route, ARIA attribute, and test. Change how UI is expressed, never what it does.
- No redesign, no new features. If something seems like it should look different,
  ask me — don't change it on your own.
- Preserve light/dark mode if the app has it (theme both).
- Work incrementally; keep the app runnable at every step; commit after each screen.
- When a brand or theme decision is ambiguous, STOP and ask rather than guess.
- MATCH THE ORIGINAL VISUALLY. If you can drive a browser (Playwright/Puppeteer or
  a screenshot tool / MCP), screenshot the original screen and your migrated one and
  compare them — visual parity is the bar, not just a clean build. Judge similarity
  by eye/VLM (layout, spacing, color, type), not pixel-exactness.

Four phases. Do not skip the approval gate in Phase 3.

PHASE 1 — INVENTORY (report back before changing anything)
- The current styling approach (Tailwind? CSS modules? styled-components? a kit
  like MUI/Chakra?) and where styles live.
- The design language: colors grouped by role (background, surface/card, text,
  muted text, border, primary/brand, destructive, success/warning), clustering
  near-duplicates — six near-identical grays are really one gray. Use existing CSS
  variables / theme config as the source of truth if present. Plus the dominant
  corner radius, spacing rhythm, type scale, shadows, and which icon library/ies.
- A screen/route list and the recurring component patterns, so we both see scope.
- A COMPONENT MAP: each recurring source component (button, card, modal, table,
  nav, form field…) paired with the HIYF component that replaces it and how its
  props map (e.g. variant → intent, size → size). Migrate THROUGH this map so you
  substitute real HIYF components instead of inventing markup.
(Accelerator: github.com/jackBernstein143/HIYF ships tools/extract.mjs —
\`node extract.mjs <app-dir> --json inv.json\` — and tools/synthesize.mjs, which
produce the inventory and a draft theme automatically.)

PHASE 2 — PROPOSE A BRAND-PRESERVING THEME
Produce one hiyf.theme.css overriding HIYF's CSS variables (every knob is in
node_modules/@jackbernnie/hiyf/src/theme-template.css):
- ONE value per color role — --primary (the brand color), --background, --card,
  --muted, --foreground, --muted-foreground, --border, --destructive — plus the
  matching --hiyf-* tokens, for light AND dark. Never copy the app's inconsistency
  into the theme; each role collapses to a single value.
- --radius from the dominant corner radius.
- Icons: if the app uses ONE coherent icon library, sanction it; if icons are
  scattered across several, standardize on hugeicons.
Derive every value from the app — invent nothing. Show me the mapping (each value
and where it came from) and let me approve or correct it before you apply it.

PHASE 3 — PREVIEW & APPROVE  (HARD STOP: do not begin Phase 4 until I reply "approved")
- Install @jackbernnie/hiyf + hiyf-eslint-config; wire the CSS imports plus my
  approved hiyf.theme.css.
- Convert ONE representative page (the most component-dense, or ask me which) to
  HIYF, reusing the approved theme.
- Run the dev server. If you can screenshot, capture the original page and your
  migrated page and compare them directly; refine layout/spacing/color/type and
  re-screenshot until they match (a few rounds).
- Build a before/after REVIEW PAGE served at one URL — the original screenshot
  side-by-side with the migrated screen — and give me that URL. I review everything
  there in one place; never make me open image files. Call out anything you could
  NOT match exactly, and why.
- I'll confirm the brand is preserved or flag issues; iterate on the theme/page
  until I say "approved". Touch nothing else yet.

PHASE 4 — MIGRATE THE REST (only after I approve)
- Convert screen-by-screen: <Box>/<Text> + components with intent props, icons via
  <Icon>. Read node_modules/@jackbernnie/hiyf/AGENTS.md and follow it for the rules,
  tokens, and component list.
- Turn on the lockdown lint (scope it to converted folders first if the app is large):
    import { defineLockdown } from 'hiyf-eslint-config'
    export default defineLockdown({ icons: '<the sanctioned library>' })
- After each screen: if you can screenshot, compare the migrated screen against the
  original and refine until they match; add the before/after pair to the review page;
  then run \`npm run lint\` and \`npm run build\`, fix until both pass, verify behavior
  is identical, and commit. Green lint = fully on-system; visual match = faithfully
  migrated.
- Keep the review page current so I can scan every screen's before/after in one place.
- When everything is converted, do a final visual pass against the original.

HANDLING GAPS
- App-specific composite UI (a dashboard widget, a settings panel): rebuild it FROM
  HIYF primitives/components — do not add it to the design system.
- A genuinely reusable primitive HIYF lacks: propose adding it to the design system.
- Complex third-party widgets (charts, maps, editors): keep them; wrap their
  container in HIYF, and if the lint blocks a required raw element use a single
  \`// eslint-disable-next-line no-restricted-syntax\` with a comment.
List every escape hatch you used at the end for my review.${showcaseStep}

DONE WHEN: the app looks essentially identical to before, every screen is on-system
(lint + build green with the lockdown on), behavior is unchanged, and the only
escape hatches are ones you listed and I approved.`

// Reference: model a design system after a brand the user's OWN agent researches
// (a URL, screenshots, or just a name). All the complexity lives in this prompt — the
// agent asks questions, does its own deep research, and builds. No API key, no backend.
const referencePrompt = `Build a new project on the @jackbernnie/hiyf AI design protocol, with a theme MODELED
AFTER a reference — using YOUR OWN research. Copy the look honestly, standardize it so it
can't drift, then build. Everything below runs on you; no API key or backend needed.

PHASE 0 — ASK ME FIRST (don't skip)
- What should the design system be modeled after? A product/brand, an existing app, a
  vibe — or just say "use the standard HIYF template".
- Share whatever you have: URL(s), and/or upload example images / screenshots as inspiration.
- Any must-keep specifics? (exact brand color, font, logo.)

PHASE 1 — RESEARCH THE REAL DESIGN LANGUAGE  (a landing page lies — dig deeper)
Use web search + your own analysis. Don't model the marketing site alone; find HONEST
sources and weight them higher:
- the brand's OFFICIAL design system / brand guidelines, if public;
- OPEN-SOURCE token sources on GitHub (tailwind config, tokens.json, theme.css, CSS
  custom properties, their component library/SDK) — usually the truest signal;
- the REAL PRODUCT UI (docs, help center, changelog, review-site screenshots) — not the
  hero page;
- any public Storybook / living style guide.
If I uploaded images, read palette + type + spacing + radius straight from them.
Reconcile it all into ONE profile; call out where the marketing site differs from the
real product; collapse near-duplicates to ONE value per role.
(Optional exact values: if you have the HIYF repo + a browser, tools/extract-url.mjs reads
a live site's COMPUTED styles and tools/synthesize.mjs drafts a theme — but your own
research above is the main method.)

PHASE 2 — PROPOSE  (STOP for my approval)
Show me the standardized mapping: background, surface, text, muted text, border,
primary/brand, destructive, accents; type family + scale; radius; spacing; shadows —
each value + where it came from + your confidence. I approve or correct.

PHASE 3 — APPLY & PREVIEW  (STOP for my approval)
If this isn't a project yet, scaffold a Vite + React + TypeScript app with Tailwind v4.
Install @jackbernnie/hiyf + hiyf-eslint-config and wire the CSS imports — the exact
install + CSS lines are in node_modules/@jackbernnie/hiyf/AGENTS.md. Put your approved
theme in a hiyf.theme.css (imported after theme.css/styles.css) that overrides the
variables documented in node_modules/@jackbernnie/hiyf/src/theme-template.css — the
--primary/--background/… palette plus the --hiyf-* primitive tokens, for light AND dark.
Build ONE representative screen; if you can screenshot, put it next to the reference on a
served review page (one URL) and refine until the look matches.

PHASE 4 — BUILD
Build the rest on HIYF — read node_modules/@jackbernnie/hiyf/AGENTS.md and follow it;
turn on the lockdown lint:
  import { defineLockdown } from 'hiyf-eslint-config'
  export default defineLockdown({ icons: 'hugeicons' })
Everything stays on-system; the look stays the reference's.${showcaseStep}

Notes: icons default to hugeicons. The researched color roles are a DRAFT — brand color
and backgrounds are usually right; surface/muted sometimes need a tweak, so confirm with me.`

type Path = 'new' | 'existing'
type NewKind = 'standard' | 'reference'
type PromptKey = 'standard' | 'reference' | 'existing'

const BLURB: Record<PromptKey, string> = {
  standard: 'Start fresh on the standard HIYF theme — the agent installs HIYF, wires the theme + lockdown lint, builds only from approved components, and ends by rendering a local showcase of your design system to review.',
  reference: "Model your design system after a reference — your coding agent asks what to model after (a URL, images, or a name), researches the real design language itself (not just the landing page), proposes a standardized theme, builds, and renders a local showcase. Runs entirely on your agent — no API key.",
  existing: 'Standardize your existing app — the agent inventories your app, proposes a standardized theme that preserves your brand, previews one page for approval, migrates the rest (before/after verified), and renders your standardized system for review.',
}
const PROMPT_LABEL: Record<PromptKey, string> = {
  standard: 'New-project prompt',
  reference: 'Reference-copy prompt',
  existing: 'Migration prompt',
}

const STEPS = [
  { short: 'Copy the prompt', title: 'Pick a path, copy the prompt', body: 'Choose "start new" or "adopt an existing app", then copy the generated prompt.' },
  { short: 'Hand it to your agent', title: 'Hand it to your coding agent', body: 'Paste it into Claude Code, Codex, Cursor, or any agent. It asks a question or two, then builds.' },
  { short: 'Review the result', title: 'Review your design system', body: "It scaffolds a showcase of your themed components and keeps everything on-system — iterate until it's right." },
]

function PathCard({
  title,
  desc,
  banner,
  onClick,
}: {
  title: string
  desc: string
  banner: string
  onClick: () => void
}) {
  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={onClick}
      flexDirection="column"
      borderRadius="l"
      flexGrow={1}
      className="min-w-72 basis-0 cursor-pointer overflow-hidden border border-border bg-card transition-colors hover:border-foreground/40"
    >
      {/* image banner with the path name overlaid + heavy grain */}
      <Box className="relative h-36 overflow-hidden">
        <Box className={`banner-img ${banner}`} />
        <Box className="grain" />
        <Box className="absolute inset-0 bg-black/30" />
        <Box
          flexDirection="row"
          justifyContent="between"
          className="absolute inset-x-0 bottom-0 z-10 items-center px-5 py-4 text-white"
        >
          <Text variant="heading-s" color="white">{title}</Text>
          <Icon icon={ArrowRight01Icon} size="m" color="current" />
        </Box>
      </Box>
      {/* details below */}
      <Box padding="l">
        <Text color="muted">{desc}</Text>
      </Box>
    </Box>
  )
}

function ChoiceCard({ title, desc, onClick }: { title: string; desc: string; onClick: () => void }) {
  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={onClick}
      flexDirection="column"
      gap="s"
      padding="xl"
      borderRadius="l"
      className="cursor-pointer border border-border bg-card transition-colors hover:border-foreground/40 hover:bg-muted/40"
    >
      <Box flexDirection="row" justifyContent="between" className="items-center">
        <Text variant="heading-s">{title}</Text>
        <Icon icon={ArrowRight01Icon} size="m" color="muted" />
      </Box>
      <Text color="muted">{desc}</Text>
    </Box>
  )
}

/* A compact reminder of the flow, shown just above the prompt so people know what
 * they're about to do. A light stepper: numbered chips + the step, arrows between. */
function HowItWorksMini() {
  return (
    <Box flexDirection="column" gap="m" padding="l" borderRadius="l" className="bg-muted/50">
      <Text variant="caption" color="muted">HOW IT WORKS</Text>
      <Box flexDirection="row" gap="s" className="flex-wrap items-center">
        {STEPS.map((s, i) => (
          <Box key={s.short} flexDirection="row" gap="s" className="items-center">
            <Box className="size-6 shrink-0 items-center justify-center rounded-full bg-background">
              <Text variant="caption" color="muted" monospace>{i + 1}</Text>
            </Box>
            <Text variant="label">{s.short}</Text>
            {i < STEPS.length - 1 ? <Icon icon={ArrowRight01Icon} size="s" color="muted" /> : null}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export function Home({ onNavigate }: { onNavigate: (name: string) => void }) {
  const [view, setView] = useState<'landing' | Path>('landing')
  // null = the "Start new" interstitial (choose standard vs reference) is showing.
  const [newKind, setNewKind] = useState<NewKind | null>(null)

  // Reset scroll on any step change (landing → interstitial → detail).
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }, [view, newKind])

  if (view === 'landing') {
    return (
      <Box flexDirection="column" gap="4xl" className="mx-auto w-full max-w-5xl px-10 py-12">
        {/* Hero */}
        <Box flexDirection="column" gap="m">
          {/* logo + wordmark lockup (small brand label) */}
          <Box flexDirection="row" gap="s" className="items-center">
            <HiyfLogo height={26} />
            <Text variant="heading-s" as="h1">human in your face</Text>
          </Box>
          <Box flexDirection="row" className="items-center">
            <Badge tone="neutral">AI design protocol</Badge>
          </Box>
          {/* the loud part */}
          <Box flexDirection="column" className="max-w-4xl">
            <Text variant="heading-xl">
              A design system your coding agent can build on.{' '}
              <Text as="span" variant="heading-xl" color="muted">
                It can&rsquo;t drift or go off-brand &mdash; the build won&rsquo;t let it.
              </Text>
            </Text>
          </Box>
        </Box>

        {/* Set up — the two paths */}
        <Box flexDirection="column" gap="l">
          <Text variant="label" color="muted">SET UP YOUR DESIGN SYSTEM</Text>
          <Box flexDirection="row" gap="l" className="flex-wrap">
            <PathCard
              title="Start new"
              desc="Spin up a fresh design system — a standard template, or modeled after a reference you choose."
              banner="path-banner--new"
              onClick={() => {
                setNewKind(null)
                setView('new')
              }}
            />
            <PathCard
              title="Standardize your existing app"
              desc="Bring HIYF into an app you already have — preserve its brand, standardize it, lock out drift."
              banner="path-banner--existing"
              onClick={() => setView('existing')}
            />
          </Box>
        </Box>

        {/* How it works */}
        <Box flexDirection="column" gap="l">
          <Text variant="label" color="muted">HOW IT WORKS</Text>
          <Box flexDirection="row" gap="l" className="flex-wrap">
            {STEPS.map((s, i) => (
              <Box
                key={s.title}
                flexDirection="column"
                gap="s"
                flexGrow={1}
                className="min-w-64 basis-0 border-t border-border pt-4"
              >
                <Text variant="caption" color="muted" monospace>{i + 1}</Text>
                <Text variant="heading-xs">{s.title}</Text>
                <Text color="muted">{s.body}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    )
  }

  // "Start new" interstitial — make both sub-paths obvious before any prompt.
  if (view === 'new' && newKind === null) {
    return (
      <Box flexDirection="column" gap="2xl" className="mx-auto w-full max-w-3xl px-10 py-12">
        <Box flexDirection="row" className="items-center">
          <Button intent="ghost" size="sm" onClick={() => setView('landing')}>← All paths</Button>
        </Box>
        <Box flexDirection="column" gap="s">
          <Text variant="heading-l" as="h1">Start a new design system</Text>
          <Text color="muted">Two ways to begin — pick one.</Text>
        </Box>
        <Box flexDirection="column" gap="m">
          <ChoiceCard
            title="Standard template"
            desc="Start on HIYF's neutral theme and build right away."
            onClick={() => setNewKind('standard')}
          />
          <ChoiceCard
            title="Adopt another design system"
            desc="Model the look of a brand, app, or screenshots — your agent researches it, then themes HIYF to match."
            onClick={() => setNewKind('reference')}
          />
        </Box>
      </Box>
    )
  }

  const key: PromptKey = view === 'existing' ? 'existing' : (newKind ?? 'standard')
  const detailTitle =
    view === 'existing'
      ? 'Standardize your existing app'
      : key === 'reference'
        ? 'Adopt another design system'
        : 'Standard template'
  const PROMPTS: Record<PromptKey, string> = { standard: setupPrompt, reference: referencePrompt, existing: migratePrompt }
  return (
    <Box flexDirection="column" gap="2xl" className="mx-auto w-full max-w-3xl px-10 py-12">
      <Box flexDirection="row" className="items-center">
        <Button
          intent="ghost"
          size="sm"
          onClick={() => (view === 'existing' ? setView('landing') : setNewKind(null))}
        >
          {view === 'existing' ? '← All paths' : '← Choose a starting point'}
        </Button>
      </Box>
      <HowItWorksMini />
      <Box flexDirection="column" gap="m">
        <Text variant="heading-l" as="h1">{detailTitle}</Text>
        <Text color="muted">{BLURB[key]}</Text>
        <Text variant="caption" color="muted">Copy this into Claude Code, Codex, or any coding agent.</Text>
        <CodeBlock label={PROMPT_LABEL[key]} code={PROMPTS[key]} />
        <Alert tone="success" title="Why you can trust the result">
          <Text>
            Whichever path, the prompt ends by running{' '}
            <Text as="code" monospace>npm run lint</Text> and{' '}
            <Text as="code" monospace>npm run build</Text>. The lockdown lint turns
            every off-system choice into a build error, so the agent physically
            can&rsquo;t finish with raw <Text as="code" monospace>&lt;div&gt;</Text>s,
            arbitrary Tailwind, or inline styles — the worst case is a failed build
            it has to fix, never a shipped inconsistency.
          </Text>
        </Alert>
      </Box>
    </Box>
  )
}
