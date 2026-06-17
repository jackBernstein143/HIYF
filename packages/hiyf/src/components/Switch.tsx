'use client'

import * as React from 'react'
import { Switch as SwitchPrimitive } from './ui/switch'

/**
 * Switch — closed wrapper over shadcn's <Switch>.
 *
 * shadcn's Switch accepts `className` and an internal `size` prop that spans
 * both layout and visual scale. This wrapper closes the className escape hatch
 * while keeping `size` as the only sanctioned scale variant:
 *   - `size` maps directly to the base component's two options (sm / md),
 *     renamed to match HIYF conventions.
 *   - there is NO `className` / `style` prop. The checked colour, thumb shape,
 *     and animation are fixed to the design system's token values.
 *   - need a third size? Add it here — a deliberate, reviewable change.
 */

export interface SwitchProps {
  /** Controls the track and thumb scale. Defaults to 'md'. */
  size?: 'sm' | 'md'
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  /** For associating with a <Label htmlFor={id}>. */
  id?: string
  name?: string
  value?: string
  required?: boolean
}

export function Switch({ size = 'md', ...props }: SwitchProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  // Map HIYF 'md' → base 'default' to keep naming consistent across the system.
  return <SwitchPrimitive size={size === 'md' ? 'default' : 'sm'} {...props} />
}
