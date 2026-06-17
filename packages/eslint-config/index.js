/**
 * hiyf-eslint-config — "lockdown" rules
 * ------------------------------------------------------------------
 * The HIYF philosophy says the only expressible choices should be correct
 * ones. Constrained component APIs get you most of the way; these lint rules
 * close the escape hatches so an off-system choice *fails the build* instead of
 * silently shipping.
 *
 * Apply this in the apps where you BUILD PRODUCT (not inside the design system
 * itself — the design system is the one place allowed to touch raw elements and
 * Tailwind). Usage in an app's eslint.config.js:
 *
 *   import lockdown from 'hiyf-eslint-config'
 *   export default [...lockdown]
 *
 * Every rule below has an intentional override path: add the token/variant to
 * the design system, or use the provided primitive. If you genuinely need an
 * escape hatch, disabling a rule on a single line is a visible, reviewable
 * decision — which is the point.
 */

import tseslint from 'typescript-eslint'

// Raw HTML host elements that should go through <Box> / <Text> / a component.
const FORBIDDEN_ELEMENTS = [
  'div',
  'span',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'section',
  'article',
  'main',
  'nav',
  'header',
  'footer',
  'aside',
  'ul',
  'ol',
  'li',
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'label',
  'table',
  'form',
  'img',
]

const elementSelector = `JSXOpeningElement[name.name=/^(${FORBIDDEN_ELEMENTS.join('|')})$/]`

/** @type {import('eslint').Linter.RulesRecord} */
const lockdownRules = {
  'no-restricted-syntax': [
    'error',
    {
      // Raw host elements → use the design system's primitives.
      selector: elementSelector,
      message:
        'Raw HTML elements are off-limits. Use <Box>/<Text> or a component from @jackbernnie/hiyf. (Add a component to the design system if one is missing.)',
    },
    {
      // Arbitrary Tailwind values: className="p-[17px]", "bg-[#abc]", "w-[33%]"…
      selector:
        'JSXAttribute[name.name="className"] Literal[value=/\\[[^\\]]+\\]/]',
      message:
        'Arbitrary Tailwind values (the [..] bracket syntax) are off-limits — they are how "a thousand slightly different grays" happens. Use a design token or add one to the theme.',
    },
    {
      // Same, but for arbitrary values inside template-literal classNames.
      selector:
        'JSXAttribute[name.name="className"] TemplateElement[value.raw=/\\[[^\\]]+\\]/]',
      message:
        'Arbitrary Tailwind values (the [..] bracket syntax) are off-limits. Use a design token or add one to the theme.',
    },
    {
      // Inline styles bypass the token system entirely.
      selector: 'JSXAttribute[name.name="style"]',
      message:
        'Inline style props bypass the design tokens. Use a component prop or a token-based class.',
    },
  ],

  'no-restricted-imports': [
    'error',
    {
      paths: [
        {
          name: 'react',
          importNames: ['createElement'],
          message:
            'React.createElement bypasses the JSX element rules. Use design-system components.',
        },
      ],
      patterns: [
        {
          // The raw shadcn layer is an internal implementation detail.
          group: [
            '@jackbernnie/hiyf/*/ui/*',
            '@jackbernnie/hiyf/components/ui/*',
            '*/components/ui/*',
          ],
          message:
            'Import the constrained wrapper from @jackbernnie/hiyf, not the raw ui/* primitive underneath it.',
        },
        {
          // Icons are standardized on hugeicons (shipped with the design system).
          // Block every other icon library so a stray import fails the build.
          group: [
            'lucide-react',
            'react-icons',
            'react-icons/*',
            '@heroicons/react',
            '@heroicons/react/*',
            '@radix-ui/react-icons',
            '@tabler/icons-react',
            '@phosphor-icons/react',
            'phosphor-react',
            '@fortawesome/*',
            'feather-icons',
            'feather-icons-react',
          ],
          message:
            'Icons are standardized on hugeicons. Render with <Icon> from @jackbernnie/hiyf and import glyphs from @jackbernnie/hiyf/icons — do not add another icon library.',
        },
      ],
    },
  ],
}

/**
 * Flat-config block. Scoped to TSX/JSX so plain .ts logic files are unaffected.
 * @type {import('eslint').Linter.Config[]}
 */
const config = [
  {
    name: 'design-system/lockdown',
    files: ['**/*.tsx', '**/*.jsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: lockdownRules,
  },
]

export default config
export { config, lockdownRules, FORBIDDEN_ELEMENTS }
