import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Radio, { RadioGroup } from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Button from '../../button'
import Space from '../../space'
import Demo from '../example/demos/async-options.vue'

useDemoControls()

test('reloading options keeps the focused radio mounted and emits once per new value', async () => {
  vi.useFakeTimers()
  const wrapper = mount(Demo, {
    attachTo: document.body,
    global: { components: { MpRadio: Radio, MpRadioGroup: RadioGroup, MpButton: Button, MpSpace: Space } },
  })
  const load = () =>
    wrapper
      .findAll('button')
      .find((button) => button.text() === '加载选项')
      .trigger('click')
  try {
    await load()
    vi.advanceTimersByTime(800)
    await nextTick()
    const first = wrapper.get('input[value=remote]').element
    await load()
    await wrapper.get('input[value=remote]').trigger('keydown', { key: 'End' })
    const selected = wrapper.get('input[value=a]').element
    expect(document.activeElement).toBe(selected)
    expect(wrapper.text()).toContain('用户变更次数：1')
    vi.advanceTimersByTime(800)
    await nextTick()
    expect(wrapper.get('input[value=remote]').element).toBe(first)
    expect(wrapper.get('input[value=a]').element).toBe(selected)
    expect(document.activeElement).toBe(selected)
    expect(selected.checked).toBe(true)
    await wrapper.get('input[value=a]').trigger('keydown', { key: 'End' })
    expect(wrapper.text()).toContain('用户变更次数：1')
    await wrapper.get('input[value=a]').trigger('keydown', { key: 'Home' })
    expect(wrapper.text()).toContain('用户变更次数：2')
    expect(first.checked).toBe(true)
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})
