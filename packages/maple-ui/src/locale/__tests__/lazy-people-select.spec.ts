import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('PeopleSelect retains action names when locale loads later', async () => {
  const PeopleSelect = (await import('../../people-select/index')).default
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const props = {
    readPretty: true,
    modelValue: 'a',
    options: [{ value: 'a', label: 'Alice' }],
    showPhone: true,
    showChat: true,
    call: () => {},
    chat: () => {},
  }
  const wrapper = mount(PeopleSelect, { props })
  try {
    await nextTick()
    expect(wrapper.find('[aria-label="拨打电话"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="聊天"]').exists()).toBe(true)
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(wrapper.find('[aria-label="Call"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Chat"]').exists()).toBe(true)
    locale.add('people-partial', {})
    locale.use('people-partial')
    await nextTick()
    expect(wrapper.find('[aria-label="Call"]').exists()).toBe(false)
    expect(wrapper.find('[aria-label="Chat"]').exists()).toBe(false)
    locale.merge('people-partial', { 'peopleSelect.call': '', 'peopleSelect.chat': 'Custom' })
    await nextTick()
    expect(wrapper.find('[aria-label=""]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Custom"]').exists()).toBe(true)
    locale.use('zh-CN')
    await nextTick()
    expect(wrapper.find('[aria-label="聊天"]').exists()).toBe(true)
    const Provider = (await import('../../locale-provider/LocaleProvider.vue')).default
    const scoped = mount({
      render: () =>
        h(
          Provider,
          { locale: 'local', messages: { local: { 'peopleSelect.call': 'Scoped' } } },
          { default: () => h(PeopleSelect, props) },
        ),
    })
    try {
      await nextTick()
      expect(scoped.find('[aria-label="Scoped"]').exists()).toBe(true)
    } finally {
      scoped.unmount()
    }
  } finally {
    wrapper.unmount()
  }
}, 60000)
