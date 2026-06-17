import { Box, Text, Separator } from '@jackbernnie/hiyf'
import { CodeBlock, PageShell, Section } from './docKit'

/* ──────────────────────────────────────────────────────────────────────────
 * Foundations — the design tokens, rendered as live swatches built from the
 * system itself (every swatch below is a <Box> using the very token it shows).
 * This is the "full picture" an engineer (or an LLM) needs to use HIYF safely.
 * ────────────────────────────────────────────────────────────────────────── */

// Box `backgroundColor` tokens — the surfaces you compose layouts on.
const SURFACE_TOKENS = [
  'background-primary',
  'background-secondary',
  'background-card',
  'background-inverse',
  'background-success',
  'background-warning',
  'background-danger',
  'background-pending',
] as const

// Semantic palette the closed components render with (Tailwind theme vars).
const PALETTE = [
  'bg-background',
  'bg-card',
  'bg-primary',
  'bg-secondary',
  'bg-muted',
  'bg-accent',
  'bg-destructive',
] as const

const TEXT_VARIANTS = [
  'heading-l',
  'heading-m',
  'heading-s',
  'heading-xs',
  'heading-xxs',
  'body',
  'default',
  'label',
  'caption',
] as const

const TEXT_COLORS = [
  'default',
  'muted',
  'disabled',
  'accent',
  'success',
  'warning',
  'danger',
] as const

// [token, pixels] — the spacing scale shared by padding / margin / gap.
const SPACING = [
  ['none', 0],
  ['xs', 4],
  ['s', 8],
  ['m', 12],
  ['l', 16],
  ['xl', 24],
  ['2xl', 32],
  ['3xl', 48],
  ['4xl', 64],
  ['5xl', 96],
] as const

// [token, label] for borderRadius.
const RADII = [
  ['none', '0'],
  ['s', '8px'],
  ['m', '12px'],
  ['l', '16px'],
  ['xl', '32px'],
  ['full', '9999px'],
] as const

const SHADOWS = ['none', 's', 'm', 'l', 'xl'] as const

const DURATIONS = [
  ['instant', '0ms'],
  ['fast', '120ms'],
  ['base', '200ms'],
  ['slow', '320ms'],
  ['slower', '480ms'],
] as const

const EASINGS = [
  ['standard', 'cubic-bezier(0.2, 0, 0, 1)'],
  ['decelerate', 'cubic-bezier(0, 0, 0, 1)'],
  ['accelerate', 'cubic-bezier(0.3, 0, 1, 1)'],
  ['spring', 'cubic-bezier(0.5, 1.25, 0.4, 1)'],
] as const

function ValueRow({ name, value }: { name: string; value: string }) {
  return (
    <Box flexDirection="row" gap="m" className="items-center">
      <Box width={72}>
        <Text variant="caption" monospace>
          {name}
        </Text>
      </Box>
      <Text variant="caption" color="muted" monospace>
        {value}
      </Text>
    </Box>
  )
}

