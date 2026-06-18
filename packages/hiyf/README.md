# @jackbernnie/hiyf

**human-in-your-face** — a personal, LLM-safe design system: the full shadcn/ui
component set as a robust base, themed neutral, and closed down so the only
expressible choices are correct ones.

```bash
npm install @jackbernnie/hiyf
npm install -D hiyf-eslint-config   # the "lockdown" rules (recommended)
```

```css
/* global CSS — no StyleX/bundler plugin needed; styles ship precompiled */
@import "tailwindcss";
@import "@jackbernnie/hiyf/theme.css";    /* design tokens (light/dark) */
@import "@jackbernnie/hiyf/styles.css";   /* precompiled primitive styles */
@source "../node_modules/@jackbernnie/hiyf/dist";  /* let Tailwind see the component classes */
```

```tsx
import { Box, Text, Button, Card } from '@jackbernnie/hiyf'

<Box flexDirection="column" gap="m" padding="l" backgroundColor="background-card" borderRadius="m">
  <Text variant="heading-s">Invoices</Text>
  <Button intent="primary">New invoice</Button>
</Box>
```

- **Components** — closed wrappers over shadcn/ui with intent-named, enumerated
  props and no `className`/`style` escape hatch.
- **`Box` / `Text` primitives** — token-only props (`padding="l"`,
  `variant="heading-s"`). Their styles are **precompiled** (StyleX → static CSS
  at publish time), so consumers need **no StyleX bundler plugin** — just import
  `@jackbernnie/hiyf/styles.css`.
- **Theme** — `@jackbernnie/hiyf/theme.css` (neutral radix-vega tokens, light + dark).

Pair with [`hiyf-eslint-config`](https://www.npmjs.com/package/hiyf-eslint-config)
to make off-system code (raw elements, arbitrary Tailwind, inline styles) **fail
the build** — which is what makes it safe to generate UI with an LLM.

Ships compiled JS + types + CSS; works in Vite, Next.js (App Router — `'use client'`
directives are preserved), and any bundler. Full setup: see the repository's
`USAGE.md`.

## Theming (re-skin without forking)

Every token indirects through a stable CSS variable, so you can re-skin the whole
system from your own CSS — no fork, no StyleX plugin. The shadcn palette/radius
live in `--radius`/`--primary`/… ; the `Box`/`Text` primitive tokens live in
`--hiyf-*`. Override any of them:

```css
@import "@jackbernnie/hiyf/theme.css";
@import "@jackbernnie/hiyf/styles.css";

:root {
  --radius: 0.5rem;          /* component corners */
  --primary: oklch(0.55 0.2 264);
  --hiyf-space-m: 14px;      /* Box gap/padding="m" everywhere */
  --hiyf-radius-m: 10px;     /* Box borderRadius="m" */
}
```

Defaults are unchanged unless you override. See **`@jackbernnie/hiyf/theme-template.css`**
for the full list of every overridable variable.

## For AI coding agents

This package ships an **`AGENTS.md`** with the complete rules, token vocabulary,
and component catalog. Point your agent at it:

```
node_modules/@jackbernnie/hiyf/AGENTS.md
```

## Attribution

Forked from Polar's "Orbit" design system (Apache-2.0). See `LICENSE`/`NOTICE`.
