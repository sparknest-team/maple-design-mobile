import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtemp, rm } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const require = createRequire(resolve(root, 'packages/cli/package.json'))
const esbuild = require('esbuild')
const consumerDir = process.env.MAPLE_INSTALL_TEST_CONSUMER || resolve(root, 'packages/ui-playground')

const registrySource = `import { createApp } from 'vue'
import Library from '@maple-design/ui-vue'
const app = createApp({})
app.use(Library)
console.log(JSON.stringify({ components: Object.keys(app._context.components).sort(), directives: Object.keys(app._context.directives).sort() }))`

test('production bundle retains all aggregate registrations', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'maple-install-bundle-'))
  try {
    const baseline = JSON.parse(
      execFileSync(process.execPath, ['--input-type=module', '-e', registrySource], {
        cwd: consumerDir,
        encoding: 'utf8',
      }),
    )
    for (const name of ['MpIcon', 'MpPopup', 'MpTag', 'MpCell', 'MpButton', 'MpTabBar']) {
      assert.ok(baseline.components.includes(name), `${name} is missing from the unbundled library`)
    }
    const outfile = join(directory, 'consumer.mjs')
    await esbuild.build({
      stdin: { contents: registrySource, resolveDir: consumerDir, sourcefile: 'consumer.js' },
      bundle: true,
      platform: 'node',
      format: 'esm',
      outfile,
      logLevel: 'silent',
    })
    const bundled = JSON.parse(execFileSync(process.execPath, [outfile], { encoding: 'utf8' }))
    assert.deepEqual(bundled, baseline)
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})

test('named Icon import from the root remains tree-shakeable', async () => {
  const result = await esbuild.build({
    stdin: {
      contents: "import { Icon } from '@maple-design/ui-vue'; console.log(Icon)",
      resolveDir: consumerDir,
      sourcefile: 'consumer.js',
    },
    bundle: true,
    platform: 'browser',
    format: 'esm',
    external: ['vue'],
    minify: true,
    write: false,
    logLevel: 'silent',
  })
  assert.ok(result.outputFiles[0].contents.length < 10_000, 'root Icon import must not retain the full library')
})

test('named and subpath components remain individually installable', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'maple-individual-install-'))
  try {
    const outfile = join(directory, 'consumer.mjs')
    await esbuild.build({
      stdin: {
        contents: `import { createApp } from 'vue'
import { Icon, Popup } from '@maple-design/ui-vue'
import Tag from '@maple-design/ui-vue/tag'
const app = createApp({})
for (const plugin of [Icon, Popup, Tag]) {
  if (typeof plugin.setPropsDefaults !== 'function') throw new Error('Missing defaults setter')
  app.use(plugin)
}
for (const name of ['MpIcon', 'MpPopup', 'MpTag']) {
  if (!app.component(name)) throw new Error('Missing ' + name)
}`,
        resolveDir: consumerDir,
        sourcefile: 'consumer.js',
      },
      bundle: true,
      platform: 'node',
      format: 'esm',
      outfile,
      logLevel: 'silent',
    })
    assert.doesNotThrow(() => execFileSync(process.execPath, [outfile], { stdio: 'pipe' }))
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})

test('browser consumers can bundle NavMenu without package imports support', async () => {
  const result = await esbuild.build({
    stdin: {
      contents: "export { default } from '@maple-design/ui-vue/nav-menu'",
      resolveDir: consumerDir,
    },
    platform: 'browser',
    format: 'esm',
    bundle: true,
    metafile: true,
    write: false,
    plugins: [
      {
        name: 'legacy-package-resolution',
        setup(build) {
          build.onResolve({ filter: /^#/ }, ({ path }) => ({
            errors: [{ text: `Unsupported package import: ${path}` }],
          }))
        },
      },
    ],
  })
  const inputs = Object.keys(result.metafile.inputs)
  assert.ok(inputs.some((path) => path.endsWith('/ssr-browser.mjs')))
  assert.ok(!inputs.some((path) => path.includes('/@vue/server-renderer/')))
})
