import { createApp, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Radio, { RadioGroup } from '..'
import { delay, trigger } from '../../utils/test'
import VarRadio from '../Radio'
import VarRadioGroup from '../RadioGroup'

test('radio group plugin', () => {
  const app = createApp({}).use(Radio)
  expect(app.component(RadioGroup.name)).toBeTruthy()
})

test('radio plugin', () => {
  const app = createApp({}).use(Radio)
  expect(app.component(Radio.name)).toBeTruthy()
})

test('radio check value', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

  const wrapper = mount(VarRadio, {
    props: { editMode: 'direct', modelValue: false, 'onUpdate:modelValue': onUpdateModelValue },
  })

  await wrapper.find('.mp-radio').trigger('click')
  expect(onUpdateModelValue).lastCalledWith(true)
  expect(wrapper.props('modelValue')).toBe(true)

  await wrapper.find('.mp-radio').trigger('click')
  expect(onUpdateModelValue).toHaveBeenCalledTimes(1)
  expect(wrapper.props('modelValue')).toBe(true)

  wrapper.unmount()
})

test('radio check value with custom value', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

  const wrapper = mount(VarRadio, {
    props: { editMode: 'direct', modelValue: 0, value: 1, 'onUpdate:modelValue': onUpdateModelValue },
  })

  await wrapper.find('.mp-radio').trigger('click')
  expect(onUpdateModelValue).lastCalledWith(1)
  expect(wrapper.props('modelValue')).toBe(1)

  wrapper.unmount()
})

test('radio onClick & onChange', async () => {
  const onClick = vi.fn()
  const onChange = vi.fn()

  const wrapper = mount(VarRadio, {
    props: { editMode: 'direct', modelValue: false, onClick, onChange },
  })

  await wrapper.find('.mp-radio').trigger('click')
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(onChange).lastCalledWith(true, expect.any(Event))

  wrapper.unmount()
})

test('radio select method', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

  const wrapper = mount(VarRadio, {
    props: { editMode: 'direct', modelValue: false, 'onUpdate:modelValue': onUpdateModelValue },
  })

  wrapper.vm.select()
  await delay(16)

  expect(onUpdateModelValue).lastCalledWith(true)
  expect(wrapper.props('modelValue')).toBe(true)

  wrapper.unmount()
})

