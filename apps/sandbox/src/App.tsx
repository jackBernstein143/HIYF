import { useEffect, useMemo, useState } from 'react'
import { Badge, Box, Button, Input, Separator, Text } from '@jackbernnie/hiyf'
import { categories, registry, type Entry } from './showcase/registry'
import { Home } from './pages/Home'
import { Foundations } from './pages/Foundations'
import { Docs } from './pages/Docs'
import { HiyfLogo } from './Logo'

// Three surfaces:
//  • 'home'  — the website landing (standalone, top nav)
//  • 'docs'  — the documentation (standalone, top nav, lives on its own)
//  • the EXAMPLE PROJECT (a sample HIYF design system) — its own left sidebar:
//      'example' (the About/Overview tab) + 'foundations' + every component.
type PageKey = 'home' | 'docs' | 'example' | 'foundations'
// Only these appear in the example project's sidebar.
const SIDEBAR_PAGES: { key: PageKey; label: string }[] = [
  { key: 'example', label: 'Overview' },
  { key: 'foundations', label: 'Foundations' },
]
const isPage = (s: string): s is PageKey =>
  s === 'home' || s === 'docs' || s === 'example' || s === 'foundations'

/* ──────────────────────────────────────────────────────────────────────────
 * Showcase chrome. Built entirely from the design system + Box/Text, so this
 * app itself passes the lockdown lint (no raw <div>, no arbitrary Tailwind).
 * `pre`/`code` are permitted by the lockdown rules and used only for snippets.
 * ────────────────────────────────────────────────────────────────────────── */

/** Top nav shared by the standalone pages (home + docs). */
function TopBar({
  dark,
  onToggleDark,
  onNavigate,
}: {
  dark: boolean
  onToggleDark: () => void
  onNavigate: (name: string) => void
}) {
  return (
    <Box
      as="header"
      flexDirection="row"
      className="sticky top-0 z-20 items-center justify-between border-b border-border bg-background/80 px-10 py-4 backdrop-blur"
    >
      <Box
        as="div"
        role="button"
        tabIndex={0}
        onClick={() => onNavigate('home')}
        flexDirection="row"
        gap="s"
        className="cursor-pointer items-center"
      >
        <HiyfLogo height={22} />
        <Text variant="label">HIYF</Text>
      </Box>
      <Box flexDirection="row" gap="xs" className="items-center">
        <Button intent="ghost" size="sm" onClick={() => onNavigate('docs')}>Docs</Button>
        <Button intent="ghost" size="sm" onClick={() => onNavigate('example')}>Components</Button>
        <Button intent="secondary" size="sm" onClick={onToggleDark}>
          {dark ? '☀ Light' : '☾ Dark'}
        </Button>
      </Box>
    </Box>
  )
}

/** The example project's landing tab — explains what the gallery is. */
function ExampleHome({ onNavigate }: { onNavigate: (name: string) => void }) {
  return (
    <Box flexDirection="column" gap="xl" className="mx-auto w-full max-w-3xl px-10 py-12">
      <Box flexDirection="column" gap="s">
        <Text variant="caption" color="muted">EXAMPLE PROJECT</Text>
        <Text variant="heading-l" as="h1">An example design system</Text>
        <Text color="muted">
          This is HIYF in its neutral theme — an example of the showcase your project
          generates. When you set up HIYF (start fresh, model a reference, or adopt an
          existing app), your own components and tokens are re-themed to your brand and
          rendered exactly like this. Browse the components in the sidebar to see what you get.
        </Text>
      </Box>
      <Box flexDirection="row" gap="s" className="flex-wrap items-center">
        <Button intent="primary" onClick={() => onNavigate('foundations')}>See the tokens</Button>
        <Button intent="secondary" onClick={() => onNavigate('home')}>Set up your own</Button>
      </Box>
    </Box>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <Box
      as="div"
      className="overflow-x-auto border-t border-border bg-muted/40 px-4 py-3"
    >
      <pre className="font-mono text-xs leading-relaxed text-muted-foreground">
        <code>{code.trim()}</code>
      </pre>
    </Box>
  )
}

function PreviewCard({
  title,
  children,
  code,
}: {
  title?: string
  children: React.ReactNode
  code: string
}) {
  return (
    <Box flexDirection="column" className="overflow-hidden rounded-xl border border-border">
      {title ? (
        <Box className="border-b border-border px-4 py-2">
          <Text variant="label" color="muted">{title}</Text>
        </Box>
      ) : null}
      <Box
        className="flex min-h-32 flex-wrap items-center justify-center gap-4 bg-background p-10"
      >
        {children}
      </Box>
      <CodeBlock code={code} />
    </Box>
  )
}

