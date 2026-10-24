import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Input from '..'
import Button from '../../button'
import Space from '../../space'
import Demo from '../example/demos/default-value.vue'

function create() {
  return mount(Demo, { global: { components: { MpInput: Input, MpButton: Button, MpSpace: Space } } })
}
test('uncontrolled default is read only on mount and never writes itself into the parent', async () => {
  const wrapper = create()
  const input = () => wrapper.findAll('input')[0]
  const field = () => wrapper.findAllComponents(Input)[0]
  expect(input().element.value).toBe('A: initial text')
  expect(field().emitted('update:modelValue')).toBeUndefined()
  await input().setValue('User text')
  expect(input().element.value).toBe('User text')
  expect(wrapper.text()).toContain('defaultValue = A: initial text')
  expect(field().emitted('update:modelValue')).toEqual([['User text']])
  await wrapper.findAll('button')[0].trigger('click')
  expect(input().element.value).toBe('User text')
  await wrapper.findAll('button')[1].trigger('click')
  expect(input().element.value).toBe('B: new default')
  expect(field().emitted('update:modelValue')).toBeUndefined()
  wrapper.unmount()
})
test('controlled empty string takes precedence and the parent receives user input', async () => {
  const wrapper = create()
  const input = wrapper.findAll('input')[1]
  expect(input.element.value).toBe('')
  await input.setValue('Beijing')
  expect(wrapper.text()).toContain('v-model = "Beijing"')
  await wrapper.findAll('button')[2].trigger('click')
  expect(input.element.value).toBe('Parent supplied text')
  await wrapper.findAll('button')[3].trigger('click')
  expect(input.element.value).toBe('')
  wrapper.unmount()
})
