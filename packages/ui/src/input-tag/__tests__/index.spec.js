import { createApp } from 'vue'
import { expect, test } from 'vitest'
import InputTag from '..'

test('input-tag plugin', () => {
  const app = createApp({}).use(InputTag)
  expect(app.component(InputTag.name)).toBeTruthy()
})
