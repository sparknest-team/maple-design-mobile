import { defineComponent, h, withDirectives } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import Button from '..'
import Hover from '../../hover'

it('shows the built-in overlay while a consumer hover directive observes the same button', async () => {
  const observe = vi.fn()
  const enter = vi.fn()
  const host = mount(
    defineComponent({
      setup: () => () => withDirectives(h(Button, { onMouseenter: enter }), [[Hover, observe]]),
    }),
  )
  try {
    const button = host.get('button')
    await button.trigger('mouseenter')
    expect(observe.mock.calls).toEqual([[true]])
    expect(enter).toHaveBeenCalledTimes(1)
    expect(host.find('[class*="hover-overlay--hovering"]').exists()).toBe(true)
    await button.trigger('mouseleave')
    expect(observe.mock.calls).toEqual([[true], [false]])
    expect(host.find('[class*="hover-overlay--hovering"]').exists()).toBe(false)
  } finally {
    host.unmount()
  }
})
