import { h, nextTick, reactive } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Input from '../../input'
import Tooltip from '../../tooltip'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'
import FormItemLabel from '../FormItemLabel.vue'
import { resolveFormItemStatus } from '../item-decoration'

describe('FormItem decoration and presentation contract', () => {
  it('renders custom label elements/attributes, colon, required marker and accessible tooltip', () => {
    const wrapper = mount(FormItem, {
      props: {
        editMode: 'direct',
        label: 'Name',
        required: true,
        asteriskPosition: 'end',
        showColon: true,
        labelComponent: 'label',
        labelAttrs: { for: 'name-input', 'data-label': 'name' },
        tooltip: 'Public name',
      },
      slots: { default: () => h('input', { id: 'name-input' }) },
    })
    const label = wrapper.get('label')
    expect(label.attributes('for')).toBe('name-input')
    expect(label.attributes('data-label')).toBe('name')
    expect(label.text()).toContain('Name')
    expect(label.text().trim().endsWith(':')).toBe(true)
    expect(label.find('strong').exists()).toBe(true)
    expect(label.get('button').attributes('type')).toBe('button')
    expect(label.get('button').attributes('aria-label')).toBe('Public name')
    expect(wrapper.findComponent(Tooltip).props('content')).toBe('Public name')
    wrapper.unmount()
  })

  it('supports label slots, custom tags, content classes and reactive flex opt-out', async () => {
    const wrapper = mount(FormItem, {
      props: {
        editMode: 'direct',
        labelComponent: 'div',
        contentClass: ['custom-content', { highlighted: true }],
        contentFlex: false,
      },
      slots: { label: () => h('span', 'Custom label'), default: () => h('input') },
    })
    expect(wrapper.findComponent(FormItemLabel).element.tagName).toBe('DIV')
    expect(wrapper.get('.custom-content').classes()).toContain('highlighted')
    expect(
      wrapper
        .get('.custom-content')
        .classes()
        .some((name) => name.endsWith('-flex')),
    ).toBe(false)
    await wrapper.setProps({ contentFlex: true })
    expect(
      wrapper
        .get('.custom-content')
        .classes()
        .some((name) => name.endsWith('-flex')),
    ).toBe(true)
    await wrapper.setProps({ hideLabel: true })
    expect(wrapper.findComponent(FormItemLabel).exists()).toBe(false)
    wrapper.unmount()
  })

  it('shows required markers from the required prop and respects hideAsterisk', async () => {
    const wrapper = mount(FormItem, { props: { editMode: 'direct', label: 'Name', required: true } })
    expect(wrapper.find('strong').exists()).toBe(true)
    await wrapper.setProps({ hideAsterisk: true })
    expect(wrapper.find('strong').exists()).toBe(false)
    wrapper.unmount()
  })

  it('explicit statuses override error presentation without discarding validation errors', async () => {
    const item = reactive<{ validateStatus?: 'success' | 'warning' | 'error' | 'validating' }>({})
    const wrapper = mount(Form, {
      props: { editMode: 'direct', model: { name: '' } },
      slots: {
        default: () =>
          h(FormItem, { editMode: 'direct', field: 'name', label: 'Name', help: 'Help', feedback: true, ...item }, () =>
            h(Input, { editMode: 'direct' }),
          ),
      },
    })
    const form = wrapper.vm as unknown as {
      setFields: (fields: Record<string, unknown>) => void
      clearValidate: () => void
    }
    form.setFields({ name: { status: 'error', message: 'Server error' } })
    await nextTick()
    expect(wrapper.text()).toContain('Server error')
    expect(wrapper.find('[aria-invalid="true"]').exists()).toBe(true)
    for (const status of ['success', 'warning', 'validating'] as const) {
      item.validateStatus = status
      await nextTick()
      expect(wrapper.text()).not.toContain('Server error')
      expect(wrapper.find('[aria-invalid="true"]').exists()).toBe(false)
      expect(wrapper.text()).toContain('Help')
    }
    item.validateStatus = undefined
    await nextTick()
    expect(wrapper.text()).toContain('Server error')
    form.setFields({ name: { status: '', message: 'Hidden message' } })
    await nextTick()
    expect(wrapper.text()).not.toContain('Hidden message')
    expect(wrapper.find('[aria-invalid="true"]').exists()).toBe(false)
    form.setFields({ name: { status: '', message: '' } })
    await nextTick()
    expect(wrapper.text()).not.toContain('Server error')
    form.setFields({ name: { message: 'Message-only error' } })
    await nextTick()
    expect(wrapper.text()).toContain('Message-only error')
    form.clearValidate()
    await flushPromises()
    expect(wrapper.text()).not.toContain('Message-only error')
    wrapper.unmount()
  })

  it('keeps real validation errors when explicit success hides them', async () => {
    const wrapper = mount(Form, {
      props: { editMode: 'direct', model: { name: '' } },
      slots: {
        default: () =>
          h(
            FormItem,
            { editMode: 'direct', field: 'name', label: 'Name', required: true, validateStatus: 'success' },
            () => h('input'),
          ),
      },
    })
    const form = wrapper.vm as unknown as {
      validateField: (field: string) => Promise<Record<string, unknown> | undefined>
    }
    const errors = await form.validateField('name')
    await flushPromises()
    expect(errors?.name).toBeTruthy()
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    const label = wrapper.findComponent(FormItemLabel)
    expect(label.props('required')).toBe(true)
    wrapper.unmount()
  })

  it('resolves every explicit status ahead of automatic status', () => {
    for (const status of ['success', 'warning', 'error', 'validating'] as const) {
      expect(resolveFormItemStatus(status, 'error')).toBe(status)
    }
    expect(resolveFormItemStatus(undefined, 'success')).toBe('success')
    expect(resolveFormItemStatus(undefined, undefined)).toBeUndefined()
  })
})
