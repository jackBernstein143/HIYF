"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import {
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "./ui/combobox"

/**
 * Combobox — closed, searchable select wrapper over the ui/combobox primitives.
 *
 * ui/combobox composes @base-ui/react's Combobox with styled InputGroup chrome.
 * The raw parts accept arbitrary className and free-form children. This wrapper
 * closes that down into a single searchable-select surface:
 *   - `options` is the only way to populate items (value + label pairs).
 *   - Controlled and uncontrolled value modes are both supported.
 *   - `placeholder` / `emptyText` are the only copy customisation points.
 *   - The trigger input doubles as the search field (base-ui architecture):
 *     typing filters options live. `searchPlaceholder` maps to the same input.
 *   - No `className` or `style` escape hatch on the public API.
 */

export interface ComboboxOption {
  value: string
  label: string
}

export interface ComboboxProps {
  /** Flat list of selectable options. */
  options: ComboboxOption[]
  /** Controlled selected value. */
  value?: string
  /** Called when the selected value changes. */
  onValueChange?: (value: string) => void
  /** Placeholder shown in the input/trigger (also acts as the search hint). */
  placeholder?: string
  /**
   * Accepted for API symmetry with Select; maps to `placeholder` on the combo
   * input since the trigger and search field are the same element in base-ui.
   */
  searchPlaceholder?: string
  /** Text shown when no options match the current search query. */
  emptyText?: string
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Search…",
  searchPlaceholder,
  emptyText = "No results found.",
}: ComboboxProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  // @base-ui/react Combobox.Root is generic over Value. We fix Value=string so the
  // public API stays simple. onValueChange wraps the base-ui (val, details) signature
  // and surfaces only the string value to callers.
  const handleValueChange = React.useCallback(
    (val: string | null) => {
      if (val != null) onValueChange?.(val)
    },
    [onValueChange],
  )

  const inputPlaceholder = searchPlaceholder ?? placeholder

  return (
    <ComboboxPrimitive.Root<string>
      value={value ?? null}
      onValueChange={onValueChange ? handleValueChange : undefined}
    >
      <ComboboxInput placeholder={inputPlaceholder} showTrigger showClear={false} />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>{emptyText}</ComboboxEmpty>
          {options.map((opt) => (
            // ComboboxItem from ui/combobox already includes the ItemIndicator.
            <ComboboxItem key={opt.value} value={opt.value as never}>
              {opt.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPrimitive.Root>
  )
}
