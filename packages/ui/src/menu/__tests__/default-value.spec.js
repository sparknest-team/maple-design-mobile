import { effectScope, reactive } from 'vue'
import { expect, test, vi } from 'vitest'
import { useMenuSelection } from '../selection'

test('default selection initializes once and subsequent user selection stays internal', () => {
  const options = reactive({ defaultValue: 'a', options: [{ value: 'a' }, { value: 'b' }] })
  const emit = vi.fn()
  const scope = effectScope()
  const selection = scope.run(() => useMenuSelection(options, emit))
  expect(selection.isSelected('a')).toBe(true)
  expect(emit).not.toHaveBeenCalled()
  options.defaultValue = 'b'
  expect(selection.isSelected('a')).toBe(true)
  selection.select('b', {}, new Event('click'))
  expect(selection.isSelected('b')).toBe(true)
  expect(emit).toHaveBeenCalledTimes(1)
  scope.stop()
})
