'use client'

import * as React from 'react'
import {
  Select as SelectPrimitive,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

/**
 * Select — closed, convenience wrapper over shadcn's composable Select parts.
 *
 * shadcn's Select is a composition of SelectRoot / SelectTrigger / SelectContent /
 * SelectItem — each accepting arbitrary `className`. This wrapper collapses the
 * composition into a single component driven by a data `options` array:
 *   - `options` is the only way to populate items; no child render props or
 *     ad-hoc SelectItem imports needed (or possible) from consumer code.
 *   - `size` maps to the trigger's two sanctioned heights (sm / md).
 *   - `placeholder` sets the empty-state trigger label.
 *   - there is NO `className` / `style` on the public API. The trigger border,
 *     content shadow, item hover colour, and checked indicator are all fixed to
 *     design-system token values.
 *   - need an option group, separator, or destructive item? Extend `options` to
 *     accept a richer discriminated-union type here — a deliberate, reviewable
 *     change — rather than leaking the raw primitives.
 */

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  /** Controls trigger height. Defaults to 'md'. */
  size?: 'sm' | 'md'
  disabled?: boolean
  required?: boolean
  name?: string
}

export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  size = 'md',
  disabled,
  required,
  name,
}: SelectProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  // The `size` prop maps 'md' → 'default' to align with the base component's naming.
  return (
    <SelectPrimitive
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      required={required}
      name={name}
    >
      <SelectTrigger size={size === 'md' ? 'default' : 'sm'}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectPrimitive>
  )
}
