import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { isolateEditorForm } from '../../_components/field-presentation/form-bridge'
import DateRange from '../../date-range'
import TimeRange from '../../time-range'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

describe.each([
  ['DateRange', DateRange],
  ['TimeRange', TimeRange],
])('%s form label group', (_name, Component) => {
  it('associates the group with the form label while preserving endpoint names', async () => {
    const wrapper = mount(Form, {
      props: { model: { period: [] }, editMode: 'direct' },
      slots: {
        default: () =>
          h(FormItem, { field: 'period', label: 'Period', labelAttrs: { id: 'period-label', for: 'start' } }, () =>
            h(Component as any, {
              inputAttrs: [
                { id: 'start', 'aria-label': 'Start' },
                { id: 'end', 'aria-label': 'End' },
              ],
            }),
          ),
      },
    })
    try {
      const label = wrapper.get('#period-label')
      const group = wrapper.get('[role="group"]')
      expect(group.attributes('aria-labelledby')).toBe(label.attributes('id'))
      expect(group.findAll('input').map((input) => input.attributes('aria-label'))).toEqual(['Start', 'End'])
      expect(label.attributes('for')).toBe('start')
    } finally {
      wrapper.unmount()
    }
  })
})

it('uses a stable generated label and updates when the label or visibility changes', async () => {
  const wrapper = mount(FormItem, {
    props: { label: 'Period' },
    slots: { default: () => h(DateRange, { editMode: 'direct' }) },
  })
  try {
    const label = wrapper.get('label')
    const id = label.attributes('id')
    expect(id).toBeTruthy()
    expect(wrapper.get('[role="group"]').attributes('aria-labelledby')).toBe(id)
    await wrapper.setProps({ label: 'Travel period' })
    expect(wrapper.get('label').attributes('id')).toBe(id)
    expect(wrapper.get('[role="group"]').attributes('aria-labelledby')).toBe(id)
    await wrapper.setProps({ hideLabel: true })
    expect(wrapper.find('[role="group"]').exists()).toBe(false)
    await wrapper.setProps({ hideLabel: false })
    expect(wrapper.get('label').attributes('id')).toBe(id)
    expect(wrapper.get('[role="group"]').attributes('aria-labelledby')).toBe(id)
  } finally {
    wrapper.unmount()
  }
})

it('inherits through an unstyled item but not through an independently styled item', () => {
  const child = (noStyle: boolean) => h(FormItem, { noStyle }, () => h(DateRange, { editMode: 'direct' }))
  const wrapper = mount(FormItem, { props: { label: 'Outer' }, slots: { default: () => [child(true), child(false)] } })
  try {
    const id = wrapper.get('label').attributes('id')
    const ranges = wrapper.findAllComponents(DateRange)
    expect(ranges[0].get('[role="group"]').attributes('aria-labelledby')).toBe(id)
    expect(ranges[1].find('[role="group"]').exists()).toBe(false)
  } finally {
    wrapper.unmount()
  }
})

it('does not apply a label explicitly targeting an unrelated control to the range', async () => {
  const wrapper = mount(FormItem, {
    props: { label: 'Account', labelAttrs: { for: 'account' } },
    slots: {
      default: () => [
        h('input', { id: 'account' }),
        h(DateRange, { editMode: 'direct', inputAttrs: [{ id: 'start' }, { id: 'end' }] }),
      ],
    },
  })
  try {
    expect(wrapper.get('label').attributes('for')).toBe('account')
    expect(wrapper.findComponent(DateRange).find('[role="group"]').exists()).toBe(false)
    await wrapper.setProps({ labelAttrs: { for: 'start' } })
    expect(wrapper.findComponent(DateRange).get('[role="group"]').attributes('aria-labelledby')).toBe(
      wrapper.get('label').attributes('id'),
    )
  } finally {
    wrapper.unmount()
  }
})

it('does not leak the outer label into an isolated editor', () => {
  const Editor = defineComponent({
    setup() {
      isolateEditorForm()
      return () => h(DateRange, { editMode: 'direct' })
    },
  })
  const wrapper = mount(FormItem, { props: { label: 'Outer' }, slots: { default: () => h(Editor) } })
  try {
    expect(wrapper.findComponent(DateRange).find('[role="group"]').exists()).toBe(false)
  } finally {
    wrapper.unmount()
  }
})
