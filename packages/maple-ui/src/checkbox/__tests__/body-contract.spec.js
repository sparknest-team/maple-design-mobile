import { createSSRApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount as baseMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Checkbox, { CheckboxGroup } from '../index'

const mount = (component, options = {}) => baseMount(component, { attachTo: document.body, ...options })

describe('Checkbox native body contract', () => {
  it('has one native control and preserves mixed state after a rejected controlled change', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false, indeterminate: true, ariaLabel: 'Approval', name: 'approval' },
    })
    const input = wrapper.find('input[type="checkbox"]')
    expect(wrapper.element.tagName).toBe('LABEL')
    expect(input.attributes('aria-label')).toBe('Approval')
    expect(input.attributes('aria-checked')).toBe('mixed')
    expect(input.element.indeterminate).toBe(true)
    input.element.click()
    await nextTick()
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(input.element.checked).toBe(false)
    expect(input.element.indeterminate).toBe(true)
    wrapper.unmount()
  })
  it('a label click activates once and readonly/disabled prevent native state changes', async () => {
    const wrapper = mount(Checkbox, { slots: { default: () => 'Label' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('click')).toHaveLength(1)
    await wrapper.setProps({ readonly: true })
    await wrapper.trigger('click')
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('click')).toHaveLength(2)
    expect(wrapper.find('input').attributes('aria-readonly')).toBe('true')
    await wrapper.setProps({ disabled: true })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(2)
    expect(wrapper.find('input').element.disabled).toBe(true)
    wrapper.unmount()
  })
  it('all three icon slots and the complete-control slot keep the native control', async () => {
    const wrapper = mount(Checkbox, {
      props: { defaultValue: false },
      slots: {
        'checked-icon': () => h('i', { 'data-icon': 'checked' }),
        'unchecked-icon': () => h('i', { 'data-icon': 'unchecked' }),
        'indeterminate-icon': () => h('i', { 'data-icon': 'mixed' }),
      },
    })
    expect(wrapper.find('[data-icon="unchecked"]').exists()).toBe(true)
    wrapper.vm.toggle()
    await nextTick()
    expect(wrapper.find('[data-icon="checked"]').exists()).toBe(true)
    await wrapper.setProps({ indeterminate: true })
    expect(wrapper.find('[data-icon="mixed"]').exists()).toBe(true)
    expect(wrapper.findAll('input')).toHaveLength(1)
    wrapper.unmount()
    const group = mount(CheckboxGroup, {
      props: { options: ['a'], defaultValue: ['a'] },
      slots: { checkbox: ({ checked, disabled }) => h('b', `${checked}/${disabled}`) },
    })
    expect(group.find('b').text()).toBe('true/false')
    expect(group.findAll('input')).toHaveLength(1)
    group.unmount()
  })
  it('group native names and max state update without hiding checked controls', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: { name: 'features', ariaLabel: 'Features', max: 1, options: ['a', 'b'] },
    })
    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.attributes('aria-label')).toBe('Features')
    const inputs = wrapper.findAll('input')
    expect(inputs.map((i) => i.attributes('name'))).toEqual(['features', 'features'])
    await inputs[0].setValue(true)
    expect(inputs[0].element.disabled).toBe(false)
    expect(inputs[1].element.disabled).toBe(true)
    await inputs[0].setValue(false)
    expect(inputs[1].element.disabled).toBe(false)
    wrapper.unmount()
  })
  it('a detached child does not inherit or modify its surrounding group', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: { disabled: true },
      slots: { default: () => h(Checkbox, { uninjectGroupContext: true, value: 'independent' }) },
    })
    const input = wrapper.find('input')
    expect(input.element.disabled).toBe(false)
    await input.setValue(true)
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.findComponent(Checkbox).emitted('change')[0][0]).toBe(true)
    wrapper.unmount()
  })
  it('renders native accessible controls during SSR without a browser', async () => {
    const html = await renderToString(
      createSSRApp({
        render: () => h(CheckboxGroup, { ariaLabel: 'SSR', name: 'ssr', defaultValue: [false], options: [false, 0] }),
      }),
    )
    expect(html).toContain('role="group"')
    expect(html).toContain('aria-label="SSR"')
    expect(html.match(/type="checkbox"/g)).toHaveLength(2)
    expect(html.match(/ checked(?: |>)/g)).toHaveLength(1)
  })

  it('does not activate when an embedded link or button is clicked', async () => {
    const wrapper = mount(Checkbox, {
      slots: { default: () => [h('a', { href: '#help' }, 'Help'), h('button', { type: 'button' }, 'Action')] },
    })
    await wrapper.find('a').trigger('click')
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('click')).toBeUndefined()
    wrapper.unmount()
  })
  it('readonly native clicks restore checked state while keeping focus available', async () => {
    const wrapper = mount(Checkbox, { props: { readonly: true } })
    wrapper.vm.focus()
    const input = wrapper.find('input')
    expect(document.activeElement).toBe(input.element)
    input.element.click()
    await nextTick()
    expect(input.element.checked).toBe(false)
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })
  it('applies number/string icon sizes and preserves full-slot text for accessible naming', async () => {
    const wrapper = mount(Checkbox, {
      props: { iconSize: 28, checkedColor: '#137547', uncheckedColor: '#656565' },
      slots: { checkbox: () => h('span', 'Visible custom label') },
    })
    expect(wrapper.attributes('style')).toContain('28px')
    expect(wrapper.attributes('style')).toContain('#137547')
    expect(wrapper.find('input + span').attributes('aria-hidden')).toBeUndefined()
    await wrapper.setProps({ iconSize: '1.5rem' })
    expect(wrapper.attributes('style')).toContain('1.5rem')
    wrapper.unmount()
  })
})
