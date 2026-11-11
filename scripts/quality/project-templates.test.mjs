import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { delimiter, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const require = createRequire(resolve(root, 'packages/ui-playground/package.json'))
const ts = createRequire(resolve(root, 'packages/cli/package.json'))('typescript')
const read = (path) => readFileSync(resolve(root, path), 'utf8')
async function loadPureModule(path) {
  const { outputText } = ts.transpileModule(read(path), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  })
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
}
const template = JSON.parse(read('packages/ui-playground/src/download/template/package.json'))

test('downloaded app is private and retains the selected UI/Vue dependency versions', async () => {
  const { createDownloadManifest } = await loadPureModule('packages/ui-playground/src/download/manifest.ts')
  const pkg = createDownloadManifest(
    template,
    { mapleVersion: '1.2.3', vueVersion: '3.5.14', typescriptVersion: '5.7.3' },
    { mapleVersion: '1.1.0', vueVersion: '3.5.13', typescriptVersion: '5.6.3' },
  )
  assert.equal(pkg.private, true)
  assert.equal(pkg.name, 'maple-playground-demo-vue')
  assert.equal(pkg.dependencies['@maple-design/ui-vue'], '1.2.3')
  assert.equal(pkg.dependencies['@maple-design/touch-emulator-vue'], '1.2.3')
  assert.equal(pkg.dependencies.vue, '3.5.14')
  assert.equal(pkg.devDependencies.typescript, '5.7.3')
  const preview = createDownloadManifest(
    template,
    { mapleVersion: 'preview' },
    { mapleVersion: '1.1.0', vueVersion: '3.5.13', typescriptVersion: '5.6.3' },
  )
  assert.equal(preview.dependencies['@maple-design/ui-vue'], '1.1.0')
  assert.equal(preview.devDependencies.typescript, '5.6.3')
  assert.equal(template.dependencies['@maple-design/ui-vue'], 'latest')
})
test('downloaded imports and extension JSON files resolve through real package exports', () => {
  const source = read('packages/ui-playground/src/download/template/main.js')
  for (const [, name] of source.matchAll(/(?:from\s+|import\s*)['"](@maple-design\/[^'"]+)['"]/g)) {
    assert.ok(existsSync(require.resolve(name)), name)
  }
  for (const name of [
    '@maple-design/ui-vue/utilities/style',
    '@maple-design/ui-vue/json/area.json',
    '@maple-design/ui-vue/highlight/web-types.en-US.json',
    '@maple-design/ui-vue/highlight/web-types.zh-CN.json',
  ]) {
    assert.ok(existsSync(require.resolve(name)), name)
  }
})
test('browser package URLs resolve dependencies and preserve the same selected version for JS and CSS', async () => {
  const { getMaplePackageUrls } = await loadPureModule('packages/ui-playground/src/utils/package-urls.ts')
  const selected = getMaplePackageUrls('1.2.3')
  assert.equal(new URL(selected.module).searchParams.get('external'), 'vue')
  for (const url of Object.values(selected)) {
    assert.match(url, /@1\.2\.3/)
  }
  assert.match(getMaplePackageUrls('latest').module, /esm\.sh\/@maple-design\/ui-vue\?/)
  assert.equal(getMaplePackageUrls('preview').module, './maple.esm.js')
  assert.equal(getMaplePackageUrls('preview').touchEmulator, './touch-emulator.js')
})
test('real compiled CLI honors --locale and writes a standalone package with the requested name', (t) => {
  const folder = mkdtempSync(resolve(tmpdir(), 'maple-template-cli-'))
  t.after(() => rmSync(folder, { recursive: true, force: true }))
  const result = spawnSync(
    process.execPath,
    [resolve(root, 'packages/cli/bin/cli.mjs'), 'gen', '--name', 'example-ui-vue', '--sfc', '--locale'],
    { cwd: folder, encoding: 'utf8', timeout: 30000 },
  )
  assert.equal(result.status, 0, result.stderr)
  const pkg = JSON.parse(readFileSync(resolve(folder, 'example-ui-vue/package.json'), 'utf8'))
  assert.equal(pkg.name, 'example-ui-vue')
  assert.match(pkg.devDependencies['@maple-design/ui-vue'], /^\^\d/)
  assert.ok(
    Object.values(pkg.devDependencies).every(
      (version) => !version.startsWith('workspace:') && !version.startsWith('catalog:'),
    ),
  )
  assert.ok(existsSync(resolve(folder, 'example-ui-vue/src/locale')))
})

