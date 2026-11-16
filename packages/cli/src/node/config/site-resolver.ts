import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { MapleResolver, type MapleResolverOptions } from '@maple-design/resolver-vue'
import ts from 'typescript'
import type { Plugin } from 'vite'

/** Browser dev must not depend on directories removed by a parallel package build. */
export function getWorkspaceSourceAliases(sourceDir: string) {
  return [
    ['@maple-design/shared-vue', 'shared/src/index.ts'],
    ['@maple-design/use-vue', 'use/src/index.ts'],
    ['@maple-design/cli-vue/client', 'cli/src/client/index.ts'],
  ].flatMap(([name, relative]) => {
    const replacement = resolve(sourceDir, '../..', relative)
    return existsSync(replacement) ? [{ find: new RegExp(`^${name}$`), replacement }] : []
  })
}

/** Resolve documentation templates without re-entering the library barrel. */
function readPublicModules(sourceDir: string) {
  const entry = resolve(sourceDir, 'index.ts')
  const source = ts.createSourceFile(entry, readFileSync(entry, 'utf8'), ts.ScriptTarget.Latest, true)
  const modules = new Map<string, { from: string; name: string }>()
  const aggregate = ts.createSourceFile(
    'maple-vue.ts',
    readFileSync(resolve(sourceDir, 'maple-vue.ts'), 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  )
  const defaults = new Map<string, string>()
  for (const statement of aggregate.statements) {
    if (
      ts.isImportDeclaration(statement) &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      statement.importClause?.name
    ) {
      defaults.set(statement.importClause.name.text, resolve(sourceDir, statement.moduleSpecifier.text))
    }
  }

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
      if (item.isTypeOnly) {
        continue
      }
      const original = (item.propertyName ?? item.name).text
      if (statement.moduleSpecifier.text === './maple-vue') {
        const from = defaults.get(original)
        if (from) {
          modules.set(item.name.text, { from, name: 'default' })
        }
      } else {
        modules.set(item.name.text, { from: resolve(sourceDir, statement.moduleSpecifier.text), name: original })
      }
    }
  }
  return modules
}

export function getSiteComponentExcludes(sourceDir: string) {
  const source = sourceDir.replace(/\\/g, '/').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return [
    /node_modules/,
    new RegExp(
      `^(?:/@fs)?${source}/(?!(?:[^/]+/)*(?:example|examples|__demos__|docs)/).*\\.(?:vue|[cm]?[jt]sx?)(?:\\?|$)`,
    ),
  ]
}

export function createSiteResolver(sourceDir: string, options: MapleResolverOptions = {}) {
  const modules = readPublicModules(sourceDir)

  return MapleResolver(options).map((resolver) => ({
    ...resolver,
    resolve(name: string) {
      const result = resolver.resolve(name)
      // Newly exported components must work before the installed resolver is rebuilt.
      if (!result && resolver.type === 'component' && /^Mp[A-Z]/.test(name)) {
        const exported = `_${name.slice(2)}Component`
        if (!modules.has(exported)) {
          for (const [key, target] of readPublicModules(sourceDir)) {
            modules.set(key, target)
          }
        }
        const target = modules.get(exported)
        if (target && existsSync(resolve(target.from, 'style/index.ts'))) {
          return {
            from: target.from,
            name: target.name,
            sideEffects: options.importStyle === false ? undefined : [`${target.from}/style`],
          }
        }
      }
      if (result?.from !== '@maple-design/ui-vue') {
        return result
      }
      const target = modules.get(result.name)
      if (!target) {
        if (!result.name.startsWith('_') && result.name !== 'vLoading') {
          return result
        }
        throw new Error(`[Maple docs] Missing public component export: ${result.name}`)
      }
      return { ...result, from: target.from, name: target.name }
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
      if (!/\.(?:[cm]?[jt]sx?|vue|md)(?:\?|$)/.test(id) || !code.includes('@maple-design/ui-vue')) {
        return
      }
      const source = ts.createSourceFile(id, code, ts.ScriptTarget.Latest, true)
      const replacements: Array<{ start: number; end: number; value: string }> = []
      for (const statement of source.statements) {
        if (
          !ts.isImportDeclaration(statement) ||
          !ts.isStringLiteral(statement.moduleSpecifier) ||
          statement.moduleSpecifier.text !== '@maple-design/ui-vue' ||
          !statement.importClause ||
          statement.importClause.isTypeOnly ||
          statement.importClause.name ||
          !statement.importClause.namedBindings ||
          !ts.isNamedImports(statement.importClause.namedBindings)
        ) {
          continue
        }
        const items = statement.importClause.namedBindings.elements
        if (items.some((item) => item.isTypeOnly)) {
          continue
        }
        const targets = items.map((item) => modules.get((item.propertyName ?? item.name).text))
        if (!targets.length || targets.some((target) => !target)) {
          continue
        }
        replacements.push({
          start: statement.getStart(source),
          end: statement.end,
          value: items
            .map((item, index) => {
              const target = targets[index]!
              const local = item.name.text
              const specifier = target.name === local ? local : `${target.name} as ${local}`
              return `import { ${specifier} } from ${JSON.stringify(target.from.replaceAll('\\', '/'))};`
            })
            .join('\n'),
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
