import { expect, test } from 'vitest'
import { useInputComposition } from '../../utils/input-composition'
import { splitInputAttrs } from '../native-attrs'

for (const key of ['onKeyupOnce', 'onPasteCapture', 'onCompositionendPassiveOnce']) {
  test(`${key} retains native event ownership`, () => {
    const listener = () => {}
    const attrs = splitInputAttrs({ [key]: listener })
    expect(attrs.native[key]).toBe(listener)
    expect(attrs.root[key]).toBeUndefined()
  })
}
test('extra native events preserve option modifiers too', () => {
  const listener = () => {}
  const attrs = splitInputAttrs({ onKeydownCaptureOnce: listener }, ['onKeydown'])
  expect(attrs.native.onKeydownCaptureOnce).toBe(listener)
  expect(attrs.root.onKeydownCaptureOnce).toBeUndefined()
})
test('cancel retires a queued composition write and clears its duplicate marker', () => {
  const composition = useInputComposition()
  const event = { target: { value: 'done' } } as unknown as Event
  composition.start()
  expect(composition.end(event)).toBe(true)
  const current = composition.capture()
  composition.cancel()
  expect(current()).toBe(false)
  expect(composition.isComposing.value).toBe(false)
  expect(composition.accepts(event)).toBe(true)
})
