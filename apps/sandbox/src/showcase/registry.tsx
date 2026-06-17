import { useState } from 'react'
import type { FC } from 'react'
import {
  // Primitives
  Box,
  Text,
  // Actions
  Button,
  ButtonGroup,
  Toggle,
  ToggleGroup,
  DropdownMenu,
  ContextMenu,
  // Forms
  Input,
  InputGroup,
  InputOTP,
  Textarea,
  Select,
  NativeSelect,
  Combobox,
  Checkbox,
  Switch,
  Slider,
  RadioGroup,
  RadioGroupItem,
  Label,
  Field,
  // Feedback
  Status,
  Badge,
  Alert,
  Progress,
  Skeleton,
  Spinner,
  Empty,
  Toaster,
  // Display
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Avatar,
  Kbd,
  Separator,
  AspectRatio,
  ScrollArea,
  Table,
  Carousel,
  // Navigation
  Tabs,
  Accordion,
  Collapsible,
  Breadcrumb,
  Pagination,
  Command,
  NavigationMenu,
  Menubar,
  // App shell & data viz
  Sidebar,
  Resizable,
  Chart,
  // Overlays
  Dialog,
  AlertDialog,
  Sheet,
  Drawer,
  Popover,
  HoverCard,
  Tooltip,
} from '@jackbernnie/hiyf'
import { toast } from 'sonner'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  DashboardSquare01Icon,
  CommandLineIcon,
  AiBrain01Icon,
  BookOpen01Icon,
  Settings02Icon,
} from '@hugeicons/core-free-icons'

// hugeicons is the project's icon package (chosen by the radix-vega preset and
// used inside the design system). Render any icon via <HugeiconsIcon icon={…} />.
const icon = (i: typeof DashboardSquare01Icon, size = 16) => (
  <HugeiconsIcon icon={i} size={size} />
)

export type Category =
  | 'Primitives'
  | 'Actions'
  | 'Forms'
  | 'Feedback'
  | 'Display'
  | 'Navigation'
  | 'Overlays'

export type Demo = { title?: string; Render: FC; code: string }
export type Entry = {
  name: string
  category: Category
  description: string
  demos: Demo[]
}

export const categories: Category[] = [
  'Primitives',
  'Actions',
  'Forms',
  'Feedback',
  'Display',
  'Navigation',
  'Overlays',
]

// ─── Primitives ───────────────────────────────────────────────────────────────

const BoxDemo: FC = () => (
  <Box flexDirection="column" gap="m">
    <Box gap="s" padding="s" backgroundColor="background-card" borderRadius="m">
      <Box padding="s" backgroundColor="background-card" borderRadius="s">
        <Text variant="label">Item A</Text>
      </Box>
      <Box padding="s" backgroundColor="background-card" borderRadius="s">
        <Text variant="label">Item B</Text>
      </Box>
      <Box padding="s" backgroundColor="background-card" borderRadius="s">
        <Text variant="label">Item C</Text>
      </Box>
    </Box>
    <Box flexDirection="column" gap="xs" padding="s" backgroundColor="background-card" borderRadius="m">
      <Text variant="label" color="muted">Vertical stack</Text>
      <Text variant="caption">Row one</Text>
      <Text variant="caption">Row two</Text>
    </Box>
  </Box>
)

const TextDemo: FC = () => (
  <Box flexDirection="column" gap="s" className="w-full max-w-sm">
    <Text variant="heading-m">Heading M</Text>
    <Text variant="heading-s">Heading S</Text>
    <Text variant="heading-xs">Heading XS</Text>
    <Text variant="body">Body — the quick brown fox jumps over the lazy dog.</Text>
    <Text variant="default">Default — smaller supporting text.</Text>
    <Text variant="label" color="muted">Label muted</Text>
    <Text variant="caption" color="accent">Caption accent</Text>
    <Text variant="caption" color="success">Caption success</Text>
    <Text variant="caption" color="warning">Caption warning</Text>
    <Text variant="caption" color="danger">Caption danger</Text>
  </Box>
)

// ─── Actions ─────────────────────────────────────────────────────────────────

const ButtonDemo: FC = () => (
  <Box gap="s" className="flex-wrap items-center">
    <Button intent="primary">Primary</Button>
    <Button intent="secondary">Secondary</Button>
    <Button intent="outline">Outline</Button>
    <Button intent="ghost">Ghost</Button>
    <Button intent="danger">Danger</Button>
    <Button intent="primary" size="sm">Small</Button>
    <Button intent="primary" size="lg">Large</Button>
    <Button intent="primary" disabled>Disabled</Button>
  </Box>
)

const ButtonGroupDemo: FC = () => (
  <Box flexDirection="column" gap="m" className="items-start">
    <ButtonGroup orientation="horizontal">
      <Button intent="outline">Left</Button>
      <Button intent="outline">Center</Button>
      <Button intent="outline">Right</Button>
    </ButtonGroup>
    <ButtonGroup orientation="vertical">
      <Button intent="outline">Top</Button>
      <Button intent="outline">Middle</Button>
      <Button intent="outline">Bottom</Button>
    </ButtonGroup>
  </Box>
)

const ToggleDemo: FC = () => (
  <Box gap="s" className="items-center flex-wrap">
    <Toggle size="sm" defaultPressed={false}>Bold</Toggle>
    <Toggle size="md" defaultPressed={true}>Italic</Toggle>
    <Toggle size="lg">Underline</Toggle>
  </Box>
)

const ToggleGroupDemo: FC = () => (
  <Box flexDirection="column" gap="m" className="items-start">
    <ToggleGroup
      type="single"
      options={[
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ]}
      defaultValue="left"
    />
    <ToggleGroup
      type="multiple"
      options={[
        { value: 'bold', label: 'B' },
        { value: 'italic', label: 'I' },
        { value: 'underline', label: 'U' },
      ]}
      defaultValue={['bold']}
      size="sm"
    />
  </Box>
)

const DropdownMenuDemo: FC = () => (
  <DropdownMenu
    trigger={<Button intent="outline">Open Menu</Button>}
    label="Actions"
    items={[
      { label: 'Edit' },
      { label: 'Duplicate' },
      { label: 'Archive', separatorBefore: true },
      { label: 'Delete', tone: 'danger', separatorBefore: true },
    ]}
  />
)

const ContextMenuDemo: FC = () => (
  <ContextMenu
    trigger={
      <Box padding="m" backgroundColor="background-card" borderRadius="m" className="cursor-context-menu select-none">
        <Text variant="caption" color="muted">Right-click here</Text>
      </Box>
    }
    items={[
      { label: 'Copy' },
      { label: 'Paste' },
      { label: 'Delete', tone: 'danger', separatorBefore: true },
    ]}
  />
)

// ─── Forms ────────────────────────────────────────────────────────────────────

const InputDemo: FC = () => (
  <Box flexDirection="column" gap="s" className="w-full max-w-sm">
    <Input placeholder="Normal input" />
    <Input placeholder="Invalid input" invalid />
    <Input type="password" placeholder="Password" />
  </Box>
)

const InputGroupDemo: FC = () => (
  <Box flexDirection="column" gap="s" className="w-full max-w-sm">
    <InputGroup
      prefix={<Text variant="label" color="muted">$</Text>}
      placeholder="Amount"
      type="number"
    />
    <InputGroup
      suffix={<Text variant="label" color="muted">@example.com</Text>}
      placeholder="username"
    />
  </Box>
)

const InputOTPDemo: FC = () => {
  const [val, setVal] = useState('')
  return (
    <Box flexDirection="column" gap="s" className="items-center">
      <InputOTP length={6} value={val} onChange={setVal} />
      <Text variant="caption" color="muted">Value: {val || '—'}</Text>
    </Box>
  )
}

