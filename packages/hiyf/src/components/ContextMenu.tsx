"use client"

import * as React from "react"
import {
  ContextMenu as ContextMenuPrimitive,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "./ui/context-menu"

/**
 * ContextMenu — a closed convenience wrapper over the shadcn ContextMenu primitives.
 *
 * The raw primitives are composition primitives that accept arbitrary className,
 * free-form children, and any nesting pattern. This wrapper closes that by
 * driving the menu from a typed item model — mirroring DropdownMenu.tsx exactly:
 *   - `items` is an array of plain data objects with `label`, `onSelect`,
 *     `tone`, and `separatorBefore`; no JSX, no className.
 *   - `tone: 'danger'` maps to `variant="destructive"` so callers express
 *     intent, not appearance.
 *   - `trigger` is the right-click target area.
 *   - No `className` or `style` escape hatch on any public prop.
 */

export interface ContextMenuItemDef {
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

export interface ContextMenuProps {
  /** Element wrapping the right-clickable area. */
  trigger: React.ReactNode
  /** Ordered list of menu items. */
  items: ContextMenuItemDef[]
}

export function ContextMenu({ trigger, items }: ContextMenuProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <ContextMenuPrimitive>
      <ContextMenuTrigger asChild>{trigger}</ContextMenuTrigger>
      <ContextMenuContent>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.separatorBefore && <ContextMenuSeparator />}
            <ContextMenuItem
              variant={item.tone === "danger" ? "destructive" : "default"}
              onSelect={item.onSelect}
            >
              {item.label}
            </ContextMenuItem>
          </React.Fragment>
        ))}
      </ContextMenuContent>
    </ContextMenuPrimitive>
  )
}
