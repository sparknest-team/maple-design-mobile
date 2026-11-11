import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Form, { FormItem } from '..'
import Button from '../../button'
import Input from '../../input'
import Space from '../../space'
import EnglishDemo from '../example/demos/en-US/events.vue'
import ChineseDemo from '../example/demos/events.vue'

vi.mock('@maple-design/ui-vue', () => ({ Message: vi.fn() }))

test.each([
  [ChineseDemo, '提交结果：未通过', '提交结果：通过', '提交结果：已重置'],
  [EnglishDemo, 'Submit result: Invalid', 'Submit result: Valid', 'Submit result: Reset'],
])('form event demo uses native types and reflects validate/reset results', async (Demo, invalid, valid, reset) => {
  const wrapper = mount(Demo, {
    global: { components: { MpForm: Form, MpFormItem: FormItem, MpInput: Input, MpButton: Button, MpSpace: Space } },
  })
  try {
    expect(wrapper.findAll('button').map((button) => button.attributes('type'))).toEqual(['submit', 'reset'])
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.get('p[role=status]').text()).toBe(invalid)
    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('demo-user')
    await inputs[1].setValue('demo-password')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.get('p[role=status]').text()).toBe(valid)
    expect(wrapper.find('pre').text()).toContain('demo-user')
    await wrapper.find('form').trigger('reset')
    await flushPromises()
    expect(wrapper.get('p[role=status]').text()).toBe(reset)
    expect(inputs.map((input) => input.element.value)).toEqual(['', ''])
  } finally {
    wrapper.unmount()
  }
})
