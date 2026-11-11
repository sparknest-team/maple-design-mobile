import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import ThemeProvider from '../index'

test('themeProvider component plugin', () => {
  const app = createApp({}).use(ThemeProvider)
  expect(app.component(ThemeProvider.name)).toBeTruthy()
})

test('themeProvider component', async () => {
  const wrapper = mount(ThemeProvider)

  const el = wrapper.find('.mp-theme-provider')
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

test('themeProvider tag', () => {
  const wrapper = mount(ThemeProvider, { props: { tag: 'span' } })
  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})
