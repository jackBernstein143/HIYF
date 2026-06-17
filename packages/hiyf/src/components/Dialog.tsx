"use client"

import * as React from "react"
import { cn } from "../lib/utils"
import {
  Dialog as DialogPrimitive,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog"

/**
 * Dialog — a closed convenience wrapper over the shadcn Dialog primitives.
 *
 * The underlying shadcn Dialog accepts arbitrary `className` on its content
 * and exposes unconstrained sizing. This wrapper closes that down:
 *   - `size` maps to a small set of enumerated max-widths drawn from the
 *     design-system token scale (sm/md/lg), so every dialog on screen is
 *     one of three correct widths.
 *   - `trigger`, `title`, `description`, `footer` are typed props instead of
 *     letting callers compose raw sub-components, making the API scannable
 *     and misuse-resistant.
 *   - No `className` or `style` escape hatch is exposed on the public API.
 */

const sizeMap: Record<NonNullable<DialogProps["size"]>, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
}

export interface DialogProps {
  /** Element that opens the dialog (e.g. a Button). */
  trigger: React.ReactNode
  /** Accessible dialog title, rendered in the header. */
  title: string
  /** Optional subtitle rendered below the title. */
  description?: string
  /** Constrains the dialog width; defaults to 'md'. */
  size?: "sm" | "md" | "lg"
  /** Dialog body content. */
  children?: React.ReactNode
  /** Rendered in the dialog footer (e.g. action buttons). */
  footer?: React.ReactNode
  /** Controlled open state. */
  open?: boolean
  /** Called when the open state should change. */
  onOpenChange?: (open: boolean) => void
}

export function Dialog({
  trigger,
  title,
  description,
  size = "md",
  children,
  footer,
  open,
  onOpenChange,
}: DialogProps) {
  return (
    <DialogPrimitive open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn(sizeMap[size])}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </DialogPrimitive>
  )
}
