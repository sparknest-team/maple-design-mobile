import { defineComponent, h, nextTick, onUpdated, ref, Teleport } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import { acquireScrollLock } from '../../utils/scroll-lock'
import Card from '../Card.vue'

test.each([false, true])('transfers its scroll lock between documents with another holder: %s', async (shared) => {
  const frame = document.createElement('iframe')
  const root = document.createElement('div')
  const mainTarget = document.createElement('div')
  document.body.append(frame, root, mainTarget)
  const frameDocument = frame.contentDocument!
  const frameTarget = frameDocument.createElement('div')
  frameDocument.body.append(frameTarget)
  const target = ref<HTMLElement>(mainTarget)
  const releaseOther = shared ? acquireScrollLock(document.body) : undefined
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h(Teleport, { to: target.value }, h(Card, { floating: true, ripple: false, floatingDuration: 0 })),
    }),
    { attachTo: root },
  )
  try {
    await nextTick()
    expect(document.body.style.overflow).toBe('hidden')
    expect(frameDocument.body.style.overflow).not.toBe('hidden')
    target.value = frameTarget
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(mainTarget.querySelector('.c-card, .mp-card')).toBeNull()
    expect(frameTarget.querySelector('.c-card, .mp-card')).not.toBeNull()
    expect(document.body.style.overflow).toBe(shared ? 'hidden' : '')
    expect(frameDocument.body.style.overflow).toBe('hidden')
    target.value = mainTarget
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(document.body.style.overflow).toBe('hidden')
    expect(frameDocument.body.style.overflow).not.toBe('hidden')
  } finally {
    wrapper.unmount()
    releaseOther?.()
    frame.remove()
    root.remove()
    mainTarget.remove()
  }
})

test('a moved Card and the Card left behind handle Escape in their own document', async () => {
  const frame = document.createElement('iframe')
  const root = document.createElement('div')
  const mainTarget = document.createElement('div')
  document.body.append(frame, root, mainTarget)
  const frameDocument = frame.contentDocument!
  const frameTarget = frameDocument.createElement('div')
  frameDocument.body.append(frameTarget)
  const target = ref<HTMLElement>(mainTarget)
  const movedEvents: boolean[] = []
  const mainEvents: boolean[] = []
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h('div', [
          h(
            Teleport,
            { to: target.value },
            h(
              Card,
              {
                floating: true,
                ripple: false,
                floatingDuration: 0,
                'onUpdate:floating': (value: boolean) => movedEvents.push(value),
              },
              { default: () => h('input', { 'data-moved': '' }) },
            ),
          ),
          h(
            Card,
            {
              floating: true,
              ripple: false,
              floatingDuration: 0,
              'onUpdate:floating': (value: boolean) => mainEvents.push(value),
            },
            { default: () => h('input', { 'data-main': '' }) },
          ),
        ]),
    }),
    { attachTo: root },
  )
  try {
    await nextTick()
    target.value = frameTarget
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 0))
    const movedInput = frameTarget.querySelector<HTMLInputElement>('[data-moved]')!
    const mainInput = root.querySelector<HTMLInputElement>('[data-main]')!
    movedInput.dispatchEvent(
      new (frame.contentWindow as Window & typeof globalThis).KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      }),
    )
    await nextTick()
    expect(movedEvents).toEqual([false])
    expect(mainEvents).toEqual([])
    mainInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(mainEvents).toEqual([false])
    expect(movedEvents).toEqual([false])
  } finally {
    wrapper.unmount()
    frame.remove()
    root.remove()
    mainTarget.remove()
  }
})

