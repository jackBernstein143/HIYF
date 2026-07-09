// ─── StyleX primitives (HIYF) ──────────────────────────────────────────────
export { Box } from './components/Box'
export type { BoxProps } from './components/Box'
export { Text } from './components/Text'
export type { TextColor, TextStyleProps, TextVariant } from './components/Text'
export { Grid } from './components/Grid'
export type { GridProps } from './components/Grid'
export { GridItem } from './components/GridItem'
export type { GridItemProps } from './components/GridItem'
export type { GridLine, GridPlacement } from './utils/grid'
export { createText } from './primitives/createText'

// ─── Icons (hugeicons — the system's icon set) ───────────────────────────────
// Glyphs are re-exported from '@jackbernnie/hiyf/icons'. Use <Icon> to render
// them; never add lucide or another icon library.
export { Icon } from './components/Icon'
export type { IconProps, IconSize, IconColor } from './components/Icon'

// ─── Closed wrappers (HIYF philosophy over the shadcn base) ─────────────────
// Intent-named, enumerated props; no className/style escape hatch. Each takes the
// canonical name; the raw shadcn version is intentionally NOT re-exported.

// Actions & inputs
export { Button } from './components/Button'
export type { ButtonProps, ButtonIntent, ButtonSize } from './components/Button'
export { ButtonGroup } from './components/ButtonGroup'
export type { ButtonGroupProps } from './components/ButtonGroup'
export { Input } from './components/Input'
export type { InputProps } from './components/Input'
export { InputGroup } from './components/InputGroup'
export type { InputGroupProps } from './components/InputGroup'
export { InputOTP } from './components/InputOTP'
export type { InputOTPProps } from './components/InputOTP'
export { Textarea } from './components/Textarea'
export type { TextareaProps } from './components/Textarea'
export { Select } from './components/Select'
export type { SelectProps, SelectOption } from './components/Select'
export { NativeSelect } from './components/NativeSelect'
export type { NativeSelectProps, NativeSelectOption } from './components/NativeSelect'
export { Combobox } from './components/Combobox'
export type { ComboboxProps, ComboboxOption } from './components/Combobox'
export { Checkbox } from './components/Checkbox'
export type { CheckboxProps } from './components/Checkbox'
export { Switch } from './components/Switch'
export type { SwitchProps } from './components/Switch'
export { Slider } from './components/Slider'
export type { SliderProps } from './components/Slider'
export { Toggle } from './components/Toggle'
export type { ToggleProps, ToggleSize } from './components/Toggle'
export { ToggleGroup } from './components/ToggleGroup'
export type { ToggleGroupProps, ToggleGroupOption, ToggleGroupSize } from './components/ToggleGroup'
export { RadioGroup, RadioGroupItem } from './components/RadioGroup'
export type { RadioGroupProps, RadioGroupItemProps } from './components/RadioGroup'
export { Label } from './components/Label'
export type { LabelProps } from './components/Label'
export { Field } from './components/Field'
export type { FieldProps } from './components/Field'

// Feedback & display
export { Status } from './components/Status'
export type { StatusColor, StatusProps } from './components/Status'
export { Badge } from './components/Badge'
export type { BadgeProps, BadgeTone } from './components/Badge'
export { Alert } from './components/Alert'
export type { AlertProps, AlertTone } from './components/Alert'
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/Card'
export type { CardProps } from './components/Card'
export { Progress } from './components/Progress'
export type { ProgressProps, ProgressTone } from './components/Progress'
export { Skeleton } from './components/Skeleton'
export type { SkeletonProps, SkeletonWidth, SkeletonHeight, SkeletonShape } from './components/Skeleton'
export { Spinner } from './components/Spinner'
export type { SpinnerProps } from './components/Spinner'
export { Avatar } from './components/Avatar'
export type { AvatarProps } from './components/Avatar'
export { Image } from './components/Image'
export type { ImageProps, ImageRadius, ImageFit } from './components/Image'
export { Kbd } from './components/Kbd'
export type { KbdProps } from './components/Kbd'
export { MapEmbed } from './components/MapEmbed'
export type { MapEmbedProps } from './components/MapEmbed'
export { Empty } from './components/Empty'
export type { EmptyProps } from './components/Empty'
export { Toaster } from './components/Toaster'
export type { ToasterProps } from './components/Toaster'

