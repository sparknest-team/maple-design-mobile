import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Form from '..'
import VarAutoComplete from '../../auto-complete/AutoComplete.vue'
import VarCheckbox from '../../checkbox/Checkbox'
import VarCounter from '../../counter/Counter'
import VarInput from '../../input/Input'
import VarOption from '../../option/Option'
import VarRadio from '../../radio/Radio'
import VarRate from '../../rate/Rate'
import VarSelect from '../../select/Select'
import VarSlider from '../../slider/Slider'
import VarSwitch from '../../switch/Switch'
import VarUploader from '../../uploader/Uploader'
import { delay, mockScrollTo, trigger } from '../../utils/test'
import VarForm from '../Form'

mockScrollTo()

test('form plugin', () => {
  const app = createApp({}).use(Form)
  expect(app.component(Form.name)).toBeTruthy()
})

const expectValidate = async (form, wrapper, message) => {
  await form.validate()
  await delay(10)
  expect(wrapper.find('.mp-form-details__error-message').text()).toBe(message)
  expect(wrapper.html()).toMatchSnapshot()
}

const expectReset = async (form, wrapper) => {
  form.reset()
  await delay(16)
  expect(wrapper.find('.mp-form-details__error-message').exists()).toBeFalsy()
  expect(wrapper.html()).toMatchSnapshot()
}

const Wrapper = {
  components: {
    [VarForm.name]: VarForm,
    [VarInput.name]: VarInput,
    [VarSelect.name]: VarSelect,
    [VarOption.name]: VarOption,
    [VarRadio.name]: VarRadio,
    [VarCheckbox.name]: VarCheckbox,
    [VarCounter.name]: VarCounter,
    [VarRate.name]: VarRate,
    [VarUploader.name]: VarUploader,
    [VarSwitch.name]: VarSwitch,
    [VarSlider.name]: VarSlider,
    [VarAutoComplete.name]: VarAutoComplete,
  },
}

test('form with input', async () => {
  const onClick = vi.fn()
  const onInput = vi.fn()
  const onChange = vi.fn()

  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      disabled: true,
      readonly: false,
      value: undefined,
    }),
    methods: {
      onClick,
      onInput,
      onChange,
    },
    template: `
      <mp-form ref="form" scroll-to-error="start" :disabled="disabled" :readonly="readonly">
        <mp-input
          clearable
          :rules="[v => !!v || 'It can not be not empty']"
          v-model="value"
          @click="onClick"
          @input="onInput"
          @change="onChange"
        />
      </mp-form>
    `,
  })

  const triggerEvents = async () => {
    await wrapper.find('.mp-input__input').trigger('input')
    await wrapper.find('.mp-input__input').trigger('change')
    await wrapper.find('.mp-field-decorator').trigger('click')
  }

  expect(wrapper.html()).toMatchSnapshot()

  await triggerEvents()
  expect(onInput).toHaveBeenCalledTimes(0)
  expect(onClick).toHaveBeenCalledTimes(0)
  expect(onChange).toHaveBeenCalledTimes(0)

  await wrapper.setData({ disabled: false, readonly: true })
  expect(wrapper.html()).toMatchSnapshot()

  await triggerEvents()
  expect(onInput).toHaveBeenCalledTimes(1)
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledTimes(1)

  const { form } = wrapper.vm.$refs
  await expectValidate(form, wrapper, 'It can not be not empty')
  await expectReset(form, wrapper)

  wrapper.unmount()
})

