import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
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
    assert.equal(vitest.config.poolOptions?.forks?.singleFork ?? false, false, 'isolated runs retain parallel forks')
    // Vitest 5 resolves specifiers to real paths, so compare against the
    // realpath'd root (macOS /var is a symlink to /private/var).
    const files = (await vitest.globTestSpecifications())
      .map((spec) => relative(realpathSync(directory), spec.moduleId))
      .sort()
    assert.deepEqual(files, ['src/example.spec.ts', 'src/other.test.tsx'])
  } finally {
    await vitest?.close()
    rmSync(directory, { recursive: true, force: true })
  }
})

test('Vue render and Test Utils retain the current DOM realm across test files', { timeout: 120_000 }, async (t) => {
  const uiRequire = createRequire(resolve(root, 'packages/ui/package.json'))
  const vitestBin = resolve(dirname(uiRequire.resolve('vitest/package.json')), 'vitest.mjs')
  for (const variant of [
    { pool: 'forks', isolate: true },
    { pool: 'forks', isolate: false },
    { pool: 'threads', isolate: false },
  ]) {
    await t.test(`${variant.pool} isolate=${variant.isolate}`, async () => {
      const directory = realpathSync(mkdtempSync(resolve(tmpdir(), 'maple-vue-dom-realm-')))
      try {
        symlinkSync(resolve(root, 'packages/ui/node_modules'), resolve(directory, 'node_modules'), 'dir')
        mkdirSync(resolve(directory, 'src'))
        writeFileSync(
          resolve(directory, 'src/factory.ts'),
          `
import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
export const importedDocument = document
export function fixture() {
  return mount(defineComponent({
    setup() {
      const count = ref(0)
      return () => h('button', { onClick: () => count.value++ }, String(count.value))
    },
  }))
}
`,
        )
        for (const name of ['first', 'second', 'third']) {
          writeFileSync(
            resolve(directory, `src/${name}.spec.ts`),
            `
import { expect, test } from 'vitest'
import { fixture, importedDocument } from './factory'
test('${name}: cached Vue nodes match the current jsdom realm', async () => {
  expect(importedDocument).toBe(document)
  const wrapper = fixture()
  try {
    const button = wrapper.get('button')
    expect(button.element.ownerDocument).toBe(document)
    expect(button.element).toBeInstanceOf(HTMLElement)
    await button.trigger('click')
    expect(button.text()).toBe('1')
  } finally { wrapper.unmount() }
})
`,
          )
        }
        const configured = await createVitest('test', {
          root: directory,
          config: resolve(root, 'packages/cli/lib/node/config/vitest.config.js'),
          pool: variant.pool,
          isolate: variant.isolate,
          watch: false,
        })
        try {
          assert.equal(configured.config.isolate, variant.isolate, 'the requested isolation mode is preserved')
          // Vitest 5 removed `poolOptions`; pinning one worker is expressed as maxWorkers.
          if (!variant.isolate) {
            assert.equal(configured.config.maxWorkers, 1, 'non-isolated runs pin a single worker')
          } else {
            assert.ok(configured.config.maxWorkers > 1, 'isolated runs keep parallel workers')
          }
        } finally {
          await configured.close()
        }
        const result = spawnSync(
          process.execPath,
          [
            vitestBin,
            'run',
            '--root',
            directory,
            '--config',
            resolve(root, 'packages/cli/lib/node/config/vitest.config.js'),
            '--pool',
            variant.pool,
            `--isolate=${variant.isolate}`,
            '--maxWorkers=1',
            '--reporter=dot',
            '--no-color',
          ],
          { cwd: resolve(root, 'packages/ui'), encoding: 'utf8', timeout: 90_000, maxBuffer: 2 * 1024 * 1024 },
        )
        assert.equal(result.status, 0, `${result.error ?? ''}\n${result.stdout}\n${result.stderr}`)
        assert.match(result.stdout, /3 passed/)
      } finally {
        rmSync(directory, { recursive: true, force: true })
      }
    })
  }
})