// Layout & data
export { Separator } from './components/Separator'
export type { SeparatorProps, SeparatorSpacing, SeparatorOrientation } from './components/Separator'
export { AspectRatio } from './components/AspectRatio'
export type { AspectRatioProps } from './components/AspectRatio'
export { ScrollArea } from './components/ScrollArea'
export type { ScrollAreaProps } from './components/ScrollArea'
export { Table } from './components/Table'
export type { TableProps, TableColumn, TableFilterOption, TableSort } from './components/Table'
export { Carousel } from './components/Carousel'
export type { CarouselProps } from './components/Carousel'

// Navigation & disclosure
export { Tabs } from './components/Tabs'
export type { TabsProps, TabItem } from './components/Tabs'
export { Accordion } from './components/Accordion'
export type { AccordionProps, AccordionItem } from './components/Accordion'
export { Collapsible } from './components/Collapsible'
export type { CollapsibleProps } from './components/Collapsible'
export { Breadcrumb } from './components/Breadcrumb'
export type { BreadcrumbProps, BreadcrumbItemDef } from './components/Breadcrumb'
export { Pagination } from './components/Pagination'
export type { PaginationProps } from './components/Pagination'

// Overlays
export { Dialog } from './components/Dialog'
export type { DialogProps } from './components/Dialog'
export { AlertDialog } from './components/AlertDialog'
export type { AlertDialogProps } from './components/AlertDialog'
export { Sheet } from './components/Sheet'
export type { SheetProps } from './components/Sheet'
export { Drawer } from './components/Drawer'
export type { DrawerProps } from './components/Drawer'
export { Popover } from './components/Popover'
export type { PopoverProps } from './components/Popover'
export { HoverCard } from './components/HoverCard'
export type { HoverCardProps } from './components/HoverCard'
export { Tooltip } from './components/Tooltip'
export type { TooltipProps } from './components/Tooltip'
export { DropdownMenu } from './components/DropdownMenu'
export type { DropdownMenuProps, DropdownMenuItem } from './components/DropdownMenu'
export { ContextMenu } from './components/ContextMenu'
export type { ContextMenuProps, ContextMenuItemDef } from './components/ContextMenu'
export { Command } from './components/Command'
export type { CommandProps, CommandGroup, CommandItemDef } from './components/Command'
export { NavigationMenu } from './components/NavigationMenu'
export type { NavigationMenuProps, NavItem } from './components/NavigationMenu'
export { Menubar } from './components/Menubar'
export type { MenubarProps, MenuDef, MenubarItemDef } from './components/Menubar'

// App shell & data viz
export { Sidebar } from './components/Sidebar'
export type {
  SidebarProps,
  SidebarNavGroup,
  SidebarNavItem,
  SidebarNavSubItem,
  SidebarBrand,
  SidebarUser,
  SidebarUserMenuItem,
} from './components/Sidebar'
export { Resizable } from './components/Resizable'
export type { ResizableProps } from './components/Resizable'
export { Chart } from './components/Chart'
export type { ChartProps } from './components/Chart'

// ─── Design tokens ──────────────────────────────────────────────────────────
export { animationDelays, animations } from './tokens/animations'
export type { AnimationDelay, AnimationEasing, AnimationName, AnimationProperties, AnimationToken } from './tokens/animations'
export type { DurationToken, EasingToken } from './tokens/tokens.stylex'
export type { TransitionProperty } from './utils/types'

// ─── Raw shadcn base (low-level utilities, not user-facing components) ───────
// direction (RTL provider) and item (a layout primitive used internally).
export * from './components/ui/direction'
export * from './components/ui/item'
