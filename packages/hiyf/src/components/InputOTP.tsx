'use client'

import * as React from 'react'
import { InputOTP as InputOTPPrimitive, InputOTPGroup, InputOTPSlot } from './ui/input-otp'

/**
 * InputOTP — closed wrapper over shadcn's InputOTP family.
 *
 * shadcn's InputOTP requires manual composition of InputOTPGroup and
 * InputOTPSlot children, each accepting arbitrary `className`. This wrapper
 * collapses the composition into a single component:
 *   - `length` controls how many digit slots are rendered (default 6);
 *     all slots live in a single group with no separator.
 *   - `value` and `onChange` give full controlled-input support.
 *   - there is NO `className` / `style` prop.
 *   - need separators between slot groups? Extend this component with a
 *     `groups` prop — a deliberate, reviewable change.
 */

export interface InputOTPProps {
  /** Number of OTP character slots. Defaults to 6. */
  length?: number
  /** Controlled value string. */
  value?: string
  /** Called with the updated value string on each keystroke. */
  onChange?: (value: string) => void
  disabled?: boolean
  /** Associates the hidden input with a form. */
  name?: string
}

export function InputOTP({
  length = 6,
  value,
  onChange,
  disabled,
  name,
}: InputOTPProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <InputOTPPrimitive
      maxLength={length}
      value={value}
      onChange={onChange}
      disabled={disabled}
      name={name}
    >
      <InputOTPGroup>
        {Array.from({ length }, (_, i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    </InputOTPPrimitive>
  )
}
