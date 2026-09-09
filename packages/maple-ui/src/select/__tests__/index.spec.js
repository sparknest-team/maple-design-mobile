import { createApp, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Select, { Option } from '..'
import { delay, trigger, triggerKeyboard } from '../../utils/test'
import VarOption from '../Option.vue'
import VarSelect from '../Select'

const Wrapper = {
  components: {
    [VarSelect.name]: VarSelect,
    [VarOption.name]: VarOption,
  },
}

test('select plugin', () => {
  const app = createApp({}).use(Select)
  expect(app.component(Select.name)).toBeTruthy()
})

test('option plugin', () => {
  const app = createApp({}).use(Select)
  expect(app.component(Option.name)).toBeTruthy()
})

test('option default slot', () => {
  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      value: '',
    }),
    template: `
      <mp-select v-model="value">
        <mp-option label="eat" />
        <mp-option>
          <template #default="{ selected }">
            <span class="test-default-slot">{{ selected }}</span>
          </template>
        </mp-option>
      </mp-select>
    `,
  })

  expect(document.querySelector('.test-default-slot').textContent).toBe('false')

  wrapper.unmount()
})

test('select variant', () => {
  ;['standard', 'outline'].forEach((variant) => {
    const wrapper = mount(VarSelect, {
      props: {
        value: '',
        variant,
      },
    })

    expect(wrapper.find(`mp-field-decorator--${variant}`)).toBeTruthy()
    switch (variant) {
      case 'standard': {
        expect(
          wrapper.find('.mp-field-decorator__line').wrapperElement.querySelector('.mp-field-decorator__dot'),
        ).toBeTruthy()
        break
      }

      case 'outline': {
        expect(wrapper.find('.mp-field-decorator__line').wrapperElement.querySelector('legend')).toBeTruthy()
        break
      }

      default:
        break
    }

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})

test('select size', async () => {
  const wrapper = mount(VarSelect, {
    props: {
      value: '',
      size: 'sm',
    },
  })

  expect(wrapper.find('.mp-field-decorator--size-sm').exists()).toBeTruthy()
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.setProps({
    size: 'md',
  })

  expect(wrapper.find('.mp-field-decorator--size-sm').exists()).toBeFalsy()

  wrapper.unmount()
})

test('select by label', async () => {
  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      value: '',
    }),
    template: `
      <mp-select v-model="value">
        <mp-option label="eat" />
        <mp-option label="sleep" />
      </mp-select>
    `,
  })

  await wrapper.trigger('click')
  await trigger(document.querySelector('.mp-option'), 'click')
  expect(wrapper.vm.value).toBe('eat')

  wrapper.unmount()
})

test('select by value', async () => {
  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      value: '',
    }),
    template: `
      <mp-select v-model="value">
        <mp-option label="eat" :value="1" />
        <mp-option label="sleep" :value="2" />
      </mp-select>
    `,
  })

  await wrapper.trigger('click')
  await trigger(document.querySelector('.mp-option'), 'click')
  expect(wrapper.vm.value).toBe(1)

  wrapper.unmount()
})

test('select by disabled', async () => {
  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      value: '',
    }),
    template: `
      <mp-select v-model="value">
        <mp-option label="eat" disabled />
        <mp-option label="sleep" disabled />
      </mp-select>
    `,
  })

  await wrapper.trigger('click')
  await trigger(document.querySelector('.mp-option'), 'click')
  expect(wrapper.vm.value).toBe('')

  wrapper.unmount()
})

