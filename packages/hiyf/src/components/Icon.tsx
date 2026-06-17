import { HugeiconsIcon } from "@hugeicons/react"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

/**
 * Icon — the design system's single icon primitive. The whole system is built on
 * **hugeicons**; this is the on-system way to render one. Import glyphs from
 * `@jackbernnie/hiyf/icons` (a re-export of @hugeicons/core-free-icons), so there
 * is no separate install and no reason to reach for lucide or another icon lib.
 *
 *   import { Icon } from '@jackbernnie/hiyf'
 *   import { Home01Icon } from '@jackbernnie/hiyf/icons'
 *   <Icon icon={Home01Icon} size="s" />
 *
 * `size` is a token; `color` is enumerated and defaults to `current` (inherits
 * the surrounding text color, so icons inside buttons/links just work). No
 * className/style escape hatch.
 */

const SIZE = { xs: 12, s: 16, m: 20, l: 24, xl: 32 } as const
export type IconSize = keyof typeof SIZE

const iconVariants = cva("shrink-0", {
  variants: {
    color: {
      current: "",
      muted: "text-muted-foreground",
      accent: "text-primary",
      success: "text-emerald-600 dark:text-emerald-400",
      warning: "text-amber-600 dark:text-amber-400",
      danger: "text-destructive",
    },
  },
  defaultVariants: { color: "current" },
})

export type IconColor = NonNullable<VariantProps<typeof iconVariants>["color"]>

export interface IconProps {
  /** A hugeicons glyph, e.g. imported from `@jackbernnie/hiyf/icons`. */
  icon: React.ComponentProps<typeof HugeiconsIcon>["icon"]
  /** Token size. Defaults to `s` (16px) — the common inline size. */
  size?: IconSize
  /** Color intent. Defaults to `current` (inherits surrounding text color). */
  color?: IconColor
  strokeWidth?: number
  "aria-label"?: string
  "aria-hidden"?: boolean
}

export function Icon({
  icon,
  size = "s",
  color,
  strokeWidth = 2,
  ...a11y
}: IconProps) {
  // No className/style by design — size is a token, color an enumerated intent.
  return (
    <HugeiconsIcon
      icon={icon}
      size={SIZE[size]}
      strokeWidth={strokeWidth}
      className={iconVariants({ color })}
      {...a11y}
    />
  )
}
