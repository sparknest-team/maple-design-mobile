import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

const root = fileURLToPath(new URL('../../', import.meta.url))
const isCedar = JSON.parse(readFileSync(resolve(root, 'packages/shared/package.json'), 'utf8')).name.startsWith(
  '@cedar-design/',
)
const sharedDirectory = 'shared'
const uiDirectory = 'ui'
const brand = isCedar ? 'Cedar' : 'Maple'
const sharedRoot = resolve(root, 'packages', sharedDirectory)
const require = createRequire(resolve(sharedRoot, 'package.json'))
const esbuild = createRequire(require.resolve('tsup/package.json'))('esbuild')
const ts = require('typescript')

// Deliberate public surface: keep repository consumers, remove the old wholesale re-export.
const expectedExports = [
  'assert',
  'call',
  'camelize',
  'clamp',
  'clampArrayRange',
  'cloneDeep',
  'createNamespaceFn',
  'doubleRaf',
  'error',
  'floor',
  'getRect',
  'getScrollLeft',
  'getScrollTop',
  'getStyle',
  'hasOwn',
  'inBrowser',
  'inMobile',
  'inViewport',
  'isArray',
  'isBoolean',
  'isEmpty',
  'isFunction',
  'isNumber',
  'isNumeric',
  'isObject',
  'isPlainObject',
  'isString',
  'isWindow',
  'kebabCase',
  'mergeWith',
  'motion',
  'normalizeToArray',
  'pascalCase',
  'preventDefault',
  'raf',
  'removeItem',
  'slash',
  'supportTouch',
  'throttle',
  'toNumber',
  'uniq',
].sort()

async function withGlobals(values, run) {
  const descriptors = Object.fromEntries(
    Object.keys(values).map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]),
  )
  try {
    for (const [key, value] of Object.entries(values)) {
      Object.defineProperty(globalThis, key, { configurable: true, writable: true, value })
    }
    await run()
  } finally {
    for (const [key, descriptor] of Object.entries(descriptors)) {
      if (descriptor) {
        Object.defineProperty(globalThis, key, descriptor)
      } else {
        delete globalThis[key]
      }
    }
  }
}

