import { computed, defineComponent, h, KeepAlive, nextTick, ref, Teleport } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { useModalFocus } from '../../utils/modal-focus'
import { usePopupLayer } from '../../utils/popup-layer'

describe('modal focus and touch contract', () => {
  test('parent-first close keeps child focus and restores the visible outer opener', async () => {
    const opener = document.createElement('button')
    document.body.append(opener)
    opener.focus()
    const parentOpen = ref(true),
      childOpen = ref(false)
    let parentControls, childControls, parentRoot, childRoot
    const Child = defineComponent({
      setup() {
        const root = ref()
        childRoot = root
        childControls = useModalFocus(
          () => root.value,
          () => childOpen.value,
          () => childOpen.value,
        )
        return () =>
          h(
            Teleport,
            { to: document.body },
            h(
              'div',
              { ref: root, tabindex: -1, style: { display: childOpen.value ? '' : 'none' } },
              h('button', 'child'),
            ),
          )
      },
    })
    const Parent = defineComponent({
      setup() {
        const root = ref()
        parentRoot = root
        parentControls = useModalFocus(
          () => root.value,
          () => parentOpen.value,
          () => !childOpen.value,
        )
        return () =>
          h('div', { ref: root, tabindex: -1, style: { display: parentOpen.value ? '' : 'none' } }, [
            h('button', 'child opener'),
            h(Child),
          ])
      },
    })
    const wrapper = mount(Parent, { attachTo: document.body })
    try {
      await nextTick()
      await nextTick()
      parentRoot.value.querySelector('button').focus()
      childOpen.value = true
      await nextTick()
      await nextTick()
      expect(document.activeElement).toBe(childRoot.value)
      parentOpen.value = false
      await nextTick()
      parentControls.restore()
      expect(document.activeElement).toBe(childRoot.value)
      childOpen.value = false
      await nextTick()
      childControls.restore()
      expect(document.activeElement).toBe(opener)
    } finally {
      wrapper.unmount()
      opener.remove()
    }
  })
  test('iframe modal preserves its parent-document opener without stealing new outside focus', async () => {
    const frame = document.createElement('iframe')
    const opener = document.createElement('button'),
      neighbor = document.createElement('button')
    document.body.append(frame, opener, neighbor)
    const foreign = frame.contentDocument
    const caller = foreign.createElement('div')
    foreign.body.append(caller)
    let controls
    const root = ref(),
      open = ref(true)
    opener.focus()
    const wrapper = mount(
      {
        setup() {
          controls = useModalFocus(
            () => root.value,
            () => open.value,
            () => true,
          )
          return () => h('div', { ref: root, tabindex: -1 }, h('button', 'inner'))
        },
      },
      { attachTo: caller },
    )
    try {
      await nextTick()
      await nextTick()
      expect(foreign.activeElement).toBe(root.value)
      controls.restore()
      expect(document.activeElement).toBe(opener)
      open.value = false
      await nextTick()
      opener.focus()
      open.value = true
      await nextTick()
      await nextTick()
      neighbor.focus()
      controls.restore()
      expect(document.activeElement).toBe(neighbor)
    } finally {
      wrapper.unmount()
      frame.remove()
      opener.remove()
      neighbor.remove()
    }
  })
  test('Tab starts from the root, ignores hidden/disabled controls and wraps both directions', async () => {
    const root = ref(),
      open = ref(true)
    const wrapper = mount(
      {
        setup() {
          const { onStackTop } = usePopupLayer(() => open.value, ref(1))
          useModalFocus(
            () => root.value,
            () => open.value,
            onStackTop,
          )
          return () =>
            h('div', { ref: root, tabindex: -1 }, [
              h('button', { hidden: true }, 'hidden'),
              h('button', { disabled: true }, 'disabled'),
              h('button', { id: 'first' }, 'first'),
              h('div', { style: 'display:none' }, h('button', 'invisible')),
              h('button', { id: 'last' }, 'last'),
            ])
        },
      },
      { attachTo: document.body },
    )
    try {
      await nextTick()
      expect(document.activeElement).toBe(root.value)
      const tab = (shiftKey) =>
        document.activeElement.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true }),
        )
      tab(false)
      expect(document.activeElement.id).toBe('first')
      tab(true)
      expect(document.activeElement.id).toBe('last')
      tab(false)
      expect(document.activeElement.id).toBe('first')
    } finally {
      wrapper.unmount()
    }
  })
  test('nested ownership, restoration, canceled close and KeepAlive cleanup', async () => {
    const outside = document.createElement('button')
    document.body.append(outside)
    outside.focus()
    const active = ref(true),
      showChild = ref(false),
      childOpen = ref(true)
    let parentRoot, childRoot, childFocus
    const Child = defineComponent({
      setup() {
        const root = ref()
        childRoot = root
        const { onStackTop } = usePopupLayer(() => childOpen.value, ref(2))
        childFocus = useModalFocus(
          () => root.value,
          () => childOpen.value,
          onStackTop,
        )
        return () => h('div', { ref: root, tabindex: -1 }, h('button', 'child'))
      },
    })
    const Parent = defineComponent({
      setup() {
        const root = ref()
        parentRoot = root
        const { onStackTop } = usePopupLayer(() => true, ref(1))
        useModalFocus(
          () => root.value,
          () => true,
          onStackTop,
        )
        return () => h('div', { ref: root, tabindex: -1 }, [h('button', 'parent'), showChild.value ? h(Child) : null])
      },
    })
    const wrapper = mount(
      { render: () => h(KeepAlive, null, { default: () => (active.value ? h(Parent) : null) }) },
      { attachTo: document.body },
    )
    try {
      await nextTick()
      await nextTick()
      expect(document.activeElement).toBe(parentRoot.value)
      showChild.value = true
      await nextTick()
      await nextTick()
      expect(document.activeElement).toBe(childRoot.value)
      childOpen.value = false
      childOpen.value = true
      await nextTick()
      expect(document.activeElement).toBe(childRoot.value)
      showChild.value = false
      await nextTick()
      expect(document.activeElement).toBe(parentRoot.value)
      active.value = false
      await nextTick()
      expect(document.activeElement).toBe(outside)
      active.value = true
      await nextTick()
      await nextTick()
      expect(document.activeElement).toBe(parentRoot.value)
    } finally {
      wrapper.unmount()
      outside.remove()
    }
  })
  test('touch permits inner scrolling and pinch, blocks background and overscroll', async () => {
    const root = ref()
    const wrapper = mount(
      {
        setup() {
          const { onStackTop } = usePopupLayer(() => true, ref(1))
          useModalFocus(
            () => root.value,
            () => true,
            onStackTop,
          )
          return () => h('div', { ref: root, tabindex: -1 }, h('div', { style: 'overflow-y:auto' }, 'scroll'))
        },
      },
      { attachTo: document.body },
    )
    try {
      await nextTick()
      const scroller = root.value.firstElementChild
      Object.defineProperties(scroller, { scrollHeight: { value: 300 }, clientHeight: { value: 100 } })
      const touch = (target, type, y, count = 1) => {
        const event = new Event(type, { bubbles: true, cancelable: true })
        Object.defineProperty(event, 'touches', {
          value: Array.from({ length: count }, () => ({ clientX: 0, clientY: y })),
        })
        target.dispatchEvent(event)
        return event.defaultPrevented
      }
      touch(scroller, 'touchstart', 100)
      expect(touch(scroller, 'touchmove', 50)).toBe(false)
      scroller.scrollTop = 200
      expect(touch(scroller, 'touchmove', 0)).toBe(true)
      touch(document.body, 'touchstart', 100)
      expect(touch(document.body, 'touchmove', 50)).toBe(true)
      touch(document.body, 'touchstart', 100, 2)
      expect(touch(document.body, 'touchmove', 50, 2)).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })
})
