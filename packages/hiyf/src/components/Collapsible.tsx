"use client"

import * as React from "react"
import {
  Collapsible as CollapsiblePrimitive,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible"

/**
 * Collapsible — closed wrapper over shadcn's Collapsible primitives.
 *
 * The raw parts compose freely with arbitrary className and children.
 * This wrapper closes that down:
 *   - `trigger` is the clickable element that toggles visibility; it is
 *     rendered inside the Radix trigger with `asChild` so any interactive
 *     element (button, text, icon row) works without extra wrapping.
 *   - `children` is the hidden/shown content.
 *   - Controlled and uncontrolled modes are both supported via `open` /
 *     `onOpenChange` / `defaultOpen`, matching the Radix root contract.
 *   - No `className` or `style` escape hatch on the public API.
 */

export interface CollapsibleProps {
  /** Element that toggles the panel open/closed. */
  trigger: React.ReactNode
  /** Content shown when the panel is open. */
  children: React.ReactNode
  /** Whether the panel is open on first render (uncontrolled). */
  defaultOpen?: boolean
  /** Controlled open state. */
  open?: boolean
  /** Called when the open state should change (controlled mode). */
  onOpenChange?: (open: boolean) => void
}

export function Collapsible({
  trigger,
  children,
  defaultOpen,
  open,
  onOpenChange,
}: CollapsibleProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <CollapsiblePrimitive
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      <CollapsibleTrigger asChild>{trigger}</CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </CollapsiblePrimitive>
  )
}
