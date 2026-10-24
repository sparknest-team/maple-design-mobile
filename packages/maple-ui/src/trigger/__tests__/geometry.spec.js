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
