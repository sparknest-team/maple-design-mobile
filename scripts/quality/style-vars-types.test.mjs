import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const require = createRequire(resolve(root, 'packages/ui/package.json'))
const ts = require('typescript-js')

test('generated style variables support optional and custom values in strict declarations', () => {
  const temp = mkdtempSync(join(tmpdir(), 'maple-style-vars-'))
  try {
    const consumer = join(temp, 'consumer.ts')
    const declaration = resolve(root, 'packages/ui/types/styleVars').replaceAll('\\', '/')
    writeFileSync(
      consumer,
      `import type { StyleVars } from '${declaration}'
      const vars: StyleVars = { '--mp-button-height': '40px', '--custom': undefined }
      const value: string | undefined = vars['--mp-button-height']
      // @ts-expect-error style values cannot be numbers
      const invalid: StyleVars = { '--mp-button-height': 4 }
      void [value, invalid]
    `,
    )
    const program = ts.createProgram([consumer], {
      strict: true,
      noEmit: true,
      skipLibCheck: false,
      types: [],
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
    })
    const diagnostics = ts.getPreEmitDiagnostics(program)
    assert.equal(
      diagnostics.length,
      0,
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: (file) => file,
        getCurrentDirectory: () => root,
        getNewLine: () => '\n',
      }),
    )
  } finally {
    rmSync(temp, { recursive: true, force: true })
  }
})
