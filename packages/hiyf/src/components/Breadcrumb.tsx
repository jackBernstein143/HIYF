import * as React from "react"
import {
  Breadcrumb as BreadcrumbPrimitive,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"

/**
 * Breadcrumb — closed wrapper over shadcn's composable Breadcrumb parts.
 *
 * The raw parts accept arbitrary className and free-form children, letting
 * callers produce ad-hoc crumb shapes. This wrapper closes that down by
 * driving the trail from a typed `items` data model:
 *   - `items` is the only way to populate crumbs; no ad-hoc BreadcrumbItem
 *     imports needed (or possible) from consumer code.
 *   - The last item, or any item with `current: true`, renders as a
 *     non-interactive BreadcrumbPage; all others render as anchor links.
 *   - Separators are inserted automatically between items.
 *   - No `className` or `style` escape hatch on the public API.
 */

export interface BreadcrumbItemDef {
  /** Display text for the crumb. */
  label: string
  /**
   * Href for the crumb link. Omit (or leave undefined) for the current page
   * crumb — it will render as non-interactive text regardless of `current`.
   */
  href?: string
  /**
   * Explicitly marks this crumb as the current page. The last item in the
   * array is always treated as current even without this flag.
   */
  current?: boolean
}

export interface BreadcrumbProps {
  /** Ordered list of breadcrumb crumbs, left-to-right. */
  items: BreadcrumbItemDef[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  return (
    <BreadcrumbPrimitive>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isCurrent = isLast || item.current === true

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isCurrent ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </BreadcrumbPrimitive>
  )
}
