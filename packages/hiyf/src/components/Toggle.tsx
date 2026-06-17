'use client'

import * as React from 'react'
import { Toggle as TogglePrimitive } from './ui/toggle'

/**
 * Toggle — closed wrapper over shadcn's <Toggle>.
 *
 * shadcn's Toggle accepts arbitrary `className`, an open-ended `variant`
 * string, and a raw `size` mapped to the primitive's internal names. This
 * wrapper closes all escape hatches:
 *   - `size` accepts only the three sanctioned steps ('sm'|'md'|'lg');
 *     'md' maps to the primitive's 'default' size.
 *   - `pressed`, `defaultPressed`, `onPressedChange`, and `disabled` pass
 *     through for full controlled/uncontrolled support.
 *   - there is NO `className` / `style` prop. Every Toggle is one of a
 *     finite set of correct, on-brand treatments.
 */

const sizeToVariant = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
} as const

export type ToggleSize = keyof typeof sizeToVariant

export interface ToggleProps {
  /** Controlled pressed state. */
  pressed?: boolean
  /** Initial pressed state for uncontrolled usage. */
  defaultPressed?: boolean
  /** Called when pressed state changes. */
  onPressedChange?: (pressed: boolean) => void
  /** Enumerated size — 'md' maps to the default height. */
  size?: ToggleSize
  disabled?: boolean
  children?: React.ReactNode
}

export function Toggle({
  pressed,
  defaultPressed,
  onPressedChange,
  size = 'md',
  disabled,
  children,
}: ToggleProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <TogglePrimitive
      pressed={pressed}
      defaultPressed={defaultPressed}
      onPressedChange={onPressedChange}
      size={sizeToVariant[size]}
      disabled={disabled}
    >
      {children}
    </TogglePrimitive>
  )
}
