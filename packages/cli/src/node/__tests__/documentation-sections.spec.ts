import { describe, expect, it } from 'vitest'
import type { MapleConfigPcMenu } from '../config/maple.config'
import { getDocumentationSection, getSectionMenu, isHomePath, sectionRoute } from '../documentation-sections'

const sections = [
  { id: 'showcase', text: { 'zh-CN': '特色与场景' }, entry: 'showcase', docs: ['showcase', 'practiceList'] },
  { id: 'components', text: { 'zh-CN': '组件' }, entry: 'quickstart', mobileEntry: 'home' },
]
const menu = [
  { type: 1, text: { 'zh-CN': '特色与场景' } },
  { type: 3, doc: 'showcase' },
  { type: 3, doc: 'practiceList' },
  { type: 1, text: { 'zh-CN': '开发指南' } },
  { type: 3, doc: 'quickstart' },
  { type: 1, text: { 'zh-CN': '组件' } },
  { type: 2, doc: 'button' },
] as MapleConfigPcMenu[]
describe('independent documentation sections', () => {
  it('keeps menus isolated across languages and direct routes', () => {
    for (const locale of ['zh-CN', 'en-US']) {
      expect(getDocumentationSection(`/${locale}/practiceList`, sections)?.id).toBe('showcase')
      expect(getDocumentationSection(`/${locale}/button`, sections)?.id).toBe('components')
    }
    expect(
      getSectionMenu(menu, sections[0], sections)
        .map((item) => item.doc)
        .filter(Boolean),
    ).toEqual(['showcase', 'practiceList'])
    expect(
      getSectionMenu(menu, sections[1], sections)
        .map((item) => item.doc)
        .filter(Boolean),
    ).toEqual(['quickstart', 'button'])
    expect(getSectionMenu(menu, undefined, [])).toBe(menu)
  })
  it('uses a scoped mobile component home and preserves language exactly once', () => {
    expect(sectionRoute(sections[0], 'en-US')).toEqual({ path: '/en-US/showcase', query: {} })
    expect(sectionRoute(sections[1], 'en-US', true)).toEqual({
      path: '/home',
      query: { section: 'components', language: 'en-US' },
    })
    expect(getDocumentationSection('/home', sections, 'showcase')?.id).toBe('showcase')
    expect(getDocumentationSection('/home', sections, 'invalid')?.id).toBe('components')
  })
  it('exposes the home page so the mobile section switcher stays reachable', () => {
    for (const path of ['/', '', '/home', '/zh-CN/home', '/en-US/home']) {
      expect(isHomePath(path)).toBe(true)
    }
    for (const path of ['/zh-CN/button', '/button', '/zh-CN/quickstart']) {
      expect(isHomePath(path)).toBe(false)
    }
    const startHub = [
      { id: 'start', text: { 'zh-CN': '开始使用' }, entry: 'quickstart', docs: ['home', 'quickstart'] },
      { id: 'components', text: { 'zh-CN': '组件' }, entry: 'button' },
    ]
    // Home defaults to the section that claims the `home` doc, and a query switches away from it.
    expect(getDocumentationSection('/home', startHub)?.id).toBe('start')
    expect(getDocumentationSection('/home', startHub, 'components')?.id).toBe('components')
  })
})
