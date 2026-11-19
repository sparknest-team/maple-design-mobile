import { _SectionComponent, Section } from '@maple-design/ui-vue'
import type { SectionInstance, SectionSlots } from '@maple-design/ui-vue'

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false
type Assert<T extends true> = T
export type SectionAliasMatches = Assert<Equal<typeof Section, typeof _SectionComponent>>
export type SectionInstanceMatches = Assert<Equal<SectionInstance, InstanceType<typeof _SectionComponent>>>

export const sectionProps: InstanceType<typeof _SectionComponent>['$props'] = { title: 'title', showMarker: true }
// @ts-expect-error Section titles must be text.
export const invalidSectionProps: InstanceType<typeof _SectionComponent>['$props'] = { title: 42 }
export const sectionSlots: SectionSlots = { title: () => 'title', extra: () => 'extra' }
