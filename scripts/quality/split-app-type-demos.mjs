import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { basename, dirname, relative, resolve } from 'node:path'
import process from 'node:process'

const root = resolve(import.meta.dirname, '../..')
const require = createRequire(resolve(root, 'packages/cli/package.json'))
const { parse } = require('@vue/compiler-sfc')
const babel = require('@babel/core')

const write = process.argv.includes('--write')
const prune = process.argv.includes('--prune')
const repairIndex = process.argv.includes('--repair-index')
const repairStyles = process.argv.includes('--repair-styles')
const pageDemo = process.argv.includes('--page')
const requested = process.argv
  .slice(2)
  .filter((argument) => !['--write', '--prune', '--repair-index', '--repair-styles', '--page'].includes(argument))
const sourceRoot = resolve(root, 'packages/ui/src')

function words(source) {
  return new Set(source.match(/[A-Za-z_$][\w$]*/g) ?? [])
}

function addPatternNames(pattern, names) {
  if (!pattern) {
    return
  }
  if (pattern.type === 'Identifier') {
    names.add(pattern.name)
    return
  }
  if (pattern.type === 'RestElement') {
    addPatternNames(pattern.argument, names)
    return
  }
  if (pattern.type === 'AssignmentPattern') {
    addPatternNames(pattern.left, names)
    return
  }
  if (pattern.type === 'ObjectPattern') {
    pattern.properties.forEach((property) => addPatternNames(property.value ?? property.argument, names))
    return
  }
  if (pattern.type === 'ArrayPattern') {
    pattern.elements.forEach((element) => addPatternNames(element, names))
  }
}

function declaredNames(node) {
  const names = new Set()
  if (node.type === 'VariableDeclaration') {
    node.declarations.forEach((declaration) => addPatternNames(declaration.id, names))
  } else if (node.id?.name) {
    names.add(node.id.name)
  }
  return names
}

