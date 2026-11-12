import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { InputTag, inputTagProps } from '../index'

describe('InputTag', () => {
  test.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'delegates %s and state classes to FieldDecorator',
    async (size) => {
      const wrapper = mount(InputTag, { props: { size, defaultValue: ['one'] } })
      expect(wrapper.classes()).toContain('mp-field-decorator--size-' + size)
      await wrapper.get('input').trigger('focus')
      expect(wrapper.classes()).toContain('mp-field-decorator--focus')
      await wrapper.setProps({ disabled: true })
      expect(wrapper.classes()).toContain('mp-field-decorator--disabled')
      wrapper.unmount()
    },
  )

  test.each(['disabled', 'readonly'])('item props cannot bypass %s', async (state) => {
    const wrapper = mount(InputTag, {
      props: {
        [state]: true,
        defaultValue: [
          { value: 'one', closable: true, tagProps: { closable: true, checkable: true, color: '#123456' } },
        ],
      },
    })
    expect(wrapper.find('.mp-tag__close-btn').exists()).toBe(false)
    expect(wrapper.find('[role="checkbox"]').exists()).toBe(false)
    await wrapper.get('input').trigger('keydown', { key: 'Backspace' })
    expect(wrapper.emitted('remove')).toBeUndefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  test.each([{ closable: false }, { loading: true }])('Backspace respects item restrictions %j', async (tagProps) => {
    const wrapper = mount(InputTag, { props: { defaultValue: [{ value: 'one', closable: true, tagProps }] } })
    await wrapper.get('input').trigger('keydown', { key: 'Backspace' })
    expect(wrapper.emitted('remove')).toBeUndefined()
    wrapper.unmount()
  })
  test('exposes the public contract and an editable input', () => {
    const wrapper = mount(InputTag, { props: { placeholder: 'Add tag' } })
    expect(InputTag.name).toBe('MpInputTag')
    expect(inputTagProps.maxTagCount.validator(0)).toBe(true)
    expect(wrapper.get('input').attributes('placeholder')).toBe('Add tag')
    wrapper.unmount()
  })

  test('uses the real Tag close button and removes its value', async () => {
    const wrapper = mount(InputTag, { props: { defaultValue: ['one', 'two'] } })
    expect(wrapper.find('.mp-icon-hover').exists()).toBe(false)
    const close = wrapper.findAll('.mp-tag__close-btn')[0]
    expect(close.attributes('role')).toBe('button')
    expect(close.attributes('tabindex')).toBe('0')
    await close.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['two'])
    expect(wrapper.findAll('.mp-input-tag__tag')).toHaveLength(1)
    wrapper.unmount()
  })

  test.each(['disabled', 'readonly'])('does not render default close controls when %s', (state) => {
    const wrapper = mount(InputTag, { props: { defaultValue: ['one'], [state]: true } })
    expect(wrapper.find('.mp-tag__close-btn').exists()).toBe(false)
    wrapper.unmount()
  })

  test.each(['default', 'outline'] as const)('preserves custom Tag colors for %s', (variant) => {
    const wrapper = mount(InputTag, {
      props: {
        defaultValue: [{ value: 'one', label: 'One', tagProps: { color: '#123456', textColor: '#ffffff', variant } }],
      },
    })
    const tag = wrapper.get('.mp-input-tag__tag')
    expect(tag.classes()).toContain('mp-tag--custom-color')
    expect((tag.element as HTMLElement).style.color).toBe('rgb(255, 255, 255)')
    expect((tag.element as HTMLElement).style.borderColor).toBe('rgb(18, 52, 86)')
    expect(wrapper.find('.mp-icon-hover').exists()).toBe(false)
    wrapper.unmount()
  })
})
