import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

const root = fileURLToPath(new URL('../../', import.meta.url))
const require = createRequire(resolve(root, 'packages/cli/package.json'))
const esbuild = require('esbuild')
const { parse, compileScript } = require('@vue/compiler-sfc')

// Build source directly: checking on-demand output must not overwrite published es/lib artifacts.
const vueSfc = {
  name: 'icon-bundle-vue-sfc',
  setup(build) {
    build.onLoad({ filter: /\.vue$/ }, ({ path }) => {
      const { descriptor, errors } = parse(readFileSync(path, 'utf8'), { filename: path })
      assert.deepEqual(errors, [])
      const script = compileScript(descriptor, { id: 'icon-bundle-check', inlineTemplate: true })
      return { contents: script.content, loader: 'ts', resolveDir: dirname(path) }
    })
  },
}

// Gzip ceilings retain the pre-consolidation budget. Minified ceilings include
// the reviewed slot-ownership guard, named export, and retained installer (+55 / +6 / +3 bytes).
const budgets = {
  'index.ts': { minified: 3786, gzip: 1915 },
  'Icon.vue': { minified: 3005, gzip: 1561 },
  'RegisteredIcon.vue': { minified: 3633, gzip: 1786 },
}

for (const [entry, budget] of Object.entries(budgets)) {
  test(`Icon on-demand bundle: ${entry}`, async () => {
    const result = await esbuild.build({
      absWorkingDir: root,
      entryPoints: [`packages/ui/src/icon/${entry}`],
      bundle: true,
      write: false,
      minify: true,
      format: 'esm',
      external: ['vue'],
      metafile: true,
      logLevel: 'silent',
      alias: {
        '@maple-design/shared-vue': resolve(root, 'packages/shared/src/index.ts'),
        '@maple-design/use-vue': resolve(root, 'packages/use/src/index.ts'),
      },
      plugins: [vueSfc],
    })
    const included = Object.values(result.metafile.outputs).flatMap((output) =>
      Object.entries(output.inputs)
        .filter(([, input]) => input.bytesInOutput > 0)
        .map(([path]) => path),
    )
    assert.equal(
      included.some((path) => /node_modules\/(?:.*\/)?(?:rattail|mitt)\//.test(path)),
      false,
      `Icon must not include unrelated shared utilities: ${included.join(', ')}`,
    )
    const gzipBytes = gzipSync(result.outputFiles[0].contents).length
    assert.ok(
      gzipBytes <= budget.gzip,
      `${entry}: ${gzipBytes} gzip bytes exceeds the pre-consolidation ${budget.gzip} byte budget`,
    )
    assert.ok(
      result.outputFiles[0].contents.length <= budget.minified,
      `${entry}: minified bytes exceed the reviewed Icon contract ${budget.minified} byte budget`,
    )
    assert.doesNotMatch(
      result.outputFiles[0].text,
      /:not\(\[disabled\]\)/,
      'Icon must not retain unrelated focus selectors',
    )
    assert.equal(
      included.some((path) => /shared\/src\/(?:object|motion|dom|function|number|array)\.ts$/.test(path)),
      false,
      'Icon must only retain the shared utilities it uses',
    )
    console.info(
      `${entry}: ${result.outputFiles[0].contents.length} minified bytes, ${gzipBytes} gzip bytes (Vue external)`,
    )
  })
}
