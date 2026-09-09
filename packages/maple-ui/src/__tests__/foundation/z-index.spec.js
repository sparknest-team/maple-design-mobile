import { createSSRApp, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import context from '../../context'
import { useZIndex } from '../../context/zIndex'

test('SSR starts deterministically without consuming the client stack; mounted components use its current value', async () => {
  const previous = context.zIndex
  const active = ref(true)
  const component = {
    setup() {
      const { zIndex } = useZIndex(() => active.value, 1)
      return () => h('div', { style: { zIndex: zIndex.value } })
    },
  }
  let wrapper
  try {
    context.zIndex = 9100
    expect(await renderToString(createSSRApp(component))).toContain('z-index:2000')
    expect(context.zIndex).toBe(9100)
    wrapper = mount(component)
    await nextTick()
    expect(wrapper.attributes('style')).toContain('z-index: 9100')
    active.value = false
    await nextTick()
    context.zIndex = 9300
    active.value = true
    await nextTick()
    expect(wrapper.attributes('style')).toContain('z-index: 9300')
  } finally {
    wrapper?.unmount()
    context.zIndex = previous
  }
})
