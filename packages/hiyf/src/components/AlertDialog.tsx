"use client"

import * as React from "react"
import {
  AlertDialog as AlertDialogPrimitive,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "./ui/alert-dialog"

/**
 * AlertDialog — a closed convenience wrapper over the shadcn AlertDialog primitives.
 *
 * The raw primitives let callers pass arbitrary className, choose any button
 * variant, and compose the footer however they like. This wrapper closes that:
 *   - `tone` maps to intent ('default' or 'danger') instead of exposing raw
 *     button variants — callers express what the action means, not how it looks.
 *   - `confirmLabel` / `cancelLabel` drive the two-button footer; no freestyle
 *     footer slot is offered because alert dialogs have a fixed structural shape.
 *   - No `className` or `style` escape hatch on any public prop.
 */

export interface AlertDialogProps {
  /** Element that opens the dialog (e.g. a Button). */
  trigger: React.ReactNode
  /** Accessible dialog title. */
  title: string
  /** Explanatory text below the title. */
  description: string
  /** Label for the confirm button; defaults to 'Confirm'. */
  confirmLabel?: string
  /** Label for the cancel button; defaults to 'Cancel'. */
  cancelLabel?: string
  /** Called when the confirm button is clicked. */
  onConfirm?: () => void
  /**
   * Intent of the confirm action.
   * 'danger' renders the confirm button in the destructive style to signal
   * an irreversible or high-risk operation.
   */
  tone?: "default" | "danger"
  /** Controlled open state. */
  open?: boolean
  /** Called when the open state should change. */
  onOpenChange?: (open: boolean) => void
}

export function AlertDialog({
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  tone = "default",
  open,
  onOpenChange,
}: AlertDialogProps) {
  return (
    <AlertDialogPrimitive open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            variant={tone === "danger" ? "destructive" : "default"}
            onClick={onConfirm}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogPrimitive>
  )
}
