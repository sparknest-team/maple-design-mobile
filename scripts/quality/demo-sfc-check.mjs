import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { demoFilesForLanguage } from './demo-language-files.mjs'

const root = fileURLToPath(new URL('../../', import.meta.url))
const require = createRequire(resolve(root, 'packages/maple-ui/package.json'))
const { parse, compileScript, compileTemplate } = require('vue/compiler-sfc')
const ts = require('typescript')
const source = resolve(root, 'packages/maple-ui/src')
const rootEntry = ts.createSourceFile(
  'index.ts',
  readFileSync(join(source, 'index.ts'), 'utf8'),
  ts.ScriptTarget.Latest,
)
const publicRuntimeExports = new Set(
  rootEntry.statements.flatMap((statement) =>
    ts.isExportDeclaration(statement) &&
    !statement.isTypeOnly &&
    statement.exportClause &&
    ts.isNamedExports(statement.exportClause)
      ? statement.exportClause.elements.filter((item) => !item.isTypeOnly).map((item) => item.name.text)
      : [],
  ),
)
const programmaticApis = new Set([
  'ImagePreview',
  'imagePreview',
  'Message',
  'Picker',
  'ActionSheet',
  'Dialog',
  'Locale',
  'ThemeProvider',
  // Preset configuration is a script API, not a component rendered by the template.
  'Themes',
  'SafeArea',
  'LoadingBar',
  'Form',
  'useFormItem',
  'useFormErrorDescription',
  'useUploader',
])
const singleSourceDemoComponents = new Set([
  'breadcrumb',
  'cascader',
  'code',
  'date',
  'date-range',
  'floating-panel',
  'form',
  'input',
  'notice-bar',
  'number-keyboard',
  'progress-group',
  'pull-refresh',
  'search',
  'skeleton',
  'space',
  'steps',
  'time',
  'verification-code',
])
const importRe = /(?:^|\n)import\s+(type\s+)?([\s\S]*?)\s+from\s+['"]([^'"]+)['"]/g

function importedNames(clause) {
  const trimmed = clause.trim()
  if (!trimmed.startsWith('{')) {
    return [trimmed.split(/\s+as\s+/)[0].replace(/\s+/g, '')].filter(Boolean)
  }
  return trimmed
    .slice(1, -1)
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => !part.startsWith('type '))
    .map((part) => part.split(/\s+as\s+/)[0].trim())
}

