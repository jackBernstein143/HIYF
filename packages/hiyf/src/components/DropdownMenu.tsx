"use client"

import * as React from "react"
import {
  DropdownMenu as DropdownMenuPrimitive,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu"

/**
 * DropdownMenu — a closed convenience wrapper over the shadcn DropdownMenu primitives.
 *
 * The raw primitives are composition primitives that accept arbitrary className,
 * free-form children, and any nesting pattern. Callers can — and routinely do —
 * produce menus with inconsistent item shapes, ad-hoc hover colors, and bespoke
 * separators. This wrapper closes that by driving the menu from a typed item
 * model:
 *   - `items` is an array of plain data objects with `label`, `onSelect`,
 *     `tone`, and `separatorBefore`; no JSX, no className.
 *   - `tone: 'danger'` maps to the primitive's `variant="destructive"` so
 *     callers express intent, not appearance.
 *   - `label` renders a section header above all items when provided.
 *   - No `className` or `style` escape hatch on any public prop.
 */

export interface DropdownMenuItem {
  /** Display text for the menu item. */
  label: string
  /** Called when the item is selected. */
  onSelect?: () => void
  /**
   * Intent of the action.
   * 'danger' renders the item in the destructive style.
   */
  tone?: "default" | "danger"
  /** Render a separator rule immediately before this item. */
  separatorBefore?: boolean
}

export interface DropdownMenuProps {
  /** Element that opens the menu (e.g. a Button). */
  trigger: React.ReactNode
  /** Optional group label displayed at the top of the menu. */
  label?: string
  /** Ordered list of menu items. */
  items: DropdownMenuItem[]
  /** Controlled open state. */
  open?: boolean
  /** Called when the open state should change. */
  onOpenChange?: (open: boolean) => void
}

export function DropdownMenu({
  trigger,
  label,
  items,
  open,
  onOpenChange,
}: DropdownMenuProps) {
  return (
    <DropdownMenuPrimitive open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.separatorBefore && <DropdownMenuSeparator />}
              <DropdownMenuItem
                variant={item.tone === "danger" ? "destructive" : "default"}
                onSelect={item.onSelect}
              >
                {item.label}
              </DropdownMenuItem>
            </React.Fragment>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenuPrimitive>
  )
}
