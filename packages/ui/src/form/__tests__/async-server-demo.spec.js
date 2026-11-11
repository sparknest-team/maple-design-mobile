import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Form, { FormItem } from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Button from '../../button'
import Input from '../../input'
import Space from '../../space'
import Demo from '../example/demos/async-race.vue'

useDemoControls()

test('setFields server errors survive stale success and failure until a new transaction', async () => {
  const wrapper = mount(Demo, {
    global: {
      components: {
        MpForm: Form,
        MpFormItem: FormItem,
        MpInput: Input,
        MpButton: Button,
        MpSpace: Space,
      },
    },
  })
  const click = (name) =>
    wrapper
      .findAll('button')
      .find((button) => button.text() === name)
      .trigger('click')
  const field = () => wrapper.get('input:not([type=checkbox])')
  try {
    for (const value of ['admin', 'guest']) {
      await field().setValue(value)
      await click('校验字段')
      await click('写入服务端错误')
      expect(field().attributes('aria-invalid')).toBe('true')
      expect(wrapper.text()).toContain('模拟服务端拒绝')
      await click('返回最早结果')
      await flushPromises()
      expect(wrapper.get('[role=status]').text()).toContain('服务端错误；等待结果：0')
      expect(wrapper.text()).toContain('模拟服务端拒绝')
      expect(field().attributes('aria-invalid')).toBe('true')
      await click('清空校验')
      expect(field().attributes('aria-invalid')).not.toBe('true')
      expect(wrapper.text()).not.toContain('模拟服务端拒绝')
    }
    await click('写入服务端错误')
    await field().setValue('admin')
    await click('校验字段')
    await click('返回最新结果')
    await flushPromises()
    expect(wrapper.get('[role=status]').text()).toContain('通过；等待结果：0')
    expect(field().attributes('aria-invalid')).not.toBe('true')
  } finally {
    wrapper.unmount()
  }
})
