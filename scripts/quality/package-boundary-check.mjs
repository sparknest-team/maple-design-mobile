import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const framework = 'vue'
const internalScope = /^@(cedar-design|maple-design|sparknest)\//
const opposite =
  framework === 'vue'
    ? /^(react(?:-dom)?(?:\/|$)|@types\/react(?:-dom)?(?:\/|$)|@vitejs\/plugin-react(?:-|$))/
    : /^(vue(?:-router|press)?(?:\/|$)|@vue(?:use)?\/|@types\/vue(?:\/|$)|@vitejs\/plugin-vue(?:-|$)|@vuepress\/|unplugin-vue-components(?:\/|$))/
const skipped = new Set([
  'node_modules',
  '.git',
  '.maple',
  '.cache',
  '.cache-build',
  '.temp',
  '.temp-build',
  '.vite',
  '.pnpm-store',
  'dist',
  'es',
  'lib',
  'umd',
  'types',
  'types-generated',
  'coverage',
  'artifacts',
  'highlight',
])
const dependencyFields = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']
const packageName = (name) => (internalScope.test(name) ? name.split('/').slice(0, 2).join('/') : name)
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'))

export function validatePackageName(name, where) {
  if (typeof name !== 'string' || !name.endsWith(`-${framework}`)) {
    throw new Error(`${where}: package name must identify ${framework}: ${name}`)
  }
}
export function validateDependency(name, where) {
  if (opposite.test(name)) {
    throw new Error(`${where}: cross-framework dependency ${name}`)
  }
  if (internalScope.test(name) && !packageName(name).endsWith(`-${framework}`)) {
    throw new Error(`${where}: internal dependency must end in -${framework}: ${name}`)
  }
  if (/^@(?:cedarjs|maplejs|cedar|maple)\//.test(name) || name === '@bfehub/vuepress-plugin-code-block') {
    throw new Error(`${where}: obsolete package reference ${name}`)
  }
}
function validateFrameworkReference(value, where) {
  const other =
    framework === 'react'
      ? /(?:^|\/)(?:design-ui|cedar-design-web|maple-design-mobile)(?:\/|$)/
      : /(?:^|\/)(?:design-ui-react|cedar-design-web-react|maple-design-mobile-react)(?:\/|$)/
  if (other.test(value)) {
    throw new Error(`${where}: cross-framework repository reference ${value}`)
  }
}
function excluded(root, folder) {
  const path = relative(root, folder).replaceAll('\\', '/')
  return (
    /^(?:release|audits\/evidence)(?:\/|$)/.test(path) || /^packages\/(?:ui|ui-playground)\/site(?:\/|$)/.test(path)
  )
}
function filesIn(root, visit) {
  function walk(folder) {
    if (excluded(root, folder)) {
      return
    }
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const file = resolve(folder, entry.name)
      if (entry.isDirectory()) {
        if (!skipped.has(entry.name)) {
          walk(file)
        }
      } else if (entry.isFile()) {
        visit(file)
      }
    }
  }
  walk(root)
}
function validateLocalReference(name, specifier, file) {
  if (!/^(link|file):/.test(specifier)) {
    return
  }
  const target = resolve(dirname(file), specifier.replace(/^(link|file):/, ''), 'package.json')
  if (!existsSync(target)) {
    throw new Error(`Missing linked package: ${target}`)
  }
  const targetName = readJson(target).name
  if (targetName !== name) {
    throw new Error(`Linked package name mismatch: ${name} -> ${targetName}`)
  }
  validateDependency(targetName, file)
}
function loadParserDependency(name, root) {
  let ownRoot = dirname(fileURLToPath(import.meta.url))
  while (!existsSync(resolve(ownRoot, 'package.json')) && dirname(ownRoot) !== ownRoot) {
    ownRoot = dirname(ownRoot)
  }
  for (const candidate of [
    resolve(root, 'package.json'),
    resolve(ownRoot, 'package.json'),
    resolve(ownRoot, 'packages/ui-build/package.json'),
    resolve(ownRoot, 'packages/ui/package.json'),
  ]) {
    try {
      return createRequire(candidate)(name)
    } catch (error) {
      if (error.code !== 'MODULE_NOT_FOUND') {
        throw error
      }
    }
  }
  throw new Error(`Install repository dependencies before package checks: missing ${name}`)
}
function sourceImports(file, text, ts, root) {
  let scripts = [{ content: text, kind: /\.[jt]sx$/.test(file) ? ts.ScriptKind.TSX : ts.ScriptKind.TS }]
  if (file.endsWith('.vue')) {
    if (framework !== 'vue') {
      throw new Error(`${file}: cross-framework Vue source file`)
    }
    const { descriptor, errors } = loadParserDependency('vue/compiler-sfc', root).parse(text, { filename: file })
    if (errors.length) {
      throw new Error(`${file}: invalid Vue source: ${errors[0]}`)
    }
    scripts = [descriptor.script, descriptor.scriptSetup].filter(Boolean).map((script) => ({
      content: script.content,
      kind: /^(?:t|j)sx$/.test(script.lang ?? '') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    }))
    if (descriptor.script?.src) {
      scripts.push({ content: `import ${JSON.stringify(descriptor.script.src)}`, kind: ts.ScriptKind.TS })
    }
  }
  const imports = []
  for (const script of scripts) {
    const ast = ts.createSourceFile(file, script.content, ts.ScriptTarget.Latest, true, script.kind)
    if (ast.parseDiagnostics.length) {
      throw new Error(
        `${file}: source syntax error: ${ts.flattenDiagnosticMessageText(ast.parseDiagnostics[0].messageText, ' ')}`,
      )
    }
    function visit(node) {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        imports.push(node.moduleSpecifier.text)
      }
      if (
        ts.isImportTypeNode(node) &&
        ts.isLiteralTypeNode(node.argument) &&
        ts.isStringLiteral(node.argument.literal)
      ) {
        imports.push(node.argument.literal.text)
      }
      if (
        ts.isCallExpression(node) &&
        (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
          (ts.isIdentifier(node.expression) && node.expression.text === 'require')) &&
        node.arguments[0] &&
        ts.isStringLiteral(node.arguments[0])
      ) {
        imports.push(node.arguments[0].text)
      }
      if (ts.isExternalModuleReference(node) && ts.isStringLiteral(node.expression)) {
        imports.push(node.expression.text)
      }
      ts.forEachChild(node, visit)
    }
    visit(ast)
  }
  return imports
}
function workspaceClassifier(root) {
  const configFile = resolve(root, 'pnpm-workspace.yaml')
  const patterns = existsSync(configFile)
    ? loadParserDependency('yaml', root).parse(readFileSync(configFile, 'utf8')).packages
    : ['packages/*']
  if (!Array.isArray(patterns) || patterns.some((pattern) => typeof pattern !== 'string')) {
    throw new Error('pnpm-workspace.yaml must declare package patterns as strings')
  }
  const match = loadParserDependency('picomatch', root)
  const included = patterns.filter((pattern) => !pattern.startsWith('!'))
  const excluded = patterns.filter((pattern) => pattern.startsWith('!')).map((pattern) => pattern.slice(1))
  return (label) => {
    if (label === 'package.json') {
      return true
    }
    const directory = label.slice(0, -'/package.json'.length)
    return (
      included.some((pattern) => match.isMatch(directory, pattern, { dot: true })) &&
      !excluded.some((pattern) => match.isMatch(directory, pattern, { dot: true }))
    )
  }
}
export function auditPackages(root) {
  root = resolve(root)
  const rootManifest = readJson(resolve(root, 'package.json'))
  const templates =
    rootManifest.name === '@maple-design/workspace-vue'
      ? {
          'packages/cli/template/generators/base/package.json': 'maple-library-template-vue',
          'packages/ui-playground/src/download/template/package.json': 'maple-playground-demo-vue',
        }
      : {}
  const manifests = []
  filesIn(root, (file) => {
    if (file.endsWith('/package.json')) {
      manifests.push({ file, label: relative(root, file).replaceAll('\\', '/'), pkg: readJson(file) })
    }
  })
  const isWorkspace = workspaceClassifier(root)
  const names = new Set()
  const workspaceNames = new Set(manifests.filter(({ label }) => isWorkspace(label)).map(({ pkg }) => pkg.name))
  for (const { file, label, pkg } of manifests) {
    const workspace = isWorkspace(label)
    if (!workspace && !(label in templates)) {
      throw new Error(`Unclassified package.json: ${label}; internal source modules must not contain package manifests`)
    }
    if (/^packages\/(?:cedar|maple)-/.test(label)) {
      throw new Error(`Branded package directory: ${label}`)
    }
    if (workspace && label.startsWith('tests/vue-compat/') && pkg.private !== true) {
      throw new Error(`${label}: compatibility fixture must be private`)
    }
    validatePackageName(pkg.name, label)
    if (names.has(pkg.name)) {
      throw new Error(`Duplicate package name: ${pkg.name}`)
    }
    names.add(pkg.name)
    if (label in templates && pkg.name !== templates[label]) {
      throw new Error(`Template name mismatch: ${label}: expected ${templates[label]}`)
    }
    if (label === 'packages/ui-playground/src/download/template/package.json' && pkg.private !== true) {
      throw new Error(`${label}: application template must be private`)
    }
    for (const field of dependencyFields) {
      for (const [name, specifier] of Object.entries(pkg[field] ?? {})) {
        if (
          label in templates &&
          (specifier.startsWith('catalog:') || (label.includes('ui-playground/') && specifier.startsWith('workspace:')))
        ) {
          throw new Error(`${label}: project template leaks a local dependency ${name}: ${specifier}`)
        }
        const alias = /^npm:(@[^/]+\/[^@/]+|[^@/]+)(?:@|$)/.exec(specifier)?.[1]
        if (name === pkg.name || alias === pkg.name) {
          throw new Error(`${label}: package depends on itself via ${field}: ${name}`)
        }
        validateDependency(name, `${label}#${field}`)
        if (alias) {
          validateDependency(alias, `${label}#${field} alias`)
        }
        if (specifier.startsWith('workspace:') && !workspaceNames.has(name)) {
          throw new Error(`${label}: missing workspace package ${name}`)
        }
        if (internalScope.test(name)) {
          validateLocalReference(name, specifier, file)
        }
      }
    }
    for (const [name, specifier] of Object.entries(pkg.pnpm?.overrides ?? {})) {
      if (internalScope.test(name)) {
        validateDependency(name, `${label}#pnpm.overrides`)
        validateLocalReference(name, specifier, file)
      }
    }
    for (const [name, target] of Object.entries(
      typeof pkg.bin === 'string' ? { [pkg.name]: pkg.bin } : (pkg.bin ?? {}),
    )) {
      if (!existsSync(resolve(dirname(file), target))) {
        throw new Error(`${label}: missing executable ${name}: ${target}`)
      }
    }
    for (const field of ['repository', 'bugs']) {
      if (/https?:\/\/xxx(?:\/|$)/.test(JSON.stringify(pkg[field] ?? ''))) {
        throw new Error(`${label}: placeholder ${field} URL`)
      }
    }
    for (const [name, command] of Object.entries(pkg.scripts ?? {})) {
      validateFrameworkReference(command, `${label}#scripts.${name}`)
      for (const match of command.matchAll(/@(?:cedar-design|maple-design|sparknest)\/[\w.-]+/g)) {
        validateDependency(match[0], `${label}#scripts.${name}`)
      }
    }
  }
  for (const label of Object.keys(templates)) {
    if (!manifests.some((item) => item.label === label)) {
      throw new Error(`Missing project template: ${label}`)
    }
  }
  if ('packages/cli/template/generators/base/package.json' in templates) {
    for (const file of ['ui-build.config.mjs', 'tsconfig.declaration.json']) {
      const path = `packages/cli/template/generators/base/${file}`
      if (!existsSync(resolve(root, path))) {
        throw new Error(`Missing template compiler config: ${path}`)
      }
    }
  }
  let sourceCount = 0
  let ts
  filesIn(root, (file) => {
    const label = relative(root, file)
    if (
      !/\.(?:[cm]?[jt]sx?|vue)$/.test(file) ||
      /\.(?:test|spec)\./.test(file) ||
      label.split(/[\\/]/).includes('__tests__')
    ) {
      return
    }
    sourceCount++
    ts ??= loadParserDependency('typescript-js', root)
    for (const specifier of sourceImports(file, readFileSync(file, 'utf8'), ts, root)) {
      validateDependency(specifier, label)
      validateFrameworkReference(specifier, label)
    }
  })
  const result = { packages: workspaceNames.size, templates: Object.keys(templates).length, sourceCount }
  console.log(
    `${framework}: ${result.packages} workspace manifests, ${result.templates} templates and ${sourceCount} authored modules passed package boundaries`,
  )
  return result
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  auditPackages(process.argv[2] ?? process.cwd())
}
