import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Select from '..'

afterEach(() => vi.useRealTimers())

test('remote search shows loading during the debounce and only shows empty after a completed query', async () => {
  const loader = vi.fn(async (_query: string) => [])
  const owner = mount(Select, {
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
  expect(document.querySelector('[class$="select-dropdown-empty"]')).toBeTruthy()
  vi.useFakeTimers()
  await input.setValue('alice')
  expect(document.querySelector('[class$="select-dropdown-loading"]')).toBeTruthy()
  expect(document.querySelector('[class$="select-dropdown-empty"]')).toBeNull()
  expect(loader).toHaveBeenCalledTimes(1)
  vi.advanceTimersByTime(1000)
  await Promise.resolve()
  await Promise.resolve()
  await Promise.resolve()
  vi.useRealTimers()
  await flushPromises()
  expect(loader).toHaveBeenCalledTimes(2)
  expect(loader.mock.calls[1][0]).toBe('alice')
  expect(document.querySelector('[class$="select-dropdown-empty"]')).toBeTruthy()
  owner.unmount()
})

test('changing the query aborts an in-flight remote search before the next debounce ends', async () => {
  let signal!: AbortSignal
  let finish!: (items: string[]) => void
  const loader = vi.fn((query: string, context: { signal: AbortSignal }) => {
    if (!query) {
      return Promise.resolve([])
    }
    signal = context.signal
    return new Promise<string[]>((resolve) => {
      finish = resolve
    })
  })
  const owner = mount(Select, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      open: true,
      filterable: true,
      options: loader,
      searchDelay: 100,
      popupContainer: false,
    },
  })
  await flushPromises()
  const input = owner.get('input')
  input.element.focus()
  vi.useFakeTimers()
  await input.setValue('old')
  vi.advanceTimersByTime(100)
  await Promise.resolve()
  expect(signal.aborted).toBe(false)
  await input.setValue('new')
  expect(signal.aborted).toBe(true)
  finish(['stale'])
  await Promise.resolve()
  await Promise.resolve()
  expect(document.querySelector('[class$="select-dropdown-loading"]')).toBeTruthy()
  vi.useRealTimers()
  owner.unmount()
})
