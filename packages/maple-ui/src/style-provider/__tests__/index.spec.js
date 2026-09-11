import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { delay } from '../../utils/test'
import StyleProvider from '../index'

test('styleProvider component plugin', () => {
  const app = createApp({}).use(StyleProvider)
  expect(app.component(StyleProvider.name)).toBeTruthy()
})

test('styleProvider functional', async () => {
  StyleProvider.setStyleVars({
    '--mp-cell-font-size': '30px',
  })

  await delay(0)
  expect(getComputedStyle(document.documentElement).getPropertyValue('--mp-cell-font-size')).toBe('30px')
})

test('styleProvider functional omits unchanged vars', async () => {
  const baseline = document.createElement('style')
  baseline.textContent = ':root { --mp-diff-same: 1px; --mp-diff-other: 2px; }'
  document.head.appendChild(baseline)

  StyleProvider.setStyleVars({
    '--mp-diff-same': '1px',
    '--mp-diff-changed': '3px',
  })

  await delay(0)

  const injected = document.head.querySelector('#maple-style-vars')
  expect(injected).toBeTruthy()
  expect(injected.textContent).not.toContain('--mp-diff-same')
  expect(injected.textContent).toContain('--mp-diff-changed:3px')
  expect(getComputedStyle(document.documentElement).getPropertyValue('--mp-diff-changed').trim()).toBe('3px')

  StyleProvider.setStyleVars(null)
  baseline.remove()
})

test('styleProvider component', async () => {
  const wrapper = mount(StyleProvider)

  const el = wrapper.find('.mp-style-provider')
  expect(el.exists()).toBe(true)

  await wrapper.setProps({
    styleVars: {
      '--mp-cell-font-size': '30px',
    },
  })
  expect(el.attributes('style')).toBe('--mp-cell-font-size: 30px;')
  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})

test('styleProvider tag', () => {
  const wrapper = mount(StyleProvider, { props: { tag: 'span' } })
  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})