test('radio disabled', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
  const onClick = vi.fn()
  const onChange = vi.fn()

  const wrapper = mount(VarRadio, {
    props: {
      editMode: 'direct',
      modelValue: false,
      disabled: true,
      onClick,
      onChange,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.find('.mp-radio').trigger('click')

  expect(onUpdateModelValue).toHaveBeenCalledTimes(0)
  expect(onClick).toHaveBeenCalledTimes(0)
  expect(onChange).toHaveBeenCalledTimes(0)
  expect(wrapper.props('modelValue')).toBe(false)

  wrapper.unmount()
})

test('radio readonly', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
  const onClick = vi.fn()
  const onChange = vi.fn()

  const wrapper = mount(VarRadio, {
    props: {
      editMode: 'direct',
      modelValue: false,
      readonly: true,
      onClick,
      onChange,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.find('.mp-radio').trigger('click')

  expect(onUpdateModelValue).toHaveBeenCalledTimes(0)
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledTimes(0)
  expect(wrapper.props('modelValue')).toBe(false)

  wrapper.unmount()
})

test('radio with radio group', async () => {
  const wrapper = mount({
    components: {
      [VarRadioGroup.name]: VarRadioGroup,
      [VarRadio.name]: VarRadio,
    },
    data: () => ({
      value: 2,
    }),
    template: `
      <mp-radio-group edit-mode="direct" v-model="value">
        <mp-radio edit-mode="direct" :value="1" />
        <mp-radio edit-mode="direct" :value="2" />
      </mp-radio-group>
    `,
  })

  await wrapper.find('.mp-radio').trigger('click')
  expect(wrapper.vm.value).toBe(1)

  await wrapper.find('.mp-radio').trigger('click')
  expect(wrapper.vm.value).toBe(1)

  wrapper.unmount()
})

test('radio default slot', () => {
  const wrapper = mount(VarRadio, {
    props: { editMode: 'direct' },
    slots: {
      default: ({ checked }) => h('span', { class: 'test-default-slot' }, checked),
    },
  })

  expect(wrapper.find('.test-default-slot').text()).toBe('false')

  wrapper.unmount()
})

test('radio group layout direction', async () => {
  const wrapper = mount({
    components: {
      [VarRadioGroup.name]: VarRadioGroup,
      [VarRadio.name]: VarRadio,
    },
    data: () => ({
      value: 2,
    }),
    template: `
      <mp-radio-group edit-mode="direct" orientation="vertical" v-model="value">
        <mp-radio edit-mode="direct" :value="1" />
        <mp-radio edit-mode="direct" :value="2" />
      </mp-radio-group>
    `,
  })

  await nextTick()
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('radio group options', async () => {
  const wrapper = mount({
    components: {
      [VarRadioGroup.name]: VarRadioGroup,
      [VarRadio.name]: VarRadio,
    },
    data: () => ({
      value: null,
      options: [
        { label: 'eat', value: 0 },
        { label: 'sleep', value: 1 },
        { label: 'game', value: 2, disabled: true },
      ],
    }),
    template: `
      <mp-radio-group edit-mode="direct" v-model="value" :options="options">
      </mp-radio-group>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  const children = wrapper.findAll('.mp-radio')

  expect(wrapper.vm.value).toStrictEqual(null)

  await trigger(children[0].find('input'), 'click')
  expect(wrapper.vm.value).toStrictEqual(0)

  await trigger(children[1].find('input'), 'click')
  expect(wrapper.vm.value).toStrictEqual(1)

  await trigger(children[2].find('input'), 'click')
  expect(wrapper.vm.value).toStrictEqual(1)

  wrapper.unmount()
})

test('radio accessibility', async () => {
  const wrapper = mount({
    components: {
      [VarRadioGroup.name]: VarRadioGroup,
      [VarRadio.name]: VarRadio,
    },
    data: () => ({
      value: null,
      options: [
        { label: 'eat', value: 0 },
        { label: 'sleep', value: 1 },
      ],
    }),
    template: `
      <mp-radio-group edit-mode="direct" v-model="value" :options="options" aria-label="Radio Group">
      </mp-radio-group>
    `,
  })

  const group = wrapper.find('.mp-radio-group')
  expect(group.attributes('role')).toBe('radiogroup')
  expect(group.attributes('aria-label')).toBe('Radio Group')

  const children = wrapper.findAll('.mp-radio')
  const option = children[0]

  await trigger(option.find('input'), 'click')

  expect(option.find('input').attributes('aria-checked')).toBe('true')

  wrapper.unmount()
})

test('radio group field-names label', async () => {
  const wrapper = mount({
    components: {
      [VarRadioGroup.name]: VarRadioGroup,
      [VarRadio.name]: VarRadio,
    },
    data: () => ({
      value: null,
      options: [
        { name: 'eat', value: 0 },
        { name: 'sleep', value: 1 },
        { name: 'game', value: 2, disabled: true },
      ],
      fieldNames: { label: 'name' },
    }),
    template: `
      <mp-radio-group edit-mode="direct" v-model="value" :options="options" :field-names="fieldNames">
      </mp-radio-group>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  const children = wrapper.findAll('.mp-radio')

  expect(wrapper.vm.value).toStrictEqual(null)

  await trigger(children[0].find('input'), 'click')
  expect(wrapper.vm.value).toStrictEqual(0)

  await trigger(children[1].find('input'), 'click')
  expect(wrapper.vm.value).toStrictEqual(1)

  await trigger(children[2].find('input'), 'click')
  expect(wrapper.vm.value).toStrictEqual(1)

  wrapper.unmount()
})

test('radio group field-names value', async () => {
  const wrapper = mount({
    components: {
      [VarRadioGroup.name]: VarRadioGroup,
      [VarRadio.name]: VarRadio,
    },
    data: () => ({
      value: null,
      options: [
        { label: 'eat', id: 0 },
        { label: 'sleep', id: 1 },
        { label: 'game', id: 2, disabled: true },
      ],
      fieldNames: { value: 'id' },
    }),
    template: `
      <mp-radio-group edit-mode="direct" v-model="value" :options="options" :field-names="fieldNames">
      </mp-radio-group>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  const children = wrapper.findAll('.mp-radio')

  expect(wrapper.vm.value).toStrictEqual(null)

  await trigger(children[0].find('input'), 'click')
  expect(wrapper.vm.value).toStrictEqual(0)

  await trigger(children[1].find('input'), 'click')
  expect(wrapper.vm.value).toStrictEqual(1)

  await trigger(children[2].find('input'), 'click')
  expect(wrapper.vm.value).toStrictEqual(1)

  wrapper.unmount()
})

test('radio group label is VNode', async () => {
  const wrapper = mount({
    components: {
      [VarRadioGroup.name]: VarRadioGroup,
      [VarRadio.name]: VarRadio,
    },
    data: () => ({
      value: null,
      options: [
        { name: h('h1', 'eat'), id: 0 },
        { name: h('h2', 'sleep'), id: 1 },
        { name: h('h3', 'game'), id: 2, disabled: true },
      ],
      fieldNames: { label: 'name', value: 'id' },
    }),
    template: `
      <mp-radio-group edit-mode="direct" v-model="value" :options="options" :field-names="fieldNames">
      </mp-radio-group>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  const children = wrapper.findAll('.mp-radio')

  expect(wrapper.vm.value).toStrictEqual(null)

  await trigger(children[0].find('input'), 'click')
  expect(wrapper.vm.value).toStrictEqual(0)

  await trigger(children[1].find('input'), 'click')
  expect(wrapper.vm.value).toStrictEqual(1)

  await trigger(children[2].find('input'), 'click')
  expect(wrapper.vm.value).toStrictEqual(1)

  wrapper.unmount()
})

test('radio group label is function', async () => {
  const formatLabel = (option, checked) => `${option.id}-${checked}`
  const wrapper = mount({
    components: {
      [VarRadioGroup.name]: VarRadioGroup,
      [VarRadio.name]: VarRadio,
    },
    data: () => ({
      value: null,
      options: [
        { name: formatLabel, id: 0 },
        { name: formatLabel, id: 1 },
        { name: formatLabel, id: 2, disabled: true },
      ],
      fieldNames: { label: 'name', value: 'id' },
    }),
    template: `
      <mp-radio-group edit-mode="direct" v-model="value" :options="options" :field-names="fieldNames">
      </mp-radio-group>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  const children = wrapper.findAll('.mp-radio')

  expect(wrapper.vm.value).toStrictEqual(null)

  await trigger(children[0].find('input'), 'click')
  expect(wrapper.vm.value).toStrictEqual(0)

  await trigger(children[1].find('input'), 'click')
  expect(wrapper.vm.value).toStrictEqual(1)
  expect(wrapper.html()).toMatchSnapshot()

  await trigger(children[2].find('input'), 'click')
  expect(wrapper.vm.value).toStrictEqual(1)
  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})

test('radio keyboard Enter', async () => {
  const wrapper = mount({
    components: {
      [VarRadioGroup.name]: VarRadioGroup,
      [VarRadio.name]: VarRadio,
    },
    data: () => ({
      value: 1,
    }),
    template: `
          <mp-radio-group edit-mode="direct" v-model="value">
            <mp-radio edit-mode="direct" :value="1" >eat</mp-radio>
            <mp-radio edit-mode="direct" :value="2" >sleep</mp-radio>
          </mp-radio-group>
        `,
  })

  const children = wrapper.findAllComponents({ name: 'mp-radio' })
  await trigger(children[0].find('input[type="radio"]'), 'focus')
  await children[0].find('input[type="radio"]').trigger('keydown', { key: 'Enter' })
  expect(wrapper.vm.value).toBe(1)

  await trigger(children[1].find('input[type="radio"]'), 'focus')
  await children[1].find('input[type="radio"]').trigger('keydown', { key: ' ' })
  await children[1].find('input[type="radio"]').trigger('keyup', { key: ' ' })

  expect(wrapper.vm.value).toBe(2)
  wrapper.unmount()
})

test('radio group keyboard Arrow', async () => {
  const wrapper = mount({
    components: {
      [VarRadioGroup.name]: VarRadioGroup,
      [VarRadio.name]: VarRadio,
    },
    data: () => ({
      value: 1,
    }),
    template: `
          <mp-radio-group edit-mode="direct" v-model="value">
            <mp-radio edit-mode="direct" :value="1" >est</mp-radio>
            <mp-radio edit-mode="direct" :value="2" >sleep</mp-radio>
          </mp-radio-group>
        `,
  })

  const children = wrapper.findAllComponents({ name: 'mp-radio' })
  await trigger(children[0].find('input[type="radio"]'), 'focus')

  await children[0].find('input[type="radio"]').trigger('keydown', { key: 'ArrowRight' })
  await trigger(children[0].find('input[type="radio"]'), 'blur')
  await trigger(children[1].find('input[type="radio"]'), 'focus')
  expect(wrapper.vm.value).toBe(2)

  await children[1].find('input[type="radio"]').trigger('keydown', { key: 'ArrowRight' })
  await trigger(children[1].find('input[type="radio"]'), 'blur')
  await trigger(children[0].find('input[type="radio"]'), 'focus')
  expect(wrapper.vm.value).toBe(1)

  await children[0].find('input[type="radio"]').trigger('keydown', { key: 'ArrowLeft' })
  await trigger(children[0].find('input[type="radio"]'), 'blur')
  await trigger(children[1].find('input[type="radio"]'), 'focus')
  expect(wrapper.vm.value).toBe(2)

  await children[1].find('input[type="radio"]').trigger('keydown', { key: 'ArrowUp' })
  await trigger(children[1].find('input[type="radio"]'), 'blur')
  await trigger(children[0].find('input[type="radio"]'), 'focus')
  expect(wrapper.vm.value).toBe(1)

  wrapper.unmount()
})
