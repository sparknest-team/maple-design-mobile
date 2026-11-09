import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Tabs, { TabPane } from '..'

test('pointer removal restores focus to the adjacent tab', async () => {
  const names = ref(['A', 'B', 'C'])
  const wrapper = mount(Tabs, {
    attachTo: document.body,
    props: {
      editable: true,
      onDelete: (key: string | number) => {
        names.value = names.value.filter((name) => name !== key)
      },
    },
    slots: { default: () => names.value.map((name) => h(TabPane, { key: name, name, title: name, closable: true })) },
  })
  try {
    const close = wrapper.findAll('.mp-tabs__close')[1]
    ;(close.element as HTMLElement).focus()
    await close.trigger('click')
    await nextTick()
    await nextTick()
    expect(document.activeElement?.textContent).toBe('C')
  } finally {
    wrapper.unmount()
  }
})

test('hiding a focused panel restores focus to the newly active tab', async () => {
  const wrapper = mount(Tabs, {
    attachTo: document.body,
    props: { modelValue: 'A', destroyOnHide: true },
    slots: {
      default: () => ['A', 'B'].map((name) => h(TabPane, { name, title: name }, { default: () => h('input') })),
    },
  })
  try {
    ;(wrapper.get('[role=tabpanel]:not([hidden]) input').element as HTMLElement).focus()
    await wrapper.setProps({ modelValue: 'B' })
    await nextTick()
    await nextTick()
    expect(document.activeElement?.textContent).toBe('B')
  } finally {
    wrapper.unmount()
  }
})
