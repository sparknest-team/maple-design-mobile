import { createApp, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import SplitButton from '..'
import MenuOption from '../../menu-option'

test('split-button plugin', () => {
  const app = createApp({}).use(SplitButton)
  expect(app.component(SplitButton.name)).toBeTruthy()
})

test('main action does not open menu', async () => {
  const onClick = vi.fn()
  const wrapper = mount(SplitButton, { props: { popupContainer: false, onClick }, slots: { default: 'Publish' } })
  const buttons = wrapper.findAll('button')

  await buttons[0].trigger('click')

  expect(onClick).toHaveBeenCalledTimes(1)
  expect(wrapper.emitted('update:open')).toBeUndefined()
})

test('trigger opens menu and forwards select', async () => {
  const onSelect = vi.fn()
  const wrapper = mount(SplitButton, {
    props: { popupContainer: false, onSelect },
    slots: { content: () => h(MenuOption, { label: 'Save now', value: 'save' }) },
  })
  const buttons = wrapper.findAll('button')

  await buttons[1].trigger('click')
  await nextTick()
  expect(wrapper.emitted('update:open')?.[0]).toEqual([true])

  await wrapper.find('.mp-menu-option').trigger('click')
  expect(onSelect).toHaveBeenCalled()
})

test('icon slot receives open state', async () => {
  const wrapper = mount(SplitButton, {
    props: { popupContainer: false },
    slots: { icon: ({ open }) => `open:${open}` },
  })

  expect(wrapper.text()).toContain('open:false')
  await wrapper.findAll('button')[1].trigger('click')
  await nextTick()
  expect(wrapper.text()).toContain('open:true')
})
