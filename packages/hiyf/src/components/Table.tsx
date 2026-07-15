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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Tooltip } from './Tooltip'
import { HugeiconsIcon } from '@hugeicons/react'
import { InformationCircleIcon } from '@hugeicons/core-free-icons'

/**
 * Table — a closed generic data table wrapper over shadcn's Table primitive family.
 *
 * shadcn's Table passes `className` to every sub-part, leaving consumers free to
 * apply arbitrary one-off styles and compose rows however they like. This wrapper
 * closes it:
 *   - `columns` is a typed column descriptor array with `key`, `header`, `align`,
 *     controlled sort/filter metadata, and an optional `render` function; no
 *     className escapes.
 *   - `data` is a generic array of row objects; the type parameter `T` flows
 *     through so column keys and render callbacks are fully type-checked.
 *   - `caption` is an optional accessible table caption.
 *   - sorting, filtering, and row clicks are controlled callbacks only; Table
 *     never mutates, sorts, or filters `data`.
 *   - NO `className`/`style` escape hatch. Every table on screen is rendered by
 *     the same correct, on-brand structure.
 *   - Need a new alignment or row variant? Add it to the column descriptor here.
 */

export interface TableFilterOption {
  value: string
  label: string
}

export type TableSort = {
  key: string
  direction: 'asc' | 'desc'
}

export interface TableColumn<T> {
  /** Property key on each data row (used as default cell content). */
  key: string
  /** Column header label. */
  header: string
  /** Text alignment for both the header and cells. Defaults to 'left'. */
  align?: 'left' | 'right' | 'center'
  /** Whether this column exposes controlled sort actions. */
  sortable?: boolean
  /** Controlled filter options. The first option conventionally means no filter/all. */
  filterOptions?: TableFilterOption[]
  /** Current controlled filter value for this column. */
  filterValue?: string
  /** Called when a filter option is selected. */
  onFilterChange?: (value: string) => void
  /**
   * Multi-select filter mode: the currently selected option values. When provided
   * (with onFilterValuesChange), the header menu renders filterOptions as toggling
   * check items that DON'T close the menu, so several can be selected in one visit.
   * There is no "all" convention in this mode — an empty array means unfiltered, and
   * a "Clear" item appears whenever anything is selected. Mutually exclusive with
   * filterValue/onFilterChange single-select mode.
   */
  filterValues?: string[]
  /** Called with the full updated selection whenever a multi-select option is toggled. */
  onFilterValuesChange?: (values: string[]) => void
  /** Optional explanatory text shown in a hover tooltip via an info icon next to the header. */
  headerInfo?: string
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
  /** Current controlled sort state. */
  sort?: TableSort
  /** Called when a column sort direction is selected. */
  onSortChange?: (sort: TableSort) => void
  /** Called when a non-interactive part of a row is clicked or keyboard-activated. */
  onRowClick?: (row: T) => void
}

const ALIGN_CLASS: Record<NonNullable<TableColumn<unknown>['align']>, string> = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
}

const HEADER_FLEX_CLASS: Record<NonNullable<TableColumn<unknown>['align']>, string> = {
  left: 'justify-start',
  right: 'justify-end',
  center: 'justify-center',
}

function CheckGlyph({ visible }: { visible: boolean }) {
  return (
    <svg
      className={visible ? 'size-4 shrink-0' : 'size-4 shrink-0 opacity-0'}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m20 6-11 11-5-5" />
    </svg>
  )
}

function SortGlyph({ direction }: { direction: 'asc' | 'desc' }) {
  return (
    <svg
      className="size-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === 'asc' ? (
        <path d="m18 15-6-6-6 6" />
      ) : (
        <path d="m6 9 6 6 6-6" />
      )}
    </svg>
  )
}

