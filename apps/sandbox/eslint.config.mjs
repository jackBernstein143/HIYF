import lockdown from 'hiyf-eslint-config'

// The showcase app is a CONSUMER of the design system, so it runs under the
// full lockdown: no raw host elements, no arbitrary Tailwind, no inline styles.
export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  ...lockdown,
]
