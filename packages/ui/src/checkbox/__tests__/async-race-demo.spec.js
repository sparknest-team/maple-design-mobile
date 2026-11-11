import { h, KeepAlive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Checkbox, { CheckboxGroup } from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Button from '../../button'
import Space from '../../space'
import Demo from '../example/demos/async-options.vue'

useDemoControls()

const global = {
  components: { MpCheckbox: Checkbox, MpCheckboxGroup: CheckboxGroup, MpButton: Button, MpSpace: Space },
}
const click = async (wrapper, name) => {
  await wrapper
    .findAll('button')
    .find((button) => button.text() === name)
    .trigger('click')
  await flushPromises()
}
const status = (wrapper) => wrapper.get('[role=status]').text()
const space = async (wrapper, value) => {
  wrapper.get(`input[value=${value}]`).element.focus()
  await wrapper.get(`input[value=${value}]`).trigger('keydown', { key: ' ' })
  await wrapper.get(`input[value=${value}]`).trigger('keyup', { key: ' ' })
}

test('obsolete local loads preserve selections, max and user change counts', async () => {
  const wrapper = mount(Demo, { global, attachTo: document.body })
  try {
    await wrapper.get('input[type=checkbox]').setValue(true)
    await click(wrapper, '加载选项')
    await click(wrapper, '加载选项')
    await click(wrapper, '返回最新加载')
    await space(wrapper, 'a')
    expect(wrapper.get('input[value=b]').element.disabled).toBe(true)
    await click(wrapper, '返回最早加载')
    expect(status(wrapper)).toBe('Applied: 2 · Ignored: 1 · Pending: 0')
    expect(wrapper.get('input[value=a]').element.checked).toBe(true)
    expect(wrapper.get('input[value=b]').element.disabled).toBe(true)
    expect(wrapper.text()).toContain('用户变更次数：1')
    await wrapper.get('input[value=a]').trigger('keydown', { key: 'Enter' })
    expect(wrapper.get('input[value=b]').element.disabled).toBe(false)
    await space(wrapper, 'b')
    expect(wrapper.text()).toContain('用户变更次数：3')
    await click(wrapper, '加载选项')
    await click(wrapper, '移除选项')
    await click(wrapper, '返回最早加载')
    expect(wrapper.findAll('input[value=remote],input[value=a],input[value=b],input[value=locked]')).toHaveLength(0)
    expect(status(wrapper)).toBe('Applied: 2 · Ignored: 2 · Pending: 0')
    await click(wrapper, '加载选项')
    await click(wrapper, '返回最新加载')
    expect(wrapper.get('input[value=b]').element.checked).toBe(true)
    expect(wrapper.get('input[value=a]').element.disabled).toBe(true)
    await click(wrapper, '加载选项')
    await click(wrapper, '加载选项')
    await click(wrapper, '返回最早加载')
    expect(status(wrapper)).toBe('Applied: 4 · Ignored: 3 · Pending: 1')
    expect(wrapper.text()).toContain('加载中，可在完成前移除选项')
    await click(wrapper, '返回最新加载')
    expect(status(wrapper)).toBe('Applied: 6 · Ignored: 3 · Pending: 0')
    expect(wrapper.get('input[value=remote]').element.checked).toBe(true)
    expect(wrapper.get('input[value=b]').element.checked).toBe(true)
    expect(wrapper.get('input[value=a]').element.disabled).toBe(true)
    expect(wrapper.text()).toContain('用户变更次数：3')
  } finally {
    wrapper.unmount()
  }
})

test('deactivation settles pending local promises and permits a fresh load', async () => {
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
