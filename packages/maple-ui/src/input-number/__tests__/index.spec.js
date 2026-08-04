import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import InputNumber from '..'
import VarInputNumber from '../InputNumber.vue'

test('input-number plugin', () => {
  const app = createApp({}).use(InputNumber)
  expect(app.component(InputNumber.name)).toBeTruthy()
})

test('input-number increment & decrement', async () => {
  const wrapper = mount({
    components: {
      [VarInputNumber.name]: VarInputNumber,
    },
    data: () => ({
      value: 1,
    }),
    template: '<mp-input-number v-model="value" />',
  })

  await wrapper.findAll('.mp-input-number__step-button')[0].trigger('mousedown')
  await wrapper.findAll('.mp-input-number__step-button')[0].trigger('mouseup')
  expect(wrapper.vm.value).toBe(2)

  await wrapper.findAll('.mp-input-number__step-button')[1].trigger('mousedown')
  await wrapper.findAll('.mp-input-number__step-button')[1].trigger('mouseup')
  expect(wrapper.vm.value).toBe(1)

  wrapper.unmount()
})

test('input-number supports default-value', async () => {
  const onUpdate = vi.fn()
  const wrapper = mount(VarInputNumber, {
    props: {
      defaultValue: 2,
      'onUpdate:modelValue': onUpdate,
    },
  })

  await wrapper.findAll('.mp-input-number__step-button')[0].trigger('mousedown')
  await wrapper.findAll('.mp-input-number__step-button')[0].trigger('mouseup')
  expect(onUpdate).toHaveBeenLastCalledWith(3)

  wrapper.unmount()
})

test('input-number supports precision and controls', async () => {
  const wrapper = mount({
    components: {
      [VarInputNumber.name]: VarInputNumber,
    },
    data: () => ({
      value: 1,
    }),
    template: '<mp-input-number v-model="value" :step="0.1" :precision="1" :controls="false" />',
  })

  expect(wrapper.find('.mp-input-number__step-button').exists()).toBeFalsy()
  await wrapper.find('input').setValue('2.34')
  await wrapper.find('input').trigger('change')
  expect(wrapper.vm.value).toBe(2.3)

  wrapper.unmount()
})

test('input-number supports split control type', async () => {
  const wrapper = mount({
    components: {
      [VarInputNumber.name]: VarInputNumber,
    },
    data: () => ({
      value: 1,
    }),
    template: '<mp-input-number v-model="value" control-type="split" />',
  })

  await wrapper.findAll('.mp-input-number__step-button')[1].trigger('mousedown')
  await wrapper.findAll('.mp-input-number__step-button')[1].trigger('mouseup')
  expect(wrapper.vm.value).toBe(2)

  await wrapper.findAll('.mp-input-number__step-button')[0].trigger('mousedown')
  await wrapper.findAll('.mp-input-number__step-button')[0].trigger('mouseup')
  expect(wrapper.vm.value).toBe(1)

  wrapper.unmount()
})
