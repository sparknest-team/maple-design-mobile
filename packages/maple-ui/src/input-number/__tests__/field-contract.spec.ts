import { h, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { Decimal } from 'decimal.js'
import { afterEach, describe, expect, test, vi } from 'vitest'
import InputNumber, { type InputNumberInstance } from '..'
import InputGroup from '../../input/InputGroup.vue'
import { roundNumber, stepNumber } from '../number-arithmetic'
import { formHost } from './form-host'

const wrappers: Array<ReturnType<typeof mount>> = []
const render = (component: any = InputNumber, options: any = {}) => {
  const wrapper = mount(component, { ...options, props: { editMode: 'direct', ...options.props } })
  wrappers.push(wrapper)
  return wrapper
}
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  vi.useRealTimers()
})
describe('InputNumber field contract', () => {
  test('rejects a controlled proposal and does not accumulate it', async () => {
    const wrapper = render(InputNumber, { props: { modelValue: 1 } })
    const input = wrapper.get('input')
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]])
    expect(input.element.value).toBe('1')
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.emitted('update:modelValue')).toEqual([[2], [2]])
    expect(input.element.value).toBe('1')
  })

  test('accepts controlled input echoes without losing commit changes', async () => {
    const value = ref<number | null | undefined>(1)
    const change = vi.fn()
    const wrapper = render({
      render: () =>
        h(InputNumber, {
          editMode: 'direct',
          modelValue: value.value,
          modelEvent: 'input',
          clearable: true,
          'onUpdate:modelValue': (next: number | null | undefined) => {
            value.value = next
          },
          onChange: change,
        }),
    })
    const input = wrapper.get('input')
    await input.trigger('focus')
    await input.setValue('2')
    await input.setValue('23')
    expect(value.value).toBe(23)
    expect(change).not.toHaveBeenCalled()
    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('blur')
    expect(change).toHaveBeenCalledTimes(1)
    expect(change.mock.calls[0][0]).toBe(23)
    await wrapper.get('[aria-label="清空"]').trigger('click')
    expect(value.value).toBeUndefined()
    await input.trigger('blur')
    expect(input.element.value).toBe('')
  })

  test('external updates are silent and replace a dirty draft', async () => {
    const wrapper = render(InputNumber, { props: { modelValue: 1 } })
    await wrapper.get('input').setValue('12')
    await wrapper.setProps({ modelValue: 6 })
    await wrapper.get('input').trigger('blur')
    expect(wrapper.get('input').element.value).toBe('6')
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  test('clear follows the same semantic event order and blur does not repeat', async () => {
    const order: string[] = []
    const wrapper = render(InputNumber, {
      props: {
        defaultValue: 3,
        clearable: true,
        onInput: () => order.push('input'),
        'onUpdate:modelValue': () => order.push('update'),
        onChange: () => order.push('change'),
        onClear: () => order.push('clear'),
      },
    })
    await wrapper.get('[aria-label="清空"]').trigger('click')
    await wrapper.get('input').trigger('blur')
    expect(order).toEqual(['input', 'update', 'change', 'clear'])
  })

  test('commits a trailing dot but restores lone signs and invalid text', async () => {
    const wrapper = render(InputNumber, { props: { defaultValue: 3 } })
    const input = wrapper.get('input')
    await input.setValue('12.')
    await input.trigger('blur')
    expect(input.element.value).toBe('12')
    await input.setValue('-')
    await input.trigger('blur')
    expect(input.element.value).toBe('12')
    await input.setValue('abc')
    expect(input.element.value).toBe('12')
    expect(wrapper.emitted('change')).toHaveLength(1)
  })

  test('IME only publishes once on composition completion', async () => {
    const wrapper = render(InputNumber, { props: { modelEvent: 'input' } })
    const input = wrapper.get('input')
    await input.trigger('compositionstart')
    input.element.value = '12'
    await input.trigger('input', { isComposing: true })
    await input.trigger('keydown', { key: 'Enter', isComposing: true })
    expect(wrapper.emitted('input')).toBeUndefined()
    await input.trigger('compositionend')
    await input.trigger('input')
    expect(wrapper.emitted('input')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')).toEqual([[12]])
    await input.trigger('blur')
    expect(wrapper.emitted('change')).toHaveLength(1)
  })

  test('inherits form state and allows explicit false/size overrides', async () => {
    const state = reactive({ disabled: true, readonly: true, error: true, size: 'xl' })
    const override = ref(false)
    const wrapper = render(
      formHost(state, {}, () =>
        h(InputNumber, {
          editMode: 'direct',
          defaultValue: 1,
          ...(override.value ? { disabled: false, readonly: false, error: false, size: 'xs' } : {}),
        }),
      ),
    )
    expect(wrapper.get('input').attributes('disabled')).toBeDefined()
    expect(wrapper.get('input').attributes('readonly')).toBeDefined()
    expect(wrapper.get('input').attributes('aria-invalid')).toBe('true')
    expect(wrapper.find('[class*="field-decorator--size-xl"]').exists()).toBe(true)
    override.value = true
    await nextTick()
    expect(wrapper.get('input').attributes('disabled')).toBeUndefined()
    expect(wrapper.get('input').attributes('readonly')).toBeUndefined()
    expect(wrapper.get('input').attributes('aria-invalid')).toBeUndefined()
    await wrapper.get('input').trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.findComponent(InputNumber).emitted('update:modelValue')).toEqual([[2]])
  })

  test('only the numeric field notifies FormItem, once per semantic event', async () => {
    const handlers = { onInput: vi.fn(), onChange: vi.fn(), onClear: vi.fn(), onFocus: vi.fn(), onBlur: vi.fn() }
    const state = reactive({ disabled: false, readonly: false, error: false, size: 'md' })
    const wrapper = render(
      formHost(state, handlers, () => h(InputNumber, { editMode: 'direct', defaultValue: 1, clearable: true })),
    )
    const input = wrapper.get('input')
    await input.trigger('focus')
    await input.setValue('2')
    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('blur')
    expect(handlers.onInput).toHaveBeenCalledTimes(1)
    expect(handlers.onChange).toHaveBeenCalledTimes(1)
    expect(handlers.onFocus).toHaveBeenCalledTimes(1)
    expect(handlers.onBlur).toHaveBeenCalledTimes(1)
    await wrapper.get('[aria-label="清空"]').trigger('click')
    expect(handlers.onInput).toHaveBeenCalledTimes(2)
    expect(handlers.onChange).toHaveBeenCalledTimes(2)
    expect(handlers.onClear).toHaveBeenCalledTimes(1)
  })

  test('InputGroup supplies variant, hint and size', () => {
    const wrapper = render({
      render: () =>
        h(
          InputGroup,
          { editMode: 'direct', variant: 'filled', hint: true, size: 'lg' },
          {
            default: () => h(InputNumber, { editMode: 'direct', placeholder: 'Amount' }),
          },
        ),
    })
    expect(wrapper.find('[class*="field-decorator--variant-filled"]').exists()).toBe(true)
    expect(wrapper.find('[class*="field-decorator--size-lg"]').exists()).toBe(true)
    expect(wrapper.get('label').text()).toBe('Amount')
  })

  test.each(['xs', 'sm', 'md', 'lg', 'xl'])(
    'renders size %s with native attributes and public focus/select',
    async (size) => {
      const wrapper = render(InputNumber, {
        props: { size, defaultValue: 2, inputAttrs: { id: 'amount', name: 'price', inputmode: 'numeric' } },
        attrs: { 'aria-label': 'Price', class: 'custom-field' },
        attachTo: document.body,
      })
      const input = wrapper.get('input')
      expect(input.attributes()).toMatchObject({
        id: 'amount',
        name: 'price',
        inputmode: 'numeric',
        'aria-label': 'Price',
        role: 'spinbutton',
      })
      expect(wrapper.classes()).toContain('custom-field')
      expect(wrapper.find('[class*="field-decorator--size-' + size + '"]').exists()).toBe(true)
      const instance = wrapper.vm as InputNumberInstance
      instance.focus()
      expect(document.activeElement).toBe(input.element)
      instance.select()
      expect(input.element.selectionStart).toBe(0)
      instance.blur()
      expect(document.activeElement).not.toBe(input.element)
    },
  )

  test('readonly blocks all mutations and hides step buttons', async () => {
    const wrapper = render(InputNumber, { props: { defaultValue: 2, readonly: true, clearable: true } })
    const input = wrapper.get('input')
    await input.setValue('9')
    await input.trigger('keydown', { key: 'ArrowUp' })
    await input.trigger('blur')
    expect(input.element.value).toBe('2')
    expect(wrapper.find('button').exists()).toBe(false)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  test('pointer cancel ends touch repeat; auxiliary pointers cannot start it', async () => {
    vi.useFakeTimers()
    const wrapper = render(InputNumber, { props: { defaultValue: 0 } })
    const button = wrapper.get('button')
    await button.trigger('pointerdown', { button: 2 })
    expect(wrapper.emitted('change')).toBeUndefined()
    await button.trigger('pointerdown', { button: 0, isPrimary: true, pointerType: 'touch' })
    await button.trigger('pointercancel')
    vi.advanceTimersByTime(2000)
    expect(wrapper.emitted('update:modelValue')).toEqual([[1]])
  })

  test('arithmetic is isolated from application Decimal configuration', () => {
    const precision = Decimal.precision
    const rounding = Decimal.rounding
    try {
      Decimal.set({ precision: 2, rounding: Decimal.ROUND_DOWN })
      expect(stepNumber(0.1, 0.2, 'plus')).toBe(0.3)
      expect(roundNumber(-1.25, 1)).toBe(-1.3)
      expect(stepNumber(1e20, 1e5, 'plus')).toBe(100000000000000100000)
    } finally {
      Decimal.set({ precision, rounding })
    }
  })
})
