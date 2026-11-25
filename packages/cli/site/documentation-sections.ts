import type { Menu } from './utils'

export interface DocumentationSection {
  id: string
  text: Record<string, string>
  entry: string
  mobileEntry?: string
  docs?: string[]
}
export function isHomePath(path: string) {
  const doc = path.split('?')[0].split('/').filter(Boolean).at(-1) ?? ''
  return doc === '' || doc === 'home'
}
export function getDocumentationSection(path: string, sections: DocumentationSection[], requested?: unknown) {
  const doc = path.split('?')[0].split('/').filter(Boolean).at(-1) ?? ''
  if (doc === 'home' && typeof requested === 'string') {
    const explicit = sections.find((section) => section.id === requested)
    if (explicit) return explicit
  }
  return (
    sections.find((section) => section.docs?.includes(doc)) ?? sections.find((section) => !section.docs) ?? sections[0]
  )
}
export function getSectionMenu(
  menu: Menu[],
  section: DocumentationSection | undefined,
  sections: DocumentationSection[],
) {
  if (!section) return menu
  const result: Menu[] = []
  let heading: Menu | undefined
  for (const item of menu) {
    if (item.type === 1) {
      heading = item
      continue
    }
    if (getDocumentationSection(item.doc, sections)?.id !== section.id) continue
    if (heading) {
      result.push(heading)
      heading = undefined
    }
    result.push(item)
  }
  return result
}
export function sectionRoute(section: DocumentationSection, language: string, mobile = false) {
  const doc = mobile ? (section.mobileEntry ?? section.entry) : section.entry
  return {
    path: doc === 'home' ? '/home' : `/${language}/${doc}`,
    query: doc === 'home' ? { section: section.id, language } : {},
  }
}
