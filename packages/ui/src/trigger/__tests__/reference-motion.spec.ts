import { expect, it, vi } from 'vitest'
import { observeReferenceMotion } from '../reference-motion'

it('tracks motion of the slotted reference and its ancestors until cleanup', () => {
  const host = document.createElement('div')
  const shadow = host.attachShadow({ mode: 'open' })
  const container = document.createElement('div')
  const slot = document.createElement('slot')
  container.append(slot)
  shadow.append(container)
  const reference = document.createElement('button')
  const sibling = document.createElement('span')
  host.append(reference, sibling)
  document.body.append(host)
  const update = vi.fn()
  const stop = observeReferenceMotion(reference, update)
  try {
    sibling.dispatchEvent(new Event('animationend', { bubbles: true }))
    expect(update).not.toHaveBeenCalled()
    for (const [index, node] of [reference, slot, container, host].entries()) {
      const type = ['transitionend', 'transitioncancel', 'animationend', 'animationcancel'][index]
      node.dispatchEvent(new Event(type, { bubbles: true }))
      expect(update).toHaveBeenCalled()
      update.mockClear()
    }
    stop()
    container.dispatchEvent(new Event('transitionend', { bubbles: true }))
    host.dispatchEvent(new Event('animationend', { bubbles: true }))
    expect(update).not.toHaveBeenCalled()
  } finally {
    stop()
    host.remove()
  }
})
