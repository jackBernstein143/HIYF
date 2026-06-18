"use client"

import * as React from "react"
import {
  LineChart,
  BarChart,
  AreaChart,
  Line,
  Bar,
  Area,
  CartesianGrid,
  XAxis,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "./ui/chart"

/**
 * Chart — closed wrapper over shadcn's ChartContainer + recharts primitives.
 *
 * The raw ChartContainer accepts a free-form `config` object and any recharts
 * composition as children. This wrapper closes the API:
 *   - `type` is enumerated ('line' | 'bar' | 'area'); no raw recharts imports
 *     are needed from consumer code.
 *   - `data` is the row array, `index` names the x-axis key, and `categories`
 *     names the numeric series keys. Each category is automatically assigned a
 *     design-system chart color token (--chart-1 … --chart-5, cycling if more
 *     than five series are provided).
 *   - `height` is enumerated ('sm' | 'md' | 'lg') and controls the chart's
 *     fixed pixel height.
 *   - No `className` or `style` escape hatch on any public prop.
 *   - Need axes labels, legends, or reference lines? Add enumerated props here.
 */

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const

const HEIGHT_MAP = {
  sm: 200,
  md: 320,
  lg: 480,
} as const

export interface ChartProps {
  /** Chart rendering type. */
  type: "line" | "bar" | "area"
  /** Array of row objects; each key corresponds to `index` or a category key. */
  data: Array<Record<string, string | number>>
  /** The key in each data row used as the x-axis label. */
  index: string
  /** The numeric series keys to plot; each becomes one Line/Bar/Area. */
  categories: string[]
  /**
   * Chart height bucket.
   * @default 'md'
   */
  height?: "sm" | "md" | "lg"
  /**
   * Show a legend mapping each series to its color.
   * @default true when there is more than one category
   */
  legend?: boolean
}

export function Chart({
  type,
  data,
  index,
  categories,
  height = "md",
  legend,
}: ChartProps) {
  const showLegend = legend ?? categories.length > 1
  const config: ChartConfig = Object.fromEntries(
    categories.map((cat, i) => [
      cat,
      {
        label: cat,
        color: CHART_COLORS[i % CHART_COLORS.length],
      },
    ])
  )

  const pixelHeight = HEIGHT_MAP[height]

  // ResponsiveContainer (inside ChartContainer) fills its parent, so the chart
  // type itself takes no height — the wrapping div below provides it.
  const commonProps = { data }

  const grid = <CartesianGrid vertical={false} />
  const xAxis = <XAxis dataKey={index} tickLine={false} axisLine={false} />
  const tooltip = (
    <ChartTooltip content={<ChartTooltipContent />} />
  )
  const legendNode = showLegend ? (
    <ChartLegend content={<ChartLegendContent />} />
  ) : null

  let chart: React.ReactNode

  if (type === "line") {
    chart = (
      <LineChart {...commonProps}>
        {grid}
        {xAxis}
        {tooltip}
        {legendNode}
        {categories.map((cat) => (
          <Line
            key={cat}
            type="monotone"
            dataKey={cat}
            stroke={`var(--color-${cat})`}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    )
  } else if (type === "bar") {
    chart = (
      <BarChart {...commonProps}>
        {grid}
        {xAxis}
        {tooltip}
        {legendNode}
        {categories.map((cat) => (
          <Bar
            key={cat}
            dataKey={cat}
            fill={`var(--color-${cat})`}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    )
  } else {
    chart = (
      <AreaChart {...commonProps}>
        {grid}
        {xAxis}
        {tooltip}
        {legendNode}
        {categories.map((cat) => (
          <Area
            key={cat}
            type="monotone"
            dataKey={cat}
            stroke={`var(--color-${cat})`}
            fill={`var(--color-${cat})`}
            fillOpacity={0.2}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    )
  }

  // Fixed-height box gives ResponsiveContainer a concrete box to measure; the
  // `aspect-auto h-full w-full` overrides ChartContainer's default aspect-video.
  return (
    <div style={{ height: pixelHeight, width: "100%" }}>
      <ChartContainer config={config} className="aspect-auto h-full w-full">
        {chart as React.ComponentProps<typeof ChartContainer>["children"]}
      </ChartContainer>
    </div>
  )
}
