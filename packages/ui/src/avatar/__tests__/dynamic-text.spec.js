import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Avatar from '../Avatar.vue'

afterEach(() => vi.restoreAllMocks())

test('remeasures updated slot text and restores the scale for short content', async () => {
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(40)
  vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockImplementation(function () {
    return this.textContent.length * 10
  })
  const text = ref('A')
  const owner = mount({ setup: () => () => h(Avatar, null, { default: () => text.value }) })
  await nextTick()
  const content = () => owner.find('span')
  expect(content().element.style.transform).toBe('')
  text.value = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  await nextTick()
  await nextTick()
  await nextTick()
  expect(content().element.style.transform).toBe(`scale(${40 / 268})`)
  text.value = 'B'
  await nextTick()
  await nextTick()
  await nextTick()
  expect(content().element.style.transform).toBe('')
  owner.unmount()
})
