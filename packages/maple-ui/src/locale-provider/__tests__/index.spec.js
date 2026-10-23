import { createApp, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import DatePicker from '../../date/DatePicker.vue'
import Dialog from '../../dialog/Dialog.vue'
import Locale from '../../locale'
import LocaleProvider from '../index'

test('localeProvider component plugin', () => {
  const app = createApp({}).use(LocaleProvider)
  expect(app.component(LocaleProvider.name)).toBeTruthy()
})

test('localeProvider tag', async () => {
  const wrapper = mount(LocaleProvider)
  expect(wrapper.html()).toMatchSnapshot()
  await wrapper.setProps({ tag: 'span' })
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('localeProvider locale', async () => {
  const container = document.createElement('div')
  const wrapper = mount(LocaleProvider, {
    props: {
      messages: {
        'zh-CN': Locale.zhCN,
        'en-US': Locale.enUS,
      },
    },
    slots: {
      default: () =>
        h('div', [
          h(Dialog, { open: true, popupContainer: container }),
          h(DatePicker, { modelValue: '2021-04-08', disableConfirm: false }),
        ]),
    },
  })
  await nextTick()
  expect(container.innerHTML).toMatchSnapshot()
  expect(wrapper.findAll('button').some((button) => button.text() === '确认')).toBe(true)
  expect(wrapper.findAll('button').some((button) => button.text() === '此刻')).toBe(true)
  expect(container.innerHTML).contains('确认')
  expect(container.innerHTML).contains('取消')
  await wrapper.setProps({ locale: 'en-US' })
  expect(container.innerHTML).toMatchSnapshot()
  expect(wrapper.findAll('button').some((button) => button.text() === 'Confirm')).toBe(true)
  expect(wrapper.findAll('button').some((button) => button.text() === 'Now')).toBe(true)
  expect(container.innerHTML).contains('Confirm')
  expect(container.innerHTML).contains('Cancel')

  wrapper.unmount()
})
