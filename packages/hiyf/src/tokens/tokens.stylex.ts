// ─── Design System Tokens ───────────────────────────────────────────────────
// Every token's value indirects through a stable, human-named CSS variable:
//
//     s: 'var(--hiyf-space-s, 8px)'
//
// The fallback is the shipped default (HIYF's neutral theme). A consuming app
// can RE-SKIN the whole system — no fork, no StyleX plugin — by overriding the
// `--hiyf-*` variables in its own CSS:
//
//     :root { --hiyf-space-s: 10px; --hiyf-radius-m: 14px; }
//
// This is the StyleX-layer counterpart to the shadcn theme variables in
// theme.css (--radius, --primary, …). Together they are the complete theming
// surface — see theme-template.css for the full list.
// ──────────────────────────────────────────────────────────────────────────────

import * as stylex from '@stylexjs/stylex'

// ─── Spacing ──────────────────────────────────────────────────────────────────

export const spacing = stylex.defineVars({
  none: 'var(--hiyf-space-none, 0)',
  xs: 'var(--hiyf-space-xs, 4px)',
  s: 'var(--hiyf-space-s, 8px)',
  m: 'var(--hiyf-space-m, 12px)',
  l: 'var(--hiyf-space-l, 16px)',
  xl: 'var(--hiyf-space-xl, 24px)',
  '2xl': 'var(--hiyf-space-2xl, 32px)',
  '3xl': 'var(--hiyf-space-3xl, 48px)',
  '4xl': 'var(--hiyf-space-4xl, 64px)',
  '5xl': 'var(--hiyf-space-5xl, 96px)',
})

// ─── Colors ───────────────────────────────────────────────────────────────────
// Defaults use light-dark(); override a `--hiyf-bg-*` var with your own value
// (a solid color, or another light-dark() pair) to re-skin.
// ──────────────────────────────────────────────────────────────────────────────

export const backgroundColors = stylex.defineVars({
  'background-primary':
    'var(--hiyf-bg-primary, light-dark(#ffffff, hsl(233, 4%, 3.5%)))',
  'background-secondary':
    'var(--hiyf-bg-secondary, light-dark(oklch(0.985 0.002 247.839), hsl(233, 4%, 6.5%)))',
  'background-card':
    'var(--hiyf-bg-card, light-dark(oklch(96.7% 0.003 264.54), hsl(233, 4%, 9.5%)))',
  'background-inverse':
    'var(--hiyf-bg-inverse, light-dark(oklch(0.21 0.034 264.665), oklch(1.000 0.000 263.3)))',
  'background-warning':
    'var(--hiyf-bg-warning, light-dark(oklch(0.97 0.026 102.5), oklch(0.445 0.1 82.5 / 0.2)))',
  'background-success':
    'var(--hiyf-bg-success, light-dark(oklch(0.97 0.04 162), oklch(0.696 0.17 162 / 0.2)))',
  'background-danger':
    'var(--hiyf-bg-danger, light-dark(oklch(0.97 0.04 25), oklch(0.637 0.237 25 / 0.2)))',
  'background-pending':
    'var(--hiyf-bg-pending, light-dark(oklch(0.96 0.005 264), oklch(0.6 0.02 264 / 0.2)))',
  'background-card-raised':
    'var(--hiyf-bg-card-raised, light-dark(transparent, hsl(233, 4%, 9.5%)))',
})

export const textColors = stylex.defineVars({
  'text-primary': 'var(--hiyf-text-primary, light-dark(#000000, #ffffff))',
  'text-secondary':
    'var(--hiyf-text-secondary, light-dark(oklch(0.551 0.027 264.364), oklch(0.599 0.020 279.8)))',
  'text-tertiary':
    'var(--hiyf-text-tertiary, light-dark(oklch(0.707 0.022 261.325), hsl(233, 4%, 46%)))',
  'text-success':
    'var(--hiyf-text-success, light-dark(oklch(0.696 0.17 162), oklch(0.696 0.17 162)))',
  'text-danger':
    'var(--hiyf-text-danger, light-dark(oklch(0.637 0.237 25), oklch(0.637 0.237 25)))',
  'text-warning':
    'var(--hiyf-text-warning, light-dark(oklch(0.769 0.188 70), oklch(0.769 0.188 70)))',
  'text-pending':
    'var(--hiyf-text-pending, light-dark(oklch(0.65 0.02 264), oklch(0.7 0.02 264)))',
})

