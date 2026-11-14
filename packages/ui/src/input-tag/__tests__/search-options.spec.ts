import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import InputTag from '..'

test('remote search respects threshold and automatically commits a unique result', async () => {
  const loader = vi.fn(async (query: string) => [{ value: query, label: 'A title' }])
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: { editMode: 'direct', options: loader, minSearchLength: 2, searchDelay: 0, autoCommitSingle: true },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('a')
  await flushPromises()
  expect(loader).not.toHaveBeenCalled()
  await input.setValue('ab')
  await flushPromises()
  expect(loader).toHaveBeenCalledTimes(1)
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([['ab']])
  expect(owner.text()).toContain('A title')
  owner.unmount()
})

test('multiple candidates can be selected with keyboard', async () => {
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
      minSearchLength: 1,
    },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('a')
  await flushPromises()
  expect(document.querySelectorAll('[role=option]').length).toBe(2)
  await input.trigger('keydown', { key: 'ArrowDown' })
  await input.trigger('keydown', { key: 'Enter' })
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([['b']])
  owner.unmount()
})

test('an obsolete remote result cannot auto-commit after the input changes or is cleared', async () => {
  const requests: Array<{
    query: string
    signal: AbortSignal
    resolve: (value: { value: string; label: string }[]) => void
  }> = []
  const loader = (query: string, { signal }: { signal: AbortSignal }) =>
    new Promise<{ value: string; label: string }[]>((resolve) => requests.push({ query, signal, resolve }))
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: { editMode: 'direct', options: loader, minSearchLength: 2, searchDelay: 0, autoCommitSingle: true },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('first')
  await flushPromises()
  await input.setValue('second')
  await flushPromises()
  expect(requests[0].signal.aborted).toBe(true)
  requests[0].resolve([{ value: 'first', label: 'Old' }])
  await flushPromises()
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  await input.setValue('')
  await flushPromises()
  expect(requests[1].signal.aborted).toBe(true)
  requests[1].resolve([{ value: 'second', label: 'Old again' }])
  await flushPromises()
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  owner.unmount()
})

test('an empty search allows creating the typed value on Enter', async () => {
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: { editMode: 'direct', options: async () => [], minSearchLength: 2, searchDelay: 0 },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('missing')
  await flushPromises()
  await input.trigger('keydown', { key: 'Enter' })
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([['missing']])
  expect((input.element as HTMLInputElement).value).toBe('')
  owner.unmount()
})

test('composition defers remote search until input composition finishes', async () => {
  const loader = vi.fn(async () => [])
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: { editMode: 'direct', options: loader, minSearchLength: 2, searchDelay: 0 },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.trigger('compositionstart')
  await input.setValue('中文')
  await flushPromises()
  expect(loader).not.toHaveBeenCalled()
  await input.trigger('compositionend')
  await flushPromises()
  expect(loader).toHaveBeenCalledTimes(1)
  owner.unmount()
})

test('click selection preserves the display label when candidates change and in reading mode', async () => {
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      options: [
        { value: 'alice', label: 'Alice' },
        { value: 'alan', label: 'Alan' },
      ],
      minSearchLength: 1,
    },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('al')
  await flushPromises()
  const option = Array.from(document.querySelectorAll<HTMLElement>('[role=option]')).find((node) =>
    node.textContent?.includes('Alice'),
  )!
  option.click()
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([['alice']])
  await owner.setProps({ modelValue: ['alice'], options: [], readPretty: true })
  await flushPromises()
  expect(owner.text()).toContain('Alice')
  owner.unmount()
})

test('auto commit counts enabled candidates and stops after focus leaves', async () => {
  let finish!: (options: { value: string; label: string; disabled?: boolean }[]) => void
  const loader = () =>
    new Promise<{ value: string; label: string; disabled?: boolean }[]>((resolve) => {
      finish = resolve
    })
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: { editMode: 'direct', options: loader, minSearchLength: 2, searchDelay: 0, autoCommitSingle: true },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('al')
  await flushPromises()
  input.element.blur()
  await flushPromises()
  finish([
    { value: 'a', label: 'Alice' },
    { value: 'b', label: 'Blocked', disabled: true },
  ])
  await flushPromises()
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  owner.unmount()
})

test('load errors are reported and preserve the typed input', async () => {
  const error = new Error('network')
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      options: async () => {
        throw error
      },
      minSearchLength: 2,
      searchDelay: 0,
    },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('ab')
  await flushPromises()
  expect(owner.emitted('load-error')?.[0]).toEqual([error])
  await input.trigger('keydown', { key: 'Enter' })
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  expect((input.element as HTMLInputElement).value).toBe('ab')
  owner.unmount()
})

test('field names map remote candidates and cached display labels', async () => {
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      options: async () => [{ id: '42', name: 'Ada' }],
      fieldNames: { value: 'id', label: 'name' },
      minSearchLength: 2,
      searchDelay: 0,
      autoCommitSingle: true,
    },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('ad')
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([['42']])
  expect(owner.text()).toContain('Ada')
  owner.unmount()
})

test('raising the minimum while searching cancels the pending request', async () => {
  let signal!: AbortSignal
  const loader = (_query: string, context: { signal: AbortSignal }) => {
    signal = context.signal
    return new Promise<never[]>(() => {})
  }
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: { editMode: 'direct', options: loader, minSearchLength: 2, searchDelay: 0 },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('ab')
  await flushPromises()
  await owner.setProps({ minSearchLength: 3 })
  await flushPromises()
  expect(signal.aborted).toBe(true)
  expect(input.attributes('aria-expanded')).toBe('false')
  owner.unmount()
})

test('a sole enabled candidate auto commits even with disabled results', async () => {
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      options: async () => [
        { value: 'a', label: 'Alice' },
        { value: 'b', label: 'Blocked', disabled: true },
      ],
      minSearchLength: 2,
      searchDelay: 0,
      autoCommitSingle: true,
    },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('al')
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([['a']])
  owner.unmount()
})

test('Enter cannot create a tag while the remote query is still loading', async () => {
  let finish!: (items: string[]) => void
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      options: () =>
        new Promise<string[]>((resolve) => {
          finish = resolve
        }),
      minSearchLength: 2,
      searchDelay: 0,
    },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('pending')
  await flushPromises()
  await input.trigger('keydown', { key: 'Enter' })
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  finish([])
  await flushPromises()
  await input.trigger('keydown', { key: 'Enter' })
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([['pending']])
  expect(owner.emitted('press-enter')).toHaveLength(2)
  owner.unmount()
})

test('a disabled match cannot be bypassed by creating the same raw input', async () => {
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      options: [{ value: 'blocked', label: 'blocked', disabled: true }],
      minSearchLength: 2,
    },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('blocked')
  await flushPromises()
  await input.trigger('keydown', { key: 'Enter' })
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  owner.unmount()
})

test('a loader rejecting without an error object is not treated as an empty result', async () => {
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: { editMode: 'direct', options: () => Promise.reject(), minSearchLength: 2, searchDelay: 0 },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('ab')
  await flushPromises()
  expect(owner.emitted('load-error')).toHaveLength(1)
  await input.trigger('keydown', { key: 'Enter' })
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  owner.unmount()
})
