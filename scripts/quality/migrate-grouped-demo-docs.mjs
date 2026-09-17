import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const write = process.argv.includes('--write')
const components = process.argv.slice(2).filter((argument) => argument !== '--write')
const sourceRoot = resolve('packages/maple-ui/src')

if (!components.length) {
  throw new Error('Pass one or more component directory names.')
}

function getDemos(component) {
  const indexPath = resolve(sourceRoot, component, 'example/index.vue')
  if (!existsSync(indexPath)) {
    throw new Error(`Missing example entry: ${component}`)
  }
  const source = readFileSync(indexPath, 'utf8')
  const imports = new Map(
    [...source.matchAll(/import\s+(\w+)\s+from\s+['"](\.\/demos\/[^'"]+\.vue)['"]/g)].map((match) => [
      match[1],
      match[2],
    ]),
  )

  return [...source.matchAll(/<section\b[^>]*data-demo=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/section>/g)]
    .map((match) => {
      const componentName = match[2].match(/<([A-Z]\w*)\b/)?.[1]
      const titleKey = match[2].match(/\bt\(\s*['"]([^'"]+)['"]\s*\)/)?.[1]
      const inlineTitles = match[2].match(/english\s*\?\s*['"]([^'"]+)['"]\s*:\s*['"]([^'"]+)['"]/)
      return {
        id: match[1],
        request: componentName ? imports.get(componentName) : undefined,
        titleKey,
        titles: inlineTitles ? { 'en-US': inlineTitles[1], 'zh-CN': inlineTitles[2] } : undefined,
      }
    })
    .filter((demo) => demo.request)
    .map((demo) => ({ ...demo, request: `../example/${demo.request.slice(2)}` }))
}

function getLocaleTitles(indexPath, demos, language) {
  const localePath = resolve(dirname(indexPath), 'locale', `${language}.ts`)
  const inlineTitles = new Map(
    demos.flatMap((demo) => (demo.titles?.[language] ? [[demo.id, demo.titles[language]]] : [])),
  )
  if (!existsSync(localePath)) {
    return inlineTitles
  }
  const localeSource = readFileSync(localePath, 'utf8')
  const messages = new Map(
    [...localeSource.matchAll(/^\s*([\w$]+):\s*['"]([^'"]+)['"],?\s*$/gm)].map((match) => [match[1], match[2]]),
  )
  return new Map([
    ...inlineTitles,
    ...demos.flatMap((demo) =>
      demo.titleKey && messages.has(demo.titleKey) ? [[demo.id, messages.get(demo.titleKey)]] : [],
    ),
  ])
}

function slug(value) {
  return value
    .replace(/^###\s+/, '')
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/[^A-Za-z\d]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

function comparableTitle(value) {
  return value
    .trim()
    .replace(/\s*[（(][^)）]+[)）]\s*$/, '')
    .toLocaleLowerCase()
}

function migrateDocument(file, demos, titles) {
  const source = readFileSync(file, 'utf8')
  const bodyStart = 0
  const bodyEnd = source.length
  const body = source
  const headings = [...body.matchAll(/^### .+$/gm)]
  const demoHeadings = headings.filter((heading, index) => {
    const end = headings[index + 1]?.index ?? body.length
    return /```[^\n]*\n[\s\S]*?\n```/.test(body.slice(heading.index, end))
  })
  const pairs = []
  const claimed = new Set()
  demos.forEach((demo) => {
    const localizedTitle = titles.get(demo.id)
    const heading = demoHeadings.find((candidate) => {
      if (claimed.has(candidate)) {
        return false
      }
      const headingIndex = headings.indexOf(candidate)
      const end = headings[headingIndex + 1]?.index ?? body.length
      const section = body.slice(candidate.index, end)
      if (section.includes(`\n${demo.request}\n`)) {
        return true
      }
      const title = candidate[0].replace(/^###\s+/, '').trim()
      return localizedTitle
        ? comparableTitle(title) === comparableTitle(localizedTitle)
        : slug(candidate[0]) === demo.id
    })
    if (heading) {
      claimed.add(heading)
      pairs.push({ demo, heading })
    }
  })

  const replacements = pairs
    .map(({ demo, heading }) => {
      const headingIndex = headings.indexOf(heading)
      const start = heading.index
      const end = headings[headingIndex + 1]?.index ?? body.length
      const section = body
        .slice(start, end)
        .replace(/```[^\n]*\n[\s\S]*?\n```[ \t]*/g, '')
        .trimEnd()
      return { end, start, value: `${section}\n\n\`\`\`demo\n${demo.request}\n\`\`\`\n\n` }
    })
    .sort((a, b) => a.start - b.start)

  let cursor = 0
  let migrated = ''
  replacements.forEach((replacement) => {
    migrated += body.slice(cursor, replacement.start) + replacement.value
    cursor = replacement.end
  })
  migrated += body.slice(cursor)

  const unmatched = demos.filter((demo) => !pairs.some((pair) => pair.demo === demo))
  if (unmatched.length) {
    const details = unmatched
      .map((demo) => `${demo.id}${titles.get(demo.id) ? ` (${titles.get(demo.id)})` : ''}`)
      .join(', ')
    throw new Error(`${file}: demo sections must be mapped explicitly; unmatched: ${details}`)
  }

  const result = source.slice(0, bodyStart) + migrated + source.slice(bodyEnd)
  if (write) {
    writeFileSync(file, result)
  }
}

for (const component of components) {
  const indexPath = resolve(sourceRoot, component, 'example/index.vue')
  const demos = getDemos(component)
  if (!demos.length) {
    throw new Error(`No section[data-demo] entries found: ${component}`)
  }
  for (const language of ['zh-CN', 'en-US']) {
    migrateDocument(
      resolve(sourceRoot, component, 'docs', `${language}.md`),
      demos,
      getLocaleTitles(indexPath, demos, language),
    )
  }
  console.log(`${write ? 'Migrated' : 'Checked'} ${component}: ${demos.length} demos`)
}
