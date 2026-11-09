import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Form, { FormItem } from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Button from '../../button'
import Input from '../../input'
import Space from '../../space'
import Demo from '../example/demos/cross-field.vue'

useDemoControls()

test('editing a paused cross-field submission invalidates its native outcome, then retry and reset work', async () => {
  const wrapper = mount(Demo, {
    global: { components: { MpForm: Form, MpFormItem: FormItem, MpInput: Input, MpButton: Button, MpSpace: Space } },
  })
  const button = (text) => wrapper.findAll('button').find((item) => item.text() === text)
  const status = () => wrapper.get('[role=status]').text()
  try {
    await wrapper.findAll('input')[0].setValue('alpha203')
    await wrapper.findAll('input')[1].setValue('alpha203')
    await button('暂停跨字段校验').trigger('click')
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.get('.cross-field-pending').text()).toBe('等待：1')
    expect(status()).toBe('结果：尚未提交；提交次数：0')
    await wrapper.findAll('input')[0].setValue('beta203')
    await button('返回跨字段结果').trigger('click')
    await flushPromises()
    expect(status()).toBe('结果：尚未提交；提交次数：0')
    expect(wrapper.text()).toContain('两次代码须相同且不能为空')
    await wrapper.findAll('input')[1].setValue('beta203')
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    await button('返回跨字段结果').trigger('click')
    await flushPromises()
    expect(status()).toBe('结果：通过；提交次数：1')
    expect(wrapper.text()).not.toContain('两次代码须相同且不能为空')
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.get('.cross-field-pending').text()).toBe('等待：1')
    await wrapper.get('form').trigger('reset')
    await flushPromises()
    expect(status()).toBe('结果：已重置；提交次数：1')
    expect(wrapper.get('.cross-field-pending').text()).toBe('等待：0')
    expect(button('返回跨字段结果').element.disabled).toBe(true)
    expect(wrapper.findAll('input').map((input) => input.element.value)).toEqual(['', ''])
    expect(wrapper.findAll('pre')[1].text()).toBe('上次提交值：-')
  } finally {
    wrapper.unmount()
  }
})

test('cross-field validation reads the latest source and native submit/reset preserve explicit counts', async () => {
  const wrapper = mount(Demo, {
    global: { components: { MpForm: Form, MpFormItem: FormItem, MpInput: Input, MpButton: Button, MpSpace: Space } },
  })
  const fields = () => wrapper.findAll('input')
  const status = () => wrapper.get('[role=status]').text()
  const submit = async () => {
    await wrapper.get('form').trigger('submit')
    await flushPromises()
  }
  try {
    await fields()[0].setValue('alpha178')
    await fields()[1].setValue('wrong178')
    await submit()
    expect(status()).toBe('结果：未通过；提交次数：1')
    expect(wrapper.text()).toContain('两次代码须相同且不能为空')
    await fields()[1].setValue('alpha178')
    await submit()
    expect(status()).toBe('结果：通过；提交次数：2')
    expect(wrapper.text()).not.toContain('两次代码须相同且不能为空')
    await fields()[0].setValue('beta178')
    await wrapper
      .findAll('button')
      .find((button) => button.text() === '只校验确认值')
      .trigger('click')
    await flushPromises()
    expect(status()).toBe('结果：确认值未通过；提交次数：2')
    expect(wrapper.text()).toContain('两次代码须相同且不能为空')
    expect(wrapper.findAll('pre')[1].text()).toContain('"source":"alpha178"')
    await fields()[1].setValue('beta178')
    await submit()
    expect(status()).toBe('结果：通过；提交次数：3')
    expect(wrapper.findAll('pre')[1].text()).toContain('"source":"beta178","confirmation":"beta178"')
    await wrapper.get('form').trigger('reset')
    await flushPromises()
    expect(status()).toBe('结果：已重置；提交次数：3')
    expect(fields().map((input) => input.element.value)).toEqual(['', ''])
    expect(wrapper.findAll('pre')[1].text()).toBe('上次提交值：-')
    expect(wrapper.text()).not.toContain('两次代码须相同且不能为空')
  } finally {
    wrapper.unmount()
  }
})
