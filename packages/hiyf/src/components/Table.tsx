"use client"

import * as React from 'react'
import {
  Table as TablePrimitive,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './ui/table'

/**
 * Table — a closed generic data table wrapper over shadcn's Table primitive family.
 *
 * shadcn's Table passes `className` to every sub-part, leaving consumers free to
 * apply arbitrary one-off styles and compose rows however they like. This wrapper
 * closes it:
 *   - `columns` is a typed column descriptor array with `key`, `header`, `align`,
 *     and an optional `render` function; no className escapes.
 *   - `data` is a generic array of row objects; the type parameter `T` flows
 *     through so column keys and render callbacks are fully type-checked.
 *   - `caption` is an optional accessible table caption.
 *   - NO `className`/`style` escape hatch. Every table on screen is rendered by
 *     the same correct, on-brand structure.
 *   - Need a new alignment or row variant? Add it to the column descriptor here.
 */

export interface TableColumn<T> {
  /** Property key on each data row (used as default cell content). */
  key: string
  /** Column header label. */
  header: string
  /** Text alignment for both the header and cells. Defaults to 'left'. */
  align?: 'left' | 'right' | 'center'
  /**
   * Optional custom renderer for this column's cell.
   * Receives the full row object and returns a React node.
   */
  render?: (row: T) => React.ReactNode
}

export interface TableProps<T> {
  /** Column definitions — header labels, keys, alignment, and optional renderers. */
  columns: TableColumn<T>[]
  /** Array of data rows to render. */
  data: T[]
  /** Optional accessible caption rendered below the table. */
  caption?: string
}

const ALIGN_CLASS: Record<NonNullable<TableColumn<unknown>['align']>, string> = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
}

/** Closed generic data table — no className/style. */
export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  caption,
}: TableProps<T>) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <TablePrimitive>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key} className={ALIGN_CLASS[col.align ?? 'left']}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((col) => (
              <TableCell key={col.key} className={ALIGN_CLASS[col.align ?? 'left']}>
                {col.render ? col.render(row) : String(row[col.key] ?? '')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TablePrimitive>
  )
}
