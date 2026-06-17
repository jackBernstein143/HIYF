'use client'

import * as React from 'react'
import { Slider as SliderPrimitive } from './ui/slider'

/**
 * Slider — closed wrapper over shadcn's <Slider>.
 *
 * shadcn's Slider accepts `className`, which lets callers restyle the track,
 * range fill, and thumb arbitrarily. This wrapper closes every visual escape
 * hatch while keeping the full behavioural surface:
 *   - value, defaultValue, min, max, step, and onValueChange all pass through.
 *   - there is NO `className` / `style` prop. Track colour, thumb size, and
 *     focus ring are fixed to the design system's token values.
 *   - need a coloured range (e.g. warning-amber)? Add a `color` prop here —
 *     a deliberate, reviewable change — rather than a one-off class.
 */

export interface SliderProps {
  value?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
  disabled?: boolean
  id?: string
  name?: string
  orientation?: 'horizontal' | 'vertical'
}

export function Slider({ ...props }: SliderProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return <SliderPrimitive {...props} />
}
