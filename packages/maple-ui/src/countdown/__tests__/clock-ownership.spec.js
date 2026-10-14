import { h, KeepAlive, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { useCountdown } from '../use-countdown'

function harness(keepAlive = false, autoStart = true) {
  const frames = []
  let clock = 0
  const now = vi.spyOn(performance, 'now').mockImplementation(() => clock)
  const request = vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((callback) => {
    frames.push(callback)
    return frames.length
  })
  const cancel = vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation(() => {})
  const props = reactive({ time: 1000, format: 'SSS', autoStart })
  const show = ref(true)
  let countdown
  const emit = vi.fn()
  const Child = {
    setup() {
      countdown = useCountdown(props, emit)
      return () => h('div')
    },
  }
  const wrapper = mount(keepAlive ? { setup: () => () => h(KeepAlive, () => (show.value ? h(Child) : null)) } : Child)
  return {
    frames,
    cancel,
    props,
    show,
    emit,
    wrapper,
    get countdown() {
      return countdown
    },
    setClock(value) {
      clock = value
    },
    cleanup() {
      wrapper.unmount()
      request.mockRestore()
      cancel.mockRestore()
      now.mockRestore()
    },
  }
}

describe('Countdown business-clock callback ownership', () => {
  test('pre-pause frame cannot consume a restarted frame', () => {
    const p = harness()
    try {
      p.setClock(100)
      p.countdown.pause()
      p.countdown.start()
      p.emit.mockClear()
      p.frames[0](100)
      expect(p.emit.mock.calls.length).toBe(0)
      expect(p.frames).toHaveLength(2)
      p.countdown.pause()
      expect(p.cancel).toHaveBeenLastCalledWith(2)
    } finally {
      p.cleanup()
    }
  })
  test('consumed frame cannot tick twice or replace its successor', () => {
    const p = harness()
    try {
      p.setClock(100)
      p.frames[0](100)
      p.emit.mockClear()
      p.frames[0](100)
      expect(p.emit.mock.calls.length).toBe(0)
      expect(p.frames).toHaveLength(2)
      p.countdown.pause()
      expect(p.cancel).toHaveBeenLastCalledWith(2)
    } finally {
      p.cleanup()
    }
  })
  test('inactive time reset updates duration without background ticking and resumes on activation', async () => {
    const p = harness(true)
    try {
      p.show.value = false
      await nextTick()
      p.props.time = 2000
      await nextTick()
      expect(p.frames).toHaveLength(1)
      expect(p.countdown.timeData.value.seconds).toBe(2)
      p.setClock(5000)
      p.frames[0](5000)
      expect(p.emit.mock.calls.filter((c) => c[0] === 'end')).toHaveLength(0)
      p.show.value = true
      await nextTick()
      expect(p.frames).toHaveLength(2)
      expect(p.countdown.timeData.value.seconds).toBe(2)
    } finally {
      p.cleanup()
    }
  })
  test('retained start is rejected while inactive; explicit pause cancels pending resume', async () => {
    const p = harness(true)
    try {
      p.show.value = false
      await nextTick()
      p.emit.mockClear()
      p.countdown.start()
      expect(p.frames).toHaveLength(1)
      expect(p.emit.mock.calls.length).toBe(0)
      p.countdown.pause()
      p.show.value = true
      await nextTick()
      expect(p.frames).toHaveLength(1)
    } finally {
      p.cleanup()
    }
  })
  test('disposed controls and old frames emit nothing', () => {
    const p = harness()
    try {
      p.wrapper.unmount()
      p.emit.mockClear()
      p.countdown.reset()
      p.countdown.start()
      p.frames[0](1000)
      expect(p.emit.mock.calls.length).toBe(0)
      expect(p.frames).toHaveLength(1)
    } finally {
      p.cleanup()
    }
  })
  test('change callback reset owns the new deadline without an extra old frame', () => {
    const p = harness()
    try {
      let reset = true
      p.emit.mockImplementation((event) => {
        if (event === 'change' && reset) {
          reset = false
          p.countdown.reset()
        }
      })
      p.setClock(100)
      p.frames[0](100)
      expect(p.frames).toHaveLength(2)
      expect(p.countdown.timeData.value.seconds).toBe(1)
      p.countdown.pause()
      expect(p.cancel).toHaveBeenLastCalledWith(2)
    } finally {
      p.cleanup()
    }
  })
  test('normal pause freezes remaining business time and activation resumes it', async () => {
    const p = harness(true)
    try {
      p.setClock(100)
      p.show.value = false
      await nextTick()
      p.setClock(5000)
      p.show.value = true
      await nextTick()
      expect(p.countdown.timeData.value.milliseconds).toBe(900)
      p.setClock(5300)
      p.frames[1](5300)
      expect(p.countdown.timeData.value.milliseconds).toBe(600)
    } finally {
      p.cleanup()
    }
  })
  test('completion emits end once; reset permits one new completion', () => {
    const p = harness()
    try {
      p.setClock(1000)
      p.frames[0](1000)
      p.frames[0](1000)
      expect(p.emit.mock.calls.filter((c) => c[0] === 'end')).toHaveLength(1)
      p.countdown.reset()
      p.setClock(2000)
      p.frames[1](2000)
      p.frames[1](2000)
      expect(p.emit.mock.calls.filter((c) => c[0] === 'end')).toHaveLength(2)
    } finally {
      p.cleanup()
    }
  })
})
