'use client'

import * as React from 'react'
import { cn } from '../lib/utils'
import { Label as LabelPrimitive } from './ui/label'

/**
 * Label — closed wrapper over shadcn's <Label>.
 *
 * shadcn's Label accepts arbitrary `className`, leaving colour and weight up
 * to callers. This wrapper closes that escape hatch:
 *   - `muted` is the only expressible colour variant; it renders the label in
 *     `text-muted-foreground` for secondary / helper contexts (e.g. "optional"
 *     hints) rather than the default `text-foreground` / medium-weight style.
 *   - there is NO `className` / `style` prop.
 *   - need a danger / success tint? Add a `tone` prop here.
 */

export interface LabelProps {
  /** For associating with a form control. */
  htmlFor?: string
  children?: React.ReactNode
  /** Renders in muted colour for secondary / helper contexts. */
  muted?: boolean
}

export function Label({ htmlFor, children, muted }: LabelProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <LabelPrimitive
      htmlFor={htmlFor}
      className={cn(muted && 'text-muted-foreground font-normal')}
    >
      {children}
    </LabelPrimitive>
  )
}
