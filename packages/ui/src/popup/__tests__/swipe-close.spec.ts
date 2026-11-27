import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import { useSwipeClose } from '../use-swipe-close'

function setup() {
  const enabled = ref(true)
  const close = vi.fn()
  const owner = mount(
    defineComponent({
      setup() {
        const element = ref<HTMLElement>()
        const swipe = useSwipeClose({ enabled: () => enabled.value, threshold: () => 40, element, close })
        return () =>
          h(
            'div',
            {
              ref: element,
              'data-modal-focus-root': '',
              onPointerdown: swipe.handlers.pointerdown,
              onPointermove: swipe.handlers.pointermove,
              onPointerup: swipe.handlers.pointerup,
              onPointercancel: swipe.handlers.pointercancel,
            },
            [
              h('header', { 'data-popup-swipe-handle': '' }, [h('span', 'title'), h('button', 'close')]),
              h('main', 'body'),
            ],
          )
      },
    }),
  )
  const pointer = async (target: Element, type: string, x: number, y: number) => {
    target.dispatchEvent(
      new PointerEvent(type, {
        pointerId: 7,
        pointerType: 'touch',
        isPrimary: true,
        button: 0,
        buttons: type === 'pointerdown' || type === 'pointermove' ? 1 : 0,
        clientX: x,
        clientY: y,
        bubbles: true,
        cancelable: true,
      }),
    )
    await nextTick()
  }
  const drag = async (from: string, x: number, y: number, cancel = false) => {
    await pointer(owner.get(from).element, 'pointerdown', 0, 0)
    await pointer(owner.element, 'pointermove', x, y)
    await pointer(owner.element, cancel ? 'pointercancel' : 'pointerup', x, y)
  }
  return { owner, enabled, close, drag, pointer }
}
test('only a sufficient downward header gesture closes the sheet; body, controls and cancellation do not', async () => {
  const { owner, close, drag } = setup()
  try {
    for (const [from, x, y, cancel] of [
      ['main', 0, 100, false],
      ['button', 0, 100, false],
      ['span', 0, 20, false],
      ['span', 0, -100, false],
      ['span', 100, 50, false],
      ['span', 0, 100, true],
    ] as const) {
      await drag(from, x, y, cancel)
      expect(close).not.toHaveBeenCalled()
    }
    await drag('span', 0, 80)
    expect(close).toHaveBeenCalledTimes(1)
  } finally {
    owner.unmount()
  }
})
test('disabling during a gesture (pending confirmation or closing) cancels it', async () => {
  const { owner, close, enabled, pointer } = setup()
  try {
    await pointer(owner.get('span').element, 'pointerdown', 0, 0)
    await pointer(owner.element, 'pointermove', 0, 100)
    enabled.value = false
    await nextTick()
    await pointer(owner.element, 'pointerup', 0, 100)
    expect(close).not.toHaveBeenCalled()
  } finally {
    owner.unmount()
  }
})

test('vertical threshold uses vertical scale even when horizontal scale differs', async () => {
  const { owner, close, drag } = setup()
  try {
    Object.defineProperty(owner.element, 'offsetWidth', { value: 100 })
    Object.defineProperty(owner.element, 'offsetHeight', { value: 100 })
    vi.spyOn(owner.element, 'getBoundingClientRect').mockReturnValue({ width: 100, height: 200 } as DOMRect)
    await drag('span', 0, 60)
    expect(close).not.toHaveBeenCalled()
    await drag('span', 0, 90)
    expect(close).toHaveBeenCalledTimes(1)
  } finally {
    owner.unmount()
  }
})
