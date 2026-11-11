import { h, KeepAlive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Radio, { RadioGroup } from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Button from '../../button'
import Space from '../../space'
import Demo from '../example/demos/async-options.vue'

useDemoControls()

const global = { components: { MpRadio: Radio, MpRadioGroup: RadioGroup, MpButton: Button, MpSpace: Space } }
const click = async (wrapper, name) => {
  await wrapper
    .findAll('button')
    .find((button) => button.text() === name)
    .trigger('click')
  await flushPromises()
}
const status = (wrapper) => wrapper.get('[role=status]').text()

test('manual local promises ignore obsolete loads without changing selected values or user counts', async () => {
  const wrapper = mount(Demo, { global })
  try {
    await wrapper.get('input[type=checkbox]').setValue(true)
    await click(wrapper, '加载选项')
    await click(wrapper, '加载选项')
    await click(wrapper, '返回最新加载')
    await wrapper.get('input[value=a]').trigger('keydown', { key: 'Enter' })
    await click(wrapper, '返回最早加载')
    expect(status(wrapper)).toBe('Applied: 2 · Ignored: 1 · Pending: 0')
    expect(wrapper.get('input[value=a]').element.checked).toBe(true)
    expect(wrapper.text()).toContain('用户变更次数：1')
    await click(wrapper, '加载选项')
    await click(wrapper, '加载选项')
    await click(wrapper, '返回最早加载')
    expect(status(wrapper)).toBe('Applied: 2 · Ignored: 2 · Pending: 1')
    expect(wrapper.text()).toContain('加载中，可在完成前移除选项')
    await click(wrapper, '返回最新加载')
    await click(wrapper, '加载选项')
    await click(wrapper, '移除选项')
    await click(wrapper, '返回最早加载')
    expect(wrapper.findAll('input[type=radio]')).toHaveLength(0)
    expect(status(wrapper)).toBe('Applied: 4 · Ignored: 3 · Pending: 0')
    await click(wrapper, '加载选项')
    await click(wrapper, '返回最新加载')
    expect(wrapper.get('input[value=a]').element.checked).toBe(true)
    expect(wrapper.text()).toContain('用户变更次数：1')
  } finally {
    wrapper.unmount()
  }
})

test('deactivation settles pending local promises and a new load works after activation', async () => {
  const active = ref(true)
  const Host = {
    setup: () => () => h(KeepAlive, null, { default: () => (active.value ? h(Demo, { editMode: 'direct' }) : null) }),
  }
  const wrapper = mount(Host, { global })
  try {
    await wrapper.get('input[type=checkbox]').setValue(true)
    await click(wrapper, '加载选项')
    await click(wrapper, '加载选项')
    active.value = false
    await flushPromises()
    active.value = true
    await flushPromises()
    expect(status(wrapper)).toBe('Applied: 0 · Ignored: 2 · Pending: 0')
    await click(wrapper, '加载选项')
    await click(wrapper, '返回最新加载')
    expect(status(wrapper)).toBe('Applied: 3 · Ignored: 2 · Pending: 0')
  } finally {
    wrapper.unmount()
  }
})
