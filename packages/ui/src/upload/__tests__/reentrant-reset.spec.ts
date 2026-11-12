import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Upload from '..'

test.each(['rejected', 'exceed'] as const)('reset in %s prevents stale file commits', async (event) => {
  const wrapper = mount(Upload, {
    props: {
      editMode: 'direct',
      autoUpload: false,
      maxFiles: 1,
      resolveType: 'file',
      onRejected: () => {
        if (event === 'rejected') {
          wrapper.vm.reset()
        }
      },
      onExceed: () => {
        if (event === 'exceed') {
          wrapper.vm.reset()
        }
      },
    },
  })
  try {
    const input = wrapper.get('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      configurable: true,
      value: [new File(['a'], 'a.txt'), new File(['b'], 'b.txt')],
    })
    await input.trigger('change')
    await flushPromises()
    expect(wrapper.emitted('rejected')).toHaveLength(1)
    expect(wrapper.emitted('exceed')?.length ?? 0).toBe(event === 'exceed' ? 1 : 0)
    expect(wrapper.emitted('read')).toBeUndefined()
    expect(wrapper.vm.getFiles()).toEqual([])
  } finally {
    wrapper.unmount()
  }
})

test.each(['update', 'change'] as const)('reset in %s suppresses later stale events', async (event) => {
  const wrapper = mount(Upload, {
    props: {
      editMode: 'direct',
      autoUpload: false,
      resolveType: 'file',
      'onUpdate:modelValue': (files) => {
        if (event === 'update' && files?.length) {
          wrapper.vm.reset()
        }
      },
      onChange: (files) => {
        if (event === 'change' && files?.length) {
          wrapper.vm.reset()
        }
      },
    },
  })
  try {
    const input = wrapper.get('input[type="file"]')
    Object.defineProperty(input.element, 'files', { configurable: true, value: [new File(['a'], 'a.txt')] })
    await input.trigger('change')
    await flushPromises()
    const changes = (wrapper.emitted('change') ?? []).map((args) => (args[0] as unknown[]).length)
    expect(changes).toEqual(event === 'update' ? [0] : [1, 0])
    expect(wrapper.emitted('read')).toBeUndefined()
    expect(wrapper.vm.getFiles()).toEqual([])
  } finally {
    wrapper.unmount()
  }
})

test('unmount in update callback does not emit stale change or read', async () => {
  let changes = 0
  let reads = 0
  const wrapper = mount(Upload, {
    props: {
      editMode: 'direct',
      autoUpload: false,
      resolveType: 'file',
      'onUpdate:modelValue': (files) => {
        if (files?.length) {
          wrapper.unmount()
        }
      },
      onChange: () => {
        changes++
      },
      onRead: () => {
        reads++
      },
    },
  })
  const input = wrapper.get('input[type="file"]')
  Object.defineProperty(input.element, 'files', { configurable: true, value: [new File(['a'], 'a.txt')] })
  await input.trigger('change')
  await flushPromises()
  expect(changes).toBe(0)
  expect(reads).toBe(0)
})
