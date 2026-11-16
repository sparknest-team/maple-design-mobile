import { _FormSectionComponent, FormSection } from '@maple-design/ui-vue'
import type { FormSectionInstance, FormSectionSlots } from '@maple-design/ui-vue'

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false
type Assert<T extends true> = T
export type FormSectionAliasMatches = Assert<Equal<typeof FormSection, typeof _FormSectionComponent>>
export type FormSectionInstanceMatches = Assert<Equal<FormSectionInstance, InstanceType<typeof _FormSectionComponent>>>

export const sectionProps: InstanceType<typeof _FormSectionComponent>['$props'] = { title: 'title', showMarker: true }
// @ts-expect-error Section titles must be text.
export const invalidSectionProps: InstanceType<typeof _FormSectionComponent>['$props'] = { title: 42 }
export const sectionSlots: FormSectionSlots = { title: () => 'title', extra: () => 'extra' }