const TextareaDemo: FC = () => (
  <Box flexDirection="column" gap="s" className="w-full max-w-sm">
    <Textarea rows={3} placeholder="Write something…" />
    <Textarea rows={3} placeholder="Invalid state" invalid />
  </Box>
)

const SelectDemo: FC = () => (
  <Box flexDirection="column" gap="s" className="w-full max-w-sm">
    <Select
      options={[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'svelte', label: 'Svelte' },
      ]}
      placeholder="Pick a framework"
      defaultValue="react"
    />
    <Select
      options={[
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
      ]}
      placeholder="Size (sm trigger)"
      size="sm"
    />
  </Box>
)

const NativeSelectDemo: FC = () => (
  <Box flexDirection="column" gap="s" className="w-full max-w-sm">
    <NativeSelect
      options={[
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'mx', label: 'Mexico' },
      ]}
      placeholder="Select country"
    />
    <NativeSelect
      options={[{ value: 'a', label: 'Option A' }]}
      placeholder="Invalid"
      invalid
    />
  </Box>
)

const ComboboxDemo: FC = () => {
  const [val, setVal] = useState('')
  return (
    <Box className="w-full max-w-sm">
      <Combobox
        options={[
          { value: 'apple', label: 'Apple' },
          { value: 'banana', label: 'Banana' },
          { value: 'cherry', label: 'Cherry' },
          { value: 'date', label: 'Date' },
        ]}
        placeholder="Search fruits…"
        emptyText="No fruit found."
        value={val}
        onValueChange={setVal}
      />
    </Box>
  )
}

const CheckboxDemo: FC = () => (
  <Box flexDirection="column" gap="s">
    <Box gap="s" className="items-center">
      <Checkbox id="chk1" defaultChecked />
      <Label htmlFor="chk1">Checked by default</Label>
    </Box>
    <Box gap="s" className="items-center">
      <Checkbox id="chk2" />
      <Label htmlFor="chk2">Unchecked</Label>
    </Box>
    <Box gap="s" className="items-center">
      <Checkbox id="chk3" disabled defaultChecked />
      <Label htmlFor="chk3" muted>Disabled</Label>
    </Box>
  </Box>
)

const SwitchDemo: FC = () => (
  <Box flexDirection="column" gap="s">
    <Box gap="s" className="items-center">
      <Switch id="sw1" defaultChecked />
      <Label htmlFor="sw1">Enabled (md)</Label>
    </Box>
    <Box gap="s" className="items-center">
      <Switch id="sw2" size="sm" />
      <Label htmlFor="sw2">Off (sm)</Label>
    </Box>
    <Box gap="s" className="items-center">
      <Switch id="sw3" disabled />
      <Label htmlFor="sw3" muted>Disabled</Label>
    </Box>
  </Box>
)

const SliderDemo: FC = () => {
  const [val, setVal] = useState([40])
  return (
    <Box flexDirection="column" gap="s" className="w-full max-w-sm">
      <Slider defaultValue={[40]} max={100} step={5} onValueChange={setVal} />
      <Text variant="caption" color="muted">Value: {val[0]}</Text>
    </Box>
  )
}

const RadioGroupDemo: FC = () => (
  <Box flexDirection="column" gap="m">
    <RadioGroup defaultValue="b" orientation="vertical">
      <RadioGroupItem value="a" id="r1">Option A</RadioGroupItem>
      <RadioGroupItem value="b" id="r2">Option B</RadioGroupItem>
      <RadioGroupItem value="c" id="r3">Option C</RadioGroupItem>
    </RadioGroup>
    <RadioGroup defaultValue="x" orientation="horizontal">
      <RadioGroupItem value="x" id="r4">X</RadioGroupItem>
      <RadioGroupItem value="y" id="r5">Y</RadioGroupItem>
      <RadioGroupItem value="z" id="r6">Z</RadioGroupItem>
    </RadioGroup>
  </Box>
)

const LabelDemo: FC = () => (
  <Box flexDirection="column" gap="s">
    <Label htmlFor="lbl-demo">Email address</Label>
    <Input id="lbl-demo" type="email" placeholder="you@example.com" />
    <Label muted>Optional helper label</Label>
  </Box>
)

const FieldDemo: FC = () => (
  <Box flexDirection="column" gap="m" className="w-full max-w-sm">
    <Field label="Username" hint="Only letters and numbers." htmlFor="field-user">
      <Input id="field-user" placeholder="jsmith" />
    </Field>
    <Field label="Email" error="Must be a valid email." htmlFor="field-email">
      <Input id="field-email" type="email" placeholder="you@example.com" invalid />
    </Field>
  </Box>
)

// ─── Feedback ─────────────────────────────────────────────────────────────────

const StatusDemo: FC = () => (
  <Box gap="s" className="flex-wrap items-center">
    <Status color="neutral">Neutral</Status>
    <Status color="success">Success</Status>
    <Status color="warning">Warning</Status>
    <Status color="danger">Danger</Status>
    <Status color="info">Info</Status>
  </Box>
)

const BadgeDemo: FC = () => (
  <Box gap="s" className="flex-wrap items-center">
    <Badge tone="neutral">Neutral</Badge>
    <Badge tone="primary">Primary</Badge>
    <Badge tone="success">Success</Badge>
    <Badge tone="warning">Warning</Badge>
    <Badge tone="danger">Danger</Badge>
    <Badge tone="info">Info</Badge>
  </Box>
)

const AlertDemo: FC = () => (
  <Box flexDirection="column" gap="s" className="w-full max-w-lg">
    <Alert tone="info" title="Heads up">This is an informational alert.</Alert>
    <Alert tone="success" title="All good!">Your changes have been saved.</Alert>
    <Alert tone="warning" title="Watch out">This action may have side effects.</Alert>
    <Alert tone="danger" title="Error">Something went wrong. Please try again.</Alert>
    <Alert tone="neutral">A neutral message with no title.</Alert>
  </Box>
)

const ProgressDemo: FC = () => (
  <Box flexDirection="column" gap="m" className="w-full max-w-sm">
    <Box flexDirection="column" gap="xs">
      <Text variant="caption" color="muted">Neutral — 60%</Text>
      <Progress value={60} tone="neutral" />
    </Box>
    <Box flexDirection="column" gap="xs">
      <Text variant="caption" color="muted">Success — 85%</Text>
      <Progress value={85} tone="success" />
    </Box>
    <Box flexDirection="column" gap="xs">
      <Text variant="caption" color="muted">Danger — 30%</Text>
      <Progress value={30} tone="danger" />
    </Box>
  </Box>
)

const SkeletonDemo: FC = () => (
  <Box flexDirection="column" gap="s" className="w-full max-w-sm">
    <Skeleton width="full" height="sm" shape="line" />
    <Skeleton width="lg" height="sm" shape="line" />
    <Skeleton width="md" height="sm" shape="line" />
    <Box gap="s" className="items-center">
      <Skeleton width="xs" height="lg" shape="circle" />
      <Box flexDirection="column" gap="xs" className="flex-1">
        <Skeleton width="full" height="sm" shape="line" />
        <Skeleton width="md" height="sm" shape="line" />
      </Box>
    </Box>
    <Skeleton width="full" height="lg" shape="block" />
  </Box>
)

const SpinnerDemo: FC = () => (
  <Box gap="l" className="items-center">
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
  </Box>
)

const EmptyDemo: FC = () => (
  <Empty
    title="No results found"
    description="Try adjusting your search or filters to find what you're looking for."
    icon={<Text>🔍</Text>}
    action={<Button intent="outline" size="sm">Clear filters</Button>}
  />
)

