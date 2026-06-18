/**
 * hiyf-eslint-config — "lockdown" rules
 * ------------------------------------------------------------------
 * The HIYF philosophy says the only expressible choices should be correct
 * ones. Constrained component APIs get you most of the way; these lint rules
 * close the escape hatches so an off-system choice *fails the build* instead of
 * silently shipping.
 *
 * Apply this in the apps where you BUILD PRODUCT (not inside the design system
 * itself). Zero-config (icons standardized on hugeicons):
 *
 *   import lockdown from 'hiyf-eslint-config'
 *   export default [...lockdown]
 *
 * Brownfield / bring-your-own icon library — sanction ONE icon package; every
 * other icon library (including hugeicons) then fails the build:
 *
 *   import { defineLockdown } from 'hiyf-eslint-config'
 *   export default defineLockdown({ icons: 'lucide' })   // or '@acme/icons'
 *
 * Rule of thumb for the icon choice: if the app already uses a single, coherent
 * icon package, sanction it. If icons are scattered across many packages, don't
 * adopt the mess — leave the default (hugeicons) and standardize on it.
 *
 * Every rule has an intentional override path: disabling a rule on a single line
 * is a visible, reviewable decision — which is the point.
 */

import tseslint from 'typescript-eslint'

// Raw HTML host elements that should go through <Box> / <Text> / a component.
const FORBIDDEN_ELEMENTS = [
  'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'section', 'article',
  'main', 'nav', 'header', 'footer', 'aside', 'ul', 'ol', 'li', 'a', 'button',
  'input', 'textarea', 'select', 'label', 'table', 'form', 'img',
]

const elementSelector = `JSXOpeningElement[name.name=/^(${FORBIDDEN_ELEMENTS.join('|')})$/]`

// Known icon libraries → their import specifiers. Exactly ONE is sanctioned per
// project; the rest are blocked so icons can't drift across packages.
const ICON_LIBRARIES = {
  hugeicons: ['@hugeicons/react', '@hugeicons/core-free-icons'],
  lucide: ['lucide-react'],
  'react-icons': ['react-icons', 'react-icons/*'],
  heroicons: ['@heroicons/react', '@heroicons/react/*'],
  'radix-icons': ['@radix-ui/react-icons'],
  tabler: ['@tabler/icons-react'],
  phosphor: ['@phosphor-icons/react', 'phosphor-react'],
  fontawesome: ['@fortawesome/*'],
  feather: ['feather-icons', 'feather-icons-react'],
}

// The element / className / style rules never vary with options.
const syntaxRules = [
  {
    selector: elementSelector,
    message:
      'Raw HTML elements are off-limits. Use <Box>/<Text> or a component from @jackbernnie/hiyf. (Add a component to the design system if one is missing.)',
  },
  {
    selector: 'JSXAttribute[name.name="className"] Literal[value=/\\[[^\\]]+\\]/]',
    message:
      'Arbitrary Tailwind values (the [..] bracket syntax) are off-limits — they are how "a thousand slightly different grays" happens. Use a design token or add one to the theme.',
  },
  {
    selector: 'JSXAttribute[name.name="className"] TemplateElement[value.raw=/\\[[^\\]]+\\]/]',
    message:
      'Arbitrary Tailwind values (the [..] bracket syntax) are off-limits. Use a design token or add one to the theme.',
  },
  {
    selector: 'JSXAttribute[name.name="style"]',
    message:
      'Inline style props bypass the design tokens. Use a component prop or a token-based class.',
  },
]

function buildRules(icons) {
  // Resolve the sanctioned library's import specifiers. `icons` may be a known
  // key (e.g. 'lucide') or a raw package name (e.g. '@acme/icons').
  const sanctioned = ICON_LIBRARIES[icons] ?? [icons, `${icons}/*`]
  const sanctionedSet = new Set(sanctioned)
  const blockedIconGroups = Object.values(ICON_LIBRARIES)
    .flat()
    .filter((g) => !sanctionedSet.has(g))

  const iconMessage =
    icons === 'hugeicons'
      ? 'Icons are standardized on hugeicons. Render with <Icon> from @jackbernnie/hiyf and import glyphs from @jackbernnie/hiyf/icons — do not add another icon library.'
      : `Icons are standardized on '${icons}' for this project. Import only from it — do not add another icon library.`

  /** @type {import('eslint').Linter.RulesRecord} */
  return {
    'no-restricted-syntax': ['error', ...syntaxRules],
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
          { group: blockedIconGroups, message: iconMessage },
        ],
      },
    ],
  }
}

/**
 * Build the lockdown flat-config. `options.icons` sanctions one icon library
 * (a known key or a raw package name); defaults to 'hugeicons'.
 * @param {{ icons?: string }} [options]
 * @returns {import('eslint').Linter.Config[]}
 */
export function defineLockdown(options = {}) {
  const { icons = 'hugeicons' } = options
  return [
    {
      name: 'design-system/lockdown',
      files: ['**/*.tsx', '**/*.jsx'],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: { ecmaFeatures: { jsx: true }, sourceType: 'module' },
      },
      rules: buildRules(icons),
    },
  ]
}

// Zero-config default — icons standardized on hugeicons.
const config = defineLockdown()
const lockdownRules = config[0].rules

export default config
export { config, lockdownRules, FORBIDDEN_ELEMENTS, ICON_LIBRARIES }
