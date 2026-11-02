import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Select from '..'
import AutoComplete from '../../auto-complete'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
for (const [name, Component] of [
  ['Select', Select],
  ['AutoComplete', AutoComplete],
] as const) {
  function setup(props: Record<string, unknown>) {
    const owner = mount(Component as any, {
      props: { editMode: 'direct', open: true, filterable: true, searchDelay: 0, ...props },
      attachTo: document.body,
    })
    owners.push(owner)
    return owner
  }
  test(`${name}: function props load candidates; remote results are not locally filtered again`, async () => {
    const request = vi.fn(async (_query: string) => [{ value: 'a', label: 'Alice' }])
    const owner = setup({ options: request })
    await flushPromises()
    expect(request).toHaveBeenCalledTimes(1)
    await owner.get('input').setValue('server-query')
    await new Promise((resolve) => setTimeout(resolve, 20))
    await flushPromises()
    expect(request.mock.calls.at(-1)?.[0]).toBe('server-query')
    expect(document.body.textContent).toContain('Alice')
  })
  test(`${name}: explicit arrays override loaders, including empty arrays`, async () => {
    const request = vi.fn(async (_query: string) => [{ value: 'a', label: 'Alice' }])
    setup({ options: [] })
    await flushPromises()
    expect(request).not.toHaveBeenCalled()
  })
  test(`${name}: load failures are emitted and component refresh retries`, async () => {
    const request = vi
      .fn()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce([{ value: 'a', label: 'Alice' }])
    const owner = setup({ options: request })
    await flushPromises()
    expect(owner.emitted('load-error')).toHaveLength(1)
    await (owner.vm as any).refresh()
    await flushPromises()
    expect(request).toHaveBeenCalledTimes(2)
  })
}

test('multiple clear results do not share a configured empty array between clears', async () => {
  const configured: string[] = []
  const owner = mount(Select, {
    props: { modelValue: ['a'], options: ['a'], multiple: true, editMode: 'direct', emptyValue: configured },
  })
  owners.push(owner)
  await flushPromises()
  await owner.get('[class$="__clear-btn"]').trigger('click')
  const first = owner.emitted('update:modelValue')?.at(-1)?.[0] as string[]
  expect(first).toEqual([])
  expect(first).not.toBe(configured)
  first.push('local-mutation')
  await owner.get('[class$="__clear-btn"]').trigger('click')
  expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([])
  expect(configured).toEqual([])
})

test('switching a loader to an array cancels pending work and keeps the explicit array', async () => {
  let release!: (value: string[]) => void
  let signal!: AbortSignal
  const owner = mount(Select, {
    props: {
      editMode: 'direct',
      options: (_query: string, context: { signal: AbortSignal }) => {
        signal = context.signal
        return new Promise<string[]>((resolve) => {
          release = resolve
        })
      },
    },
  })
  owners.push(owner)
  await flushPromises()
  await owner.setProps({ options: ['local'] })
  await flushPromises()
  expect(signal.aborted).toBe(true)
  release(['stale'])
  await flushPromises()
  expect(owner.text()).not.toContain('stale')
})

for (const Component of [Select, AutoComplete]) {
  test('an invalid loader envelope reports load-error instead of breaking the rendered control', async () => {
    const owner = mount(Component as any, {
      props: { editMode: 'direct', options: async () => ({ records: [] }), searchDelay: 0 },
    })
    owners.push(owner)
    await flushPromises()
    expect(owner.emitted('load-error')?.at(-1)?.[0]).toBeInstanceOf(TypeError)
    expect(owner.find('input').exists()).toBe(true)
  })
}
