import { useState } from 'react'
import { Box, Text, Badge, Button, Alert, Separator, ToggleGroup } from '@jackbernnie/hiyf'
import { CodeBlock, PageShell, Section } from './docKit'

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
node_modules/@jackbernnie/hiyf/theme-template.css):
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
Install @jackbernnie/hiyf + hiyf-eslint-config; wire the CSS imports + the approved
theme. Build ONE representative screen; if you can screenshot, put it next to the
reference on a served review page (one URL) and refine until the look matches.

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
  existing: 'Adopt HIYF in an existing app — the agent inventories your app, proposes a standardized theme that preserves your brand, previews one page for approval, migrates the rest (before/after verified), and renders your standardized system for review.',
}
const PROMPT_LABEL: Record<PromptKey, string> = {
  standard: 'New-project prompt',
  reference: 'Reference-copy prompt',
  existing: 'Migration prompt',
}

export function Home({ onNavigate }: { onNavigate: (name: string) => void }) {
  const [path, setPath] = useState<Path>('new')
  const [newKind, setNewKind] = useState<NewKind>('standard')
  const key: PromptKey = path === 'existing' ? 'existing' : newKind
  const PROMPTS: Record<PromptKey, string> = { standard: setupPrompt, reference: referencePrompt, existing: migratePrompt }
  return (
    <PageShell>
      {/* Hero */}
      <Box flexDirection="column" gap="m">
        <Box flexDirection="row" gap="s" className="items-center">
          <Badge tone="neutral">AI design protocol</Badge>
        </Box>
        <Text variant="heading-l" as="h1">
          human-in-your-face
        </Text>
        <Text variant="body">
          HIYF is an AI design protocol — a locked design system for AI-generated
          interfaces. It gives coding agents enough freedom to build, but not enough
          freedom to drift.
        </Text>
        <Text variant="body" color="muted">
          The only UI you can express is on-system UI — raw elements, arbitrary
          styles, and one-off colors simply fail the build. Give an LLM the rules
          once and the build keeps it honest.
        </Text>
      </Box>

      <Separator spacing="sm" />

      {/* The headline feature: one prompt does everything */}
      <Section
        title="Get started — hand this to your LLM"
        intro="Pick your situation, then copy the prompt into Claude Code, Codex, or any coding agent."
      >
        <Box flexDirection="column" gap="m">
          <ToggleGroup
            type="single"
            value={path}
            onValueChange={(v) => v && setPath(v as Path)}
            options={[
              { value: 'new', label: 'Start new' },
              { value: 'existing', label: 'Adopt in existing app' },
            ]}
          />
          {path === 'new' && (
            <ToggleGroup
              type="single"
              value={newKind}
              onValueChange={(v) => v && setNewKind(v as NewKind)}
              options={[
                { value: 'standard', label: 'Standard template' },
                { value: 'reference', label: 'Model after a reference' },
              ]}
            />
          )}
          <Text color="muted">{BLURB[key]}</Text>
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
      </Section>

      {/* How it works — short */}
      <Section title="How it works">
        <Box as="ul" flexDirection="column" gap="s">
          <Box as="li">
            <Text>
              <Text as="strong">Tokens, not values.</Text>{' '}
              <Text as="span" color="muted">
                You pick a role (padding="l", variant="heading-s"); the system
                picks the pixels.
              </Text>
            </Text>
          </Box>
          <Box as="li">
            <Text>
              <Text as="strong">Closed components.</Text>{' '}
              <Text as="span" color="muted">
                Intent-named props (intent="primary", color="success") with no
                className escape hatch.
              </Text>
            </Text>
          </Box>
          <Box as="li">
            <Text>
              <Text as="strong">Enforced by lint.</Text>{' '}
              <Text as="span" color="muted">
                Off-system code fails the build — so drift can&rsquo;t merge,
                whoever (or whatever) wrote it.
              </Text>
            </Text>
          </Box>
        </Box>
      </Section>

      {/* Pointers */}
      <Section
        title="See what you get"
        intro="Every token is documented on the Foundations page; every closed component has a live demo with copyable code."
      >
        <Box flexDirection="row" gap="s" className="flex-wrap items-center">
          <Button intent="primary" onClick={() => onNavigate('foundations')}>
            Explore the tokens
          </Button>
          <Button intent="secondary" onClick={() => onNavigate('Button')}>
            Browse components
          </Button>
        </Box>
        <Text variant="caption" color="muted">
          Prefer to wire it up by hand? The full manual setup lives in USAGE.md.
          Styles ship precompiled, so there&rsquo;s no StyleX or bundler plugin
          to configure — just two CSS imports.
        </Text>
      </Section>
    </PageShell>
  )
}
