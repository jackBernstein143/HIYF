# hiyf-eslint-config

The **"lockdown"** ESLint rules for the [`@jackbernnie/hiyf`](https://www.npmjs.com/package/@jackbernnie/hiyf)
AI design protocol. They make off-system UI code *fail the build* instead of
silently shipping — which is what lets you hand a project to an LLM and trust the result.

```bash
npm install -D hiyf-eslint-config
```

```js
// eslint.config.mjs (flat config)
import lockdown from 'hiyf-eslint-config'
export default [...lockdown]
```

What fails the build:

- Raw HTML elements (`<div>`, `<span>`, `<button>`, …) — use `<Box>`/`<Text>`
  or a `@jackbernnie/hiyf` component.
- Arbitrary Tailwind values (`p-[17px]`, `bg-[#abc]`) — use a design token.
- Inline `style={{ … }}`.
- Reaching past a wrapper into the raw `ui/*` layer.
- Importing any icon library other than the sanctioned one (hugeicons by default).

Every rule has an intentional override path: add the token/variant to the design
system, or disable a rule on a single line as a visible, reviewable decision.

## Choosing the icon library

Zero-config sanctions **hugeicons** (shipped with the design system) and blocks
every other icon package. To sanction a different one — e.g. when adopting an
existing app that already uses a single icon library — use the factory:

```js
import { defineLockdown } from 'hiyf-eslint-config'

export default defineLockdown({ icons: 'lucide' })   // or '@acme/icons'
```

Now `lucide-react` is allowed and **every other** icon library (including
hugeicons) fails the build — so icons can't drift across packages. Known keys:
`hugeicons` `lucide` `react-icons` `heroicons` `radix-icons` `tabler` `phosphor`
`fontawesome` `feather`; or pass any raw package name.

**Rule of thumb:** if the app already uses one coherent icon package, sanction
it. If icons are scattered across many packages, don't adopt the mess — keep the
default (hugeicons) and standardize on it.