test('handles Escape during the same update that moves the Card to a new document', async () => {
  const frame = document.createElement('iframe')
  const root = document.createElement('div')
  const targetMain = document.createElement('div')
  document.body.append(frame, root, targetMain)
  const targetFrame = frame.contentDocument!.createElement('div')
  frame.contentDocument!.body.append(targetFrame)
  const target = ref<HTMLElement>(targetMain)
  const movedEvents: boolean[] = []
  let attempted = false
  let lockAtDispatch = ''
  const wrapper = mount(
    defineComponent({
      setup() {
        onUpdated(() => {
          if (target.value !== targetFrame || attempted) {
            return
          }
          attempted = true
          lockAtDispatch = frame.contentDocument!.body.style.overflow
          targetFrame.querySelector<HTMLInputElement>('[data-moved]')!.dispatchEvent(
            new (frame.contentWindow as Window & typeof globalThis).KeyboardEvent('keydown', {
              key: 'Escape',
              bubbles: true,
            }),
          )
        })
        return () =>
          h('div', [
            h(
              Teleport,
              { to: target.value },
              h(
                Card,
                {
                  floating: true,
                  ripple: false,
                  floatingDuration: 0,
                  'onUpdate:floating': (value: boolean) => movedEvents.push(value),
                },
                { default: () => h('input', { 'data-moved': '' }) },
              ),
            ),
            h(Card, { floating: true, ripple: false, floatingDuration: 0 }, { default: () => h('input') }),
          ])
      },
    }),
    { attachTo: root },
  )
  try {
    await nextTick()
    target.value = targetFrame
    await nextTick()
    expect(attempted).toBe(true)
    expect(lockAtDispatch).not.toBe('hidden')
    expect(movedEvents).toEqual([false])
  } finally {
    wrapper.unmount()
    frame.remove()
    root.remove()
    targetMain.remove()
  }
})

test('transfers the reduced-motion listener when an expanded Card changes document', async () => {
  const frame = document.createElement('iframe')
  const root = document.createElement('div')
  const mainTarget = document.createElement('div')
  document.body.append(frame, root, mainTarget)
  const frameWindow = frame.contentWindow!
  const frameTarget = frame.contentDocument!.createElement('div')
  frame.contentDocument!.body.append(frameTarget)
  const mainWindow = document.defaultView!
  const oldMain = Object.getOwnPropertyDescriptor(mainWindow, 'matchMedia')
  const oldFrame = Object.getOwnPropertyDescriptor(frameWindow, 'matchMedia')
  const mainQuery = { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }
  const frameQuery = { matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }
  const mainMatch = vi.fn(() => mainQuery)
  const frameMatch = vi.fn(() => frameQuery)
  Object.defineProperty(mainWindow, 'matchMedia', { configurable: true, value: mainMatch })
  Object.defineProperty(frameWindow, 'matchMedia', { configurable: true, value: frameMatch })
  const target = ref<HTMLElement>(mainTarget)
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h(Teleport, { to: target.value }, h(Card, { floating: true, ripple: true, floatingDuration: 0 })),
    }),
    { attachTo: root },
  )
  try {
    await nextTick()
    expect(mainMatch).toHaveBeenCalled()
    expect(mainQuery.addEventListener).toHaveBeenCalled()
    const mainListener = mainQuery.addEventListener.mock.calls.at(-1)?.[1]
    target.value = frameTarget
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(frameMatch).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
    expect(mainQuery.removeEventListener).toHaveBeenCalledWith('change', mainListener)
    await new Promise((resolve) => setTimeout(resolve, 30))
    const floater = frameTarget.querySelector<HTMLElement>('[class*="card__floater"]')!
    expect(floater.style.width).toBe('100vw')
    expect(frameQuery.addEventListener).toHaveBeenCalled()
    const frameListeners = frameQuery.addEventListener.mock.calls.map(([, listener]) => listener)
    target.value = mainTarget
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(frameQuery.removeEventListener.mock.calls.some(([, listener]) => frameListeners.includes(listener))).toBe(
      true,
    )
    expect(mainQuery.addEventListener.mock.calls.length).toBeGreaterThanOrEqual(2)
  } finally {
    wrapper.unmount()
    if (oldMain) {
      Object.defineProperty(mainWindow, 'matchMedia', oldMain)
    } else {
      delete (mainWindow as any).matchMedia
    }
    if (oldFrame) {
      Object.defineProperty(frameWindow, 'matchMedia', oldFrame)
    } else {
      delete (frameWindow as any).matchMedia
    }
    frame.remove()
    root.remove()
    mainTarget.remove()
  }
})

