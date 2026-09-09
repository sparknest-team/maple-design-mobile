import { createSSRApp, defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Overlay from '../../overlay'
import { acquireScrollLock, useScrollLock } from '../../utils/scroll-lock'

const tick = async () => {
  await nextTick()
  await nextTick()
}

describe('shared scroll lock contract', () => {
  test('out-of-order releases preserve the final owner and restore original inline priority', () => {
    const element = document.createElement('div')
    element.style.setProperty('overflow', 'auto', 'important')
    const first = acquireScrollLock(element)
    const second = acquireScrollLock(element)
    first()
    first()
    expect(element.style.overflow).toBe('hidden')
    second()
    expect(element.style.overflow).toBe('auto')
    expect(element.style.getPropertyPriority('overflow')).toBe('important')
  })
  test('preexisting classes and styles survive lock cleanup', () => {
    const element = document.createElement('div')
    element.classList.add('already-locked')
    element.style.overflow = 'hidden'
    const first = acquireScrollLock(element, { className: 'already-locked' })
    const second = acquireScrollLock(element, { className: 'temporary-lock' })
    first()
    second()
    expect(element.classList.contains('already-locked')).toBe(true)
    expect(element.classList.contains('temporary-lock')).toBe(false)
    expect(element.style.overflow).toBe('hidden')
  })
  test('container replacement releases the old element, not the new target', async () => {
    const first = document.createElement('div')
    const second = document.createElement('div')
    const target = ref(first)
    const wrapper = mount({
      setup() {
        useScrollLock(
          () => target.value,
          () => true,
        )
        return () => h('div')
      },
    })
    try {
      expect(first.style.overflow).toBe('hidden')
      target.value = second
      await tick()
      expect(first.style.overflow).toBe('')
      expect(second.style.overflow).toBe('hidden')
    } finally {
      wrapper.unmount()
    }
    expect(second.style.overflow).toBe('')
  })
  test('KeepAlive releases, ignores changes while inactive, and locks the latest target on return', async () => {
    const target = ref(document.createElement('div'))
    const previous = target.value
    const active = ref(true)
    const Child = defineComponent({
      setup() {
        useScrollLock(
          () => target.value,
          () => true,
        )
        return () => h('div')
      },
    })
    const wrapper = mount({ render: () => h(KeepAlive, null, { default: () => (active.value ? h(Child) : null) }) })
    try {
      expect(previous.style.overflow).toBe('hidden')
      active.value = false
      await tick()
      target.value = document.createElement('div')
      await tick()
      expect(previous.style.overflow).toBe('')
      expect(target.value.style.overflow).toBe('')
      active.value = true
      await tick()
      expect(target.value.style.overflow).toBe('hidden')
    } finally {
      wrapper.unmount()
    }
  })
  test('SSR does not mutate a container', async () => {
    const element = document.createElement('div')
    await renderToString(
      createSSRApp({
        setup() {
          useScrollLock(
            () => element,
            () => true,
          )
          return () => h('div')
        },
      }),
    )
    expect(element.style.overflow).toBe('')
  })
  test('scrollbar compensation restores original padding', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    element.style.paddingRight = '4px'
    Object.defineProperty(element, 'offsetWidth', { value: 100 })
    Object.defineProperty(element, 'clientWidth', { value: 85 })
    const release = acquireScrollLock(element, { reserveScrollBar: true })
    try {
      expect(element.style.paddingRight).toBe('19px')
    } finally {
      release()
      element.remove()
    }
    expect(element.style.paddingRight).toBe('4px')
  })
  test('two real overlays keep body locked when the first mounted owner closes first', async () => {
    const originalOverflow = document.body.style.overflow
    const first = mount(Overlay, {
      props: { open: true, lockScroll: true, popupContainer: false },
      global: { stubs: { transition: false } },
    })
    const second = mount(Overlay, {
      props: { open: true, lockScroll: true, popupContainer: false },
      global: { stubs: { transition: false } },
    })
    try {
      await tick()
      await first.setProps({ open: false })
      expect(document.body.style.overflow).toBe('hidden')
      await second.setProps({ open: false })
      await new Promise((resolve) => setTimeout(resolve, 100))
      expect(document.body.style.overflow).toBe(originalOverflow)
    } finally {
      first.unmount()
      second.unmount()
    }
  })
})
