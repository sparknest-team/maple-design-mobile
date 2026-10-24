import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import AppMobile from './AppMobile.vue'

vi.mock('@maple-design/cli/client', () => ({ getMobileIndex: () => '/mobile.html' }))

describe('PC site mobile preview', () => {
  it('loads the selected component demo in the iframe', async () => {
    const wrapper = mount(AppMobile, {
      props: { componentName: 'button', language: 'zh-CN', replace: 'button', hash: '' },
    })

    expect(wrapper.find('iframe').attributes('src')).toBe(
      '/mobile.html#/button?language=zh-CN&platform=pc&replace=button',
    )

    await wrapper.setProps({ componentName: 'input', replace: 'input' })
    expect(wrapper.find('iframe').attributes('src')).toBe(
      '/mobile.html#/input?language=zh-CN&platform=pc&replace=input',
    )
    expect(new URL(wrapper.find('iframe').attributes('src')!, 'http://localhost:8080/guide/why/').pathname).toBe(
      '/mobile.html',
    )
  })
})
