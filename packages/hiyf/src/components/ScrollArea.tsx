"use client"

import * as React from 'react'
import { ScrollArea as ScrollAreaPrimitive } from './ui/scroll-area'

/**
 * ScrollArea — a closed wrapper over shadcn's ScrollArea primitive.
 *
 * shadcn's ScrollArea accepts arbitrary `className` for sizing and shape,
 * making every usage a one-off. This wrapper closes it:
 *   - `height` is enumerated ('sm'|'md'|'lg') and maps to fixed max-height
 *     classes — the only expressible scroll-container heights are correct ones.
 *   - NO `className`/`style` escape hatch. Every scroll area on screen uses
 *     one of the system-sanctioned heights.
 *   - Need a new height step? Add it to the HEIGHT_MAP below.
 */

const HEIGHT_MAP = {
  sm: 'max-h-40',
  md: 'max-h-72',
  lg: 'max-h-[32rem]',
} as const

export interface ScrollAreaProps {
  /** Enumerated max-height constraint. Defaults to 'md'. */
  height?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

/** Closed scroll area — no className/style. */
export function ScrollArea({ height = 'md', children }: ScrollAreaProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <ScrollAreaPrimitive className={HEIGHT_MAP[height]}>
      {children}
    </ScrollAreaPrimitive>
  )
}
