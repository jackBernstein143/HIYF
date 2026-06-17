"use client"

import * as React from 'react'
import {
  Carousel as CarouselPrimitive,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './ui/carousel'

/**
 * Carousel — a closed wrapper over shadcn's Carousel primitive family.
 *
 * shadcn's Carousel exposes a fully composable primitive set where consumers
 * manually assemble CarouselContent, CarouselItem, CarouselPrevious, and
 * CarouselNext, passing arbitrary className to each. This wrapper closes it:
 *   - `items` is an array of React nodes; the carousel structure (content,
 *     items, prev/next controls) is composed internally.
 *   - `orientation` is enumerated ('horizontal'|'vertical') — no raw Embla
 *     options passthrough.
 *   - NO `className`/`style` escape hatch. Every carousel on screen is one
 *     of two correct orientations with consistent item sizing and controls.
 *   - Need custom item sizing or loop behavior? Add enumerated props here.
 */

export interface CarouselProps {
  /** Slide contents. Each element becomes one carousel slide. */
  items: React.ReactNode[]
  /**
   * Scroll axis.
   * - 'horizontal' → slides scroll left/right (default)
   * - 'vertical'   → slides scroll up/down
   */
  orientation?: 'horizontal' | 'vertical'
}

/** Closed carousel — no className/style. */
export function Carousel({ items, orientation = 'horizontal' }: CarouselProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <CarouselPrimitive orientation={orientation}>
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>{item}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </CarouselPrimitive>
  )
}
