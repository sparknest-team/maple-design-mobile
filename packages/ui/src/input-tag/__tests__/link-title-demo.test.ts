import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { Button } from '../../button'
import { Space } from '../../space'
import LinkTitleDemo from '../example/demos/link-title.vue'
import { InputTag } from '../index'

afterEach(() => vi.useRealTimers())

describe('link title demo', () => {
  test('loads titles, submits URLs, and removes tags', async () => {
    vi.useFakeTimers()
    const wrapper = mount(LinkTitleDemo, {
      global: { components: { MpInputTag: InputTag, MpButton: Button, MpSpace: Space } },
    })
    async function paste(url: string) {
      await wrapper.get('input').trigger('paste', {
        clipboardData: { getData: () => url },
      })
    }
    await paste('https://vuejs.org')
    expect(wrapper.get('input').attributes('disabled')).toBeDefined()
    vi.advanceTimersByTime(1200)
    await Promise.resolve()
    await nextTick()
    expect(wrapper.get('.mp-input-tag__tag').text()).toContain('Vue.js')
    await wrapper.get('.mp-button').trigger('click')
    expect(wrapper.get('pre').text()).toContain('https://vuejs.org')
    await wrapper.get('.mp-tag__close-btn').trigger('click')
    expect(wrapper.find('.mp-input-tag__tag').exists()).toBe(false)
    await wrapper.get('input').setValue('https://github.com')
    await wrapper.get('input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.get('input').attributes('disabled')).toBeDefined()
    vi.advanceTimersByTime(1200)
    await Promise.resolve()
    await nextTick()
    expect(wrapper.get('.mp-input-tag__tag').text()).toContain('GitHub')
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('')
    await wrapper.get('.mp-button').trigger('click')
    expect(wrapper.get('pre').text()).toContain('https://github.com')
    wrapper.unmount()
  })
})
