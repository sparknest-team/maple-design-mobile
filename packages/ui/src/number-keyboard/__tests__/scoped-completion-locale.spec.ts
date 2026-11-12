import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import LocaleProvider from '../../locale-provider'
import NumberKeyboard from '../NumberKeyboard.vue'

test('completion text follows the nearest locale and preserves an explicit override', async () => {
  const label = ref('Finish locally')
  const override = ref<string | undefined>()
  const owner = mount(
    {
      render: () =>
        h(
          LocaleProvider,
          {
            messages: { 'zh-CN': { cascaderPickerDoneButtonText: label.value } },
          },
          {
            default: () =>
              h(NumberKeyboard, {
                open: true,
                theme: 'custom',
                popupContainer: false,
                closeButtonText: override.value,
              }),
          },
        ),
    },
    { attachTo: document.body },
  )
  try {
    const button = () => owner.get('.mp-number-keyboard__key--close')
    expect(button().text()).toBe('Finish locally')
    label.value = 'Finish updated'
    await nextTick()
    expect(button().text()).toBe('Finish updated')
    override.value = 'Explicit'
    await nextTick()
    expect(button().text()).toBe('Explicit')
    override.value = undefined
    await nextTick()
    expect(button().text()).toBe('Finish updated')
  } finally {
    owner.unmount()
  }
})

test('completion text resolves nested, missing, empty and global translations', async () => {
  const locale = await import('../../locale')
  const parent = ref<string | undefined>('Parent done')
  const child = ref<string | undefined>()
  const messages = (value: string | undefined) => ({
    'zh-CN': value === undefined ? {} : { cascaderPickerDoneButtonText: value },
  })
  const owner = mount(
    {
      render: () =>
        h(
          LocaleProvider,
          { messages: messages(parent.value) },
          {
            default: () =>
              h(
                LocaleProvider,
                { messages: messages(child.value) },
                {
                  default: () => h(NumberKeyboard, { open: true, theme: 'custom', popupContainer: false }),
                },
              ),
          },
        ),
    },
    { attachTo: document.body },
  )
  try {
    const button = () => owner.get('.mp-number-keyboard__key--close')
    expect(button().text()).toBe('Parent done')
    child.value = 'Child done'
    await nextTick()
    expect(button().text()).toBe('Child done')
    child.value = ''
    await nextTick()
    expect(button().text()).toBe('')
    child.value = undefined
    parent.value = undefined
    await nextTick()
    expect(button().text()).toBe('完成')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(button().text()).toBe('Done')
  } finally {
    locale.use('zh-CN')
    owner.unmount()
  }
})
