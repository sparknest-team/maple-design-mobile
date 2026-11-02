import { createApp, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Input from '..'
import { delay } from '../../utils/test'
import VarInput from '../Input'

test('input plugin', () => {
  const app = createApp({}).use(Input)
  expect(app.component(Input.name)).toBeTruthy()
})

test('input variant', () => {
  ;['filled', 'outline', 'standard'].forEach((variant) => {
    const wrapper = mount(VarInput, {
      props: { editMode: 'direct', modelValue: 'text', variant },
    })

    expect(wrapper.find(`.mp-field-decorator--variant-${variant}`).exists()).toBe(true)
    expect(wrapper.find('.mp-field-decorator__border').exists()).toBe(true)
    expect(wrapper.find('.mp-field-decorator__border-state').exists()).toBe(true)

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})

test('input size', () => {
  ;['xs', 'sm', 'md', 'lg', 'xl'].forEach((size) => {
    const wrapper = mount(VarInput, {
      props: { editMode: 'direct', modelValue: 'text', size },
    })

    expect(wrapper.find(`.mp-field-decorator--size-${size}`).exists()).toBe(true)
    wrapper.unmount()
  })
})

test('input type', () => {
  ;['text', 'password', 'number', 'tel', 'email'].forEach((type) => {
    const wrapper = mount(VarInput, {
      props: { editMode: 'direct', modelValue: 'text', type },
    })

    switch (type) {
      case 'number': {
        expect(wrapper.find('input').attributes('type')).toBe('text')
        expect(wrapper.find('input').attributes('inputmode')).toBe('decimal')
        break
      }

      case 'password': {
        expect(wrapper.find('input').attributes('type')).toBe('password')
        expect(wrapper.find('input').attributes('inputmode')).toBeUndefined()
        break
      }

      default: {
        expect(wrapper.find('input').attributes('type')).toBe(type)
        expect(wrapper.find('input').attributes('inputmode')).toBeUndefined()
        break
      }
    }

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})

test('input default value and native attributes', () => {
  const wrapper = mount(VarInput, {
    props: {
      editMode: 'direct',
      defaultValue: 'seed',
      inputAttrs: {
        'aria-label': 'Amount',
        'data-testid': 'amount',
        value: 'overridden by component value',
        maxlength: 1,
      },
    },
  })

  expect(wrapper.find('.mp-input__inner').attributes()).toMatchObject({
    value: 'seed',
    'aria-label': 'Amount',
    'data-testid': 'amount',
  })
  expect(wrapper.find('.mp-field-decorator--variant-outline').exists()).toBe(true)
  expect(wrapper.find('.mp-input__inner').attributes('maxlength')).toBeUndefined()

  wrapper.unmount()
})

test('input format number', async () => {
  const onUpdateModelValue = vi.fn()
  const wrapper = mount(VarInput, {
    props: { editMode: 'direct', modelValue: '', type: 'number', 'onUpdate:modelValue': onUpdateModelValue },
  })

  await wrapper.find('.mp-input__inner').setValue('10')
  expect(onUpdateModelValue).lastCalledWith('10')
  await wrapper.find('.mp-input__inner').setValue('aa111')
  expect(onUpdateModelValue).lastCalledWith('111')
  await wrapper.find('.mp-input__inner').setValue('1.')
  expect(onUpdateModelValue).lastCalledWith('1.')
  await wrapper.find('.mp-input__inner').setValue('1.01')
  expect(onUpdateModelValue).lastCalledWith('1.01')

  wrapper.unmount()
})

describe('test input events', () => {
  async function expectFocusAndBlur(props = {}) {
    const onFocus = vi.fn()
    const onBlur = vi.fn()

    const wrapper = mount(VarInput, {
      props: { editMode: 'direct', onFocus, onBlur, ...props },
    })

    wrapper.vm.focus()
    await wrapper.find('.mp-input__inner').trigger('focus')
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.blur()
    await wrapper.find('.mp-input__inner').trigger('blur')
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  }

  async function expectInputAndChange(props = {}) {
    const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
    const onInput = vi.fn()
    const onChange = vi.fn()

    const wrapper = mount(VarInput, {
      props: {
        editMode: 'direct',
        modelValue: '',
        onInput,
        onChange,
        'onUpdate:modelValue': onUpdateModelValue,
        ...props,
      },
    })

    await wrapper.find('.mp-input__inner').trigger('focus')
    const input = wrapper.find('.mp-input__inner')
    input.element.value = 't'
    await input.trigger('input')
    expect(onUpdateModelValue).lastCalledWith('t')
    expect(onInput).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledTimes(0)

    await wrapper.find('.mp-input__inner').trigger('blur')
    expect(onChange).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  }

  test('input focus & blur', async () => {
    await expectFocusAndBlur()
  })

  test('input onInput & committed onChange', async () => {
    await expectInputAndChange()
  })

  test('input press-enter commits change without duplicating it on blur', async () => {
    const onChange = vi.fn()
    const onPressEnter = vi.fn()
    const order = []
    const wrapper = mount(VarInput, {
      props: {
        editMode: 'direct',
        modelValue: 'before',
        modelModifiers: { trim: true },
        onChange: (...args) => {
          order.push('change')
          onChange(...args)
        },
        onPressEnter: (...args) => {
          order.push('press-enter')
          onPressEnter(...args)
        },
        'onUpdate:modelValue': (value) => {
          order.push(`update:${value}`)
          return wrapper.setProps({ modelValue: value })
        },
      },
    })

    const input = wrapper.find('.mp-input__inner')
    await input.trigger('focus')
    await input.setValue(' after ')
    order.length = 0
    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('blur')

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onPressEnter).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['after'])
    expect(order).toEqual(['change', 'press-enter'])
  })
})

test('input maxLength', () => {
  const wrapper = mount(VarInput, {
    props: { editMode: 'direct', modelValue: 'text', maxLength: 100, showWordLimit: true },
  })

  expect(wrapper.find('.mp-input__word-limit').text()).toBe('4/100')
  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})

test('input truncates over-limit input and reports the normalized value', async () => {
  const wrapper = mount(VarInput, { props: { editMode: 'direct', maxLength: 3 } })
  await wrapper.find('.mp-input__inner').setValue('four')
  expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['fou'])
  expect(wrapper.emitted('input')?.[0]?.[0]).toBe('fou')
  expect(wrapper.find('.mp-input__inner').element.value).toBe('fou')
  wrapper.unmount()
})

test('input maxLength errorOnly keeps the value and exposes error state', () => {
  const wrapper = mount(VarInput, {
    props: {
      editMode: 'direct',
      modelValue: 'text',
      maxLength: { length: 3, errorOnly: true },
      showWordLimit: true,
    },
  })

  expect(wrapper.find('.mp-input__inner').attributes('maxlength')).toBeUndefined()
  expect(wrapper.find('.mp-input__word-limit').text()).toBe('4/3')
  expect(wrapper.find('.mp-field-decorator--error').exists()).toBe(true)

  wrapper.unmount()
})

test('input hint to be false', () => {
  const wrapper = mount(VarInput, {
    props: { editMode: 'direct', modelValue: 'text', hint: false },
  })

  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})

test('input clear', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
  const onClear = vi.fn()

  const wrapper = mount(VarInput, {
    props: {
      editMode: 'direct',
      modelValue: 'text',
      clearable: true,
      onClear,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.find('button').trigger('click')
  expect(onUpdateModelValue).lastCalledWith('')
  expect(onClear).lastCalledWith(expect.any(Event))
  expect(wrapper.props('modelValue')).toBe('')

  wrapper.unmount()
})

test('input clear does not emit change on the following blur', async () => {
  const wrapper = mount(VarInput, {
    props: {
      editMode: 'direct',
      modelValue: 'text',
      clearable: true,
      'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value }),
    },
  })

  await wrapper.find('button').trigger('click')
  await wrapper.find('.mp-input__inner').trigger('blur')
  expect(wrapper.emitted('clear')).toHaveLength(1)
  expect(wrapper.emitted('change')).toHaveLength(1)
  wrapper.unmount()
})

test('input default clear icon supports keyboard activation', async () => {
  const wrapper = mount(VarInput, {
    props: { editMode: 'direct', modelValue: 'value', clearable: true },
  })

  const clear = wrapper.find('button')
  await clear.trigger('click')

  expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  expect(wrapper.emitted('clear')).toHaveLength(1)

  wrapper.unmount()
})

const triggerEvents = async (wrapper) => {
  await wrapper.find('.mp-input__inner').trigger('input')
  await wrapper.find('.mp-input__inner').trigger('change')
  const clear = wrapper.find('button')
  if (clear.exists()) {
    await clear.trigger('click')
  }
}

test('input disabled', async () => {
  const onClear = vi.fn()
  const onInput = vi.fn()
  const onChange = vi.fn()
  const onUpdateModelValue = vi.fn()

  const wrapper = mount(VarInput, {
    props: {
      editMode: 'direct',
      modelValue: 'hello',
      clearable: true,
      disabled: true,
      onInput,
      onClear,
      onChange,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await triggerEvents(wrapper)

  expect(onInput).toHaveBeenCalledTimes(0)
  expect(onClear).toHaveBeenCalledTimes(0)
  expect(onChange).toHaveBeenCalledTimes(0)
  expect(onUpdateModelValue).toHaveBeenCalledTimes(0)

  wrapper.unmount()
})

test('input readonly', async () => {
  const onClear = vi.fn()
  const onInput = vi.fn()
  const onChange = vi.fn()
  const onUpdateModelValue = vi.fn()

  const wrapper = mount(VarInput, {
    props: {
      editMode: 'direct',
      modelValue: 'hello',
      clearable: true,
      readonly: true,
      onInput,
      onClear,
      onChange,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await triggerEvents(wrapper)

  expect(onInput).toHaveBeenCalledTimes(0)
  expect(onClear).toHaveBeenCalledTimes(0)
  expect(onChange).toHaveBeenCalledTimes(0)
  expect(onUpdateModelValue).toHaveBeenCalledTimes(0)

  wrapper.unmount()
})

test('input trim', async () => {
  const onUpdateModelValue = vi.fn()

  const wrapper = mount(VarInput, {
    props: {
      editMode: 'direct',
      modelValue: '123',
      modelModifiers: { trim: true },
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.find('.mp-input__inner').setValue('123 ')
  await wrapper.find('.mp-input__inner').trigger('blur')

  expect(onUpdateModelValue).lastCalledWith('123')
  wrapper.unmount()
})

test('input autofocus', async () => {
  const wrapper = mount(VarInput, {
    props: { editMode: 'direct', autofocus: true },
  })

  await wrapper.find('.mp-input__inner').trigger('focus')
  expect(wrapper.find('.mp-field-decorator--focus').exists()).toBe(true)

  wrapper.unmount()
})

test('input focus on mousedown', async () => {
  const wrapper = mount(VarInput, { props: { editMode: 'direct' } })

  await wrapper.trigger('mousedown')
  await wrapper.find('.mp-input__inner').trigger('focus')
  expect(wrapper.find('.mp-field-decorator--focus').exists()).toBe(true)
  wrapper.unmount()
})

describe('test input component slots', () => {
  test('input suffix slot', () => {
    const wrapper = mount(VarInput, {
      props: { editMode: 'direct' },
      slots: {
        suffix: () => 'suffix',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })

  test('input prefix slot', () => {
    const wrapper = mount(VarInput, {
      props: { editMode: 'direct' },
      slots: {
        prefix: () => 'prefix',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })

  test('input clear-icon slot', async () => {
    const wrapper = mount(VarInput, {
      props: { editMode: 'direct', clearable: true, modelValue: 'value' },
      slots: {
        'clear-icon': ({ clear }) => h('button', { class: 'custom-clear-icon', onClick: () => clear() }, 'Clear'),
      },
    })

    await wrapper.find('.custom-clear-icon').trigger('click')
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })
})

test('input aria-label', async () => {
  const wrapper = mount(VarInput, {
    props: { editMode: 'direct', modelValue: 'text', ariaLabel: 'test aria-label' },
  })

  await delay(100)
  expect(wrapper.find('.mp-input__inner').attributes('aria-label')).toBe('test aria-label')
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})
