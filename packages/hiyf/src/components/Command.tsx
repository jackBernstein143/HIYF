"use client"

import * as React from "react"
import {
  Command as CommandPrimitive,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./ui/command"

/**
 * Command — closed command-palette wrapper over the shadcn Command primitives.
 *
 * The raw primitives compose freely with arbitrary className, custom item
 * shapes, and ad-hoc group arrangements. This wrapper closes that down by
 * driving the palette entirely from a typed `groups` data model:
 *   - `groups` is the only way to populate items; no ad-hoc CommandGroup /
 *     CommandItem imports needed (or possible) from consumer code.
 *   - Each item supports an optional `shortcut` string rendered in the
 *     design-system's CommandShortcut treatment.
 *   - `placeholder` customises the search input hint text.
 *   - CommandEmpty is always present; its copy is not yet configurable —
 *     add an `emptyText` prop here when that becomes a product need.
 *   - No `className` or `style` escape hatch on the public API.
 */

export interface CommandItemDef {
  /** Display label for the command item. */
  label: string
  /** Called when the item is selected via click or keyboard. */
  onSelect?: () => void
  /** Optional keyboard shortcut label (e.g. "⌘K"). Rendered inline. */
  shortcut?: string
}

export interface CommandGroup {
  /** Optional section heading rendered above the group's items. */
  heading?: string
  /** Ordered list of items in this group. */
  items: CommandItemDef[]
}

export interface CommandProps {
  /** Ordered list of command groups. A group without a heading is unsectioned. */
  groups: CommandGroup[]
  /** Placeholder text in the search input. Defaults to 'Search commands…'. */
  placeholder?: string
}

export function Command({
  groups,
  placeholder = "Search commands…",
}: CommandProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <CommandPrimitive>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {groupIndex > 0 && <CommandSeparator />}
            <CommandGroup heading={group.heading}>
              {group.items.map((item, itemIndex) => (
                <CommandItem
                  key={itemIndex}
                  onSelect={item.onSelect}
                >
                  {item.label}
                  {item.shortcut && (
                    <CommandShortcut>{item.shortcut}</CommandShortcut>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </React.Fragment>
        ))}
      </CommandList>
    </CommandPrimitive>
  )
}
