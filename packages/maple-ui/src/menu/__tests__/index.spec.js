import { createApp, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Menu, { MenuOption } from '..'
import { menuInjectionKey } from '../context'

test('dropdown menu plugin', () => {
  const app = createApp({}).use(Menu)
  expect(app.component(Menu.name)).toBeTruthy()
  expect(app.component(MenuOption.name)).toBeTruthy()
})

test('render', async () => {
  const wrapper = mount(Menu)
  await nextTick()
  expect(wrapper.html()).toMatchSnapshot()
})

test('menu option reads the active value from context', async () => {
  const onOptionClick = vi.fn()
  const wrapper = mount(
    {
      setup() {
        return () =>
          h(
            {
              setup(_props, { slots }) {
                return () => slots.default?.()
              },
            },
            () => [h(MenuOption, { label: 'Option 1' }), h(MenuOption, { label: 'Option 2' })],
          )
      },
    },
    {
      global: {
        provide: {
          [menuInjectionKey]: {
            popupMaxHeight: ref(true),
            modelValue: ref('Option 1'),
            submenuTrigger: ref('click'),
            onOptionClick,
          },
        },
      },
    },
  )

  await nextTick()
  expect(wrapper.find('.mp-menu-option--selected-color').text()).toBe('Option 1')

  await wrapper.findAll('.mp-menu-option')[1].trigger('click')
  expect(onOptionClick).toHaveBeenCalledWith(
    'Option 2',
    expect.objectContaining({ value: 'Option 2' }),
    expect.any(Event),
  )
})

test('option states use one background layer and keep disabled priority', async () => {
  const wrapper = mount(MenuOption, { props: { label: 'Action', highlight: true } })
  expect(wrapper.classes()).toContain('mp-menu-option--active')
  expect(wrapper.find('.mp-hover-overlay').exists()).toBe(false)
  expect(wrapper.find('.mp-menu-option__cover').exists()).toBe(false)
  await wrapper.setProps({ highlight: false })
  await wrapper.trigger('focus')
  expect(wrapper.classes()).toContain('mp-menu-option--active')
  await wrapper.trigger('blur')
  expect(wrapper.classes()).not.toContain('mp-menu-option--active')
  await wrapper.setProps({ disabled: true, highlight: true })
  await wrapper.trigger('click')
  expect(wrapper.emitted('click')).toBeUndefined()
  expect(wrapper.classes()).toContain('mp-menu-option--disabled')
  wrapper.unmount()
})
