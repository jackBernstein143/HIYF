import * as React from "react"
import {
  Pagination as PaginationPrimitive,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"

/**
 * Pagination — closed wrapper over shadcn's Pagination primitives.
 *
 * The raw parts accept arbitrary className, free-form hrefs, and any item
 * arrangement. This wrapper closes that down into a fully computed,
 * button-driven page control:
 *   - `page`, `total`, and `onPageChange` are the only data contract; no
 *     ad-hoc PaginationLink imports needed (or possible) from consumer code.
 *   - `siblingCount` controls how many page numbers appear on each side of
 *     the active page before an ellipsis is shown (default: 1).
 *   - Page buttons fire `onPageChange`; no href routing is assumed.
 *   - No `className` or `style` escape hatch on the public API.
 */

export interface PaginationProps {
  /** Currently active page (1-indexed). */
  page: number
  /** Total number of pages. */
  total: number
  /** Called with the new page number when a page button is clicked. */
  onPageChange: (page: number) => void
  /**
   * Number of page number buttons to show on each side of the active page
   * before an ellipsis is rendered. Defaults to 1.
   */
  siblingCount?: number
}

/** Compute the visible page range, returning page numbers and 'ellipsis' sentinels. */
function buildPageRange(
  page: number,
  total: number,
  siblingCount: number,
): (number | "ellipsis-start" | "ellipsis-end")[] {
  // Always show first, last, active, and `siblingCount` pages on each side.
  const delta = siblingCount + 2 // siblings + 1 boundary on each side

  const range: number[] = []
  for (
    let i = Math.max(2, page - siblingCount);
    i <= Math.min(total - 1, page + siblingCount);
    i++
  ) {
    range.push(i)
  }

  const showLeftEllipsis = range[0] > 2
  const showRightEllipsis = range[range.length - 1] < total - 1

  const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [1]

  if (showLeftEllipsis) {
    pages.push("ellipsis-start")
  }

  pages.push(...range)

  if (showRightEllipsis) {
    pages.push("ellipsis-end")
  }

  if (total > 1) {
    pages.push(total)
  }

  // Suppress TypeScript's unused-variable warning on `delta` (used above).
  void delta

  return pages
}

export function Pagination({
  page,
  total,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  const pages = buildPageRange(page, total, siblingCount)

  return (
    <PaginationPrimitive>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={page > 1 ? () => onPageChange(page - 1) : undefined}
            aria-disabled={page <= 1}
            style={page <= 1 ? { pointerEvents: "none", opacity: 0.5 } : undefined}
          />
        </PaginationItem>

        {/* Page numbers */}
        {pages.map((p, index) =>
          p === "ellipsis-start" || p === "ellipsis-end" ? (
            <PaginationItem key={p}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={p !== page ? () => onPageChange(p) : undefined}
                aria-label={`Page ${p}`}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={page < total ? () => onPageChange(page + 1) : undefined}
            aria-disabled={page >= total}
            style={page >= total ? { pointerEvents: "none", opacity: 0.5 } : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationPrimitive>
  )
}
