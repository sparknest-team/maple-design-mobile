import { defineComponent, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Button from '../../button'
import Demo from '../example/demos/error.vue'

vi.mock('@maple-design/cli/client', () => ({ watchLang: (callback) => callback('zh-CN') }))
test('error demo uses a native retry button and clears pending work on unmount', async () => {
  vi.useFakeTimers()
  const retry = vi.fn()
  const Scroll = defineComponent({
    props: ['status', 'target'],
    setup(_, { slots }) {
      return () => h('div', slots.error?.({ retry }))
    },
  })
  const wrapper = mount(Demo, {
    global: { components: { MpInfiniteScroll: Scroll, MpButton: Button }, stubs: { MpCell: true } },
  })
  try {
    const button = wrapper.find('button')
    expect(button.attributes('type')).toBe('button')
    await button.trigger('click')
    expect(retry).toHaveBeenCalledTimes(1)
    wrapper.findComponent(Scroll).vm.$emit('load')
    await flushPromises()
    expect(vi.getTimerCount()).toBeGreaterThan(0)
    wrapper.unmount()
    expect(vi.getTimerCount()).toBe(0)
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})
