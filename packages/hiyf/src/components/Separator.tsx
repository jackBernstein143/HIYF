"use client"

import * as React from 'react'
import { Separator as SeparatorPrimitive } from './ui/separator'

/**
 * Separator — a closed wrapper over shadcn's Separator primitive.
 *
 * shadcn's <Separator> accepts arbitrary `className`, letting consumers
 * add one-off margins or colors freely. This wrapper closes it:
 *   - `orientation` is the standard 'horizontal'|'vertical' axis choice.
 *   - `spacing` is enumerated ('sm'|'md'|'lg') and maps to a fixed margin
 *     class — the only expressible spacing options are system-sanctioned ones.
 *   - NO `className`/`style` escape hatch. Every separator on screen is
 *     one of a finite, on-brand set of treatments.
 *   - Need a new spacing step? Add it to the map here.
 */

const SPACING_MAP = {
  horizontal: {
    sm: 'my-2',
    md: 'my-4',
    lg: 'my-8',
  },
  vertical: {
    sm: 'mx-2',
    md: 'mx-4',
    lg: 'mx-8',
  },
} as const

export type SeparatorSpacing = 'sm' | 'md' | 'lg'
export type SeparatorOrientation = 'horizontal' | 'vertical'

export interface SeparatorProps {
  /** Axis of the rule. Defaults to 'horizontal'. */
  orientation?: SeparatorOrientation
  /** Enumerated surrounding whitespace. Defaults to 'md'. */
  spacing?: SeparatorSpacing
}

export function Separator({
  orientation = 'horizontal',
  spacing = 'md',
}: SeparatorProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <SeparatorPrimitive
      orientation={orientation}
      className={SPACING_MAP[orientation][spacing]}
    />
  )
}
