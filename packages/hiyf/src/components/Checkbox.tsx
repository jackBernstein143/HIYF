'use client'

import * as React from 'react'
import { Checkbox as CheckboxPrimitive } from './ui/checkbox'

/**
 * Checkbox — closed wrapper over shadcn's <Checkbox>.
 *
 * shadcn's Checkbox forwards an arbitrary `className` to Radix's root element,
 * making it trivial to break the on-brand size, border-radius, or checked
 * colour. This wrapper closes that hatch completely:
 *   - the only expressible props are the behavioural ones: checked state,
 *     change handler, disabled flag, and DOM id.
 *   - there is NO `className` / `style` prop. Every checkbox on screen is the
 *     single correct, on-brand treatment.
 *   - need a larger variant? Add a `size` prop here — a deliberate, reviewable
 *     change — rather than a one-off class.
 */

export interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  disabled?: boolean
  /** For associating with a <Label htmlFor={id}>. */
  id?: string
  name?: string
  value?: string
  required?: boolean
}

export function Checkbox({ ...props }: CheckboxProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return <CheckboxPrimitive {...props} />
}
