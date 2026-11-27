import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const cliRoot = fileURLToPath(new URL('../../packages/cli/', import.meta.url))
const require = createRequire(resolve(cliRoot, 'package.json'))
const ts = require('typescript-js')

function compileWithoutUIArtifacts(configName, emit = false) {
  const configPath = resolve(cliRoot, configName)
  const config = ts.readConfigFile(configPath, ts.sys.readFile)
  assert.equal(config.error, undefined)
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, cliRoot, {}, configPath)
  assert.deepEqual(parsed.errors, [])
  const options = { ...parsed.options, noEmit: !emit }
  const host = ts.createCompilerHost(options)
  const isUIArtifact = (file) =>
    /\/(?:ui|@maple-design\/ui-vue)\/(?:types-generated|types|es|lib)(?:\/|$)/.test(file.replaceAll('\\', '/'))
  // Model an installed workspace before its UI package has been built, without
  // renaming or deleting artifacts used by other tasks in the shared workspace.
  for (const method of ['fileExists', 'directoryExists', 'readFile']) {
    const original = host[method].bind(host)
    host[method] = (file) => {
      if (isUIArtifact(file)) {
        return method === 'readFile' ? undefined : false
      }
      return original(file)
    }
  }
  const outputs = new Map()
  host.writeFile = (file, content) => outputs.set(file.replaceAll('\\', '/'), content)
  const program = ts.createProgram(parsed.fileNames, options, host)
  const diagnostics = ts.getPreEmitDiagnostics(program)
  if (emit) {
    diagnostics.push(...program.emit().diagnostics)
  }
  return { program, diagnostics, outputs }
}

test('Node CLI compiles and emits its public entry before UI artifacts exist', () => {
  const { program, diagnostics, outputs } = compileWithoutUIArtifacts('tsconfig.node.json', true)
  assert.equal(
    diagnostics.length,
    0,
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCurrentDirectory: () => cliRoot,
      getCanonicalFileName: (file) => file,
      getNewLine: () => '\n',
    }),
  )
  assert.ok(outputs.has(resolve(cliRoot, 'lib/node/bin.js')))
  assert.ok(outputs.has(resolve(cliRoot, 'lib/node/index.d.ts')))
  assert.ok(!program.getSourceFiles().some((file) => file.fileName.includes('/cli/src/client/')))
  assert.ok(![...outputs.keys()].some((file) => file.includes('/lib/client/')))
})

test('full CLI build still type-checks the browser client against real UI declarations', () => {
  const { program, diagnostics } = compileWithoutUIArtifacts('tsconfig.json')
  assert.ok(program.getSourceFiles().some((file) => file.fileName.endsWith('/cli/src/client/index.ts')))
  assert.ok(
    diagnostics.some(
      (diagnostic) =>
        diagnostic.code === 2307 &&
        diagnostic.file?.fileName.endsWith('/cli/src/client/index.ts') &&
        ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n').includes('@maple-design/ui-vue'),
    ),
    'the full build must require the real UI declarations instead of an ambient any shim',
  )
})
