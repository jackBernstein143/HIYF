import * as React from 'react'
import { cn } from '../lib/utils'
import { Input as InputPrimitive } from './ui/input'

/**
 * Input — closed wrapper over shadcn's <Input>.
 *
 * shadcn's Input accepts arbitrary `className`, which lets callers override any
 * aspect of the field's appearance. This wrapper closes that hatch:
 *   - `invalid` is the only expressible state variation; it activates the
 *     design system's error ring via `aria-invalid` (which the base component
 *     already styles) rather than an ad-hoc border-red class.
 *   - there is NO `className` / `style` prop.
 *   - standard behaviour props (type, placeholder, value, onChange, disabled,
 *     id) all pass through unchanged.
 *   - need a visual variant? Add a prop here — not a one-off className.
 */

export interface InputProps {
  /** Activates the error ring. Prefer pairing with a <Label> and error text. */
  invalid?: boolean
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  value?: string | number | readonly string[]
  defaultValue?: string | number | readonly string[]
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
  id?: string
  name?: string
  autoComplete?: string
  autoFocus?: boolean
  readOnly?: boolean
  required?: boolean
  min?: string | number
  max?: string | number
  step?: string | number
}

export function Input({ invalid, ...rest }: InputProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  // aria-invalid triggers the error ring already built into the base component.
  return <InputPrimitive aria-invalid={invalid || undefined} {...rest} />
}
