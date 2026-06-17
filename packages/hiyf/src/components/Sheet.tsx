"use client"

import * as React from "react"
import {
  Sheet as SheetPrimitive,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet"

/**
 * Sheet — a closed convenience wrapper over the shadcn Sheet primitives.
 *
 * The underlying Sheet passes `className` through to both the overlay and
 * the slide-in panel, and accepts arbitrary children without structural
 * guidance. This wrapper closes that:
 *   - `side` is the only placement control, already enumerated by the
 *     primitive; the wrapper just keeps callers from reaching past it.
 *   - Header (title + description) is composed internally from typed props
 *     rather than left as free-form children, ensuring consistent padding
 *     and typography every time.
 *   - No `className` or `style` escape hatch on any public prop.
 */

export interface SheetProps {
  /** Element that opens the sheet (e.g. a Button). */
  trigger: React.ReactNode
  /** Accessible panel title. */
  title?: string
  /** Optional subtitle rendered below the title. */
  description?: string
  /** Edge from which the panel slides in; defaults to 'right'. */
  side?: "top" | "right" | "bottom" | "left"
  /** Panel body content. */
  children?: React.ReactNode
  /** Controlled open state. */
  open?: boolean
  /** Called when the open state should change. */
  onOpenChange?: (open: boolean) => void
}

export function Sheet({
  trigger,
  title,
  description,
  side = "right",
  children,
  open,
  onOpenChange,
}: SheetProps) {
  return (
    <SheetPrimitive open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side={side}>
        {(title || description) && (
          <SheetHeader>
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        )}
        {children}
      </SheetContent>
    </SheetPrimitive>
  )
}
