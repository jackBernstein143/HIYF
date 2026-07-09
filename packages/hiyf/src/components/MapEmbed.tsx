import { AspectRatio as AspectRatioPrimitive } from './ui/aspect-ratio'

/**
 * MapEmbed — the closed, sanctioned way to render an embedded location map.
 *
 * Raw <iframe> map embeds are an off-system escape hatch: every provider URL,
 * viewport shape, loading behavior, and frame treatment would be up for grabs.
 * This wrapper closes it:
 *   - Location is expressed only as decimal latitude/longitude with an
 *     enumerated map view and clamped zoom.
 *   - The embed always uses the approved responsive 16:9 frame, rounded
 *     corners, muted loading surface, and Google Maps embed URL.
 *   - NO `className`/`style` escape hatch. Need a new map affordance? Add it
 *     here so every map stays on-system.
 */

export interface MapEmbedProps {
  /** Latitude in decimal degrees. */
  lat: number
  /** Longitude in decimal degrees. */
  lon: number
  /** Zoom level 1-21. Defaults to 14. */
  zoom?: number
  /** 'satellite' (default) or 'map'. */
  view?: 'map' | 'satellite'
  /** Accessible title for the embed. Defaults to 'Map'. */
  title?: string
}

/** Closed responsive map embed — no className/style. */
export function MapEmbed({
  lat,
  lon,
  zoom = 14,
  view = 'satellite',
  title = 'Map',
}: MapEmbedProps) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return null
  }

  const zoomValue = Number.isNaN(zoom) ? 14 : zoom
  const clampedZoom = Math.min(21, Math.max(1, zoomValue))
  const src = `https://maps.google.com/maps?ll=${lat},${lon}&q=${lat},${lon}&z=${clampedZoom}&t=${view === 'map' ? 'm' : 'k'}&output=embed`

  return (
    <div className="w-full overflow-hidden rounded-lg bg-muted">
      <AspectRatioPrimitive ratio={16 / 9}>
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="size-full border-0"
        />
      </AspectRatioPrimitive>
    </div>
  )
}
