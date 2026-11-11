import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Result from '..'
import Button from '../../button'
import Space from '../../space'
import Demo from '../example/demos/basic-usage.vue'
import Types from '../example/demos/type.vue'

test('demo changes result status and resets its visible feedback', async () => {
  const owner = mount(Demo, { global: { components: { MpResult: Result, MpButton: Button, MpSpace: Space } } })
  const buttons = owner.findAllComponents(Button)
  for (const status of ['success', 'warning', 'danger', 'question', 'empty', 'info']) {
    await buttons[0].trigger('click')
    expect(owner.findComponent(Result).props('status')).toBe(status)
    expect(owner.text()).toContain('Current status: ' + status)
  }
  await buttons[0].trigger('click')
  await buttons[1].trigger('click')
  expect(owner.findComponent(Result).props('status')).toBe('info')
  owner.unmount()
})

test('success popup demo explicitly uses the success graphic', () => {
  const owner = mount(Types, {
    global: {
      components: { MpResult: Result, MpButton: Button, MpSpace: Space },
      stubs: { MpPopup: { template: '<div><slot /></div>' } },
    },
  })
  const success = owner.findAllComponents(Result).find((item) => item.props('title') === '成功')
  expect(success.props('status')).toBe('success')
  owner.unmount()
})
