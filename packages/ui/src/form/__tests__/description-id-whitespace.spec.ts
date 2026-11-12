import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DateRange from '../../date-range'
import Input from '../../input'
import Tooltip from '../../tooltip/Tooltip.vue'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

const hint = 'help\u00a0detail'

it('preserves a non-ASCII space within a user description ID through form errors', async () => {
  const wrapper = mount(Form, {
    props: { model: { value: '' } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Value' }, () => h(Input, { 'aria-describedby': `${hint}\tsecondary` })),
    },
  })
  try {
    const input = () => wrapper.get('input')
    expect(input().attributes('aria-describedby')).toBe(`${hint} secondary`)
    ;(wrapper.vm as any).setFields({ value: { message: 'Invalid' } })
    await nextTick()
    const id = wrapper.get('[role="alert"]').element.closest('[id]')?.id
    expect(id).toBeTruthy()
    expect(input().attributes('aria-describedby')).toBe(`${hint} secondary ${id}`)
    ;(wrapper.vm as any).clearValidate()
    await nextTick()
    expect(input().attributes('aria-describedby')).toBe(`${hint} secondary`)
  } finally {
    wrapper.unmount()
  }
})

it('preserves IDs when combining common and endpoint descriptions', () => {
  const wrapper = mount(DateRange, {
    props: { editMode: 'direct', inputAttrs: [{ 'aria-describedby': 'endpoint\u00a0hint' }, {}] },
    attrs: { 'aria-describedby': hint },
  })
  try {
    expect(wrapper.findAll('input')[0].attributes('aria-describedby')).toBe(`${hint} endpoint\u00a0hint`)
  } finally {
    wrapper.unmount()
  }
})

it('preserves a reference description ID when a tooltip is attached', async () => {
  const wrapper = mount(Tooltip, {
    props: { open: true, popupContainer: false, animationName: '' },
    slots: { default: () => h('button', { 'aria-describedby': hint }, 'Reference'), content: () => 'Tooltip text' },
  })
  try {
    await nextTick()
    await nextTick()
    expect(wrapper.get('button').attributes('aria-describedby')).toBe(
      `${hint} ${wrapper.get('[role="tooltip"]').attributes('id')}`,
    )
  } finally {
    wrapper.unmount()
  }
})

it('preserves non-ASCII spaces at the edges of a tooltip reference ID', async () => {
  const id = '\u00a0leading-and-trailing\u00a0'
  const wrapper = mount(Tooltip, {
    props: { open: true, popupContainer: false, animationName: '' },
    slots: { default: () => h('button', { 'aria-describedby': id }, 'Reference'), content: () => 'Tooltip text' },
  })
  try {
    await nextTick()
    await nextTick()
    expect(wrapper.get('button').attributes('aria-describedby')).toBe(
      `${id} ${wrapper.get('[role="tooltip"]').attributes('id')}`,
    )
  } finally {
    wrapper.unmount()
  }
})
