import { createSSRApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Radio, { RadioGroup } from '../index'

describe('native radio body', () => {
  it('does not cancel accepted native activation and emits each notification once', async () => {
    const wrapper = mount(Radio, { attachTo: document.body, slots: { default: () => 'Label' } })
    const input = wrapper.get('input')
    let canceled
    input.element.addEventListener('click', (event) => {
      nextTick(() => {
        canceled = event.defaultPrevented
      })
    })
    wrapper.element.click()
    await nextTick()
    expect(canceled).toBe(false)
    expect(input.element.checked).toBe(true)
    expect(input.attributes('aria-checked')).toBe('true')
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('click')).toHaveLength(1)
    wrapper.unmount()
  })
  it('restores every same-name member after a rejected group selection', async () => {
    const wrapper = mount(RadioGroup, {
      attachTo: document.body,
      props: { name: 'rejected-group', modelValue: 'a', options: ['a', 'b'] },
    })
    const inputs = wrapper.findAll('input')
    inputs[1].element.click()
    await nextTick()
    expect(inputs.map((input) => input.element.checked)).toEqual([true, false])
    expect(inputs.map((input) => input.attributes('aria-checked'))).toEqual(['true', 'false'])
    expect(wrapper.emitted('update:modelValue')).toEqual([['b']])
    expect(wrapper.emitted('change')).toHaveLength(1)
    wrapper.unmount()
  })
  it('puts state and attributes on the native input without allowing attrs to replace state', async () => {
    const wrapper = mount(Radio, {
      props: {
        defaultValue: true,
        readonly: true,
        error: true,
        name: 'channel',
        ariaLabel: 'Channel',
        inputAttrs: { id: 'my-radio', type: 'checkbox', checked: false, tabindex: 7, 'aria-describedby': 'help' },
      },
    })
    const input = wrapper.get('input')
    expect(input.attributes('type')).toBe('radio')
    expect(input.element.checked).toBe(true)
    expect(input.attributes('tabindex')).toBe('0')
    expect(input.attributes('id')).toBe('my-radio')
    expect(input.attributes('name')).toBe('channel')
    expect(input.attributes('aria-label')).toBe('Channel')
    expect(input.attributes('aria-describedby')).toBe('help')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-readonly')).toBe('true')
    await input.trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })
  it('inherits group name and native disabled state', () => {
    const wrapper = mount(RadioGroup, { props: { name: 'period', disabled: true, options: ['day', 'week'] } })
    const inputs = wrapper.findAll('input')
    expect(inputs).toHaveLength(2)
    for (const input of inputs) {
      expect(input.attributes('name')).toBe('period')
      expect(input.element.disabled).toBe(true)
    }
    wrapper.unmount()
  })
  it('restores native state when the controlled parent rejects the proposal', async () => {
    const wrapper = mount(Radio, { props: { modelValue: false, value: true } })
    await wrapper.get('input').trigger('click')
    await nextTick()
    expect(wrapper.get('input').element.checked).toBe(false)
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    expect(wrapper.emitted('click')).toHaveLength(1)
    wrapper.unmount()
  })
  it('supports both icon slots, scoped labels and per-instance geometry', async () => {
    const wrapper = mount(Radio, {
      props: { iconSize: 30, checkedColor: 'purple', uncheckedColor: 'gray' },
      slots: {
        'checked-icon': '<b>checked</b>',
        'unchecked-icon': '<b>empty</b>',
        default: ({ checked }) => h('span', String(checked)),
      },
    })
    expect(wrapper.text()).toContain('empty')
    expect(wrapper.attributes('style')).toContain('30px')
    await wrapper.get('input').trigger('click')
    expect(wrapper.text()).toContain('checked')
    expect(wrapper.text()).toContain('true')
    wrapper.unmount()
  })
  it('supports component and group custom radio content', () => {
    const wrapper = mount(RadioGroup, {
      props: { options: ['a'], defaultValue: 'a' },
      slots: { radio: ({ checked }) => h('strong', 'custom:' + checked) },
    })
    expect(wrapper.get('strong').text()).toBe('custom:true')
    expect(wrapper.find('input[type="radio"]').exists()).toBe(true)
    wrapper.unmount()
  })
  it('renders native group semantics on the server', async () => {
    const html = await renderToString(
      createSSRApp({
        render: () =>
          h(RadioGroup, {
            name: 'ssr',
            defaultValue: 'b',
            options: ['a', 'b'],
            ariaLabel: 'SSR group',
          }),
      }),
    )
    expect(html).toContain('role="radiogroup"')
    expect(html.match(/type="radio"/g)).toHaveLength(2)
    expect(html.match(/tabindex="0"/g)).toHaveLength(1)
    expect(html).toContain('aria-label="SSR group"')
  })
})