function NavItem({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <Box
      as="div"
      role="button"
      tabIndex={0}
      onClick={onClick}
      className={
        'cursor-pointer rounded-md px-3 py-1.5 transition-colors ' +
        (active
          ? 'bg-muted text-foreground'
          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground')
      }
    >
      <Text variant="default">{label}</Text>
    </Box>
  )
}

function initialSelected(): string {
  if (typeof window !== 'undefined') {
    const fromHash = decodeURIComponent(window.location.hash.replace(/^#/, ''))
    if (isPage(fromHash)) return fromHash
    if (registry.some((e) => e.name === fromHash)) return fromHash
  }
  return 'home'
}

export function App() {
  const [dark, setDark] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(initialSelected)

  const select = (name: string) => {
    setSelected(name)
    if (typeof window !== 'undefined') window.location.hash = encodeURIComponent(name)
  }
  const toggleDark = () => setDark((d) => !d)

  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', dark)
  }

  // Jump to the top whenever the page/component changes.
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }, [selected])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return registry
    return registry.filter((e) => e.name.toLowerCase().includes(q))
  }, [query])

  const page = isPage(selected) ? selected : null
  const current: Entry | undefined = page
    ? undefined
    : registry.find((e) => e.name === selected) ?? filtered[0] ?? registry[0]

  // Standalone pages — the website landing and the documentation. Both use the
  // top nav, neither uses the example project's sidebar.
  if (page === 'home') {
    return (
      <Box flexDirection="column" className="min-h-screen bg-background">
        <TopBar dark={dark} onToggleDark={toggleDark} onNavigate={select} />
        <Home onNavigate={select} />
      </Box>
    )
  }
  if (page === 'docs') {
    return (
      <Box flexDirection="column" className="min-h-screen bg-background">
        <TopBar dark={dark} onToggleDark={toggleDark} onNavigate={select} />
        <Docs onNavigate={select} />
      </Box>
    )
  }

  // The example project: left sidebar (Overview + Foundations + components).
  const crumbName =
    page === 'example' ? 'Overview' : page === 'foundations' ? 'Foundations' : current?.name

  return (
    <Box flexDirection="row" className="min-h-screen bg-background">
      {/* Sidebar */}
      <Box
        as="aside"
        flexDirection="column"
        className="sticky top-0 h-screen w-72 shrink-0 overflow-y-auto border-r border-border bg-background"
      >
        <Box flexDirection="column" gap="m" className="px-5 py-5">
          <Box
            as="div"
            role="button"
            tabIndex={0}
            onClick={() => select('home')}
            flexDirection="row"
            gap="xs"
            className="cursor-pointer items-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <Text variant="label" color="inherit">← Back to home</Text>
          </Box>
          <Input
            placeholder="Search components…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>

        <Box flexDirection="column" gap="l" className="px-3 pb-10">
          <Box flexDirection="column" gap="xs">
            <Box className="px-3 pb-1">
              <Text variant="caption" color="muted">EXAMPLE PROJECT</Text>
            </Box>
            {SIDEBAR_PAGES.map((p) => (
              <NavItem
                key={p.key}
                label={p.label}
                active={selected === p.key}
                onClick={() => select(p.key)}
              />
            ))}
          </Box>
          {categories.map((cat) => {
            const items = filtered.filter((e) => e.category === cat)
            if (items.length === 0) return null
            return (
              <Box key={cat} flexDirection="column" gap="xs">
                <Box className="px-3 pb-1">
                  <Text variant="caption" color="muted">{cat.toUpperCase()}</Text>
                </Box>
                {items.map((e) => (
                  <NavItem
                    key={e.name}
                    label={e.name}
                    active={e.name === current?.name}
                    onClick={() => select(e.name)}
                  />
                ))}
              </Box>
            )
          })}
        </Box>
      </Box>

      {/* Main */}
      <Box flexDirection="column" className="min-w-0 flex-1">
        <Box
          as="header"
          flexDirection="row"
          className="sticky top-0 z-20 items-center justify-between border-b border-border bg-background/80 px-10 py-4 backdrop-blur"
        >
          <Box flexDirection="row" gap="s" className="items-center">
            <Text variant="caption" color="muted">Example project</Text>
            <Text variant="caption" color="muted">/</Text>
            <Text variant="label">{crumbName}</Text>
          </Box>
          <Button intent="secondary" size="sm" onClick={toggleDark}>
            {dark ? '☀ Light' : '☾ Dark'}
          </Button>
        </Box>

        {page === 'example' ? (
          <ExampleHome onNavigate={select} />
        ) : page === 'foundations' ? (
          <Foundations />
        ) : current ? (
          <Box flexDirection="column" gap="xl" className="mx-auto w-full max-w-3xl px-10 py-12">
            <Box flexDirection="column" gap="s">
              <Box flexDirection="row" gap="s" className="items-center">
                <Text variant="heading-s">{current.name}</Text>
                <Badge tone="neutral">{current.category}</Badge>
              </Box>
              <Text color="muted">{current.description}</Text>
            </Box>
            <Separator spacing="sm" />
            <Box flexDirection="column" gap="xl">
              {current.demos.map((demo, i) => {
                const Render = demo.Render
                return (
                  <PreviewCard key={i} title={demo.title} code={demo.code}>
                    <Render />
                  </PreviewCard>
                )
              })}
            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}
