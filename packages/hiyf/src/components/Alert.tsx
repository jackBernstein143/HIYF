import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  Alert as AlertPrimitive,
  AlertTitle,
  AlertDescription,
} from './ui/alert'

/**
 * Alert — a closed wrapper over shadcn's Alert primitive.
 *
 * shadcn's <Alert> accepts an arbitrary `variant` and `className`, letting any
 * tone bleed in unchecked. This wrapper closes it:
 *   - `tone` is named by INTENT (neutral/info/success/warning/danger), not by
 *     appearance — the same strategy as HIYF's Status chip.
 *   - A colored left border communicates the tone without arbitrary overrides.
 *   - NO `className`/`style` escape hatch. Every alert on screen is one of a
 *     finite, on-brand set of treatments.
 *   - Need another treatment? Add a `tone` here — a deliberate, reviewable
 *     change to the design system.
 */

const alertWrapperVariants = cva(
  'relative w-full border-l-4 [&>div[data-slot=alert]]:border-0 [&>div[data-slot=alert]]:rounded-none',
  {
    variants: {
      tone: {
        neutral: 'border-l-muted-foreground/40',
        info: 'border-l-blue-500',
        success: 'border-l-emerald-500',
        warning: 'border-l-amber-500',
        danger: 'border-l-destructive',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
)

const alertInnerVariants = cva('rounded-none border-0 border-l-0', {
  variants: {
    tone: {
      neutral: 'bg-muted/50 text-foreground',
      info: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
      success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
      warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
      danger: 'bg-destructive/10 text-destructive',
    },
  },
  defaultVariants: { tone: 'neutral' },
})

export type AlertTone = NonNullable<VariantProps<typeof alertWrapperVariants>['tone']>

export interface AlertProps {
  /** Named by intent, not appearance. */
  tone?: AlertTone
  /** Optional heading displayed above the description. */
  title?: string
  /** Alert body / description content. */
  children: React.ReactNode
}

export function Alert({ tone = 'neutral', title, children }: AlertProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <div className={alertWrapperVariants({ tone })}>
      <AlertPrimitive className={alertInnerVariants({ tone })}>
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{children}</AlertDescription>
      </AlertPrimitive>
    </div>
  )
}
