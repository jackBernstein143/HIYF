"use client"

import * as React from "react"
import {
  Menubar as MenubarPrimitive,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
} from "./ui/menubar"

/**
 * Menubar — closed wrapper over shadcn's Menubar primitive family.
 *
 * The raw Menubar accepts arbitrary children, className, and any nesting
 * pattern. This wrapper closes the surface:
 *   - `menus` is the only way to populate menus; no raw MenubarMenu /
 *     MenubarItem composition needed from consumer code.
 *   - Each menu has a `label` and an `items` array. Each item has a `label`,
 *     optional `onSelect` callback, optional `shortcut` string displayed at
 *     the right edge, and an optional `separatorBefore` rule.
 *   - No `className` or `style` escape hatch on any public prop.
 *   - Need sub-menus or radio groups? Extend the item model here.
 */

export interface MenubarItemDef {
  /** Display text for the menu item. */
  label: string
  /** Called when the item is selected. */
  onSelect?: () => void
  /** Optional keyboard shortcut label displayed at the right of the item. */
  shortcut?: string
  /** Render a separator rule immediately before this item. */
  separatorBefore?: boolean
}

export interface MenuDef {
  /** Display text for the top-level menu trigger. */
  label: string
  /** Ordered list of items inside this menu. */
  items: MenubarItemDef[]
}

export interface MenubarProps {
  /** Ordered list of top-level menus. */
  menus: MenuDef[]
}

export function Menubar({ menus }: MenubarProps) {
  return (
    <MenubarPrimitive>
      {menus.map((menu, menuIndex) => (
        <MenubarMenu key={menuIndex}>
          <MenubarTrigger>{menu.label}</MenubarTrigger>
          <MenubarContent>
            {menu.items.map((item, itemIndex) => (
              <React.Fragment key={itemIndex}>
                {item.separatorBefore && <MenubarSeparator />}
                <MenubarItem onSelect={item.onSelect}>
                  {item.label}
                  {item.shortcut && (
                    <MenubarShortcut>{item.shortcut}</MenubarShortcut>
                  )}
                </MenubarItem>
              </React.Fragment>
            ))}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </MenubarPrimitive>
  )
}
