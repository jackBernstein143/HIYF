import * as React from 'react'
import { Badge as BadgePrimitive } from './ui/badge'

/**
 * Badge — a closed intent-named badge wrapper over shadcn's Badge primitive.
 *
 * shadcn's Badge accepts a `variant` named by appearance (default/secondary/
 * destructive/outline) and arbitrary `className`, leaving every usage open to
 * one-off overrides. This wrapper closes it:
 *   - `tone` is named by INTENT (neutral/primary/success/warning/danger/info),
 *     not by appearance — the same philosophy as HIYF's Status component.
 *   - Maps each tone to the appropriate ui primitive variant and internal
 *     className for tones not covered by the primitive's own variants.
 *   - NO `className`/`style` escape hatch. Every badge on screen is one of
 *     a finite set of correct, on-brand treatments.
 *   - Coexists with Status: Status is for state labels (dot + text chip);
 *     Badge is for compact categorical tags (counts, labels, categories).
 *   - Need another tone? Add it to the TONE_MAP below.
 */

type ToneConfig =
  | { variant: 'default' | 'secondary' | 'destructive' | 'outline'; className?: string }

const TONE_MAP: Record<string, ToneConfig> = {
  neutral:  { variant: 'secondary' },
  primary:  { variant: 'default' },
  success:  { variant: 'outline', className: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  warning:  { variant: 'outline', className: 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  danger:   { variant: 'destructive' },
  info:     { variant: 'outline', className: 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400' },
} as const

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface BadgeProps {
  /**
   * Intent of the badge.
   * - 'neutral'  → muted/secondary style
   * - 'primary'  → brand/primary style
   * - 'success'  → green semantic style
   * - 'warning'  → amber semantic style
   * - 'danger'   → destructive/red style
   * - 'info'     → blue semantic style
   * Defaults to 'neutral'.
   */
  tone?: BadgeTone
  children: React.ReactNode
}

/** Closed intent-named badge — no className/style. */
export function Badge({ tone = 'neutral', children }: BadgeProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  const config = TONE_MAP[tone]
  return (
    <BadgePrimitive variant={config.variant} className={config.className}>
      {children}
    </BadgePrimitive>
  )
}