export const borderColors = stylex.defineVars({
  'border-primary':
    'var(--hiyf-border-primary, light-dark(oklch(0.928 0.006 264.531), hsl(233, 4%, 12%)))',
  'border-secondary':
    'var(--hiyf-border-secondary, light-dark(#f6f6f6, oklch(0.206 0.005 279.9)))',
  'border-warning':
    'var(--hiyf-border-warning, light-dark(oklch(0.836 0.138 100), oklch(0.572 0.14 91)))',
  'border-card':
    'var(--hiyf-border-card, light-dark(oklch(0.928 0.006 264.531), transparent))',
})

// ─── Border Radius ────────────────────────────────────────────────────────────

export const borderRadii = stylex.defineVars({
  none: 'var(--hiyf-radius-none, 0)',
  s: 'var(--hiyf-radius-s, 8px)',
  m: 'var(--hiyf-radius-m, 12px)',
  l: 'var(--hiyf-radius-l, 16px)',
  xl: 'var(--hiyf-radius-xl, 32px)',
  full: 'var(--hiyf-radius-full, 9999px)',
})

// ─── Shadows ──────────────────────────────────────────────────────────────────

export const shadows = stylex.defineVars({
  none: 'var(--hiyf-shadow-none, none)',
  s: 'var(--hiyf-shadow-s, 0 1px 2px rgba(0, 0, 0, 0.05))',
  m: 'var(--hiyf-shadow-m, 0 0px 15px rgba(0, 0, 0, 0.04), 0 0px 2px rgba(0, 0, 0, 0.06))',
  l: 'var(--hiyf-shadow-l, 0 0px 20px rgba(0, 0, 0, 0.04), 0 0px 5px rgba(0, 0, 0, 0.06))',
  xl: 'var(--hiyf-shadow-xl, 0 0px 30px rgba(0, 0, 0, 0.04), 0 0px 10px rgba(0, 0, 0, 0.06))',
})

// ─── Breakpoints ──────────────────────────────────────────────────────────────

export const breakpoints = stylex.defineConsts({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
})

// ─── Motion ───────────────────────────────────────────────────────────────────
// Durations are vars so motion can be globally tuned (or zeroed for
// prefers-reduced-motion) by overriding the custom properties. Easings are
// compile-time constants — they never need to vary at runtime.
// ──────────────────────────────────────────────────────────────────────────────

export const durations = stylex.defineVars({
  instant: 'var(--hiyf-duration-instant, 0ms)',
  fast: 'var(--hiyf-duration-fast, 120ms)',
  base: 'var(--hiyf-duration-base, 200ms)',
  slow: 'var(--hiyf-duration-slow, 320ms)',
  slower: 'var(--hiyf-duration-slower, 480ms)',
})

export const easings = stylex.defineConsts({
  standard: 'cubic-bezier(0.2, 0, 0, 1)', // general-purpose, symmetric
  decelerate: 'cubic-bezier(0, 0, 0, 1)', // enter (fast → settle)
  accelerate: 'cubic-bezier(0.3, 0, 1, 1)', // exit (settle → fast)
  spring: 'cubic-bezier(0.5, 1.25, 0.4, 1)', // slight overshoot
})

// ─── Types ────────────────────────────────────────────────────────────────────

type StyleXTokenKeys<T> = Exclude<
  keyof T,
  '__opaqueId' | '__tokens' | symbol | 'toString' | 'valueOf' | 'description'
>

export type SpacingToken = StyleXTokenKeys<typeof spacing>
export type BackgroundColorToken = StyleXTokenKeys<typeof backgroundColors>
export type TextColorToken = StyleXTokenKeys<typeof textColors>
export type BorderColorToken = StyleXTokenKeys<typeof borderColors>
export type ColorToken =
  | BackgroundColorToken
  | TextColorToken
  | BorderColorToken
export type BorderRadiusToken = StyleXTokenKeys<typeof borderRadii>
export type ShadowToken = StyleXTokenKeys<typeof shadows>
export type BreakpointKey = keyof typeof breakpoints
export type DurationToken = StyleXTokenKeys<typeof durations>
export type EasingToken = keyof typeof easings
