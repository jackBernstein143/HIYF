'use client'

import * as React from 'react'
import {
  InputGroup as InputGroupPrimitive,
  InputGroupAddon,
  InputGroupInput,
} from './ui/input-group'

/**
 * InputGroup — closed wrapper over shadcn's InputGroup family.
 *
 * shadcn's InputGroup requires manual composition of InputGroupAddon,
 * InputGroupInput, etc., each accepting arbitrary `className`. This wrapper
 * collapses that into a single component:
 *   - `children` is the primary control (typically an HIYF <Input> or
 *     any other input element).
 *   - `prefix` renders an inline-start addon (icon, text, or any node).
 *   - `suffix` renders an inline-end addon (icon, text, or any node).
 *   - The addon elements use the primitive's `inline-start` / `inline-end`
 *     alignment, the only sanctioned inline positions.
 *   - there is NO `className` / `style` prop.
 *   - need block-start / block-end addons or an internal button? Extend this
 *     component with deliberate props — not one-off className overrides.
 */

// Input props this group exposes — minus the styling escape hatches. The group
// itself owns the single border + focus ring; the inner control is borderless.
type ControlProps = Omit<
  React.ComponentPropsWithRef<'input'>,
  'className' | 'style' | 'prefix'
>

export interface InputGroupProps extends ControlProps {
  /** Optional leading addon rendered before the control (icon, text, …). */
  prefix?: React.ReactNode
  /** Optional trailing addon rendered after the control (icon, text, …). */
  suffix?: React.ReactNode
  /** Error state — drives the destructive ring on the whole group. */
  invalid?: boolean
}

export function InputGroup({ prefix, suffix, invalid, ...inputProps }: InputGroupProps) {
  // Self-contained: the group provides the ONE border + focus ring; the inner
  // InputGroupInput is borderless, so there's no nested-border artifact.
  return (
    <InputGroupPrimitive>
      {prefix && (
        <InputGroupAddon align="inline-start">{prefix}</InputGroupAddon>
      )}
      <InputGroupInput aria-invalid={invalid || undefined} {...inputProps} />
      {suffix && (
        <InputGroupAddon align="inline-end">{suffix}</InputGroupAddon>
      )}
    </InputGroupPrimitive>
  )
}
