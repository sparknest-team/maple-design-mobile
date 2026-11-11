import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Group from '../ImagePreviewGroup.vue'

test('image numbers are one-based for defaults, commands, events and custom indicators', async () => {
  let scope
  const wrapper = mount(Group, {
    props: { images: ['/one.png', '/two.png'], open: true, popupContainer: false, loop: true },
    slots: {
      indicator: (value) => {
        scope = value
        return h('span', String(value.imageNumber))
      },
    },
  })
  try {
    expect(scope.imageNumber).toBe(1)
    expect(scope.index).toBeUndefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.vm.to(2)
    await nextTick()
    expect(scope.imageNumber).toBe(2)
    expect(wrapper.emitted('change')).toEqual([[2, 1]])
    wrapper.vm.next()
    await nextTick()
    expect(scope.imageNumber).toBe(1)
    expect(wrapper.emitted('change').at(-1)).toEqual([1, 2])
    wrapper.vm.open(2)
    await nextTick()
    expect(scope.imageNumber).toBe(2)
    const count = wrapper.emitted('change').length
    wrapper.vm.to(0)
    wrapper.vm.open(0)
    await nextTick()
    expect(scope.imageNumber).toBe(2)
    expect(wrapper.emitted('change')).toHaveLength(count)
  } finally {
    wrapper.unmount()
  }
})

test('external controlled assignment updates the previous image number without notifying', async () => {
  const wrapper = mount(Group, {
    props: { images: ['/one.png', '/two.png', '/three.png'], modelValue: 1, popupContainer: false },
  })
  try {
    await wrapper.setProps({ modelValue: 2 })
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.vm.to(3)
    expect(wrapper.emitted('change')).toEqual([[3, 2]])
  } finally {
    wrapper.unmount()
  }
})

test('controlled open proposes the requested image number only once', () => {
  const wrapper = mount(Group, { props: { images: ['/one.png', '/two.png'], modelValue: 1, popupContainer: false } })
  try {
    wrapper.vm.open(2)
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]])
    expect(wrapper.emitted('change')).toEqual([[2, 1]])
  } finally {
    wrapper.unmount()
  }
})
