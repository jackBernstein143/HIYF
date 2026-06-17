"use client"

import * as React from "react"
import {
  Tabs as TabsPrimitive,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./ui/tabs"

/**
 * Tabs — closed wrapper over shadcn's composable Tabs parts.
 *
 * The raw parts accept arbitrary className and free-form children. This
 * wrapper closes that down by driving the tab strip and panels from a
 * typed `tabs` data model:
 *   - `tabs` is the only way to populate tabs; no ad-hoc TabsTrigger /
 *     TabsContent imports needed (or possible) from consumer code.
 *   - Controlled and uncontrolled modes are supported via `value` /
 *     `onValueChange` / `defaultValue`, matching the Radix root contract.
 *   - No `className` or `style` escape hatch on the public API.
 */

export interface TabItem {
  /** Unique identifier for the tab; used as the Radix `value`. */
  value: string
  /** Label rendered in the tab trigger button. */
  label: string
  /** Content rendered in the corresponding tab panel. */
  content: React.ReactNode
}

export interface TabsProps {
  /** Ordered list of tab definitions. */
  tabs: TabItem[]
  /** Tab value selected on first render (uncontrolled). */
  defaultValue?: string
  /** Controlled selected tab value. */
  value?: string
  /** Called when the selected tab changes. */
  onValueChange?: (value: string) => void
}

export function Tabs({ tabs, defaultValue, value, onValueChange }: TabsProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  const resolvedDefault = defaultValue ?? tabs[0]?.value
  return (
    <TabsPrimitive
      defaultValue={resolvedDefault}
      value={value}
      onValueChange={onValueChange}
    >
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </TabsPrimitive>
  )
}
