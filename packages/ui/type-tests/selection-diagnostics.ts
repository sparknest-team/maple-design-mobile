import type { ExtractPublicPropTypes, StyleValue } from 'vue'
import { optionProps, tagProps } from '@maple-design/ui-vue'
import type {
  CascaderEmits,
  CascaderExpose,
  CascaderOptionInfo,
  CascaderReadScope,
  CascaderSlots,
  OptionProps,
  SelectOptionTagProps,
  TagProps,
} from '@maple-design/ui-vue'
import type { CascaderPanelProps, CascaderSlots as SubSlots } from '@maple-design/ui-vue/cascader'
import type { OptgroupProps, SelectOptionTagProps as SubTagProps } from '@maple-design/ui-vue/select'
import type { CompatiblePublicProps } from '../src/_utils/public-props'
import type { CompatibleStyleValue } from '../src/_utils/style-value'
import { autoCompleteProps } from '../src/auto-complete/props'
import { cascaderPanelProps } from '../src/cascader'
import { cascaderProps } from '../src/cascader/props'
import { checkboxGroupProps, checkboxProps } from '../src/checkbox/props'
import { inputNumberProps } from '../src/input-number/props'
import { inputTagProps } from '../src/input-tag/props'
import { inputGroupProps, inputPasswordProps, inputProps } from '../src/input/props'
import { mentionProps } from '../src/mention/props'
import { peopleSelectProps } from '../src/people-select/props'
import { radioGroupProps, radioProps } from '../src/radio/props'
import { searchProps } from '../src/search/props'
import { optgroupProps } from '../src/select'
import { selectProps } from '../src/select/props'
import { tabItemProps, tabNavProps, tabPaneProps, tabsItemsProps, tabsNavsProps, tabsProps } from '../src/tabs/props'
import { textareaProps } from '../src/textarea/props'

type Assert<T extends true> = T
export type NoPrivate = Assert<'internal' extends keyof typeof optionProps ? false : true>
export const option: OptionProps = { value: 'a', label: 'Alpha' }
// @ts-expect-error Private rendering metadata is not a public prop.
export const privateOption: OptionProps = { internal: true }
// @ts-expect-error The unused extra prop has been removed.
export const extra: OptionProps = { extra: {} }
export const reading: CascaderReadScope = { value: null, text: 'Empty' }
export const cleared: CascaderEmits['change'] = [null]
export const slots: CascaderSlots = {
  read: ({ text }) => text,
  option: ({ data }) => data.label,
  'arrow-icon': ({ focus, menuOpen }) => String(focus || menuOpen),
}
export const sub: SubSlots = slots
export function expose(instance: CascaderExpose) {
  const promise: Promise<void> = instance.refresh()
  instance.focus()
  instance.blur()
  return promise
}
export function objectValue(node: CascaderOptionInfo) {
  return node.value
}

export const optionTagAttributes: OptionProps = {
  value: 'tag',
  tagProps: {
    style: { maxWidth: '12rem' },
    title: 'Device',
    onClose: (event: MouseEvent) => event.preventDefault(),
    onCloseOnce: (event: MouseEvent) => event.preventDefault(),
  },
}

export const forwardedTag: SelectOptionTagProps = {
  class: ['custom'],
  'data-device': 'sensor',
  style: { maxWidth: '12rem' },
  onClose: (event) => {
    const mouse: MouseEvent = event
    mouse.preventDefault()
  },
  onCloseOnce: (event) => event.preventDefault(),
}
// @ts-expect-error A close listener receives a MouseEvent, not a string.
export const badTagListener: SelectOptionTagProps = { onClose: (event: string) => event.length }

export const subTag: SubTagProps = forwardedTag
// @ts-expect-error An unknown Tag option is not part of the forwarded contract.
export const unknownTag: SelectOptionTagProps = { inventedTagSetting: true }

type Same<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false
type DifferentFields<A, B> = {
  [K in keyof A]-?: K extends keyof B ? (Same<A[K], B[K]> extends true ? never : K) : K
}[keyof A]
export type OptionFieldsMatch = Assert<
  DifferentFields<ExtractPublicPropTypes<typeof optionProps>, OptionProps> extends never ? true : false
