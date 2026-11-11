import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Menu, { MenuOption } from '..'

const tick = async () => {
  await nextTick()
  await nextTick()
}
test('business values keep row instances and focus across option reordering', async () => {
  const options = [
    { value: 0, label: 'Number zero' },
    { value: '0', label: 'String zero' },
    { value: false, label: 'False' },
  ]
  const wrapper = mount(Menu, {
    attachTo: document.body,
    props: { defaultOpen: true, popupContainer: false, options, hideOnSelect: false },
    slots: { default: () => h('button', 'Open') },
  })
  try {
    await tick()
    const rows = () => wrapper.findAllComponents(MenuOption)
    const identities = new Map(rows().map((row) => [row.props('value'), row.vm.$.uid]))
    rows()
      .find((row) => row.props('value') === 0)
      .element.focus()
    await wrapper.setProps({ options: [options[2], options[1], { ...options[0], label: 'Renamed zero' }] })
    await tick()
    for (const row of rows()) {
      expect(row.vm.$.uid).toBe(identities.get(row.props('value')))
    }
    expect(document.activeElement.textContent).toContain('Renamed zero')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})
