"use client"

import * as React from 'react'
import {
  Avatar as AvatarPrimitive,
  AvatarImage,
  AvatarFallback,
} from './ui/avatar'

/**
 * Avatar — a closed wrapper over shadcn's Avatar primitive family.
 *
 * shadcn's Avatar passes `className` to the root, image, and fallback,
 * letting consumers override size, shape, and color freely. This wrapper
 * closes it:
 *   - `size` is enumerated ('sm'|'md'|'lg') and maps to the ui primitive's
 *     own `size` data attribute — the only expressible sizes are correct ones.
 *   - `src`, `alt`, and `fallback` (initials/text) are declared explicitly;
 *     AvatarImage and AvatarFallback are composed internally.
 *   - NO `className`/`style` escape hatch. Every avatar on screen is
 *     one of a finite, on-brand set of treatments.
 *   - Need another size? Add it to the ui primitive and mirror it here.
 */

export interface AvatarProps {
  /** Image URL. When absent (or on load failure), `fallback` is shown. */
  src?: string
  /** Accessible alt text for the image. */
  alt?: string
  /** Short text (e.g. initials) shown when the image is unavailable. */
  fallback: string
  /** Enumerated size. Defaults to 'md'. */
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ src, alt, fallback, size = 'md' }: AvatarProps) {
  // Map our intent-named sizes to the ui primitive's size prop.
  const primitiveSize = size === 'md' ? 'default' : size
  return (
    <AvatarPrimitive size={primitiveSize as 'default' | 'sm' | 'lg'}>
      {src && <AvatarImage src={src} alt={alt ?? fallback} />}
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarPrimitive>
  )
}
