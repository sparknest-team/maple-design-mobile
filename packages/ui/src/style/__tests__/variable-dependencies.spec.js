import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, relative, resolve } from 'node:path'
import { beforeAll, expect, it } from 'vitest'
import Themes from '../../themes'

const root = resolve(process.cwd(), 'src')
const less = createRequire(resolve(process.cwd(), '../cli/package.json'))('less')
const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = resolve(directory, entry.name)
    return entry.isDirectory() ? walk(filename) : [filename]
  })
const files = walk(root).filter((file) => !/\/(example|docs|__tests__|themes)\//.test(file))
const references = (value) =>
  [...value.matchAll(/var\(\s*(--[\w-]+)\s*([,)])/g)].map(([, name, delimiter]) => ({
    name,
    fallback: delimiter === ',',
  }))

// These values are assigned per instance, rather than by a theme stylesheet.
const runtimeVariables = new Set([
  '--mp-progress-group-percent',
  '--mp-col-order',
  ...['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].map((point) => `--mp-col-order-${point}`),
])
const declarations = new Map()
const consumers = []
const entries = files.filter((file) => file.endsWith('/style/index.ts') && !file.includes('/_components/'))

beforeAll(async () => {
  const visited = new Set()
  const visit = async (file) => {
    if (visited.has(file)) {
      return
    }
    visited.add(file)
    const source = readFileSync(file, 'utf8')
    if (file.endsWith('.less')) {
      const { css } = await less.render(source, { filename: file, javascriptEnabled: true })
      for (const [, name, value] of css.matchAll(/(--mp-[\w-]+)\s*:\s*([^;{}]+);/g)) {
        const values = declarations.get(name) ?? new Set()
        values.add(value)
        declarations.set(name, values)
      }
      consumers.push({ file: relative(root, file), references: references(css) })
      return
    }
    for (const [, specifier] of source.matchAll(/import\s+['"]([^'"]+)['"]/g)) {
      if (!specifier.startsWith('.')) {
        continue
      }
      const base = resolve(dirname(file), specifier)
      const target = [base, `${base}.ts`, resolve(base, 'index.ts')].find(
        (candidate) => existsSync(candidate) && statSync(candidate).isFile(),
      )
      if (target) {
        await visit(target)
      }
    }
  }
  for (const entry of entries) {
    await visit(entry)
  }
}, 30000)

it('resolves required variables in every public component stylesheet', () => {
  expect(entries.length).toBeGreaterThan(90)
  const missing = consumers.flatMap(({ file, references: refs }) =>
    refs
      .filter(({ name, fallback }) => !fallback && !declarations.has(name) && !runtimeVariables.has(name))
      .map(({ name }) => `${file}: ${name}`),
  )
  expect([...new Set(missing)]).toEqual([])
})

it('resolves literal variables used by component scripts and templates', () => {
  const missing = files
    .filter((file) => /\.(vue|tsx?)$/.test(file))
    .flatMap((file) =>
      references(readFileSync(file, 'utf8'))
        .filter(({ name, fallback }) => !fallback && !declarations.has(name) && !runtimeVariables.has(name))
        .map(({ name }) => `${relative(root, file)}: ${name}`),
    )
  expect([...new Set(missing)]).toEqual([])
})

for (const brand of ['default', 'maple', 'alps', 'firefly']) {
  for (const mode of ['light', 'dark']) {
    it(`resolves ${brand} ${mode} theme aliases without dependency cycles`, () => {
      const definitions = new Map(declarations)
      for (const [name, value] of Object.entries(Themes[brand][mode])) {
        definitions.set(name, new Set([String(value)]))
      }
      const errors = new Set()
      const checked = new Set()
      const visit = (name, chain = []) => {
        if (chain.includes(name)) {
          errors.add(`Cycle: ${[...chain, name].join(' -> ')}`)
          return
        }
        if (checked.has(name) || runtimeVariables.has(name)) {
          return
        }
        for (const value of definitions.get(name) ?? []) {
          for (const dependency of references(value)) {
            if (!definitions.has(dependency.name) && !runtimeVariables.has(dependency.name)) {
              if (!dependency.fallback) {
                errors.add(`${name}: ${dependency.name}`)
              }
            } else {
              visit(dependency.name, [...chain, name])
            }
          }
        }
        checked.add(name)
      }
      for (const name of definitions.keys()) {
        visit(name)
      }
      expect([...errors]).toEqual([])
    })
  }
}
