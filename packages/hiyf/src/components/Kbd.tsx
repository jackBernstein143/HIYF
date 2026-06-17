import * as React from 'react'
import { Kbd as KbdPrimitive, KbdGroup } from './ui/kbd'

/**
 * Kbd — closed keyboard-shortcut wrapper over shadcn's Kbd primitive.
 *
 * shadcn's <Kbd> accepts arbitrary `className` and renders a single key. This
 * wrapper closes that hatch and adds multi-key support:
 *   - `keys` renders each string as its own <kbd> chip inside a KbdGroup,
 *     which automatically spaces them with a gap.
 *   - `children` can be used as an alternative to `keys` for a single raw key
 *     or any React node (e.g. an SVG icon representing ⌘).
 *   - When both are supplied `keys` takes precedence.
 *   - there is NO `className` / `style` prop.
 */

export interface KbdProps {
  /**
   * Array of key labels to display. Each string becomes its own chip.
   * Example: ['⌘', 'K'] renders ⌘ + K as two adjacent chips.
   */
  keys?: string[]
  /**
   * Alternative to `keys` — renders a single chip containing the given content.
   * Ignored when `keys` is provided.
   */
  children?: React.ReactNode
}

export function Kbd({ keys, children }: KbdProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  if (keys && keys.length > 0) {
    return (
      <KbdGroup>
        {keys.map((key, i) => (
          <KbdPrimitive key={i}>{key}</KbdPrimitive>
        ))}
      </KbdGroup>
    )
  }

  return <KbdPrimitive>{children}</KbdPrimitive>
}
