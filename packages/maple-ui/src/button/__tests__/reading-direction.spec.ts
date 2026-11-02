import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Button, { ButtonGroup } from '..'

describe('button group reading direction', () => {
  it('preserves DOM, action order and disabled inheritance during direction changes', async () => {
    const wrapper = mount(ButtonGroup, {
      attrs: { dir: 'ltr' },
      slots: {
        default: () => [
          h(Button, {}, () => 'First'),
          h(Button, { disabled: true, dir: 'ltr' }, () => 'Blocked'),
          h(Button, {}, () => 'Last'),
        ],
      },
    })
    const buttons = wrapper.findAll('button').map((button) => button.element)
    wrapper.element.setAttribute('dir', 'rtl')
    await nextTick()
    await nextTick()
    expect(wrapper.findAll('button').map((button) => button.element)).toEqual(buttons)
    expect(wrapper.findAll('button').map((button) => button.text())).toEqual(['First', 'Blocked', 'Last'])
    expect(wrapper.findAll('button')[1].attributes('disabled')).toBeDefined()
    expect(buttons[1].getAttribute('dir')).toBe('ltr')
    await wrapper.setProps({ disabled: true })
    expect(wrapper.findAll('button').every((button) => button.attributes('disabled') !== undefined)).toBe(true)
    wrapper.unmount()
  })
  it.each([false, true])('supports a single child with vertical=%s', (vertical) => {
    const wrapper = mount(ButtonGroup, {
      props: { vertical },
      attrs: { dir: 'rtl' },
      slots: { default: () => h(Button, {}, () => 'Only') },
    })
    expect(wrapper.findAll('button')).toHaveLength(1)
    expect(wrapper.classes()).toContain('mp-button-group--' + (vertical ? 'vertical' : 'horizontal'))
    wrapper.unmount()
  })
})
