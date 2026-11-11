import { computed, createSSRApp, defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Dialog from '../../dialog'
import Overlay from '../../overlay'
import Trigger from '../../trigger'
import { usePopupLayer } from '../../utils/popup-layer'

describe('popup layer contract', () => {
  test('top recipient is stable for one dispatch even after synchronous closure', async () => {
    const upperOpen = ref(true)
    let lower, upper
    const Lower = defineComponent({
      setup() {
        lower = usePopupLayer(() => true, ref(1))
        return () => h('div')
      },
    })
    const Upper = defineComponent({
      setup() {
        upper = usePopupLayer(() => upperOpen.value, ref(2))
        return () => h('div')
      },
    })
    const wrapper = mount({ render: () => h('div', [h(Lower), h(Upper)]) })
    try {
      const event = new KeyboardEvent('keydown', { key: 'Escape' })
      expect(upper.onStackTop(event)).toBe(true)
      upperOpen.value = false
      expect(lower.onStackTop(event)).toBe(false)
      expect(lower.onStackTop(new KeyboardEvent('keydown', { key: 'Escape' }))).toBe(true)
    } finally {
      wrapper.unmount()
    }
  })
  test('initial nested layers win equal z-index even though children mount first', () => {
    let parent, child
    const Child = defineComponent({
      setup() {
        child = usePopupLayer(() => true, ref(20))
        return () => h('div')
      },
    })
    const Parent = defineComponent({
      setup() {
        parent = usePopupLayer(() => true, ref(20))
        return () => h(Child)
      },
    })
    const wrapper = mount(Parent)
    try {
      expect(child.onStackTop()).toBe(true)
      expect(parent.onStackTop()).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })
  test('reopening in the same tick leaves the layer registered', async () => {
    const open = ref(true)
    let layer
    const wrapper = mount({
      setup() {
        layer = usePopupLayer(() => open.value, ref(1))
        return () => h('div')
      },
    })
    try {
      open.value = false
      open.value = true
      await nextTick()
      expect(layer.onStackTop()).toBe(true)
    } finally {
      wrapper.unmount()
    }
    expect(layer.onStackTop()).toBe(false)
  })
  test('KeepAlive suspends and resumes layer ownership', async () => {
    const active = ref(true)
    let layer
    const Child = defineComponent({
      setup() {
        layer = usePopupLayer(() => true, ref(1))
        return () => h('div')
      },
    })
    const wrapper = mount({ render: () => h(KeepAlive, null, { default: () => (active.value ? h(Child) : null) }) })
    try {
      expect(layer.onStackTop()).toBe(true)
      active.value = false
      await nextTick()
      expect(layer.onStackTop()).toBe(false)
      active.value = true
      await nextTick()
      expect(layer.onStackTop()).toBe(true)
    } finally {
      wrapper.unmount()
    }
  })
  test('server rendering never registers a visible layer', async () => {
    let layer
    await renderToString(
      createSSRApp({
        setup() {
          layer = usePopupLayer(() => true, ref(1))
          return () => h('div')
        },
      }),
    )
    expect(layer.onStackTop()).toBe(false)
  })
  test('Escape closes a Trigger inside a Dialog before the Dialog', async () => {
    const triggerOpen = ref(true)
    const dialogOpen = ref(true)
    const dialogEscape = vi.fn()
    const wrapper = mount(
      {
        render: () =>
          h(
            Dialog,
            {
              open: dialogOpen.value,
              'onUpdate:open': (value) => {
                dialogOpen.value = value
              },
              onKeyEscape: dialogEscape,
              popupContainer: false,
            },
            {
              default: () =>
                h(
                  Trigger,
                  {
                    open: triggerOpen.value,
                    'onUpdate:open': (value) => {
                      triggerOpen.value = value
                    },
                    trigger: 'click',
                    escToClose: true,
                    popupContainer: false,
                  },
                  { default: () => h('button', 'reference'), content: () => h('span', 'panel') },
                ),
            },
          ),
      },
      { attachTo: document.body },
    )
    try {
      await nextTick()
      document.documentElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      await nextTick()
      expect(triggerOpen.value).toBe(false)
      expect(dialogOpen.value).toBe(true)
      expect(dialogEscape).not.toHaveBeenCalled()
      document.documentElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      await nextTick()
      expect(dialogEscape).toHaveBeenCalledTimes(1)
    } finally {
      wrapper.unmount()
    }
  })
  test('clicking a backdrop closes the child Trigger before its parent Overlay', async () => {
    const childOpen = ref(true)
    const overlayOpen = ref(true)
    const wrapper = mount(
      {
        render: () =>
          h(
            Overlay,
            {
              open: overlayOpen.value,
              'onUpdate:open': (value) => {
                overlayOpen.value = value
              },
              popupContainer: false,
            },
            {
              default: () =>
                h(
                  Trigger,
                  {
                    open: childOpen.value,
                    'onUpdate:open': (value) => {
                      childOpen.value = value
                    },
                    popupContainer: false,
                  },
                  {
                    default: () => h('button', 'reference'),
                    content: () => h('span', 'panel'),
                  },
                ),
            },
          ),
      },
      { attachTo: document.body },
    )
    try {
      await nextTick()
      await nextTick()
      const backdrop = wrapper.get('[role="presentation"]')
      await backdrop.trigger('pointerdown')
      await backdrop.trigger('click')
      expect(childOpen.value).toBe(false)
      expect(overlayOpen.value).toBe(true)
      await backdrop.trigger('pointerdown')
      await backdrop.trigger('click')
      expect(overlayOpen.value).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })
})