const ToasterDemo: FC = () => (
  <Box flexDirection="column" gap="s" className="items-center">
    <Toaster position="bottom-right" />
    <Box gap="s" className="flex-wrap">
      <Button intent="outline" size="sm" onClick={() => toast.success('Saved successfully!')}>
        Success toast
      </Button>
      <Button intent="outline" size="sm" onClick={() => toast.error('Something went wrong')}>
        Error toast
      </Button>
      <Button intent="outline" size="sm" onClick={() => toast('New notification')}>
        Default toast
      </Button>
    </Box>
  </Box>
)

// ─── Display ─────────────────────────────────────────────────────────────────

const CardDemo: FC = () => (
  <Box className="w-full max-w-sm">
    <Card padding="md">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>A brief description of what this card contains.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text variant="body">This is the main content area of the card.</Text>
      </CardContent>
      <CardFooter>
        <Button intent="primary" size="sm">Action</Button>
        <Button intent="ghost" size="sm">Cancel</Button>
      </CardFooter>
    </Card>
  </Box>
)

const AvatarDemo: FC = () => (
  <Box gap="m" className="items-center">
    <Avatar fallback="SM" size="sm" />
    <Avatar fallback="MD" size="md" />
    <Avatar fallback="LG" size="lg" />
    <Avatar src="https://github.com/shadcn.png" alt="shadcn" fallback="CN" size="md" />
  </Box>
)

const KbdDemo: FC = () => (
  <Box flexDirection="column" gap="s">
    <Box gap="s" className="items-center">
      <Text variant="caption" color="muted">Save:</Text>
      <Kbd keys={['⌘', 'S']} />
    </Box>
    <Box gap="s" className="items-center">
      <Text variant="caption" color="muted">Copy:</Text>
      <Kbd keys={['⌘', 'C']} />
    </Box>
    <Box gap="s" className="items-center">
      <Text variant="caption" color="muted">Search:</Text>
      <Kbd keys={['⌘', 'K']} />
    </Box>
  </Box>
)

const SeparatorDemo: FC = () => (
  <Box flexDirection="column" className="w-full max-w-sm">
    <Text variant="label">Section A</Text>
    <Separator orientation="horizontal" spacing="sm" />
    <Text variant="label">Section B</Text>
    <Separator orientation="horizontal" spacing="md" />
    <Text variant="label">Section C</Text>
    <Separator orientation="horizontal" spacing="lg" />
    <Text variant="label">Section D</Text>
  </Box>
)

const AspectRatioDemo: FC = () => (
  <Box flexDirection="column" gap="s" className="w-full max-w-sm">
    <Text variant="caption" color="muted">16:9 video</Text>
    <AspectRatio ratio="video">
      <Box backgroundColor="background-card" borderRadius="m" className="size-full items-center justify-center">
        <Text variant="caption" color="muted">16 / 9</Text>
      </Box>
    </AspectRatio>
    <Text variant="caption" color="muted">1:1 square</Text>
    <AspectRatio ratio="square">
      <Box backgroundColor="background-card" borderRadius="m" className="size-full items-center justify-center">
        <Text variant="caption" color="muted">1 / 1</Text>
      </Box>
    </AspectRatio>
  </Box>
)

const ScrollAreaDemo: FC = () => (
  <Box className="w-full max-w-sm">
    <ScrollArea height="sm">
      <Box flexDirection="column" gap="xs">
        {Array.from({ length: 12 }, (_, i) => (
          <Box key={i} padding="s" backgroundColor="background-card" borderRadius="s">
            <Text variant="caption">List item {i + 1}</Text>
          </Box>
        ))}
      </Box>
    </ScrollArea>
  </Box>
)

type TableRow = { name: string; role: string; status: string }
const TABLE_DATA: TableRow[] = [
  { name: 'Alice', role: 'Engineer', status: 'Active' },
  { name: 'Bob', role: 'Designer', status: 'Inactive' },
  { name: 'Carol', role: 'PM', status: 'Active' },
]

const TableDemo: FC = () => (
  <Box className="w-full max-w-lg">
    <Table<TableRow>
      columns={[
        { key: 'name', header: 'Name' },
        { key: 'role', header: 'Role' },
        {
          key: 'status',
          header: 'Status',
          align: 'right',
          render: (row) => (
            <Status color={row.status === 'Active' ? 'success' : 'neutral'}>
              {row.status}
            </Status>
          ),
        },
      ]}
      data={TABLE_DATA}
      caption="Team members"
    />
  </Box>
)

const CarouselDemo: FC = () => (
  <Box className="w-full max-w-sm">
    <Carousel
      items={['Slide one', 'Slide two', 'Slide three'].map((label) => (
        <Box
          key={label}
          backgroundColor="background-card"
          borderRadius="m"
          padding="l"
          className="items-center justify-center min-h-32"
        >
          <Text variant="heading-xs" color="muted">{label}</Text>
        </Box>
      ))}
    />
  </Box>
)

// ─── Navigation ───────────────────────────────────────────────────────────────

const TabsDemo: FC = () => (
  <Box className="w-full max-w-md">
    <Tabs
      defaultValue="overview"
      tabs={[
        {
          value: 'overview',
          label: 'Overview',
          content: (
            <Box flexDirection="column" gap="s" padding="s">
              <Text variant="body">Overview content goes here.</Text>
            </Box>
          ),
        },
        {
          value: 'settings',
          label: 'Settings',
          content: (
            <Box flexDirection="column" gap="s" padding="s">
              <Text variant="body">Settings panel content.</Text>
            </Box>
          ),
        },
        {
          value: 'activity',
          label: 'Activity',
          content: (
            <Box flexDirection="column" gap="s" padding="s">
              <Text variant="body">Recent activity feed.</Text>
            </Box>
          ),
        },
      ]}
    />
  </Box>
)

const AccordionDemo: FC = () => (
  <Box className="w-full max-w-md">
    <Accordion
      type="single"
      collapsible
      defaultValue="item1"
      items={[
        {
          value: 'item1',
          trigger: 'What is HIYF UI?',
          content: (
            <Text variant="body">
              HIYF is a closed design system built on shadcn primitives, enforcing intent-named props with no className escape hatches.
            </Text>
          ),
        },
        {
          value: 'item2',
          trigger: 'Why no className prop?',
          content: (
            <Text variant="body">
              Removing className ensures every instance on screen is one of a finite, on-brand set of treatments — misuse is simply inexpressible.
            </Text>
          ),
        },
        {
          value: 'item3',
          trigger: 'How do I add a variant?',
          content: (
            <Text variant="body">
              Add a prop to the component wrapper — a deliberate, reviewable design-system change — rather than a one-off class.
            </Text>
          ),
        },
      ]}
    />
  </Box>
)

const CollapsibleDemo: FC = () => (
  <Box flexDirection="column" gap="s" className="w-full max-w-sm">
    <Collapsible
      trigger={<Button intent="outline" size="sm">Toggle details</Button>}
      defaultOpen
    >
      <Box flexDirection="column" gap="xs" padding="s" backgroundColor="background-card" borderRadius="m">
        <Text variant="body">This content is collapsible.</Text>
        <Text variant="caption" color="muted">Click the button above to toggle.</Text>
      </Box>
    </Collapsible>
  </Box>
)

const BreadcrumbDemo: FC = () => (
  <Breadcrumb
    items={[
      { label: 'Home', href: '/' },
      { label: 'Components', href: '/components' },
      { label: 'Breadcrumb', current: true },
    ]}
  />
)

const PaginationDemo: FC = () => {
  const [page, setPage] = useState(3)
  return (
    <Box flexDirection="column" gap="s" className="items-center">
      <Pagination page={page} total={10} onPageChange={setPage} siblingCount={1} />
      <Text variant="caption" color="muted">Page {page} of 10</Text>
    </Box>
  )
}

