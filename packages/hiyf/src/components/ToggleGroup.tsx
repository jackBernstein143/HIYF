'use client'

import * as React from 'react'
import { ToggleGroup as ToggleGroupPrimitive, ToggleGroupItem } from './ui/toggle-group'

/**
 * ToggleGroup — closed wrapper over shadcn's <ToggleGroup>.
 *
 * shadcn's ToggleGroup accepts arbitrary `className`, open-ended `variant`
 * and `size` strings, and raw child composition via ToggleGroupItem imports.
 * This wrapper closes all those escape hatches:
 *   - `options` is the only way to populate items; no raw ToggleGroupItem
 *     imports needed (or possible) from consumer code.
 *   - `type` is strictly 'single'|'multiple' as required by the Radix primitive.
 *   - `size` accepts only the three sanctioned steps ('sm'|'md'|'lg').
 *   - `value` / `defaultValue` / `onValueChange` are typed to match each
 *     `type`'s expected string-or-array shape via overloads.
 *   - there is NO `className` / `style` prop.
 */

const sizeToVariant = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
} as const

export type ToggleGroupSize = keyof typeof sizeToVariant

export interface ToggleGroupOption {
  value: string
  label: React.ReactNode
}

export interface ToggleGroupSingleProps {
  type: 'single'
  options: ToggleGroupOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  size?: ToggleGroupSize
  disabled?: boolean
}

export interface ToggleGroupMultipleProps {
  type: 'multiple'
  options: ToggleGroupOption[]
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  size?: ToggleGroupSize
  disabled?: boolean
}

export type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps

export function ToggleGroup({
  type,
  options,
  size = 'md',
  disabled,
  ...rest
}: ToggleGroupProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  // Cast via any to bridge the discriminated-union value types to the primitive.
  const primitiveProps = {
    type,
    size: sizeToVariant[size],
    disabled,
    ...(rest as Record<string, unknown>),
  } as React.ComponentProps<typeof ToggleGroupPrimitive>

  return (
    <ToggleGroupPrimitive {...primitiveProps}>
      {options.map((opt) => (
        <ToggleGroupItem key={opt.value} value={opt.value}>
          {opt.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroupPrimitive>
  )
}
