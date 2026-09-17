import { createApp } from 'vue'
import { expect, test } from 'vitest'
import Empty from '..'

test('empty plugin', () => {
  const app = createApp({}).use(Empty)
  expect(app.component(Empty.name)).toBeTruthy()
})
