import { createRequire } from 'node:module'
import { normalizeBoundImports } from './normalize-bound-imports.mjs'

const require = createRequire(new URL('../packages/maple-ui/package.json', import.meta.url))
const ts = require('typescript')
const prettier = require('prettier')
const { parse } = require('vue/compiler-sfc')

/** Preserve SFC structure and expressions while canonicalizing formatter and import grouping. */
export async function normalizeVueSource(source) {
  // Retain types and literal whitespace while canonicalizing script braces.
  const { descriptor, errors } = parse(source)
  if (errors.length) {
    throw new Error(`Cannot compare invalid Vue source: ${errors.join(', ')}`)
  }
  const edits = []
  for (const block of [descriptor.script, descriptor.scriptSetup].filter(Boolean)) {
    edits.push({
      start: block.loc.start.offset,
      end: block.loc.end.offset,
      text: await normalizeTypeScript(block.content),
    })
  }
  const visit = (node) => {
    if (node.type === 1) {
      const reference = node.props.find((prop) => prop.type === 6 && prop.name === 'ref')
      // A static ref has no expression-order effect. Preserve spread/ref binding
      // order, where moving it could change which ref Vue receives.
      const ordered = node.props.some(
        (prop) =>
          prop.type === 7 && prop.name === 'bind' && (!prop.arg || !prop.arg.isStatic || prop.arg.content === 'ref'),
      )
      if (reference && node.props[0] !== reference && !ordered) {
        edits.push({
          start: node.props[0].loc.start.offset,
          end: node.props.at(-1).loc.end.offset,
          text: [reference, ...node.props.filter((prop) => prop !== reference)]
            .map((prop) => prop.loc.source)
            .join(' '),
        })
      }
    }
    for (const child of node.children ?? []) {
      visit(child)
    }
  }
  if (descriptor.template?.ast) {
    visit(descriptor.template.ast)
  }
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    source = source.slice(0, edit.start) + edit.text + source.slice(edit.end)
  }
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
