import { createApp, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Textarea from '..'
import MpTextarea from '../Textarea.vue'

test('textarea leaves placeholder tokens inheritable and disabled wins over custom colors', async () => {
  const wrapper = mount(MpTextarea, { props: { placeholder: 'Hint', hint: false } })
  const input = wrapper.get('textarea')
  const localPlaceholder = () => input.element.style.getPropertyValue('--mp-textarea-placeholder-color')
  expect(localPlaceholder()).toBe('')
  await input.trigger('focus')
  expect(localPlaceholder()).toBe('')
  await wrapper.setProps({ focusColor: '#123456', textColor: '#654321' })
  expect(localPlaceholder()).toBe('#123456')
  await wrapper.setProps({ disabled: true, error: true })
  expect(localPlaceholder()).toBe('')
  expect(input.element.style.color).toBe('')
  expect(input.element.disabled).toBe(true)
  await wrapper.setProps({ disabled: false })
  expect(localPlaceholder()).toBe('')
  await wrapper.setProps({ error: false, blurColor: '#abcdef' })
  await input.trigger('blur')
  expect(localPlaceholder()).toBe('#abcdef')
  wrapper.unmount()
})

test('textarea plugin', () => {
  const app = createApp({}).use(Textarea)
  expect(app.component(Textarea.name)).toBeTruthy()
})

test('textarea renders the shared defaults', () => {
  const wrapper = mount(MpTextarea, { props: { modelValue: 'text', placeholder: '请输入' } })
  expect(wrapper.find('textarea').element.value).toBe('text')
  expect(wrapper.find('.mp-field-decorator--variant-outline').exists()).toBe(true)
  expect(wrapper.find('textarea').attributes('rows')).toBeUndefined()
  expect(wrapper.find('textarea').attributes('style')).toContain('resize: none')
  expect(wrapper.html()).toMatchSnapshot()
})

describe('textarea value and events', () => {
  test('supports controlled and uncontrolled values', async () => {
    const uncontrolled = mount(MpTextarea, { props: { defaultValue: 'draft' } })
    const textarea = uncontrolled.get('textarea')

    expect(textarea.element.value).toBe('draft')
    await textarea.setValue('edited')
    expect(textarea.element.value).toBe('edited')
    await uncontrolled.setProps({ defaultValue: 'replacement' })
    expect(textarea.element.value).toBe('edited')

    const controlled = mount(MpTextarea, { props: { modelValue: 'fixed' } })
    await controlled.get('textarea').setValue('attempt')
    await nextTick()
    expect(controlled.emitted('update:modelValue')?.[0]).toEqual(['attempt'])
    expect(controlled.get('textarea').element.value).toBe('fixed')
  })

  test('emits input before update and waits for composition end', async () => {
    const order = []
    const wrapper = mount(MpTextarea, {
      props: {
        'onUpdate:modelValue': () => order.push('update'),
        onInput: () => order.push('input'),
      },
    })
    const textarea = wrapper.get('textarea')

    textarea.element.value = '中'
    await textarea.trigger('compositionstart')
    await textarea.trigger('input')
    expect(order).toEqual([])

    await textarea.trigger('compositionend')
    await textarea.trigger('input')
    expect(order).toEqual(['input', 'update'])
  })

  test('commits once on blur and preserves Enter for newlines', async () => {
    const order = []
    const wrapper = mount(MpTextarea, {
      props: {
        defaultValue: 'before',
        onChange: () => order.push('change'),
        onBlur: () => order.push('blur'),
        onKeydown: () => order.push('keydown'),
      },
    })
    const textarea = wrapper.get('textarea')

    await textarea.trigger('focus')
    await textarea.setValue('before\nafter')
    await textarea.trigger('keydown', { key: 'Enter' })
    expect(order).toEqual(['keydown'])

    await textarea.trigger('blur')
    expect(order).toEqual(['keydown', 'change', 'blur'])
    await textarea.trigger('focus')
    await textarea.trigger('blur')
    expect(order).toEqual(['keydown', 'change', 'blur', 'blur'])
  })

  test('trims on blur before committing', async () => {
    const wrapper = mount(MpTextarea, {
      props: { defaultValue: ' draft ', modelModifiers: { trim: true } },
    })

    await wrapper.get('textarea').trigger('focus')
    await wrapper.get('textarea').trigger('blur')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['draft'])
    expect(wrapper.emitted('change')?.[0]?.[0]).toBe('draft')
  })

  test('clears through a native button and each semantic once and keeps focus', async () => {
    const wrapper = mount(MpTextarea, {
      attachTo: document.body,
      props: { defaultValue: 'hello', clearable: true },
    })
    const textarea = wrapper.get('textarea')
    await textarea.trigger('focus')

    await wrapper.get('button').trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('clear')?.[0]?.[0]).toBeInstanceOf(Event)
    expect(wrapper.emitted('input')).toHaveLength(1)
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(document.activeElement).toBe(textarea.element)

    await textarea.trigger('blur')
    expect(wrapper.emitted('change')).toHaveLength(1)
    wrapper.unmount()
  })
})

