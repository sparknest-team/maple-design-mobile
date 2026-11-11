import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Collapse, { CollapseItem } from '..'

test('parent and item expand-icon slots expose expanded only and follow accepted model values', async () => {
  const contexts = new Map()
  const icon = (name) => (ctx) => {
    contexts.set(name, ctx)
    return ctx.expanded ? 'Expanded' : 'Collapsed'
  }
  const wrapper = mount(Collapse, {
    props: { modelValue: [0] },
    slots: {
      'expand-icon': icon('parent'),
      default: () => [
        h(CollapseItem, { name: 0, title: 'Zero' }),
        h(CollapseItem, { name: 'own', title: 'Own' }, { 'expand-icon': icon('item') }),
      ],
    },
  })
  try {
    expect(contexts.get('parent')).toMatchObject({ expanded: true, disabled: false, position: 'left' })
    expect(contexts.get('item').expanded).toBe(false)
    for (const ctx of contexts.values()) {
      expect(ctx).not.toHaveProperty('active')
    }
    await wrapper.findAll('[role="button"]')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[[0, 'own']]])
    expect(contexts.get('item').expanded).toBe(false)
    await wrapper.setProps({ modelValue: ['own'] })
    expect(contexts.get('parent').expanded).toBe(false)
    expect(contexts.get('item').expanded).toBe(true)
  } finally {
    wrapper.unmount()
  }
})
