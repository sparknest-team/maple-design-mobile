import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import NoticeBar from '..'
import VarNoticeBar from '../NoticeBar'

test('notice-bar plugin', () => {
  const app = createApp({}).use(NoticeBar)
  expect(app.component(NoticeBar.name)).toBeTruthy()
})

describe('notice-bar', () => {
  test('renders text and type', () => {
    const wrapper = mount(VarNoticeBar, {
      props: {
        text: 'hello',
        type: 'success',
      },
    })

    expect(wrapper.classes()).toContain('mp-notice-bar--success')
    expect(wrapper.text()).toContain('hello')
    expect(wrapper.attributes('role')).toBe('status')
    wrapper.unmount()
  })

  test('closeable mode emits close', async () => {
    const wrapper = mount(VarNoticeBar, {
      props: {
        text: 'close me',
        mode: 'closeable',
      },
    })

    await wrapper.find('.mp-notice-bar__close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.isVisible()).toBe(false)
    wrapper.unmount()
  })
})
