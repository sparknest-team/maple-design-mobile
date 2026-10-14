import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import Search from '..'
import Locale from '../../locale'
import enUS from '../../locale/en-US'

Locale.add('en-US', enUS)
afterEach(() => Locale.use('zh-CN'))

describe('Search global locale', () => {
  test('global switching updates defaults and action type uses the correct label', async () => {
    Locale.use('zh-CN')
    const wrapper = mount(Search, { props: { showAction: true } })
    expect(wrapper.text()).toContain('取消')
    Locale.use('en-US')
    await nextTick()
    expect(wrapper.text()).toContain('Cancel')
    await wrapper.setProps({ actionType: 'search' })
    expect(wrapper.text()).toContain('Search')
    expect(wrapper.text()).not.toContain('Cancel')
    await wrapper.setProps({ actionText: 'Continue' })
    Locale.use('zh-CN')
    await nextTick()
    expect(wrapper.text()).toContain('Continue')
    wrapper.unmount()
  })
})
