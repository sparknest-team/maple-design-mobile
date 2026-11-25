import { expect, test } from 'vitest'
import {
  getPlacementOffset,
  getPositioningSpace,
  getRelativeRect,
  getTransformOrigin,
  getTriggerPosition,
} from '../geometry'

test('relative geometry uses only required coordinates and has the same minimal shape', () => {
  expect(
    getRelativeRect({ top: 72, left: 56, width: 150, height: 80 }, { x: 26, y: 12, scaleX: 1.5, scaleY: 2 }),
  ).toEqual({ scrollTop: 30, scrollLeft: 20, width: 100, height: 40 })
})

test('containing-block coordinates include borders, scroll and non-uniform scale', () => {
  const parent = document.createElement('div')
  Object.defineProperties(parent, {
    offsetWidth: { value: 200 },
    offsetHeight: { value: 100 },
    clientLeft: { value: 4 },
    clientTop: { value: 6 },
    scrollLeft: { value: 20 },
    scrollTop: { value: 30 },
  })
  Object.defineProperty(parent, 'getBoundingClientRect', {
    value: () => ({ left: 50, top: 60, width: 300, height: 200 }),
  })
  const popup = document.createElement('div')
  Object.defineProperty(popup, 'offsetParent', { value: parent })
  const space = getPositioningSpace(popup)
  expect(space).toEqual({ x: 26, y: 12, scaleX: 1.5, scaleY: 2 })
  const rect = getRelativeRect({ left: 56, top: 72, right: 206, bottom: 152, width: 150, height: 80 }, space)
  expect([rect.scrollLeft, rect.scrollTop, rect.width, rect.height]).toEqual([20, 30, 100, 40])
})

test('fractional centering retains half pixels instead of independently rounding both widths', () => {
  expect(
    getPlacementOffset('bottom', { scrollLeft: 10, scrollTop: 20, width: 101, height: 30 }, { width: 80, height: 40 }),
  ).toEqual({ left: 20.5, top: 50 })
})

test('opposite placements preserve screen offsets and cover uses the actual reference dimensions', () => {
  const size = { width: 120, height: 40 }
  expect(getTriggerPosition('top-start', 5, 9, size, true)).toMatchObject({ skidding: 5, distance: -49 })
  expect(getTriggerPosition('bottom-start', 5, 9, size, true)).toMatchObject({ skidding: 5, distance: -31 })
  expect(getTriggerPosition('right-end', 5, 9, size, true)).toMatchObject({ skidding: 9, distance: -115 })
  expect(getTransformOrigin('top-start')).toBe('0 100%')
  expect(getTransformOrigin('bottom-start')).toBe('0 0')
})

test('fixed positioning measures the transformed containing block before style application', () => {
  const parent = document.createElement('div')
  parent.style.transform = 'scale(2)'
  const popup = document.createElement('div')
  parent.append(popup)
  document.body.append(parent)
  Object.defineProperties(parent, {
    offsetWidth: { value: 100 },
    offsetHeight: { value: 50 },
    clientLeft: { value: 2 },
    clientTop: { value: 3 },
    scrollLeft: { value: 4 },
    scrollTop: { value: 5 },
  })
  Object.defineProperty(parent, 'getBoundingClientRect', {
    value: () => ({ left: 10, top: 20, width: 200, height: 100 }),
  })
  expect(getPositioningSpace(popup, 'fixed')).toEqual({ x: 6, y: 16, scaleX: 2, scaleY: 2 })
  parent.style.transform = 'none'
  expect(getPositioningSpace(popup, 'fixed')).toEqual({ x: 0, y: 0, scaleX: 1, scaleY: 1 })
  parent.remove()
})

test.each(['shadow', 'slot', 'individual scale'])('fixed popup uses its %s containing block', (kind) => {
  const host = document.createElement('div')
  const popup = document.createElement('div')
  const container = document.createElement('div')
  const root = host.attachShadow({ mode: 'open' })
  root.append(container)
  let block = host
  if (kind === 'slot') {
    container.append(document.createElement('slot'))
    host.append(popup)
    block = container
  } else {
    container.append(popup)
    if (kind === 'individual scale') {
      block = container
    }
  }
  if (kind === 'individual scale') {
    block.style.scale = '2'
  } else {
    block.style.transform = 'scale(2)'
  }
  Object.defineProperties(block, {
    offsetWidth: { value: 100 },
    offsetHeight: { value: 50 },
    getBoundingClientRect: { value: () => ({ left: 30, top: 50, width: 200, height: 100 }) },
  })
  document.body.append(host)
  try {
    expect(getPositioningSpace(popup, 'fixed')).toEqual({ x: 30, y: 50, scaleX: 2, scaleY: 2 })
  } finally {
    host.remove()
  }
})
