import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Demo from '../example/demos/basic.vue'
import PullRefresh from '../index'

vi.mock('@maplejs/maple-cli/client', () => ({ onThemeChange() {} }))

const Cell = defineComponent({
  setup:
    (_, { slots }) =>
    () =>
      h('div', slots.default?.()),
})
let wrapper
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  vi.useRealTimers()
})
const render = () => mount(Demo, { global: { components: { MpPullRefresh: PullRefresh, MpCell: Cell } } })

describe('PullRefresh demo lifecycle', () => {
  it('updates local list data after refresh', async () => {
    vi.useFakeTimers()
    wrapper = render()
    wrapper.getComponent(PullRefresh).vm.$emit('refresh')
    await vi.advanceTimersByTimeAsync(2000)
    await nextTick()
    expect(wrapper.text()).toContain('新的列表项')
  })
  it('cancels the pending demo request on unmount', async () => {
    vi.useFakeTimers()
    wrapper = render()
    wrapper.getComponent(PullRefresh).vm.$emit('refresh')
    expect(vi.getTimerCount()).toBeGreaterThan(0)
    wrapper.unmount()
    wrapper = undefined
    expect(vi.getTimerCount()).toBe(0)
  })
})
