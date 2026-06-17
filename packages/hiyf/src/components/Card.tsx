import * as React from 'react'
import {
  Card as CardPrimitive,
  CardHeader as CardHeaderPrimitive,
  CardTitle as CardTitlePrimitive,
  CardDescription as CardDescriptionPrimitive,
  CardContent as CardContentPrimitive,
  CardFooter as CardFooterPrimitive,
} from './ui/card'

/**
 * Card — a closed composable wrapper over shadcn's Card primitive family.
 *
 * shadcn's Card passes `className` through to every sub-part, leaving the
 * door open to arbitrary one-off styles. This wrapper closes the root:
 *   - `padding` is enumerated ('sm'|'md'|'lg') via the ui's built-in
 *     `data-size` mechanism — the only expressible spacing options are
 *     the ones the design system sanctions.
 *   - Each sub-part (CardHeader, CardTitle, …) is a thin children-only
 *     re-export with NO `className` passthrough.
 *   - Need a new padding step? Add a variant here.
 *
 * Composable usage:
 *   <Card padding="md">
 *     <CardHeader><CardTitle>…</CardTitle></CardHeader>
 *     <CardContent>…</CardContent>
 *   </Card>
 */

export interface CardProps {
  /** Enumerated internal spacing. Maps to the ui primitive's `size` prop. */
  padding?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

/** Closed card root — no className/style. */
export function Card({ padding = 'md', children }: CardProps) {
  // 'sm' → ui size="sm", 'md'/'lg' → ui size="default" (lg adds no further
  // token today; extend here when a larger step lands in the token set).
  const size = padding === 'sm' ? 'sm' : 'default'
  return <CardPrimitive size={size}>{children}</CardPrimitive>
}

/** Closed card header — children only, no className. */
export function CardHeader({ children }: { children: React.ReactNode }) {
  return <CardHeaderPrimitive>{children}</CardHeaderPrimitive>
}

/** Closed card title — children only, no className. */
export function CardTitle({ children }: { children: React.ReactNode }) {
  return <CardTitlePrimitive>{children}</CardTitlePrimitive>
}

/** Closed card description — children only, no className. */
export function CardDescription({ children }: { children: React.ReactNode }) {
  return <CardDescriptionPrimitive>{children}</CardDescriptionPrimitive>
}

/** Closed card content area — children only, no className. */
export function CardContent({ children }: { children: React.ReactNode }) {
  return <CardContentPrimitive>{children}</CardContentPrimitive>
}

/** Closed card footer — children only, no className. */
export function CardFooter({ children }: { children: React.ReactNode }) {
  return <CardFooterPrimitive>{children}</CardFooterPrimitive>
}
