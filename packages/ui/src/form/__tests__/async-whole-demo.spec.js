import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Form, { FormItem } from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Button from '../../button'
import Input from '../../input'
import Space from '../../space'
import Demo from '../example/demos/async-race.vue'

useDemoControls()

test.each([
  ['校验整表', '校验字段'],
  ['校验字段', '校验整表'],
])('%s and %s preserve the newest result and reset invalidates old work', async (first, second) => {
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
  const field = () => wrapper.get('input:not([type=checkbox])')
  const click = async (name) => {
    await wrapper
      .findAll('button')
      .find((button) => button.text() === name)
      .trigger('click')
    await flushPromises()
  }
  try {
    for (const [oldValue, newValue] of [
      ['guest', 'admin'],
      ['admin', 'guest'],
    ]) {
      await field().setValue(oldValue)
      await click(first)
      await field().setValue(newValue)
      await click(second)
      expect(wrapper.get('p[role=status]').text()).toContain('等待结果：2')
      await click('返回最新结果')
      await click('返回最早结果')
      expect(wrapper.get('p[role=status]').text()).toContain(
        newValue === 'admin' ? '通过；等待结果：0' : '未通过；等待结果：0',
      )
      expect(field().attributes('aria-invalid') === 'true').toBe(newValue !== 'admin')
    }
    await field().setValue('guest')
    await click('校验整表')
    await click('重置')
    await click('返回最早结果')
    expect(wrapper.get('p[role=status]').text()).toContain('已重置；等待结果：0')
    expect(field().element.value).toBe('')
    expect(field().attributes('aria-invalid')).not.toBe('true')
  } finally {
    wrapper.unmount()
  }
})
