"use client"

import * as React from "react"
import {
  HoverCard as HoverCardPrimitive,
  HoverCardTrigger,
  HoverCardContent,
} from "./ui/hover-card"

/**
 * HoverCard — a closed convenience wrapper over the shadcn HoverCard primitives.
 *
 * The underlying HoverCardContent accepts arbitrary `className`, enabling
 * per-instance overrides to width, shadow, and border radius that would
 * fragment the visual language. This wrapper closes that:
 *   - `side` is the only placement control; align is fixed to 'center'
 *     because hover-cards rarely need asymmetric anchoring.
 *   - The card's background (bg-popover), shadow (shadow-md), and ring are
 *     fixed to the system token treatment — no per-instance overrides.
 *   - No `className` or `style` escape hatch on any public prop.
 */

export interface HoverCardProps {
  /** Element that triggers the hover card on mouse enter. */
  trigger: React.ReactNode
  /** Card content shown on hover. */
  children: React.ReactNode
  /** Preferred side relative to the trigger; defaults to 'bottom'. */
  side?: "top" | "right" | "bottom" | "left"
}

export function HoverCard({ trigger, children, side = "bottom" }: HoverCardProps) {
  return (
    <HoverCardPrimitive>
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
      <HoverCardContent side={side}>
        {children}
      </HoverCardContent>
    </HoverCardPrimitive>
  )
}