for (const style of ['sfc', 'tsx']) {
  for (const locale of [false, true]) {
    test(`generated ${style} library (locale=${locale}) compiles and packs every public entry`, (t) => {
      const folder = mkdtempSync(resolve(tmpdir(), 'maple-template-build-'))
      t.after(() => rmSync(folder, { recursive: true, force: true }))
      const project = resolve(folder, 'example-ui-vue')
      const generator = new URL('../../packages/cli/lib/node/commands/gen.js', import.meta.url).href
      const generate = spawnSync(
        process.execPath,
        [
          '--input-type=module',
          '-e',
          `import { gen } from ${JSON.stringify(generator)}; await gen(${JSON.stringify({ name: 'example-ui-vue', [style]: true, locale })})`,
        ],
        { cwd: folder, encoding: 'utf8', timeout: 30000 },
      )
      assert.equal(generate.status, 0, generate.stdout + generate.stderr)
      symlinkSync(resolve(root, 'packages/ui/node_modules'), resolve(project, 'node_modules'), 'dir')
      const env = {
        ...process.env,
        PATH: [resolve(project, 'node_modules/.bin'), resolve(root, 'node_modules/.bin'), process.env.PATH].join(
          delimiter,
        ),
      }
      const compile = spawnSync(process.execPath, [resolve(root, 'packages/cli/bin/cli.mjs'), 'compile'], {
        cwd: project,
        env,
        encoding: 'utf8',
        timeout: 120000,
      })
      assert.equal(compile.status, 0, compile.stdout + compile.stderr)
      const pkg = JSON.parse(readFileSync(resolve(project, 'package.json'), 'utf8'))
      for (const field of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
        for (const version of Object.values(pkg[field] ?? {})) {
          assert.doesNotMatch(version, /^(workspace|catalog):/)
        }
      }
      assert.match(pkg.dependencies['@maple-design/shared-vue'], /^\^\d/)
      assert.match(readFileSync(resolve(project, 'types-generated/global.d.ts'), 'utf8'), /VaButton/)
      for (const field of ['main', 'module', 'typings', 'style']) {
        assert.ok(existsSync(resolve(project, pkg[field])), field)
      }
      const consume = spawnSync(
        process.execPath,
        [
          '-e',
          `const x=require('example-ui-vue'); if(x._ButtonComponent.name!=='VaButton')throw new Error('Invalid component');require('example-ui-vue/button');`,
        ],
        {
          cwd: project,
          env,
          encoding: 'utf8',
          timeout: 30000,
        },
      )
      assert.equal(consume.status, 0, consume.stderr)
      const packed = spawnSync('pnpm', ['pack', '--pack-destination', resolve(folder, 'tarballs')], {
        cwd: project,
        env,
        encoding: 'utf8',
        timeout: 30000,
      })
      assert.equal(packed.status, 0, packed.stderr)
      const archive = resolve(
        folder,
        'tarballs',
        readdirSync(resolve(folder, 'tarballs')).find((file) => file.endsWith('.tgz')),
      )
      const listing = spawnSync('tar', ['-tzf', archive], { encoding: 'utf8' })
      assert.equal(listing.status, 0, listing.stderr)
      const files = new Set(listing.stdout.trim().split('\n'))
      for (const file of [
        'types-generated/index.d.ts',
        'types-generated/global.d.ts',
        'types-generated/button/index.d.ts',
        'es/index.mjs',
        'lib/index.js',
        'es/library.css',
        'es/button/index.mjs',
        'lib/button/index.js',
        'es/button/style/index.mjs',
        'lib/button/style/index.js',
      ]) {
        assert.ok(files.has(`package/${file}`), `Missing packed public entry: ${file}`)
      }
    })
  }
}

test('generic entry generation preserves the official UI optional public exports', () => {
  const generator = new URL('../../packages/cli/lib/node/compiler/generateLibraryEntry.js', import.meta.url).href
  const result = spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `import {publicContractExports} from ${JSON.stringify(generator)}; console.log(publicContractExports(['loading','image','upload','hover','form','field-decorator']).join('\u005cn'))`,
    ],
    {
      cwd: resolve(root, 'packages/ui'),
      encoding: 'utf8',
      timeout: 30000,
    },
  )
  assert.equal(result.status, 0, result.stderr)
  for (const token of [
    'vLoading',
    'LoadingDirectiveOptions',
    'imagePreview',
    'useUploader',
    'useHoverOverlay',
    'useFormItem',
    'useFormErrorDescription',
    'fieldLoadingModes',
    'PopupContainer',
  ]) {
    assert.match(result.stdout, new RegExp(`\\b${token}\\b`), token)
  }
})
