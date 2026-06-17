import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Status — an EXEMPLAR of the HIYF philosophy applied to the shadcn base.
 *
 * shadcn's <Badge> is open: it takes arbitrary `className`, a `variant` named by
 * appearance (default/secondary/destructive/outline), and any children. This
 * wrapper closes it down:
 *   - `color` is named by INTENT (success/warning/danger/info/neutral), not by
 *     appearance — the same idea as HIYF's "tokens as intent".
 *   - there is NO `className` / `style` escape hatch, so every Status on screen
 *     is one of a handful of correct, on-brand treatments. An off-brand status
 *     chip is simply not expressible.
 *   - need another treatment? Add a `color` here — a deliberate, reviewable
 *     change to the design system — rather than passing a one-off class.
 *
 * Copy this shape to wrap any other shadcn primitive in lockdown style.
 */
const statusVariants = cva(
  'inline-flex w-fit items-center gap-1.5 rounded-full border border-transparent font-medium',
  {
    variants: {
      color: {
        neutral: 'bg-muted text-muted-foreground',
        success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
        danger: 'bg-destructive/10 text-destructive',
        info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
      },
    },
    defaultVariants: { color: 'neutral', size: 'sm' },
  },
)

export type StatusColor = NonNullable<VariantProps<typeof statusVariants>['color']>

export interface StatusProps {
  children: React.ReactNode
  /** Named by intent, not appearance. */
  color?: StatusColor
  size?: 'sm' | 'md'
}

export function Status({ children, color, size }: StatusProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return <span className={statusVariants({ color, size })}>{children}</span>
}
