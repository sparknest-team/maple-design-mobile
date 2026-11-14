import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import { useFieldSearch } from '../use-field-search'

test('pending remains true across reentrant searches and resets when cancelled', () => {
  vi.useFakeTimers()
  const available = ref(true)
  const changes: boolean[] = []
  let search!: ReturnType<typeof useFieldSearch>
  const owner = mount(
    defineComponent({
      setup() {
        search = useFieldSearch(
          () => 50,
          () => available.value,
          (query) => {
            if (query === 'first') {
              search('second')
            }
          },
          (value) => changes.push(value),
        )
        return () => h('div')
      },
    }),
  )
  search('first')
  expect(changes.at(-1)).toBe(true)
  vi.advanceTimersByTime(50)
  expect(changes.at(-1)).toBe(true)
  available.value = false
  expect(changes.at(-1)).toBe(false)
  owner.unmount()
  vi.useRealTimers()
})
