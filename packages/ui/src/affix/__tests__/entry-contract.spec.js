import { expect, test } from 'vitest'
import AffixDefault, * as AffixEntry from '../../affix'
import BackTopDefault, * as BackTopEntry from '../../back-top'
import EllipsisDefault, * as EllipsisEntry from '../../ellipsis'

test('named, default and internal component exports preserve the same installed component', () => {
  expect(AffixEntry.Affix).toBe(AffixDefault)
  expect(AffixEntry._AffixComponent).toBe(AffixDefault)
  expect(BackTopEntry.BackTop).toBe(BackTopDefault)
  expect(BackTopEntry._BackTopComponent).toBe(BackTopDefault)
  expect(EllipsisEntry.Ellipsis).toBe(EllipsisDefault)
  expect(EllipsisEntry._EllipsisComponent).toBe(EllipsisDefault)
})
