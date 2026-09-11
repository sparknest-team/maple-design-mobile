import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join, resolve } from 'node:path'
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
    const localDemo = from.startsWith('./') || from.includes('locale') || from.includes('/json/')
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
for (const component of readdirSync(source)) {
  const examples = join(source, component, 'example')
  if (existsSync(examples)) {
    check(examples)
  }
}
console.info(`Checked ${count} demo SFCs; ${failures} failures`)
process.exitCode = failures ? 1 : 0
