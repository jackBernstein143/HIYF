"use client"

import * as React from 'react'
import { AspectRatio as AspectRatioPrimitive } from './ui/aspect-ratio'

/**
 * AspectRatio — a closed wrapper over shadcn's AspectRatio primitive.
 *
 * shadcn's AspectRatio accepts a raw numeric `ratio`, allowing any arbitrary
 * aspect ratio. This wrapper closes it:
 *   - `ratio` is enumerated ('square'|'video'|'wide'|'portrait') and maps to
 *     a fixed set of numeric ratios — the only expressible proportions are
 *     the ones the design system sanctions.
 *   - NO `className`/`style` escape hatch. Every aspect-ratio container on
 *     screen is one of a finite, named set of proportions.
 *   - Need a new proportion? Add it to the RATIO_MAP below.
 */

const RATIO_MAP = {
  square: 1,
  video: 16 / 9,
  wide: 21 / 9,
  portrait: 3 / 4,
} as const

export interface AspectRatioProps {
  /**
   * Named aspect ratio.
   * - 'square'   → 1:1
   * - 'video'    → 16:9
   * - 'wide'     → 21:9
   * - 'portrait' → 3:4
   * Defaults to 'video'.
   */
  ratio?: 'square' | 'video' | 'wide' | 'portrait'
  children: React.ReactNode
}

/** Closed aspect ratio container — no className/style. */
export function AspectRatio({ ratio = 'video', children }: AspectRatioProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <AspectRatioPrimitive ratio={RATIO_MAP[ratio]}>
      {children}
    </AspectRatioPrimitive>
  )
}
