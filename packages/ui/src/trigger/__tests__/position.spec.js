import { describe, expect, test } from 'vitest'
import { calculatePopupPosition } from '../position'
import { triggerProps } from '../props'

const rect = (left, top, width, height) => ({
  left,
  right: left + width,
  top,
  bottom: top + height,
  width,
  height,
  scrollLeft: left,
  scrollRight: left + width,
  scrollTop: top,
  scrollBottom: top + height,
})

const context = {
  origin: { left: 0, top: 0 },
  scaleX: 1,
  scaleY: 1,
  distance: 8,
  autoFitPosition: true,
  strategy: 'fixed',
  view: { innerWidth: 320, innerHeight: 640 },
}

describe('trigger position contract', () => {
  test('uses main-axis distance and screen-axis translation', () => {
    const result = calculatePopupPosition('bottom', rect(100, 100, 40, 20), rect(0, 0, 60, 30), {
      ...context,
      translate: [3, 4],
    })
    expect(result.placement).toBe('bottom')
    expect(result.style).toMatchObject({ position: 'fixed', left: '93px', top: '132px' })
  })

  test('flips on the main axis when the opposite side fits', () => {
    const result = calculatePopupPosition('top', rect(100, 5, 40, 20), rect(0, 0, 60, 40), context)
    expect(result.placement).toBe('bottom')
    expect(result.style.top).toBe('33px')
  })

  test('exposes only the final offset API', () => {
    expect('popupOffset' in triggerProps).toBe(true)
    expect('popupTranslate' in triggerProps).toBe(true)
    expect('offsetX' in triggerProps).toBe(false)
    expect('offsetY' in triggerProps).toBe(false)
    expect('cascadeOptimization' in triggerProps).toBe(false)
  })
})

for (const [side, opposite, left, top] of [
  ['top', 'bottom', 100, 2],
  ['bottom', 'top', 100, 620],
  ['left', 'right', 2, 100],
  ['right', 'left', 300, 100],
]) {
  test.each(['', '-start', '-end'])(`${side}%s flips without losing alignment`, (alignment) => {
    const result = calculatePopupPosition(side + alignment, rect(left, top, 20, 20), rect(0, 0, 40, 40), context)
    expect(result.placement).toBe(opposite + alignment)
    expect(Number.parseFloat(result.style.left)).toBeGreaterThanOrEqual(0)
    expect(Number.parseFloat(result.style.top)).toBeGreaterThanOrEqual(0)
  })
}

test('keeps the main axis visible when neither side fits', () => {
  const result = calculatePopupPosition('bottom', rect(100, 240, 40, 20), rect(0, 0, 265, 600), context)
  expect(result.style.top).toBe('40px')
  const horizontal = calculatePopupPosition('right', rect(130, 100, 20, 20), rect(0, 0, 300, 100), context)
  expect(horizontal.style.left).toBe('20px')
})

test('main-axis fitting respects the visual viewport, scale and disabled fitting', () => {
  const shifted = {
    ...context,
    origin: { left: 10, top: 15 },
    scaleX: 2,
    scaleY: 2,
    view: {
      scrollX: 40,
      scrollY: 100,
      visualViewport: { width: 640, height: 480, pageLeft: 60, pageTop: 130, offsetLeft: 20, offsetTop: 30 },
    },
  }
  const result = calculatePopupPosition('bottom', rect(100, 100, 40, 20), rect(0, 0, 100, 220), shifted)
  expect(result.style.top).toBe('20px')
  const oversized = calculatePopupPosition('bottom', rect(100, 100, 40, 20), rect(0, 0, 100, 300), shifted)
  expect(Number.parseFloat(oversized.style.top)).toBe(0)
  const unfitted = calculatePopupPosition('bottom', rect(100, 100, 40, 20), rect(0, 0, 100, 600), {
    ...context,
    autoFitPosition: false,
  })
  expect(unfitted.style.top).toBe('128px')
})

test('keeps a body-mounted popup anchored throughout WKWebView keyboard panning', () => {
  // iPhone 12: visualViewport.offsetTop includes the page scroll while the keyboard is up.
  for (const [height, scrollY, offsetTop] of [
    [733, 0, 0],
    [387, 329, 329],
    [733, 290, 0],
  ]) {
    const result = calculatePopupPosition('bottom-start', rect(16, 498.4375, 358, 48), rect(0, 0, 358, 48), {
      ...context,
      strategy: 'absolute',
      distance: 4,
      origin: { left: 0, top: -scrollY },
      view: { scrollX: 0, scrollY, visualViewport: { width: 390, height, pageLeft: 0, pageTop: scrollY, offsetTop } },
    })
    expect(result.placement).toBe('bottom-start')
    expect(result.style.top).toBe('550.4375px')
  }
})

test('keeps a fixed-height combobox menu attached and flips only if the opposite side fits', () => {
  const keyboard = {
    ...context,
    keepVerticalAnchor: true,
    origin: { left: 0, top: -204 },
    distance: 4,
    view: { scrollX: 0, scrollY: 204, visualViewport: { width: 393, height: 317, pageTop: 204, pageLeft: 0 } },
  }
  const menu = rect(0, 0, 361, 210)
  const lower = calculatePopupPosition('bottom-start', rect(16, 338, 361, 48), menu, keyboard)
  expect(lower.placement).toBe('bottom-start')
  expect(lower.style).toEqual({ position: 'fixed', left: '16px', top: '390px' })
  const upper = calculatePopupPosition('bottom-start', rect(16, 450, 361, 48), menu, keyboard)
  expect(upper.placement).toBe('top-start')
  expect(upper.style.top).toBe('236px')
})
