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

## For AI coding agents

This package ships an **`AGENTS.md`** with the complete rules, token vocabulary,
and component catalog. Point your agent at it:

```
node_modules/@jackbernnie/hiyf/AGENTS.md
```

## Attribution

Forked from Polar's "Orbit" design system (Apache-2.0). See `LICENSE`/`NOTICE`.
