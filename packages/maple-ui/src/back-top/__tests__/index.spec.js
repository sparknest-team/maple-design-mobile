import { createApp } from 'vue'
import { expect, test } from 'vitest'
import BackTop, { backTopProps } from '..'

test('BackTop plugin and common defaults', () => {
  const app = createApp({}).use(BackTop)
  expect(app.component(BackTop.name)).toBeTruthy()
  expect(backTopProps.duration.default).toBe(200)
  expect(backTopProps.easing.default).toBe('quartOut')
})
