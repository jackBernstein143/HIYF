import { AspectRatio as AspectRatioPrimitive } from './ui/aspect-ratio'

/**
 * MapEmbed — the closed, sanctioned way to render an embedded location map.
 *
 * Raw <iframe> map embeds are an off-system escape hatch: every provider URL,
 * viewport shape, loading behavior, and frame treatment would be up for grabs.
 * This wrapper closes it:
 *   - Location is expressed only as decimal latitude/longitude with a
 *     clamped zoom.
 *   - `variant="street"` (default) renders the approved responsive 16:9
 *     keyless OpenStreetMap embed with a marker pin — reliable for every
 *     coordinate (Google's keyless embed is deprecated and renders
 *     inconsistently).
 *   - `variant="aerial"` renders satellite imagery at a FIXED height
 *     (256px, full width) so every aerial view is the same size: Esri World
 *     Imagery tiles stitched around the coordinate, a centered drop pin, and
 *     the required imagery attribution. The frame links out to Google Maps
 *     satellite view for full pan/zoom detail. OSM's embed has no imagery
 *     layer, and every other satellite embed needs an API key — static tile
 *     stitching is the reliable keyless path.
 *   - NO `className`/`style` escape hatch. Need a new map affordance? Add it
 *     here so every map stays on-system.
 */

export interface MapEmbedProps {
  /** Latitude in decimal degrees. */
  lat: number
  /** Longitude in decimal degrees. */
  lon: number
  /**
   * Zoom level 1-21. Controls the size of the map window. Defaults to 14 for
   * `street`, 17 for `aerial` (close enough to read site infrastructure like
   * substations; Esri imagery is dependable through ~19 in most regions).
   */
  zoom?: number
  /** Accessible title for the embed. Defaults to 'Map'. */
  title?: string
  /**
   * 'street' — responsive 16:9 OpenStreetMap embed.
   * 'aerial' — fixed-size satellite imagery with a centered pin.
   */
  variant?: 'street' | 'aerial'
}

const TILE_SIZE = 256
/** Fixed aerial frame height; full width. Never varies with content. */
const AERIAL_HEIGHT = 256
/** Tile grid half-extents: 7×3 tiles covers frames up to 1792px wide. */
const AERIAL_TILES_X = 3
const AERIAL_TILES_Y = 1

/** Slippy-map (Web Mercator) fractional tile coordinates. */
function tileCoords(lat: number, lon: number, zoom: number) {
  const n = 2 ** zoom
  const latRad = (lat * Math.PI) / 180
  const x = ((lon + 180) / 360) * n
  const y = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  return { x, y }
}

function AerialEmbed({
  lat,
  lon,
  zoom,
  title,
}: {
  lat: number
  lon: number
  zoom: number
  title: string
}) {
  const n = 2 ** zoom
  const { x, y } = tileCoords(lat, lon, zoom)
  // Global pixel position of the coordinate; tiles are offset from it so the
  // pin sits exactly at frame center.
  const px = x * TILE_SIZE
  const py = y * TILE_SIZE
  const centerTileX = Math.floor(x)
  const centerTileY = Math.floor(y)

  const tiles: { key: string; left: number; top: number; src: string }[] = []
  for (let dx = -AERIAL_TILES_X; dx <= AERIAL_TILES_X; dx++) {
    for (let dy = -AERIAL_TILES_Y; dy <= AERIAL_TILES_Y; dy++) {
      const tx = centerTileX + dx
      const ty = centerTileY + dy
      if (ty < 0 || ty >= n) continue
      // Wrap longitude so views near the antimeridian still fill the frame.
      const wrappedTx = ((tx % n) + n) % n
      tiles.push({
        key: `${tx}:${ty}`,
        left: tx * TILE_SIZE - px,
        top: ty * TILE_SIZE - py,
        src: `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoom}/${ty}/${wrappedTx}`,
      })
    }
  }

  const externalHref = `https://www.google.com/maps/@?api=1&map_action=map&center=${lat}%2C${lon}&zoom=${zoom}&basemap=satellite`

  return (
    <a
      href={externalHref}
      target="_blank"
      rel="noreferrer"
      title={title}
      aria-label={`${title} — open satellite view`}
      className="relative block w-full shrink-0 overflow-hidden rounded-lg bg-muted"
      style={{ height: AERIAL_HEIGHT }}
    >
      <div className="absolute left-1/2 top-1/2">
        {tiles.map((tile) => (
          <img
            key={tile.key}
            src={tile.src}
            alt=""
            loading="lazy"
            draggable={false}
            className="absolute max-w-none select-none"
            style={{ left: tile.left, top: tile.top, width: TILE_SIZE, height: TILE_SIZE }}
          />
        ))}
      </div>
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-full drop-shadow-md"
      >
        <path
          d="M12 2c-3.9 0-7 3.1-7 7 0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z"
          fill="#e11d48"
          stroke="#fff"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="9" r="2.5" fill="#fff" />
      </svg>
      <span className="absolute bottom-0 right-0 rounded-tl bg-black/50 px-1.5 py-0.5 text-[10px] leading-tight text-white/90">
        Imagery © Esri, Maxar, Earthstar Geographics
      </span>
    </a>
  )
}

/** Closed map embed — no className/style. */
export function MapEmbed({
  lat,
  lon,
  zoom,
  title = 'Map',
  variant = 'street',
}: MapEmbedProps) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return null
  }

  const defaultZoom = variant === 'aerial' ? 17 : 14
  const zoomValue = zoom == null || Number.isNaN(zoom) ? defaultZoom : zoom
  const clampedZoom = Math.min(21, Math.max(1, Math.round(zoomValue)))

  if (variant === 'aerial') {
    return <AerialEmbed lat={lat} lon={lon} zoom={clampedZoom} title={title} />
  }

  // Half-window in degrees for the bounding box; smaller as zoom increases.
  const half = Math.min(20, Math.max(0.004, 40 / 2 ** clampedZoom))
  const bbox = `${lon - half},${lat - half},${lon + half},${lat + half}`
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`

  return (
    <div className="w-full shrink-0 overflow-hidden rounded-lg bg-muted">
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
