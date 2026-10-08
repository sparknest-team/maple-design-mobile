import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Form, { FormItem } from '..'
import Input from '../../input'
import VarInput from '../../input/Input'
import { delay } from '../../utils/test'
import VarForm from '../Form'
import VarFormItem from '../FormItem'

test('form-item plugin', () => {
  const app = createApp({}).use(Form)
  expect(app.component(FormItem.name)).toBeTruthy()
})

test('form-item validation', async () => {
  const wrapper = mount({
    components: {
      [VarForm.name]: VarForm,
      [VarFormItem.name]: VarFormItem,
      [VarInput.name]: VarInput,
    },
    data: () => ({
      model: { username: '' },
    }),
    template: `
      <mp-form ref="form" :model="model">
        <mp-form-item
          field="username"
          label="用户名"
          required
          :rules="[(v) => !!v || '不能为空']"
        >
          <mp-input v-model="model.username" />
        </mp-form-item>
      </mp-form>
    `,
  })

  await delay(16)

  const { form } = wrapper.vm.$refs
  await expect(form.validate()).resolves.toEqual({
    username: expect.objectContaining({
      field: 'username',
      message: '用户名不能为空',
      isRequiredError: true,
    }),
  })
  await delay(10)

  expect(wrapper.find('.mp-form-item__label').text()).toContain('用户名')
  expect(wrapper.find('.mp-form-item__asterisk').exists()).toBeTruthy()
  expect(wrapper.find('.mp-form-details__error-message').text()).toBe('用户名不能为空')

  wrapper.vm.model.username = 'maple'
  await expect(form.validate()).resolves.toBeUndefined()
  await delay(10)
  expect(wrapper.find('.mp-form-details__error-message').exists()).toBeFalsy()

  wrapper.unmount()
})

test('clear trigger validates only after clearing', async () => {
  const wrapper = mount({
    components: {
      [VarForm.name]: VarForm,
      [VarFormItem.name]: VarFormItem,
      [VarInput.name]: VarInput,
    },
    data: () => ({ model: { username: 'seed' } }),
    template: `
      <mp-form :model="model">
        <mp-form-item field="username" validate-trigger="clear" :rules="[value => !!value || 'Required']">
          <mp-input v-model="model.username" clearable />
        </mp-form-item>
      </mp-form>
    `,
  })

  await wrapper.find('input').setValue('edited')
  expect(wrapper.find('.mp-form-details__error-message').exists()).toBe(false)
  await wrapper.get('.mp-field-decorator__clear-btn').trigger('click')
  await delay(16)
  expect(wrapper.vm.model.username).toBe('')
  expect(wrapper.find('.mp-form-details__error-message').text()).toBe('Required')
  wrapper.unmount()
})

test('form-item resetFields', async () => {
  const wrapper = mount({
    components: {
      [VarForm.name]: VarForm,
      [VarFormItem.name]: VarFormItem,
      [VarInput.name]: VarInput,
    },
    data: () => ({
      model: { username: 'init' },
    }),
    template: `
      <mp-form ref="form" :model="model">
        <mp-form-item field="username" :rules="[(v) => !!v || '不能为空']">
          <mp-input v-model="model.username" />
        </mp-form-item>
      </mp-form>
    `,
  })

  await delay(16)

  wrapper.vm.model.username = ''
  const { form } = wrapper.vm.$refs
  await form.validate()
  await delay(10)
  expect(wrapper.find('.mp-form-details__error-message').text()).toBe('不能为空')

  form.resetFields()
  await delay(16)
  expect(wrapper.vm.model.username).toBe('init')
  expect(wrapper.find('.mp-form-details__error-message').exists()).toBeFalsy()

  form.setFields({ username: { value: 'server', status: 'error', message: '服务端错误' } })
  await delay(10)
  expect(wrapper.vm.model.username).toBe('server')
  expect(wrapper.find('.mp-form-details__error-message').text()).toBe('服务端错误')

  form.clearValidate('username')
  await delay(10)
  expect(wrapper.find('.mp-form-details__error-message').exists()).toBeFalsy()

  wrapper.unmount()
})

test('form-item outer label disables floating hint', async () => {
  const wrapper = mount({
    components: {
      [VarForm.name]: VarForm,
      [VarFormItem.name]: VarFormItem,
      [VarInput.name]: VarInput,
    },
    data: () => ({
      model: { username: '' },
    }),
    template: `
      <mp-form :model="model">
        <mp-form-item field="username" label="用户名">
          <mp-input v-model="model.username" placeholder="请输入" />
        </mp-form-item>
      </mp-form>
    `,
  })

  await delay(16)
  expect(wrapper.find('.mp-form-item__label').text()).toContain('用户名')
  expect(wrapper.find('.mp-field-decorator__placeholder').exists()).toBeFalsy()
  expect(wrapper.find('.mp-input__inner').attributes('placeholder')).toBe('请输入')

  wrapper.unmount()
})

test('form-item horizontal layout', async () => {
  const wrapper = mount({
    components: {
      [VarForm.name]: VarForm,
      [VarFormItem.name]: VarFormItem,
      [VarInput.name]: VarInput,
    },
    data: () => ({
      model: { username: '' },
    }),
    template: `
      <mp-form :model="model" layout="horizontal">
        <mp-form-item field="username" label="用户名">
          <mp-input v-model="model.username" />
        </mp-form-item>
      </mp-form>
    `,
  })

  await delay(16)
  expect(wrapper.find('.mp-form-item--horizontal').exists()).toBeTruthy()

  wrapper.unmount()
})

test('form and form-item install', () => {
  expect(Form.name).toBe('MpForm')
  expect(FormItem.name).toBe('MpFormItem')
  expect(Input.name).toBe('MpInput')
})
