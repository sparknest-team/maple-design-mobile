import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Locale from '../../locale'
import LocaleProvider from '../../locale-provider'
import Header from '../picker-panels/PanelHeader.vue'

const originalLocale = Locale.currentMessage.value.lang
Locale.add('en-US', Locale.enUS)
afterEach(() => Locale.use(originalLocale))
const props = { date: { previewYear: '2025', previewMonth: '02' }, disabled: { left: false, right: false } }

test('header names track global language, panel unit and disabled navigation', async () => {
  Locale.use('zh-CN')
  const owner = mount(Header, { props })
  expect(owner.find('[aria-label="下一月"]').exists()).toBe(true)
  Locale.use('en-US')
  await nextTick()
  await owner.get('[aria-label="Next month"]').trigger('click')
  expect(owner.emitted('check-date')).toEqual([['next']])
  await owner.setProps({ type: 'month' })
  expect(owner.find('[aria-label="Next year"]').exists()).toBe(true)
  await owner.setProps({ type: 'year', disabled: { left: false, right: true } })
  const next = owner.get('[aria-label="Next years"]')
  expect(next.element.disabled).toBe(true)
  await next.trigger('click')
  expect(owner.emitted('check-date')).toHaveLength(1)
  owner.unmount()
})

test('local navigation translation overrides global and missing keys fall back', () => {
  Locale.use('en-US')
  const owner = mount(LocaleProvider, {
    props: { locale: 'custom', messages: { custom: { datePickerNextMonth: 'Local next month' } } },
    slots: { default: () => h(Header, props) },
  })
  expect(owner.find('[aria-label="Local next month"]').exists()).toBe(true)
  expect(owner.find('[aria-label="Previous month"]').exists()).toBe(true)
  owner.unmount()
})
