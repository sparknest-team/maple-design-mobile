import { createSSRApp, defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import { useChildren, useId, useParent, useTouch } from '../../../../maple-use/src/index'

test('parent providers track DOM order, keyed reordering and KeepAlive without duplicate registration', async () => {
  const key = Symbol('family-hooks'),
    order = ref(['a', 'b']),
    active = ref(true)
  let children
  const Child = defineComponent({
    props: ['id'],
    setup(props) {
      const { bindParent } = useParent(key)
      bindParent({ id: props.id })
      return () => h('span', props.id)
    },
  })
  const Parent = defineComponent({
    setup() {
      children = useChildren(key)
      children.bindChildren({})
      return () =>
        h(
          'div',
          order.value.map((id) => h(Child, { key: id, id })),
        )
    },
  })
  const wrapper = mount({ render: () => h(KeepAlive, null, { default: () => (active.value ? h(Parent) : null) }) })
  const settle = async () => {
    await nextTick()
    await nextTick()
    await nextTick()
  }
  try {
    await settle()
    expect(children.childProviders.map((item) => item.id)).toEqual(['a', 'b'])
    order.value = ['b', 'a']
    await settle()
    expect(children.childProviders.map((item) => item.id)).toEqual(['b', 'a'])
    active.value = false
    await settle()
    expect(children.length.value).toBe(0)
    active.value = true
    await settle()
    expect(children.childProviders.map((item) => item.id)).toEqual(['b', 'a'])
    order.value = ['b']
    await settle()
    expect(children.length.value).toBe(1)
  } finally {
    wrapper.unmount()
  }
  expect(children.childProviders).toEqual([])
})

test('gesture frames are canceled on unmount and empty touches are harmless', () => {
  let touch
  const cancel = vi.spyOn(window, 'cancelAnimationFrame')
  const raf = vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(123)
  const wrapper = mount({
    setup() {
      touch = useTouch()
      return () => h('div')
    },
  })
  try {
    touch.startTouch({ touches: [] })
    touch.moveTouch({ touches: [] })
    touch.startTouch({ touches: [{ clientX: 0, clientY: 0 }] })
    touch.moveTouch({ touches: [{ clientX: 10, clientY: 0 }] })
    touch.endTouch()
    expect(touch.dragging.value).toBe(true)
    wrapper.unmount()
    expect(cancel).toHaveBeenCalledWith(123)
    expect(touch.dragging.value).toBe(false)
  } finally {
    raf.mockRestore()
    cancel.mockRestore()
  }
})

test('ID composable renders without document access during SSR', async () => {
  const Child = defineComponent({
    name: 'IdentityChild',
    setup() {
      const id = useId()
      return () => h('input', { id: id.value })
    },
  })
  const first = await renderToString(createSSRApp(Child)),
    second = await renderToString(createSSRApp(Child))
  expect(first).toBe(second)
})
