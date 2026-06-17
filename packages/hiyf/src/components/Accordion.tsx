"use client"

import * as React from "react"
import {
  Accordion as AccordionPrimitive,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion"

/**
 * Accordion — closed wrapper over shadcn's composable Accordion parts.
 *
 * The raw parts accept arbitrary className, free-form children, and any
 * nesting pattern. This wrapper closes that down by driving the accordion
 * from a typed `items` data model:
 *   - `items` is the only way to populate panels; no ad-hoc AccordionItem
 *     imports needed (or possible) from consumer code.
 *   - `type` and `collapsible` are the only expressible behaviour knobs,
 *     matching the Radix root's intent-level props.
 *   - No `className` or `style` escape hatch on the public API.
 */

export interface AccordionItem {
  /** Unique identifier for the panel; used as the Radix `value`. */
  value: string
  /** Content rendered in the trigger button (text or JSX). */
  trigger: React.ReactNode
  /** Content rendered inside the collapsible panel. */
  content: React.ReactNode
}

export interface AccordionProps {
  /** Ordered list of accordion panels. */
  items: AccordionItem[]
  /**
   * Whether one or multiple panels can be open at a time.
   * Defaults to 'single'.
   */
  type?: "single" | "multiple"
  /**
   * When `type='single'`, whether the open panel can be collapsed by
   * clicking its trigger again. Ignored for `type='multiple'`.
   */
  collapsible?: boolean
  /** Panel value(s) open on first render (uncontrolled). */
  defaultValue?: string | string[]
}

export function Accordion({
  items,
  type = "single",
  collapsible = false,
  defaultValue,
}: AccordionProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  if (type === "multiple") {
    return (
      <AccordionPrimitive
        type="multiple"
        defaultValue={
          defaultValue === undefined
            ? undefined
            : Array.isArray(defaultValue)
              ? defaultValue
              : [defaultValue]
        }
      >
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </AccordionPrimitive>
    )
  }

  return (
    <AccordionPrimitive
      type="single"
      collapsible={collapsible}
      defaultValue={
        defaultValue === undefined
          ? undefined
          : Array.isArray(defaultValue)
            ? defaultValue[0]
            : defaultValue
      }
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionPrimitive>
  )
}
