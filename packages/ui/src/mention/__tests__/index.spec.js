import { createApp } from 'vue'
import { expect, test } from 'vitest'
import Mention from '..'

test('mention plugin', () => {
  const app = createApp({}).use(Mention)
  expect(app.component(Mention.name)).toBeTruthy()
})
