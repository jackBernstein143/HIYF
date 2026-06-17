# hiyf-eslint-config

The **"lockdown"** ESLint rules for the [`@jackbernnie/hiyf`](https://www.npmjs.com/package/@jackbernnie/hiyf)
design system. They make off-system UI code *fail the build* instead of silently
shipping — which is what lets you hand a project to an LLM and trust the result.

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

Every rule has an intentional override path: add the token/variant to the design
system, or disable a rule on a single line as a visible, reviewable decision.
