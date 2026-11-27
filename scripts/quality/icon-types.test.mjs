import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, readdirSync, rmSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import ts from 'typescript-js'

const iconRoot = fileURLToPath(new URL('../../packages/icons/', import.meta.url))

test('published icon declarations resolve without consumer paths in legacy and modern modes', (t) => {
  const fixture = mkdtempSync(join(tmpdir(), 'maple-icon-types-'))
  t.after(() => rmSync(fixture, { recursive: true, force: true }))
  const scope = join(fixture, 'node_modules/@maple-design')
  mkdirSync(scope, { recursive: true })
  symlinkSync(iconRoot, join(scope, 'icons-vue'), 'dir')

  // Use the built declarations, as an installed application does. The quality
  // pipeline builds the library before running this regression.
  const icons = readdirSync(join(iconRoot, 'types'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('icon-'))
    .map((entry) => entry.name)
  assert.ok(icons.length > 0, 'Build the icon package before running this check')

  for (const mode of ['Node10', 'Bundler', 'NodeNext']) {
    for (const subpath of ['', ...icons]) {
      const name = `@maple-design/icons-vue${subpath ? `/${subpath}` : ''}`
      const result = ts.resolveModuleName(
        name,
        join(fixture, 'components.d.ts'),
        { moduleResolution: ts.ModuleResolutionKind[mode] },
        ts.sys,
        undefined,
        undefined,
        ts.ModuleKind.ESNext,
      ).resolvedModule
      const expected = subpath ? `/types/${subpath}/index.d.ts` : '/types/index.d.ts'
      assert.ok(result?.resolvedFileName.endsWith(expected), `${mode}: ${name} must resolve to ${expected}`)
    }
  }
})
