import { createRequire } from 'node:module'
import { normalizeBoundImports } from './normalize-bound-imports.mjs'

const require = createRequire(new URL('../packages/maple-ui/package.json', import.meta.url))
const ts = require('typescript')
const prettier = require('prettier')

/** Preserve SFC structure and expressions while canonicalizing formatter and import grouping. */
export async function normalizeVueSource(source) {
  return normalizeBoundImports(
    await prettier.format(source, {
      parser: 'vue',
      singleQuote: true,
      semi: false,
      printWidth: 100,
      objectWrap: 'collapse',
    }),
  )
}

/** Canonicalize formatter-only differences; retain literals, operators and control flow. */
export async function normalizeTypeScript(source) {
  let file = ts.createSourceFile('source.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  let tsx = true
  if (file.parseDiagnostics.length) {
    const plain = ts.createSourceFile('source.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
    if (!plain.parseDiagnostics.length) {
      file = plain
      tsx = false
    }
  }
  if (file.parseDiagnostics.length) {
    throw new Error('Cannot compare invalid TypeScript source')
  }
  const result = ts.transform(file, [
    (context) => {
      const block = (statement) => (ts.isBlock(statement) ? statement : ts.factory.createBlock([statement], true))
      const visit = (node) => {
        node = ts.visitEachChild(node, visit, context)
        if (ts.isIfStatement(node)) {
          return ts.factory.updateIfStatement(
            node,
            node.expression,
            block(node.thenStatement),
            node.elseStatement ? block(node.elseStatement) : undefined,
          )
        }
        return node
      }
      return (node) => ts.visitNode(node, visit)
    },
  ])
  try {
    const printed = ts.createPrinter({ removeComments: true }).printFile(result.transformed[0])
    const formatted = await prettier.format(printed, {
      parser: 'typescript',
      filepath: tsx ? 'source.tsx' : 'source.ts',
      singleQuote: true,
      semi: false,
      printWidth: 100,
      objectWrap: 'collapse',
    })
    return normalizeBoundImports(formatted)
  } finally {
    result.dispose()
  }
}

export async function normalizeLessSource(source) {
  return await prettier.format(source, { parser: 'less', singleQuote: true, printWidth: 100 })
}
