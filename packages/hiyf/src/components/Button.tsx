import * as React from 'react'
import { Button as ButtonPrimitive } from './ui/button'

/**
 * Button — closed wrapper over shadcn's <Button>.
 *
 * shadcn's Button accepts an arbitrary `variant` string (default / outline /
 * secondary / ghost / destructive / link) and a raw `className`. This wrapper
 * closes both escape hatches:
 *   - `intent` is named by purpose (primary / secondary / outline / ghost /
 *     danger), not by appearance. `primary` maps to the default filled style;
 *     `danger` maps to the destructive treatment.
 *   - `size` accepts only the three product-sanctioned options (sm / md / lg).
 *   - there is NO `className` / `style` prop. Every button on screen is one of
 *     a finite set of correct, on-brand treatments.
 *   - need a new look? Add an `intent` here — a deliberate, reviewable change
 *     to the design system — rather than a one-off class.
 *
 * Standard behaviour props (onClick, disabled, type, children) pass through.
 */

const intentToVariant = {
  primary: 'default',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
  danger: 'destructive',
} as const

const sizeToVariant = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
} as const

export type ButtonIntent = keyof typeof intentToVariant
export type ButtonSize = keyof typeof sizeToVariant

// Native button props minus the styling escape hatches. Behavioural props
// (onClick, ref, aria-*, data-*, onPointerEnter, …) MUST stay so the Button can
// act as an `asChild` trigger for anchored/hover overlays (Popover, Tooltip, …).
type NativeButtonProps = Omit<
  React.ComponentPropsWithRef<'button'>,
  'className' | 'style'
>

export interface ButtonProps extends NativeButtonProps {
  /** Named by purpose, not appearance. */
  intent?: ButtonIntent
  size?: ButtonSize
}

export function Button({
  intent = 'primary',
  size = 'md',
  children,
  ...rest
}: ButtonProps) {
  // No className/style by design — but ref + the props Radix injects on an
  // `asChild` trigger pass through; that's what makes overlays anchor & open.
  return (
    <ButtonPrimitive
      variant={intentToVariant[intent]}
      size={sizeToVariant[size]}
      {...rest}
    >
      {children}
    </ButtonPrimitive>
  )
}
