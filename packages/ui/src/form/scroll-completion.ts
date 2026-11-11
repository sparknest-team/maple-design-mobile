import { nextTick } from 'vue'
import { createNamespace } from '../utils/components'

const details = createNamespace('form-details').n
const selector = [details(), details('message')]
  .flatMap((name) => [`.${name}-enter-active`, `.${name}-leave-active`])
  .join(',')

function milliseconds(value: string, negative = false) {
  const match = /^(-?\d*\.?\d+)(ms|s)$/.exec(value.trim())
  if (!match) {
    return undefined
  }
  const result = Number(match[1]) * (match[2] === 's' ? 1000 : 1)
  return negative || result >= 0 ? result : undefined
}

// A computed fallback, not a duration token or a cap on overridden CSS.
function remaining(root: HTMLElement) {
  let maximum = 0
  const view = root.ownerDocument.defaultView
  for (const element of Array.from(root.querySelectorAll(selector))) {
    if (!view) {
      return 300
    }
    const style = view.getComputedStyle(element)
    const properties = style.transitionProperty.split(',').map((value) => value.trim())
    const durations = style.transitionDuration.split(',').map((value) => milliseconds(value))
    const delays = style.transitionDelay.split(',').map((value) => milliseconds(value, true))
    properties.forEach((property, index) => {
      if (property === 'none') {
        return
      }
      const duration = durations[index % durations.length]
      const delay = delays[index % delays.length]
      maximum = Math.max(maximum, duration == null || delay == null ? 300 : Math.max(0, duration + delay))
    })
  }
  return maximum
}

export function waitForFormDetails(root: HTMLElement, isCurrent: () => boolean, done: () => void) {
  const view = root.ownerDocument.defaultView
  let live = true
  let timer: ReturnType<typeof setTimeout> | undefined
  let frame: { id?: number; pending: boolean } | undefined
  const current = () => live && isCurrent()
  const cancel = () => {
    live = false
    clearTimeout(timer)
    if (frame) {
      frame.pending = false
      if (frame.id !== undefined) {
        view?.cancelAnimationFrame(frame.id)
      }
      frame = undefined
    }
  }
  const finish = () => {
    if (!current()) {
      return
    }
    live = false
    done()
  }
  const settle = () => {
    if (!current()) {
      return
    }
    const delay = remaining(root)
    if (!current()) {
      return
    }
    if (delay > 0) {
      let pending = true
      timer = setTimeout(() => {
        if (!pending) {
          return
        }
        pending = false
        finish()
      }, delay)
    } else {
      finish()
    }
  }
  const render = (count: number) => {
    if (!current()) {
      return
    }
    if (!view || count === 0) {
      settle()
      return
    }
    const ticket: { id?: number; pending: boolean } = { pending: true }
    frame = ticket
    ticket.id = view.requestAnimationFrame(() => {
      if (!ticket.pending || !current()) {
        return
      }
      ticket.pending = false
      frame = undefined
      render(count - 1)
    })
    if (!current()) {
      view.cancelAnimationFrame(ticket.id)
    }
  }
  nextTick(() => {
    if (!current()) {
      return
    }
    const delay = remaining(root)
    if (!current()) {
      return
    }
    // Match Vue's two-frame enter/leave class settlement before starting the CSS fallback clock.
    if (delay > 0) {
      render(2)
    } else {
      finish()
    }
  })
  return cancel
}