const CommandDemo: FC = () => (
  <Box className="w-full max-w-sm border border-border rounded-lg overflow-hidden">
    <Command
      placeholder="Search…"
      groups={[
        {
          heading: 'Suggestions',
          items: [
            { label: 'Calendar', shortcut: '⌘C' },
            { label: 'Search Docs', shortcut: '⌘D' },
          ],
        },
        {
          heading: 'Settings',
          items: [
            { label: 'Profile', shortcut: '⌘P' },
            { label: 'Billing', shortcut: '⌘B' },
            { label: 'Sign out' },
          ],
        },
      ]}
    />
  </Box>
)

// ─── Overlays ─────────────────────────────────────────────────────────────────

const DialogDemo: FC = () => (
  <Dialog
    trigger={<Button intent="outline">Open Dialog</Button>}
    title="Confirm your action"
    description="This operation cannot be undone. Please review before continuing."
    size="md"
    footer={
      <Box gap="s">
        <Button intent="primary" size="sm">Confirm</Button>
        <Button intent="ghost" size="sm">Cancel</Button>
      </Box>
    }
  >
    <Text variant="body">Dialog body content can include any HIYF components.</Text>
  </Dialog>
)

const AlertDialogDemo: FC = () => (
  <AlertDialog
    trigger={<Button intent="outline">Delete item</Button>}
    title="Delete this item?"
    description="This action is permanent and cannot be reversed. All associated data will be removed."
    tone="danger"
    confirmLabel="Yes, delete"
    cancelLabel="Keep it"
    onConfirm={() => toast.error('Item deleted')}
  />
)

const SheetDemo: FC = () => (
  <Box gap="s" className="flex-wrap">
    <Sheet
      trigger={<Button intent="outline">Right sheet</Button>}
      title="Right panel"
      description="Slides in from the right."
      side="right"
    >
      <Box flexDirection="column" gap="s" padding="m">
        <Text variant="body">Sheet body content.</Text>
      </Box>
    </Sheet>
    <Sheet
      trigger={<Button intent="outline">Bottom sheet</Button>}
      title="Bottom panel"
      side="bottom"
    >
      <Box flexDirection="column" gap="s" padding="m">
        <Text variant="body">Slides up from the bottom.</Text>
      </Box>
    </Sheet>
  </Box>
)

const DrawerDemo: FC = () => (
  <Drawer
    trigger={<Button intent="outline">Open Drawer</Button>}
    title="Drawer panel"
    description="A bottom-anchored sheet with a drag handle."
  >
    <Box flexDirection="column" gap="s" padding="m">
      <Text variant="body">Drawer body content.</Text>
    </Box>
  </Drawer>
)

const PopoverDemo: FC = () => (
  <Popover
    trigger={<Button intent="outline">Open Popover</Button>}
    side="bottom"
  >
    <Box flexDirection="column" gap="s" padding="s">
      <Text variant="label">Popover content</Text>
      <Text variant="caption" color="muted">This floats relative to the trigger.</Text>
    </Box>
  </Popover>
)

const HoverCardDemo: FC = () => (
  <HoverCard
    trigger={<Button intent="outline">Hover me</Button>}
    side="bottom"
  >
    <Box flexDirection="column" gap="xs" padding="s">
      <Text variant="label">Quick info card</Text>
      <Text variant="caption" color="muted">Appears on hover — no click required.</Text>
    </Box>
  </HoverCard>
)

const TooltipDemo: FC = () => (
  <Box gap="m" className="items-center flex-wrap">
    <Tooltip content="Tooltip on top" side="top">
      <Button intent="outline" size="sm">Top</Button>
    </Tooltip>
    <Tooltip content="Tooltip on right" side="right">
      <Button intent="outline" size="sm">Right</Button>
    </Tooltip>
    <Tooltip content="Tooltip on bottom" side="bottom">
      <Button intent="outline" size="sm">Bottom</Button>
    </Tooltip>
    <Tooltip content="Tooltip on left" side="left">
      <Button intent="outline" size="sm">Left</Button>
    </Tooltip>
  </Box>
)

// ─── Registry ────────────────────────────────────────────────────────────────

// ─── Navigation, app shell & data viz demos ──────────────────────────────────
const NavigationMenuDemo: FC = () => (
  <NavigationMenu
    items={[
      { label: 'Home', href: '#' },
      { label: 'Docs', href: '#' },
      {
        label: 'Products',
        content: (
          <Box flexDirection="column" gap="xs" className="w-56 p-3">
            <Text variant="label">Alpha</Text>
            <Text variant="caption" color="muted">Our flagship product</Text>
            <Text variant="label">Beta</Text>
            <Text variant="caption" color="muted">Now in early access</Text>
          </Box>
        ),
      },
      { label: 'About', href: '#' },
    ]}
  />
)

const MenubarDemo: FC = () => (
  <Menubar
    menus={[
      {
        label: 'File',
        items: [
          { label: 'New File', shortcut: '⌘N' },
          { label: 'Open…', shortcut: '⌘O' },
          { label: 'Save', shortcut: '⌘S', separatorBefore: true },
        ],
      },
      {
        label: 'Edit',
        items: [
          { label: 'Undo', shortcut: '⌘Z' },
          { label: 'Redo', shortcut: '⇧⌘Z' },
        ],
      },
      {
        label: 'View',
        items: [
          { label: 'Zoom In', shortcut: '⌘+' },
          { label: 'Zoom Out', shortcut: '⌘-' },
        ],
      },
    ]}
  />
)

const ResizableDemo: FC = () => (
  <Box className="h-64 w-full overflow-hidden rounded-lg border border-border">
    <Resizable
      direction="horizontal"
      defaultSizes={[35, 65]}
      panels={[
        <Box key="a" padding="m" flexDirection="column" gap="none" className="h-full bg-muted/40">
          <Text variant="label">Sidebar</Text>
          <Text variant="caption" color="muted">35%</Text>
        </Box>,
        <Box key="b" padding="m" flexDirection="column" gap="none" className="h-full">
          <Text variant="label">Main</Text>
          <Text variant="caption" color="muted">Drag the handle →</Text>
        </Box>,
      ]}
    />
  </Box>
)

const SidebarDemo: FC = () => (
  // `relative transform-gpu` makes this Box a containing block so the shadcn
  // Sidebar's fixed positioning stays inside the preview card.
  <Box className="relative h-96 w-full transform-gpu overflow-hidden rounded-lg border border-border">
    <Sidebar
      brand={{ icon: icon(DashboardSquare01Icon), title: 'Acme Inc', subtitle: 'Enterprise' }}
      user={{
        name: 'shadcn',
        email: 'm@example.com',
        avatar: <Avatar src="https://github.com/shadcn.png" alt="shadcn" fallback="CN" size="sm" />,
      }}
      groups={[
        {
          label: 'Platform',
          items: [
            {
              label: 'Playground',
              icon: icon(CommandLineIcon),
              active: true,
              defaultOpen: false,
              items: [{ label: 'History' }, { label: 'Starred' }, { label: 'Settings' }],
            },
            {
              label: 'Models',
              icon: icon(AiBrain01Icon),
              items: [{ label: 'Genesis' }, { label: 'Explorer' }],
            },
            {
              label: 'Documentation',
              icon: icon(BookOpen01Icon),
              items: [{ label: 'Introduction' }, { label: 'Get Started' }],
            },
            {
              label: 'Settings',
              icon: icon(Settings02Icon),
              items: [{ label: 'General' }, { label: 'Team' }],
            },
          ],
        },
      ]}
    >
      <Box padding="l" flexDirection="column" gap="s">
        <Text variant="heading-xs">Dashboard</Text>
        <Text color="muted">
          Toggle the sidebar with the trigger (or the rail edge) — it collapses to an icon rail.
        </Text>
      </Box>
    </Sidebar>
  </Box>
)

