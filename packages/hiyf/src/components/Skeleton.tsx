import * as React from 'react'
import { cva } from 'class-variance-authority'

/**
 * Skeleton — a closed wrapper over shadcn's Skeleton primitive.
 *
 * shadcn's <Skeleton> accepts arbitrary `className` for width/height/shape,
 * making every usage a one-off. This wrapper closes it:
 *   - `width` and `height` are enumerated tokens mapped to fixed Tailwind
 *     classes — the only expressible sizes are correct, system-sanctioned ones.
 *   - `shape` ('line'|'circle'|'block') controls border-radius declaratively.
 *   - NO `className`/`style` escape hatch. Every skeleton on screen is one of
 *     a finite, on-brand set of shapes.
 *   - Need a new size step? Add it to the token maps here.
 */

const WIDTH_MAP = {
  xs: 'w-10',
  sm: 'w-20',
  md: 'w-40',
  lg: 'w-64',
  full: 'w-full',
} as const

const HEIGHT_MAP = {
  xs: 'h-3',
  sm: 'h-4',
  md: 'h-6',
  lg: 'h-10',
  full: 'h-full',
} as const

const shapeVariants = cva('animate-pulse bg-muted', {
  variants: {
    shape: {
      line: 'rounded-md',
      circle: 'rounded-full',
      block: 'rounded-lg',
    },
  },
  defaultVariants: { shape: 'line' },
})

export type SkeletonWidth = keyof typeof WIDTH_MAP
export type SkeletonHeight = keyof typeof HEIGHT_MAP
export type SkeletonShape = 'line' | 'circle' | 'block'

export interface SkeletonProps {
  /** Enumerated width token. Defaults to 'full'. */
  width?: SkeletonWidth
  /** Enumerated height token. Defaults to 'sm'. */
  height?: SkeletonHeight
  /** Shape treatment: line = rounded bar, circle = pill/avatar, block = card. */
  shape?: SkeletonShape
}

export function Skeleton({
  width = 'full',
  height = 'sm',
  shape = 'line',
}: SkeletonProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <div
      data-slot="skeleton"
      className={`${shapeVariants({ shape })} ${WIDTH_MAP[width]} ${HEIGHT_MAP[height]}`}
    />
  )
}
