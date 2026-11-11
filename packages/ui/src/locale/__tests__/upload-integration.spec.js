import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Locale from '..'
import Upload from '../../upload'
import enUS from '../en-US'
import zhCN from '../zh-CN'

Locale.add('en-US', enUS)
Locale.add('zh-CN', zhCN)
const wrappers = []
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  Locale.use('zh-CN')
})

test('Upload follows global locale without a component dictionary', async () => {
  Locale.use('zh-CN')
  const wrapper = mount(Upload, { props: { editMode: 'direct' } })
  wrappers.push(wrapper)
  expect(wrapper.text()).toContain('上传')
  Locale.use('en-US')
  await nextTick()
  expect(wrapper.text()).toContain('Upload')
})
