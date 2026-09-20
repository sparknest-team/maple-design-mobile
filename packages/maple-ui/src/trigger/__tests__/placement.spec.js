import { expect, test } from 'vitest'
import { getTriggerPosition } from '../geometry'

const placements = ['top', 'bottom', 'left', 'right'].flatMap((side) => [side, side + '-start', side + '-end'])
test.each(placements)('placement %s preserves axis offsets and cover geometry', (placement) => {
  const horizontal = /^(left|right)/.test(placement)
  const negative = /^(left|top)/.test(placement)
  const expected = (horizontal ? 3 : 5) * (negative ? -1 : 1)
  const normal = getTriggerPosition(placement, 3, 5, { width: 100, height: 40 })
  const covered = getTriggerPosition(placement, 3, 5, { width: 100, height: 40 }, true)
  expect(normal).toEqual({ placement, skidding: horizontal ? 5 : 3, distance: expected })
  expect(covered.distance).toBe(expected - (horizontal ? 100 : 40))
})
