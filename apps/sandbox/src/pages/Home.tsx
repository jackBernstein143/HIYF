import { Box, Text, Badge, Button, Alert, Separator } from '@jackbernnie/hiyf'
import { CodeBlock, PageShell, Section } from './docKit'

/* ──────────────────────────────────────────────────────────────────────────
 * Home — what this is and how to use it. Built entirely from the design system,
 * so the page itself is a worked example of the rules it describes (and passes
 * the lockdown lint).
 * ────────────────────────────────────────────────────────────────────────── */

// One prompt to rule it all: hand this to an agentic coding LLM (Claude Code,
// Codex, …) and it installs, wires up, uses, and self-verifies the system. The
// lockdown lint guarantees it can't go off-system without failing the build.
const setupPrompt = `Set up and use the @jackbernnie/hiyf design system in this project.

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
- Never use raw HTML elements (<div>, <span>, <button>…), arbitrary Tailwind
  values (p-[17px]), or inline style={…}. They fail the build on purpose.
- If something you need doesn't exist, add it to the design system instead of
  working around it.

Before you finish, run \`npm run lint\` and \`npm run build\`. If either fails,
fix the code until both pass. Green lint means the UI is on-system.`

export function Home({ onNavigate }: { onNavigate: (name: string) => void }) {
  return (
    <PageShell>
      {/* Hero */}
      <Box flexDirection="column" gap="m">
        <Box flexDirection="row" gap="s" className="items-center">
          <Badge tone="neutral">LLM-safe design system</Badge>
        </Box>
        <Text variant="heading-l" as="h1">
          human-in-your-face
        </Text>
        <Text variant="body" color="muted">
          A component system with the guard rails built in. The only UI you can
          express is on-system UI — raw elements, arbitrary styles, and one-off
          colors simply fail the build. That makes it safe to hand to an LLM:
          give it the rules once and the build keeps it honest.
        </Text>
      </Box>

      <Separator spacing="sm" />

      {/* The headline feature: one prompt does everything */}
      <Section
        title="Get started — hand this to your LLM"
        intro="Copy the prompt below into Claude Code, Codex, or any coding agent. It installs the packages, wires up the theme and the lint, then builds using only approved components — and verifies its own work."
      >
        <Box flexDirection="column" gap="m">
          <CodeBlock label="Setup + usage prompt" code={setupPrompt} />
          <Alert tone="success" title="Why you can trust the result">
            <Text>
              The prompt ends by running <Text as="code" monospace>npm run lint</Text>{' '}
              and <Text as="code" monospace>npm run build</Text>. The lockdown lint
              turns every off-system choice into a build error, so the agent
              physically can&rsquo;t finish with raw <Text as="code" monospace>&lt;div&gt;</Text>s,
              arbitrary Tailwind, or inline styles. The worst case is a failed
              build it has to fix — never a shipped inconsistency.
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
