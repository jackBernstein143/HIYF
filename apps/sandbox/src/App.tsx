import { useEffect, useMemo, useState } from 'react'
import { Badge, Box, Button, Input, Separator, Text } from '@jackbernnie/hiyf'
import { categories, registry, type Entry } from './showcase/registry'
import { Home } from './pages/Home'
import { Foundations } from './pages/Foundations'
import { Docs } from './pages/Docs'
import { HiyfLogo } from './Logo'

// Doc pages live alongside the component registry in the same nav. A selection
// is either one of these page keys or a component name.
type PageKey = 'home' | 'docs' | 'foundations'
const PAGES: { key: PageKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'docs', label: 'Docs' },
  { key: 'foundations', label: 'Foundations' },
]
const isPage = (s: string): s is PageKey => s === 'home' || s === 'docs' || s === 'foundations'

/* ──────────────────────────────────────────────────────────────────────────
 * Showcase chrome. Built entirely from the design system + Box/Text, so this
 * app itself passes the lockdown lint (no raw <div>, no arbitrary Tailwind).
 * `pre`/`code` are permitted by the lockdown rules and used only for snippets.
 * ────────────────────────────────────────────────────────────────────────── */

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

  const crumbCategory = page ? 'HIYF' : current?.category
  const crumbName =
    page === 'home'
      ? 'Home'
      : page === 'docs'
        ? 'Docs'
        : page === 'foundations'
          ? 'Foundations'
          : current?.name

  // Home is the front door: full-bleed landing, no sidebar — a minimal top nav
  // leads into the docs + the component sandbox.
  if (page === 'home') {
    const firstComponent = registry[0]?.name ?? 'foundations'
    return (
      <Box flexDirection="column" className="min-h-screen bg-background">
        <Box
          as="header"
          flexDirection="row"
          className="sticky top-0 z-20 items-center justify-between border-b border-border bg-background/80 px-10 py-4 backdrop-blur"
        >
          <Box
            as="div"
            role="button"
            tabIndex={0}
            onClick={() => select('home')}
            flexDirection="row"
            gap="s"
            className="cursor-pointer items-center"
          >
            <HiyfLogo height={22} />
            <Text variant="label">HIYF</Text>
          </Box>
          <Box flexDirection="row" gap="xs" className="items-center">
            <Button intent="ghost" size="sm" onClick={() => select('docs')}>Docs</Button>
            <Button intent="ghost" size="sm" onClick={() => select(firstComponent)}>Components</Button>
            <Button intent="secondary" size="sm" onClick={() => setDark((d) => !d)}>
              {dark ? '☀ Light' : '☾ Dark'}
            </Button>
          </Box>
        </Box>
        <Home onNavigate={select} />
      </Box>
    )
  }

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
              <Text variant="caption" color="muted">OVERVIEW</Text>
            </Box>
            {PAGES.map((p) => (
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
            <Text variant="caption" color="muted">{crumbCategory}</Text>
            <Text variant="caption" color="muted">/</Text>
            <Text variant="label">{crumbName}</Text>
          </Box>
          <Button intent="secondary" size="sm" onClick={() => setDark((d) => !d)}>
            {dark ? '☀ Light' : '☾ Dark'}
          </Button>
        </Box>

        {page === 'docs' ? (
          <Docs onNavigate={select} />
        ) : page === 'foundations' ? (
          <Foundations />
        ) : current ? (
          <Box flexDirection="column" gap="xl" className="mx-auto w-full max-w-3xl px-10 py-12">
            <Box flexDirection="column" gap="xs" padding="m" borderRadius="m" className="border border-border bg-muted/40">
              <Text variant="label">Example design system</Text>
              <Text variant="caption" color="muted">
                This gallery is HIYF in its neutral theme — an example of the showcase your
                project generates, re-themed to your brand.
              </Text>
            </Box>
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
