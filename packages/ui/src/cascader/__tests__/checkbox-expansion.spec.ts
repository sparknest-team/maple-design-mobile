import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Panel from '../CascaderPanel.vue'

test.each([false, true])(
  'checking a branch only selects without expanding (checkStrictly=%s)',
  async (checkStrictly) => {
    const wrapper = mount(Panel, {
      props: {
        multiple: true,
        checkStrictly,
        options: [{ value: 'root', label: 'Root', children: [{ value: 'child', label: 'Child' }] }],
      },
    })
    try {
      const branch = wrapper.get('[title="Root"]')
      await branch.get('input[type="checkbox"]').setValue(true)
      expect(wrapper.emitted('update:modelValue')).toEqual([[checkStrictly ? ['root'] : ['child']]])
      expect(branch.attributes('aria-expanded')).toBe('false')
      expect(wrapper.find('[title="Child"]').exists()).toBe(false)
      await branch.get('input[type="checkbox"]').setValue(false)
      await branch.get('[class$="-label-content"]').trigger('click')
      expect(branch.attributes('aria-expanded')).toBe('true')
      expect(wrapper.find('[title="Child"]').exists()).toBe(true)
    } finally {
      wrapper.unmount()
    }
  },
)

test('checking a lazy branch does not load children; clicking its label loads once', async () => {
  const loadMore = vi.fn((_option: unknown, done: (children: any[]) => void) => {
    done([{ value: 'child', label: 'Child', isLeaf: true }])
  })
  const wrapper = mount(Panel, {
    props: {
      multiple: true,
      checkStrictly: true,
      options: [{ value: 'root', label: 'Root', isLeaf: false }],
      loadMore,
    },
  })
  try {
    const branch = wrapper.get('[title="Root"]')
    await branch.get('input[type="checkbox"]').setValue(true)
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toEqual([[['root']]])
    expect(loadMore).not.toHaveBeenCalled()
    expect(branch.attributes('aria-expanded')).toBe('false')
    await branch.get('input[type="checkbox"]').setValue(false)
    await branch.get('[class$="-label-content"]').trigger('click')
    await flushPromises()
    expect(loadMore).toHaveBeenCalledOnce()
    expect(branch.attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('[title="Child"]').exists()).toBe(true)
  } finally {
    wrapper.unmount()
  }
})

test('disabled branch checkbox cannot select or load children', async () => {
  const loadMore = vi.fn()
  const wrapper = mount(Panel, {
    props: {
      multiple: true,
      checkStrictly: true,
      options: [{ value: 'root', label: 'Root', isLeaf: false, disabled: true }],
      loadMore,
    },
  })
  try {
    const branch = wrapper.get('[title="Root"]')
    await branch.get('input[type="checkbox"]').setValue(true)
    await branch.get('[class$="-label-content"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(loadMore).not.toHaveBeenCalled()
    expect(branch.attributes('aria-expanded')).toBe('false')
  } finally {
    wrapper.unmount()
  }
})
