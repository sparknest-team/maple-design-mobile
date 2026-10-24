import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import FloatingPanel from '../../floating-panel'
import Menu from '../../menu'
import Select from '../select'
import SelectMenu from '../SelectMenu'

test('SelectMenu exposes flat group headings to first-child spacing selectors', () => {
  const wrapper = mount(Select, {
    props: {
      defaultOpen: true,
      options: [
        { isGroup: true, label: 'First', options: [{ value: 'a', label: 'A' }] },
        { isGroup: true, label: 'Second', options: [{ value: 'b', label: 'B' }] },
      ],
    },
  })
  try {
    const menu = wrapper.findComponent(SelectMenu)
    const titles = menu.findAll('.mp-select-group-title')
    expect(titles.map((node) => node.text())).toEqual(['First', 'Second'])
    expect(titles[0].element.matches(':first-child')).toBe(true)
    expect(titles[1].element.matches(':first-child')).toBe(false)
    expect(titles[0].element.parentElement).toBe(titles[1].element.parentElement)
    expect(titles[0].element.nextElementSibling?.getAttribute('role')).toBe('option')
    expect(menu.find('.mp-select-group').exists()).toBe(false)
  } finally {
    wrapper.unmount()
  }
})

test('Menu selected/focus/disabled rows and adjacent groups use current consumer classes without a cover', async () => {
  const popup = document.createElement('div')
  document.body.append(popup)
  const wrapper = mount(Menu, {
    props: {
      defaultOpen: true,
      popupContainer: popup,
      modelValue: 'a',
      hideOnSelect: false,
      options: [
        {
          type: 'group',
          label: 'First',
          children: [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B', disabled: true },
          ],
        },
        { type: 'group', label: 'Second', children: [{ value: 'c', label: 'C' }] },
      ],
    },
    slots: { default: () => h('button', 'open') },
  })
  try {
    await nextTick()
    const groups = popup.querySelectorAll('.mp-menu-group')
    expect(groups).toHaveLength(2)
    expect(groups[0].nextElementSibling).toBe(groups[1])
    expect(groups[0].querySelector('.mp-menu-group__title').textContent).toBe('First')
    const rows = popup.querySelectorAll('[data-menu-item]')
    expect(rows[0].classList.contains('mp-menu-option--selected-color')).toBe(true)
    expect(rows[1].classList.contains('mp-menu-option--disabled')).toBe(true)
    expect(rows[1].getAttribute('aria-disabled')).toBe('true')
    rows[0].focus()
    await nextTick()
    expect(rows[0].classList.contains('mp-menu-option--active')).toBe(true)
    rows[1].click()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(popup.querySelector('.mp-menu-option__cover')).toBeNull()
  } finally {
    wrapper.unmount()
    popup.remove()
  }
})

test('FloatingPanel actual teleported root belongs to the surface override ancestor without changing the height model', async () => {
  const popup = document.createElement('div')
  popup.style.setProperty('--mp-floating-panel-background', 'rgb(12, 34, 56)')
  const wrapper = mount(FloatingPanel, {
    props: { popupContainer: popup, anchors: [100, 200], modelValue: 100 },
  })
  try {
    await nextTick()
    const panel = popup.querySelector('.mp-floating-panel')
    expect(panel.parentElement).toBe(popup)
    expect(popup.style.getPropertyValue('--mp-floating-panel-background')).toBe('rgb(12, 34, 56)')
    expect(panel.querySelector('.mp-floating-panel__content')).not.toBeNull()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
    popup.remove()
  }
})
