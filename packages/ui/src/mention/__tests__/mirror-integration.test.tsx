import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Mention from '../mention'

test('actual Mention/Textarea/Select composition follows text and zero scroll origin', async () => {
  const descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTo')
  const calls: number[][] = []
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
    configurable: true,
    value(this: HTMLElement, left: number, top: number) {
      if (this.classList.contains('mp-mention-measure')) {
        calls.push([left, top])
      }
    },
  })
  const owner = mount(Mention, { attachTo: document.body, props: { type: 'textarea', options: ['alice'] } })
  try {
    const input = owner.get('textarea')
    const element = input.element as HTMLTextAreaElement
    element.value = '@al'
    element.selectionStart = 3
    element.scrollTop = 24
    await input.trigger('input')
    await nextTick()
    await nextTick()
    expect(owner.find('.mp-mention-measure').exists()).toBe(true)
    expect(calls).toContainEqual([0, 24])
    calls.length = 0
    element.value = '@ali'
    element.selectionStart = 4
    element.scrollTop = 0
    await input.trigger('input')
    await nextTick()
    await nextTick()
    expect(calls).toContainEqual([0, 0])
  } finally {
    owner.unmount()
    if (descriptor) {
      Object.defineProperty(HTMLElement.prototype, 'scrollTo', descriptor)
    } else {
      Reflect.deleteProperty(HTMLElement.prototype, 'scrollTo')
    }
  }
})
