import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DateRange from '../../date-range'
import TimeRange from '../../time-range'
import FormItem from '../FormItem.vue'

describe.each([
  ['date', DateRange],
  ['time', TimeRange],
])('%s explicit range label', (_kind, Component) => {
  it('names both endpoints with the form label and a distinct endpoint label', () => {
    const wrapper = mount(FormItem, {
      props: { label: 'Period', labelAttrs: { id: 'period-label', for: 'start' } },
      slots: {
        default: () =>
          h(Component as any, {
            editMode: 'direct',
            inputAttrs: [
              { id: 'start', 'aria-label': undefined },
              { id: 'end', 'aria-labelledby': undefined },
            ],
          }),
      },
    })
    try {
      const inputs = wrapper.findAll('input')
      expect(inputs).toHaveLength(2)
      const refs = inputs.map((input) => input.attributes('aria-labelledby')?.split(' '))
      expect(refs.every((ids) => ids?.[0] === 'period-label' && ids.length === 2)).toBe(true)
      expect(refs[0]?.[1]).not.toBe(refs[1]?.[1])
      expect(refs.map((ids) => wrapper.find(`[id="${ids?.[1]}"]`).text()).every(Boolean)).toBe(true)
    } finally {
      wrapper.unmount()
    }
  })
  it('keeps explicit endpoint names and removes references when the label targets another control', async () => {
    const wrapper = mount(FormItem, {
      props: { label: 'Period', labelAttrs: { id: 'period-label', for: 'start' } },
      slots: {
        default: () =>
          h(Component as any, {
            editMode: 'direct',
            inputAttrs: [{ id: 'start', 'aria-label': 'Departure' }, { id: 'end' }],
          }),
      },
    })
    try {
      const inputs = () => wrapper.findAll('input')
      expect(inputs()[0].attributes('aria-label')).toBe('Departure')
      expect(inputs()[0].attributes('aria-labelledby')).toBeUndefined()
      expect(inputs()[1].attributes('aria-labelledby')?.startsWith('period-label ')).toBe(true)
      await wrapper.setProps({ labelAttrs: { id: 'period-label', for: 'elsewhere' } })
      expect(inputs()[1].attributes('aria-labelledby')).toBeUndefined()
      expect(wrapper.find('[id$="-range-endpoint-1"]').exists()).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })
  it('treats undefined endpoint names as absent when a common name exists', () => {
    const wrapper = mount(FormItem, {
      props: { label: 'Period', labelAttrs: { id: 'period-label', for: 'start' } },
      slots: {
        default: () =>
          h(Component as any, {
            editMode: 'direct',
            'aria-label': 'Shared',
            inputAttrs: [
              { id: 'start', 'aria-labelledby': undefined },
              { id: 'end', 'aria-label': undefined },
            ],
          }),
      },
    })
    try {
      const inputs = wrapper.findAll('input')
      expect(inputs.map((input) => input.attributes('aria-label'))).toEqual(['Shared', 'Shared'])
      expect(inputs.map((input) => input.attributes('aria-labelledby'))).toEqual([undefined, undefined])
    } finally {
      wrapper.unmount()
    }
  })
})

it.each(['week', 'month', 'quarter', 'year'])('uses neutral endpoint names for %s ranges', (type) => {
  const wrapper = mount(FormItem, {
    props: { label: 'Period', labelAttrs: { id: 'period-label', for: 'start' } },
    slots: {
      default: () =>
        h(DateRange, { editMode: 'direct', type: type as any, inputAttrs: [{ id: 'start' }, { id: 'end' }] }),
    },
  })
  try {
    const inputs = wrapper.findAll('input')
    const labels = inputs.map((input) => {
      const id = input.attributes('aria-labelledby')!.split(' ')[1]
      return wrapper.get(`[id="${id}"]`).text()
    })
    expect(labels).toEqual(['开始', '结束'])
  } finally {
    wrapper.unmount()
  }
})
