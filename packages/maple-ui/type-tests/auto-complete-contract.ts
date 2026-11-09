import type { AutoCompleteProps, AutoCompleteSlots, AutoCompleteTriggerOptions, TriggerProps } from '@maple-design/ui'
import type { AutoCompleteSlots as SubSlots } from '@maple-design/ui/auto-complete'

type Assert<T extends true> = T
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false
export type SlotsEqual = Assert<Equal<AutoCompleteSlots, SubSlots>>
export type ReadScope = Assert<
  Equal<Parameters<NonNullable<AutoCompleteSlots['read']>>[0], { value: string | null; text: string }>
>
export const reading: AutoCompleteSlots = { read: ({ value, text }) => (value === null ? text : value) }
// @ts-expect-error There is no rendered default input replacement slot.
export const nonexistent: AutoCompleteSlots = { default: () => null }
export const safe: AutoCompleteTriggerOptions = { placement: 'bottom-start', popupContainer: false }
// @ts-expect-error Internal candidate visibility is not a safe presentation override.
export const owned: AutoCompleteTriggerOptions = { open: true }
export type WidePropertyIsIntentional = Assert<
  TriggerProps extends NonNullable<AutoCompleteProps['triggerProps']> ? true : false
>
export const nullable: AutoCompleteProps = {
  modelValue: null,
  emptyValue: null,
  options: async (query, { signal }) => (signal.aborted ? [] : [query]),
}

export const editorEmpty: AutoCompleteSlots = { empty: () => null }
