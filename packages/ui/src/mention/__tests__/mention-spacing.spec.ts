import { defineComponent, h, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Mention from '..'

const scroll = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTo')
beforeEach(() => {
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: vi.fn() })
})
afterEach(() => {
  if (scroll) {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', scroll)
  } else {
    Reflect.deleteProperty(HTMLElement.prototype, 'scrollTo')
  }
})

for (const type of ['input', 'textarea'] as const) {
  for (const fallback of [false, true]) {
    test(`${type} adds one space after ${fallback ? 'fallback' : 'selected'} mention`, async () => {
      const value = ref('')
      const owner = mount(
        defineComponent(
          () => () =>
            h(Mention, {
              type,
              atomic: true,
              modelValue: value.value,
              options: fallback ? [] : [{ value: 'xiaoming', label: '小明' }],
              fallbackOption: fallback ? (id) => ({ value: id, label: '小明' }) : undefined,
              'onUpdate:modelValue': (next) => {
                value.value = next ?? ''
              },
            }),
        ),
        { attachTo: document.body },
      )
      try {
        const input = owner.get(type)
        const element = input.element as HTMLInputElement | HTMLTextAreaElement
        element.focus()
        await input.setValue('@xiaoming')
        element.setSelectionRange(element.value.length, element.value.length)
        await flushPromises()
        await input.trigger('keydown', { key: 'Enter' })
        await flushPromises()
        expect(value.value).toBe('@[xiaoming] ')
        expect(element.value).toBe('@小明 ')
        expect(element.selectionStart).toBe(element.value.length)
      } finally {
        owner.unmount()
      }
    })
  }
}

test('existing whitespace after a mention is not duplicated', async () => {
  const value = ref('@al next')
  const owner = mount(
    defineComponent(
      () => () =>
        h(Mention, {
          atomic: true,
          modelValue: value.value,
          options: [{ value: 'alice', label: 'Alice' }],
          'onUpdate:modelValue': (next) => {
            value.value = next ?? ''
          },
        }),
    ),
    { attachTo: document.body },
  )
  try {
    const input = owner.get('input')
    const element = input.element as HTMLInputElement
    element.focus()
    element.value = '@alice next'
    element.setSelectionRange(6, 6)
    await input.trigger('input')
    await flushPromises()
    await input.trigger('keydown', { key: 'Enter' })
    await flushPromises()
    expect(value.value).toBe('@[alice] next')
    expect(element.value).toBe('@Alice next')
    expect(element.selectionStart).toBe(7)
  } finally {
    owner.unmount()
  }
})

test('plain text mention also ends with a space', async () => {
  const owner = mount(Mention, { attachTo: document.body, props: { options: ['alice'] } })
  try {
    const input = owner.get('input')
    const element = input.element as HTMLInputElement
    element.focus()
    await input.setValue('@ali')
    element.setSelectionRange(4, 4)
    await flushPromises()
    await input.trigger('keydown', { key: 'Enter' })
    await flushPromises()
    expect(element.value).toBe('@alice ')
    expect(element.selectionStart).toBe(element.value.length)
  } finally {
    owner.unmount()
  }
})
