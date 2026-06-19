# Building UI with `@jackbernnie/hiyf`

> Instructions for AI coding agents (Claude Code, Codex, Cursor, …). This project
> uses the **hiyf** AI design protocol (a locked design system) with its **lockdown**
> lint. Build UI using **only** this system — off-system code fails the build on purpose.

## The three rules (these fail `npm run build`)

1. **No raw HTML elements** — never write `<div>`, `<span>`, `<p>`, `<h1>`–`<h6>`,
   `<button>`, `<input>`, `<table>`, `<a>`, `<img>`, etc. Use `<Box>` / `<Text>`
   or a component from `@jackbernnie/hiyf`. (`<pre>`/`<code>` are allowed for code.)
2. **No arbitrary Tailwind values** — never `p-[17px]`, `bg-[#abc]`, `w-[33%]`.
   Use a design token. Standard utility classes (`flex`, `items-center`) are fine.
3. **No inline `style={{…}}`** — use a `<Box>` style prop or a component prop.

Also: never import the raw `@jackbernnie/hiyf/components/ui/*` layer — import the
closed wrapper from the package root.

## Setup (once per project)

```bash
npm install @jackbernnie/hiyf
npm install -D hiyf-eslint-config
```
```css
/* global CSS — no StyleX/bundler plugin needed; styles are precompiled */
@import "tailwindcss";
@import "@jackbernnie/hiyf/theme.css";
@import "@jackbernnie/hiyf/styles.css";
@source "../node_modules/@jackbernnie/hiyf/dist";
```
```js
// eslint.config.mjs
import lockdown from 'hiyf-eslint-config'
export default [...lockdown]
```

## Layout & text: `<Box>` and `<Text>`

`<Box>` is the layout primitive (defaults to `display:flex`). All style props take
**tokens only**, not raw CSS:

```tsx
import { Box, Text } from '@jackbernnie/hiyf'

<Box flexDirection="column" gap="m" padding="l"
     backgroundColor="background-card" borderRadius="m" boxShadow="s">
  <Text variant="heading-s">Title</Text>
  <Text color="muted">Supporting copy</Text>
</Box>
```

`<Text>` renders all text. Pick a `variant` (a role), never a raw size.

`Card` self-pads and **fills its container width** by default — drop content
straight in (`<Card padding="md">…`), no wrapper needed. For an even row of cards,
use `Grid` (`gridTemplateColumns="repeat(4, minmax(0, 1fr))"`) or a flex row of
`flexGrow={1}` slots — the layout controls across-row sizing; the card fills it.

## Token vocabulary (the entire allowed set)

| Prop | Tokens |
|---|---|
| `padding` / `margin` / `gap` (and `p`/`m`/`px`/`py`/…) | `none` `xs`(4) `s`(8) `m`(12) `l`(16) `xl`(24) `2xl`(32) `3xl`(48) `4xl`(64) `5xl`(96) px |
| `borderRadius` | `none` `s`(8) `m`(12) `l`(16) `xl`(32) `full` |
| `backgroundColor` | `background-primary` `-secondary` `-card` `-inverse` `-success` `-warning` `-danger` `-pending` `-card-raised` |
| `color` (on Box) | `text-primary` `-secondary` `-tertiary` `-success` `-danger` `-warning` `-pending` |
| `borderColor` | `border-primary` `-secondary` `-warning` `-card` |
| `boxShadow` | `none` `s` `m` `l` `xl` |
| `transitionDuration` | `instant` `fast`(120) `base`(200) `slow`(320) `slower`(480) ms |
| `ease` | `standard` `decelerate` `accelerate` `spring` |

`<Text variant>`: `heading-2xl` `heading-xl` `heading-l` `heading-m` `heading-s`
`heading-xs` `heading-xxs` `body` `default` `label` `caption`.
`<Text color>`: `default` `muted` `disabled` `accent` `success` `warning` `danger`
`inverse` `white` `black` `inherit`. Also: `align`, `wrap`, `monospace`,
`truncate`, `tabularNums`, `formatter`.

Numeric `width`/`height` are allowed on `<Box>` for genuinely dynamic sizes
(`width={240}` → `240px`); reach for tokens for everything else.

## Components (import from `@jackbernnie/hiyf`)

Props are **intent-named and enumerated** — there is no `className`/`style` escape
hatch. A few key APIs:

- `Button` — `intent`: `primary | secondary | outline | ghost | danger`; `size`: `sm | md | lg`
- `Status` — `color`: `success | warning | danger | info | neutral`
- `Badge` — `tone`; `Alert` — `tone`: `neutral | info | success | warning | danger`
- `Card` (+ `CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/`CardFooter`)
- `Select` / `Combobox` (`options`), `Table` (`columns`), `Tabs`/`Accordion` (item arrays)

Full catalog — actions: ButtonGroup, Input, InputGroup, InputOTP, Textarea, Select,
NativeSelect, Combobox, Checkbox, Switch, Slider, Toggle, ToggleGroup, RadioGroup,
Label, Field. Feedback/display: Status, Badge, Alert, Card, Progress, Skeleton,
Spinner, Avatar, Kbd, Empty, Toaster. Layout/data: Separator, AspectRatio,
ScrollArea, Table, Carousel, Grid, GridItem. Navigation: Tabs, Accordion,
Collapsible, Breadcrumb, Pagination, Command, NavigationMenu, Menubar. Overlays:
Dialog, AlertDialog, Sheet, Drawer, Popover, HoverCard, Tooltip, DropdownMenu,
ContextMenu. App shell & data viz: Sidebar, Resizable, Chart.

When unsure of a prop, check the component's TypeScript types — every prop is typed.

## Icons

Icons are standardized on **hugeicons** — they ship with this package. **Do NOT
add `lucide-react`, `react-icons`, or any other icon library.** Render icons with
the `Icon` component and import glyphs from the package's `/icons` entry:

```tsx
import { Icon } from '@jackbernnie/hiyf'
import { Home01Icon, Search01Icon } from '@jackbernnie/hiyf/icons'

<Icon icon={Home01Icon} />                 // size defaults to s (16px)
<Icon icon={Search01Icon} size="m" color="muted" />
```

`size`: `xs s m l xl`. `color` defaults to `current` (inherits text color, so
icons inside buttons just work); other values: `muted accent success warning danger`.

## When something you need doesn't exist

Work through this in order. **Don't get stuck, and don't expand the design system
for a single screen:**

1. **Express it with existing tokens/components first.** Most gaps aren't real.
2. **If it's clearly reusable**, add a token/variant/component to the design system.
3. **If it's a genuine one-off** — a dynamic value, a third-party integration, or a
   single bespoke element — use the escape hatch: put
   `// eslint-disable-next-line no-restricted-syntax` on that one line, with a short
   comment explaining why.

List any escape hatches you used so they can be reviewed.

## Before you finish

Run `npm run lint` and `npm run build`. If either fails, fix the code until both
pass. **Green lint means the UI is on-system** — that is the actual guarantee, not
this document.
