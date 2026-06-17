'use client'

import * as React from 'react'
import { cn } from '../lib/utils'
import {
  RadioGroup as RadioGroupPrimitive,
  RadioGroupItem as RadioGroupItemPrimitive,
} from './ui/radio-group'

/**
 * RadioGroup / RadioGroupItem — closed wrappers over shadcn's radio primitives.
 *
 * shadcn's RadioGroup accepts an arbitrary `className` on both the root and
 * each item, making it easy to accidentally break the shared spacing grid,
 * indicator colour, or focus ring. These wrappers close both escape hatches:
 *   - `orientation` controls the layout direction (vertical = stacked grid,
 *     horizontal = flex row) — the only sanctioned layout variants.
 *   - RadioGroupItem accepts `value`, `id`, and `children` (label text);
 *     there is NO `className` on either the root or items.
 *   - need a compact spacing variant? Add a `density` prop to RadioGroup here.
 */

/* ─── Root ───────────────────────────────────────────────────────────────── */

export interface RadioGroupProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Controls layout direction. Defaults to 'vertical'. */
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
  required?: boolean
  name?: string
  children?: React.ReactNode
}

export function RadioGroup({
  orientation = 'vertical',
  children,
  ...props
}: RadioGroupProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <RadioGroupPrimitive
      className={cn(
        orientation === 'horizontal'
          ? 'flex flex-row flex-wrap gap-4'
          : 'grid gap-3',
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive>
  )
}

/* ─── Item ───────────────────────────────────────────────────────────────── */

export interface RadioGroupItemProps {
  /** The value submitted when this item is selected. */
  value: string
  /** For associating with a <Label htmlFor={id}>. */
  id?: string
  children?: React.ReactNode
  disabled?: boolean
  required?: boolean
}

export function RadioGroupItem({ value, id, disabled, required, children }: RadioGroupItemProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <div className="flex items-center gap-2">
      <RadioGroupItemPrimitive
        value={value}
        id={id}
        disabled={disabled}
        required={required}
      />
      {children && (
        <label
          htmlFor={id}
          className="text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
        >
          {children}
        </label>
      )}
    </div>
  )
}
