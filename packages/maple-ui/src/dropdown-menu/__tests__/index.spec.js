import { createApp, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import DropdownMenu, { MenuOption } from '..'
import { menuInjectionKey } from '../context'

test('dropdown menu plugin', () => {
  const app = createApp({}).use(DropdownMenu)
  expect(app.component(DropdownMenu.name)).toBeTruthy()
  expect(app.component(MenuOption.name)).toBeTruthy()
})

test('render', async () => {
  const wrapper = mount(DropdownMenu)
  await nextTick()
  expect(wrapper.html()).toMatchSnapshot()
})

test('menu option reads the selected value from context', async () => {
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
  expect(wrapper.find('.mp-dropdown-menu-option--selected-color').text()).toBe('Option 1')

  await wrapper.findAll('.mp-dropdown-menu-option')[1].trigger('click')
  expect(onOptionClick).toHaveBeenCalledWith(
    'Option 2',
    expect.objectContaining({ value: 'Option 2' }),
    expect.any(Event),
  )
})
