import { createSSRApp, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Tabs, { TabPane, TabsNavs } from '..'

const panes = () => ['a', 'b'].map((key) => h(TabPane, { name: key, key, title: key }, () => key))

test('controlled rejected selection and removed key do not silently commit another tab', async () => {
  const keys = ref(['a', 'b'])
  const wrapper = mount(Tabs, {
    props: { modelValue: 'a' },
    slots: {
      default: () => keys.value.map((key) => h(TabPane, { name: key, key, title: key }, () => key)),
    },
  })
  await wrapper.findAll('[role="tab"]')[1].trigger('click')
  expect(wrapper.emitted('update:modelValue')).toEqual([['b']])
  expect(wrapper.find('[aria-selected="true"]').text()).toBe('a')
  keys.value = ['b']
  await nextTick()
  expect(wrapper.find('[aria-selected="true"]').exists()).toBe(false)
  expect(wrapper.findAll('[role="tabpanel"]').every((panel) => panel.attributes('hidden') !== undefined)).toBe(true)
  wrapper.unmount()
})

test('SSR generates distinct stable relationships for multiple instances', async () => {
  const render = () =>
    renderToString(
      createSSRApp({ render: () => h('main', [h(Tabs, null, { default: panes }), h(Tabs, null, { default: panes })]) }),
    )
  const first = await render()
  expect(await render()).toBe(first)
  const ids = [...first.matchAll(/ id="([^"]+)"/g)].map((match) => match[1])
  expect(new Set(ids).size).toBe(ids.length)
  for (const match of first.matchAll(/aria-(?:controls|labelledby)="([^"]+)"/g)) {
    expect(ids).toContain(match[1])
  }
})

test('navigation cleans observers and global resize handlers after refresh', async () => {
  const Original = globalThis.ResizeObserver
  const disconnect = vi.fn()
  const observe = vi.fn()
  const remove = vi.spyOn(window, 'removeEventListener')
  globalThis.ResizeObserver = class {
    observe = observe
    disconnect = disconnect
  }
  try {
    const wrapper = mount(Tabs, { slots: { default: panes } })
    await nextTick()
    const nav = wrapper.findComponent(TabsNavs)
    expect(typeof nav.vm.resize).toBe('function')
    expect(observe).toHaveBeenCalled()
    const before = disconnect.mock.calls.length
    wrapper.unmount()
    await nextTick()
    expect(disconnect.mock.calls.length).toBeGreaterThan(before)
    expect(remove.mock.calls.some(([name]) => name === 'resize')).toBe(true)
  } finally {
    globalThis.ResizeObserver = Original
    remove.mockRestore()
  }
})
