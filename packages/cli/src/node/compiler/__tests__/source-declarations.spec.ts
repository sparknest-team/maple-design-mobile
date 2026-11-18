import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import ts from 'typescript'
import { expect, test } from 'vitest'
import { copySourceDeclarations } from '../copySourceDeclarations.js'

test('generated public declarations take priority over adjacent legacy stubs', async () => {
  const root = mkdtempSync(join(tmpdir(), 'maple-source-declarations-'))
  const source = join(root, 'src'),
    output = join(root, 'types-generated')
  const put = (file: string, content: string) => {
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, content)
  }
  try {
    for (const name of ['convert', 'toRem', 'toViewport']) {
      put(join(source, `themes/${name}.ts`), `export function ${name}(value: string) { return value }`)
      put(join(source, `themes/${name}.d.ts`), "import { Themes } from '../../types/themes'\n")
      put(join(output, `themes/${name}.d.ts`), `export declare function ${name}(value: string): string\n`)
    }
    put(join(source, 'Button.vue'), '<template><button /></template>')
    put(join(source, 'Button.vue.d.ts'), 'export default class LegacyButton {}')
    put(join(output, 'Button.vue.d.ts'), 'export declare const generated: true')
    put(join(source, 'ambient.d.ts'), "declare module '*.css' {}\n")
    put(join(source, '__tests__/ignored.d.ts'), 'declare const ignored: true')
    await copySourceDeclarations(source, output)
    expect(readFileSync(join(output, 'themes/convert.d.ts'), 'utf8')).toContain('function convert')
    expect(readFileSync(join(output, 'Button.vue.d.ts'), 'utf8')).toContain('generated')
    expect(readFileSync(join(output, 'ambient.d.ts'), 'utf8')).toContain("module '*.css'")
    const files = ['convert', 'toRem', 'toViewport'].map((name) => join(output, `themes/${name}.d.ts`))
    const program = ts.createProgram(files, {
      strict: true,
      noEmit: true,
      skipLibCheck: false,
      types: [],
      target: ts.ScriptTarget.ES2022,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      module: ts.ModuleKind.ESNext,
    })
    expect(ts.getPreEmitDiagnostics(program)).toEqual([])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
