import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// StyleX resolves cross-file `defineVars` tokens relative to this root, so it
// must sit above both the sandbox and the HIYF package.
const monorepoRoot = path.resolve(__dirname, '../..')

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            '@stylexjs/babel-plugin',
            {
              dev: true,
              // Inject compiled styles at runtime — no PostCSS/build step needed
              // for the dev sandbox.
              runtimeInjection: true,
              treeshakeCompensation: true,
              unstable_moduleResolution: {
                type: 'commonJS',
                rootDir: monorepoRoot,
              },
            },
          ],
        ],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    // The published package now resolves `hiyf` to compiled dist. For the dev
    // sandbox we want the SOURCE instead, so edits hot-reload and the StyleX
    // babel plugin above compiles the primitives live. Match only the bare
    // specifier so `hiyf/theme.css` still resolves via the package exports.
    alias: [
      {
        find: /^@jackbernnie\/hiyf$/,
        replacement: path.resolve(monorepoRoot, 'packages/hiyf/src/index.ts'),
      },
    ],
  },
  server: { port: 5180, open: false },
})