const chartData = [
  { month: 'Jan', revenue: 4200, expenses: 2800 },
  { month: 'Feb', revenue: 5800, expenses: 3100 },
  { month: 'Mar', revenue: 4900, expenses: 2600 },
  { month: 'Apr', revenue: 7200, expenses: 3400 },
  { month: 'May', revenue: 6100, expenses: 3000 },
  { month: 'Jun', revenue: 8400, expenses: 3800 },
]
const ChartDemo: FC = () => (
  <Box className="w-full">
    <Chart type="bar" data={chartData} index="month" categories={['revenue', 'expenses']} height="md" />
  </Box>
)

export const registry: Entry[] = [
  // ── Primitives ──
  {
    name: 'Box',
    category: 'Primitives',
    description:
      'Flex container primitive. Defaults to flex-row; pass flexDirection="column" for vertical stacks. Supports gap, padding, backgroundColor, and borderRadius tokens, plus a className for standard Tailwind utilities.',
    demos: [
      {
        title: 'Layout and nesting',
        Render: BoxDemo,
        code: `<Box flexDirection="column" gap="m">
  <Box gap="s" padding="s" backgroundColor="background-card" borderRadius="m">
    <Box padding="s" backgroundColor="background-card" borderRadius="s">
      <Text variant="label">Item A</Text>
    </Box>
    <Box padding="s" backgroundColor="background-card" borderRadius="s">
      <Text variant="label">Item B</Text>
    </Box>
  </Box>
</Box>`,
      },
    ],
  },
  {
    name: 'Text',
    category: 'Primitives',
    description:
      'Typography primitive with enumerated variants (heading-m, heading-s, heading-xs, body, default, label, caption) and semantic colors (default, muted, accent, success, warning, danger). Renders a semantically appropriate tag per variant.',
    demos: [
      {
        title: 'Variants and colors',
        Render: TextDemo,
        code: `<Text variant="heading-m">Heading M</Text>
<Text variant="body">Body text.</Text>
<Text variant="caption" color="muted">Caption muted</Text>
<Text variant="caption" color="accent">Caption accent</Text>`,
      },
    ],
  },

  // ── Actions ──
  {
    name: 'Button',
    category: 'Actions',
    description:
      'Closed button with intent-named styles (primary, secondary, outline, ghost, danger) and three sizes (sm, md, lg). No className or style escape hatch.',
    demos: [
      {
        title: 'Intents and sizes',
        Render: ButtonDemo,
        code: `<Button intent="primary">Primary</Button>
<Button intent="secondary">Secondary</Button>
<Button intent="outline">Outline</Button>
<Button intent="ghost">Ghost</Button>
<Button intent="danger">Danger</Button>
<Button intent="primary" size="sm">Small</Button>
<Button intent="primary" size="lg">Large</Button>
<Button intent="primary" disabled>Disabled</Button>`,
      },
    ],
  },
  {
    name: 'ButtonGroup',
    category: 'Actions',
    description:
      'Joins multiple Button elements into a visually connected strip. Supports horizontal and vertical orientations.',
    demos: [
      {
        title: 'Horizontal and vertical',
        Render: ButtonGroupDemo,
        code: `<ButtonGroup orientation="horizontal">
  <Button intent="outline">Left</Button>
  <Button intent="outline">Center</Button>
  <Button intent="outline">Right</Button>
</ButtonGroup>`,
      },
    ],
  },
  {
    name: 'Toggle',
    category: 'Actions',
    description:
      'A single press-to-activate toggle button. Supports controlled/uncontrolled pressed state and three sizes.',
    demos: [
      {
        title: 'Sizes and default state',
        Render: ToggleDemo,
        code: `<Toggle size="sm" defaultPressed={false}>Bold</Toggle>
<Toggle size="md" defaultPressed={true}>Italic</Toggle>
<Toggle size="lg">Underline</Toggle>`,
      },
    ],
  },
  {
    name: 'ToggleGroup',
    category: 'Actions',
    description:
      'A group of related toggle buttons driven from an options array. Supports single and multiple selection modes.',
    demos: [
      {
        title: 'Single and multiple',
        Render: ToggleGroupDemo,
        code: `<ToggleGroup
  type="single"
  options={[
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ]}
  defaultValue="left"
/>`,
      },
    ],
  },
  {
    name: 'DropdownMenu',
    category: 'Actions',
    description:
      'Floating menu triggered by any element. Items are driven from a typed array with label, onSelect, tone (danger), and separatorBefore.',
    demos: [
      {
        title: 'With label and danger item',
        Render: DropdownMenuDemo,
        code: `<DropdownMenu
  trigger={<Button intent="outline">Open Menu</Button>}
  label="Actions"
  items={[
    { label: 'Edit' },
    { label: 'Duplicate' },
    { label: 'Delete', tone: 'danger', separatorBefore: true },
  ]}
/>`,
      },
    ],
  },
  {
    name: 'ContextMenu',
    category: 'Actions',
    description:
      'Right-click context menu. Items share the same shape as DropdownMenu. The trigger is the right-click target area.',
    demos: [
      {
        title: 'Right-click area',
        Render: ContextMenuDemo,
        code: `<ContextMenu
  trigger={<Box padding="m" backgroundColor="background-card" borderRadius="m">
    <Text variant="caption" color="muted">Right-click here</Text>
  </Box>}
  items={[
    { label: 'Copy' },
    { label: 'Paste' },
    { label: 'Delete', tone: 'danger', separatorBefore: true },
  ]}
/>`,
      },
    ],
  },

  // ── Forms ──
  {
    name: 'Input',
    category: 'Forms',
    description:
      'Text input field. The only visual variation is invalid (error ring). All standard input behaviour props (type, placeholder, value, onChange, disabled) pass through.',
    demos: [
      {
        title: 'Default and invalid',
        Render: InputDemo,
        code: `<Input placeholder="Normal input" />
<Input placeholder="Invalid input" invalid />
<Input type="password" placeholder="Password" />`,
      },
    ],
  },
  {
    name: 'InputGroup',
    category: 'Forms',
    description:
      'Wraps an input with optional leading (prefix) and/or trailing (suffix) addons — useful for currency symbols, domain suffixes, or inline icons.',
    demos: [
      {
        title: 'Prefix and suffix',
        Render: InputGroupDemo,
        code: `<InputGroup prefix="$" placeholder="Amount" type="number" />
<InputGroup suffix="@example.com" placeholder="username" />`,
      },
    ],
  },
  {
    name: 'InputOTP',
    category: 'Forms',
    description:
      'One-time password input rendered as a row of individual digit slots. Controlled via value/onChange.',
    demos: [
      {
        title: '6-digit OTP',
        Render: InputOTPDemo,
        code: `const [val, setVal] = useState('')
<InputOTP length={6} value={val} onChange={setVal} />`,
      },
    ],
  },
  {
    name: 'Textarea',
    category: 'Forms',
    description:
      'Multi-line text area. Supports rows for fixed height and invalid for the error ring. Auto-grows to content when rows is omitted.',
    demos: [
      {
        title: 'Default and invalid',
        Render: TextareaDemo,
        code: `<Textarea rows={3} placeholder="Write something…" />
<Textarea rows={3} placeholder="Invalid state" invalid />`,
      },
    ],
  },
  {
    name: 'Select',
    category: 'Forms',
    description:
      'Styled dropdown driven from an options array. Supports sm and md trigger sizes, placeholder, controlled and uncontrolled modes.',
    demos: [
      {
        title: 'Options and sizes',
        Render: SelectDemo,
        code: `<Select
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]}
  placeholder="Pick a framework"
  defaultValue="react"
/>`,
      },
    ],
  },
  {
    name: 'NativeSelect',
    category: 'Forms',
    description:
      'Native browser <select> element styled to match the design system. Useful when a custom dropdown is not needed or for mobile UX.',
    demos: [
      {
        title: 'Default and invalid',
        Render: NativeSelectDemo,
        code: `<NativeSelect
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
  ]}
  placeholder="Select country"
/>`,
      },
    ],
  },
  {
    name: 'Combobox',
    category: 'Forms',
    description:
      'Searchable select with live filtering. The trigger input doubles as the search field. Supports controlled value and empty-state copy.',
    demos: [
      {
        title: 'Searchable fruit picker',
        Render: ComboboxDemo,
        code: `<Combobox
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ]}
  placeholder="Search fruits…"
  emptyText="No fruit found."
  value={val}
  onValueChange={setVal}
/>`,
      },
    ],
  },
  {
    name: 'Checkbox',
    category: 'Forms',
    description:
      'Binary checkbox. Supports controlled and uncontrolled checked state, disabled, and an id for label association.',
    demos: [
      {
        title: 'Checked, unchecked, disabled',
        Render: CheckboxDemo,
        code: `<Checkbox id="chk1" defaultChecked />
<Label htmlFor="chk1">Checked by default</Label>

<Checkbox id="chk2" />
<Label htmlFor="chk2">Unchecked</Label>`,
      },
    ],
  },
  {
    name: 'Switch',
    category: 'Forms',
    description:
      'Toggle switch in sm and md sizes. Supports controlled and uncontrolled checked state with optional id for label association.',
    demos: [
      {
        title: 'Sizes and states',
        Render: SwitchDemo,
        code: `<Switch id="sw1" defaultChecked />
<Label htmlFor="sw1">Enabled (md)</Label>

<Switch id="sw2" size="sm" />
<Label htmlFor="sw2">Off (sm)</Label>`,
      },
    ],
  },
  {
    name: 'Slider',
    category: 'Forms',
    description:
      'Range slider supporting single and multi-thumb modes via the defaultValue array. Configurable min, max, and step.',
    demos: [
      {
        title: 'Controlled slider',
        Render: SliderDemo,
        code: `<Slider defaultValue={[40]} max={100} step={5} onValueChange={setVal} />`,
      },
    ],
  },
  {
    name: 'RadioGroup',
    category: 'Forms',
    description:
      'A group of mutually exclusive radio buttons composed with RadioGroupItem. Supports vertical and horizontal orientation.',
    demos: [
      {
        title: 'Vertical and horizontal',
        Render: RadioGroupDemo,
        code: `<RadioGroup defaultValue="b" orientation="vertical">
  <RadioGroupItem value="a" id="r1">Option A</RadioGroupItem>
  <RadioGroupItem value="b" id="r2">Option B</RadioGroupItem>
</RadioGroup>`,
      },
    ],
  },
  {
    name: 'Label',
    category: 'Forms',
    description:
      'Form field label. Pairs with htmlFor to associate with a control. The muted variant renders in secondary colour for optional/helper contexts.',
    demos: [
      {
        title: 'Label with input',
        Render: LabelDemo,
        code: `<Label htmlFor="email">Email address</Label>
<Input id="email" type="email" placeholder="you@example.com" />
<Label muted>Optional helper</Label>`,
      },
    ],
  },
  {
    name: 'Field',
    category: 'Forms',
    description:
      'Composable form field wrapper that wires together label, control, hint text, and error message in the correct semantic structure.',
    demos: [
      {
        title: 'With hint and error',
        Render: FieldDemo,
        code: `<Field label="Username" hint="Letters and numbers only." htmlFor="user">
  <Input id="user" placeholder="jsmith" />
</Field>
<Field label="Email" error="Must be a valid email." htmlFor="email">
  <Input id="email" type="email" invalid />
</Field>`,
      },
    ],
  },

  // ── Feedback ──
  {
    name: 'Status',
    category: 'Feedback',
    description:
      'Compact status chip with an intent-named color (neutral, success, warning, danger, info). Used for state labels on records or list items.',
    demos: [
      {
        title: 'All colors',
        Render: StatusDemo,
        code: `<Status color="neutral">Neutral</Status>
<Status color="success">Success</Status>
<Status color="warning">Warning</Status>
<Status color="danger">Danger</Status>
<Status color="info">Info</Status>`,
      },
    ],
  },
  {
    name: 'Badge',
    category: 'Feedback',
    description:
      'Compact categorical tag with intent-named tones (neutral, primary, success, warning, danger, info). Used for counts, labels, and categories.',
    demos: [
      {
        title: 'All tones',
        Render: BadgeDemo,
        code: `<Badge tone="neutral">Neutral</Badge>
<Badge tone="primary">Primary</Badge>
<Badge tone="success">Success</Badge>
<Badge tone="warning">Warning</Badge>
<Badge tone="danger">Danger</Badge>
<Badge tone="info">Info</Badge>`,
      },
    ],
  },
  {
    name: 'Alert',
    category: 'Feedback',
    description:
      'Inline alert banner with a colored left border communicating the tone (neutral, info, success, warning, danger). Supports an optional title.',
    demos: [
      {
        title: 'All tones',
        Render: AlertDemo,
        code: `<Alert tone="info" title="Heads up">Informational alert.</Alert>
<Alert tone="success" title="All good!">Changes saved.</Alert>
<Alert tone="warning" title="Watch out">Side effects may occur.</Alert>
<Alert tone="danger" title="Error">Something went wrong.</Alert>`,
      },
    ],
  },
  {
    name: 'Progress',
    category: 'Feedback',
    description:
      'Horizontal progress bar with intent-named tones (neutral, success, danger). Value is clamped to 0–100.',
    demos: [
      {
        title: 'All tones',
        Render: ProgressDemo,
        code: `<Progress value={60} tone="neutral" />
<Progress value={85} tone="success" />
<Progress value={30} tone="danger" />`,
      },
    ],
  },
  {
    name: 'Skeleton',
    category: 'Feedback',
    description:
      'Animated loading placeholder with enumerated width (xs, sm, md, lg, full), height, and shape (line, circle, block) tokens.',
    demos: [
      {
        title: 'Lines, circle, block',
        Render: SkeletonDemo,
        code: `<Skeleton width="full" height="sm" shape="line" />
<Skeleton width="xs" height="lg" shape="circle" />
<Skeleton width="full" height="lg" shape="block" />`,
      },
    ],
  },
  {
    name: 'Spinner',
    category: 'Feedback',
    description:
      'Indeterminate loading indicator in three enumerated sizes (sm, md, lg). Drop it inline next to text or center it in a container.',
    demos: [
      {
        title: 'Small, medium, large',
        Render: SpinnerDemo,
        code: `<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`,
      },
    ],
  },
  {
    name: 'Empty',
    category: 'Feedback',
    description:
      'Structured empty-state with a required title, optional description, optional icon node, and optional action element.',
    demos: [
      {
        title: 'With icon and action',
        Render: EmptyDemo,
        code: `<Empty
  title="No results found"
  description="Try adjusting your search or filters."
  icon={<Text>🔍</Text>}
  action={<Button intent="outline" size="sm">Clear filters</Button>}
/>`,
      },
    ],
  },
  {
    name: 'Toaster',
    category: 'Feedback',
    description:
      'Mount the Toaster once near the root of your app. Trigger toasts by calling toast() from the sonner package — richColors is always enabled.',
    demos: [
      {
        title: 'Success, error, default',
        Render: ToasterDemo,
        code: `// Place once near your app root:
<Toaster position="bottom-right" />

// Then anywhere in your app:
toast.success('Saved successfully!')
toast.error('Something went wrong')
toast('New notification')`,
      },
    ],
  },

  // ── Display ──
  {
    name: 'Card',
    category: 'Display',
    description:
      'Composable content container with enumerated padding (sm, md, lg) and sub-parts: CardHeader, CardTitle, CardDescription, CardContent, CardFooter.',
    demos: [
      {
        title: 'Full composition',
        Render: CardDemo,
        code: `<Card padding="md">
  <CardHeader>
    <CardTitle>Card title</CardTitle>
    <CardDescription>Brief description.</CardDescription>
  </CardHeader>
  <CardContent>
    <Text variant="body">Main content.</Text>
  </CardContent>
  <CardFooter>
    <Button intent="primary" size="sm">Action</Button>
  </CardFooter>
</Card>`,
      },
    ],
  },
  {
    name: 'Avatar',
    category: 'Display',
    description:
      'Circular avatar in three sizes (sm, md, lg). Shows an image when src is provided and falls back to initials text automatically.',
    demos: [
      {
        title: 'Sizes and image fallback',
        Render: AvatarDemo,
        code: `<Avatar fallback="SM" size="sm" />
<Avatar fallback="MD" size="md" />
<Avatar fallback="LG" size="lg" />
<Avatar src="https://github.com/shadcn.png" fallback="CN" size="md" />`,
      },
    ],
  },
  {
    name: 'Kbd',
    category: 'Display',
    description:
      'Keyboard shortcut display. Pass a keys array to render multiple adjacent key chips, or use children for a single raw key.',
    demos: [
      {
        title: 'Multi-key shortcuts',
        Render: KbdDemo,
        code: `<Kbd keys={['⌘', 'S']} />
<Kbd keys={['⌘', 'C']} />
<Kbd keys={['⌘', 'K']} />`,
      },
    ],
  },
  {
    name: 'Separator',
    category: 'Display',
    description:
      'Horizontal or vertical rule with enumerated spacing tokens (sm, md, lg) controlling the surrounding margin.',
    demos: [
      {
        title: 'Spacing variants',
        Render: SeparatorDemo,
        code: `<Separator orientation="horizontal" spacing="sm" />
<Separator orientation="horizontal" spacing="md" />
<Separator orientation="horizontal" spacing="lg" />`,
      },
    ],
  },
  {
    name: 'AspectRatio',
    category: 'Display',
    description:
      'Constrains content to a named aspect ratio: square (1:1), video (16:9), wide (21:9), or portrait (3:4).',
    demos: [
      {
        title: 'Video and square',
        Render: AspectRatioDemo,
        code: `<AspectRatio ratio="video">
  <Box backgroundColor="background-card" borderRadius="m" className="size-full items-center justify-center">
    <Text variant="caption" color="muted">16 / 9</Text>
  </Box>
</AspectRatio>`,
      },
    ],
  },
  {
    name: 'ScrollArea',
    category: 'Display',
    description:
      'Overflow container with a styled scrollbar and enumerated max-height tokens (sm, md, lg). Replaces raw overflow-y-auto.',
    demos: [
      {
        title: 'Scrollable list',
        Render: ScrollAreaDemo,
        code: `<ScrollArea height="sm">
  {items.map((i) => (
    <Box key={i} padding="s" backgroundColor="background-card" borderRadius="s">
      <Text variant="caption">Item {i}</Text>
    </Box>
  ))}
</ScrollArea>`,
      },
    ],
  },
  {
    name: 'Table',
    category: 'Display',
    description:
      'Generic data table driven from a columns descriptor array and a typed data array. Supports custom cell renderers, alignment, and a caption.',
    demos: [
      {
        title: 'Team roster with custom render',
        Render: TableDemo,
        code: `<Table
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    {
      key: 'status',
      header: 'Status',
      align: 'right',
      render: (row) => <Status color={row.status === 'Active' ? 'success' : 'neutral'}>{row.status}</Status>,
    },
  ]}
  data={data}
  caption="Team members"
/>`,
      },
    ],
  },
  {
    name: 'Carousel',
    category: 'Display',
    description:
      'Embla-powered slide carousel. Pass any React nodes as items. Supports horizontal (default) and vertical orientations with built-in prev/next controls.',
    demos: [
      {
        title: 'Horizontal slides',
        Render: CarouselDemo,
        code: `<Carousel
  items={['Slide one', 'Slide two', 'Slide three'].map((label) => (
    <Box key={label} padding="l" backgroundColor="background-card" borderRadius="m">
      <Text variant="heading-xs" color="muted">{label}</Text>
    </Box>
  ))}
/>`,
      },
    ],
  },

  // ── Navigation ──
  {
    name: 'Tabs',
    category: 'Navigation',
    description:
      'Tabbed navigation driven from a typed tabs array (value, label, content). Supports controlled and uncontrolled selected tab.',
    demos: [
      {
        title: 'Three tabs',
        Render: TabsDemo,
        code: `<Tabs
  defaultValue="overview"
  tabs={[
    { value: 'overview', label: 'Overview', content: <Text>Overview</Text> },
    { value: 'settings', label: 'Settings', content: <Text>Settings</Text> },
    { value: 'activity', label: 'Activity', content: <Text>Activity</Text> },
  ]}
/>`,
      },
    ],
  },
  {
    name: 'Accordion',
    category: 'Navigation',
    description:
      'Vertically stacked collapsible panels driven from an items array. Supports single and multiple open modes, and collapsible.',
    demos: [
      {
        title: 'Single collapsible',
        Render: AccordionDemo,
        code: `<Accordion
  type="single"
  collapsible
  defaultValue="item1"
  items={[
    { value: 'item1', trigger: 'What is HIYF?', content: <Text>HIYF is …</Text> },
    { value: 'item2', trigger: 'Why no className?', content: <Text>Closed API …</Text> },
  ]}
/>`,
      },
    ],
  },
  {
    name: 'Collapsible',
    category: 'Navigation',
    description:
      'Single toggle-able content area with a trigger element. Supports controlled open state and defaultOpen for uncontrolled usage.',
    demos: [
      {
        title: 'Default open',
        Render: CollapsibleDemo,
        code: `<Collapsible
  trigger={<Button intent="outline" size="sm">Toggle details</Button>}
  defaultOpen
>
  <Box padding="s" backgroundColor="background-card" borderRadius="m">
    <Text variant="body">Collapsible content.</Text>
  </Box>
</Collapsible>`,
      },
    ],
  },
  {
    name: 'Breadcrumb',
    category: 'Navigation',
    description:
      'Path trail driven from a typed items array. The last item (or any marked current) renders as non-interactive text; others render as links.',
    demos: [
      {
        title: 'Three-level path',
        Render: BreadcrumbDemo,
        code: `<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumb', current: true },
  ]}
/>`,
      },
    ],
  },
  {
    name: 'Pagination',
    category: 'Navigation',
    description:
      'Page navigation control. Driven by page, total, and onPageChange. Renders ellipses automatically based on siblingCount.',
    demos: [
      {
        title: 'Controlled pagination',
        Render: PaginationDemo,
        code: `const [page, setPage] = useState(3)
<Pagination page={page} total={10} onPageChange={setPage} siblingCount={1} />`,
      },
    ],
  },
  {
    name: 'Command',
    category: 'Navigation',
    description:
      'Keyboard-driven command palette with live search. Groups and items are driven from a typed data model. Each item supports an optional shortcut label.',
    demos: [
      {
        title: 'Two groups with shortcuts',
        Render: CommandDemo,
        code: `<Command
  placeholder="Search…"
  groups={[
    {
      heading: 'Suggestions',
      items: [
        { label: 'Calendar', shortcut: '⌘C' },
        { label: 'Search Docs', shortcut: '⌘D' },
      ],
    },
    {
      heading: 'Settings',
      items: [{ label: 'Profile', shortcut: '⌘P' }],
    },
  ]}
/>`,
      },
    ],
  },

  // ── Overlays ──
  {
    name: 'Dialog',
    category: 'Overlays',
    description:
      'Modal dialog with typed trigger, title, description, body, and footer slots. Width is controlled by the enumerated size prop (sm, md, lg).',
    demos: [
      {
        title: 'With footer actions',
        Render: DialogDemo,
        code: `<Dialog
  trigger={<Button intent="outline">Open Dialog</Button>}
  title="Confirm your action"
  description="This operation cannot be undone."
  size="md"
  footer={
    <Box gap="s">
      <Button intent="primary" size="sm">Confirm</Button>
      <Button intent="ghost" size="sm">Cancel</Button>
    </Box>
  }
>
  <Text variant="body">Dialog body content.</Text>
</Dialog>`,
      },
    ],
  },
  {
    name: 'AlertDialog',
    category: 'Overlays',
    description:
      'Two-button confirmation dialog. The confirm action\'s visual treatment is set via tone (default or danger). Calls onConfirm when confirmed.',
    demos: [
      {
        title: 'Danger confirmation',
        Render: AlertDialogDemo,
        code: `<AlertDialog
  trigger={<Button intent="outline">Delete item</Button>}
  title="Delete this item?"
  description="This action is permanent."
  tone="danger"
  confirmLabel="Yes, delete"
  cancelLabel="Keep it"
  onConfirm={() => toast.error('Item deleted')}
/>`,
      },
    ],
  },
  {
    name: 'Sheet',
    category: 'Overlays',
    description:
      'Slide-in panel from any edge (top, right, bottom, left). Title and description are typed props rendered in a consistent header.',
    demos: [
      {
        title: 'Right and bottom',
        Render: SheetDemo,
        code: `<Sheet
  trigger={<Button intent="outline">Right sheet</Button>}
  title="Right panel"
  side="right"
>
  <Text variant="body">Sheet content.</Text>
</Sheet>`,
      },
    ],
  },
  {
    name: 'Drawer',
    category: 'Overlays',
    description:
      'Bottom-anchored sheet with a drag handle, backed by vaul. Title and description render in a structured header.',
    demos: [
      {
        title: 'Bottom drawer',
        Render: DrawerDemo,
        code: `<Drawer
  trigger={<Button intent="outline">Open Drawer</Button>}
  title="Drawer panel"
  description="A bottom-anchored sheet with a drag handle."
>
  <Text variant="body">Drawer content.</Text>
</Drawer>`,
      },
    ],
  },
  {
    name: 'Popover',
    category: 'Overlays',
    description:
      'Non-modal floating panel anchored to a trigger. Side (top, right, bottom, left) and align (start, center, end) control placement.',
    demos: [
      {
        title: 'Bottom popover',
        Render: PopoverDemo,
        code: `<Popover
  trigger={<Button intent="outline">Open Popover</Button>}
  side="bottom"
>
  <Box flexDirection="column" gap="s" padding="s">
    <Text variant="label">Popover content</Text>
  </Box>
</Popover>`,
      },
    ],
  },
  {
    name: 'HoverCard',
    category: 'Overlays',
    description:
      'Rich preview card that appears on mouse enter — no click required. The side prop controls which edge it opens from.',
    demos: [
      {
        title: 'Hover to reveal',
        Render: HoverCardDemo,
        code: `<HoverCard
  trigger={<Button intent="outline">Hover me</Button>}
  side="bottom"
>
  <Box flexDirection="column" gap="xs" padding="s">
    <Text variant="label">Quick info card</Text>
    <Text variant="caption" color="muted">Appears on hover.</Text>
  </Box>
</HoverCard>`,
      },
    ],
  },
  {
    name: 'Tooltip',
    category: 'Overlays',
    description:
      'Short text label that appears on hover or focus. The content prop accepts any React node. Side controls placement (top, right, bottom, left).',
    demos: [
      {
        title: 'All four sides',
        Render: TooltipDemo,
        code: `<Tooltip content="Tooltip on top" side="top">
  <Button intent="outline" size="sm">Top</Button>
</Tooltip>
<Tooltip content="Tooltip on right" side="right">
  <Button intent="outline" size="sm">Right</Button>
</Tooltip>`,
      },
    ],
  },
  {
    name: 'NavigationMenu',
    category: 'Navigation',
    description:
      'Top-level navigation driven by an items model. Items with a `content` node open a dropdown panel; the rest are plain links.',
    demos: [
      {
        title: 'Links with a dropdown panel',
        Render: NavigationMenuDemo,
        code: `<NavigationMenu
  items={[
    { label: 'Home', href: '#' },
    { label: 'Docs', href: '#' },
    { label: 'Products', content: <ProductsPanel /> },
    { label: 'About', href: '#' },
  ]}
/>`,
      },
    ],
  },
  {
    name: 'Menubar',
    category: 'Navigation',
    description:
      'A desktop-style menu bar from a menus model — each menu has items with optional shortcuts and separators.',
    demos: [
      {
        title: 'File / Edit / View',
        Render: MenubarDemo,
        code: `<Menubar
  menus={[
    { label: 'File', items: [
      { label: 'New File', shortcut: '⌘N' },
      { label: 'Save', shortcut: '⌘S', separatorBefore: true },
    ]},
    { label: 'Edit', items: [{ label: 'Undo', shortcut: '⌘Z' }] },
  ]}
/>`,
      },
    ],
  },
  {
    name: 'Resizable',
    category: 'Display',
    description:
      'Drag-to-resize panels from an array. Direction and starting sizes are props; drag the handle between panels.',
    demos: [
      {
        title: 'Two horizontal panels',
        Render: ResizableDemo,
        code: `<Resizable
  direction="horizontal"
  defaultSizes={[35, 65]}
  panels={[<SidebarPanel />, <MainPanel />]}
/>`,
      },
    ],
  },
  {
    name: 'Sidebar',
    category: 'Display',
    description:
      'A full app-shell sidebar from a typed model: a brand header, icon items with collapsible sub-menus, and a user footer. Collapses to an icon rail via the trigger, the rail edge, or Cmd/Ctrl+B.',
    demos: [
      {
        title: 'App shell with collapsible sub-menus (click the trigger to collapse to icons)',
        Render: SidebarDemo,
        code: `import { HugeiconsIcon } from '@hugeicons/react'
import { CommandLineIcon } from '@hugeicons/core-free-icons'

<Sidebar
  brand={{ icon: <HugeiconsIcon icon={DashboardSquare01Icon} size={16} />, title: 'Acme Inc', subtitle: 'Enterprise' }}
  user={{ name: 'shadcn', email: 'm@example.com', avatar: <Avatar src="…" fallback="CN" size="sm" /> }}
  groups={[
    {
      label: 'Platform',
      items: [
        {
          label: 'Playground',
          icon: <HugeiconsIcon icon={CommandLineIcon} size={16} />,
          active: true,
          items: [{ label: 'History' }, { label: 'Starred' }, { label: 'Settings' }],
        },
      ],
    },
  ]}
>
  <DashboardContent />
</Sidebar>`,
      },
    ],
  },
  {
    name: 'Chart',
    category: 'Display',
    description:
      'A typed chart from a data array. Choose line / bar / area, point `index` at the x-axis key, and list the numeric series in `categories`.',
    demos: [
      {
        title: 'Bar chart, two series',
        Render: ChartDemo,
        code: `<Chart
  type="bar"
  data={salesData}
  index="month"
  categories={['revenue', 'expenses']}
  height="md"
/>`,
      },
    ],
  },
]
