import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const require = createRequire(resolve(root, 'packages/maple-ui/package.json'))
const { parse, compileScript, compileTemplate } = require('vue/compiler-sfc')
const source = resolve(root, 'packages/maple-ui/src')
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
      const { descriptor, errors } = parse(readFileSync(filename, 'utf8'), { filename })
      if (errors.length) {
        throw errors[0]
      }
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
