import { expect, test, vi } from 'vitest'
import Ripple from '../index'

const binding = (disabled) => ({ value: { disabled } })

test('disabled hosts bind synchronously on enable and release shared listeners after the last host', () => {
  const first = document.createElement('button')
  const second = document.createElement('button')
  const add = vi.spyOn(document, 'addEventListener')
  const remove = vi.spyOn(document, 'removeEventListener')
  const local = vi.spyOn(first, 'addEventListener')
  try {
    Ripple.mounted(first, binding(true))
    expect(local).not.toHaveBeenCalled()
    expect(add.mock.calls.filter(([event]) => event === 'mouseup')).toHaveLength(0)
    Ripple.updated(first, binding(false))
    Ripple.mounted(second, binding(false))
    expect(local.mock.calls.filter(([event]) => event === 'mousedown')).toHaveLength(1)
    expect(add.mock.calls.filter(([event]) => event === 'mouseup')).toHaveLength(1)
    const firstRelease = vi.spyOn(first._ripple, 'removeRipple')
    const secondRelease = vi.spyOn(second._ripple, 'removeRipple')
    document.dispatchEvent(new MouseEvent('mouseup'))
    expect(firstRelease).toHaveBeenCalledTimes(1)
    expect(secondRelease).toHaveBeenCalledTimes(1)
    Ripple.updated(first, binding(true))
    document.dispatchEvent(new MouseEvent('mouseup'))
    expect(firstRelease).toHaveBeenCalledTimes(1)
    expect(secondRelease).toHaveBeenCalledTimes(2)
    expect(remove.mock.calls.filter(([event]) => event === 'mouseup')).toHaveLength(0)
    Ripple.unmounted(second)
    expect(remove.mock.calls.filter(([event]) => event === 'mouseup')).toHaveLength(1)
    Ripple.updated(first, binding(false))
    expect(add.mock.calls.filter(([event]) => event === 'mouseup')).toHaveLength(2)
  } finally {
    Ripple.unmounted(first)
    Ripple.unmounted(second)
    vi.restoreAllMocks()
  }
})

test('each owner document has an independent release group', () => {
  const other = document.implementation.createHTMLDocument()
  const first = document.createElement('button')
  const second = other.createElement('button')
  try {
    Ripple.mounted(first, binding(false))
    Ripple.mounted(second, binding(false))
    const a = vi.spyOn(first._ripple, 'removeRipple')
    const b = vi.spyOn(second._ripple, 'removeRipple')
    other.dispatchEvent(new Event('mouseup'))
    expect(a).not.toHaveBeenCalled()
    expect(b).toHaveBeenCalledTimes(1)
  } finally {
    Ripple.unmounted(first)
    Ripple.unmounted(second)
    vi.restoreAllMocks()
  }
})
