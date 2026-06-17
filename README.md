# HIYF — Human In Your Face

A personal design system: the **full shadcn/ui component set as a robust base**,
themed with a neutral `radix-vega` preset, brought under **HIYF's "LLM-safe"
philosophy** — the only expressible choices should be correct ones. (The name is
a play on Apple's "Human Interface".)

The philosophy has three pillars, all in place:

1. **Tokens as intent** — the StyleX primitives `Box` and `Text` (from Polar's
   Orbit, Apache-2.0): props are named by purpose (`backgroundColor="background-card"`,
   `padding="l"`) and accept only token values, never raw CSS.
2. **Closed wrappers** — over the open shadcn components, you add wrappers that
   expose only intent-named, enumerated props and remove the `className`/`style`
   escape hatches. `Status` (over shadcn `Badge`) is the worked exemplar.
3. **Enforcement** — `hiyf-eslint-config` (the "lockdown" config) makes
   off-system code *fail the build*: no raw `<div>`, no arbitrary Tailwind values
   (`p-[17px]`), no inline `style`, no reaching past wrappers into `ui/*`.

## Layout

```
design-system/
├── packages/
│   ├── hiyf/                      ← the design system (npm: @jackbernnie/hiyf)
│   │   └── src/
│   │       ├── components/
│   │       │   ├── ui/            ← 54 shadcn components (the forked base, themed)
│   │       │   ├── Box.tsx Text.tsx Grid.tsx GridItem.tsx   ← StyleX primitives
│   │       │   └── Status.tsx     ← exemplar closed wrapper (over Badge)
│   │       ├── primitives/        ← createText
│   │       ├── tokens/            ← StyleX tokens (spacing, color, radius, motion)
│   │       ├── _legacy/           ← retired Polar-themed wrappers (kept for reference)
│   │       ├── theme.css          ← the vendored radix-vega/neutral theme
│   │       └── index.ts           ← public API
│   └── eslint-config/             ← the "lockdown" rules
└── apps/sandbox/                  ← Vite gallery to view/tweak everything
```

## Getting started

```bash
pnpm install
pnpm dev          # sandbox at http://localhost:5180 (light/dark toggle in header)
```

Edit anything under `packages/hiyf/src/**` and the sandbox hot-reloads.

## How it's wired

- **Base components**: the entire shadcn catalog (`shadcn add --all`) generated
  against the `radix-vega` preset (neutral base color, `hugeicons`, the unified
  `radix-ui` package). The source lives in `components/ui/` — you own it, edit it
  freely. `@/` import aliases were rewritten to relative paths so it works as a
  library, not just inside a Next app.
- **Theme**: `packages/hiyf/src/theme.css` vendors the preset's CSS-variable
  theme + base variants/keyframes, so the fork is self-contained (no dependency
  on the `shadcn` CLI at runtime). A consuming app imports it:
  ```css
  @import "tailwindcss";
  @import "tw-animate-css";
  @import "@jackbernnie/hiyf/theme.css";
  @import "@jackbernnie/hiyf/styles.css";            /* precompiled StyleX — no plugin needed */
  @source "../node_modules/@jackbernnie/hiyf/dist";
  ```
- **StyleX** (`Box`/`Text`/tokens): in the dev sandbox it compiles live via the
  babel plugin in `apps/sandbox/vite.config.ts` (runtime injection). For the
  **published package** it's precompiled to a static `dist/stylex.css` (the
  `rollup` build), so consumers need no StyleX plugin — they just import
  `@jackbernnie/hiyf/styles.css`. `Box` defaults to `display:flex`; pass
  `flexDirection="column"` for vertical stacks.

## The conversion recipe — wrapping a shadcn component in lockdown style

`Status` (`packages/hiyf/src/components/Status.tsx`) is the template. To close
down any other shadcn primitive:

1. Keep the raw component in `components/ui/<name>.tsx` (the accessibility plumbing).
2. Create `components/<Name>.tsx` that:
   - exposes **enumerated, intent-named props** (e.g. `color="success"`, not
     `variant="destructive"` + arbitrary classes),
   - maps them to classes with `cva` internally,
   - exposes **no `className`/`style`** prop (closed),
   - documents that "need another treatment? add a variant here."
3. Export the wrapper from `index.ts`. (The raw `ui/*` export can stay for now;
   the lockdown lint already discourages importing it directly downstream.)

## Enforcement — using the lockdown lint in a product app

```js
// your-app/eslint.config.mjs
import lockdown from 'hiyf-eslint-config'
export default [...lockdown]
```

Then `<div className="p-[17px]" style={{...}}>` and raw `<span>` are build errors;
`<Box padding="m"><Text>…</Text></Box>` passes. (Verified — the rules fire.) The
design system itself is exempt; it's the one place allowed to touch raw elements
and Tailwind.

## What's a wrapper vs. still raw

- **Closed wrappers (47)** — exported under the canonical name; the raw shadcn
  version is intentionally *not* re-exported. Actions/forms (Button, ButtonGroup,
  Input, InputGroup, InputOTP, Textarea, Select, NativeSelect, Combobox, Checkbox,
  Switch, Slider, Toggle, ToggleGroup, RadioGroup, Label, Field), feedback/display
  (Status, Badge, Alert, Card, Progress, Skeleton, Spinner, Avatar, Kbd, Empty,
  Toaster), layout/data (Separator, AspectRatio, ScrollArea, Table, Carousel),
  navigation (Tabs, Accordion, Collapsible, Breadcrumb, Pagination, Command),
  overlays (Dialog, AlertDialog, Sheet, Drawer, Popover, HoverCard, Tooltip,
  DropdownMenu, ContextMenu). Plus the HIYF primitives `Box`, `Text`, `Grid`.
  Now also wrapped: `Sidebar`, `NavigationMenu`, `Menubar`, `Resizable`, `Chart`.
- **Still raw (2)**: `direction` (RTL provider) and `item` (a low-level layout
  primitive used internally) — utilities, not user-facing components.

## The showcase

`pnpm dev` opens a shadcn-docs-style gallery (`apps/sandbox`): a searchable
sidebar of all 55 components grouped by category, a live preview + copyable code
for each, hash-linkable pages (`#Button`), and a light/dark toggle. The showcase
app is itself built only from the design system and **passes the lockdown lint**
(`pnpm --filter sandbox exec eslint src` reports zero violations) — proof the
rules are livable.

See **`USAGE.md`** for how to consume the system in a new or existing project.
- **Retired to `_legacy/`**: the original Polar-themed Orbit wrappers (Button,
  Input, Pill, Modal, …) and `calendar`/`Truncated` (dependency/version drift).
  Kept as reference for wrapper patterns; not built or exported.

## Attribution

`Box`/`Text`/tokens and the wrapper philosophy are forked from Polar's Orbit
(Apache-2.0 — see `LICENSE`/`NOTICE`). The component base is shadcn/ui (MIT),
which is copy-into-your-repo by design.
