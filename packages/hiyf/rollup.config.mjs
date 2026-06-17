import path from 'node:path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import preserveDirectives from 'rollup-plugin-preserve-directives'
import stylexPlugin from '@stylexjs/rollup-plugin'

const root = path.resolve(import.meta.dirname)

// Bundle only our own source; leave every third-party (and peer) import as a
// runtime dependency the consumer already has.
const external = (id) => !id.startsWith('.') && !path.isAbsolute(id)

export default {
  input: {
    index: 'src/index.ts',
    'tokens/tokens.stylex': 'src/tokens/tokens.stylex.ts',
  },
  external,
  // preserveModules keeps the file-per-module structure, which preserves each
  // component's 'use client' directive for React Server Components.
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src',
    entryFileNames: '[name].js',
    assetFileNames: '[name][extname]',
  },
  plugins: [
    nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json'] }),
    // Compiles stylex.create()/defineVars() to static atomic classes at build
    // time and extracts them into dist/stylex.css — so consumers need NO StyleX
    // bundler plugin. runtimeInjection:false = no CSS-in-JS at runtime.
    stylexPlugin({
      fileName: 'stylex.css',
      dev: false,
      runtimeInjection: false,
      treeshakeCompensation: true,
      unstable_moduleResolution: { type: 'commonJS', rootDir: root },
    }),
    esbuild({ target: 'es2022', jsx: 'automatic', minify: false }),
    // Re-attach 'use client' / 'use server' directives that Rollup would
    // otherwise drop, so React Server Components consumers keep working.
    preserveDirectives(),
  ],
  onwarn(warning, warn) {
    // Keep 'use client' directives; don't nag about them or benign circulars.
    if (
      warning.code === 'MODULE_LEVEL_DIRECTIVE' ||
      warning.code === 'CIRCULAR_DEPENDENCY'
    )
      return
    warn(warning)
  },
}
