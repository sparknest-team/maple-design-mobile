const identity = (value: string | null) => value === null || typeof value === 'string'
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
