import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Content from '../presentation/TimePanelContent.vue'
import TimePicker from '../TimePicker.vue'

describe('time presentation ownership', () => {
  it('binds clock refs to the owner and releases them when switching or unmounting', async () => {
    const wrapper = mount(TimePicker, { props: { presentation: 'clock', modelValue: '13:30', format: 'HH:mm' } })
    const state = wrapper.findComponent(Content).props('state')
    expect(state.container.value).toBe(wrapper.get('.mp-time-picker__clock-container').element)
    expect(typeof state.inner.value.getSize).toBe('function')
    expect(state.picker.value).toBe(wrapper.element)
    await wrapper.setProps({ presentation: 'picker' })
    await nextTick()
    expect(state.container.value).toBeNull()
    expect(state.inner.value).toBeNull()
    await wrapper.setProps({ presentation: 'clock' })
    await nextTick()
    expect(state.container.value).toBe(wrapper.get('.mp-time-picker__clock-container').element)
    expect(typeof state.inner.value.getSize).toBe('function')
    wrapper.unmount()
    expect(state.container.value).toBeNull()
    expect(state.inner.value).toBeNull()
    expect(state.picker.value).toBeNull()
  })
})
