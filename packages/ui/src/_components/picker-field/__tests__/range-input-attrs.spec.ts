import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DateRange from '../../../date-range'
import TimeRange from '../../../time-range'
import PickerField from '../PickerField.vue'

describe.each([
  ['DateRange', DateRange],
  ['TimeRange', TimeRange],
])('%s input attributes', (_name, Component) => {
  it('applies and updates independent labels and descriptions without overriding state', async () => {
    const wrapper = mount(Component as any, {
      props: {
        editMode: 'direct',
        inputEditable: true,
        disabled: false,
        inputAttrs: [
          { id: 'start-id', 'aria-label': 'Departure', 'aria-describedby': 'start-help' },
          { id: 'end-id', 'aria-label': 'Return', 'aria-describedby': 'end-help' },
        ],
        'aria-label': 'Shared',
        'aria-describedby': 'shared-help start-help',
      },
    })
    try {
      const inputs = () => wrapper.findAll('input')
      expect(inputs()).toHaveLength(2)
      expect(inputs()[0].attributes('id')).toBe('start-id')
      expect(inputs()[1].attributes('id')).toBe('end-id')
      expect(inputs().map((input) => input.attributes('aria-label'))).toEqual(['Departure', 'Return'])
      expect(inputs().map((input) => input.attributes('aria-describedby'))).toEqual([
        'shared-help start-help',
        'shared-help start-help end-help',
      ])
      await wrapper.setProps({
        inputAttrs: [{ 'aria-labelledby': 'start-label' }, { 'aria-label': 'Updated return', disabled: true }],
      })
      expect(inputs()[0].attributes('aria-labelledby')).toBe('start-label')
      expect(inputs()[0].attributes('aria-label')).toBeUndefined()
      expect(inputs()[1].attributes('aria-label')).toBe('Updated return')
      expect(inputs()[1].attributes('disabled')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
  it('merges each input description with the FormItem error', async () => {
    const Form = (await import('../../../form/Form.vue')).default
    const FormItem = (await import('../../../form/FormItem.vue')).default
    const wrapper = mount(Form, {
      props: { model: { period: [] }, editMode: 'direct' },
      slots: {
        default: () =>
          h(FormItem, { field: 'period', label: 'Period' }, () =>
            h(Component as any, {
              inputAttrs: [{ 'aria-describedby': 'start-help' }, { 'aria-describedby': 'end-help' }],
            }),
          ),
      },
    })
    try {
      ;(wrapper.vm as any).setFields({ period: { message: 'Invalid period' } })
      await wrapper.vm.$nextTick()
      const id = wrapper.get('[role="alert"]').element.closest('[id]')?.id
      expect(id).toBeTruthy()
      const inputs = wrapper.findAll('input')
      expect(inputs[0].attributes('aria-describedby')?.split(' ')).toEqual(['start-help', id])
      expect(inputs[1].attributes('aria-describedby')?.split(' ')).toEqual(['end-help', id])
    } finally {
      wrapper.unmount()
    }
  })

  it('preserves internal input handling when endpoint listeners are supplied', async () => {
    const calls: string[] = []
    const wrapper = mount(Component as any, {
      props: {
        editMode: 'direct',
        inputEditable: true,
        inputAttrs: [{ onInput: () => calls.push('start') }, { onInput: () => calls.push('end') }],
      },
    })
    try {
      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('11:00')
      expect(calls).toEqual(['start'])
      expect((inputs[0].element as HTMLInputElement).value).toBe('11:00')
      expect((inputs[1].element as HTMLInputElement).value).toBe('')
    } finally {
      wrapper.unmount()
    }
  })
  it('honours an endpoint keydown listener that prevents opening', async () => {
    const calls: string[] = []
    const wrapper = mount(Component as any, {
      props: {
        editMode: 'direct',
        inputEditable: true,
        inputAttrs: [
          {
            onKeydown: (event: KeyboardEvent) => {
              calls.push(event.key)
              event.preventDefault()
            },
          },
          {},
        ],
      },
    })
    try {
      const input = wrapper.findAll('input')[0]
      await input.trigger('keydown', { key: 'ArrowDown' })
      expect(calls).toEqual(['ArrowDown'])
      expect(input.attributes('aria-expanded')).toBe('false')
    } finally {
      wrapper.unmount()
    }
  })

  it('preserves endpoint aria-invalid unless the component reports an error', async () => {
    const wrapper = mount(Component as any, {
      props: {
        editMode: 'direct',
        inputAttrs: [{ 'aria-invalid': 'true' }, { 'aria-invalid': 'false' }],
      },
    })
    try {
      const inputs = () => wrapper.findAll('input')
      expect(inputs().map((input) => input.attributes('aria-invalid'))).toEqual(['true', 'false'])
      await wrapper.setProps({ error: true })
      expect(inputs().map((input) => input.attributes('aria-invalid'))).toEqual(['true', 'true'])
      await wrapper.setProps({ error: false })
      expect(inputs().map((input) => input.attributes('aria-invalid'))).toEqual(['true', 'false'])
    } finally {
      wrapper.unmount()
    }
  })
})

it('handles a once endpoint keydown before the shared field handler', async () => {
  let calls = 0
  const wrapper = mount(PickerField, {
    props: {
      range: true,
      editable: true,
      texts: ['', ''],
      inputAttrs: [
        {
          onKeydownOnce: (event: KeyboardEvent) => {
            calls++
            event.preventDefault()
          },
        },
        {},
      ],
    },
  })
  try {
    const input = wrapper.findAll('input')[0]
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.emitted('keydown')).toBeUndefined()
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(calls).toBe(1)
    expect(wrapper.emitted('keydown')).toHaveLength(1)
  } finally {
    wrapper.unmount()
  }
})
