import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Form, { FormItem } from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Button from '../../button'
import Input from '../../input'
import Space from '../../space'
import Demo from '../example/demos/async-race.vue'

useDemoControls()

test('remounted async field ignores a prior instance result in both return orders', async () => {
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
  const mounted = () => wrapper.findAll('input[type=checkbox]')[2]
  try {
    await field().setValue('guest')
    await click('校验字段')
    await mounted().setValue(false)
    expect(wrapper.find('input:not([type=checkbox])').exists()).toBe(false)
    expect(wrapper.findAll('button').find((button) => button.text() === '校验字段').element.disabled).toBe(true)
    await mounted().setValue(true)
    await field().setValue('admin')
    await click('校验字段')
    await click('返回最新结果')
    await flushPromises()
    await click('返回最早结果')
    await flushPromises()
    expect(wrapper.get('[role=status]').text()).toContain('通过；等待结果：0')
    expect(field().attributes('aria-invalid')).not.toBe('true')
    await click('校验字段')
    await mounted().setValue(false)
    await mounted().setValue(true)
    await field().setValue('guest')
    await click('校验字段')
    await click('返回最新结果')
    await flushPromises()
    await click('返回最早结果')
    await flushPromises()
    expect(wrapper.get('[role=status]').text()).toContain('未通过；等待结果：0')
    expect(field().attributes('aria-invalid')).toBe('true')
    await click('校验字段')
    await mounted().setValue(false)
    await mounted().setValue(true)
    await field().setValue('admin')
    await click('校验字段')
    await click('返回最早结果')
    await flushPromises()
    expect(wrapper.get('[role=status]').text()).toContain('校验中；等待结果：1')
    expect(field().attributes('aria-invalid')).not.toBe('true')
    await click('返回最新结果')
    await flushPromises()
    expect(wrapper.get('[role=status]').text()).toContain('通过；等待结果：0')
    expect(field().attributes('aria-invalid')).not.toBe('true')
  } finally {
    wrapper.unmount()
  }
})