test('form with select', async () => {
  const onClear = vi.fn()
  const onClick = vi.fn()
  const onClose = vi.fn()

  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      disabled: true,
      readonly: false,
      value: ['option1'],
    }),
    methods: {
      onClear,
      onClick,
      onClose,
    },
    template: `
      <mp-form ref="form" :disabled="disabled" :readonly="readonly">
        <mp-select
          clearable
          chip
          multiple
          :rules="[v => v.length > 1 || 'You must choose one option at least']"
          v-model="value"
          @click="onClick"
          @clear="onClear"
          @close="onClose"
        >
          <mp-option label="option1"/>
          <mp-option label="option2"/>
        </mp-select>
      </mp-form>
    `,
  })

  await delay(16)
  expect(wrapper.html()).toMatchSnapshot()

  const triggerEvents = async () => {
    await wrapper.find('.mp-chip--close').trigger('click')
    await wrapper.find('.mp-field-decorator__clear-icon').trigger('click')
    await wrapper.find('.mp-field-decorator').trigger('click')
  }

  await triggerEvents()
  expect(onClick).toHaveBeenCalledTimes(0)
  expect(onClear).toHaveBeenCalledTimes(0)
  expect(onClose).toHaveBeenCalledTimes(0)

  await wrapper.setData({ disabled: false, readonly: true })
  expect(wrapper.html()).toMatchSnapshot()

  await triggerEvents()
  expect(onClick).toHaveBeenCalledTimes(2)
  expect(onClear).toHaveBeenCalledTimes(0)
  expect(onClose).toHaveBeenCalledTimes(0)

  const { form } = wrapper.vm.$refs
  await expectValidate(form, wrapper, 'You must choose one option at least')
  await expectReset(form, wrapper)

  wrapper.unmount()
})

test('form with radio', async () => {
  const onChange = vi.fn()
  const onClick = vi.fn()

  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      disabled: true,
      readonly: false,
      value: false,
    }),
    methods: {
      onChange,
      onClick,
    },
    template: `
      <mp-form ref="form" :disabled="disabled" :readonly="readonly">
        <mp-radio
          :rules="[v => !!v || 'You must choose one option']"
          v-model="value"
          @change="onChange"
          @click="onClick"
        />
      </mp-form>
    `,
  })
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.find('.mp-radio').trigger('click')
  expect(wrapper.vm.value).toBe(false)
  expect(onClick).toHaveBeenCalledTimes(0)
  expect(onChange).toHaveBeenCalledTimes(0)

  await wrapper.setData({ disabled: false, readonly: true })
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.find('.mp-radio').trigger('click')
  expect(wrapper.vm.value).toBe(false)
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledTimes(0)

  const { form } = wrapper.vm.$refs
  await expectValidate(form, wrapper, 'You must choose one option')
  await expectReset(form, wrapper)

  wrapper.unmount()
})

