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
      props: {
        modelValue: 'text',
        variant,
      },
    })

    expect(wrapper.find(`mp-field-decorator--${variant}`)).toBeTruthy()
    switch (variant) {
      case 'standard': {
        expect(
          wrapper.find('.mp-field-decorator__line').wrapperElement.querySelector('.mp-field-decorator__dot'),
        ).toBeTruthy()
        break
      }

      case 'filled':
      case 'outline': {
        expect(wrapper.find('.mp-field-decorator__line').wrapperElement.querySelector('legend')).toBeTruthy()
        break
      }

      default:
        break
    }

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})

test('input size', () => {
  ;['xs', 'sm', 'md', 'lg', 'xl'].forEach((size) => {
    const wrapper = mount(VarInput, {
      props: {
        modelValue: 'text',
        size,
      },
    })

    if (size === 'md') {
      expect(wrapper.find('.mp-field-decorator--size-md').exists()).toBeFalsy()
    } else {
      expect(wrapper.find(`.mp-field-decorator--size-${size}`).exists()).toBeTruthy()
    }
    wrapper.unmount()
  })
})

test('input type', () => {
  ;['text', 'password', 'number', 'tel', 'email'].forEach((type) => {
    const wrapper = mount(VarInput, {
      props: {
        modelValue: 'text',
        type,
      },
    })

    switch (type) {
      case 'number': {
        expect(wrapper.find('input').attributes('type')).toBe('text')
        expect(wrapper.find('input').attributes('inputmode')).toBe('decimal')
        break
      }

      case 'password': {
        expect(wrapper.find('input').attributes('type')).toBeUndefined()
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
      defaultValue: 'seed',
      inputAttrs: {
        'aria-label': 'Amount',
        'data-testid': 'amount',
        value: 'overridden by component value',
        maxlength: 1,
      },
    },
  })

  expect(wrapper.find('.mp-input__input').attributes()).toMatchObject({
    value: 'seed',
    'aria-label': 'Amount',
    'data-testid': 'amount',
  })
  expect(wrapper.find('.mp-field-decorator--outline').exists()).toBe(true)
  expect(wrapper.find('.mp-input__input').attributes('maxlength')).toBeUndefined()

  wrapper.unmount()
})

test('input format number', async () => {
  const onUpdateModelValue = vi.fn()
  const wrapper = mount(VarInput, {
    props: {
      modelValue: '',
      type: 'number',
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.find('.mp-input__input').setValue('10')
  expect(onUpdateModelValue).lastCalledWith('10')
  await wrapper.find('.mp-input__input').setValue('aa111')
  expect(onUpdateModelValue).lastCalledWith('111')
  await wrapper.find('.mp-input__input').setValue('1.')
  expect(onUpdateModelValue).lastCalledWith('1.')
  await wrapper.find('.mp-input__input').setValue('1.01')
  expect(onUpdateModelValue).lastCalledWith('1.01')

  wrapper.unmount()
})

describe('test input events', () => {
  async function expectFocusAndBlur(props = {}) {
    const onFocus = vi.fn()
    const onBlur = vi.fn()

    const wrapper = mount(VarInput, {
      props: {
        onFocus,
        onBlur,
        ...props,
      },
    })

    wrapper.vm.focus()
    await wrapper.find('.mp-input__input').trigger('focus')
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.blur()
    await wrapper.find('.mp-input__input').trigger('blur')
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  }

  async function expectInputAndChange(props = {}) {
    const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
    const onInput = vi.fn()
    const onChange = vi.fn()

    const wrapper = mount(VarInput, {
      props: {
        modelValue: '',
        onInput,
        onChange,
        'onUpdate:modelValue': onUpdateModelValue,
        ...props,
      },
    })

    await wrapper.find('.mp-input__input').trigger('focus')
    const input = wrapper.find('.mp-input__input')
    input.element.value = 't'
    await input.trigger('input')
    expect(onUpdateModelValue).lastCalledWith('t')
    expect(onInput).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledTimes(0)

    await wrapper.find('.mp-input__input').trigger('blur')
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
    const wrapper = mount(VarInput, {
      props: {
        modelValue: 'before',
        onChange,
        onPressEnter,
        'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value }),
      },
    })

    const input = wrapper.find('.mp-input__input')
    await input.trigger('focus')
    await input.setValue('after')
    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('blur')

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onPressEnter).toHaveBeenCalledTimes(1)
  })
})

test('input maxLength', () => {
  const wrapper = mount(VarInput, {
    props: {
      modelValue: 'text',
      maxLength: 100,
      showWordLimit: true,
    },
  })

  expect(wrapper.find('.mp-input__length').text()).toBe('4/100')
  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})

test('input maxLength errorOnly keeps the value and exposes error state', () => {
  const wrapper = mount(VarInput, {
    props: {
      modelValue: 'text',
      maxLength: { length: 3, errorOnly: true },
      showWordLimit: true,
    },
  })

  expect(wrapper.find('.mp-input__input').attributes('maxlength')).toBeUndefined()
  expect(wrapper.find('.mp-input__length').text()).toBe('4/3')
  expect(wrapper.find('.mp-input__input').classes()).toContain('mp-input--error')

  wrapper.unmount()
})

test('input hint to be false', () => {
  const wrapper = mount(VarInput, {
    props: {
      modelValue: 'text',
      hint: false,
    },
  })

  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})

test('input clear', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
  const onClear = vi.fn()

  const wrapper = mount(VarInput, {
    props: {
      modelValue: 'text',
      clearable: true,
      onClear,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.find('[role="button"]').trigger('click')
  expect(onUpdateModelValue).lastCalledWith('')
  expect(onClear).lastCalledWith(expect.any(Event))
  expect(wrapper.props('modelValue')).toBe('')

  wrapper.unmount()
})

test('input default clear icon supports keyboard activation', async () => {
  const wrapper = mount(VarInput, {
    props: {
      modelValue: 'value',
      clearable: true,
    },
  })

  const clear = wrapper.find('[role="button"]')
  await clear.trigger('keydown', { key: 'Enter' })

  expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  expect(wrapper.emitted('clear')).toHaveLength(1)

  wrapper.unmount()
})

const triggerEvents = async (wrapper) => {
  await wrapper.find('.mp-input__input').trigger('input')
  await wrapper.find('.mp-input__input').trigger('change')
  const clear = wrapper.find('[role="button"]')
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

  expect(onInput).toHaveBeenCalledTimes(1)
  expect(onClear).toHaveBeenCalledTimes(0)
  expect(onChange).toHaveBeenCalledTimes(0)
  expect(onUpdateModelValue).toHaveBeenCalledTimes(1)

  wrapper.unmount()
})

test('input trim', async () => {
  const onUpdateModelValue = vi.fn()

  const wrapper = mount(VarInput, {
    props: {
      modelValue: '123',
      modelModifiers: { trim: true },
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.find('.mp-input__input').setValue('123 ')
  await wrapper.find('.mp-input__input').trigger('blur')

  expect(onUpdateModelValue).lastCalledWith('123')
  wrapper.unmount()
})

test('input autofocus', async () => {
  const wrapper = mount(VarInput, {
    props: {
      autofocus: true,
    },
  })

  await wrapper.find('.mp-input__input').trigger('focus')
  expect(wrapper.find('.mp-field-decorator--focus').exists()).toBe(true)

  wrapper.unmount()
})

test('input focus on mousedown', async () => {
  const wrapper = mount(VarInput)

  await wrapper.trigger('mousedown')
  await wrapper.find('.mp-input__input').trigger('focus')
  expect(wrapper.find('.mp-field-decorator--focus').exists()).toBe(true)
  wrapper.unmount()
})

describe('test input component slots', () => {
  test('input suffix slot', () => {
    const wrapper = mount(VarInput, {
      slots: {
        suffix: () => 'suffix',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })

  test('input prefix slot', () => {
    const wrapper = mount(VarInput, {
      slots: {
        prefix: () => 'prefix',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })

  test('input clear-icon slot', async () => {
    const wrapper = mount(VarInput, {
      props: {
        clearable: true,
        modelValue: 'value',
      },
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
    props: {
      modelValue: 'text',
      ariaLabel: 'test aria-label',
    },
  })

  await delay(100)
  expect(wrapper.find('.mp-input__input').attributes('aria-label')).toBe('test aria-label')
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})
