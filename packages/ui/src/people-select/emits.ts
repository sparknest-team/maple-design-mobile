import type { PeopleSelectValue } from './types'

const identity = (value: PeopleSelectValue) =>
  value === null || typeof value === 'string' || (Array.isArray(value) && value.every((id) => typeof id === 'string'))
export const peopleSelectEmits = {
  'update:modelValue': identity,
  'update:open': (open: boolean) => typeof open === 'boolean',
  'open-change': (open: boolean) => typeof open === 'boolean',
  change: identity,
  clear: () => true,
  search: (query: string) => typeof query === 'string',
  'load-error': (_error: unknown, source: 'options') => source === 'options',
  'action-error': (_error: unknown, action: 'call' | 'chat') => action === 'call' || action === 'chat',
}
