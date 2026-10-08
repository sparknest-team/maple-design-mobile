import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Input, { InputGroup, InputGroupLabel, InputPassword } from '..'
import Form, { FormItem } from '../../form'
import { createNamespace } from '../../utils/components'

const { n: field } = createNamespace('field-decorator')

describe('input family contract', () => {
  test('inherits an outer label through a no-style item and displays explicit feedback', () => {
    const wrapper = mount(Form, {
      props: { model: { name: '' } },
      slots: {
        default: () =>
          h(
            FormItem,
            { label: 'Account' },
            {
              default: () =>
                h(
                  FormItem,
                  { field: 'name', noStyle: true, feedback: true, validateStatus: 'warning' },
                  { default: () => h(Input, { hint: true, placeholder: 'Account' }) },
                ),
            },
          ),
      },
    })
    expect(wrapper.find(`.${field('placeholder')}`).exists()).toBe(false)
    expect(wrapper.find(`.${createNamespace('input-feedback').n('--warning')}`).exists()).toBe(true)
    wrapper.unmount()
  })

  test('does not emit disabled clicks but permits readonly clicks', async () => {
    const wrapper = mount(Input, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
    await wrapper.setProps({ disabled: false, readonly: true })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
    wrapper.unmount()
  })
  test('group state is reactive and explicit false overrides inherited state', async () => {
    const wrapper = mount(InputGroup, {
      props: { size: 'lg', disabled: true, readonly: true, hint: true, variant: 'filled' },
      slots: {
        default: () => [
          h(InputGroupLabel, () => 'https://'),
          h(Input, { placeholder: 'Host', disabled: false, readonly: false }),
        ],
      },
    })
    const native = wrapper.get('input')
    expect(native.attributes('disabled')).toBeUndefined()
    expect(native.attributes('readonly')).toBeUndefined()
    expect(wrapper.find(`.${field('--size-lg')}`).exists()).toBe(true)
    expect(wrapper.find(`.${field('--variant-filled')}`).exists()).toBe(true)
    expect(wrapper.find('label').exists()).toBe(true)
    await wrapper.setProps({ size: 'sm', variant: 'outline', hint: false })
    expect(wrapper.find(`.${field('--size-sm')}`).exists()).toBe(true)
    expect(wrapper.find(`.${field('--variant-outline')}`).exists()).toBe(true)
    expect(wrapper.find('label').exists()).toBe(false)
    wrapper.unmount()
  })

  test('password toggle inherits disabling and forwards custom clear slots', async () => {
    const wrapper = mount(InputGroup, {
      props: { disabled: true },
      slots: {
        default: () =>
          h(
            InputPassword,
            { defaultValue: 'secret', clearable: true },
            {
              'clear-icon': ({ clear }: { clear: (event: Event) => void }) =>
                h('button', { class: 'custom-clear', onClick: clear }, 'clear'),
            },
          ),
      },
    })
    expect(wrapper.get('button').attributes('disabled')).toBeDefined()
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('input').attributes('type')).toBe('password')
    await wrapper.setProps({ disabled: false })
    expect(wrapper.find('.custom-clear').exists()).toBe(true)
    await wrapper.get('.custom-clear').trigger('click')
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('')
    wrapper.unmount()
  })

  test('keeps input attrs on the native element and protects controlled fields', () => {
    const wrapper = mount(Input, {
      props: {
        hint: true,
        placeholder: 'Name',
        defaultValue: 'actual',
        inputAttrs: { id: 'person-name', type: 'checkbox', value: 'wrong', maxlength: 1 },
      },
      attrs: { name: 'person', required: true, 'aria-describedby': 'help', class: 'outer' },
    })
    const native = wrapper.get('input')
    expect(native.attributes()).toMatchObject({
      id: 'person-name',
      name: 'person',
      required: '',
      type: 'text',
      value: 'actual',
      'aria-describedby': 'help',
    })
    expect(native.attributes('maxlength')).toBeUndefined()
    expect(wrapper.get('label').attributes('for')).toBe('person-name')
    expect(wrapper.classes()).toContain('outer')
    expect(wrapper.attributes('name')).toBeUndefined()
    wrapper.unmount()
  })

  test('restores rejected controlled input without moving a zero-position cursor to the end', async () => {
    const wrapper = mount(Input, { props: { modelValue: 'abc' }, attachTo: document.body })
    const native = wrapper.get('input')
    const input = native.element as HTMLInputElement
    input.focus()
    input.value = 'xabc'
    input.setSelectionRange(1, 1)
    await native.trigger('input')
    await nextTick()
    expect(input.value).toBe('abc')
    expect(input.selectionStart).toBe(0)
    wrapper.unmount()
  })

  test('ignores Enter while the native event is composing', async () => {
    const press = vi.fn()
    const wrapper = mount(Input, { props: { onPressEnter: press } })
    await wrapper.get('input').trigger('keydown', { key: 'Enter', isComposing: true })
    expect(press).not.toHaveBeenCalled()
    wrapper.unmount()
  })
})
