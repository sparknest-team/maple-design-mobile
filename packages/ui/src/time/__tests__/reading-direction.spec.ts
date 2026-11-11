import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { mockScrollIntoView } from '../../utils/test'
import TimePicker from '../TimePicker.vue'

mockScrollIntoView()

describe('time reading direction', () => {
  it('moves between columns after changing direction without committing the time', async () => {
    const host = document.createElement('div')
    document.body.append(host)
    host.dir = 'ltr'
    const wrapper = mount(TimePicker, { attachTo: host, props: { defaultValue: '09:30', format: 'HH:mm' } })
    const columns = wrapper.findAll('[role=listbox]')
    expect(columns).toHaveLength(2)
    const focusTarget = (index: number) => columns[index].element as HTMLElement
    const first = focusTarget(0)
    first.focus()
    first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    expect(columns[1].element.contains(document.activeElement)).toBe(true)
    host.dir = 'rtl'
    const second = focusTarget(1)
    second.focus()
    second.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    expect(columns[0].element.contains(document.activeElement)).toBe(true)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('confirm')).toBeUndefined()
    wrapper.unmount()
    host.remove()
  })
})