>
export type TagFieldsMatch = Assert<
  DifferentFields<ExtractPublicPropTypes<typeof tagProps>, TagProps> extends never ? true : false
>
type RequiredExample = CompatiblePublicProps<{
  name: { type: StringConstructor; required: true }
  active: { type: BooleanConstructor; default: false }
}>
export const requiredExample: RequiredExample = { name: 'device' }
// @ts-expect-error Required props remain required.
export const missingRequired: RequiredExample = {}

export type CompatibleStyleMatchesVue = Assert<Same<CompatibleStyleValue, StyleValue>>

type PublicShapeMatches<P> =
  Same<keyof ExtractPublicPropTypes<P>, keyof CompatiblePublicProps<P>> extends true
    ? DifferentFields<ExtractPublicPropTypes<P>, CompatiblePublicProps<P>> extends never
      ? [ExtractPublicPropTypes<P>] extends [CompatiblePublicProps<P>]
        ? [CompatiblePublicProps<P>] extends [ExtractPublicPropTypes<P>]
          ? true
          : false
        : false
      : false
    : false
export type PublicPropsCompatibility0 = Assert<PublicShapeMatches<typeof checkboxProps>>
export type PublicPropsCompatibility1 = Assert<PublicShapeMatches<typeof checkboxGroupProps>>
export type PublicPropsCompatibility2 = Assert<PublicShapeMatches<typeof radioProps>>
export type PublicPropsCompatibility3 = Assert<PublicShapeMatches<typeof radioGroupProps>>
export type PublicPropsCompatibility4 = Assert<PublicShapeMatches<typeof tabsProps>>
export type PublicPropsCompatibility5 = Assert<PublicShapeMatches<typeof tabNavProps>>
export type PublicPropsCompatibility6 = Assert<PublicShapeMatches<typeof tabItemProps>>
export type PublicPropsCompatibility7 = Assert<PublicShapeMatches<typeof tabPaneProps>>
export type PublicPropsCompatibility8 = Assert<PublicShapeMatches<typeof tabsNavsProps>>
export type PublicPropsCompatibility9 = Assert<PublicShapeMatches<typeof tabsItemsProps>>
export type PublicPropsCompatibility10 = Assert<PublicShapeMatches<typeof searchProps>>
export type PublicPropsCompatibility11 = Assert<PublicShapeMatches<typeof inputNumberProps>>
export type FieldPropsCompatibility0 = Assert<PublicShapeMatches<typeof inputProps>>
export type FieldPropsCompatibility1 = Assert<PublicShapeMatches<typeof inputGroupProps>>
export type FieldPropsCompatibility2 = Assert<PublicShapeMatches<typeof inputPasswordProps>>
export type FieldPropsCompatibility3 = Assert<PublicShapeMatches<typeof textareaProps>>
export type FieldPropsCompatibility4 = Assert<PublicShapeMatches<typeof inputTagProps>>
export type FieldPropsCompatibility5 = Assert<PublicShapeMatches<typeof autoCompleteProps>>
export type FieldPropsCompatibility6 = Assert<PublicShapeMatches<typeof cascaderProps>>
export type FieldPropsCompatibility7 = Assert<PublicShapeMatches<typeof peopleSelectProps>>
export type FieldPropsCompatibility8 = Assert<PublicShapeMatches<typeof selectProps>>
export type FieldPropsCompatibility9 = Assert<PublicShapeMatches<typeof mentionProps>>
export type FieldPropsCompatibility10 = Assert<PublicShapeMatches<typeof cascaderPanelProps>>
export type FieldPropsCompatibility11 = Assert<PublicShapeMatches<typeof optgroupProps>>
export const validCascaderPanel: CascaderPanelProps = { multiple: true }
export const validOptgroup: OptgroupProps = { label: 'Group' }
// @ts-expect-error Cascader panel multiple is boolean.
export const badCascaderPanel: CascaderPanelProps = { multiple: 'yes' }
// @ts-expect-error Optgroup label is a string.
export const badOptgroup: OptgroupProps = { label: 99 }