function ChevronDownGlyph({ active }: { active: boolean }) {
  return (
    <svg
      className={
        active
          ? 'size-4 shrink-0'
          : 'size-4 shrink-0 opacity-50 transition-opacity group-hover/header:opacity-100 group-focus-within/header:opacity-100'
      }
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function HeaderMenu<T>({
  column,
  sort,
  onSortChange,
}: {
  column: TableColumn<T>
  sort?: TableSort
  onSortChange?: (sort: TableSort) => void
}) {
  const activeSort = sort?.key === column.key ? sort : undefined
  const multi = column.filterValues !== undefined
  const firstFilterValue = column.filterOptions?.[0]?.value
  const filterActive = multi
    ? (column.filterValues?.length ?? 0) > 0
    : column.filterValue !== undefined &&
      firstFilterValue !== undefined &&
      column.filterValue !== firstFilterValue
  const active = Boolean(activeSort) || filterActive

  const toggleValue = (value: string) => {
    const cur = column.filterValues ?? []
    column.onFilterValuesChange?.(
      cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value],
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={
            active
              ? 'inline-flex size-6 items-center justify-center rounded-md text-foreground outline-hidden transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring'
              : 'inline-flex size-6 items-center justify-center rounded-md text-muted-foreground outline-hidden transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring'
          }
          aria-label={`${column.header} options`}
        >
          {activeSort ? (
            <SortGlyph direction={activeSort.direction} />
          ) : (
            <ChevronDownGlyph active={active} />
          )}
        </button>
      </DropdownMenuTrigger>
      {/* w-auto: the shared content style pins width to the trigger — here that's the tiny
          chevron button, which would clamp the menu to its 128px minimum and clip labels.
          A header menu sizes to its widest label instead (with a sane ceiling). */}
      <DropdownMenuContent align="end" className="w-auto max-w-80">
        {column.sortable && (
          <>
            <DropdownMenuItem
              onSelect={() => onSortChange?.({ key: column.key, direction: 'asc' })}
            >
              <CheckGlyph visible={activeSort?.direction === 'asc'} />
              Ascending
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => onSortChange?.({ key: column.key, direction: 'desc' })}
            >
              <CheckGlyph visible={activeSort?.direction === 'desc'} />
              Descending
            </DropdownMenuItem>
          </>
        )}
        {column.sortable && column.filterOptions && column.filterOptions.length > 0 && (
          <DropdownMenuSeparator />
        )}
        {column.filterOptions?.map((option) =>
          multi ? (
            // Multi-select: toggling keeps the menu open so several values can be
            // picked in one visit (preventDefault stops Radix's close-on-select).
            // whitespace-nowrap: a filter label is a name — it widens the menu, never wraps.
            <DropdownMenuItem
              key={option.value}
              className="whitespace-nowrap"
              onSelect={(event) => {
                event.preventDefault()
                toggleValue(option.value)
              }}
            >
              <CheckGlyph visible={(column.filterValues ?? []).includes(option.value)} />
              {option.label}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              key={option.value}
              className="whitespace-nowrap"
              onSelect={() => column.onFilterChange?.(option.value)}
            >
              <CheckGlyph visible={column.filterValue === option.value} />
              {option.label}
            </DropdownMenuItem>
          ),
        )}
        {multi && (column.filterValues?.length ?? 0) > 0 ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => column.onFilterValuesChange?.([])}>
              <CheckGlyph visible={false} />
              Clear
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function HeaderContent<T>({
  column,
  sort,
  onSortChange,
}: {
  column: TableColumn<T>
  sort?: TableSort
  onSortChange?: (sort: TableSort) => void
}) {
  const hasMenu =
    column.sortable || (column.filterOptions && column.filterOptions.length > 0)

  if (!hasMenu && !column.headerInfo) {
    return <>{column.header}</>
  }

  return (
    <div className={`flex items-center gap-1 ${HEADER_FLEX_CLASS[column.align ?? 'left']}`}>
      <span>{column.header}</span>
      {column.headerInfo ? (
        <Tooltip content={column.headerInfo}>
          <span className="inline-flex cursor-help text-muted-foreground/70 transition-colors hover:text-foreground">
            <HugeiconsIcon icon={InformationCircleIcon} size={14} />
          </span>
        </Tooltip>
      ) : null}
      {hasMenu ? <HeaderMenu column={column} sort={sort} onSortChange={onSortChange} /> : null}
    </div>
  )
}

function rowClickIsFromInteractiveElement(event: React.MouseEvent<HTMLTableRowElement>) {
  return Boolean(
    (event.target as HTMLElement).closest(
      'button, a, input, textarea, select, [role="menuitem"], [role="checkbox"]'
    )
  )
}

/** Closed generic data table — no className/style. */
export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  caption,
  sort,
  onSortChange,
  onRowClick,
}: TableProps<T>) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <TablePrimitive>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className={
                col.sortable || (col.filterOptions && col.filterOptions.length > 0)
                  ? `${ALIGN_CLASS[col.align ?? 'left']} group/header`
                  : ALIGN_CLASS[col.align ?? 'left']
              }
            >
              <HeaderContent
                column={col}
                sort={sort}
                onSortChange={onSortChange}
              />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            className={onRowClick ? 'cursor-pointer' : undefined}
            tabIndex={onRowClick ? 0 : undefined}
            onClick={
              onRowClick
                ? (event) => {
                    if (rowClickIsFromInteractiveElement(event)) {
                      return
                    }

                    onRowClick(row)
                  }
                : undefined
            }
            onKeyDown={
              onRowClick
                ? (event) => {
                    if (event.key !== 'Enter' && event.key !== ' ') {
                      return
                    }

                    if (
                      (event.target as HTMLElement).closest(
                        'button, a, input, textarea, select, [role="menuitem"], [role="checkbox"]'
                      )
                    ) {
                      return
                    }

                    event.preventDefault()
                    onRowClick(row)
                  }
                : undefined
            }
          >
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
