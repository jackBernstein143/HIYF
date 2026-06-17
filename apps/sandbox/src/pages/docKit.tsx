import { useState, type ReactNode } from 'react'
import { Box, Text, Button } from '@jackbernnie/hiyf'

/* ──────────────────────────────────────────────────────────────────────────
 * Shared building blocks for the documentation pages (Home, Foundations).
 * Built only from Box/Text/components — `pre`/`code` are the one raw-element
 * exception the lockdown lint permits, used solely for code snippets.
 * ────────────────────────────────────────────────────────────────────────── */

/** A one-click "copy to clipboard" control with transient confirmation. */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      })
      .catch(() => {})
  }
  return (
    <Button intent="ghost" size="sm" onClick={copy}>
      {copied ? '✓ Copied' : 'Copy'}
    </Button>
  )
}

/**
 * A standalone, copyable code snippet with a Copy button. Pass `label` to title
 * the snippet (e.g. the prompt block).
 */
export function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <Box
      flexDirection="column"
      borderRadius="m"
      className="overflow-hidden border border-border bg-muted/40"
    >
      <Box
        flexDirection="row"
        className="items-center justify-between border-b border-border px-3 py-1.5"
      >
        <Text variant="caption" color="muted">
          {label ?? ''}
        </Text>
        <CopyButton text={code} />
      </Box>
      <Box as="div" className="overflow-x-auto px-4 py-3">
        <pre className="font-mono text-xs leading-relaxed text-muted-foreground">
          <code>{code.trim()}</code>
        </pre>
      </Box>
    </Box>
  )
}

/** A titled documentation section with an optional lead paragraph. */
export function Section({
  title,
  intro,
  children,
}: {
  title: string
  intro?: ReactNode
  children: ReactNode
}) {
  return (
    <Box as="section" flexDirection="column" gap="l">
      <Box flexDirection="column" gap="xs">
        <Text variant="heading-xs" as="h2">
          {title}
        </Text>
        {intro ? <Text color="muted">{intro}</Text> : null}
      </Box>
      {children}
    </Box>
  )
}

/** Page-level wrapper: centered column with consistent gutters. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <Box
      flexDirection="column"
      gap="2xl"
      className="mx-auto w-full max-w-3xl px-10 py-12"
    >
      {children}
    </Box>
  )
}
