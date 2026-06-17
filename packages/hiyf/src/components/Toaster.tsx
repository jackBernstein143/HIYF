"use client"

import * as React from 'react'
import { Toaster as ToasterPrimitive } from './ui/sonner'

/**
 * Toaster — a closed wrapper over the shadcn Sonner Toaster primitive.
 *
 * shadcn's Toaster passes the full ToasterProps through, including arbitrary
 * `className`, `style`, raw `position` strings, and low-level `toastOptions`.
 * This wrapper closes it:
 *   - `position` is enumerated ('top-right'|'bottom-right'|'top-center'|
 *     'bottom-center') — the only expressible positions are the four
 *     system-sanctioned placements.
 *   - `richColors` is always enabled; consumers cannot disable it.
 *   - The ui/sonner primitive's custom icons and CSS-variable tokens are
 *     always applied; consumers cannot override them.
 *   - NO `className`/`style` escape hatch.
 *   - Consumers still call `toast()` from the 'sonner' package directly to
 *     trigger toasts — this component only mounts the toast container.
 *   - Need a new position? Add it to the enumeration here.
 */

export interface ToasterProps {
  /**
   * Screen position for the toast stack.
   * Defaults to 'bottom-right'.
   */
  position?: 'top-right' | 'bottom-right' | 'top-center' | 'bottom-center'
}

/**
 * Closed Toaster mount — no className/style.
 * Place once near the root of your app. Consumers call `toast()` from 'sonner'.
 */
export function Toaster({ position = 'bottom-right' }: ToasterProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return <ToasterPrimitive position={position} richColors />
}
