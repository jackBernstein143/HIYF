"use client"

import * as React from "react"
import {
  Popover as PopoverPrimitive,
  PopoverTrigger,
  PopoverContent,
} from "./ui/popover"

/**
 * Popover — a closed convenience wrapper over the shadcn Popover primitives.
 *
 * The underlying PopoverContent accepts arbitrary `className` and leaves
 * callers free to set any width, shadow, or positioning offset. This wrapper
 * closes that:
 *   - `side` and `align` are the only placement controls, constrained to the
 *     radix enumeration — no raw pixel offsets.
 *   - Width, padding, shadow, and background are fixed to the system's
 *     popover token treatment; they cannot be overridden per-instance.
 *   - No `className` or `style` escape hatch on any public prop.
 */

export interface PopoverProps {
  /** Element that toggles the popover (e.g. a Button). */
  trigger: React.ReactNode
  /** Popover panel content. */
  children: React.ReactNode
  /** Preferred side relative to the trigger; defaults to 'bottom'. */
  side?: "top" | "right" | "bottom" | "left"
  /** Alignment along the side axis; defaults to 'center'. */
  align?: "start" | "center" | "end"
  /** Controlled open state. */
  open?: boolean
  /** Called when the open state should change. */
  onOpenChange?: (open: boolean) => void
}

export function Popover({
  trigger,
  children,
  side = "bottom",
  align = "center",
  open,
  onOpenChange,
}: PopoverProps) {
  return (
    <PopoverPrimitive open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent side={side} align={align}>
        {children}
      </PopoverContent>
    </PopoverPrimitive>
  )
}