test('form with checkbox', async () => {
  const onChange = vi.fn()
  const onClick = vi.fn()

  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      disabled: true,
      readonly: false,
      value: false,
    }),
    methods: {
      onChange,
      onClick,
    },
    template: `
      <mp-form ref="form" :disabled="disabled" :readonly="readonly">
        <mp-checkbox
          :rules="[v => !!v || 'You must choose one option']"
          v-model="value"
          @change="onChange"
          @click="onClick"
        />
      </mp-form>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.find('.mp-checkbox').trigger('click')
  expect(wrapper.vm.value).toBe(false)
  expect(onClick).toHaveBeenCalledTimes(0)
  expect(onChange).toHaveBeenCalledTimes(0)

  await wrapper.setData({ disabled: false, readonly: true })
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.find('.mp-checkbox').trigger('click')
  expect(wrapper.vm.value).toBe(false)
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledTimes(0)

  const { form } = wrapper.vm.$refs
  await expectValidate(form, wrapper, 'You must choose one option')
  await expectReset(form, wrapper)

  wrapper.unmount()
})

test('form with counter', async () => {
  const onIncrement = vi.fn()
  const onDecrement = vi.fn()
  const onChange = vi.fn()

  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      disabled: true,
      readonly: false,
      value: 0,
    }),
    methods: {
      onIncrement,
      onDecrement,
      onChange,
    },
    template: `
      <mp-form ref="form" :disabled="disabled" :readonly="readonly">
        <mp-counter
          ref="counter"
          :rules="[v => v > 0 || 'The value must be more than zero']"
          v-model="value"
          @change="onChange"
          @increment="onIncrement"
          @decrement="onDecrement"
        />
      </mp-form>
    `,
  })

  const triggerEvents = async () => {
    await wrapper.find('.mp-counter__input').setValue('1')
    await wrapper.find('.mp-counter__input').trigger('change')
    await wrapper.find('.mp-counter__decrement-button').trigger('click')
    await wrapper.find('.mp-counter__increment-button').trigger('click')
  }

  expect(wrapper.html()).toMatchSnapshot()

  await triggerEvents()
  expect(onChange).toHaveBeenCalledTimes(0)
  expect(onIncrement).toHaveBeenCalledTimes(0)
  expect(onDecrement).toHaveBeenCalledTimes(0)

  await wrapper.setData({ disabled: false, readonly: true })
  expect(onChange).toHaveBeenCalledTimes(0)
  expect(onIncrement).toHaveBeenCalledTimes(0)
  expect(onDecrement).toHaveBeenCalledTimes(0)
  expect(wrapper.html()).toMatchSnapshot()

  const { form } = wrapper.vm.$refs
  await expectValidate(form, wrapper, 'The value must be more than zero')
  await expectReset(form, wrapper)

  wrapper.unmount()
})

test('form with rate', async () => {
  const onChange = vi.fn()

  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      disabled: true,
      readonly: false,
      value: 0,
    }),
    methods: {
      onChange,
    },
    template: `
      <mp-form ref="form" :disabled="disabled" :readonly="readonly">
        <mp-rate
          :rules="[v => v > 0 || 'The value must be more than zero']"
          v-model="value"
          @change="onChange"
        />
      </mp-form>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.find('.mp-rate__content').trigger('click')
  expect(wrapper.vm.value).toBe(0)
  expect(onChange).toHaveBeenCalledTimes(0)

  await wrapper.setData({ disabled: false, readonly: true })

  await wrapper.find('.mp-rate__content').trigger('click')
  expect(wrapper.vm.value).toBe(0)
  expect(onChange).toHaveBeenCalledTimes(0)

  const { form } = wrapper.vm.$refs
  await expectValidate(form, wrapper, 'The value must be more than zero')
  await expectReset(form, wrapper)

  wrapper.unmount()
})

test('form with uploader', async () => {
  const onAfterRead = vi.fn()

  const createEvent = (filename) => ({
    target: {
      files: [new File([], filename)],
    },
  })

  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      disabled: true,
      readonly: false,
      value: [],
    }),
    methods: {
      onAfterRead,
    },
    template: `
      <mp-form ref="form" :disabled="disabled" :readonly="readonly">
        <mp-uploader
          ref="uploader"
          :rules="[v => v.length > 0 || 'You must upload one file at least']"
          v-model="value"
          @after-read="onAfterRead"
        />
      </mp-form>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.vm.$refs.uploader.handleChange(createEvent('cat.png'))
  expect(onAfterRead).toHaveBeenCalledTimes(0)

  await wrapper.setData({ disabled: false, readonly: true })
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.vm.$refs.uploader.handleChange(createEvent('cat.png'))
  expect(onAfterRead).toHaveBeenCalledTimes(0)

  const { form } = wrapper.vm.$refs
  await expectValidate(form, wrapper, 'You must upload one file at least')
  await expectReset(form, wrapper)

  wrapper.unmount()
})

test('form with switch', async () => {
  const onChange = vi.fn()

  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      disabled: true,
      readonly: false,
      value: false,
    }),
    methods: {
      onChange,
    },
    template: `
      <mp-form ref="form" :disabled="disabled" :readonly="readonly">
        <mp-switch
          :rules="[v => v === true || 'It should be truthy']"
          v-model="value"
          @change="onChange"
        />
      </mp-form>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.find('.mp-switch__block').trigger('click')
  expect(wrapper.vm.value).toBe(false)
  expect(onChange).toHaveBeenCalledTimes(0)

  await wrapper.setData({ disabled: false, readonly: true })

  await wrapper.find('.mp-switch__block').trigger('click')
  expect(wrapper.vm.value).toBe(false)
  expect(onChange).toHaveBeenCalledTimes(0)

  const { form } = wrapper.vm.$refs
  await expectValidate(form, wrapper, 'It should be truthy')
  await expectReset(form, wrapper)

  await wrapper.setData({ disabled: false, readonly: false })

  await wrapper.find('.mp-switch__block').trigger('click')
  expect(wrapper.vm.value).toBe(true)
  expect(onChange).toHaveBeenCalledTimes(1)

  wrapper.unmount()
})

