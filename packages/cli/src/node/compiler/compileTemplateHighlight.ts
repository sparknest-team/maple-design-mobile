import { resolve } from 'path'
import fse from 'fs-extra'
import { getMapleConfig, type MapleConfig } from '../config/maple.config.js'
import {
  HL_API_RE,
  HL_COMPONENT_NAME_RE,
  HL_DIR,
  HL_EN_MD,
  HL_EN_TITLE_ATTRIBUTES_RE,
  HL_EN_TITLE_EVENTS_RE,
  HL_EN_TITLE_SLOTS_RE,
  HL_EN_WEB_TYPES_JSON,
  HL_ZH_MD,
  HL_ZH_TITLE_ATTRIBUTES_RE,
  HL_ZH_TITLE_EVENTS_RE,
  HL_ZH_TITLE_SLOTS_RE,
  HL_ZH_WEB_TYPES_JSON,
  SRC_DIR,
} from '../shared/constant.js'
import { getCliVersion, isDir, isMD } from '../shared/fsUtils.js'

const { ensureDir, readdirSync, readFileSync, writeFileSync } = fse

export interface TemplateHighlightCompilerOptions {
  md: string
  json: string
  titleAttributes: RegExp
  titleEvents: RegExp
  titleSlots: RegExp
}

export const replaceDot = (s: string) => s.replace(/`/g, '')

export const replaceVersion = (s: string) => s.replace(/\*\*\*.+\*\*\*/g, '').trim()

export const replaceUnderline = (s: string) => s.replace(/_/g, '')

export function parseTable(table: string) {
  const rows = table
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter((row) => row.startsWith('|') && row.endsWith('|'))
  return rows.map((row) => {
    const cols = row.replace(/\\\|/g, '__maple_axis__').split('|')
    cols.shift()
    cols.pop()
    return cols.map((col) => col.replace(/__maple_axis__/g, '|').trim())
  })
}

export function compileTable(md: string, titleRe: RegExp): string {
  const apiMatched = md.match(HL_API_RE)
  if (!apiMatched) {
    return ''
  }
  md = md.slice((apiMatched.index as number) + apiMatched[0].length)

  const titleMatched = md.match(titleRe)
  if (!titleMatched) {
    return ''
  }
  md = md.slice((titleMatched.index as number) + titleMatched[0].length)

  // A header-only Events table is empty. Never scan into the following Slots
  // section or treat its heading as a row (Grid's English docs exposed this).
  const section = md.split(/^\s*#{1,3}\s+/m, 1)[0]
  const lines = section.split(/\r?\n/).map((line) => line.trim())
  const header = lines.findIndex(
    (line, index) => line.startsWith('|') && /^\|(?:\s*:?-+:?\s*\|)+$/.test(lines[index + 1] ?? ''),
  )
  if (header < 0) {
    return ''
  }
  const rows: string[] = []
  for (const line of lines.slice(header + 2)) {
    if (!line.startsWith('|') || !line.endsWith('|')) {
      break
    }
    rows.push(line)
  }
  return rows.join('\n')
}

export function compileWebTypes(
  table: Record<string, any>,
  webTypes: Record<string, any>,
  componentName: string,
  mapleConfig: Required<MapleConfig>,
) {
  const { attributesTable, eventsTable, slotsTable } = table

  const attributes = attributesTable.map((row: any) => ({
    name: replaceVersion(replaceDot(row[0])),
    description: row[1],
    default: replaceDot(row[3] ?? ''),
    value: {
      type: replaceUnderline(row[2]),
      kind: 'expression',
    },
  }))

  const events = eventsTable.map((row: any) => ({
    name: replaceVersion(replaceDot(row[0])),
    description: row[1],
  }))

  const slots = slotsTable.map((row: any) => ({
    name: replaceVersion(replaceDot(row[0])),
    description: row[1],
  }))

  webTypes.contributions.html.tags.push({
    name: `${mapleConfig?.namespace}-${componentName}`,
    attributes,
    events,
    slots,
  })
}

export function compileMD(
  path: string,
  webTypes: Record<string, any>,
  mapleConfig: Required<MapleConfig>,
  options: TemplateHighlightCompilerOptions,
) {
  if (!path.endsWith(options.md)) {
    return
  }

  const md = readFileSync(path, 'utf-8')
  const componentName = path.match(HL_COMPONENT_NAME_RE)![2]
  const attributesTable = parseTable(compileTable(md, options.titleAttributes))
  const eventsTable = parseTable(compileTable(md, options.titleEvents))
  const slotsTable = parseTable(compileTable(md, options.titleSlots))

  const table = {
    attributesTable,
    eventsTable,
    slotsTable,
  }

  compileWebTypes(table, webTypes, componentName, mapleConfig)
}

export function compileDir(
  path: string,
  webTypes: Record<string, any>,
  mapleConfig: Required<MapleConfig>,
  options: TemplateHighlightCompilerOptions,
) {
  const dir = readdirSync(path)

  dir.forEach((filename) => {
    const filePath = resolve(path, filename)

    isDir(filePath) && compileDir(filePath, webTypes, mapleConfig, options)
    isMD(filePath) && compileMD(filePath, webTypes, mapleConfig, options)
  })
}

export function compileLanguageMD(mapleConfig: Required<MapleConfig>, options: TemplateHighlightCompilerOptions) {
  const webTypes: Record<string, any> = {
    $schema: 'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
    framework: 'vue',
    version: getCliVersion(),
    name: mapleConfig?.title,
    contributions: {
      html: {
        tags: [],
        'types-syntax': 'typescript',
      },
    },
  }

  compileDir(SRC_DIR, webTypes, mapleConfig, options)
  writeFileSync(options.json, JSON.stringify(webTypes, null, 2))
}

export async function compileTemplateHighlight() {
  await ensureDir(HL_DIR)
  const mapleConfig = await getMapleConfig()

  compileLanguageMD(mapleConfig, {
    md: HL_EN_MD,
    json: HL_EN_WEB_TYPES_JSON,
    titleAttributes: HL_EN_TITLE_ATTRIBUTES_RE,
    titleEvents: HL_EN_TITLE_EVENTS_RE,
    titleSlots: HL_EN_TITLE_SLOTS_RE,
  })
  compileLanguageMD(mapleConfig, {
    md: HL_ZH_MD,
    json: HL_ZH_WEB_TYPES_JSON,
    titleAttributes: HL_ZH_TITLE_ATTRIBUTES_RE,
    titleEvents: HL_ZH_TITLE_EVENTS_RE,
    titleSlots: HL_ZH_TITLE_SLOTS_RE,
  })
}
