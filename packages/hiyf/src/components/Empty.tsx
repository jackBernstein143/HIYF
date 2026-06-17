import * as React from 'react'
import {
  Empty as EmptyPrimitive,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from './ui/empty'

/**
 * Empty — a closed empty-state wrapper over shadcn's Empty primitive family.
 *
 * shadcn's Empty parts accept arbitrary `className` and free-form children,
 * letting consumers produce wildly inconsistent empty states. This wrapper
 * closes it:
 *   - `title` is the required heading; always renders via EmptyTitle.
 *   - `description` is optional supporting text; renders via EmptyDescription.
 *   - `icon` is an optional React node (e.g. an SVG icon) shown in an
 *     EmptyMedia container with the 'icon' variant for correct sizing/bg.
 *   - `action` is an optional React node (e.g. a Button) shown below the text.
 *   - NO `className`/`style` escape hatch. Every empty state on screen uses
 *     the same on-brand structure and spacing.
 *   - Need a custom media treatment? Add an enumerated `mediaVariant` prop.
 */

export interface EmptyProps {
  /** Primary heading of the empty state. */
  title: string
  /** Optional supporting description text. */
  description?: string
  /** Optional icon or illustration rendered above the title. */
  icon?: React.ReactNode
  /** Optional action element (e.g. a Button) rendered below the text. */
  action?: React.ReactNode
}

/** Closed empty state — no className/style. */
export function Empty({ title, description, icon, action }: EmptyProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <EmptyPrimitive>
      <EmptyHeader>
        {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {action && <EmptyContent>{action}</EmptyContent>}
    </EmptyPrimitive>
  )
}
