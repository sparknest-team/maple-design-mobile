import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Cascader from '..'
import { delay, trigger } from '../../utils/test'
import VarCascader from '../Cascader'

const options = [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '拱墅区', value: 'gongshu' },
        ],
      },
      {
        label: '宁波市',
        value: 'ningbo',
        children: [{ label: '海曙区', value: 'haishu' }],
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
        children: [{ label: '鼓楼区', value: 'gulou' }],
      },
    ],
  },
]

test('cascader plugin', () => {
  const app = createApp({}).use(Cascader)
  expect(app.component(Cascader.name)).toBeTruthy()
})

test('cascader picker mode confirm', async () => {
  const onUpdateModelValue = vi.fn()
  const wrapper = mount(VarCascader, {
    props: {
      presentation: 'picker',
      modelValue: [],
      options,
      'onUpdate:modelValue': onUpdateModelValue,
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator').trigger('click')
  await delay(300)
  const confirmButton = document.querySelector('.mp-picker__confirm-button')
  expect(confirmButton).toBeTruthy()
  await trigger(confirmButton, 'click')
  await delay(300)

  expect(onUpdateModelValue).toHaveBeenCalled()

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('cascader menu mode select', async () => {
  const onUpdateModelValue = vi.fn((value) => {
    wrapper.setProps({ modelValue: value })
  })
  const wrapper = mount(VarCascader, {
    props: {
      modelValue: [],
      options,
      checkStrictly: true,
      'onUpdate:modelValue': onUpdateModelValue,
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator').trigger('click')
  await delay(16)
  const option = document.querySelector('.mp-cascader__option')
  expect(option).toBeTruthy()
  await trigger(option, 'click')

  expect(onUpdateModelValue).toHaveBeenCalled()

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('cascader menu mode expand and select leaf', async () => {
  const onUpdateModelValue = vi.fn((value) => {
    wrapper.setProps({ modelValue: value })
  })
  const wrapper = mount(VarCascader, {
    props: {
      modelValue: [],
      options,
      'onUpdate:modelValue': onUpdateModelValue,
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator').trigger('click')
  await delay(16)

  // click non-leaf: should expand, not commit
  const firstOption = document.querySelector('.mp-cascader__option')
  await trigger(firstOption, 'click')
  await delay(16)
  expect(onUpdateModelValue).not.toHaveBeenCalled()
  expect(document.querySelectorAll('.mp-cascader__column').length).toBe(2)

  // click city
  const cityOptions = document.querySelectorAll('.mp-cascader__column')[1].querySelectorAll('.mp-cascader__option')
  await trigger(cityOptions[0], 'click')
  await delay(16)
  expect(onUpdateModelValue).not.toHaveBeenCalled()
  expect(document.querySelectorAll('.mp-cascader__column').length).toBe(3)

  // click leaf district
  const districtOptions = document.querySelectorAll('.mp-cascader__column')[2].querySelectorAll('.mp-cascader__option')
  await trigger(districtOptions[0], 'click')
  await delay(16)

  expect(onUpdateModelValue).toHaveBeenCalledWith(['zhejiang', 'hangzhou', 'xihu'])

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('cascader menu multiple shows checkbox', async () => {
  const onUpdateModelValue = vi.fn((value) => {
    wrapper.setProps({ modelValue: value })
  })
  const wrapper = mount(VarCascader, {
    props: {
      modelValue: [],
      options,
      multiple: true,
      'onUpdate:modelValue': onUpdateModelValue,
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator').trigger('click')
  await delay(16)

  expect(document.querySelector('.mp-checkbox')).toBeTruthy()

  // expand to leaf
  await trigger(document.querySelector('.mp-cascader__option'), 'click')
  await delay(16)
  await trigger(document.querySelectorAll('.mp-cascader__column')[1].querySelector('.mp-cascader__option'), 'click')
  await delay(16)
  await trigger(document.querySelectorAll('.mp-cascader__column')[2].querySelector('.mp-cascader__option'), 'click')
  await delay(16)

  expect(onUpdateModelValue).toHaveBeenCalledWith([['zhejiang', 'hangzhou', 'xihu']])

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('cascader picker multiple add and done', async () => {
  const onUpdateModelValue = vi.fn()
  const wrapper = mount(VarCascader, {
    props: {
      presentation: 'picker',
      multiple: true,
      modelValue: [],
      options,
      'onUpdate:modelValue': onUpdateModelValue,
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator').trigger('click')
  await delay(300)

  expect(document.querySelector('.mp-cascader__picker-panel')).toBeTruthy()
  expect(document.querySelector('.mp-cascader__picker-add-button')).toBeTruthy()
  expect(document.querySelector('.mp-cascader__picker-done-button')).toBeTruthy()

  await trigger(document.querySelector('.mp-cascader__picker-add-button'), 'click')
  await delay(300)
  expect(onUpdateModelValue).not.toHaveBeenCalled()
  expect(document.querySelector('.mp-cascader__picker-draft-tag')).toBeTruthy()

  await trigger(document.querySelector('.mp-cascader__picker-done-button'), 'click')
  await delay(300)

  expect(onUpdateModelValue).toHaveBeenCalledWith([['zhejiang', 'hangzhou', 'xihu']])

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('cascader picker multiple cancel discards draft', async () => {
  const onUpdateModelValue = vi.fn()
  const wrapper = mount(VarCascader, {
    props: {
      presentation: 'picker',
      multiple: true,
      modelValue: [],
      options,
      'onUpdate:modelValue': onUpdateModelValue,
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator').trigger('click')
  await delay(300)

  await trigger(document.querySelector('.mp-cascader__picker-add-button'), 'click')
  await delay(300)
  await trigger(document.querySelector('.mp-cascader__picker-cancel-button'), 'click')
  await delay(300)

  expect(onUpdateModelValue).not.toHaveBeenCalled()

  wrapper.unmount()
  document.body.innerHTML = ''
})
