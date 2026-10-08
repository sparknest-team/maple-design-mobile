import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Form from '..'
import VarAutoComplete from '../../auto-complete/auto-complete'
import VarCheckbox from '../../checkbox/Checkbox'
import VarCounter from '../../counter/Counter'
import VarFormItem from '../../form/FormItem'
import VarInput from '../../input/Input'
import VarRadio from '../../radio/Radio'
import VarRate from '../../rate'
import VarOption from '../../select/Option.vue'
import VarSelect from '../../select/select'
import VarSlider from '../../slider/Slider'
import VarSwitch from '../../switch/Switch'
import VarUpload from '../../upload/Upload'
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
  form.resetFields()
  await delay(16)
  expect(wrapper.find('.mp-form-details__error-message').exists()).toBeFalsy()
  expect(wrapper.html()).toMatchSnapshot()
}

const Wrapper = {
  components: {
    [VarForm.name]: VarForm,
    [VarFormItem.name]: VarFormItem,
    [VarInput.name]: VarInput,
    [VarSelect.name]: VarSelect,
    [VarOption.name]: VarOption,
    [VarRadio.name]: VarRadio,
    [VarCheckbox.name]: VarCheckbox,
    [VarCounter.name]: VarCounter,
    [VarRate.name]: VarRate,
    [VarUpload.name]: VarUpload,
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
      model: { value: undefined },
    }),
    methods: {
      onClick,
      onInput,
      onChange,
    },
    template: `
      <mp-form ref="form" scroll-to-error="start" :model="model" :disabled="disabled" :readonly="readonly">
        <mp-form-item field="value" :rules="[v => !!v || 'It can not be not empty']">
          <mp-input
            clearable
            v-model="model.value"
            @click="onClick"
            @input="onInput"
            @change="onChange"
          />
        </mp-form-item>
      </mp-form>
    `,
  })

  const triggerEvents = async () => {
    await wrapper.find('.mp-input__inner').trigger('input')
    await wrapper.find('.mp-input__inner').trigger('change')
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
  expect(onInput).toHaveBeenCalledTimes(0)
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledTimes(0)

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
      model: { value: ['option1'] },
    }),
    methods: {
      onClear,
      onClick,
      onClose,
    },
    template: `
      <mp-form ref="form" :model="model" :disabled="disabled" :readonly="readonly">
        <mp-form-item field="value" :rules="[v => v.length > 1 || 'You must choose one option at least']">
          <mp-select
            clearable
            show-tags
            multiple
            v-model="model.value"
            @click="onClick"
            @clear="onClear"
            @remove="onClose"
          >
            <mp-option label="option1"/>
            <mp-option label="option2"/>
          </mp-select>
        </mp-form-item>
      </mp-form>
    `,
  })

  await delay(16)
  expect(wrapper.html()).toMatchSnapshot()

  const triggerEvents = async () => {
    expect(wrapper.find('.mp-tag__close-btn').exists()).toBe(false)
    expect(wrapper.find('.mp-field-decorator__clear-btn').exists()).toBe(false)
    await wrapper.find('.mp-field-decorator').trigger('click')
  }

  await triggerEvents()
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(wrapper.vm.model.value).toEqual(['option1'])
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
      model: { value: false },
    }),
    methods: {
      onChange,
      onClick,
    },
    template: `
      <mp-form ref="form" :model="model" :disabled="disabled" :readonly="readonly">
        <mp-form-item field="value" :rules="[v => !!v || 'You must choose one option']">
          <mp-radio
            v-model="model.value"
            @change="onChange"
            @click="onClick"
          />
        </mp-form-item>
      </mp-form>
    `,
  })
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.find('.mp-radio').trigger('click')
  expect(wrapper.vm.model.value).toBe(false)
  expect(onClick).toHaveBeenCalledTimes(0)
  expect(onChange).toHaveBeenCalledTimes(0)

  await wrapper.setData({ disabled: false, readonly: true })
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.find('.mp-radio').trigger('click')
  expect(wrapper.vm.model.value).toBe(false)
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
      model: { value: false },
    }),
    methods: {
      onChange,
      onClick,
    },
    template: `
      <mp-form ref="form" :model="model" :disabled="disabled" :readonly="readonly">
        <mp-form-item field="value" :rules="[v => !!v || 'You must choose one option']">
          <mp-checkbox
            v-model="model.value"
            @change="onChange"
            @click="onClick"
          />
        </mp-form-item>
      </mp-form>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.find('.mp-checkbox').trigger('click')
  expect(wrapper.vm.model.value).toBe(false)
  expect(onClick).toHaveBeenCalledTimes(0)
  expect(onChange).toHaveBeenCalledTimes(0)

  await wrapper.setData({ disabled: false, readonly: true })
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.find('.mp-checkbox').trigger('click')
  expect(wrapper.vm.model.value).toBe(false)
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
      model: { value: 0 },
    }),
    methods: {
      onIncrement,
      onDecrement,
      onChange,
    },
    template: `
      <mp-form ref="form" :model="model" :disabled="disabled" :readonly="readonly">
        <mp-form-item field="value" :rules="[v => v > 0 || 'The value must be more than zero']">
          <mp-counter
            ref="counter"
            v-model="model.value"
            @change="onChange"
            @increment="onIncrement"
            @decrement="onDecrement"
          />
        </mp-form-item>
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
      model: { value: 0 },
    }),
    methods: {
      onChange,
    },
    template: `
      <mp-form ref="form" :model="model" :disabled="disabled" :readonly="readonly">
        <mp-form-item field="value" :rules="[v => v > 0 || 'The value must be more than zero']">
          <mp-rate
            v-model="model.value"
            @change="onChange"
          />
        </mp-form-item>
      </mp-form>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.find('.mp-rate__content').trigger('click')
  expect(wrapper.vm.model.value).toBe(0)
  expect(onChange).toHaveBeenCalledTimes(0)

  await wrapper.setData({ disabled: false, readonly: true })

  await wrapper.find('.mp-rate__content').trigger('click')
  expect(wrapper.vm.model.value).toBe(0)
  expect(onChange).toHaveBeenCalledTimes(0)

  const { form } = wrapper.vm.$refs
  await expectValidate(form, wrapper, 'The value must be more than zero')
  await expectReset(form, wrapper)

  wrapper.unmount()
})

test('form with upload', async () => {
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
      model: { value: [] },
    }),
    methods: {
      onAfterRead,
    },
    template: `
      <mp-form ref="form" :model="model" :disabled="disabled" :readonly="readonly">
        <mp-form-item field="value" :rules="[v => v.length > 0 || 'You must upload one file at least']">
          <mp-upload
            ref="upload"
            v-model="model.value"
            @after-read="onAfterRead"
          />
        </mp-form-item>
      </mp-form>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.vm.$refs.upload.handleChange(createEvent('cat.png'))
  expect(onAfterRead).toHaveBeenCalledTimes(0)

  await wrapper.setData({ disabled: false, readonly: true })
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.vm.$refs.upload.handleChange(createEvent('cat.png'))
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
      model: { value: false },
    }),
    methods: {
      onChange,
    },
    template: `
      <mp-form ref="form" :model="model" :disabled="disabled" :readonly="readonly">
        <mp-form-item field="value" :rules="[v => v === true || 'It should be truthy']">
          <mp-switch
            v-model="model.value"
            @change="onChange"
          />
        </mp-form-item>
      </mp-form>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.find('[role="switch"]').trigger('click')
  expect(wrapper.vm.model.value).toBe(false)
  expect(onChange).toHaveBeenCalledTimes(0)

  await wrapper.setData({ disabled: false, readonly: true })

  await wrapper.find('[role="switch"]').trigger('click')
  expect(wrapper.vm.model.value).toBe(false)
  expect(onChange).toHaveBeenCalledTimes(0)

  const { form } = wrapper.vm.$refs
  await expectValidate(form, wrapper, 'It should be truthy')
  await expectReset(form, wrapper)

  await wrapper.setData({ disabled: false, readonly: false })

  await wrapper.find('[role="switch"]').trigger('click')
  expect(wrapper.vm.model.value).toBe(true)
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
      model: { value: 5 },
    }),
    methods: {
      onChange,
      onStart,
      onEnd,
    },
    template: `
      <mp-form ref="form" :model="model" :disabled="disabled" :readonly="readonly">
        <mp-form-item field="value" :rules="[(v) => v > 10 || 'It must be more than ten']">
          <mp-slider
            v-model="model.value"
            @change="onChange"
            @start="onStart"
            @end="onEnd"
          />
        </mp-form-item>
      </mp-form>
    `,
  })

  expect(wrapper.html()).toMatchSnapshot()

  const el = wrapper.find('.mp-slider__horizontal-thumb-label')
  await trigger(el, 'touchstart', 0, 0)
  await trigger(document, 'touchmove', 20, 0)
  await trigger(document, 'touchend', 40, 0)
  expect(wrapper.vm.model.value).toBe(5)

  await wrapper.setData({ disabled: false, readonly: true })
  await trigger(el, 'touchstart', 20, 0)
  await trigger(document, 'touchmove', 10, 0)
  await trigger(document, 'touchend', 70, 0)
  expect(wrapper.vm.model.value).toBe(5)

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
  expect(wrapper.vm.model.value).not.toBe(5)

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
      model: { value: undefined },
    }),
    methods: {
      onSubmit,
      onReset,
    },
    template: `
      <mp-form :model="model" @submit="onSubmit" @reset="onReset">
        <mp-form-item field="value" :rules="[v => !!v || 'It can not be not empty']">
          <mp-input
            clearable
            v-model="model.value"
          />
        </mp-form-item>
      </mp-form>
    `,
  })

  await delay(16)

  await wrapper.trigger('submit')
  await delay(16)
  expect(wrapper.html()).toMatchSnapshot()
  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(onSubmit).toHaveBeenLastCalledWith(
    expect.objectContaining({
      values: wrapper.vm.model,
      errors: expect.objectContaining({ value: expect.objectContaining({ field: 'value' }) }),
    }),
    expect.any(Event),
  )

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
      model: { value: '' },
    }),
    template: `
      <mp-form ref="form" scroll-to-error="start" :model="model" :disabled="disabled" :readonly="readonly">
        <mp-form-item field="value" :rules="[v => !!v || '不能为空']">
          <mp-auto-complete
            v-model="model.value"
          />
        </mp-form-item>
      </mp-form>
    `,
  })
  await delay(16)
  const { form } = wrapper.vm.$refs
  await expectValidate(form, wrapper, '不能为空')
  await expectReset(form, wrapper)

  wrapper.unmount()
})
