import { createRequire } from 'node:module'

const ts = createRequire(new URL('../packages/maple-ui/package.json', import.meta.url))('typescript')

/** Compare local bound-import aliases independent of formatter ordering.
 * Side-effect imports and every non-import source statement remain strict.
 */
export function normalizeBoundImports(source) {
  if (source.includes('<script')) {
    return source.replace(
      /(<script\b[^>]*>)([\s\S]*?)(<\/script>)/g,
      (_, start, script, end) => start + normalizeBoundImports(script) + end,
    )
  }
  const file = ts.createSourceFile('source.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const imports = file.statements.filter((node) => ts.isImportDeclaration(node) && node.importClause)
  const declarations = imports
    .map((node) => {
      const clause = node.importClause
      const bindings = clause.namedBindings
      return {
        module: node.moduleSpecifier.text,
        type: clause.isTypeOnly,
        default: clause.name?.text,
        namespace: bindings && ts.isNamespaceImport(bindings) ? bindings.name.text : undefined,
        names:
          bindings && ts.isNamedImports(bindings)
            ? bindings.elements
                .map((item) => ({
                  local: item.name.text,
                  imported: item.propertyName?.text ?? item.name.text,
                  type: item.isTypeOnly,
                }))
                .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))
            : undefined,
      }
    })
    .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))
  let body = source
  for (const node of [...imports].reverse()) {
    body = body.slice(0, node.getStart(file)) + body.slice(node.end)
  }
  return JSON.stringify(declarations) + '\n' + body.trim()
}
