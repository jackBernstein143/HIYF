import * as React from 'react'
import { ButtonGroup as ButtonGroupPrimitive } from './ui/button-group'

/**
 * ButtonGroup — closed wrapper over shadcn's <ButtonGroup>.
 *
 * shadcn's ButtonGroup accepts arbitrary `className` and leaves orientation
 * as an open-ended string. This wrapper closes those escape hatches:
 *   - `orientation` accepts only the two sanctioned directions
 *     ('horizontal'|'vertical'); defaults to 'horizontal'.
 *   - `children` should be HIYF <Button> elements (or other HIYF controls);
 *     the group stitches them into a joined button strip automatically via CSS.
 *   - there is NO `className` / `style` prop.
 */

export interface ButtonGroupProps {
  /** Layout direction of the grouped buttons. Defaults to 'horizontal'. */
  orientation?: 'horizontal' | 'vertical'
  children: React.ReactNode
}

export function ButtonGroup({ orientation = 'horizontal', children }: ButtonGroupProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <ButtonGroupPrimitive orientation={orientation}>
      {children}
    </ButtonGroupPrimitive>
  )
}
