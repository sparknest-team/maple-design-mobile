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
  test.each([
    [true, true],
    [true, false],
    [false, true],
    [false, false],
  ])(
    'viewport compensation follows root and body owners (root first=%s, root releases first=%s)',
    (rootFirst, rootReleasesFirst) => {
      const root = document.documentElement
      const body = document.body
      const rootStyle = root.style.cssText
      const bodyStyle = body.style.cssText
      const widthDescriptor = Object.getOwnPropertyDescriptor(root, 'clientWidth')
      const innerWidthDescriptor = Object.getOwnPropertyDescriptor(window, 'innerWidth')
      const rectDescriptor = Object.getOwnPropertyDescriptor(body, 'getBoundingClientRect')
      root.style.overflow = 'scroll'
      body.style.setProperty('padding-right', '3px', 'important')
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1000 })
      Object.defineProperty(root, 'clientWidth', {
        configurable: true,
        get: () => (root.style.overflow === 'hidden' ? 1000 : 980),
      })
      Object.defineProperty(body, 'getBoundingClientRect', {
        configurable: true,
        value: () => ({ left: 0, right: root.style.overflow === 'hidden' ? 1000 : 980 }),
      })
      let rootRelease
      let bodyRelease
      try {
        if (rootFirst) {
          rootRelease = acquireScrollLock(root, { reserveScrollBar: true })
          bodyRelease = acquireScrollLock(body, { reserveScrollBar: true })
        } else {
          bodyRelease = acquireScrollLock(body, { reserveScrollBar: true })
          rootRelease = acquireScrollLock(root, { reserveScrollBar: true })
        }
        expect(body.style.paddingRight).toBe('23px')
        if (rootReleasesFirst) {
          rootRelease()
        } else {
          bodyRelease()
        }
        expect(body.style.paddingRight).toBe('23px')
        if (rootReleasesFirst) {
          bodyRelease()
        } else {
          rootRelease()
        }
        expect(body.style.paddingRight).toBe('3px')
        expect(body.style.getPropertyPriority('padding-right')).toBe('important')
      } finally {
        rootRelease?.()
        bodyRelease?.()
        root.style.cssText = rootStyle
        body.style.cssText = bodyStyle
        if (widthDescriptor) {
          Object.defineProperty(root, 'clientWidth', widthDescriptor)
        } else {
          delete root.clientWidth
        }
        if (innerWidthDescriptor) {
          Object.defineProperty(window, 'innerWidth', innerWidthDescriptor)
        } else {
          delete window.innerWidth
        }
        if (rectDescriptor) {
          Object.defineProperty(body, 'getBoundingClientRect', rectDescriptor)
        } else {
          delete body.getBoundingClientRect
        }
      }
    },
  )
  test.each([true, false])(
    'body and root locks share ownership and restore overflow declarations (root released first=%s)',
    (rootFirst) => {
      const root = document.documentElement
      const original = root.style.cssText
      root.style.setProperty('overflow-x', 'auto')
      root.style.setProperty('overflow-y', 'scroll', 'important')
      const expectedX = [root.style.getPropertyValue('overflow-x'), root.style.getPropertyPriority('overflow-x')]
      const expectedY = [root.style.getPropertyValue('overflow-y'), root.style.getPropertyPriority('overflow-y')]
      const rootRelease = acquireScrollLock(root)
      const bodyRelease = acquireScrollLock(document.body)
      try {
        if (rootFirst) {
          rootRelease()
        } else {
          bodyRelease()
        }
        expect(root.style.overflow).toBe('hidden')
        if (rootFirst) {
          bodyRelease()
        } else {
          rootRelease()
        }
        expect([root.style.getPropertyValue('overflow-x'), root.style.getPropertyPriority('overflow-x')]).toEqual(
          expectedX,
        )
        expect([root.style.getPropertyValue('overflow-y'), root.style.getPropertyPriority('overflow-y')]).toEqual(
          expectedY,
        )
      } finally {
        rootRelease()
        bodyRelease()
        root.style.cssText = original
      }
    },
  )
  test('out-of-order releases preserve the final owner and restore original inline priority', () => {
    const element = document.createElement('div')
    element.style.setProperty('overflow', 'auto', 'important')
    const first = acquireScrollLock(element)
    const second = acquireScrollLock(element)
    expect(element.style.getPropertyPriority('overflow')).toBe('important')
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
    Object.defineProperty(element, 'clientWidth', { get: () => (element.style.overflow === 'hidden' ? 100 : 85) })
    const release = acquireScrollLock(element, { reserveScrollBar: true })
    try {
      expect(element.style.paddingRight).toBe('19px')
    } finally {
      release()
      element.remove()
    }
    expect(element.style.paddingRight).toBe('4px')
  })
  test('stable scrollbar gutter is not compensated twice', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    element.style.paddingRight = '4px'
    Object.defineProperty(element, 'offsetWidth', { value: 100 })
    Object.defineProperty(element, 'clientWidth', { value: 85 })
    const release = acquireScrollLock(element, { reserveScrollBar: true })
    try {
      expect(element.style.paddingRight).toBe('4px')
    } finally {
      release()
      element.remove()
    }
  })
  test.each([true, false])(
    'released RTL scrollbar space is reserved on its physical side (clientLeft tracks gutter=%s)',
    (reportsLeft) => {
      const element = document.createElement('div')
      document.body.appendChild(element)
      element.style.direction = 'rtl'
      element.style.setProperty('padding-left', '4px', 'important')
      element.style.paddingRight = '3px'
      Object.defineProperty(element, 'offsetWidth', { value: 100 })
      Object.defineProperty(element, 'clientWidth', { get: () => (element.style.overflow === 'hidden' ? 100 : 85) })
      Object.defineProperty(element, 'clientLeft', {
        get: () => (reportsLeft && element.style.overflow !== 'hidden' ? 15 : 0),
      })
      const release = acquireScrollLock(element, { reserveScrollBar: true })
      try {
        expect(element.style.paddingLeft).toBe('19px')
        expect(element.style.paddingRight).toBe('3px')
      } finally {
        release()
        element.remove()
      }
      expect(element.style.paddingLeft).toBe('4px')
      expect(element.style.getPropertyPriority('padding-left')).toBe('important')
      expect(element.style.paddingRight).toBe('3px')
    },
  )
  test.each([true, false])(
    'released both-edge gutters reserve both sides (clientLeft tracks gutter=%s)',
    (reportsLeft) => {
      const element = document.createElement('div')
      document.body.appendChild(element)
      element.style.setProperty('scrollbar-gutter', 'stable both-edges')
      element.style.setProperty('padding-left', '4px', 'important')
      element.style.paddingRight = '3px'
      Object.defineProperty(element, 'offsetWidth', { value: 100 })
      Object.defineProperty(element, 'clientWidth', {
        get: () => (element.style.overflow === 'hidden' ? 100 : reportsLeft ? 70 : 85),
      })
      Object.defineProperty(element, 'clientLeft', {
        get: () => (reportsLeft && element.style.overflow !== 'hidden' ? 15 : 0),
      })
      const release = acquireScrollLock(element, { reserveScrollBar: true })
      try {
        expect(element.style.paddingLeft).toBe('19px')
        expect(element.style.paddingRight).toBe('18px')
      } finally {
        release()
        element.remove()
      }
      expect(element.style.paddingLeft).toBe('4px')
      expect(element.style.getPropertyPriority('padding-left')).toBe('important')
      expect(element.style.paddingRight).toBe('3px')
    },
  )
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
