import { cn } from '../lib/utils'

/**
 * Image — the closed, sanctioned way to render an image asset.
 *
 * Raw <img> fails the lockdown lint (it is an off-system escape hatch). This is
 * its one home: every image on screen goes through here. There is no
 * className/style escape hatch — size with width/height, shape with radius,
 * control object-fit with fit.
 */

const RADIUS = {
  none: 'rounded-none',
  s: 'rounded-sm',
  m: 'rounded-md',
  l: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const

const FIT = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  none: 'object-none',
} as const

export type ImageRadius = keyof typeof RADIUS
export type ImageFit = keyof typeof FIT

export type ImageProps = {
  src: string
  /** Always required — describe the image, or pass "" for decorative images. */
  alt: string
  width?: number
  height?: number
  radius?: ImageRadius
  fit?: ImageFit
  loading?: 'lazy' | 'eager'
}

export function Image({
  src,
  alt,
  width,
  height,
  radius = 'none',
  fit = 'cover',
  loading = 'lazy',
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={cn('inline-block max-w-full', RADIUS[radius], FIT[fit])}
    />
  )
}
