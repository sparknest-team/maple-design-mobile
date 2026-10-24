import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const require = createRequire(resolve(root, 'packages/maple-cli/package.json'))
const { build } = require('esbuild')
const source = resolve(root, 'packages/maple-cli/src/node/commands/dev.ts')
let sequence = 0

async function harness() {
  const key = `maple-dev-publish-boundary-${sequence++}`
  const originalEnvironment = process.env.NODE_ENV
  const artifacts = new Map([
    ['/fixture/es/index.mjs', 'published-index'],
    ['/fixture/es/icon/style/index.mjs', 'published-icon-style'],
    ['/fixture/es/maple.esm.js', 'published-playground-bundle'],
    ['/fixture/es/maple.css', 'published-playground-css'],
  ])
  const published = new Map(artifacts)
  const mutations = []
  const watchers = []
  const servers = []
  const state = {
    generated: 0,
    fs: {
      ensureDirSync: (path) => mutations.push(['ensureDir', path]),
      pathExistsSync: () => true,
      readFileSync: (path) => artifacts.get(path) ?? '',
      outputFileSync: (path, content) => {
        mutations.push(['write', path])
        artifacts.set(path, content)
      },
      removeSync: (path) => {
        mutations.push(['remove', path])
        for (const file of artifacts.keys()) {
          if (file.startsWith(`${path}/`)) {
            artifacts.delete(file)
          }
        }
      },
      copy: async (from, to) => {
        mutations.push(['copy', to])
      },
    },
    watch: (files) => {
      const watcher = {
        files,
        handlers: new Map(),
        closed: false,
        on(event, callback) {
          this.handlers.set(event, callback)
          return this
        },
        async close() {
          this.closed = true
        },
      }
      watchers.push(watcher)
      return watcher
    },
    createServer: async (config) => {
      const server = {
        config,
        closed: false,
        listened: false,
        async close() {
          this.closed = true
        },
        async listen() {
          this.listened = true
        },
        printUrls() {},
      }
      servers.push(server)
      return server
    },
  }
  globalThis[Symbol.for(key)] = state
  const prefix = `const state = globalThis[Symbol.for(${JSON.stringify(key)})];\n`
  const mocks = {
    '@maple-design/shared': 'export const kebabCase = value => value;',
    chokidar: 'export default { watch: state.watch };',
    'fs-extra': 'export default state.fs;',
    vite: 'export const createServer = state.createServer;',
    '../compiler/compileScript.js':
      "export const generateEsEntryTemplate = () => ({ indexTemplate: 'dev-stub' }); export const getScriptExtname = () => '.mjs';",
    '../compiler/compileSiteEntry.js': 'export async function buildSiteEntry() { state.generated++; }',
    '../config/maple.config.js': "export async function getMapleConfig() { return { name: 'maple' }; }",
    '../config/vite.config.js':
      "export const getDevConfig = () => ({ resolve: { alias: [{ find: '@maple-design/ui', replacement: '/fixture/src/index.ts' }] } });",
    '../shared/constant.js':
      "export const COMPONENT_REUSE_JSON = '/fixture/component-reuse.json', ES_DIR = '/fixture/es', MAPLE_CONFIG = '/fixture/maple.config.mjs', SITE = '/cli/site', SITE_DIR = '/fixture/.maple/site', SRC = 'src', SRC_DIR = '/fixture/src';",
    '../shared/fsUtils.js': 'export const getPublicDirs = async () => [];',
    '../shared/logger.js': 'export default { info() {}, success() {}, title() {}, error() {} };',
  }
  const result = await build({
    entryPoints: [source],
    bundle: true,
    write: false,
    platform: 'node',
    format: 'esm',
    plugins: [
      {
        name: 'isolated-dev-dependencies',
        setup(builder) {
          builder.onResolve({ filter: /.*/ }, (args) => {
            if (args.kind === 'entry-point') {
              return
            }
            if (args.path === 'path') {
              return { path: 'node:path', external: true }
            }
            if (args.path === '../shared/serial-task.js') {
              return { path: resolve(root, 'packages/maple-cli/src/node/shared/serial-task.ts') }
            }
            assert.ok(args.path in mocks, `Unexpected dev dependency: ${args.path}`)
            return { path: args.path, namespace: 'fixture' }
          })
          builder.onLoad({ filter: /.*/, namespace: 'fixture' }, (args) => ({
            contents: prefix + mocks[args.path],
            loader: 'js',
          }))
        },
      },
    ],
  })
  const module = await import(
    `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`
  )
  return {
    dev: module.dev,
    artifacts,
    published,
    mutations,
    watchers,
    servers,
    state,
    restorePublished() {
      artifacts.clear()
      for (const [path, content] of published) {
        artifacts.set(path, content)
      }
      mutations.length = 0
    },
    assertPreserved() {
      assert.deepEqual(artifacts, published)
      assert.equal(
        mutations.some(([, path]) => path === '/fixture/es' || path.startsWith('/fixture/es/')),
        false,
      )
    },
    dispose() {
      Reflect.deleteProperty(globalThis, Symbol.for(key))
      if (originalEnvironment === undefined) {
        Reflect.deleteProperty(process.env, 'NODE_ENV')
      } else {
        process.env.NODE_ENV = originalEnvironment
      }
    },
  }
}

test('dev cold start preserves published JS, styles and playground bundles', async () => {
  const fixture = await harness()
  try {
    await fixture.dev({ force: true })
    fixture.assertPreserved()
    assert.equal(fixture.servers[0].listened, true)
    assert.deepEqual(fixture.servers[0].config.optimizeDeps, { force: true })
    assert.equal(fixture.state.generated, 1)
  } finally {
    fixture.dispose()
  }
})

for (const changed of ['maple.config.mjs', 'component-reuse.json']) {
  test(`dev restart after ${changed} preserves a completed library build`, async () => {
    const fixture = await harness()
    try {
      await fixture.dev({})
      fixture.restorePublished()
      assert.ok(fixture.watchers[0].files.includes(`/fixture/${changed}`))
      await fixture.watchers[0].handlers.get('change')(`/fixture/${changed}`)
      fixture.assertPreserved()
      assert.equal(fixture.servers[0].closed, true)
      assert.equal(fixture.servers[1].listened, true)
      assert.equal(fixture.watchers[0].closed, true)
      assert.equal(fixture.watchers[1].closed, true)
      assert.equal(fixture.state.generated, 2)
      assert.deepEqual(fixture.watchers.at(-1).files, '/cli/site')
    } finally {
      fixture.dispose()
    }
  })
}

test('docs and playground do not need development stubs in the published directory', async () => {
  const vite = await readFile(resolve(root, 'packages/maple-cli/src/node/config/vite.config.ts'), 'utf8')
  const dev = vite.slice(vite.indexOf('export function getDevConfig'), vite.indexOf('export function getBuildConfig'))
  assert.match(dev, /replacement: resolve\(SRC_DIR, 'index\.ts'\)/)
  assert.match(dev, /replacement: resolve\(SRC_DIR, '\$1\/style'\)/)
  assert.doesNotMatch(dev, /ES_DIR/)
  const preview = await readFile(
    resolve(root, 'packages/maple-cli/site/pc/components/demo-preview/DemoPreview.vue'),
    'utf8',
  )
  assert.match(preview, /config\?\.pc\?\.header\?\.playground/)
  assert.match(preview, /'App\.vue': source/)
  assert.doesNotMatch(preview, /ES_DIR|maple\.esm\.js/)
})
