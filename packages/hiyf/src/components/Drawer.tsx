"use client"

import * as React from "react"
import {
  Drawer as DrawerPrimitive,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "./ui/drawer"

/**
 * Drawer — a closed convenience wrapper over the vaul-backed shadcn Drawer.
 *
 * The underlying Drawer exposes className on its content panel and leaves
 * header composition entirely to callers. This wrapper closes that:
 *   - Title and description are typed props rendered in a consistent
 *     DrawerHeader with the system's typographic treatment, rather than
 *     free-form children.
 *   - The drag handle and bottom-sheet sizing are baked in by the primitive
 *     and intentionally not re-exposed here.
 *   - No `className` or `style` escape hatch on any public prop.
 */

export interface DrawerProps {
  /** Element that opens the drawer (e.g. a Button). */
  trigger: React.ReactNode
  /** Accessible panel title. */
  title?: string
  /** Optional subtitle rendered below the title. */
  description?: string
  /** Panel body content. */
  children?: React.ReactNode
  /** Controlled open state. */
  open?: boolean
  /** Called when the open state should change. */
  onOpenChange?: (open: boolean) => void
}

export function Drawer({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
}: DrawerProps) {
  return (
    <DrawerPrimitive open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        {(title || description) && (
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
        )}
        {children}
      </DrawerContent>
    </DrawerPrimitive>
  )
}
