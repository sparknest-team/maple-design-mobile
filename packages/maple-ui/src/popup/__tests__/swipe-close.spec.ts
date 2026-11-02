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
  const drag = async (from: string, x: number, y: number, cancel = false) => {
    await owner.get(from).trigger('pointerdown', { pointerId: 1, button: 0, clientX: 0, clientY: 0 })
    await owner.trigger('pointermove', { pointerId: 1, clientX: x, clientY: y })
    await owner.trigger(cancel ? 'pointercancel' : 'pointerup', { pointerId: 1, clientX: x, clientY: y })
  }
  return { owner, enabled, close, drag }
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
  const { owner, close, enabled } = setup()
  try {
    await owner.get('span').trigger('pointerdown', { pointerId: 1, button: 0, clientY: 0 })
    await owner.trigger('pointermove', { pointerId: 1, clientY: 100 })
    enabled.value = false
    await nextTick()
    await owner.trigger('pointerup', { pointerId: 1, clientY: 100 })
    expect(close).not.toHaveBeenCalled()
  } finally {
    owner.unmount()
  }
})
