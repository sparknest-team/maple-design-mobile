import { createApp, h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import CheckboxGroup from '..'
import Checkbox from '../../checkbox'
import VarCheckbox from '../../checkbox/Checkbox'
import { delay, trigger, triggerKeyboard } from '../../utils/test'
import VarCheckboxGroup from '../CheckboxGroup'

test('checkbox group plugin', () => {
  const app = createApp({}).use(CheckboxGroup)
  expect(app.component(CheckboxGroup.name)).toBeTruthy()
})

test('checkbox plugin', () => {
  const app = createApp({}).use(Checkbox)
  expect(app.component(Checkbox.name)).toBeTruthy()
})

test('checkbox check value', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

  const wrapper = mount(VarCheckbox, {
    props: {
      modelValue: false,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.find('.mp-checkbox').trigger('click')
  expect(onUpdateModelValue).lastCalledWith(true)
  expect(wrapper.props('modelValue')).toBe(true)

  await wrapper.find('.mp-checkbox').trigger('click')
  expect(onUpdateModelValue).lastCalledWith(false)
  expect(wrapper.props('modelValue')).toBe(false)

  wrapper.unmount()
})

test('checkbox check value with custom value', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

  const wrapper = mount(VarCheckbox, {
    props: {
      modelValue: 0,
      uncheckedValue: 0,
      checkedValue: 1,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.find('.mp-checkbox').trigger('click')
  expect(onUpdateModelValue).lastCalledWith(1)
  expect(wrapper.props('modelValue')).toBe(1)

  wrapper.unmount()
})

test('checkbox onClick & onChange', async () => {
  const onClick = vi.fn()
  const onChange = vi.fn()

  const wrapper = mount(VarCheckbox, {
    props: {
      modelValue: false,
      onClick,
      onChange,
    },
  })

  await wrapper.find('.mp-checkbox').trigger('click')
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(onChange).lastCalledWith(true, false)

  wrapper.unmount()
})

test('checkbox toggle method', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

  const wrapper = mount(VarCheckbox, {
    props: {
      modelValue: false,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  wrapper.vm.toggle()
  await delay(16)

  expect(onUpdateModelValue).lastCalledWith(true)
  expect(wrapper.props('modelValue')).toBe(true)

  wrapper.unmount()
})

test('checkbox disabled', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
  const onClick = vi.fn()
  const onChange = vi.fn()

  const wrapper = mount(VarCheckbox, {
    props: {
      modelValue: false,
      disabled: true,
      onClick,
      onChange,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.find('.mp-checkbox').trigger('click')

  expect(onUpdateModelValue).toHaveBeenCalledTimes(0)
  expect(onClick).toHaveBeenCalledTimes(0)
  expect(onChange).toHaveBeenCalledTimes(0)
  expect(wrapper.props('modelValue')).toBe(false)

  wrapper.unmount()
})

test('checkbox readonly', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
  const onClick = vi.fn()
  const onChange = vi.fn()

  const wrapper = mount(VarCheckbox, {
    props: {
      modelValue: false,
      readonly: true,
      onClick,
      onChange,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.find('.mp-checkbox').trigger('click')

  expect(onUpdateModelValue).toHaveBeenCalledTimes(0)
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledTimes(0)
  expect(wrapper.props('modelValue')).toBe(false)

  wrapper.unmount()
})

test('checkbox indeterminate', async () => {
  const onChange = vi.fn()
  const wrapper = mount(VarCheckbox, {
    props: {
      modelValue: false,
      indeterminate: true,
      onChange,
    },
  })

  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.find('.mp-checkbox').trigger('click')
  expect(onChange).lastCalledWith(false, false)
  wrapper.unmount()
})

test('checkbox with checkbox group', async () => {
  const wrapper = mount({
    components: {
      [VarCheckboxGroup.name]: VarCheckboxGroup,
      [VarCheckbox.name]: VarCheckbox,
    },
    data: () => ({
      value: [],
    }),
    template: `
      <mp-checkbox-group v-model="value">
        <mp-checkbox :checked-value="1" />
        <mp-checkbox :checked-value="2" />
      </mp-checkbox-group>
    `,
  })

  await wrapper.find('.mp-checkbox').trigger('click')
  expect(wrapper.vm.value).toStrictEqual([1])
  await wrapper.find('.mp-checkbox').trigger('click')
  expect(wrapper.vm.value).toStrictEqual([])

  wrapper.unmount()
})

test('radio default slot', () => {
  const wrapper = mount(VarCheckbox, {
    slots: {
      default: ({ checked }) => h('span', { class: 'test-default-slot' }, checked),
    },
  })

  expect(wrapper.find('.test-default-slot').text()).toBe('false')

  wrapper.unmount()
})

test('checkbox group max', async () => {
  const wrapper = mount({
    components: {
      [VarCheckboxGroup.name]: VarCheckboxGroup,
      [VarCheckbox.name]: VarCheckbox,
    },
    data: () => ({
      value: [],
    }),
    template: `
      <mp-checkbox-group :max="1" v-model="value">
        <mp-checkbox :checked-value="1" />
        <mp-checkbox :checked-value="2" />
      </mp-checkbox-group>
    `,
  })

  const checkboxes = wrapper.findAll('.mp-checkbox')

  await checkboxes[0].trigger('click')
  expect(wrapper.vm.value).toStrictEqual([1])

  await checkboxes[1].trigger('click')
  expect(wrapper.vm.value).toStrictEqual([1])

  wrapper.unmount()
})

test('checkbox group checkAll & inverseAll methods', async () => {
  const wrapper = mount({
    components: {
      [VarCheckboxGroup.name]: VarCheckboxGroup,
      [VarCheckbox.name]: VarCheckbox,
    },
    data: () => ({
      value: [1],
    }),
    template: `
      <mp-checkbox-group ref="checkboxGroup" v-model="value">
        <mp-checkbox :checked-value="1" />
        <mp-checkbox :checked-value="2" />
      </mp-checkbox-group>
    `,
  })

  await delay(16)
  const { checkboxGroup } = wrapper.vm.$refs

  checkboxGroup.inverseAll()
  await delay(16)
  expect(wrapper.vm.value).toStrictEqual([2])

  checkboxGroup.checkAll()
  await delay(16)
  expect(wrapper.vm.value).toStrictEqual([1, 2])

  wrapper.unmount()
})

test('checkbox group layout direction', () => {
  const wrapper = mount({
    components: {
      [VarCheckboxGroup.name]: VarCheckboxGroup,
      [VarCheckbox.name]: VarCheckbox,
    },
    data: () => ({
      value: [],
    }),
    template: `
      <mp-checkbox-group direction="vertical" v-model="value">
        <mp-checkbox :checked-value="1" />
        <mp-checkbox :checked-value="2" />
      </mp-checkbox-group>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('checkbox group options', async () => {
  const wrapper = mount({
    components: {
      [VarCheckboxGroup.name]: VarCheckboxGroup,
      [VarCheckbox.name]: VarCheckbox,
    },
    data: () => ({
      value: [],
      options: [
        { label: 'eat', value: 0, disabled: true },
        { label: 'sleep', value: 1 },
        { label: 'game', value: 2 },
      ],
    }),
    template: `
      <mp-checkbox-group v-model="value" :options="options">
      </mp-checkbox-group>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  const children = wrapper.findAll('.mp-checkbox')
  await trigger(children[0], 'click')
  expect(wrapper.vm.value).toStrictEqual([])

  await trigger(children[1], 'click')
  expect(wrapper.vm.value).toStrictEqual([1])

  await trigger(children[2], 'click')
  expect(wrapper.vm.value).toStrictEqual([1, 2])

  await trigger(children[2], 'click')
  expect(wrapper.vm.value).toStrictEqual([1])

  wrapper.unmount()
})

test('checkbox group label-key', async () => {
  const wrapper = mount({
    components: {
      [VarCheckboxGroup.name]: VarCheckboxGroup,
      [VarCheckbox.name]: VarCheckbox,
    },
    data: () => ({
      value: [],
      options: [
        { name: 'eat', value: 0, disabled: true },
        { name: 'sleep', value: 1 },
        { name: 'game', value: 2 },
      ],
      labelKey: 'name',
    }),
    template: `
      <mp-checkbox-group v-model="value" :options="options" :label-key="labelKey">
      </mp-checkbox-group>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  const children = wrapper.findAll('.mp-checkbox')
  await trigger(children[0], 'click')
  expect(wrapper.vm.value).toStrictEqual([])

  await trigger(children[1], 'click')
  expect(wrapper.vm.value).toStrictEqual([1])

  await trigger(children[2], 'click')
  expect(wrapper.vm.value).toStrictEqual([1, 2])

  await trigger(children[2], 'click')
  expect(wrapper.vm.value).toStrictEqual([1])

  wrapper.unmount()
})

test('checkbox group value-key', async () => {
  const wrapper = mount({
    components: {
      [VarCheckboxGroup.name]: VarCheckboxGroup,
      [VarCheckbox.name]: VarCheckbox,
    },
    data: () => ({
      value: [],
      options: [
        { label: 'eat', id: 0, disabled: true },
        { label: 'sleep', id: 1 },
        { label: 'game', id: 2 },
      ],
      valueKey: 'id',
    }),
    template: `
      <mp-checkbox-group v-model="value" :options="options" :value-key="valueKey">
      </mp-checkbox-group>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  const children = wrapper.findAll('.mp-checkbox')
  await trigger(children[0], 'click')
  expect(wrapper.vm.value).toStrictEqual([])

  await trigger(children[1], 'click')
  expect(wrapper.vm.value).toStrictEqual([1])

  await trigger(children[2], 'click')
  expect(wrapper.vm.value).toStrictEqual([1, 2])

  await trigger(children[2], 'click')
  expect(wrapper.vm.value).toStrictEqual([1])

  wrapper.unmount()
})

test('checkbox group label is VNode', async () => {
  const wrapper = mount({
    components: {
      [VarCheckboxGroup.name]: VarCheckboxGroup,
      [VarCheckbox.name]: VarCheckbox,
    },
    data: () => ({
      value: [],
      options: [
        { name: h('h1', 'eat'), id: 0, disabled: true },
        { name: h('h2', 'sleep'), id: 1 },
        { name: h('h3', 'game'), id: 2 },
      ],
      valueKey: 'id',
      labelKey: 'name',
    }),
    template: `
      <mp-checkbox-group v-model="value" :options="options" :label-key="labelKey" :value-key="valueKey">
      </mp-checkbox-group>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  const children = wrapper.findAll('.mp-checkbox')
  await trigger(children[0], 'click')
  expect(wrapper.vm.value).toStrictEqual([])

  await trigger(children[1], 'click')
  expect(wrapper.vm.value).toStrictEqual([1])

  await trigger(children[2], 'click')
  expect(wrapper.vm.value).toStrictEqual([1, 2])

  await trigger(children[2], 'click')
  expect(wrapper.vm.value).toStrictEqual([1])

  wrapper.unmount()
})

test('checkbox group label is function', async () => {
  const formatLabel = (option, checked) => `${option.id}-${checked}`
  const wrapper = mount({
    components: {
      [VarCheckboxGroup.name]: VarCheckboxGroup,
      [VarCheckbox.name]: VarCheckbox,
    },
    data: () => ({
      value: [],
      options: [
        { name: formatLabel, id: 0, disabled: true },
        { name: formatLabel, id: 1 },
        { name: formatLabel, id: 2 },
      ],
      valueKey: 'id',
      labelKey: 'name',
    }),
    template: `
      <mp-checkbox-group v-model="value" :options="options" :label-key="labelKey" :value-key="valueKey">
      </mp-checkbox-group>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  const children = wrapper.findAll('.mp-checkbox')
  await trigger(children[0], 'click')
  expect(wrapper.vm.value).toStrictEqual([])

  await trigger(children[1], 'click')
  expect(wrapper.vm.value).toStrictEqual([1])
  expect(wrapper.html()).toMatchSnapshot()

  await trigger(children[2], 'click')
  expect(wrapper.vm.value).toStrictEqual([1, 2])
  expect(wrapper.html()).toMatchSnapshot()

  await trigger(children[2], 'click')
  expect(wrapper.vm.value).toStrictEqual([1])
  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})

test('checkbox keyboard Enter', async () => {
  const wrapper = mount({
    components: {
      [VarCheckboxGroup.name]: VarCheckboxGroup,
      [VarCheckbox.name]: VarCheckbox,
    },
    data: () => ({
      value: [],
    }),
    template: `
          <mp-checkbox-group v-model="value">
            <mp-checkbox :checked-value="1" >eat</mp-checkbox>
            <mp-checkbox :checked-value="2" >sleep</mp-checkbox>
          </mp-checkbox-group>
        `,
  })

  const children = wrapper.findAllComponents({ name: 'mp-checkbox' })
  await trigger(children[0].find('.mp-checkbox__action'), 'focus')
  await triggerKeyboard(window, 'keydown', { key: 'Enter' })
  expect(wrapper.vm.value).toStrictEqual([1])

  await trigger(children[1].find('.mp-checkbox__action'), 'focus')
  await triggerKeyboard(window, 'keyup', { key: ' ' })

  expect(wrapper.vm.value).toStrictEqual([1, 2])

  await triggerKeyboard(window, 'keydown', { key: 'Enter' })
  expect(wrapper.vm.value).toStrictEqual([1])

  wrapper.unmount()
})