describe('textarea length and integration', () => {
  test('enforces normal limits and exposes error-only limits', async () => {
    const limited = mount(MpTextarea, {
      props: { maxLength: 3, showWordLimit: true },
    })
    await limited.get('textarea').setValue('four')
    expect(limited.emitted('update:modelValue')?.[0]).toEqual(['fou'])
    expect(limited.get('.mp-textarea__word-limit').text()).toBe('3/3')

    const errorOnly = mount(MpTextarea, {
      props: {
        defaultValue: 'four',
        maxLength: { length: 3, errorOnly: true },
        showWordLimit: true,
      },
    })
    expect(errorOnly.get('textarea').element.value).toBe('four')
    expect(errorOnly.get('textarea').attributes('aria-invalid')).toBe('true')
    expect(errorOnly.get('.mp-textarea__word-limit').text()).toBe('4/3')

    const controlled = mount(MpTextarea, {
      props: { modelValue: 'four', maxLength: 3 },
    })
    expect(controlled.get('textarea').element.value).toBe('four')
    expect(controlled.emitted('update:modelValue')).toBeUndefined()
  })

  test('supports custom length, slots, and native attribute precedence', async () => {
    const nativeInput = vi.fn()
    const wrapper = mount(MpTextarea, {
      props: {
        defaultValue: 'abcd',
        rows: 2,
        maxLength: 2,
        showWordLimit: true,
        wordLength: (value) => value.length / 2,
        wordSlice: (value, length) => value.slice(0, length * 2),
        textareaAttrs: {
          value: 'wrong',
          disabled: true,
          rows: 8,
          onInput: nativeInput,
          'aria-describedby': 'help',
        },
      },
      slots: {
        prefix: '<span class="prefix">P</span>',
        suffix: '<span class="suffix">S</span>',
      },
    })
    const textarea = wrapper.get('textarea')

    expect(textarea.element.value).toBe('abcd')
    expect(textarea.attributes('rows')).toBe('2')
    expect(textarea.attributes('disabled')).toBeUndefined()
    expect(textarea.attributes('aria-describedby')).toBe('help')
    expect(wrapper.find('.prefix').exists()).toBe(true)
    expect(wrapper.find('.suffix').exists()).toBe(true)
    expect(wrapper.get('.mp-textarea__word-limit').text()).toBe('2/2')

    await textarea.setValue('abcdef')
    expect(nativeInput).not.toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['abcd'])
  })

  test('autoSize overrides manual resize and exposes focus and blur', async () => {
    const wrapper = mount(MpTextarea, {
      props: { autoSize: { minRows: 2, maxRows: 5 }, rows: 3, resize: true },
    })
    await nextTick()

    expect(wrapper.get('textarea').attributes('rows')).toBe('3')
    expect(wrapper.get('textarea').attributes('style')).toContain('resize: none')
    expect(wrapper.vm.focus).toBeTypeOf('function')
    expect(wrapper.vm.blur).toBeTypeOf('function')
  })
})
