# Using this design system in a project

The package is **`@jackbernnie/hiyf`**. It ships three things:
- **Components** — `import { Button, Card, Dialog, … } from '@jackbernnie/hiyf'`
- **Theme** — `@jackbernnie/hiyf/theme.css` (the neutral radix-vega tokens)
- **Lint** — `hiyf-eslint-config` (the optional "lockdown" rules)

The published package ships **compiled JS + types + CSS**. You need **Tailwind
v4** (for the components' utility classes) and two CSS imports — `@jackbernnie/hiyf/theme.css`
(tokens) and `@jackbernnie/hiyf/styles.css` (the primitives' precompiled styles). **There is
no StyleX or other bundler plugin to configure**: the `Box` / `Text` / `Grid`
primitives are StyleX-precompiled to static CSS at publish time. `'use client'`
directives are preserved, so it works in Next.js App Router too.

> Note: the in-repo workflow (Option A) consumes the **source** and uses the
> StyleX babel plugin for live compilation — that's only for *developing* the
> design system, not for *consuming* the published package.

---

## Option A — build inside this monorepo (easiest, recommended)

Everything is already wired here. To start a new app that uses the design system:

```bash
# from the repo root
mkdir -p apps/my-app && cd apps/my-app
# scaffold a Vite React app (or copy apps/sandbox as a starting point)
```

In the new app's `package.json`:
```json
{ "dependencies": { "@jackbernnie/hiyf": "workspace:*" },
  "devDependencies": { "hiyf-eslint-config": "workspace:*" } }
```

Then copy the wiring from `apps/sandbox`:
- `vite.config.ts` — the `@stylexjs/babel-plugin` block + `@tailwindcss/vite`
- `src/styles.css` — the four `@import`s + the `@source`
- `eslint.config.mjs` — the lockdown config

`pnpm install` at the root and you're done. This is the path of least resistance
because pnpm symlinks the source and the bundler transpiles it directly.

---

## Option B — a separate / existing project (Vite)

1. **Install:**
   ```bash
   npm install @jackbernnie/hiyf
   npm install -D hiyf-eslint-config tailwindcss @tailwindcss/vite tw-animate-css
   ```

2. **Import the CSS** — Tailwind, the theme tokens, and the precompiled primitive
   styles:
   ```css
   /* src/index.css */
   @import "tailwindcss";
   @import "tw-animate-css";
   @import "@jackbernnie/hiyf/theme.css";
   @import "@jackbernnie/hiyf/styles.css";            /* precompiled — no StyleX plugin needed */
   @source "../node_modules/@jackbernnie/hiyf/dist";  /* so Tailwind sees the component classes */
   ```

3. **Use it:**
   ```tsx
   import { Box, Text, Button, Card } from '@jackbernnie/hiyf'
   ```

That's it — no StyleX plugin, no `transpilePackages`, no `optimizeDeps` tweaks.
The package is precompiled.

---

## Option C — existing Next.js project

1. `npm install @jackbernnie/hiyf` (+ `-D hiyf-eslint-config`).
2. Tailwind v4 via PostCSS (`@tailwindcss/postcss`); import the same lines from
   B.2 into `app/globals.css`.
3. Use it. Interactive components carry `'use client'` (preserved through the
   build), so they work in the App Router with no extra wrapping; `Box`/`Text`
   are client components as well. No StyleX/Next plugin required.

---

## Turning on the "lockdown" (recommended)

This is what makes the system LLM-safe in *your* app — off-system code fails lint:

```js
// eslint.config.mjs
import lockdown from 'hiyf-eslint-config'
export default [...lockdown]
```

Now `<div className="p-[17px]">`, raw `<span>`, and inline `style={{…}}` are errors;
`<Box>`/`<Text>` and the components pass. Add tokens/variants to the design system
when you need something new, rather than reaching for an arbitrary class.

---

## Day-to-day

- Prefer the **closed wrappers** (`<Button intent="primary">`, `<Status color="success">`,
  `<Select options={…}>`) — they have no `className` escape hatch by design.
- Use **`<Box>`** for layout (token spacing, `flexDirection`) and **`<Text>`** for
  every piece of text (`variant` + `color`).
- A few components are still raw/open (chart, sidebar, navigation-menu, menubar,
  resizable) — usable, just not yet locked down.
- Run the **sandbox** (`pnpm dev`) any time to browse every component.
