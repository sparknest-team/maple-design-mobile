import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const require = createRequire(resolve(root, 'packages/maple-ui/package.json'))
const { parse, compileScript, compileTemplate } = require('vue/compiler-sfc')
const source = resolve(root, 'packages/maple-ui/src')
const programmaticApis = new Set([
  'ImagePreview',
  'imagePreview',
  'Message',
  'Picker',
  'ActionSheet',
  'Dialog',
  'Locale',
  'StyleProvider',
  'LoadingBar',
  'Form',
  'useFormItem',
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
    if (from === '@maplejs/maple-ui') {
      for (const name of importedNames(match[2])) {
        if (!programmaticApis.has(name)) {
          issues.push(`do not import template component "${name}"; use MapleResolver`)
        }
      }
      continue
    }
    if (from.startsWith('@maplejs/maple-ui/')) {
      issues.push(`do not deep-import "${from}"; use MapleResolver`)
      continue
    }
    const resolvedImport = resolve(dirname(filename), from)
    const exampleRoot = filename.slice(0, filename.lastIndexOf('/example/') + '/example'.length)
    const localExampleImport = !relative(exampleRoot, resolvedImport).startsWith('..')
    const localDemo = from.startsWith('./') || from.includes('locale') || from.includes('/json/') || localExampleImport
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

    const code = readFileSync(filename, 'utf8')
    const references = [...code.matchAll(/\.\.\/example\/demos\/([^\s]+\.vue)/g)].map((match) => match[1])
    const uniqueReferences = [...new Set(references)].sort()
    const localizedFiles = demoFiles.filter((demo) => demo.startsWith(`${language}/`))
    const expectedFiles = localizedFiles.length
      ? localizedFiles
      : demoFiles.filter((demo) => !/^(?:zh-CN|en-US)\//.test(demo))
    const missing = expectedFiles.filter((demo) => !uniqueReferences.includes(demo))
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
