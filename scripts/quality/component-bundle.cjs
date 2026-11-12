const fs = require('node:fs'),
  path = require('node:path'),
  { createRequire } = require('node:module'),
  { gzipSync } = require('node:zlib')
const root = path.resolve(__dirname, '../..')
const req = createRequire(path.join(root, 'packages/cli/package.json'))
const esbuild = req('esbuild'),
  vue = req('@vue/compiler-sfc'),
  babel = req('@babel/core')
const assert = require('node:assert/strict')
const sourceRoot = fs.realpathSync(process.env.MAPLE_BUNDLE_SOURCE_ROOT || root)
const src = path.join(sourceRoot, 'packages/ui/src')
const entries = Object.fromEntries(
  fs
    .readdirSync(src, { withFileTypes: true })
    .filter(
      (d) =>
        d.isDirectory() &&
        !d.name.startsWith('_') &&
        !['utils', 'themes', 'style', 'types'].includes(d.name) &&
        fs.existsSync(path.join(src, d.name, 'index.ts')),
    )
    .map((d) => [d.name, path.join(src, d.name, 'index.ts')]),
)
const cache = new Map()
const plugin = {
  name: 'component-source',
  setup(build) {
    build.onLoad({ filter: /\.(vue|tsx)$/ }, ({ path: filename }) => {
      if (cache.has(filename)) {
        return cache.get(filename)
      }
      const source = fs.readFileSync(filename, 'utf8')
      let contents
      if (filename.endsWith('.vue')) {
        const { descriptor, errors } = vue.parse(source, { filename })
        if (errors.length) {
          throw errors[0]
        }
        if (descriptor.script || descriptor.scriptSetup) {
          const s = vue.compileScript(descriptor, {
            id: 'bundle-audit',
            fs: { fileExists: fs.existsSync, readFile: (p) => fs.readFileSync(p, 'utf8') },
            inlineTemplate: !!descriptor.scriptSetup,
            genDefaultAs: '__component',
          })
          contents = s.content
          if (!descriptor.scriptSetup && descriptor.template) {
            const t = vue.compileTemplate({
              source: descriptor.template.content,
              filename,
              id: 'bundle-audit',
              compilerOptions: { bindingMetadata: s.bindings },
            })
            if (t.errors.length) {
              throw t.errors[0]
            }
            contents +=
              '\n' + t.code.replace('export function render', 'function render') + '\n__component.render=render;'
          }
        } else {
          const t = vue.compileTemplate({ source: descriptor.template?.content || '', filename, id: 'bundle-audit' })
          if (t.errors.length) {
            throw t.errors[0]
          }
          contents = t.code.replace('export function render', 'function render') + '\nconst __component={render};'
        }
        contents += '\nexport default __component;'
      } else {
        contents = source
      }
      if (filename.endsWith('.tsx') || /lang\s*=\s*["']tsx["']/.test(source)) {
        contents = babel.transformSync(contents, {
          filename: filename + '.tsx',
          configFile: false,
          babelrc: false,
          presets: [[req.resolve('@babel/preset-typescript'), { allExtensions: true, isTSX: true }]],
          plugins: [req.resolve('@vue/babel-plugin-jsx')],
        }).code
      }
      const r = { contents, loader: 'ts', resolveDir: path.dirname(filename) }
      cache.set(filename, r)
      return r
    })
  },
}
;(async () => {
  console.log('Checking on-demand bundles:', Object.keys(entries).length)
  const runtime = {
    node: process.version,
    zlib: process.versions.zlib,
    esbuild: esbuild.version,
    platform: process.platform,
    arch: process.arch,
  }
  console.log('Bundle runtime:', JSON.stringify(runtime))
  const result = await esbuild.build({
    absWorkingDir: root,
    entryPoints: entries,
    outdir: path.join(root, '.bundle-audit'),
    bundle: true,
    write: false,
    splitting: false,
    minify: true,
    format: 'esm',
    external: ['vue', 'vue/*'],
    metafile: true,
    logLevel: 'silent',
    alias: {
      '@maple-design/shared-vue': path.join(sourceRoot, 'packages/shared/src/index.ts'),
      '@maple-design/use-vue': path.join(sourceRoot, 'packages/use/src/index.ts'),
      '@maple-design/icons-vue/style.css': path.join(sourceRoot, 'packages/icons/style.css'),
      '@maple-design/icons-vue': path.join(sourceRoot, 'packages/icons/src/index.ts'),
    },
    loader: {
      '.less': 'empty',
      '.css': 'empty',
      '.svg': 'dataurl',
      '.png': 'dataurl',
      '.jpg': 'dataurl',
      '.woff2': 'dataurl',
    },
    plugins: [plugin],
  })
  const rows = []
  const retainedInputs = {}
  for (const file of result.outputFiles) {
    if (!file.path.endsWith('.js')) {
      continue
    }
    const name = path.basename(file.path, '.js')
    const output = Object.values(result.metafile.outputs).find(
      (o) => o.entryPoint && path.resolve(root, o.entryPoint) === entries[name],
    )
    if (!output) {
      continue
    }
    const inc = Object.entries(output.inputs).filter(([, x]) => x.bytesInOutput > 0)
    if (
      [
        'alert',
        'loading',
        'card',
        'tag',
        'empty',
        'page-header',
        'breadcrumb',
        'index-bar',
        'image',
        'upload',
        'split-button',
        'infinite-scroll',
        'field-decorator',
        'input',
        'input-number',
        'textarea',
        'select',
        'cascader',
        'checkbox',
        'radio',
        'pagination',
        'search',
        'people-select',
        'picker',
        'time',
        'time-range',
        'date',
        'date-range',
        'table',
        'dialog',
        'carousel',
        'action-sheet',
        'fab',
        'notice-bar',
        'number-keyboard',
        'tabs',
      ].includes(name)
    ) {
      assert.equal(
        inc.some(([filename]) => /[/\\]locale[/\\]index\.ts$/.test(filename)),
        false,
        `${name} must not pull in the public locale module for its default text`,
      )
    }
    const loadingDirective = inc.some(([filename]) => /[/\\]loading[/\\]directive\.ts$/.test(filename))
    if (['auto-complete', 'cascader', 'pagination', 'people-select', 'search', 'select'].includes(name)) {
      assert.equal(
        inc.some(([filename]) => /[/\\]input[/\\]index\.ts$/.test(filename)),
        false,
        `${name} must not bundle the public Input entry and its unrelated subcomponents`,
      )
    }
    if (
      [
        'cascader',
        'select',
        'picker',
        'time',
        'time-range',
        'date',
        'date-range',
        'search',
        'people-select',
        'card',
        'dialog',
        'fab',
        'tab-bar',
      ].includes(name)
    ) {
      assert.equal(
        inc.some(([filename]) => /[/\\]button[/\\]index\.ts$/.test(filename)),
        false,
        `${name} must not bundle the public Button entry and its group`,
      )
    }
    if (name === 'cascader') {
      assert.equal(
        inc.some(([filename]) => /[/\\]checkbox[/\\]index\.ts$/.test(filename)),
        false,
        'Cascader must not bundle the public Checkbox entry and its group',
      )
    }
    if (['time', 'time-range', 'date', 'date-range'].includes(name)) {
      assert.equal(
        inc.some(([filename]) => /[/\\]picker[/\\]index\.ts$/.test(filename)),
        false,
        `${name} must not bundle the imperative Picker service`,
      )
    }
    if (name === 'button' || name === 'checkbox') {
      const group = name === 'button' ? 'ButtonGroup.vue' : 'CheckboxGroup.vue'
      assert.equal(
        inc.some(([filename]) => filename.replace(/\\/g, '/').endsWith(`/${group}`)),
        true,
        `The public ${name} entry must retain its group`,
      )
    }
    if (name === 'button') {
      assert.equal(loadingDirective, false, 'Button must not bundle the standalone Loading directive')
    } else if (name === 'loading') {
      assert.equal(loadingDirective, true, 'The public Loading entry must retain its directive')
    }
    if (['trigger', 'tooltip', 'popover', 'ellipsis'].includes(name)) {
      assert.deepEqual(
        inc.filter(([filename]) => filename.includes('node_modules/')).map(([filename]) => filename),
        [],
        `${name} must not retain third-party runtime dependencies (Vue is external)`,
      )
      assert.doesNotMatch(file.text, /data-popup-container/, 'Development-only prop validators must be removed')
    }
    retainedInputs[name] = inc.map(([file, metadata]) => ({ file, bytes: metadata.bytesInOutput }))
    rows.push({
      name,
      bytes: file.contents.length,
      gzip: gzipSync(file.contents).length,
      rattailBytes: inc.filter(([p]) => p.includes('/rattail/')).reduce((sum, [, m]) => sum + m.bytesInOutput, 0),
      mittBytes: inc.filter(([p]) => p.includes('/mitt/')).reduce((sum, [, m]) => sum + m.bytesInOutput, 0),
    })
  }
  // Shared utilities are local static modules; components must not retain rattail or mitt.
  assert.equal(rows.length, Object.keys(entries).length)
  assert.deepEqual(
    rows.filter((r) => r.mittBytes).map((r) => r.name),
    [],
    'Component bundles must not retain unused mitt',
  )
  assert.ok(
    rows.every((r) => r.rattailBytes === 0),
    'A component retained the removed rattail dependency',
  )
  if (process.env.MAPLE_BUNDLE_REPORT) {
    fs.writeFileSync(process.env.MAPLE_BUNDLE_REPORT, JSON.stringify(rows, null, 2) + '\n')
    fs.writeFileSync(process.env.MAPLE_BUNDLE_REPORT + '.inputs.json', JSON.stringify(retainedInputs, null, 2) + '\n')
    fs.writeFileSync(process.env.MAPLE_BUNDLE_REPORT + '.runtime.json', JSON.stringify(runtime, null, 2) + '\n')
  }
  // Entry caps cover shared-tool consolidation and floating-entry slimming; Vue is external and CSS excluded.
  // Override the file to compare a separately captured MAPLE_BUNDLE_REPORT.
  {
    const baselinePath = process.env.MAPLE_BUNDLE_BASELINE || path.join(__dirname, 'component-bundle.baseline.json')
    const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'))
    const limits = new Map(baseline.map((row) => [row.name, row]))
    const regressions = rows.flatMap((row) => {
      const limit = limits.get(row.name)
      assert.ok(limit, `Missing on-demand size baseline: ${row.name}`)
      return row.bytes > limit.bytes || row.gzip > limit.gzip
        ? [{ name: row.name, bytes: row.bytes - limit.bytes, gzip: row.gzip - limit.gzip }]
        : []
    })
    assert.deepEqual(regressions, [], 'On-demand JS size exceeded the supplied baseline')
  }
  console.log(
    JSON.stringify(
      {
        entries: rows.length,
        rattail: rows.filter((r) => r.rattailBytes).length,
        mitt: rows.filter((r) => r.mittBytes).length,
        samples: rows.filter((r) =>
          [
            'button',
            'space',
            'icon',
            'cell',
            'swipe-cell',
            'picker',
            'date',
            'image',
            'tooltip',
            'tag',
            'checkbox',
          ].includes(r.name),
        ),
      },
      null,
      2,
    ),
  )
})().catch((e) => {
  console.error(e)
  process.exitCode = 1
})
