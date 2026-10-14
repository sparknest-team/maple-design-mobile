const reserved = new Set([
  'modelValue',
  'defaultValue',
  'open',
  'defaultOpen',
  'disabled',
  'readonly',
  'type',
  'mode',
  'presentation',
  'format',
  'valueFormat',
  'showTime',
  'useSeconds',
  'min',
  'max',
  'disabledDate',
  'disabledTime',
  'multiple',
  'range',
  'disableConfirm',
  'showConfirmBtn',
])
/** Nested objects configure presentation, never the field's model, rules or event owner. */
export function datePresentationOptions(options?: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(options ?? {}).filter(
      ([key]) =>
        !reserved.has(key.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())) &&
        !/^on[A-Z]|^onUpdate:/.test(key),
    ),
  )
}
