import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Cascader from '..'

afterEach(() => vi.useRealTimers())

test('remote search is loading during debounce instead of displaying an empty result', async () => {
  const loader = vi.fn(async (_query: string) => [])
  const owner = mount(Cascader, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      open: true,
      filterable: true,
      options: loader,
      searchDelay: 1000,
      popupContainer: false,
    },
  })
  await flushPromises()
  const input = owner.get('input')
  input.element.focus()
  vi.useFakeTimers()
  await input.setValue('alice')
  expect(input.attributes('aria-busy')).toBe('true')
  expect(loader).toHaveBeenCalledTimes(1)
  vi.advanceTimersByTime(1000)
  await Promise.resolve()
  await Promise.resolve()
  await Promise.resolve()
  vi.useRealTimers()
  await flushPromises()
  expect(loader).toHaveBeenCalledTimes(2)
  expect(loader.mock.calls[1][0]).toBe('alice')
  owner.unmount()
})