test('form with slider', async () => {
  const onChange = vi.fn()
  const onStart = vi.fn()
  const onEnd = vi.fn()

  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      disabled: true,
      readonly: false,
      value: 5,
    }),
    methods: {
      onChange,
      onStart,
      onEnd,
    },
    template: `
      <mp-form ref="form" :disabled="disabled" :readonly="readonly">
        <mp-slider
          v-model="value"
          :rules="[(v) => v > 10 || 'It must be more than ten']"
          @change="onChange"
          @start="onStart"
          @end="onEnd"
        />
      </mp-form>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  const el = wrapper.find('.mp-slider__horizontal-thumb-label')
  await trigger(el, 'touchstart', 0, 0)
  await trigger(document, 'touchmove', 20, 0)
  await trigger(document, 'touchend', 40, 0)
  expect(wrapper.vm.value).toBe(5)

  await wrapper.setData({ disabled: false, readonly: true })
  await trigger(el, 'touchstart', 20, 0)
  await trigger(document, 'touchmove', 10, 0)
  await trigger(document, 'touchend', 70, 0)
  expect(wrapper.vm.value).toBe(5)

  expect(onChange).toHaveBeenCalledTimes(0)
  expect(onStart).toHaveBeenCalledTimes(0)
  expect(onEnd).toHaveBeenCalledTimes(0)

  const { form } = wrapper.vm.$refs
  await expectValidate(form, wrapper, 'It must be more than ten')
  await expectReset(form, wrapper)

  await wrapper.setData({ disabled: false, readonly: false })
  await trigger(el, 'touchstart', 20, 0)
  await trigger(document, 'touchmove', 10, 0)
  await trigger(document, 'touchend', 70, 0)
  expect(wrapper.vm.value).not.toBe(5)

  expect(onChange).toHaveBeenCalled()
  expect(onStart).toHaveBeenCalledTimes(1)
  expect(onEnd).toHaveBeenCalledTimes(1)

  wrapper.unmount()
})

test('form events', async () => {
  const onSubmit = vi.fn()
  const onReset = vi.fn()

  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      value: undefined,
    }),
    methods: {
      onSubmit,
      onReset,
    },
    template: `
      <mp-form @submit="onSubmit" @reset="onReset">
        <mp-input
          clearable
          :rules="[v => !!v || 'It can not be not empty']"
          v-model="value"
        />
      </mp-form>
    `,
  })

  await delay(16)

  await wrapper.trigger('submit')
  await delay(16)
  expect(wrapper.html()).toMatchSnapshot()
  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(onSubmit).toHaveBeenLastCalledWith(false)

  await wrapper.trigger('reset')
  await delay(16)
  expect(wrapper.html()).toMatchSnapshot()
  expect(onReset).toHaveBeenCalledTimes(1)

  wrapper.unmount()
})

test('form with auto-complete', async () => {
  const wrapper = mount({
    ...Wrapper,
    data: () => ({
      disabled: false,
      readonly: false,
      value: '',
    }),
    template: `
      <mp-form ref="form" scroll-to-error="start" :disabled="disabled" :readonly="readonly">
        <mp-auto-complete
          :rules="[v => !!v || '不能为空']"
          v-model="value"
        />
      </mp-form>
    `,
  })
  await delay(16)
  const { form } = wrapper.vm.$refs
  await expectValidate(form, wrapper, '不能为空')
  await expectReset(form, wrapper)

  wrapper.unmount()
})
