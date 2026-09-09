import { createApp } from 'vue'
import { expect, it } from 'vitest'
import Grid, { GridItem } from '..'
import * as gridExports from '..'
import Col from '../../col'
import Row from '../../row'

it('Grid only exposes and installs its own GridItem child', () => {
  expect(Grid.Item).toBe(GridItem)
  expect(Grid).not.toHaveProperty('Row')
  expect(Grid).not.toHaveProperty('Col')
  for (const name of ['Row', 'Col', '_RowComponent', '_ColComponent', 'rowProps', 'colProps']) {
    expect(gridExports).not.toHaveProperty(name)
  }
  const app = createApp({}).use(Grid)
  expect(app.component(Grid.name)).toBe(Grid)
  expect(app.component(GridItem.name)).toBe(GridItem)
  expect(app.component(Row.name)).toBeUndefined()
  expect(app.component(Col.name)).toBeUndefined()
  app.use(Row).use(Col)
  expect(app.component(Row.name)).toBe(Row)
  expect(app.component(Col.name)).toBe(Col)
})
