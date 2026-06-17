"use client"

import * as React from "react"
import {
  NavigationMenu as NavigationMenuPrimitive,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./ui/navigation-menu"

/**
 * NavigationMenu — closed wrapper over shadcn's NavigationMenu primitives.
 *
 * The raw primitives are free-form composition building blocks that accept
 * arbitrary className and unrestricted children. This wrapper closes the API:
 *   - `items` is the single source of truth for top-level nav entries; each
 *     item has a `label` and optionally an `href` (plain link) or `content`
 *     (dropdown panel). When `content` is provided, the item renders as a
 *     trigger + content panel; otherwise it renders as a plain link.
 *   - No `className` or `style` escape hatch is exposed on any public prop.
 *   - Need a new pattern (icon, badge, active state)? Add it to NavItem here.
 */

export interface NavItem {
  /** Display text for the top-level navigation entry. */
  label: string
  /**
   * Optional href for plain link items.
   * Used only when `content` is not provided.
   */
  href?: string
  /**
   * Optional dropdown panel content.
   * When present, the item renders as a trigger + floating content panel.
   */
  content?: React.ReactNode
}

export interface NavigationMenuProps {
  /** Ordered list of top-level navigation entries. */
  items: NavItem[]
}

export function NavigationMenu({ items }: NavigationMenuProps) {
  return (
    <NavigationMenuPrimitive>
      <NavigationMenuList>
        {items.map((item, index) =>
          item.content ? (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
              <NavigationMenuContent>{item.content}</NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={index}>
              <NavigationMenuLink href={item.href}>{item.label}</NavigationMenuLink>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenuPrimitive>
  )
}
