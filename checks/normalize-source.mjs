import { createRequire } from 'node:module'
import { normalizeBoundImports } from './normalize-bound-imports.mjs'

const require = createRequire(new URL('../packages/maple-ui/package.json', import.meta.url))
const ts = require('typescript')
const prettier = require('prettier')

/** Canonicalize formatter-only differences; retain literals, operators and control flow. */
export async function normalizeTypeScript(source) {
  const file = ts.createSourceFile('source.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
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
      filepath: 'source.tsx',
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
