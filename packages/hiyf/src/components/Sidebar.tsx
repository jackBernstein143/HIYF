"use client"

import * as React from "react"
import {
  SidebarProvider,
  Sidebar as SidebarPrimitive,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
} from "./ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import { TooltipProvider } from "./ui/tooltip"

/**
 * Sidebar — closed app-shell wrapper over shadcn's Sidebar primitive family.
 *
 * Matches the shadcn "sidebar-07" behaviour from a typed data model:
 *   - `collapsible="icon"` — collapses to an icon rail (toggle via the trigger,
 *     the rail edge, or Cmd/Ctrl+B). Labels hide; icons + tooltips remain.
 *   - items take an `icon`, can be `active`, and may nest `items` to become a
 *     collapsible sub-menu (chevron expands an indented list).
 *   - optional `brand` header (icon + title + subtitle) and `user` footer
 *     (avatar + name + email), both of which also collapse to their icon.
 *   - `children` is the main inset content; it gets a header with the trigger.
 *   - No `className`/`style` escape hatch. Need badges or actions? Add typed
 *     fields to SidebarNavItem here.
 */

export interface SidebarNavSubItem {
  label: string
  active?: boolean
  onSelect?: () => void
}

export interface SidebarNavItem {
  label: string
  /** Leading icon (e.g. a lucide/hugeicons element). Shown in the icon rail. */
  icon?: React.ReactNode
  active?: boolean
  onSelect?: () => void
  /** Nested items turn this into a collapsible sub-menu. */
  items?: SidebarNavSubItem[]
  /** Whether the sub-menu starts expanded. */
  defaultOpen?: boolean
}

export interface SidebarNavGroup {
  label?: string
  items: SidebarNavItem[]
}

export interface SidebarBrand {
  icon?: React.ReactNode
  title: string
  subtitle?: string
}

export interface SidebarUser {
  name: string
  email?: string
  avatar?: React.ReactNode
}

export interface SidebarProps {
  groups: SidebarNavGroup[]
  brand?: SidebarBrand
  user?: SidebarUser
  children: React.ReactNode
}

// Plain CSS chevron — rotates when its collapsible parent is open. (The design
// system is exempt from the lockdown lint, so raw SVG here is fine.)
function Chevron() {
  return (
    <svg
      className="ml-auto size-4 shrink-0 text-sidebar-foreground/60 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function NavItem({ item }: { item: SidebarNavItem }) {
  if (item.items && item.items.length > 0) {
    return (
      <Collapsible
        asChild
        defaultOpen={item.defaultOpen ?? item.active}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.label} isActive={item.active}>
              {item.icon}
              <span>{item.label}</span>
              <Chevron />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items.map((sub) => (
                <SidebarMenuSubItem key={sub.label}>
                  <SidebarMenuSubButton
                    isActive={sub.active}
                    onClick={sub.onSelect}
                  >
                    <span>{sub.label}</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={item.label}
        isActive={item.active}
        onClick={item.onSelect}
      >
        {item.icon}
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function Sidebar({ groups, brand, user, children }: SidebarProps) {
  return (
    // The icon-rail tooltips on SidebarMenuButton need a TooltipProvider; this
    // shadcn build's SidebarProvider doesn't include one, so we add it.
    <TooltipProvider delayDuration={0}>
    {/* `h-full min-h-0` overrides the provider's default `min-h-svh` so the
        shell fills its parent container instead of the whole viewport — the
        consumer controls height (full-page: wrap in an h-svh root). */}
    <SidebarProvider className="h-full min-h-0">
      <SidebarPrimitive collapsible="icon">
        {brand && (
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  {brand.icon && (
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      {brand.icon}
                    </div>
                  )}
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{brand.title}</span>
                    {brand.subtitle && (
                      <span className="truncate text-xs text-sidebar-foreground/70">
                        {brand.subtitle}
                      </span>
                    )}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
        )}

        <SidebarContent>
          {groups.map((group, groupIndex) => (
            <SidebarGroup key={groupIndex}>
              {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
              <SidebarMenu>
                {group.items.map((item) => (
                  <NavItem key={item.label} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>

        {user && (
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  {user.avatar && (
                    <div className="size-8 shrink-0 overflow-hidden rounded-lg">
                      {user.avatar}
                    </div>
                  )}
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    {user.email && (
                      <span className="truncate text-xs text-sidebar-foreground/70">
                        {user.email}
                      </span>
                    )}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        )}

        <SidebarRail />
      </SidebarPrimitive>

      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
    </TooltipProvider>
  )
}
