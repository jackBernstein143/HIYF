import * as React from 'react'
import { Spinner as SpinnerPrimitive } from './ui/spinner'

/**
 * Spinner — a closed loading indicator wrapper over shadcn's Spinner primitive.
 *
 * shadcn's Spinner accepts arbitrary `className` for size overrides, making
 * every usage a one-off. This wrapper closes it:
 *   - `size` is enumerated ('sm'|'md'|'lg') and maps to fixed Tailwind size
 *     classes — the only expressible spinner sizes are correct, system-sanctioned ones.
 *   - NO `className`/`style` escape hatch. Every spinner on screen is one of
 *     three on-brand sizes.
 *   - Need a new size step? Add it to the SIZE_CLASS map below.
 */

const SIZE_CLASS = {
  sm: 'size-3',
  md: 'size-4',
  lg: 'size-6',
} as const

export interface SpinnerProps {
  /** Enumerated size. Defaults to 'md'. */
  size?: 'sm' | 'md' | 'lg'
}

/** Closed loading spinner — no className/style. */
export function Spinner({ size = 'md' }: SpinnerProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return <SpinnerPrimitive className={SIZE_CLASS[size]} />
}
