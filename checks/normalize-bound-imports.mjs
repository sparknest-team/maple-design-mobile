import { createRequire } from 'node:module'

const ts = createRequire(new URL('../packages/ui/package.json', import.meta.url))('typescript')

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
    .flatMap((node) => {
      const clause = node.importClause
      const bindings = clause.namedBindings
      const module = node.moduleSpecifier.text
      const entries = []
      if (clause.name) {
        entries.push({ module, kind: 'default', local: clause.name.text, type: clause.isTypeOnly })
      }
      if (bindings && ts.isNamespaceImport(bindings)) {
        entries.push({ module, kind: 'namespace', local: bindings.name.text, type: clause.isTypeOnly })
      } else if (bindings && ts.isNamedImports(bindings)) {
        entries.push(
          ...bindings.elements.map((item) => ({
            module,
            kind: 'named',
            local: item.name.text,
            imported: item.propertyName?.text ?? item.name.text,
            type: clause.isTypeOnly || item.isTypeOnly,
          })),
        )
      }
      // An empty named import can still evaluate its module; never erase it.
      return entries.length ? entries : [{ module, kind: 'empty', type: clause.isTypeOnly }]
    })
    .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))
  let body = source
  for (const node of [...imports].reverse()) {
    body = body.slice(0, node.getStart(file)) + body.slice(node.end)
  }
  return JSON.stringify(declarations) + '\n' + body.trim()
}
