import { defineComponent, h, KeepAlive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Form, { FormItem } from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Button from '../../button'
import Input from '../../input'
import Space from '../../space'
import Demo from '../example/demos/async-race.vue'
import EnglishDemo from '../example/demos/en-US/async-race.vue'

useDemoControls()

const components = { MpForm: Form, MpFormItem: FormItem, MpInput: Input, MpButton: Button, MpSpace: Space }

test('English async demo uses real rules and exposes a failed result', async () => {
  const wrapper = mount(EnglishDemo, { props: { editMode: 'direct' }, global: { components } })
  try {
    await wrapper.get('input').setValue('guest')
    await click(wrapper, 'Validate field')
    expect(result(wrapper)).toContain('Pending: 1')
    await click(wrapper, 'Resolve oldest')
    await flushPromises()
    expect(result(wrapper)).toContain('Invalid')
    expect(wrapper.text()).toContain('Username must be admin')
  } finally {
    wrapper.unmount()
  }
})
const labels = {
  validate: '校验字段',
  oldest: '返回最早结果',
  newest: '返回最新结果',
  clear: '清空校验',
  reset: '重置',
  valid: '通过',
  invalid: '未通过',
  cleared: '已清空',
  resetResult: '已重置',
}
function click(wrapper, name) {
  return wrapper
    .findAll('button')
    .find((button) => button.text() === name)
    .trigger('click')
}
function result(wrapper) {
  return wrapper.get('p[role=status]').text()
}

test('newest async field result survives the oldest late error', async () => {
  const wrapper = mount(Demo, { global: { components } })
  try {
    await wrapper.get('input').setValue('guest')
    await click(wrapper, labels.validate)
    await wrapper.get('input').setValue('admin')
    await click(wrapper, labels.validate)
    expect(result(wrapper)).toContain('2')
    await click(wrapper, labels.newest)
    await flushPromises()
    expect(result(wrapper)).toContain(labels.valid)
    await click(wrapper, labels.oldest)
    await flushPromises()
    expect(result(wrapper)).toContain(labels.valid)
    expect(result(wrapper)).toContain('0')
    expect(wrapper.get('input').attributes('aria-invalid')).not.toBe('true')
    expect(wrapper.text()).not.toContain('用户名必须是 admin')
    await wrapper.get('input').setValue('admin')
    await click(wrapper, labels.validate)
    await wrapper.get('input').setValue('guest')
    await click(wrapper, labels.validate)
    await click(wrapper, labels.newest)
    await flushPromises()
    await click(wrapper, labels.oldest)
    await flushPromises()
    expect(result(wrapper)).toContain(labels.invalid)
    expect(wrapper.get('input').attributes('aria-invalid')).toBe('true')
  } finally {
    wrapper.unmount()
  }
})

test('clear/reset invalidate late errors while retaining controls for a fresh validation', async () => {
  const wrapper = mount(Demo, { global: { components } })
  try {
    for (const [action, expected] of [
      [labels.clear, labels.cleared],
      [labels.reset, labels.resetResult],
    ]) {
      await wrapper.get('input').setValue('guest')
      await click(wrapper, labels.validate)
      await click(wrapper, action)
      await click(wrapper, labels.oldest)
      await flushPromises()
      expect(result(wrapper)).toContain(expected)
      expect(wrapper.get('input').attributes('aria-invalid')).not.toBe('true')
    }
    await wrapper.get('input').setValue('guest')
    await click(wrapper, labels.validate)
    await click(wrapper, labels.oldest)
    await flushPromises()
    expect(result(wrapper)).toContain(labels.invalid)
    expect(wrapper.get('input').attributes('aria-invalid')).toBe('true')
  } finally {
    wrapper.unmount()
  }
})

test('deactivation settles pending demo requests and allows another transaction', async () => {
  const shown = ref(true)
  const Host = defineComponent({
    setup: () => () => h(KeepAlive, null, () => (shown.value ? h(Demo, { editMode: 'direct' }) : null)),
  })
  const wrapper = mount(Host, { global: { components } })
  try {
    await wrapper.get('input').setValue('guest')
    await click(wrapper, labels.validate)
    expect(result(wrapper)).toContain('1')
    shown.value = false
    await flushPromises()
    shown.value = true
    await flushPromises()
    expect(result(wrapper)).toContain('0')
    await wrapper.get('input').setValue('admin')
    await click(wrapper, labels.validate)
    await click(wrapper, labels.newest)
    await flushPromises()
    expect(result(wrapper)).toContain(labels.valid)
  } finally {
    wrapper.unmount()
  }
})
