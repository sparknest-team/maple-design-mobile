import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Mention from '..'

test('minimum length blocks short queries and cancels stale work', async () => {
  let finish!: (options: string[]) => void
  const loader = vi.fn(
    (_query: string, _context: { signal: AbortSignal }) =>
      new Promise<string[]>((resolve) => {
        finish = resolve
      }),
  )
  const owner = mount(Mention, {
    attachTo: document.body,
    props: { editMode: 'direct', options: loader, minSearchLength: 2 },
  })
  const input = owner.get('input')
  input.element.focus()
  await flushPromises()
  expect(loader).not.toHaveBeenCalled()
  await input.setValue('@a')
  await flushPromises()
  expect(loader).not.toHaveBeenCalled()
  await input.setValue('@ab')
  await flushPromises()
  expect(loader).toHaveBeenCalledTimes(1)
  const signal = loader.mock.calls[0][1].signal
  await input.setValue('@a')
  await flushPromises()
  expect(signal.aborted).toBe(true)
  finish(['abc'])
  await flushPromises()
  expect(document.querySelector('[role=listbox]')?.textContent ?? '').not.toContain('abc')
  owner.unmount()
})

test('auto commit selects the sole enabled result', async () => {
  const owner = mount(Mention, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      minSearchLength: 2,
      autoCommitSingle: true,
      options: async () => [{ value: 'alice', label: 'Alice' }],
    },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('@al')
  await flushPromises()
  expect(owner.emitted('select')?.[0]).toEqual(['alice'])
  owner.unmount()
})

test('multiple enabled candidates are not committed automatically', async () => {
  const owner = mount(Mention, {
    attachTo: document.body,
    props: { editMode: 'direct', minSearchLength: 2, autoCommitSingle: true, options: async () => ['alice', 'alan'] },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('@al')
  await flushPromises()
  expect(owner.emitted('select')).toBeUndefined()
  expect(input.attributes('aria-expanded')).toBe('true')
  owner.unmount()
})

test('a result arriving after blur cannot commit a mention', async () => {
  let finish!: (options: string[]) => void
  const owner = mount(Mention, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      minSearchLength: 2,
      autoCommitSingle: true,
      options: () =>
        new Promise<string[]>((resolve) => {
          finish = resolve
        }),
    },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('@al')
  await flushPromises()
  input.element.blur()
  await flushPromises()
  finish(['alice'])
  await flushPromises()
  expect(owner.emitted('select')).toBeUndefined()
  owner.unmount()
})

test.each(['escape', 'move cursor'])(
  'does not auto commit when the user cancels or moves the cursor: %s',
  async (action) => {
    let finish!: (options: string[]) => void
    const owner = mount(Mention, {
      attachTo: document.body,
      props: {
        editMode: 'direct',
        minSearchLength: 2,
        autoCommitSingle: true,
        options: () =>
          new Promise<string[]>((resolve) => {
            finish = resolve
          }),
      },
    })
    const input = owner.get('input')
    input.element.focus()
    await input.setValue('@al')
    await flushPromises()
    if (action === 'escape') {
      await input.trigger('keydown', { key: 'Escape' })
    } else {
      ;(input.element as HTMLInputElement).setSelectionRange(0, 0)
    }
    finish(['alice'])
    await flushPromises()
    expect(owner.emitted('select')).toBeUndefined()
    owner.unmount()
  },
)

test('raising the threshold cancels the current mention query', async () => {
  let signal!: AbortSignal
  const options = (_query: string, context: { signal: AbortSignal }) => {
    signal = context.signal
    return new Promise<never[]>(() => {})
  }
  const owner = mount(Mention, { attachTo: document.body, props: { editMode: 'direct', options, minSearchLength: 2 } })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('@ab')
  await flushPromises()
  await owner.setProps({ minSearchLength: 3 })
  await flushPromises()
  expect(signal.aborted).toBe(true)
  expect(input.attributes('aria-expanded')).toBe('false')
  owner.unmount()
})
