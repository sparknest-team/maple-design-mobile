import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { expect, it } from 'vitest'

const less = createRequire(resolve(process.cwd(), '../cli/package.json'))('less')

it('resolves timeline token dependencies from the Maple foundation', async () => {
  const filename = resolve(process.cwd(), 'src/timeline/style/token.less')
  const { css } = await less.render(`@import '../../style/index.less';\n${readFileSync(filename, 'utf8')}`, {
    filename,
  })
  const declarations = new Map([...css.matchAll(/(--mp-[\w-]+)\s*:\s*([^;{}]+);/g)].map((m) => [m[1], m[2]]))
  const checkDependencies = (name, seen = new Set()) => {
    expect(declarations.has(name), `Missing CSS variable: ${name}`).toBe(true)
    expect(seen.has(name), `Circular CSS variable: ${name}`).toBe(false)
    for (const [, dependency] of declarations.get(name).matchAll(/var\(\s*(--mp-[\w-]+)/g)) {
      checkDependencies(dependency, new Set([...seen, name]))
    }
  }
  const tokens = [...declarations.keys()].filter((name) => name.startsWith('--mp-timeline-'))
  expect(tokens.length).toBeGreaterThan(0)
  tokens.forEach((name) => checkDependencies(name))
})
