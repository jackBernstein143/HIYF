"use client"

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Progress as ProgressPrimitive } from './ui/progress'

/**
 * Progress — a closed wrapper over shadcn's Progress primitive.
 *
 * shadcn's <Progress> accepts arbitrary `className`, letting consumers paint
 * the indicator any color on a whim. This wrapper closes it:
 *   - `tone` names the indicator color by INTENT (neutral/success/danger).
 *   - `value` is constrained to 0–100 (clamped internally).
 *   - NO `className`/`style` escape hatch. Every progress bar on screen is
 *     one of a finite, on-brand set of treatments.
 *   - Need another tone? Add it here — a deliberate, reviewable DS change.
 */

const indicatorVariants = cva('size-full flex-1 transition-all', {
  variants: {
    tone: {
      neutral: 'bg-primary',
      success: 'bg-emerald-500',
      danger: 'bg-destructive',
    },
  },
  defaultVariants: { tone: 'neutral' },
})

export type ProgressTone = NonNullable<VariantProps<typeof indicatorVariants>['tone']>

export interface ProgressProps {
  /** Current value, 0–100 (clamped). */
  value: number
  /** Named by intent, not appearance. */
  tone?: ProgressTone
}

export function Progress({ value, tone = 'neutral' }: ProgressProps) {
  // Clamp to [0, 100] so callers can't inadvertently break the bar.
  const clamped = Math.min(100, Math.max(0, value))
  // The ui primitive renders its own indicator; we replicate its inline-style
  // approach and swap in our tone-aware class by rendering directly on the
  // Radix root — we piggyback the primitive's track styles via className on the
  // wrapper div instead of ProgressPrimitive so we stay closed at the API layer.
  return (
    <div
      data-slot="progress"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className="relative flex h-1.5 w-full items-center overflow-x-hidden rounded-full bg-muted"
    >
      <div
        className={indicatorVariants({ tone })}
        style={{ transform: `translateX(-${100 - clamped}%)` }}
      />
    </div>
  )
}
