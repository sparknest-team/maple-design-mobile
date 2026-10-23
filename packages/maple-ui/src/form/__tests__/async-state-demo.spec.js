import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Form, { FormItem } from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Button from '../../button'
import Input from '../../input'
import Space from '../../space'
import Demo from '../example/demos/async-race.vue'

useDemoControls()

test('async validation keeps its transaction when input restrictions change', async () => {
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
  try {
    await wrapper.get('input:not([type=checkbox])').setValue('guest')
    await click('校验字段')
    expect(wrapper.get('[role=status]').text()).toContain('等待结果：1')
    await wrapper.findAll('input[type=checkbox]')[0].setValue(true)
    expect(wrapper.get('input:not([type=checkbox])').element.disabled).toBe(true)
    await click('返回最新结果')
    await flushPromises()
    expect(wrapper.get('[role=status]').text()).toContain('未通过')
    expect(wrapper.get('input:not([type=checkbox])').attributes('aria-invalid')).toBe('true')
    await wrapper.findAll('input[type=checkbox]')[1].setValue(true)
    await wrapper.findAll('input[type=checkbox]')[0].setValue(false)
    expect(wrapper.get('input:not([type=checkbox])').element.disabled).toBe(false)
    expect(wrapper.get('input:not([type=checkbox])').element.readOnly).toBe(true)
    await wrapper.findAll('input[type=checkbox]')[1].setValue(false)
    await wrapper.get('input:not([type=checkbox])').setValue('admin')
    await click('校验字段')
    await click('返回最新结果')
    await flushPromises()
    expect(wrapper.get('[role=status]').text()).toContain('通过；等待结果：0')
    expect(wrapper.get('input:not([type=checkbox])').attributes('aria-invalid')).not.toBe('true')
  } finally {
    wrapper.unmount()
  }
})
