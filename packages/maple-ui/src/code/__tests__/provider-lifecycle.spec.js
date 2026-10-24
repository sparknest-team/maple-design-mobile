import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Provider from '../../highlighter-provider/HighlighterProvider.vue'
import Code from '../Code.vue'

test('without a highlighter, code stays readable and HTML is escaped', () => {
  const wrapper = mount(Code, { props: { code: ' <img src=x onerror=alert(1)> ' } })
  expect(wrapper.find('pre code').text()).toBe('<img src=x onerror=alert(1)>')
  expect(wrapper.find('img').exists()).toBe(false)
  wrapper.unmount()
})

test('removing the highlighter clears stale markup and ignores an old asynchronous result', async () => {
  let finish
  const highlighter = {
    codeToHtml: () =>
      new Promise((resolve) => {
        finish = resolve
      }),
  }
  const wrapper = mount(Provider, {
    props: { highlighter },
    slots: { default: () => h(Code, { code: 'const current = true' }) },
  })
  await wrapper.setProps({ highlighter: undefined })
  expect(wrapper.find('code').text()).toBe('const current = true')
  finish('<pre><code>obsolete result</code></pre>')
  await flushPromises()
  expect(wrapper.text()).toBe('const current = true')
  wrapper.unmount()
})

test('a rejected optional highlighter leaves safe source visible', async () => {
  const wrapper = mount(Provider, {
    props: { highlighter: { codeToHtml: () => Promise.reject(new Error('grammar unavailable')) } },
    slots: { default: () => h(Code, { code: '<safe>' }) },
  })
  await flushPromises()
  expect(wrapper.find('code').text()).toBe('<safe>')
  wrapper.unmount()
})
