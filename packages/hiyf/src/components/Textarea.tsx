import * as React from 'react'
import { Textarea as TextareaPrimitive } from './ui/textarea'

/**
 * Textarea — closed wrapper over shadcn's <Textarea>.
 *
 * shadcn's Textarea accepts arbitrary `className`, leaving visual treatment
 * entirely up to the caller. This wrapper closes that escape hatch:
 *   - `invalid` is the only expressible state variation; it wires up
 *     `aria-invalid` so the base component's built-in error ring activates.
 *   - `rows` controls height for fixed-size scenarios (the base uses
 *     field-sizing: content by default; setting rows overrides that).
 *   - there is NO `className` / `style` prop.
 *   - standard behaviour props pass through unchanged.
 *   - need a resize mode or other treatment? Add a prop here.
 */

export interface TextareaProps {
  /** Activates the error ring. Prefer pairing with a <Label> and error text. */
  invalid?: boolean
  /** Fixed row height. Omit to use content-sized auto-grow. */
  rows?: number
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  disabled?: boolean
  id?: string
  name?: string
  readOnly?: boolean
  required?: boolean
  autoFocus?: boolean
  autoComplete?: string
}

export function Textarea({ invalid, rows, ...rest }: TextareaProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  // aria-invalid triggers the error ring already built into the base component.
  return (
    <TextareaPrimitive
      aria-invalid={invalid || undefined}
      rows={rows}
      {...rest}
    />
  )
}
