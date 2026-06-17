'use client'

import * as React from 'react'
import {
  Field as FieldPrimitive,
  FieldLabel,
  FieldDescription,
  FieldError,
} from './ui/field'

/**
 * Field — closed form-field wrapper over shadcn's Field primitives.
 *
 * shadcn's Field parts (FieldLabel, FieldDescription, FieldError) each accept
 * arbitrary `className`, and callers must compose them manually. This wrapper
 * collapses the composition into a single component driven by intent props:
 *   - `label` renders a FieldLabel linked to the control via `htmlFor`.
 *   - `hint` renders a FieldDescription below the control.
 *   - `error` renders a FieldError alert below the control (takes priority
 *     over `hint` when both are supplied).
 *   - `children` is the form control (e.g., an HIYF <Input> or <Select>).
 *   - there is NO `className` / `style` prop.
 *   - need horizontal orientation or a fieldset group? Use the raw Field
 *     primitives from the ui layer for those advanced cases, or extend
 *     this wrapper with an `orientation` prop.
 */

export interface FieldProps {
  /** Label text linked to the control. */
  label?: string
  /** Hint / helper text shown below the control. */
  hint?: string
  /** Error message shown below the control; marks the field invalid. */
  error?: string
  /** The `id` of the control, used to link the label via htmlFor. */
  htmlFor?: string
  /** The form control to render inside the field. */
  children?: React.ReactNode
}

export function Field({ label, hint, error, htmlFor, children }: FieldProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  // data-invalid on the root activates the destructive color for the label.
  return (
    <FieldPrimitive data-invalid={!!error || undefined}>
      {label && (
        <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
      )}
      {children}
      {error ? (
        <FieldError>{error}</FieldError>
      ) : hint ? (
        <FieldDescription>{hint}</FieldDescription>
      ) : null}
    </FieldPrimitive>
  )
}
