import type { SelectOptionValue } from '../select/types'

export const mentionEmits = {
  'load-error': (error: unknown) => true,
  'update:modelValue': (value: string | null) => true,
  change: (value: string | null) => true,
  search: (query: string, prefix: string) => true,
  select: (value: SelectOptionValue | undefined) => true,
  clear: (event: Event) => true,
  focus: (event: FocusEvent) => true,
  blur: (event: FocusEvent) => true,
}
