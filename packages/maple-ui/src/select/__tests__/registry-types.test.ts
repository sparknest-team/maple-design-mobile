import { expect, test } from 'vitest'
import Menu from '../../_components/selection-field/MenuPresentation.vue'
import { presentations } from '../../cascader/presentations'

test('Cascader inline uses the immediate menu renderer', () => {
  expect(presentations.inline.component).toBe(Menu)
  expect(presentations.inline.deferred(true)).toBe(false)
})
