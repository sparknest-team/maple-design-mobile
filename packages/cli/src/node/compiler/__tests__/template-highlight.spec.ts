import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import type { MapleConfig } from '../../config/maple.config.js'
import {
  HL_EN_TITLE_ATTRIBUTES_RE,
  HL_EN_TITLE_EVENTS_RE,
  HL_EN_TITLE_SLOTS_RE,
  HL_ZH_TITLE_ATTRIBUTES_RE,
  HL_ZH_TITLE_EVENTS_RE,
  HL_ZH_TITLE_SLOTS_RE,
} from '../../shared/constant.js'
import { compileMD, compileTable, compileWebTypes, parseTable } from '../compileTemplateHighlight.js'

describe('template highlight API tables', () => {
  it('skips language-suffixed Markdown outside docs directories without throwing', () => {
    const dir = mkdtempSync(resolve(tmpdir(), 'maple-template-highlight-'))
    try {
      const webTypes = { contributions: { html: { tags: [] as any[] } } }
      for (const md of ['en-US.md', 'zh-CN.md']) {
        const path = resolve(dir, `README.${md}`)
        writeFileSync(path, '## API\n')
        expect(() =>
          compileMD(path, webTypes, { namespace: 'mp' } as Required<MapleConfig>, {
            md,
            json: '',
            titleAttributes: HL_EN_TITLE_ATTRIBUTES_RE,
            titleEvents: HL_EN_TITLE_EVENTS_RE,
            titleSlots: HL_EN_TITLE_SLOTS_RE,
          }),
        ).not.toThrow()
      }
      expect(webTypes.contributions.html.tags).toEqual([])
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('keeps header-only Events empty and stops before the following Slots table', () => {
    const md =
      '## API\n\n### Events\n\n| Event | Description |\n| --- | --- |\n\n### Slots\n\n| Slot | Description |\n| --- | --- |\n| default | Content |\n'
    expect(parseTable(compileTable(md, HL_EN_TITLE_EVENTS_RE))).toEqual([])
    expect(parseTable(compileTable(md, HL_EN_TITLE_SLOTS_RE))).toEqual([['default', 'Content']])
  })

  it('does not borrow a later table when the requested section has no table', () => {
    const md =
      '## API\n### Events\nNo events.\n### Slots\n| Slot | Description |\n| --- | --- |\n| default | Content |\n'
    expect(compileTable(md, HL_EN_TITLE_EVENTS_RE)).toBe('')
  })

  it('preserves escaped union delimiters, CRLF and the last row at EOF', () => {
    const md =
      '## API\r\n### Props\r\n| Name | Description | Type | Default |\r\n| :--- | --- | --- | ---: |\r\n| value | Choice | `string \\| number` | `0` |'
    expect(parseTable(compileTable(md, HL_EN_TITLE_ATTRIBUTES_RE))).toEqual([
      ['value', 'Choice', '`string | number`', '`0`'],
    ])
    expect(parseTable('   \n### Events\n')).toEqual([])
  })

  it('allows a Props table without a default column', () => {
    const webTypes = { contributions: { html: { tags: [] as any[] } } }
    compileWebTypes(
      { attributesTable: [['value', 'Value', '`number`']], eventsTable: [], slotsTable: [] },
      webTypes,
      'sample',
      { namespace: 'mp' } as Required<MapleConfig>,
    )
    expect(webTypes.contributions.html.tags[0].attributes[0]).toEqual({
      name: 'value',
      description: 'Value',
      default: '',
      value: { type: '`number`', kind: 'expression' },
    })
  })

  it('reads canonical English category titles on Chinese pages', () => {
    const md =
      '## API\n### Grid Props\n| Name | Type |\n| --- | --- |\n| cols | number |\n### Grid Events\n| Event | Description |\n| --- | --- |\n### Grid Slots\n| Slot | Description |\n| --- | --- |\n| default | Layout content |\n'
    expect(parseTable(compileTable(md, HL_ZH_TITLE_ATTRIBUTES_RE))).toEqual([['cols', 'number']])
    expect(parseTable(compileTable(md, HL_ZH_TITLE_EVENTS_RE))).toEqual([])
    expect(parseTable(compileTable(md, HL_ZH_TITLE_SLOTS_RE))).toEqual([['default', 'Layout content']])
  })

  it('compiles the real Grid docs without manufacturing events from section headings', () => {
    const path = resolve('../ui/src/grid/docs/en-US.md')
    expect(readFileSync(path, 'utf8')).toContain('### Grid Events')
    const webTypes = { contributions: { html: { tags: [] as any[] } } }
    compileMD(path, webTypes, { namespace: 'mp' } as Required<MapleConfig>, {
      md: 'en-US.md',
      json: '',
      titleAttributes: HL_EN_TITLE_ATTRIBUTES_RE,
      titleEvents: HL_EN_TITLE_EVENTS_RE,
      titleSlots: HL_EN_TITLE_SLOTS_RE,
    })
    expect(webTypes.contributions.html.tags[0]).toMatchObject({
      name: 'mp-grid',
      events: [],
      slots: [{ name: 'default', description: 'Layout content' }],
    })
  })
})

it('recognizes component-prefixed attribute headings and keeps the opening target in generated hints', () => {
  for (const [title, expression] of [
    ['Select props', HL_EN_TITLE_ATTRIBUTES_RE],
    ['Cascader 属性', HL_ZH_TITLE_ATTRIBUTES_RE],
    ['Cascader Props', HL_ZH_TITLE_ATTRIBUTES_RE],
  ] as const) {
    const md =
      '## API\n### ' +
      title +
      '\n| Name | Description | Type | Default |\n| --- | --- | --- | --- |\n| open-trigger-target | Opening target | field | field |\n'
    const rows = parseTable(compileTable(md, expression))
    expect(rows).toHaveLength(1)
    expect(rows[0][0]).toBe('open-trigger-target')
  }
})
