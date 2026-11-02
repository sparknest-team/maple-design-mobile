import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SplitButton from '..'
import MenuOption from '../../menu/MenuOption.vue'

describe('split button reading direction', () => {
  it('keeps primary action and menu selection separate after switching direction', async () => {
    const wrapper = mount(SplitButton, {
      props: { popupContainer: false },
      attrs: { dir: 'ltr' },
      slots: { default: () => 'Publish', content: () => h(MenuOption, { value: 'save', label: 'Save' }) },
    })
    const buttons = wrapper.findAll('button')
    wrapper.element.setAttribute('dir', 'rtl')
    await nextTick()
    await buttons[0].trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(wrapper.emitted('update:open')).toBeUndefined()
    await buttons[1].trigger('click')
    expect(wrapper.emitted('update:open')?.[0]).toEqual([true])
    wrapper.element.setAttribute('dir', 'ltr')
    await nextTick()
    expect(wrapper.emitted('update:open')).toHaveLength(1)
    await wrapper.get('[data-menu-item]').trigger('click')
    expect(wrapper.emitted('select')?.[0]?.[0]).toBe('save')
    expect(wrapper.emitted('click')).toHaveLength(1)
    wrapper.unmount()
  })
})
