"use client"

import * as React from "react"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./ui/resizable"

/**
 * Resizable — closed wrapper over shadcn's react-resizable-panels primitives.
 *
 * The raw primitives accept arbitrary className, unconstrained panel nesting,
 * and manual handle placement. This wrapper closes the layout:
 *   - `panels` is the ordered list of panel contents; handles are inserted
 *     automatically between every adjacent pair of panels.
 *   - `direction` is enumerated ('horizontal' | 'vertical'); default is
 *     'horizontal'. Controls both panel arrangement and handle orientation.
 *   - `defaultSizes` maps percentage sizes to panels by index. When omitted,
 *     panels share space equally. Values should sum to 100.
 *   - No `className` or `style` escape hatch is exposed.
 *   - Need min/max constraints per panel? Add `minSize`/`maxSize` to a panel
 *     descriptor shape here.
 */

export interface ResizableProps {
  /** Ordered list of panel contents, one entry per resizable panel. */
  panels: React.ReactNode[]
  /**
   * Layout direction for the panel group.
   * @default 'horizontal'
   */
  direction?: "horizontal" | "vertical"
  /**
   * Initial percentage sizes for each panel, matching the `panels` array
   * by index. Values should sum to 100. Omit for equal distribution.
   */
  defaultSizes?: number[]
}

export function Resizable({
  panels,
  direction = "horizontal",
  defaultSizes,
}: ResizableProps) {
  return (
    <ResizablePanelGroup orientation={direction}>
      {panels.map((panel, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ResizableHandle withHandle />}
          <ResizablePanel defaultSize={defaultSizes?.[index]}>
            {panel}
          </ResizablePanel>
        </React.Fragment>
      ))}
    </ResizablePanelGroup>
  )
}
