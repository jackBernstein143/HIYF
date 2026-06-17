// Normalize React directives in the build output.
//
// The transpile/StyleX passes are inconsistent about module directives: babel
// injects a spurious "use strict" and sometimes drops the original
// 'use client'. This step makes dist match SOURCE exactly — every compiled file
// gets the same leading directive its source had (and no stray "use strict").
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const SRC = new URL('../src/', import.meta.url).pathname
const DIST = new URL('../dist/', import.meta.url).pathname

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })

// Map "components/Box" -> 'use client' | 'use server' for every source file
// whose first statement is that directive.
const directiveByModule = new Map()
const DIRECTIVE = /^\s*['"]use (client|server)['"]\s*;?/
for (const file of walk(SRC)) {
  if (!/\.(ts|tsx)$/.test(file)) continue
  const m = readFileSync(file, 'utf8').match(DIRECTIVE)
  if (m) {
    const key = relative(SRC, file).replace(/\.(ts|tsx)$/, '')
    directiveByModule.set(key, `'use ${m[1]}';`)
  }
}

let fixed = 0
for (const file of walk(DIST)) {
  if (!file.endsWith('.js')) continue
  let code = readFileSync(file, 'utf8')
  // Strip any leading "use strict" / stale "use client|server".
  code = code.replace(/^(\s*['"]use (strict|client|server)['"]\s*;?\s*\n)+/, '')
  const key = relative(DIST, file).replace(/\.js$/, '')
  const directive = directiveByModule.get(key)
  if (directive) code = `${directive}\n${code}`
  writeFileSync(file, code)
  if (directive) fixed++
}
console.log(`fix-directives: applied 'use client'/'use server' to ${fixed} files`)
