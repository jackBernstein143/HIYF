import { Box, Text, Button } from '@jackbernnie/hiyf'
import { CodeBlock, PageShell, Section } from './docKit'

/* Real documentation — distinct from the component gallery. Built only from the
 * design system, so it passes the lockdown lint (pre/code are the permitted
 * exception, used inside CodeBlock for snippets). */

export function Docs({ onNavigate }: { onNavigate: (name: string) => void }) {
  return (
    <PageShell>
      <Box flexDirection="column" gap="s">
        <Text variant="heading-l" as="h1">Documentation</Text>
        <Text color="muted">
          How to install HIYF, the rules that keep UI on-system, and where to go next.
        </Text>
      </Box>

      <Section title="What it is">
        <Text color="muted">
          HIYF is an AI design protocol — a locked design system built on shadcn/ui plus StyleX
          primitives. The only UI you can express is on-system UI; off-system code (raw elements,
          arbitrary Tailwind, inline styles) fails the build via the lockdown lint. That is what
          makes it safe to hand to a coding agent.
        </Text>
      </Section>

      <Section title="Install & wire up">
        <CodeBlock label="install" code={`npm install @jackbernnie/hiyf\nnpm install -D hiyf-eslint-config`} />
        <CodeBlock
          label="global CSS — no StyleX or bundler plugin needed (styles ship precompiled)"
          code={`@import "tailwindcss";\n@import "@jackbernnie/hiyf/theme.css";\n@import "@jackbernnie/hiyf/styles.css";\n@source "../node_modules/@jackbernnie/hiyf/dist";`}
        />
        <CodeBlock label="eslint.config.mjs" code={`import lockdown from 'hiyf-eslint-config'\nexport default [...lockdown]`} />
      </Section>

      <Section title="The three rules" intro="Each of these fails npm run build on purpose:">
        <Box as="ul" flexDirection="column" gap="s">
          <Box as="li">
            <Text>
              <Text as="strong">No raw HTML elements.</Text>{' '}
              <Text as="span" color="muted">
                Use <Text as="code" monospace>Box</Text> / <Text as="code" monospace>Text</Text> or
                a component. (<Text as="code" monospace>pre</Text>/<Text as="code" monospace>code</Text> are allowed.)
              </Text>
            </Text>
          </Box>
          <Box as="li">
            <Text>
              <Text as="strong">No arbitrary Tailwind values.</Text>{' '}
              <Text as="span" color="muted">
                No <Text as="code" monospace>p-[17px]</Text> or <Text as="code" monospace>bg-[#abc]</Text> — use a token.
              </Text>
            </Text>
          </Box>
          <Box as="li">
            <Text>
              <Text as="strong">No inline styles.</Text>{' '}
              <Text as="span" color="muted">Use a Box style prop or a component prop.</Text>
            </Text>
          </Box>
        </Box>
      </Section>

      <Section title="Layout & text" intro="Box is the layout primitive; Text renders every piece of text. Both take tokens only.">
        <CodeBlock
          label="Box + Text"
          code={`<Box flexDirection="column" gap="m" padding="l">\n  <Text variant="heading-s">Title</Text>\n  <Text color="muted">Supporting copy</Text>\n</Box>`}
        />
        <Text variant="caption" color="muted">The full token reference (spacing, color, radius, type) lives on the Foundations page.</Text>
      </Section>

      <Section title="Icons" intro="Standardized on hugeicons, which ship with the package. Do not add another icon library.">
        <CodeBlock
          label="Icon"
          code={`import { Icon } from '@jackbernnie/hiyf'\nimport { Home01Icon } from '@jackbernnie/hiyf/icons'\n\n<Icon icon={Home01Icon} size="m" color="muted" />`}
        />
      </Section>

      <Section title="When something doesn’t exist">
        <Text color="muted">
          Express it with existing tokens and components first — most gaps are not real. If it is
          clearly reusable, add a token, variant, or component to the system. If it is a genuine
          one-off, escape-hatch a single line with a{' '}
          <Text as="code" monospace>// eslint-disable-next-line no-restricted-syntax</Text> comment
          and a short reason, then list every escape hatch for review.
        </Text>
      </Section>

      <Section title="Next">
        <Box flexDirection="row" gap="s" className="flex-wrap items-center">
          <Button intent="primary" onClick={() => onNavigate('home')}>Start a project</Button>
          <Button intent="secondary" onClick={() => onNavigate('foundations')}>Token reference</Button>
          <Button intent="ghost" onClick={() => onNavigate('Button')}>Browse components</Button>
        </Box>
      </Section>
    </PageShell>
  )
}
