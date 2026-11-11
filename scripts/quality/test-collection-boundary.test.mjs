import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, relative, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const require = createRequire(resolve(root, 'packages/cli/package.json'))
const { createVitest } = await import(pathToFileURL(require.resolve('vitest/node')).href)

test('library test discovery includes authored tests and excludes copied documentation tests', async () => {
  const directory = mkdtempSync(resolve(tmpdir(), 'maple-test-discovery-'))
  let vitest
  try {
    for (const file of [
      'src/example.spec.ts',
      'src/other.test.tsx',
      '.maple/site/copied.spec.ts',
      'site/outside.spec.ts',
    ]) {
      mkdirSync(dirname(resolve(directory, file)), { recursive: true })
      writeFileSync(resolve(directory, file), 'throw new Error("discovery must not execute this file")\n')
    }
    // Exercise Vitest's actual discovery API without starting a second CLI
    // process or workers merely to list files.
    vitest = await createVitest('test', {
      root: directory,
      config: resolve(root, 'packages/cli/lib/node/config/vitest.config.js'),
      watch: false,
    })
    const files = (await vitest.globTestSpecifications()).map((spec) => relative(directory, spec.moduleId)).sort()
    assert.deepEqual(files, ['src/example.spec.ts', 'src/other.test.tsx'])
  } finally {
    await vitest?.close()
    rmSync(directory, { recursive: true, force: true })
  }
})
