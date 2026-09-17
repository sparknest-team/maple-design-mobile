import { existsSync, readFileSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'
import { kebabCase } from '@maplejs/maple-shared'
import hljs from 'highlight.js'
import markdownIt from 'markdown-it'
import { pinyin } from 'pinyin-pro'
import type { Plugin } from 'vite'

const includeChinese = (value: string) => /[\u4e00-\u9fa5]/.test(value)

function transformHash(hash: string) {
  return (includeChinese(hash) ? pinyin(hash, { toneType: 'num' }) : hash).replaceAll(' ', '')
}

function htmlWrapper(html: string) {
  const matches = html.matchAll(/<h3>(.*?)<\/h3>/g)
  const hGroup = html
    .replace(/<h3>/g, () => {
      const hash = transformHash(matches.next().value![1])

      return `:::<h3 id="${hash}"><router-link to="#${hash}">#</router-link>`
    })
    .replace(/<h2/g, ':::<h2')
    .split(':::')

  const cardGroup = hGroup
    .map((fragment) => {
      if (!fragment.includes('<h3')) {
        return fragment
      }
      const demoClass = fragment.includes('maple-component-preview') ? ' card--demo' : ''
      return `<div class="card${demoClass}">${fragment}</div>`
    })
    .join('')

  return cardGroup.replace(/<code>/g, '<code v-pre>')
}

function extractComponents(source: string) {
  const componentRE = /import (.+) from ['"].+['"]/
  const importRE = /import .+ from ['"].+['"]/g
  const vueRE = /```vue((.|\r|\n)*?)```/g
  const imports: string[] = []
  const components: string[] = []

  source = source.replace(vueRE, (_, p1) => {
    const partImports = p1.match(importRE)

    const partComponents = partImports?.map((importer: string) => {
      importer = importer.replace(/(\n|\r)/g, '')
      const component = importer.replace(componentRE, '$1')
      !imports.includes(importer) && imports.push(importer)
      !components.includes(component) && components.push(component)

      return `<${kebabCase(component)} />`
    })

    return partComponents ? `<div class="maple-component-preview">${partComponents.join('\n')}</div>` : ''
  })

  return {
    imports,
    components,
    source,
  }
}

interface DemoFile {
  component: string
  request: string
  path: string
  source: string
  title?: string
  page?: boolean
}

function renderDemo(demo: DemoFile) {
  const encodedSource = encodeURIComponent(demo.source)
  const encodedHighlight = encodeURIComponent(highlight(demo.source, 'html'))
  const pageClass = demo.page ? ' maple-component-preview--page' : ''
  return `<div class="maple-component-preview${pageClass}">
<mp-site-demo-preview source-name="${basename(demo.path)}" source="${encodedSource}" highlight-code="${encodedHighlight}">
<${demo.component}></${demo.component}>
</mp-site-demo-preview>
</div>`
}

const demoPlaceholder = (index: number) => `MAPLE_DOC_DEMO_${index}`

function discoverGroupedDemos(indexPath: string, language: 'zh-CN' | 'en-US', onDependency?: (path: string) => void) {
  const indexSource = readFileSync(indexPath, 'utf8')
  const imports = new Map<string, string>()
  for (const match of indexSource.matchAll(/import\s+(\w+)\s+from\s+['"](\.\/demos\/[^'"]+\.vue)['"]/g)) {
    imports.set(match[1], match[2])
  }

  if (!imports.size) {
    return []
  }

  let messages: Record<string, string> = {}
  const messagesRequest = indexSource.match(/import\s+messages\s+from\s+['"](.+?\.json)['"]/)?.[1]
  if (messagesRequest) {
    const messagesPath = resolve(dirname(indexPath), messagesRequest)
    onDependency?.(messagesPath)
    const catalog = JSON.parse(readFileSync(messagesPath, 'utf8')) as Record<string, Record<string, string>>
    messages = catalog[language] ?? {}
  }

  return [...indexSource.matchAll(/<section\b[^>]*data-demo=['"]([^'"]+)['"][^>]*>[\s\S]*?<([A-Z]\w*)\b/g)]
    .map((match) => {
      const request = imports.get(match[2])
      if (!request) {
        return undefined
      }
      const name = request.slice(request.lastIndexOf('/') + 1, -4)
      return {
        id: match[1],
        request: `../example/${request.slice(2)}`,
        path: resolve(dirname(indexPath), request),
        title: messages[match[1]] ?? name.replaceAll('-', ' '),
      }
    })
    .filter((demo): demo is NonNullable<typeof demo> => !!demo)
}

function replaceGroupedExamples(source: string, demos: DemoFile[], language: 'zh-CN' | 'en-US') {
  const exampleHeading = /^## (?:案例|Examples?)[ \t]*$/m
  const headingMatch = exampleHeading.exec(source)
  if (!headingMatch) {
    const heading = language === 'en-US' ? '## Examples' : '## 案例'
    const generated = demos.map((demo, index) => `### ${demo.title}\n\n${demoPlaceholder(index)}`).join('\n\n')
    const section = `${heading}\n\n${generated}`
    const firstSection = /^## .+$/m
    return firstSection.test(source)
      ? source.replace(firstSection, (existing) => `${section}\n\n${existing}`)
      : `${source.trim()}\n\n${section}\n`
  }

  const bodyStart = headingMatch.index + headingMatch[0].length
  const nextSectionOffset = source.slice(bodyStart).search(/^## .+$/m)
  const bodyEnd = nextSectionOffset < 0 ? source.length : bodyStart + nextSectionOffset
  const body = source.slice(bodyStart, bodyEnd)
  const headings = [...body.matchAll(/^### .+$/gm)]

  if (headings.length < demos.length) {
    const generated = demos.map((demo, index) => `\n\n### ${demo.title}\n\n${demoPlaceholder(index)}`).join('')
    return `${source.slice(0, bodyStart)}${generated}\n\n${source.slice(bodyEnd)}`
  }

  const segments: string[] = []
  let cursor = 0
  demos.forEach((_, index) => {
    const start = headings[index].index!
    const end = headings[index + 1]?.index ?? body.length
    segments.push(body.slice(cursor, start))
    const segment = body
      .slice(start, end)
      .replace(/```[^\n]*\n[\s\S]*?\n```[ \t]*/g, '')
      .trimEnd()
    segments.push(`${segment}\n\n${demoPlaceholder(index)}\n\n`)
    cursor = end
  })
  segments.push(body.slice(cursor))

  return `${source.slice(0, bodyStart)}${segments.join('')}${source.slice(bodyEnd)}`
}

function expandDemoFiles(source: string, id: string, onDemo?: (path: string) => void) {
  let index = 0
  const demos: DemoFile[] = []

  source = source.replace(/```demo\s*\n([^\n]+)\n```/g, (_, request: string) => {
    const demoRequest = request.trim()
    const demoPath = resolve(dirname(id), demoRequest)
    onDemo?.(demoPath)
    const demoSource = readFileSync(demoPath, 'utf8').trim()
    const component = `MapleDemo${index++}`
    const demo = { component, request: demoRequest, path: demoPath, source: demoSource }
    demos.push(demo)

    return demoPlaceholder(demos.length - 1)
  })

  if (!demos.length && /\/src\/[^/]+\/docs\/[^/]+\.md$/.test(id.replaceAll('\\', '/'))) {
    const exampleIndexPath = resolve(dirname(id), '../example/index.vue')
    const language = id.endsWith('/en-US.md') ? 'en-US' : 'zh-CN'
    if (existsSync(exampleIndexPath)) {
      onDemo?.(exampleIndexPath)
      const grouped = discoverGroupedDemos(exampleIndexPath, language, onDemo)
      if (grouped.length) {
        grouped.forEach((item, groupedIndex) => {
          const demo = {
            component: `MapleDemo${groupedIndex}`,
            request: item.request,
            path: item.path,
            source: readFileSync(item.path, 'utf8').trim(),
            title: item.title,
          }
          demos.push(demo)
          onDemo?.(item.path)
        })
        source = replaceGroupedExamples(source, demos, language)
        return { source, demos }
      }

      const demoPath = exampleIndexPath
      const exampleHeading = /^## (?:案例|Examples?)[ \t]*$/m
      const demo = {
        component: 'MaplePageDemo',
        request: '../example/index.vue',
        path: demoPath,
        source: readFileSync(demoPath, 'utf8').trim(),
        page: true,
      }
      demos.push(demo)
      const placeholder = demoPlaceholder(demos.length - 1)
      if (exampleHeading.test(source)) {
        source = source.replace(exampleHeading, (heading) => `${heading}\n\n${placeholder}`)
      } else {
        const heading = id.endsWith('/en-US.md') ? '## Examples' : '## 案例'
        const firstSection = /^## .+$/m
        source = firstSection.test(source)
          ? source.replace(firstSection, (section) => `${heading}\n\n${placeholder}\n\n${section}`)
          : `${source.trim()}\n\n${heading}\n\n${placeholder}\n`
      }
    }
  }

  return { source, demos }
}

function injectCodeExample(source: string) {
  const codeRE = /(<pre class="hljs">(.|\r|\n)*?<\/pre>)/g

  return source.replace(codeRE, (str) => {
    const flags = [
      '// playground-ignore\n',
      '<span class="hljs-meta">#</span><span class="bash"> playground-ignore</span>\n',
      '<span class="hljs-comment">// playground-ignore</span>\n',
      '<span class="hljs-comment">/* playground-ignore */</span>\n',
      '<span class="hljs-comment">&lt;!-- playground-ignore --&gt;</span>\n',
    ]

    const attr = flags.some((flag) => str.includes(flag)) ? 'playground-ignore' : ''

    str = flags.reduce((str, flag) => str.replace(flag, ''), str)

    return `<mp-site-code-example ${attr}>${str}</mp-site-code-example>`
  })
}

function highlight(str: string, lang: string, style?: string) {
  let link = ''

  if (style) {
    link = '<link class="hljs-style" rel="stylesheet" href="' + style + '"/>'
  }

  if (lang && hljs.getLanguage(lang)) {
    return (
      '<pre class="hljs"><code>' +
      link +
      hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
      '</code></pre>'
    )
  }

  return ''
}

function markdownToVue(source: string, options: MarkdownOptions, id: string, onDemo?: (path: string) => void) {
  const expanded = expandDemoFiles(source, id, onDemo)
  source = expanded.source
  const { source: vueSource, imports, components } = extractComponents(source)
  const md = markdownIt({
    html: true,
    highlight: (str, lang) => highlight(str, lang, options.style),
  })
  let rendered = md.render(vueSource)
  expanded.demos.forEach((demo, index) => {
    rendered = rendered.replace(`<p>${demoPlaceholder(index)}</p>`, renderDemo(demo))
  })
  let templateString = htmlWrapper(rendered)
  templateString = templateString.replace(/process.env/g, '<span>process.env</span>')
  templateString = injectCodeExample(templateString)

  return `
<template><div class="maple-site-doc">${templateString}</div></template>

<script>
${expanded.demos.map((demo) => `import ${demo.component} from '${demo.request}'`).join('\n')}
${imports.join('\n')}

export default {
  components: {
    ${[...expanded.demos.map((demo) => demo.component), ...components].join(',')}
  }
}
</script>
  `
}

export interface MarkdownOptions {
  style?: string
}

export function markdown(options: MarkdownOptions): Plugin {
  const demosByMarkdown = new Map<string, string[]>()

  return {
    name: 'vite-plugin-maple-markdown',

    enforce: 'pre',

    transform(source, id) {
      if (!/\.md$/.test(id)) {
        return
      }

      try {
        const markdownId = id.split('?', 1)[0]
        const demos: string[] = []
        const result = markdownToVue(source, options, markdownId, (demo) => {
          demos.push(demo)
          this.addWatchFile(demo)
        })
        demosByMarkdown.set(markdownId, demos)
        return result
      } catch (e: any) {
        this.error(e)
      }
    },

    handleHotUpdate(ctx) {
      if (/\.md$/.test(ctx.file)) {
        const { read } = ctx
        ctx.read = async () => markdownToVue(await read(), options, ctx.file)
        return
      }

      const markdownModules = [...demosByMarkdown]
        .filter(([, demos]) => demos.includes(ctx.file))
        .flatMap(([markdownId]) => {
          const module = ctx.server.moduleGraph.getModuleById(markdownId)
          if (module) {
            ctx.server.moduleGraph.invalidateModule(module)
            return [module]
          }
          return []
        })

      if (markdownModules.length) {
        return [...ctx.modules, ...markdownModules]
      }
    },
  }
}
