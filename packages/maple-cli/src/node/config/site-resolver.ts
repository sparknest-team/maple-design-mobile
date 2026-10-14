import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { MapleResolver, type MapleResolverOptions } from '@maplejs/resolver'
import ts from 'typescript'
import type { Plugin } from 'vite'

/** Resolve documentation templates without re-entering the library barrel. */
function readPublicModules(sourceDir: string) {
  const entry = resolve(sourceDir, 'index.ts')
  const source = ts.createSourceFile(entry, readFileSync(entry, 'utf8'), ts.ScriptTarget.Latest, true)
  const modules = new Map<string, string>()

  for (const statement of source.statements) {
    if (
      !ts.isExportDeclaration(statement) ||
      statement.isTypeOnly ||
      !statement.moduleSpecifier ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      !statement.exportClause ||
      !ts.isNamedExports(statement.exportClause)
    ) {
      continue
    }
    for (const item of statement.exportClause.elements) {
      if (!item.isTypeOnly && statement.moduleSpecifier.text !== './maple-vue') {
        modules.set(item.name.text, resolve(sourceDir, statement.moduleSpecifier.text))
      }
    }
  }
  return modules
}

export function createSiteResolver(sourceDir: string, options: MapleResolverOptions = {}) {
  const modules = readPublicModules(sourceDir)

  return MapleResolver(options).map((resolver) => ({
    ...resolver,
    resolve(name: string) {
      const result = resolver.resolve(name)
      if (result?.from !== '@maplejs/maple-ui' || (!result.name.startsWith('_') && result.name !== 'vLoading')) {
        return result
      }
      const from = modules.get(result.name)
      if (!from) {
        throw new Error(`[Maple docs] Missing public component export: ${result.name}`)
      }
      return { ...result, from }
    },
  }))
}

/** Keep demo root imports authored as-is; route direct re-exports after style injection. */
export function createSiteImportPlugin(sourceDir: string): Plugin {
  const modules = readPublicModules(sourceDir)
  return {
    name: 'maple:site-source-imports',
    enforce: 'post',
    transform(code, id) {
      if (!/\.(?:[cm]?[jt]sx?|vue|md)(?:\?|$)/.test(id) || !code.includes('@maplejs/maple-ui')) {
        return
      }
      const source = ts.createSourceFile(id, code, ts.ScriptTarget.Latest, true)
      const replacements: Array<{ start: number; end: number; value: string }> = []
      for (const statement of source.statements) {
        if (
          !ts.isImportDeclaration(statement) ||
          !ts.isStringLiteral(statement.moduleSpecifier) ||
          statement.moduleSpecifier.text !== '@maplejs/maple-ui' ||
          !statement.importClause ||
          statement.importClause.isTypeOnly ||
          statement.importClause.name ||
          !statement.importClause.namedBindings ||
          !ts.isNamedImports(statement.importClause.namedBindings)
        ) {
          continue
        }
        const targets = statement.importClause.namedBindings.elements.map((item) =>
          modules.get((item.propertyName ?? item.name).text),
        )
        if (!targets.length || !targets[0] || !targets.every((target) => target === targets[0])) {
          continue
        }
        replacements.push({
          start: statement.moduleSpecifier.getStart(source),
          end: statement.moduleSpecifier.end,
          value: JSON.stringify(targets[0].replaceAll('\\', '/')),
        })
      }
      if (!replacements.length) {
        return
      }
      let result = code
      for (const replacement of replacements.reverse()) {
        result = result.slice(0, replacement.start) + replacement.value + result.slice(replacement.end)
      }
      return { code: result, map: null }
    },
  }
}