function checkResolverImports(filename, code) {
  const issues = []
  if (filename.endsWith('/example/index.vue')) {
    if (/createDemoMessages|from ['"]\.\/locale(?:\/index)?['"]|(?<![\w$])t\((['"])[^'"]+\1\)/.test(code)) {
      issues.push(
        'example entry must switch direct bilingual titles from watchLang; do not maintain a separate title locale',
      )
    }
    if (/<app-type\b/.test(code) && !/\bAppType\b/.test(code)) {
      issues.push('example entry renders <app-type> without importing AppType')
    }
  }
  if (filename.includes('/example/demos/')) {
    if (/from ['"]\.\.\/(?:\.\/)?locale(?:\/index)?['"]/.test(code)) {
      issues.push('demo copy must be written directly; do not import component example locale')
    }
    if (/(?<![\w$])t\((['"])[^'"]+\1\)/.test(code)) {
      issues.push('demo copy must be written directly; do not call a demo translation helper')
    }
    if (/\n\{\n[\s\S]*?\n\}\s*<\/script>/.test(code)) {
      issues.push('demo script contains a stray top-level block; initialize state in declarations or lifecycle hooks')
    }
  }
  for (const match of code.matchAll(importRe)) {
    const isType = Boolean(match[1]) || match[2].trim().startsWith('type ')
    const from = match[3]
    if (isType) {
      continue
    }
    if (from === '@maple-design/ui') {
      for (const name of importedNames(match[2])) {
        if (!publicRuntimeExports.has(name)) {
          issues.push(`"${name}" is not exported by the public library entry`)
        }
        if (!programmaticApis.has(name)) {
          issues.push(`do not import template component "${name}"; use MapleResolver`)
        }
      }
      continue
    }
    if (from.startsWith('@maple-design/ui/')) {
      issues.push(`do not deep-import "${from}"; use MapleResolver`)
      continue
    }
    const resolvedImport = resolve(dirname(filename), from)
    const exampleRoot = filename.slice(0, filename.lastIndexOf('/example/') + '/example'.length)
    const localExampleImport = !relative(exampleRoot, resolvedImport).startsWith('..')
    // Review scaffolding injects actual Maple controls; it is not a UI deep import.
    if (
      ['ApiReviewPanel.vue', 'ApiReviewSuite.vue'].some(
        (name) => resolvedImport === join(source, '../docs/components', name),
      )
    ) {
      continue
    }
    // Component pages can share a demo without importing library implementation files.
    const sharedExampleImport =
      /^[^/]+\/example\/demos\/[^/]+\.vue$/.test(relative(source, resolvedImport)) && existsSync(resolvedImport)
    const localDemo =
      from.startsWith('./') ||
      from.includes('locale') ||
      from.includes('/json/') ||
      localExampleImport ||
      sharedExampleImport
    if (localDemo) {
      continue
    }
    if (from === '..' && importedNames(match[2]).every((name) => name === 'Form')) {
      continue
    }
    if (from === '..' || from.startsWith('../')) {
      issues.push(`do not import UI from "${from}"; use MapleResolver`)
    }
  }
  if (issues.length) {
    throw new Error(issues.join('\n'))
  }
}

function checkLibraryControls(node, insideLabel = false) {
  if (!node) {
    return
  }
  if (node.type === 1) {
    if (insideLabel && ['mp-select', 'MpSelect'].includes(node.tag)) {
      throw new Error(
        'Do not wrap MpSelect in a native label: label activation forwards another click and closes the menu; use a div and aria-label',
      )
    }
    const nativeCheckbox =
      node.tag === 'input' &&
      node.props.some((prop) => prop.type === 6 && prop.name === 'type' && prop.value?.content === 'checkbox')
    if (node.tag === 'select' || nativeCheckbox) {
      throw new Error('Demo controls must use MpSelect / MpCheckbox instead of native select / checkbox elements')
    }
  }
  for (const child of node.children ?? []) {
    checkLibraryControls(child, insideLabel || (node.type === 1 && node.tag === 'label'))
  }
}

let count = 0
let failures = 0
function check(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filename = join(directory, entry.name)
    if (entry.isDirectory()) {
      check(filename)
      continue
    }
    if (!filename.endsWith('.vue')) {
      continue
    }
    count++
    try {
      const code = readFileSync(filename, 'utf8')
      const { descriptor, errors } = parse(code, { filename })
      if (errors.length) {
        throw errors[0]
      }
      checkResolverImports(filename, code)
      checkLibraryControls(descriptor.template?.ast)
      const script =
        descriptor.script || descriptor.scriptSetup
          ? compileScript(descriptor, {
              id: filename,
              fs: { fileExists: existsSync, readFile: (file) => readFileSync(file, 'utf8') },
            })
          : undefined
      if (descriptor.template) {
        const template = compileTemplate({
          source: descriptor.template.content,
          filename,
          id: filename,
          compilerOptions: {
            bindingMetadata: script?.bindings,
            expressionPlugins: descriptor.scriptSetup?.lang === 'ts' ? ['typescript'] : [],
          },
        })
        if (template.errors.length) {
          throw template.errors[0]
        }
      }
    } catch (error) {
      failures++
      console.error(`${filename}\n${error.message ?? error}`)
    }
  }
}

function checkDemoDocs(component, examples) {
  const demos = join(examples, 'demos')
  if (!existsSync(demos)) {
    return
  }

  const collectDemoFiles = (directory, prefix = '') =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      const name = prefix ? `${prefix}/${entry.name}` : entry.name
      return entry.isDirectory()
        ? collectDemoFiles(join(directory, entry.name), name)
        : entry.name.endsWith('.vue')
          ? [name]
          : []
    })
  const demoFiles = collectDemoFiles(demos).sort()

  for (const language of ['zh-CN', 'en-US']) {
    const filename = join(source, component, 'docs', `${language}.md`)
    if (!existsSync(filename)) {
      continue
    }

    let documentFile = filename
    let code = readFileSync(documentFile, 'utf8')
    const redirected = code.match(/^---\n[\s\S]*?^redirectTo:\s*\/(zh-CN|en-US)\/([\w-]+)\s*$[\s\S]*?\n---/m)
    if (redirected) {
      documentFile = join(source, redirected[2], 'docs', `${redirected[1]}.md`)
      code = readFileSync(documentFile, 'utf8')
    }
    const references = [...code.matchAll(/```demo\s*\n([^\n]+\.vue)\s*\n```|<demo\b[^>]*src="([^"]+\.vue)"/g)]
      .map((match) => relative(demos, resolve(dirname(documentFile), (match[1] ?? match[2]).trim())))
      .filter((file) => !file.startsWith('..'))
    const uniqueReferences = [...new Set(references)].sort()
    // Internal API review fixtures compile above but are intentionally not public demos.
    const expectedFiles = demoFilesForLanguage(demoFiles, language).filter(
      (file) => !/(?:^|\/)api-review(?:-|\.)/.test(file),
    )
    // A review suite exposes its selected cases through local SFC imports.
    const reachable = new Set(uniqueReferences)
    const queue = [...uniqueReferences]
    while (queue.length) {
      const file = queue.shift()
      const absolute = resolve(demos, file)
      if (!existsSync(absolute)) {
        continue
      }
      const content = readFileSync(absolute, 'utf8')
      for (const match of content.matchAll(/import\s+\w+\s+from\s+['"](\.[^'"]+\.vue)['"]/g)) {
        const nested = relative(demos, resolve(dirname(absolute), match[1]))
        if (!demoFiles.includes(nested) || reachable.has(nested)) {
          continue
        }
        reachable.add(nested)
        queue.push(nested)
      }
    }
    const missing = expectedFiles.filter((demo) => !reachable.has(demo))
    const unknown = uniqueReferences.filter((demo) => !demoFiles.includes(demo))
    const apiHeadingCount = code.match(/^## API$/gm)?.length ?? 0
    const issues = []

    if (references.length !== uniqueReferences.length) {
      issues.push('contains duplicate demo references')
    }
    if (missing.length) {
      issues.push(`does not expose demos: ${missing.join(', ')}`)
    }
    if (unknown.length) {
      issues.push(`references missing demos: ${unknown.join(', ')}`)
    }
    if (apiHeadingCount > 1) {
      issues.push('contains more than one top-level API section; nest subcomponent APIs below their component heading')
    }
    if (singleSourceDemoComponents.has(component) && /```(?:html|vue)\b/.test(code)) {
      issues.push('contains a copied component example; use a demo SFC as the single source of truth')
    }

    if (issues.length) {
      failures++
      console.error(`${filename}\n${issues.join('\n')}`)
    }
  }
}

for (const component of readdirSync(source)) {
  const examples = join(source, component, 'example')
  if (existsSync(examples)) {
    check(examples)
    checkDemoDocs(component, examples)
  }
}
console.info(`Checked ${count} demo SFCs; ${failures} failures`)
process.exitCode = failures ? 1 : 0