function rewriteRelativeImports(source) {
  return source.replace(/(from\s+['"]|import\s*\(\s*['"])(\.\.?\/[^'"]+)(['"])/g, (_, before, request, after) => {
    return `${before}${request.startsWith('./') ? `../${request.slice(2)}` : `../${request}`}${after}`
  })
}

function rewriteMovedStyles(source) {
  return source
    .replace(/(@import(?:\s+\([^)]*\))?\s*['"])(\.\.?\/)/g, '$1../$2')
    .replace(/(url\(\s*['"]?)(\.\.?\/)/g, '$1../$2')
}

function pruneImports(source, template, filename) {
  if (!source.trim()) {
    return source
  }
  const ast = babel.parseSync(source, {
    filename,
    parserOpts: { plugins: ['typescript', 'jsx', 'decorators-legacy'], sourceType: 'module' },
  })
  const imports = ast.program.body.filter((node) => node.type === 'ImportDeclaration')
  const withoutImports = imports.reduceRight(
    (result, node) => `${result.slice(0, node.start)}${result.slice(node.end)}`,
    source,
  )
  const used = words(`${withoutImports}\n${template}`)
  return imports.reduceRight((result, node) => {
    const keep = !node.specifiers.length || node.specifiers.some((specifier) => used.has(specifier.local.name))
    return keep ? result : `${result.slice(0, node.start)}${result.slice(node.end)}`
  }, source)
}

function selectScript(script, template, filename, moveIntoDemos = true) {
  if (!script?.content.trim()) {
    return ''
  }
  const source = script.content
  const ast = babel.parseSync(source, {
    filename,
    parserOpts: {
      plugins: ['typescript', 'jsx', 'decorators-legacy'],
      sourceType: 'module',
    },
  })
  const imports = []
  const declarations = []
  const effects = []

  for (const node of ast.program.body) {
    const text = source.slice(node.start, node.end)
    if (node.type === 'ImportDeclaration') {
      imports.push(text)
      continue
    }
    const names = declaredNames(node)
    const entry = { names, text, used: words(text) }
    if (names.size) {
      declarations.push(entry)
    } else {
      effects.push(entry)
    }
  }

  const needed = words(template)
  const selected = new Set()
  let changed = true
  while (changed) {
    changed = false
    declarations.forEach((entry, index) => {
      if (selected.has(index) || ![...entry.names].some((name) => needed.has(name))) {
        return
      }
      selected.add(index)
      entry.used.forEach((name) => needed.add(name))
      changed = true
    })
  }

  const selectedNames = new Set(needed)
  selected.forEach((index) => declarations[index].names.forEach((name) => selectedNames.add(name)))
  const selectedEffects = effects.filter((entry) => [...entry.used].some((name) => selectedNames.has(name)))
  const body = [
    ...imports,
    ...declarations.filter((_, index) => selected.has(index)).map((entry) => entry.text),
    ...selectedEffects.map((entry) => entry.text),
  ]

  const selectedCode = body.join('\n')
  return pruneImports(moveIntoDemos ? rewriteRelativeImports(selectedCode) : selectedCode, template, filename).trim()
}

function kebab(value) {
  return value
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/[^A-Za-z\d]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

function pascal(value) {
  return value.replace(/(^|-)(\w)/g, (_, __, character) => character.toUpperCase())
}

function titleKey(node, index) {
  const match = node.loc.source.match(/\bt\(\s*['"]([^'"]+)['"]\s*\)/)
  return match?.[1] ?? `demo-${index + 1}`
}

function componentNames() {
  if (requested.length) {
    return requested
  }
  return []
}

function pruneComponent(name) {
  const demosDir = resolve(sourceRoot, name, 'example/demos')
  if (!existsSync(demosDir)) {
    throw new Error(`${name}: missing example/demos`)
  }
  let count = 0
  for (const entry of readdirSync(demosDir)) {
    if (!entry.endsWith('.vue')) {
      continue
    }
    const filename = resolve(demosDir, entry)
    const source = readFileSync(filename, 'utf8')
    const { descriptor, errors } = parse(source, { filename })
    if (errors.length || !descriptor.scriptSetup) {
      continue
    }
    const nextScript = pruneImports(descriptor.scriptSetup.content, descriptor.template?.content ?? '', filename).trim()
    const nextSource = source.replace(
      /(<script\s+setup[^>]*>)[\s\S]*?(<\/script>)/,
      (_, start, end) => `${start}\n${nextScript}\n${end}`,
    )
    if (write) {
      writeFileSync(filename, nextSource)
    }
    count++
  }
  console.log(`${name}: ${count} demos${write ? ' pruned' : ' checked'}`)
}

function repairComponentIndex(name) {
  const indexPath = resolve(sourceRoot, name, 'example/index.vue')
  const repositoryPath = relative(root, indexPath)
  const original = execFileSync('git', ['show', `HEAD:${repositoryPath}`], { cwd: root, encoding: 'utf8' })
  const current = readFileSync(indexPath, 'utf8')
  const originalDescriptor = parse(original, { filename: indexPath }).descriptor
  const currentDescriptor = parse(current, { filename: indexPath }).descriptor
  const titleNodes = originalDescriptor.template.ast.children.filter(
    (node) => node.type === 1 && node.tag === 'app-type',
  )
  const sections = [
    ...current.matchAll(/<section\b[^>]*data-demo="([^"]+)"[^>]*>[\s\S]*?<([A-Z]\w*)\s*\/>[\s\S]*?<\/section>/g),
  ]
  const demoImports = currentDescriptor.scriptSetup.content
    .split('\n')
    .filter((line) => /from ['"]\.\/demos\//.test(line))
  if (titleNodes.length !== sections.length || demoImports.length !== sections.length) {
    throw new Error(`${name}: original titles, sections and demo imports do not align`)
  }
  const titleSources = titleNodes.map((node) =>
    node.children
      .map((child) => child.loc.source)
      .join('')
      .trim(),
  )
  const supportTemplate = `${titleSources.join('\n')} AppType watchLang use onThemeChange`
  const supportScript = selectScript(originalDescriptor.scriptSetup, supportTemplate, indexPath, false)
  const nextSections = sections
    .map(
      (section, index) =>
        `  <section data-demo="${section[1]}">\n    <app-type>${titleSources[index]}</app-type>\n    <${section[2]} />\n  </section>`,
    )
    .join('\n\n')
  const next = `<script setup${originalDescriptor.scriptSetup.lang ? ` lang="${originalDescriptor.scriptSetup.lang}"` : ''}>\n${supportScript}\n${demoImports.join('\n')}\n</script>\n\n<template>\n${nextSections}\n</template>\n`
  if (write) {
    writeFileSync(indexPath, next)
  }
  console.log(`${name}: ${sections.length} index titles${write ? ' repaired' : ' checked'}`)
}

function repairComponentStyles(name) {
  const demosDir = resolve(sourceRoot, name, 'example/demos')
  let count = 0
  for (const entry of readdirSync(demosDir)) {
    if (!entry.endsWith('.vue')) {
      continue
    }
    const filename = resolve(demosDir, entry)
    const source = readFileSync(filename, 'utf8')
    const next = source.replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/g, (_, start, content, end) => {
      return `${start}${rewriteMovedStyles(content)}${end}`
    })
    if (write) {
      writeFileSync(filename, next)
    }
    count++
  }
  console.log(`${name}: ${count} demo styles${write ? ' repaired' : ' checked'}`)
}

function promotePageDemo(name) {
  const indexPath = resolve(sourceRoot, name, 'example/index.vue')
  const source = readFileSync(indexPath, 'utf8')
  const moved = rewriteMovedStyles(rewriteRelativeImports(source))
  const aggregate = `<script setup>\nimport BasicDemo from './demos/basic.vue'\n</script>\n\n<template>\n  <section data-demo="basic">\n    <BasicDemo />\n  </section>\n</template>\n`
  if (write) {
    const demosDir = resolve(dirname(indexPath), 'demos')
    mkdirSync(demosDir, { recursive: true })
    writeFileSync(resolve(demosDir, 'basic.vue'), moved)
    writeFileSync(indexPath, aggregate)
  }
  console.log(`${name}: page demo${write ? ' promoted' : ' checked'}`)
}

function splitComponent(name) {
  const indexPath = resolve(sourceRoot, name, 'example/index.vue')
  if (!existsSync(indexPath)) {
    throw new Error(`${name}: missing example/index.vue`)
  }
  const source = readFileSync(indexPath, 'utf8')
  const { descriptor, errors } = parse(source, { filename: indexPath })
  if (errors.length || !descriptor.template) {
    throw new Error(`${name}: invalid Vue SFC`)
  }

  let roots = descriptor.template.ast.children.filter((node) => node.type === 1)
  let wrapperStart = ''
  let wrapperEnd = ''
  let headings = roots.map((node, rootIndex) => ({ node, rootIndex })).filter(({ node }) => node.tag === 'app-type')
  if (!headings.length && roots.length === 1) {
    const wrapper = roots[0]
    const children = wrapper.children.filter((node) => node.type === 1)
    const nestedHeadings = children
      .map((node, rootIndex) => ({ node, rootIndex }))
      .filter(({ node }) => node.tag === 'app-type')
    if (nestedHeadings.length >= 2) {
      roots = children
      headings = nestedHeadings
      wrapperStart = source.slice(wrapper.loc.start.offset, children[0].loc.start.offset).trim()
      wrapperEnd = source.slice(children.at(-1).loc.end.offset, wrapper.loc.end.offset).trim()
    }
  }
  if (headings.length < 2 || headings[0].rootIndex !== 0) {
    throw new Error(`${name}: expected at least two direct, leading <app-type> sections`)
  }

  const demos = []
  const usedIds = new Set()
  const existingDemoImports = new Map(
    [
      ...(descriptor.scriptSetup?.content ?? '').matchAll(/import\s+(\w+)\s+from\s+['"](\.\/demos\/[^'"]+\.vue)['"]/g),
    ].map((match) => [match[1], match[2]]),
  )
  headings.forEach(({ node, rootIndex }, index) => {
    const nextRoot = headings[index + 1]?.rootIndex ?? roots.length
    const bodyNodes = roots.slice(rootIndex + 1, nextRoot)
    if (!bodyNodes.length) {
      return
    }
    const content = source.slice(bodyNodes[0].loc.start.offset, bodyNodes.at(-1).loc.end.offset).trim()
    const body = wrapperStart ? `${wrapperStart}\n${content}\n${wrapperEnd}` : content
    const key = titleKey(node, index)
    let id = kebab(key) || `demo-${index + 1}`
    if (usedIds.has(id)) {
      id = `${id}-${index + 1}`
    }
    usedIds.add(id)
    const existingComponent = content.match(/^<([A-Z]\w*)\s*\/>$/)?.[1]
    const existingRequest = existingComponent ? existingDemoImports.get(existingComponent) : undefined
    if (existingRequest) {
      demos.push({
        component: existingComponent,
        existing: true,
        file: existingRequest.slice(existingRequest.lastIndexOf('/') + 1),
        id,
        key,
      })
      return
    }
    const file = `${id}.vue`
    const component = `${pascal(id)}Demo`
    const script = selectScript(descriptor.scriptSetup, body, indexPath)
    const scriptBlock = script
      ? `<script setup${descriptor.scriptSetup.lang ? ` lang="${descriptor.scriptSetup.lang}"` : ''}>\n${script}\n</script>\n\n`
      : ''
    const styles = descriptor.styles
      .map((style) => {
        const attributes = [style.lang && `lang="${style.lang}"`, style.scoped && 'scoped', style.module && 'module']
          .filter(Boolean)
          .join(' ')
        return `<style${attributes ? ` ${attributes}` : ''}>\n${rewriteMovedStyles(style.content.trim())}\n</style>`
      })
      .join('\n\n')
    const demoSource = `${scriptBlock}<template>\n${body}\n</template>${styles ? `\n\n${styles}` : ''}\n`
    demos.push({ component, demoSource, file, id, key, source: body })
  })

  const imports = demos.map((demo) => `import ${demo.component} from './demos/${demo.file}'`).join('\n')
  const sections = demos
    .map(
      (demo) =>
        `  <section data-demo="${demo.id}">\n    <app-type>{{ t('${demo.key}') }}</app-type>\n    <${demo.component} />\n  </section>`,
    )
    .join('\n\n')
  const aggregate =
    `<script setup>\nimport { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'\n${imports}\nimport { t, use } from './locale'\n\nwatchLang(use)\n` +
    `onThemeChange()\n</script>\n\n<template>\n${sections}\n</template>\n`

  if (write) {
    const demosDir = resolve(dirname(indexPath), 'demos')
    mkdirSync(demosDir, { recursive: true })
    demos
      .filter((demo) => !demo.existing)
      .forEach((demo) => writeFileSync(resolve(demosDir, demo.file), demo.demoSource))
    writeFileSync(indexPath, aggregate)
  }
  console.log(`${name}: ${demos.length} demos${write ? ' written' : ''}`)
}

const names = componentNames()
if (!names.length) {
  console.error(`Usage: node ${relative(root, import.meta.filename)} <component...> [--write]`)
  process.exitCode = 1
} else {
  names.forEach(
    repairIndex
      ? repairComponentIndex
      : repairStyles
        ? repairComponentStyles
        : pageDemo
          ? promotePageDemo
          : prune
            ? pruneComponent
            : splitComponent,
  )
}
