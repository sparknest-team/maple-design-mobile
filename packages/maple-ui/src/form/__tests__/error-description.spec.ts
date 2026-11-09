import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import DateField from '../../date'
import FormDetails from '../../form-details'
import Input from '../../input'
import InputNumber from '../../input-number'
import Select from '../../select'
import Textarea from '../../textarea'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test('a visible form error describes the actual input and preserves explicit descriptions', async () => {
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { name: '' } },
    slots: {
      default: () =>
        h(FormItem, { field: 'name', label: 'Name', extra: 'Guidance' }, () =>
          h(Input, { 'aria-describedby': 'external' }),
        ),
    },
  })
  try {
    const input = () => wrapper.get('input')
    expect(input().attributes('aria-describedby')).toBe('external')
    ;(wrapper.vm as any).setFields({ name: { message: 'Server error' } })
    await nextTick()
    expect(wrapper.get('[role="alert"]').text()).toBe('Server error')
    const errorId = wrapper.get('.mp-form-details__error-message').attributes('id')
    expect(errorId).toBeTruthy()
    expect(input().attributes('aria-describedby')?.split(/\s+/)).toEqual(['external', errorId])
    expect(wrapper.find('.mp-form-details__extra-message').attributes('id')).not.toBe(errorId)
    ;(wrapper.vm as any).clearValidate()
    await nextTick()
    expect(input().attributes('aria-describedby')).toBe('external')
  } finally {
    wrapper.unmount()
  }
})

test('nested custom FormDetails does not reuse the parent error id', async () => {
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { name: '' } },
    slots: {
      default: () =>
        h(FormItem, { field: 'name', label: 'Name' }, () => [
          h(Input),
          h(FormDetails, { errorMessage: 'Other issue' }),
        ]),
    },
  })
  try {
    ;(wrapper.vm as any).setFields({ name: { message: 'Parent issue' } })
    await nextTick()
    const id = wrapper.get('input').attributes('aria-describedby')!
    expect(wrapper.findAll(`[id="${id}"]`)).toHaveLength(1)
    expect(wrapper.get(`[id="${id}"]`).text()).toBe('Parent issue')
  } finally {
    wrapper.unmount()
  }
})

test.each([
  ['textarea', Textarea],
  ['number', InputNumber],
  ['select', Select],
  ['date', DateField],
])('associates errors with the actual %s control', async (_name, component) => {
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { value: '' } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Value' }, () => h(component as any, { 'aria-describedby': 'external' })),
    },
  })
  try {
    ;(wrapper.vm as any).setFields({ value: { message: 'Invalid value' } })
    await nextTick()
    const id = wrapper.get('.mp-form-details__error-message').attributes('id')
    expect(id).toBeTruthy()
    const control = wrapper.get('input,textarea')
    expect(control.attributes('aria-describedby')?.split(/\s+/)).toContain(id)
    expect(control.attributes('aria-describedby')?.split(/\s+/)).toContain('external')
  } finally {
    wrapper.unmount()
  }
})

test('deferred editor focus targets receive the error description and readPretty removes it', async () => {
  const wrapper = mount(Form, {
    props: { editMode: 'popup', model: { name: '' } },
    slots: {
      default: () =>
        h(FormItem, { field: 'name', label: 'Name' }, () =>
          h(Input, { editMode: 'popup', 'aria-describedby': 'external' }),
        ),
    },
  })
  try {
    ;(wrapper.vm as any).setFields({ name: { message: 'Server error' } })
    await nextTick()
    const errorId = wrapper.get('[role="alert"]').element.closest('[id]')?.id
    expect(errorId).toBeTruthy()
    const button = wrapper
      .findAll('button')
      .find((node) => node.attributes('aria-describedby')?.split(/\s+/).includes(errorId!))
    expect(button).toBeTruthy()
    expect(button!.attributes('aria-describedby')?.split(/\s+/)).toContain('external')
    await wrapper.setProps({ readPretty: true })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(
      wrapper
        .findAll('[aria-describedby]')
        .every((node) => !node.attributes('aria-describedby')?.split(/\s+/).includes(errorId!)),
    ).toBe(true)
  } finally {
    wrapper.unmount()
  }
})

test('each field owns a stable error id and nested no-style controls inherit their parent', async () => {
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { first: '', second: '' } },
    slots: {
      default: () => [
        h(FormItem, { field: 'first', label: 'First' }, () => h(FormItem, { noStyle: true }, () => h(Input))),
        h(FormItem, { field: 'second', label: 'Second' }, () => h(Input)),
      ],
    },
  })
  try {
    const form = wrapper.vm as any
    form.setFields({ first: { message: 'First error' }, second: { message: 'Second error' } })
    await nextTick()
    const inputs = wrapper.findAll('input')
    const first = inputs[0].attributes('aria-describedby')
    const second = inputs[1].attributes('aria-describedby')
    expect(first).toBeTruthy()
    expect(second).toBeTruthy()
    expect(first).not.toBe(second)
    expect(wrapper.get(`[id="${first}"]`).text()).toContain('First error')
    expect(wrapper.get(`[id="${second}"]`).text()).toContain('Second error')
    form.clearValidate()
    await nextTick()
    expect(inputs[0].attributes('aria-describedby')).toBeUndefined()
    form.setFields({ first: { message: 'New error' } })
    await nextTick()
    expect(inputs[0].attributes('aria-describedby')).toBe(first)
  } finally {
    wrapper.unmount()
  }
})
