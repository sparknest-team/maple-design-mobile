import { createApp, h } from 'vue'
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

  await wrapper.findAll('.mp-input-number__step-button')[0].trigger('pointerdown', { button: 0, isPrimary: true })
  await wrapper.findAll('.mp-input-number__step-button')[0].trigger('pointerup')
  expect(wrapper.vm.value).toBe(2)

  await wrapper.findAll('.mp-input-number__step-button')[1].trigger('pointerdown', { button: 0, isPrimary: true })
  await wrapper.findAll('.mp-input-number__step-button')[1].trigger('pointerup')
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

  await wrapper.findAll('.mp-input-number__step-button')[0].trigger('pointerdown', { button: 0, isPrimary: true })
  await wrapper.findAll('.mp-input-number__step-button')[0].trigger('pointerup')
  expect(onUpdate).toHaveBeenLastCalledWith(3)

  wrapper.unmount()
})

test('input-number supports precision and input mode', async () => {
  const wrapper = mount({
    components: {
      [VarInputNumber.name]: VarInputNumber,
    },
    data: () => ({
      value: 1,
    }),
    template: '<mp-input-number v-model="value" :step="0.1" :precision="1" mode="input" />',
  })

  expect(wrapper.find('.mp-input-number__step-button').exists()).toBeFalsy()
  await wrapper.find('input').setValue('2.34')
  await wrapper.find('input').trigger('blur')
  expect(wrapper.vm.value).toBe(2.3)

  wrapper.unmount()
})

test('input-number supports button mode', async () => {
  const wrapper = mount({
    components: {
      [VarInputNumber.name]: VarInputNumber,
    },
    data: () => ({
      value: 1,
    }),
    template: '<mp-input-number v-model="value" mode="button" />',
  })

  await wrapper.findAll('.mp-input-number__step-button')[1].trigger('pointerdown', { button: 0, isPrimary: true })
  await wrapper.findAll('.mp-input-number__step-button')[1].trigger('pointerup')
  expect(wrapper.vm.value).toBe(2)

  await wrapper.findAll('.mp-input-number__step-button')[0].trigger('pointerdown', { button: 0, isPrimary: true })
  await wrapper.findAll('.mp-input-number__step-button')[0].trigger('pointerup')
  expect(wrapper.vm.value).toBe(1)

  wrapper.unmount()
})

test('input-number separates input from committed changes and clear', async () => {
  const wrapper = mount(VarInputNumber, {
    props: {
      modelValue: 1,
      modelEvent: 'input',
      clearable: true,
    },
  })
  const input = wrapper.find('input')

  await input.setValue('2')
  expect(wrapper.emitted('update:modelValue')).toEqual([[2]])
  expect(wrapper.emitted('change')).toBeUndefined()

  await input.trigger('keydown', { key: 'Enter' })
  await input.trigger('blur')
  expect(wrapper.emitted('change')).toHaveLength(1)

  await wrapper.find('[aria-label="清空"]').trigger('click')
  expect(wrapper.emitted('clear')).toHaveLength(1)
  expect(wrapper.emitted('change')).toHaveLength(2)
  expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([undefined])

  wrapper.unmount()
})

test('input-number preserves intermediate input and forwards slots', async () => {
  const wrapper = mount(VarInputNumber, {
    props: { modelValue: 1, modelEvent: 'input', clearable: true },
    slots: {
      prepend: () => 'before',
      append: () => 'after',
      'clear-icon': ({ clear }) => {
        return h('button', { onClick: clear }, 'clear')
      },
    },
  })
  const input = wrapper.find('input')

  await input.setValue('1.')
  expect(input.element.value).toBe('1.')
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  expect(wrapper.text()).toContain('before')
  expect(wrapper.text()).toContain('after')
  expect(wrapper.text()).toContain('clear')

  wrapper.unmount()
})

test('input-number clamps and formats values when committing', async () => {
  const wrapper = mount(VarInputNumber, {
    props: {
      defaultValue: 1,
      min: 0,
      max: 2,
      precision: 1,
      formatter: (value) => `$${value}`,
      parser: (value) => value.replace('$', ''),
    },
  })
  const input = wrapper.find('input')

  await input.trigger('focus')
  await input.setValue('$3.26')
  await input.trigger('blur')

  expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([2])
  expect(input.element.value).toBe('$2.0')

  wrapper.unmount()
})
