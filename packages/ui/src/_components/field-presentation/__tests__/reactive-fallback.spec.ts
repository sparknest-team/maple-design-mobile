import { computed, ref } from 'vue'
import { expect, test } from 'vitest'
import { optionValueText } from '../option-labels'

test('read-mode fallback data stays reactive and separate from candidates', () => {
  const people = ref<Record<string, string>>({})
  const options: unknown[] = []
  const text = computed(() =>
    optionValueText('a', { options, fallbackOption: (id: string) => ({ value: id, label: people.value[id] ?? id }) }),
  )
  expect(text.value).toBe('a')
  people.value.a = 'Alice'
  expect(text.value).toBe('Alice')
  expect(options).toEqual([])
  expect(
    optionValueText('a', { options: [{ value: 'a', label: 'Actual' }], fallbackOption: () => ({ label: 'Fallback' }) }),
  ).toBe('Actual')
})
test('Cascader label/path fallback and explicit false follow the same presentation rule', () => {
  expect(optionValueText('missing', { fallbackOption: () => 'Display' })).toBe('Display')
  expect(
    optionValueText(['parent', 'child'], { pathMode: true, fallbackOption: (path: string[]) => path.join(' > ') }),
  ).toBe('parent > child')
  expect(optionValueText('missing', { fallbackOption: false })).toBe('')
})
