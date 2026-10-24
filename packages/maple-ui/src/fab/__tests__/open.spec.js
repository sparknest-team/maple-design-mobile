import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Fab from '..'

test('v-model:open controls the action menu and visible controls the whole widget', async () => {
  const wrapper = mount(
    defineComponent({
      components: { Fab },
      setup: () => ({ open: ref(false), visible: ref(true) }),
      template:
        '<Fab v-model:open="open" :visible="visible" :fixed="false" :popup-container="false"><span>Action</span><template #trigger="{ open }"><button>{{ open ? "Close" : "Open" }}</button></template></Fab>',
    }),
  )
  const fab = wrapper.findComponent(Fab)
  expect(fab.emitted('update:open')).toBeUndefined()
  await wrapper.find('button').trigger('click')
  expect(wrapper.vm.open).toBe(true)
  expect(wrapper.find('button').text()).toBe('Close')
  expect(wrapper.find('.mp-fab__actions').element.style.display).toBe('')
  wrapper.vm.visible = false
  await wrapper.vm.$nextTick()
  expect(wrapper.find('button').exists()).toBe(true)
  expect(wrapper.find('.mp-fab').element.style.display).toBe('none')
  document.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  await wrapper.vm.$nextTick()
  expect(wrapper.vm.open).toBe(true)
  wrapper.unmount()
})

test('defaultOpen initializes once without emitting; controlled open takes precedence', async () => {
  const wrapper = mount(Fab, {
    props: { defaultOpen: true, fixed: false, popupContainer: false },
    slots: { default: () => h('span', 'Action') },
  })
  const actions = wrapper.find('.mp-fab__actions')
  expect(actions.element.style.display).toBe('')
  expect(wrapper.emitted('update:open')).toBeUndefined()
  await wrapper.setProps({ defaultOpen: false })
  expect(actions.element.style.display).toBe('')
  await wrapper.setProps({ open: false })
  expect(actions.element.style.display).toBe('none')
  await wrapper.find('.mp-fab__trigger').trigger('click')
  expect(wrapper.emitted('update:open')).toEqual([[true]])
  expect(actions.element.style.display).toBe('none')
  await wrapper.setProps({ open: true })
  expect(actions.element.style.display).toBe('')
  wrapper.unmount()
})

test('hiding keeps a custom trigger instance and does not close its action menu', async () => {
  const Trigger = defineComponent({
    setup() {
      const count = ref(0)
      return () =>
        h(
          'button',
          {
            onClick: (event) => {
              event.stopPropagation()
              count.value++
            },
          },
          String(count.value),
        )
    },
  })
  const wrapper = mount(Fab, {
    props: { defaultOpen: true, fixed: false, popupContainer: false },
    slots: { trigger: () => h(Trigger), default: () => h('span', 'Action') },
  })
  await wrapper.find('button').trigger('click')
  expect(wrapper.find('button').text()).toBe('1')
  await wrapper.setProps({ open: true, visible: false })
  expect(wrapper.find('button').exists()).toBe(true)
  expect(wrapper.emitted('closed')).toBeUndefined()
  await wrapper.setProps({ visible: true })
  expect(wrapper.find('button').text()).toBe('1')
  expect(wrapper.find('.mp-fab__actions').element.style.display).toBe('')
  wrapper.unmount()
})
