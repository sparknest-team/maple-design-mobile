import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Input from '..'
import Button from '../../button'
import Form from '../../form'
import ReadingDemo from '../../form/example/demos/empty-text.vue'
import ValidationDemo from '../../form/example/demos/empty-values-validation.vue'
import FormItem from '../../form/FormItem.vue'
import InputNumber from '../../input-number'
import NumberDemo from '../../input-number/example/demos/empty-value.vue'
import Select from '../../select'
import SelectDemo from '../../select/example/demos/empty-value.vue'
import Space from '../../space'
import InputDemo from '../example/demos/empty-value.vue'

const owners: VueWrapper[] = []
function own(component: any) {
  const owner = mount(component, {
    global: {
      components: {
        MpInput: Input,
        MpSelect: Select,
        MpInputNumber: InputNumber,
        MpForm: Form,
        MpFormItem: FormItem,
        MpButton: Button,
        MpSpace: Space,
      },
    },
  })
  owners.push(owner)
  return owner
}
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))

test('input example distinguishes clear output from manual deletion', async () => {
  const owner = own(InputDemo)
  await owner.get('.mp-field-decorator__clear-btn').trigger('click')
  await flushPromises()
  expect(owner.get('output').text()).toBe('null')
  await owner.getComponent(Button).trigger('click')
  await owner.get('input').setValue('')
  expect(owner.get('output').text()).toBe('""')
})

test('select example preserves All and clears to null', async () => {
  const owner = own(SelectDemo)
  expect(owner.get('output').text()).toBe('""')
  expect(owner.text()).toContain('全部')
  await owner.get('.mp-field-decorator__clear-btn').trigger('click')
  await flushPromises()
  expect(owner.get('output').text()).toBe('null')
  await owner.getComponent(Button).trigger('click')
  expect(owner.get('output').text()).toBe('""')
  await owner.findAllComponents(Select)[1].get('.mp-field-decorator__clear-btn').trigger('click')
  await flushPromises()
  expect(owner.findAll('output')[1].text()).toBe('[]')
  await owner.findAllComponents(Select)[2].get('.mp-field-decorator__clear-btn').trigger('click')
  await flushPromises()
  expect(owner.findAll('output')[2].text()).toBe('undefined')
})

test('numeric example preserves zero and restores the sentinel on clear', async () => {
  const owner = own(NumberDemo)
  expect((owner.get('input').element as HTMLInputElement).value).toBe('')
  expect(owner.get('output').text()).toBe('-1')
  await owner.findAllComponents(Button)[0].trigger('click')
  expect((owner.get('input').element as HTMLInputElement).value).toBe('0')
  await owner.get('.mp-field-decorator__clear-btn').trigger('click')
  await flushPromises()
  expect(owner.get('output').text()).toBe('-1')
  await owner.findAllComponents(InputNumber)[1].get('.mp-field-decorator__clear-btn').trigger('click')
  await flushPromises()
  expect(owner.findAll('output')[1].text()).toBe('0')
})

test('form example validates the API sentinel without coercing the model', async () => {
  const owner = own(ValidationDemo)
  await owner.getComponent(Button).trigger('click')
  await flushPromises()
  expect(owner.get('[role="status"]').text()).toBe('存在必填错误')
  expect(owner.get('output').text()).toBe('-1')
  owner.getComponent(Select).vm.$emit('update:modelValue', 1)
  await flushPromises()
  await owner.getComponent(Button).trigger('click')
  await flushPromises()
  expect(owner.get('[role="status"]').text()).toBe('校验通过')
  await owner.get('.mp-field-decorator__clear-btn').trigger('click')
  await flushPromises()
  await owner.getComponent(Button).trigger('click')
  await flushPromises()
  expect(owner.get('[role="status"]').text()).toBe('存在必填错误')
  expect(owner.get('output').text()).toBe('-1')
})

test('reading example shows inheritance and keeps the model during mode changes', async () => {
  const owner = own(ReadingDemo)
  const original = owner.get('output').text()
  expect(owner.findAll('input')).toHaveLength(0)
  expect(owner.text()).toContain('匿名')
  expect(owner.text()).toContain('未分配')
  await owner.findAllComponents(Button)[1].trigger('click')
  expect(owner.text()).toContain('暂无')
  expect(owner.get('output').text()).toBe(original)
  await owner.findAllComponents(Button)[0].trigger('click')
  expect(owner.findAll('input')).toHaveLength(4)
  expect(owner.get('output').text()).toBe(original)
  await owner.findAllComponents(Button)[0].trigger('click')
  expect(owner.findAll('input')).toHaveLength(0)
  expect(owner.get('output').text()).toBe(original)
})