test('restarts a pending opening on the destination document frames after migration', async () => {
  const frameA = document.createElement('iframe')
  const frameB = document.createElement('iframe')
  const root = document.createElement('div')
  document.body.append(frameA, frameB, root)
  const targetA = frameA.contentDocument!.createElement('div')
  const targetB = frameB.contentDocument!.createElement('div')
  frameA.contentDocument!.body.append(targetA)
  frameB.contentDocument!.body.append(targetB)
  const callbacksA: FrameRequestCallback[] = []
  const callbacksB: FrameRequestCallback[] = []
  const framesA = vi.spyOn(frameA.contentWindow!, 'requestAnimationFrame').mockImplementation((callback) => {
    callbacksA.push(callback)
    return callbacksA.length
  })
  const framesB = vi.spyOn(frameB.contentWindow!, 'requestAnimationFrame').mockImplementation((callback) => {
    callbacksB.push(callback)
    return callbacksB.length
  })
  const cancelA = vi.spyOn(frameA.contentWindow!, 'cancelAnimationFrame')
  const target = ref<HTMLElement>(targetA)
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h(Teleport, { to: target.value }, h(Card, { floating: true, ripple: false, floatingDuration: 0 })),
    }),
    { attachTo: root },
  )
  try {
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(framesA).toHaveBeenCalledTimes(1)
    target.value = targetB
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(cancelA).toHaveBeenCalledWith(1)
    expect(framesB).toHaveBeenCalledTimes(1)
    callbacksA[0]!(0)
    expect(framesA).toHaveBeenCalledTimes(1)
    callbacksB[0]!(0)
    expect(framesB).toHaveBeenCalledTimes(2)
    callbacksB[1]!(16)
    await nextTick()
    await nextTick()
    expect(targetB.querySelector<HTMLElement>('[class$="card__floater"]')!.style.width).toBe('100vw')
  } finally {
    wrapper.unmount()
    framesA.mockRestore()
    framesB.mockRestore()
    cancelA.mockRestore()
    frameA.remove()
    frameB.remove()
    root.remove()
  }
})

test('ignores late non-cancellable main-document frames after moving to an iframe', async () => {
  const frame = document.createElement('iframe')
  const root = document.createElement('div')
  const mainTarget = document.createElement('div')
  document.body.append(frame, root, mainTarget)
  const frameTarget = frame.contentDocument!.createElement('div')
  frame.contentDocument!.body.append(frameTarget)
  const mainCallbacks: FrameRequestCallback[] = []
  const frameCallbacks: FrameRequestCallback[] = []
  const mainFrames = vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((callback) => {
    mainCallbacks.push(callback)
    return mainCallbacks.length
  })
  const frameFrames = vi.spyOn(frame.contentWindow!, 'requestAnimationFrame').mockImplementation((callback) => {
    frameCallbacks.push(callback)
    return frameCallbacks.length
  })
  const target = ref<HTMLElement>(mainTarget)
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h(Teleport, { to: target.value }, h(Card, { floating: true, ripple: false, floatingDuration: 0 })),
    }),
    { attachTo: root },
  )
  try {
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(mainFrames).toHaveBeenCalledTimes(1)
    target.value = frameTarget
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(frameFrames).toHaveBeenCalledTimes(1)
    mainCallbacks[0]!(0)
    expect(mainFrames).toHaveBeenCalledTimes(2)
    mainCallbacks[1]!(16)
    await nextTick()
    await nextTick()
    expect(frameTarget.querySelector<HTMLElement>('[class$="card__floater"]')!.style.width).not.toBe('100vw')
    frameCallbacks[0]!(0)
    frameCallbacks[1]!(16)
    await nextTick()
    await nextTick()
    expect(frameTarget.querySelector<HTMLElement>('[class$="card__floater"]')!.style.width).toBe('100vw')
  } finally {
    wrapper.unmount()
    mainFrames.mockRestore()
    frameFrames.mockRestore()
    frame.remove()
    root.remove()
    mainTarget.remove()
  }
})

test('preserves the remaining ripple delay when moved before opening frames are requested', async () => {
  vi.useFakeTimers()
  const frameA = document.createElement('iframe')
  const frameB = document.createElement('iframe')
  const root = document.createElement('div')
  document.body.append(frameA, frameB, root)
  const targetA = frameA.contentDocument!.createElement('div')
  const targetB = frameB.contentDocument!.createElement('div')
  frameA.contentDocument!.body.append(targetA)
  frameB.contentDocument!.body.append(targetB)
  const framesB = vi.spyOn(frameB.contentWindow!, 'requestAnimationFrame').mockReturnValue(1)
  const target = ref<HTMLElement>(targetA)
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h(Teleport, { to: target.value }, h(Card, { floating: true, ripple: true, floatingDuration: 0 })),
    }),
    { attachTo: root },
  )
  try {
    await nextTick()
    vi.advanceTimersByTime(300)
    target.value = targetB
    await nextTick()
    await Promise.resolve()
    vi.advanceTimersByTime(199)
    expect(framesB).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(framesB).toHaveBeenCalledTimes(1)
  } finally {
    wrapper.unmount()
    framesB.mockRestore()
    frameA.remove()
    frameB.remove()
    root.remove()
    vi.useRealTimers()
  }
})
