import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { mockScrollIntoView } from '../../utils/test'
import TimeRangePicker from '../TimeRangePicker.vue'

mockScrollIntoView()

describe('time range reading direction', () => {
  it('moves between columns after changing direction without committing the time', async () => {
    const host = document.createElement('div')
    document.body.append(host)
    host.dir = 'ltr'
    const wrapper = mount(TimeRangePicker, {
      attachTo: host,
      props: { defaultValue: ['09:30', '16:30'], format: 'HH:mm' },
    })
    const columns = wrapper.findAll('[role=listbox]')
    expect(columns).toHaveLength(4)
    const focusTarget = (index: number) => columns[index].element as HTMLElement
    const first = focusTarget(1)
    first.focus()
    first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    expect(columns[2].element.contains(document.activeElement)).toBe(true)
    host.dir = 'rtl'
    const second = focusTarget(2)
    second.focus()
    second.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    expect(columns[1].element.contains(document.activeElement)).toBe(true)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('confirm')).toBeUndefined()
    wrapper.unmount()
    host.remove()
  })
})