test('local shared utilities: published runtime, types, behavior and bundle size', async (t) => {
  const output = mkdtempSync(resolve(tmpdir(), `${sharedDirectory}-bundle-`))
  try {
    execFileSync(
      process.execPath,
      [
        require.resolve('tsup/dist/cli-default.js'),
        'src/index.ts',
        '--format',
        'esm,cjs',
        '--dts',
        '--out-dir',
        output,
        '--clean',
      ],
      { cwd: sharedRoot, stdio: 'pipe' },
    )
    const esmPath = resolve(output, 'index.js')
    const esm = await import(`data:text/javascript;base64,${Buffer.from(readFileSync(esmPath)).toString('base64')}`)
    const cjs = require(resolve(output, 'index.cjs'))

    await t.test('ESM/CJS expose only used tools and self-contained types', () => {
      const sharedManifest = JSON.parse(readFileSync(resolve(sharedRoot, 'package.json'), 'utf8'))
      assert.ok(sharedManifest.files.includes('THIRD_PARTY_NOTICES'))
      assert.deepEqual(Object.keys(esm).sort(), expectedExports)
      assert.deepEqual(Object.keys(cjs).sort(), expectedExports)
      for (const file of ['index.js', 'index.cjs', 'index.d.ts', 'index.d.cts']) {
        assert.doesNotMatch(
          readFileSync(resolve(output, file), 'utf8'),
          /(?:from\s*|require\()["'](?:rattail|mitt)["']/,
        )
      }
      for (const name of [sharedDirectory, uiDirectory]) {
        const manifest = JSON.parse(readFileSync(resolve(root, `packages/${name}/package.json`), 'utf8'))
        assert.equal(manifest.dependencies?.rattail, undefined)
      }
      const manifest = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
      assert.equal(manifest.pnpm?.patchedDependencies?.['rattail@1.0.17'], undefined)
    })

    await t.test('published declarations retain generics, narrowing and motion state types', () => {
      const contract = resolve(output, 'contract.ts')
      writeFileSync(
        contract,
        `
        import { assert, call, cloneDeep, createNamespaceFn, isFunction, motion, normalizeToArray } from './index.js'
        import type { MotionState } from './index.js'
        const model = cloneDeep({ id: 1, nested: { value: 'text' } })
        const value: string = model.nested.value
        const list: string[] = normalizeToArray('text')
        const result: number | number[] | undefined = call((value: number) => value + 1, 1)
        const namespace = createNamespaceFn('mp')('cell')
        const active: 'mp-cell--active' = namespace.n('--active')
        const base: 'mp-cell' = namespace.n()
        const box: 'mp--box' = namespace.n('$--box')
        const cedarNamespace = createNamespaceFn('c')('cell')
        const cedarBase: 'c-cell' = cedarNamespace.n()
        const cedarActive: 'c-cell--active' = cedarNamespace.n('--active')
        const state: MotionState = motion({ from: 0, to: 1 }).getState()
        const callback: unknown = () => 1
        if (isFunction(callback)) { callback(1) }
        const text: unknown = 'text'
        assert(typeof text === 'string', 'TypeTest', 'must be a string')
        text.toUpperCase()
        // @ts-expect-error unused exports are intentionally removed
        import { createStorage } from './index.js'
      `,
      )
      const program = ts.createProgram([contract], {
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        types: [],
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
      })
      const errors = ts.getPreEmitDiagnostics(program)
      assert.deepEqual(
        errors.map((error) => ts.flattenDiagnosticMessageText(error.messageText, '\n')),
        [],
      )
    })

    for (const [format, api] of [
      ['ESM', esm],
      ['CJS', cjs],
    ]) {
      await t.test(`${format}: predicates, coercion, casing and array mutations`, () => {
        assert.equal(api.isNumeric('1.5'), false)
        assert.equal(api.isNumeric('+12'), true)
        assert.equal(api.isNumeric(' 12 '), false)
        assert.equal(api.isNumeric(NaN), true)
        assert.equal(api.isPlainObject(new (class Model {})()), true)
        assert.equal(api.isPlainObject(Object.create(null)), true)
        assert.equal(
          api.isObject(() => {}),
          false,
        )
        assert.equal(api.hasOwn(Object.create({ inherited: 1 }), 'inherited'), false)
        for (const [value, expected] of [
          [null, 0],
          [undefined, 0],
          [true, 1],
          [false, 0],
          ['12px', 12],
          ['1.5', 1.5],
          ['bad', 0],
          ['', 0],
        ]) {
          assert.equal(api.toNumber(value), expected)
        }
        assert.equal(api.floor(1.239, 2), 1.23)
        assert.equal(api.floor(-1.231, 2), -1.24)
        assert.equal(api.floor(123, -1), 120)
        assert.equal(api.clampArrayRange(0, []), -1)
        assert.equal(api.camelize('Foo-Bar'), 'fooBar')
        assert.equal(api.pascalCase('Foo-Bar'), 'fooBar')
        for (const [value, camel, pascal] of [
          ['', '', ''],
          ['a--b', 'a-B', 'A-B'],
          ['-foo', 'foo', 'foo'],
          ['İ-test', 'i\u0307Test', 'i\u0307Test'],
          ['\nfoo-bar', '\nfooBar', '\nfooBar'],
          ['😀-test', '😀Test', '😀Test'],
        ]) {
          assert.equal(api.camelize(value), camel)
          assert.equal(api.pascalCase(value), pascal)
        }
        assert.equal(api.kebabCase('XMLHttpRequest'), 'x-m-l-http-request')
        assert.equal(api.slash('C:\\folder\\file'), 'C:/folder/file')
        assert.equal(api.slash('\\\\?\\C:\\folder'), '\\\\?\\C:\\folder')
        const list = [1, 2, 2]
        assert.deepEqual(api.removeItem(list, 2), [2])
        assert.deepEqual(list, [1, 2])
        assert.equal(api.removeItem(list, 3), undefined)
        assert.equal(api.normalizeToArray(list), list)
        assert.deepEqual(api.normalizeToArray(null), [null])
        assert.deepEqual(api.uniq([NaN, NaN, 1, 1]), [NaN, 1])
        assert.deepEqual(api.call([(x) => x + 1, (x) => x * 2], 3), [4, 6])
        assert.equal(api.call(null), undefined)
        assert.throws(() => api.assert(false, 'Test', 'failure'), new RegExp(`^Error: ${brand} \\[Test\\]: failure$`))
        const namespace = api.createNamespaceFn('mp')('cell')
        assert.equal(namespace.name, 'MpCell')
        assert.equal(namespace.n('--active'), 'mp-cell--active')
        assert.equal(namespace.n('$--box'), 'mp--box')
        assert.equal(namespace.n('title'), 'mp-cell__title')
        assert.deepEqual(namespace.classes([false, 'yes'], [true, 'yes'], [{ value: false }, 'ref']), [
          null,
          'yes',
          'ref',
        ])
      })

      await t.test(`${format}: clone cyclic collections, symbols, prototypes and binary views`, () => {
        class Model {
          constructor() {
            this.name = 'model'
          }
        }
        const symbol = Symbol('private')
        const key = { id: 1 }
        const value = new Model()
        value.self = value
        value[symbol] = { nested: true }
        value.map = new Map([[key, value]])
        value.set = new Set([value])
        value.date = new Date(1234)
        value.pattern = /test/gi
        value.buffer = new Uint8Array([1, 2, 3, 4]).buffer
        value.view = new DataView(value.buffer, 1, 2)
        value.typed = new Uint16Array(value.buffer, 2, 1)
        value.fn = () => 'same'
        const copy = api.cloneDeep(value)
        assert.ok(copy instanceof Model)
        assert.equal(copy.self, copy)
        assert.notEqual(copy[symbol], value[symbol])
        assert.equal(copy.map.values().next().value, copy)
        assert.notEqual(copy.map.keys().next().value, key)
        assert.ok(copy.set.has(copy))
        assert.equal(copy.date.getTime(), 1234)
        assert.equal(copy.pattern.toString(), '/test/gi')
        assert.notEqual(copy.buffer, value.buffer)
        assert.deepEqual([...new Uint8Array(copy.buffer)], [1, 2, 3, 4])
        assert.equal(copy.view.byteOffset, 1)
        assert.equal(copy.view.byteLength, 2)
        assert.equal(copy.typed.byteOffset, 2)
        assert.equal(copy.typed.length, 1)
        assert.equal(copy.fn, value.fn)
        assert.deepEqual(api.cloneDeep(new WeakMap()), {})
        assert.deepEqual(api.cloneDeep(new Error('legacy')), {})
        const guarded = Object.create(null)
        Object.defineProperty(guarded, 'constructor', {
          get() {
            throw new Error('unused constructor')
          },
        })
        assert.deepEqual(api.cloneDeep(guarded), Object.create(null))
        const boxed = Object('text')
        const boxedCopy = api.cloneDeep(boxed)
        assert.notEqual(boxedCopy, boxed)
        assert.equal(boxedCopy.valueOf(), 'text')
      })

      await t.test(`${format}: configuration customizers fold right-to-left and mutate the original target`, () => {
        const target = { list: [1], nested: { a: 1 } }
        const middle = { list: [2], nested: { b: 2 } }
        const source = Object.assign(Object.create({ inherited: true }), { list: [3], nested: { c: 3 } })
        const calls = []
        const result = api.mergeWith(target, middle, source, (previous, next, key, object) => {
          calls.push([key, object === middle ? 'middle' : 'target'])
          if (Array.isArray(previous)) {
            return previous.concat(next)
          }
        })
        assert.equal(result, target)
        assert.deepEqual(result.list, [1, 2, 3])
        assert.deepEqual(middle.list, [2, 3])
        assert.deepEqual(result.nested, { a: 1, b: 2, c: 3 })
        assert.equal(Object.hasOwn(result, 'inherited'), false)
        assert.deepEqual(calls.slice(0, 3), [
          ['list', 'middle'],
          ['nested', 'middle'],
          ['c', 'middle'],
        ])
      })
    }

    for (const [format, api] of [
      ['ESM', esm],
      ['CJS', cjs],
    ]) {
      await t.test(`${format}: decimal floor handles existing exponents and invalid precision`, () => {
        for (const [value, precision, expected] of [
          [12.359, 2, 12.35],
          [-12.351, 2, -12.36],
          [1e-7, 8, 1e-7],
          [-9.99, 1, -10],
          [-999, -2, -1000],
          [1000, -3, 1000],
          [1.234e-7, 9, 1.23e-7],
          [-1.234e-7, 9, -1.24e-7],
          [1.234e24, -23, 1.2e24],
          [-1.234e24, -23, -1.3e24],
          [1e308, 292, 1e308],
          [-1e308, 292, -1e308],
          [Number.MIN_VALUE, 292, 0],
          [-Number.MIN_VALUE, 292, -1e-292],
          [1e-100, -292, 0],
          [-1e-100, -292, -1e292],
          [12.359, 1.5, 12],
          [-12.359, -1.5, -13],
          [12.359, NaN, 12],
          [12.359, Infinity, 12],
          [12.359, -Infinity, 12],
          [1e-100, 293, 1e-100],
          [-1e-100, -293, -1e292],
          [Infinity, 2, Infinity],
          [-Infinity, 2, -Infinity],
          [-0, 2, -0],
        ]) {
          assert.equal(Object.is(api.floor(value, precision), expected), true, `${value}, precision=${precision}`)
        }
        assert.equal(Number.isNaN(api.floor(NaN, 2)), true)
        assert.equal(api.floor(12.359), 12)
      })
    }

    await t.test('motion pause/resume/reset, easing and frame completion', async () => {
      let now = 100
      let sequence = 0
      const frames = new Map()
      const flush = (time) => {
        now = time
        const pending = [...frames.values()]
        frames.clear()
        pending.forEach((callback) => callback(time))
      }
      await withGlobals(
        {
          performance: { now: () => now },
          requestAnimationFrame: (callback) => {
            frames.set(++sequence, callback)
            return sequence
          },
          cancelAnimationFrame: (id) => frames.delete(id),
        },
        async () => {
          const values = [],
            states = []
          const animation = esm.motion({
            from: 10,
            to: 30,
            duration: 100,
            timingFunction: (p) => p * p,
            frame: (value) => values.push(value),
            onStateChange: (state) => states.push(state),
          })
          assert.equal(animation.getState(), 'pending')
          animation.start()
          animation.start()
          assert.equal(frames.size, 1)
          flush(150)
          assert.deepEqual(values, [{ value: 15, done: false }])
          animation.pause()
          assert.equal(frames.size, 0)
          now = 350
          animation.start()
          flush(400)
          assert.deepEqual(values.at(-1), { value: 30, done: true })
          assert.equal(animation.getState(), 'finished')
          animation.start()
          assert.equal(frames.size, 0)
          animation.reset()
          assert.deepEqual(states, ['running', 'paused', 'running', 'finished', 'pending'])
          animation.start()
          flush(450)
          assert.deepEqual(values.at(-1), { value: 15, done: false })
          animation.reset()
          assert.equal(frames.size, 0)
          let resolved = false
          const pending = esm.doubleRaf().then(() => {
            resolved = true
          })
          flush(500)
          assert.equal(resolved, false)
          assert.equal(frames.size, 1)
          flush(550)
          await pending
          assert.equal(resolved, true)
        },
      )
    })

    for (const [format, api] of [
      ['ESM', esm],
      ['CJS', cjs],
    ]) {
      await t.test(`${format}: zero and invalid motion durations finish once without a frame loop`, async () => {
        const frames = new Map()
        let sequence = 0
        await withGlobals(
          {
            performance: { now: () => 100 },
            requestAnimationFrame: (callback) => {
              frames.set(++sequence, callback)
              return sequence
            },
            cancelAnimationFrame: (id) => frames.delete(id),
          },
          async () => {
            for (const duration of [0, -1, NaN, Infinity, -Infinity]) {
              const values = []
              const animation = api.motion({ from: 2, to: 7, duration, frame: (value) => values.push(value) })
              animation.start()
              assert.equal(frames.size, 1)
              const pending = [...frames.values()]
              frames.clear()
              pending.forEach((callback) => callback(100))
              assert.deepEqual(values, [{ value: 7, done: true }], `duration=${duration}`)
              assert.equal(animation.getState(), 'finished')
              assert.equal(frames.size, 0)
              animation.start()
              assert.equal(values.length, 1)
              animation.reset()
              animation.start()
              animation.pause()
              assert.equal(frames.size, 0)
              assert.equal(values.length, 1)
            }
          },
        )
      })
    }

    await t.test('throttle preserves receiver, trailing arguments and timer fallback for RAF', async () => {
      let now = 1000
      let sequence = 0
      const timers = new Map()
      const calls = []
      const advance = (time) => {
        now = time
        for (const [id, timer] of [...timers]) {
          if (timer.at <= now) {
            timers.delete(id)
            timer.callback()
          }
        }
      }
      await withGlobals(
        {
          performance: { now: () => now },
          requestAnimationFrame: undefined,
          cancelAnimationFrame: undefined,
          setTimeout: (callback, delay = 0) => {
            timers.set(++sequence, { callback, at: now + delay })
            return sequence
          },
          clearTimeout: (id) => timers.delete(id),
        },
        async () => {
          const receiver = {
            id: 'receiver',
            run: esm.throttle(function (value) {
              calls.push([this.id, value])
            }, 200),
          }
          receiver.run('first')
          advance(1050)
          receiver.run('second')
          advance(1100)
          receiver.run('latest')
          advance(1200)
          assert.deepEqual(calls, [
            ['receiver', 'first'],
            ['receiver', 'latest'],
          ])
          const pending = esm.raf()
          advance(1200)
          assert.equal(await pending, undefined)
          const animation = esm.motion({ from: 0, to: 1 })
          animation.start()
          assert.equal(timers.size, 1)
          animation.reset()
          assert.equal(timers.size, 0)
        },
      )
    })

    await t.test('DOM geometry, viewport edges, cancellation and browser detection', async () => {
      const rect = { top: 0, bottom: 10, left: 100, right: 110 }
      const element = { getBoundingClientRect: () => rect }
      const style = { color: 'red' }
      const window = {
        innerWidth: 100,
        innerHeight: 80,
        scrollX: -5,
        scrollY: 12,
        ontouchstart: null,
        getComputedStyle: () => style,
      }
      await withGlobals({ window, navigator: { userAgent: 'iPhone' } }, async () => {
        assert.equal(esm.inBrowser(), true)
        assert.equal(esm.inMobile(), true)
        assert.equal(esm.supportTouch(), true)
        assert.equal(esm.getRect(element), rect)
        assert.deepEqual(esm.getRect(window).toJSON(), {
          x: 0,
          y: 0,
          top: 0,
          left: 0,
          right: 100,
          bottom: 80,
          width: 100,
          height: 80,
        })
        assert.equal(esm.getStyle(element), style)
        assert.equal(esm.getScrollLeft(window), 0)
        assert.equal(esm.getScrollTop(window), 12)
        assert.equal(esm.getScrollTop({ scrollTop: -1 }), 0)
        assert.equal(esm.inViewport(element), true)
        rect.left = 101
        assert.equal(esm.inViewport(element), false)
        let prevented = 0
        esm.preventDefault({ cancelable: false, preventDefault: () => prevented++ })
        esm.preventDefault({ cancelable: true, preventDefault: () => prevented++ })
        assert.equal(prevented, 1)
      })
    })

    await t.test('small named imports stay below 512 gzip bytes', async () => {
      const result = await esbuild.build({
        stdin: { contents: `export { clamp, isNumber, assert } from ${JSON.stringify(esmPath)}`, resolveDir: output },
        bundle: true,
        write: false,
        format: 'esm',
        minify: true,
        metafile: true,
      })
      const bytes = gzipSync(result.outputFiles[0].contents).length
      assert.ok(bytes < 512, `Small shared imports retained unrelated utilities: ${bytes} gzip bytes`)
      assert.doesNotMatch(
        result.outputFiles[0].text,
        /Array\.isArray/,
        'Unused predicate initialization must be removed from unrelated named imports',
      )
      console.info(`Published shared small imports: ${bytes} gzip bytes`)
    })
  } finally {
    rmSync(output, { recursive: true, force: true })
  }
})