export function Foundations() {
  return (
    <PageShell>
      <Box flexDirection="column" gap="s">
        <Text variant="heading-l" as="h1">
          Foundations
        </Text>
        <Text variant="body" color="muted">
          Every value the system can express, and the prop you reach it through.
          Tokens are the whole vocabulary — if a value isn&rsquo;t here, it
          isn&rsquo;t expressible, and that&rsquo;s the point. Need a new one? Add
          it to the design system rather than reaching for a one-off.
        </Text>
      </Box>

      <Separator spacing="sm" />

      {/* Color */}
      <Section
        title="Color"
        intro="Compose surfaces with Box backgroundColor tokens; the closed components render from the semantic palette below."
      >
        <Box flexDirection="column" gap="l">
          <Box flexDirection="column" gap="s">
            <Text variant="label">Box surfaces — backgroundColor="…"</Text>
            <Box flexDirection="row" gap="m" className="flex-wrap">
              {SURFACE_TOKENS.map((t) => (
                <Box key={t} flexDirection="column" gap="xs" width={150}>
                  <Box
                    backgroundColor={t}
                    height={56}
                    borderRadius="m"
                    className="border border-border"
                  />
                  <Text variant="caption" color="muted" monospace>
                    {t}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>

          <Box flexDirection="column" gap="s">
            <Text variant="label">Semantic palette — what components use</Text>
            <Box flexDirection="row" gap="m" className="flex-wrap">
              {PALETTE.map((c) => (
                <Box key={c} flexDirection="column" gap="xs" width={150}>
                  <Box
                    height={56}
                    borderRadius="m"
                    className={`border border-border ${c}`}
                  />
                  <Text variant="caption" color="muted" monospace>
                    {c}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Section>

      {/* Typography */}
      <Section
        title="Typography"
        intro={'Pick a role with <Text variant="…">, never a raw size. Heading roles also map to the right h1–h6 element.'}
      >
        <Box flexDirection="column" gap="l">
          {TEXT_VARIANTS.map((v) => (
            <Box key={v} flexDirection="column" gap="xs">
              <Text variant="caption" color="muted" monospace>
                variant=&quot;{v}&quot;
              </Text>
              <Text variant={v}>Human In Your Face</Text>
            </Box>
          ))}
        </Box>

        <Box flexDirection="column" gap="s">
          <Text variant="label">Text colors — color="…"</Text>
          <Box flexDirection="row" gap="l" className="flex-wrap">
            {TEXT_COLORS.map((c) => (
              <Text key={c} color={c} monospace>
                {c}
              </Text>
            ))}
          </Box>
          <Text variant="caption" color="muted">
            Plus inverse / white / black for placing text on filled surfaces, and
            inherit to adopt a parent&rsquo;s color.
          </Text>
        </Box>
      </Section>

      {/* Spacing */}
      <Section
        title="Spacing"
        intro="One scale powers padding, margin, and gap on Box. Values are deliberate steps, not a continuum."
      >
        <Box flexDirection="column" gap="s">
          {SPACING.map(([name, px]) => (
            <Box key={name} flexDirection="row" gap="m" className="items-center">
              <Box width={56}>
                <Text variant="caption" monospace>
                  {name}
                </Text>
              </Box>
              <Box width={48}>
                <Text variant="caption" color="muted">
                  {px}px
                </Text>
              </Box>
              <Box height={14} width={px} borderRadius="s" className="bg-primary" />
            </Box>
          ))}
        </Box>
      </Section>

      {/* Radius */}
      <Section title="Corner radius" intro={'borderRadius="…" on Box, and the basis for every component corner.'}>
        <Box flexDirection="row" gap="xl" className="flex-wrap">
          {RADII.map(([name, label]) => (
            <Box key={name} flexDirection="column" gap="xs" className="items-center">
              <Box
                width={72}
                height={72}
                borderRadius={name}
                className="border border-border bg-muted"
              />
              <Text variant="caption" monospace>
                {name}
              </Text>
              <Text variant="caption" color="muted">
                {label}
              </Text>
            </Box>
          ))}
        </Box>
      </Section>

      {/* Elevation */}
      <Section title="Elevation" intro={'boxShadow="…" — a short, restrained set of depths.'}>
        <Box
          backgroundColor="background-secondary"
          padding="xl"
          borderRadius="m"
          flexDirection="row"
          gap="xl"
          className="flex-wrap"
        >
          {SHADOWS.map((s) => (
            <Box
              key={s}
              width={120}
              height={72}
              borderRadius="m"
              boxShadow={s}
              className="items-center justify-center border border-border bg-card"
            >
              <Text variant="caption" monospace>
                {s}
              </Text>
            </Box>
          ))}
        </Box>
      </Section>

      {/* Motion */}
      <Section
        title="Motion"
        intro="Durations are tunable tokens; easings are fixed curves. Reach them via Box transitionDuration / ease."
      >
        <Box flexDirection="row" gap="2xl" className="flex-wrap">
          <Box flexDirection="column" gap="s">
            <Text variant="label">Durations</Text>
            {DURATIONS.map(([name, value]) => (
              <ValueRow key={name} name={name} value={value} />
            ))}
          </Box>
          <Box flexDirection="column" gap="s">
            <Text variant="label">Easings</Text>
            {EASINGS.map(([name, value]) => (
              <ValueRow key={name} name={name} value={value} />
            ))}
          </Box>
        </Box>
      </Section>

      <Separator spacing="sm" />

      {/* How tokens reach the screen */}
      <Section
        title="Putting it together"
        intro="Tokens are not decoration — they are the only API. A representative slice:"
      >
        <CodeBlock
          code={`<Box
  flexDirection="column"
  gap="m"               // spacing token
  padding="l"           // spacing token
  backgroundColor="background-card"
  borderRadius="m"      // radius token
  boxShadow="s"         // elevation token
>
  <Text variant="heading-s">Title</Text>
  <Text color="muted">Supporting copy</Text>
</Box>`}
        />
      </Section>
    </PageShell>
  )
}
