import { optionProps } from '@maple-design/ui'
import type {
  CascaderEmits,
  CascaderExpose,
  CascaderOptionInfo,
  CascaderReadScope,
  CascaderSlots,
  OptionProps,
} from '@maple-design/ui'
import type { CascaderSlots as SubSlots } from '@maple-design/ui/cascader'

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
