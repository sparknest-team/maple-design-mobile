import type { AutoCompleteOptionInfo } from './props'

export const autoCompleteEmits = {
  'load-error': (error: unknown) => true,
  'update:modelValue': (value: string | null) => true,
  input: (value: string, ev: Event) => true,
  search: (value: string, ev: Event) => true,
  change: (value: string | null, ev: Event) => true,
  select: (value: string, option: AutoCompleteOptionInfo, ev: Event) => true,
  clear: (ev: Event) => true,
  focus: (ev: FocusEvent) => true,
  blur: (ev: FocusEvent) => true,
  'dropdown-scroll': (ev: Event) => true,
  'dropdown-reach-bottom': (ev: Event) => true,
}