test('select hint to be false', () => {
  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      value: 'eat',
    }),
    template: `
      <mp-select :hint="false" v-model="value">
        <mp-option label="eat" />
        <mp-option label="sleep" />
      </mp-select>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})

test('select onFocus', async () => {
  const onFocus = vi.fn()

  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      value: '',
    }),
    methods: {
      onFocus,
    },
    template: `
      <mp-select v-model="value" @focus="onFocus">
        <mp-option label="eat" />
        <mp-option label="sleep" />
      </mp-select>
    `,
  })

  await wrapper.trigger('focus')
  expect(onFocus).toHaveBeenCalledTimes(1)

  wrapper.unmount()
})

test('select disabled', async () => {
  const onFocus = vi.fn()
  const onBlur = vi.fn()

  const wrapper = mount(
    {
      ...Wrapper,
      data: () => ({
        disabled: true,
        value: 'sleep',
      }),
      methods: {
        onFocus,
        onBlur,
      },
      template: `
      <div class="container"></div>
      <mp-select
        clearable
        :disabled="disabled"
        v-model="value"
        @focus="onFocus"
        @blur="onBlur"
      >
        <mp-option label="eat" />
        <mp-option label="sleep" />
      </mp-select>
    `,
    },
    { attachTo: document.body },
  )

  await trigger(document.querySelector('.mp-field-decorator'), 'click')
  expect(onFocus).toHaveBeenCalledTimes(0)

  await wrapper.setData({ disabled: false })
  await trigger(document.querySelector('.mp-field-decorator'), 'click')
  await wrapper.setData({ disabled: true })
  await wrapper.find('.container').trigger('click')
  expect(onBlur).toHaveBeenCalledTimes(0)

  await wrapper.setData({ disabled: false })
  await wrapper.trigger('click')
  await wrapper.setData({ disabled: true })
  await trigger(document.querySelector('.mp-option'), 'click')
  expect(wrapper.vm.value).toBe('sleep')

  await wrapper.find('.mp-field-decorator__clear-icon').trigger('click')
  expect(wrapper.vm.value).toBe('sleep')

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('select readonly', async () => {
  const onFocus = vi.fn()
  const onBlur = vi.fn()

  const wrapper = mount(
    {
      ...Wrapper,
      data: () => ({
        readonly: true,
        value: 'sleep',
      }),
      methods: {
        onFocus,
        onBlur,
      },
      template: `
      <div class="container"></div>
      <mp-select
        clearable
        :readonly="readonly"
        v-model="value"
        @focus="onFocus"
        @blur="onBlur"
      >
        <mp-option label="eat" />
        <mp-option label="sleep" />
      </mp-select>
    `,
    },
    { attachTo: document.body },
  )

  await wrapper.trigger('click')
  expect(onFocus).toHaveBeenCalledTimes(0)

  await wrapper.setData({ readonly: false })
  await trigger(document.querySelector('.mp-field-decorator'), 'click')
  await wrapper.setData({ readonly: true })
  await wrapper.find('.container').trigger('click')
  expect(onBlur).toHaveBeenCalledTimes(0)

  await wrapper.setData({ readonly: false })
  await trigger(document.querySelector('.mp-field-decorator'), 'click')
  await wrapper.setData({ readonly: true })
  await trigger(document.querySelector('.mp-option'), 'click')
  expect(wrapper.vm.value).toBe('sleep')

  await wrapper.find('.mp-field-decorator__clear-icon').trigger('click')
  expect(wrapper.vm.value).toBe('sleep')

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('select clear', async () => {
  const onClear = vi.fn()
  const onChange = vi.fn()
  const wrapper = mount(
    {
      ...Wrapper,
      data: () => ({
        value: 'eat',
      }),
      methods: {
        onClear,
        onChange,
      },
      template: `
      <mp-select clearable v-model="value" @clear="onClear" @change="onChange">
        <mp-option label="eat" />
        <mp-option label="sleep" />
      </mp-select>
    `,
    },
    { attachTo: document.body },
  )

  await wrapper.find('.mp-field-decorator__clear-icon').trigger('click')
  expect(wrapper.vm.value).toBe(undefined)

  expect(onClear).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledTimes(1)

  wrapper.unmount()
})

test('select multiple value', async () => {
  const wrapper = mount(
    {
      ...Wrapper,
      data: () => ({
        value: [],
      }),
      template: `
      <mp-select multiple v-model="value">
        <mp-option label="eat" />
        <mp-option label="sleep" />
      </mp-select>
    `,
    },
    { attachTo: document.body },
  )

  await wrapper.trigger('click')

  Array.from(document.querySelectorAll('.mp-option')).forEach((el) => trigger(el, 'click'))
  expect(wrapper.vm.value).toStrictEqual(['eat', 'sleep'])

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('select multiple value in tags', async () => {
  const onClose = vi.fn()
  const onChange = vi.fn()
  const wrapper = mount(
    {
      ...Wrapper,
      data: () => ({
        value: [],
      }),
      methods: {
        onClose,
        onChange,
      },
      template: `
      <mp-select multiple tag v-model="value" @close="onClose" @change="onChange">
        <mp-option label="eat" />
        <mp-option label="sleep" />
      </mp-select>
    `,
    },
    { attachTo: document.body },
  )

  await wrapper.trigger('click')

  Array.from(document.querySelectorAll('.mp-option')).forEach((el) => trigger(el, 'click'))
  expect(wrapper.vm.value).toStrictEqual(['eat', 'sleep'])
  expect(onChange).toHaveBeenCalledTimes(2)
  await delay(16)

  await wrapper.find('.mp-tag__close-btn').trigger('click')
  expect(wrapper.vm.value).toStrictEqual(['sleep'])

  expect(onClose).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledTimes(3)

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('select focus & blur methods', async () => {
  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      value: '',
    }),
    template: `
      <mp-select ref="select" v-model="value">
        <mp-option label="eat" />
        <mp-option label="sleep" />
      </mp-select>
    `,
  })

  const { select } = wrapper.vm.$refs

  select.focus()
  await delay(16)
  expect(wrapper.html()).toMatchSnapshot()

  select.blur()
  await delay(16)
  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})

test('select keyboard select option by space', async () => {
  const wrapper = mount(
    {
      ...Wrapper,
      data: () => ({
        value: '',
      }),
      template: `
      <mp-select v-model="value">
        <mp-option label="eat" />
        <mp-option label="sleep" />
      </mp-select>
    `,
    },
    { attachTo: document.body },
  )

  await trigger(wrapper, 'focus')
  await triggerKeyboard(window, 'keyup', { key: ' ' })
  await triggerKeyboard(window, 'keydown', { key: 'ArrowDown' })
  await triggerKeyboard(document.querySelector('.mp-option'), 'focus')
  await triggerKeyboard(window, 'keyup', { key: ' ' })
  expect(wrapper.vm.value).toBe('eat')

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('select keyboard select option by enter', async () => {
  const wrapper = mount(
    {
      ...Wrapper,
      data: () => ({
        value: '',
      }),
      template: `
      <mp-select v-model="value">
        <mp-option label="eat" />
        <mp-option label="sleep" />
      </mp-select>
    `,
    },
    { attachTo: document.body },
  )

  await trigger(wrapper, 'focus')
  await triggerKeyboard(window, 'keydown', { key: 'Enter' })
  await triggerKeyboard(window, 'keydown', { key: 'ArrowDown' })
  await triggerKeyboard(document.querySelector('.mp-option'), 'focus')
  await triggerKeyboard(window, 'keydown', { key: 'Enter' })
  expect(wrapper.vm.value).toBe('eat')

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('select keyboard close menu by escape', async () => {
  const wrapper = mount(
    {
      ...Wrapper,
      data: () => ({
        value: '',
      }),
      template: `
      <mp-select v-model="value">
        <mp-option label="eat" />
        <mp-option label="sleep" />
      </mp-select>
    `,
    },
    { attachTo: document.body },
  )

  await wrapper.trigger('focus')
  await triggerKeyboard(window, 'keydown', { key: 'Enter' })
  expect(document.querySelector('.mp-trigger__popup').style.display).toBe('')
  await triggerKeyboard(window, 'keydown', { key: 'Escape' })
  expect(document.querySelector('.mp-trigger__popup-wrapper').style.display).toBe('none')

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('select offset-y', async () => {
  const wrapper = mount(
    {
      components: {
        [VarSelect.name]: VarSelect,
        [VarOption.name]: VarOption,
      },
      data: () => ({
        offsetY: 40,
      }),
      template: `
      <mp-select ref="select" offset-y="40">
        <mp-option label="eat" />
        <mp-option label="sleep" />
        <mp-option label="read" />
        <mp-option label="game" />
      </mp-select>
      `,
    },
    { attachTo: document.body },
  )

  const { select } = wrapper.vm.$refs

  select.focus()
  await delay(1000)

  const menu = wrapper.findComponent({ name: 'MpTrigger' })

  expect(menu.vm.offsetY).toBe(40)

  wrapper.unmount()
})

test('select options', async () => {
  const wrapper = mount(
    {
      ...Wrapper,
      data: () => ({
        value: '',
        options: [
          { label: 'eat', value: 1, disabled: true },
          { label: 'sleep', value: 2 },
          { label: 'game', value: 3 },
        ],
      }),
      template: `
      <mp-select v-model="value" :options="options">
      </mp-select>
    `,
    },
    { attachTo: document.body },
  )

  await wrapper.trigger('click')
  const options = document.querySelectorAll('.mp-option')
  await trigger(options[0], 'click')
  expect(wrapper.vm.value).toBe('')

  await trigger(options[1], 'click')
  expect(wrapper.vm.value).toBe(2)

  await trigger(options[2], 'click')
  expect(wrapper.vm.value).toBe(3)

  wrapper.unmount()
})

test('select options multiple', async () => {
  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      value: [],
      options: [
        { label: 'eat', value: 0, disabled: true },
        { label: 'sleep', value: 1 },
        { label: 'game', value: 2 },
      ],
    }),
    template: `
      <mp-select v-model="value" :options="options" multiple>
      </mp-select>
    `,
  })

  await wrapper.trigger('click')
  const options = document.querySelectorAll('.mp-option')
  await trigger(options[0], 'click')
  expect(wrapper.vm.value).toStrictEqual([])

  await trigger(options[1], 'click')
  expect(wrapper.vm.value).toStrictEqual([1])

  await trigger(options[2], 'click')
  expect(wrapper.vm.value).toStrictEqual([1, 2])

  wrapper.unmount()
})

test('select field-names label', async () => {
  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      value: '',
      options: [
        { name: 'eat', value: 1, disabled: true },
        { name: 'sleep', value: 2 },
        { name: 'game', value: 3 },
      ],
    }),
    template: `
      <mp-select v-model="value" :options="options" :field-names="{ label: 'name' }">
      </mp-select>
    `,
  })

  await wrapper.trigger('click')
  const options = document.querySelectorAll('.mp-option')
  await trigger(options[0], 'click')
  expect(wrapper.vm.value).toBe('')

  await trigger(options[1], 'click')
  expect(wrapper.vm.value).toBe(2)

  await trigger(options[2], 'click')
  expect(wrapper.vm.value).toBe(3)

  wrapper.unmount()
})

test('select field-names value', async () => {
  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      value: '',
      options: [
        { label: 'eat', id: 1, disabled: true },
        { label: 'sleep', id: 2 },
        { label: 'game', id: 3 },
      ],
    }),
    template: `
      <mp-select v-model="value" :options="options" :field-names="{ value: 'id' }">
      </mp-select>
    `,
  })

  await wrapper.trigger('click')
  const options = document.querySelectorAll('.mp-option')
  await trigger(options[0], 'click')
  expect(wrapper.vm.value).toBe('')

  await trigger(options[1], 'click')
  expect(wrapper.vm.value).toBe(2)

  await trigger(options[2], 'click')
  expect(wrapper.vm.value).toBe(3)

  wrapper.unmount()
})

describe('test select component slots', () => {
  test('select clear icon slot', async () => {
    const wrapper = mount(VarSelect, {
      props: {
        clearable: true,
        modelValue: 'value',
      },
      slots: {
        'clear-icon': ({ clear }) => h('button', { class: 'custom-clear-icon', onClick: () => clear() }, 'Clear'),
      },
    })

    await wrapper.find('.custom-clear-icon').trigger('click')
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })

  test('select suffix slot', () => {
    const wrapper = mount(VarSelect, {
      props: {
        clearable: true,
        modelValue: 'value',
      },
      slots: {
        suffix: () => 'suffix',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })

  test('select prefix slot', () => {
    const wrapper = mount(VarSelect, {
      props: {
        clearable: true,
        modelValue: 'value',
      },
      slots: {
        prefix: () => 'prefix',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })
})
