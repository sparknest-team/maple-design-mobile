import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

const root = fileURLToPath(new URL('../../', import.meta.url))
const require = createRequire(resolve(root, 'packages/maple-cli/package.json'))
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

for (const entry of ['index.ts', 'Icon.vue', 'RegisteredIcon.vue']) {
  test(`Icon on-demand bundle: ${entry}`, async () => {
    const result = await esbuild.build({
      absWorkingDir: root,
      entryPoints: [`packages/maple-ui/src/icon/${entry}`],
      bundle: true,
      write: false,
      minify: true,
      format: 'esm',
      external: ['vue'],
      metafile: true,
      logLevel: 'silent',
      alias: {
        '@maplejs/maple-shared': resolve(root, 'packages/maple-shared/src/index.ts'),
        '@maplejs/maple-use': resolve(root, 'packages/maple-use/src/index.ts'),
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
    // Leave headroom for features while rejecting the previous ~8 KB utility-heavy bundle.
    assert.ok(gzipBytes < 4096, `${entry}: ${gzipBytes} gzip bytes exceeds the 4 KiB budget`)
    console.info(
      `${entry}: ${result.outputFiles[0].contents.length} minified bytes, ${gzipBytes} gzip bytes (Vue external)`,
    )
  })
}
