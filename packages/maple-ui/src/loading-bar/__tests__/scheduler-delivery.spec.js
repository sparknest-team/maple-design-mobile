import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const ticks = []
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    nextTick: (callback) => {
      if (callback) {
        ticks.push(callback)
      }
      return Promise.resolve()
    },
  }
})
const actualVue = await vi.importActual('vue')
let LoadingBar, timers
const bar = () => document.querySelector('.mp-loading-bar')
const task = (delay) => timers.filter((timer) => timer.delay === delay).pop()
beforeEach(async () => {
  vi.useFakeTimers()
  vi.resetModules()
  ticks.length = 0
  timers = []
  LoadingBar = (await import('..')).default
  const original = window.setTimeout.bind(window)
  vi.spyOn(window, 'setTimeout').mockImplementation((callback, delay, ...args) => {
    const id = original(callback, delay, ...args)
    if (typeof callback === 'function') {
      timers.push({ callback, delay, id })
    }
    return id
  })
})
afterEach(async () => {
  vi.restoreAllMocks()
  LoadingBar.finish()
  for (let index = 0; index < 5; index++) {
    ticks.splice(0).forEach((callback) => callback())
    await vi.advanceTimersByTimeAsync(20000)
  }
  LoadingBar.resetDefaultOptions()
  ticks.length = 0
  vi.useRealTimers()
})
function completing() {
  LoadingBar.start()
  LoadingBar.finish()
  task(0).callback()
}
const style = { transitionProperty: 'width, opacity', transitionDuration: '0s, 0s', transitionDelay: '0s, 0s' }

describe('LoadingBar scheduler delivery ownership', () => {
  test('restart rejects an old progress callback', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(1)
    LoadingBar.start()
    const progress = task(200)
    LoadingBar.start()
    progress.callback()
    await actualVue.nextTick()
    expect(bar().style.width).toBe('0%')
  })
  test('restart rejects a pending width-render continuation', () => {
    completing()
    const render = ticks.shift()
    LoadingBar.start()
    render()
    expect(timers.filter((timer) => timer.delay === 300)).toHaveLength(0)
  })
  test('restart rejects a pending opacity-render continuation', () => {
    completing()
    ticks.shift()()
    task(300).callback()
    const render = ticks.shift()
    LoadingBar.start()
    render()
    expect(timers.filter((timer) => timer.delay === 250)).toHaveLength(0)
  })
  test('a consumed progress tick cannot fork or advance twice', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(1)
    LoadingBar.start()
    const progress = task(200)
    progress.callback()
    progress.callback()
    await actualVue.nextTick()
    expect(bar().style.width).toBe('5%')
  })
  test('width-render continuation schedules once', () => {
    completing()
    const render = ticks.shift()
    render()
    render()
    expect(timers.filter((timer) => timer.delay === 300)).toHaveLength(1)
  })
  test('opacity-render continuation schedules cleanup once', () => {
    completing()
    ticks.shift()()
    task(300).callback()
    const render = ticks.shift()
    render()
    render()
    expect(timers.filter((timer) => timer.delay === 250)).toHaveLength(1)
  })
  test('width style lookup restart cannot attach old hide to the new load', () => {
    completing()
    vi.spyOn(bar().ownerDocument.defaultView, 'getComputedStyle').mockImplementation(() => {
      LoadingBar.start()
      return style
    })
    ticks.shift()()
    expect(timers.filter((timer) => timer.delay === 300)).toHaveLength(0)
  })
  test('opacity style lookup restart cannot attach old cleanup to the new load', () => {
    completing()
    ticks.shift()()
    task(300).callback()
    vi.spyOn(bar().ownerDocument.defaultView, 'getComputedStyle').mockImplementation(() => {
      LoadingBar.start()
      return style
    })
    ticks.shift()()
    expect(timers.filter((timer) => timer.delay === 250)).toHaveLength(0)
  })
  test('restart already rejects an old show callback', async () => {
    LoadingBar.start()
    const show = timers.find((timer) => timer.delay === 200)
    LoadingBar.start()
    show.callback()
    await actualVue.nextTick()
    expect(bar().style.opacity).toBe('0')
  })
  test('normal completion still unmounts the service node', () => {
    completing()
    ticks.shift()()
    task(300).callback()
    ticks.shift()()
    task(250).callback()
    expect(bar()).toBeNull()
  })
})
