import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Input, { InputGroup, InputGroupLabel, InputPassword } from '..'

describe('Input Cedar-aligned extensions', () => {
  it('inherits group size, variant, and disabled state while allowing local overrides', async () => {
    const wrapper = mount(InputGroup, {
      props: { size: 'lg', variant: 'filled', disabled: true },
      slots: {
        default: () => [h(InputGroupLabel, () => 'Prefix'), h(Input, { defaultValue: 'value' })],
      },
    })

    expect(wrapper.find('.mp-field-decorator--variant-filled').exists()).toBe(true)
    expect(wrapper.find('.mp-field-decorator--size-lg').exists()).toBe(true)
    expect(wrapper.get('.mp-input__inner').attributes('disabled')).toBeDefined()

    await wrapper.setProps({ disabled: false, variant: 'outline' })
    await nextTick()
    expect(wrapper.find('.mp-field-decorator--variant-outline').exists()).toBe(true)
    expect(wrapper.get('.mp-input__inner').attributes('disabled')).toBeUndefined()
  })

  it('toggles password visibility and exposes focus/blur', async () => {
    const wrapper = mount(InputPassword, { attrs: { defaultValue: 'secret' }, attachTo: document.body })
    const field = wrapper.findAll('input').at(-1)!

    expect(field.attributes('type')).toBe('password')
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('visibility-change')?.[0]).toEqual([true])
    expect(wrapper.findAll('input').at(-1)!.attributes('type')).toBe('text')

    wrapper.vm.focus()
    expect(document.activeElement).toBe(wrapper.findAll('input').at(-1)!.element)
    wrapper.unmount()
  })
})
