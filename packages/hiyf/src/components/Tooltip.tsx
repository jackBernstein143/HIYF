"use client"

import * as React from 'react'
import {
  Tooltip as TooltipPrimitive,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './ui/tooltip'

/**
 * Tooltip — a closed convenience wrapper over shadcn's Tooltip primitive family.
 *
 * shadcn's Tooltip requires consumers to assemble TooltipProvider, Tooltip,
 * TooltipTrigger, and TooltipContent manually, and TooltipContent accepts
 * arbitrary `className`. This wrapper closes it:
 *   - A single `<Tooltip>` component composes the full stack internally.
 *   - `content` is the tooltip body (typed as ReactNode for rich content).
 *   - `side` is enumerated ('top'|'right'|'bottom'|'left') — no arbitrary
 *     position overrides via className.
 *   - The trigger is wrapped with `asChild` so any element can be the trigger.
 *   - NO `className`/`style` escape hatch. Every tooltip on screen uses the
 *     same on-brand treatment.
 *   - Need a custom delay or alignment? Add an enumerated prop here.
 */

export interface TooltipProps {
  /** The tooltip's popup content. */
  content: React.ReactNode
  /** The element that triggers the tooltip on hover/focus. */
  children: React.ReactNode
  /** Which side of the trigger the tooltip appears on. Defaults to 'top'. */
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <TooltipProvider>
      <TooltipPrimitive>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  )
}
