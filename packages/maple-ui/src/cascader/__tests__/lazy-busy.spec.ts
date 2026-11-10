import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../Cascader.vue'
import Panel from '../CascaderPanel.vue'

test.each([
  ['field', Cascader],
  ['panel', Panel],
] as const)('%s lazy branch exposes and clears its pending state', async (kind, component) => {
  let done!: (children?: { value: string; label: string }[]) => void
  const wrapper = mount(component as any, {
    props: {
      options: [{ value: 'root', label: 'Root', isLeaf: false }],
      loadMore: (_option: unknown, callback: typeof done) => {
        done = callback
      },
      ...(kind === 'field' ? { editMode: 'direct', defaultOpen: true, popupContainer: false } : {}),
    },
  })
  try {
    await flushPromises()
    const branch = wrapper.get('[role="menuitem"][title="Root"]')
    expect(branch.attributes('aria-busy')).toBeUndefined()
    await branch.trigger('click')
    expect(branch.attributes('aria-busy')).toBe('true')
    done([{ value: 'child', label: 'Child' }])
    await flushPromises()
    expect(branch.attributes('aria-busy')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test.each([
  ['field', Cascader],
  ['panel', Panel],
] as const)('%s clears pending state when its loader is replaced', async (kind, component) => {
  let done!: (children?: { value: string; label: string }[]) => void
  const wrapper = mount(component as any, {
    props: {
      options: [{ value: 'root', label: 'Root', isLeaf: false }],
      loadMore: (_option: unknown, callback: typeof done) => {
        done = callback
      },
      ...(kind === 'field' ? { editMode: 'direct', defaultOpen: true, popupContainer: false } : {}),
    },
  })
  try {
    await flushPromises()
    await wrapper.get('[role="menuitem"][title="Root"]').trigger('click')
    expect(wrapper.get('[role="menuitem"][title="Root"]').attributes('aria-busy')).toBe('true')
    await wrapper.setProps({ loadMore: () => {} })
    await flushPromises()
    expect(wrapper.get('[role="menuitem"][title="Root"]').attributes('aria-busy')).toBeUndefined()
    done([{ value: 'old', label: 'Stale child' }])
    await flushPromises()
    expect(wrapper.text()).not.toContain('Stale child')
  } finally {
    wrapper.unmount()
  }
})
