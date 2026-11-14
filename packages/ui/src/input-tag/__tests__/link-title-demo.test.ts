import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import { Button } from '../../button'
import { Space } from '../../space'
import LinkTitleDemo from '../example/demos/link-title.vue'
import { InputTag } from '../index'

afterEach(() => vi.useRealTimers())

test('resolves a pasted link and submits the original URL', async () => {
  vi.useFakeTimers()
  const owner = mount(LinkTitleDemo, {
    attachTo: document.body,
    global: { components: { MpInputTag: InputTag, MpButton: Button, MpSpace: Space } },
  })
  const input = owner.get('input')
  input.element.focus()
  // Browsers insert pasted text before dispatching input; JSDOM does not implement that default action.
  await input.trigger('paste', { clipboardData: { getData: () => 'https://vuejs.org' } })
  await input.setValue('https://vuejs.org')
  vi.advanceTimersByTime(300)
  await Promise.resolve()
  vi.advanceTimersByTime(400)
  await Promise.resolve()
  await Promise.resolve()
  await nextTick()
  await nextTick()
  expect(owner.get('.mp-input-tag__tag').text()).toContain('Vue.js')
  await owner.get('.mp-button').trigger('click')
  expect(owner.get('pre').text()).toContain('https://vuejs.org')
  owner.unmount()
})
