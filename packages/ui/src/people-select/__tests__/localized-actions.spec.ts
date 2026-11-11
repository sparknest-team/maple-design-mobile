import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import PeopleSelect from '..'
import { add, use } from '../../locale'
import en from '../../locale/en-US'

test('reading action accessible names follow live locale', async () => {
  add('en-US', en)
  use('zh-CN')
  const owner = mount(PeopleSelect, {
    props: {
      readPretty: true,
      modelValue: 'a',
      options: [{ value: 'a', label: 'Alice' }],
      showPhone: true,
      showChat: true,
      call: () => {},
      chat: () => {},
    },
  })
  try {
    await flushPromises()
    expect(owner.find('button[aria-label="拨打电话"]').exists()).toBe(true)
    expect(owner.find('button[aria-label="聊天"]').exists()).toBe(true)
    use('en-US')
    await flushPromises()
    expect(owner.find('button[aria-label="Call"]').exists()).toBe(true)
    expect(owner.find('button[aria-label="Chat"]').exists()).toBe(true)
  } finally {
    owner.unmount()
    use('zh-CN')
  }
})
