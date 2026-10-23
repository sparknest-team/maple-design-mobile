import { type App, type Directive, type DirectiveBinding, type Plugin } from 'vue'
import { getRect, getStyle, supportTouch } from '@maplejs/maple-shared'
import context from '../context'
import { createNamespace } from '../utils/components'

const { n } = createNamespace('ripple')

interface RippleStyles {
  x: number
  y: number
  centerX: number
  centerY: number
  size: number
}

interface RippleOptions {
  removeRipple: () => void
  document: Document
  timers: Set<number>
  keyboardActive: boolean
  keyboardKey?: string
  lastTouchAt?: number
  color?: string
  disabled?: boolean
  tasker?: number | null
}

interface RippleHTMLElement extends HTMLElement {
  _ripple?: RippleOptions
}

const MINIMUM_DISPLAY_DURATION = 250
const MINIMUM_REMOVAL_DELAY = 250
const waves = new WeakMap<HTMLElement, { expandUntil: number; released: boolean }>()

function ownedRipples(element: HTMLElement) {
  return Array.from(element.children).filter((child): child is HTMLElement => waves.has(child as HTMLElement))
}

function transitionTime(element: HTMLElement, property: string) {
  const style = element.ownerDocument.defaultView?.getComputedStyle(element)
  if (!style) {
    return 0
  }
  const properties = style.transitionProperty.split(',').map((value) => value.trim())
  const durations = style.transitionDuration.split(',')
  const delays = style.transitionDelay.split(',')
  const time = (value: string) => {
    const match = value.trim().match(/^(-?\d*\.?\d+)(ms|s)$/)
    return match ? Number(match[1]) * (match[2] === 's' ? 1000 : 1) : 0
  }
  let result = 0
  properties.forEach((name, index) => {
    if (name === property || name === 'all') {
      result = Math.max(0, time(durations[index % durations.length]) + time(delays[index % delays.length]))
    }
  })
  return result
}

function schedule(element: RippleHTMLElement, task: () => void, delay: number) {
  const state = element._ripple
  if (!state) {
    return
  }
  const timer = window.setTimeout(() => {
    if (element._ripple !== state || !state.timers.delete(timer)) {
      return
    }
    task()
  }, delay)
  state.timers.add(timer)
  return timer
}

function clearTasks(element: RippleHTMLElement) {
  const state = element._ripple
  if (!state) {
    return
  }
  state.timers.forEach((timer) => window.clearTimeout(timer))
  state.timers.clear()
  state.tasker = null
  state.keyboardActive = false
  state.keyboardKey = undefined
  ownedRipples(element).forEach((ripple) => {
    waves.delete(ripple)
    ripple.remove()
  })
}

function setStyles(element: RippleHTMLElement) {
  const { zIndex, position } = getStyle(element)

  element.style.overflow = 'hidden'
  element.style.overflowX = 'hidden'
  element.style.overflowY = 'hidden'
  position === 'static' && (element.style.position = 'relative')
  zIndex === 'auto' && (element.style.zIndex = '1')
}

function isTouchEvent(event: Event): event is TouchEvent {
  return 'touches' in event
}

function computeRippleStyles(element: RippleHTMLElement, event: TouchEvent | KeyboardEvent | MouseEvent): RippleStyles {
  const { top, left }: DOMRect = getRect(element)
  const { clientWidth, clientHeight } = element

  const radius: number = Math.sqrt(clientWidth ** 2 + clientHeight ** 2) / 2
  const size: number = radius * 2

  const point = isTouchEvent(event) ? event.touches[0] : 'clientX' in event ? event : undefined
  const localX = point ? point.clientX - left : clientWidth / 2
  const localY = point ? point.clientY - top : clientHeight / 2

  const centerX: number = (clientWidth - radius * 2) / 2
  const centerY: number = (clientHeight - radius * 2) / 2

  const x: number = localX - radius
  const y: number = localY - radius

  return { x, y, centerX, centerY, size }
}

function createRipple(this: RippleHTMLElement, event: TouchEvent | KeyboardEvent | MouseEvent) {
  const _ripple = this._ripple as RippleOptions
  if (!_ripple) {
    return
  }
  _ripple.removeRipple()

  if (_ripple.disabled || _ripple.tasker || !context.enableRipple) {
    return
  }

  const task = () => {
    const current = () => this._ripple === _ripple && !_ripple.disabled && context.enableRipple
    if (!current()) {
      return
    }
    _ripple.tasker = null

    const { x, y, centerX, centerY, size }: RippleStyles = computeRippleStyles(this, event)
    if (!current()) {
      return
    }
    const ripple: RippleHTMLElement = this.ownerDocument.createElement('div')
    ripple.classList.add(n())
    ripple.style.opacity = `0`
    ripple.style.transform = `translate(${x}px, ${y}px) scale3d(.3, .3, .3)`
    ripple.style.width = `${size}px`
    ripple.style.height = `${size}px`
    _ripple.color && (ripple.style.backgroundColor = _ripple.color)
    ripple.dataset.createdAt = String(performance.now())

    setStyles(this)
    if (!current()) {
      return
    }

    this.appendChild(ripple)
    const wave = { expandUntil: performance.now() + 20, released: false }
    waves.set(ripple, wave)
    const expansion = transitionTime(ripple, 'transform')
    if (!current() || waves.get(ripple) !== wave) {
      return
    }
    wave.expandUntil += expansion

    schedule(
      this,
      () => {
        const wave = waves.get(ripple)
        if (!wave || !current()) {
          return
        }
        const expansion = transitionTime(ripple, 'transform')
        if (!current() || waves.get(ripple) !== wave) {
          return
        }
        wave.expandUntil = performance.now() + expansion
        ripple.style.transform = `translate(${centerX}px, ${centerY}px) scale3d(1, 1, 1)`
        ripple.style.opacity = `.25`
      },
      20,
    )
  }

  _ripple.tasker = schedule(this, task, 30)
}

function removeRipple(this: RippleHTMLElement) {
  const _ripple = this._ripple
  if (!_ripple) {
    return
  }

  const task = () => {
    const ripples = ownedRipples(this)
    if (!ripples.length) {
      return
    }

    const lastRipple = ripples[ripples.length - 1]
    const wave = waves.get(lastRipple)!
    if (wave.released) {
      return
    }
    wave.released = true
    const remaining = () =>
      Math.max(
        0,
        Math.max(wave.expandUntil, Number(lastRipple.dataset.createdAt) + MINIMUM_DISPLAY_DURATION) - performance.now(),
      )
    const fade = () => {
      // Activation may have run late: use its actual start, not the planned timer time.
      const delay = remaining()
      if (delay > 0) {
        schedule(this, fade, delay)
        return
      }
      lastRipple.style.opacity = '0'
      schedule(
        this,
        () => {
          waves.delete(lastRipple)
          lastRipple.remove()
        },
        Math.max(MINIMUM_REMOVAL_DELAY, transitionTime(lastRipple, 'opacity')),
      )
    }
    schedule(this, fade, remaining())
  }

  _ripple.tasker ? schedule(this, task, 30) : task()
}

function forbidRippleTask(this: RippleHTMLElement) {
  if (!supportTouch() || !context.enableRipple) {
    return
  }

  const _ripple = this._ripple as RippleOptions
  if (_ripple.tasker) {
    window.clearTimeout(_ripple.tasker)
    _ripple.timers.delete(_ripple.tasker)
  }
  _ripple.tasker = null
}

function createTouchRipple(this: RippleHTMLElement, event: TouchEvent) {
  if (this._ripple) {
    this._ripple.lastTouchAt = Date.now()
  }
  createRipple.call(this, event)
}

function createMouseRipple(this: RippleHTMLElement, event: MouseEvent) {
  const capabilities = (event as MouseEvent & { sourceCapabilities?: { firesTouchEvents?: boolean } })
    .sourceCapabilities
  if (
    event.button !== 0 ||
    capabilities?.firesTouchEvents ||
    Date.now() - (this._ripple?.lastTouchAt ?? -Infinity) < 800
  ) {
    return
  }
  createRipple.call(this, event)
}

function createKeyboardRipple(this: RippleHTMLElement, event: KeyboardEvent) {
  if (
    event.target !== this ||
    !this._ripple ||
    this._ripple.keyboardActive ||
    !(event.key === ' ' || event.key === 'Enter')
  ) {
    return
  }

  createRipple.call(this, event)
  this._ripple.keyboardActive = true
  this._ripple.keyboardKey = event.key
}

function removeKeyboardRipple(this: RippleHTMLElement, event: Event) {
  if (!this._ripple?.keyboardActive) {
    return
  }
  if (event.type === 'keyup' && (event as KeyboardEvent).key !== this._ripple.keyboardKey) {
    return
  }

  removeRipple.call(this)
  this._ripple.keyboardActive = false
  this._ripple.keyboardKey = undefined
}

function mounted(el: RippleHTMLElement, binding: DirectiveBinding<RippleOptions>) {
  el._ripple = {
    document: el.ownerDocument,
    tasker: null,
    color: binding.value?.color,
    disabled: binding.value?.disabled,
    timers: new Set(),
    keyboardActive: false,
    removeRipple: removeRipple.bind(el),
  }

  el.addEventListener('touchstart', createTouchRipple, { passive: true })
  el.addEventListener('mousedown', createMouseRipple, { passive: true })
  el.addEventListener('touchmove', forbidRippleTask, { passive: true })
  el.addEventListener('dragstart', removeRipple, { passive: true })
  el.addEventListener('keydown', createKeyboardRipple)
  el.addEventListener('keyup', removeKeyboardRipple)
  el.addEventListener('blur', removeKeyboardRipple)

  el._ripple.document.addEventListener('touchend', el._ripple.removeRipple, { passive: true })
  el._ripple.document.addEventListener('mouseup', el._ripple.removeRipple, { passive: true })
  el._ripple.document.defaultView?.addEventListener('blur', el._ripple.removeRipple)
  el._ripple.document.addEventListener('touchcancel', el._ripple.removeRipple, { passive: true })
  el._ripple.document.addEventListener('dragend', el._ripple.removeRipple, { passive: true })
}

function unmounted(el: RippleHTMLElement) {
  clearTasks(el)
  el.removeEventListener('keydown', createKeyboardRipple)
  el.removeEventListener('keyup', removeKeyboardRipple)
  el.removeEventListener('blur', removeKeyboardRipple)
  el.removeEventListener('touchstart', createTouchRipple)
  el.removeEventListener('mousedown', createMouseRipple)
  el.removeEventListener('touchmove', forbidRippleTask)
  el.removeEventListener('dragstart', removeRipple)

  if (!el._ripple || !el._ripple.removeRipple) {
    // may be null in nuxt
    return
  }

  el._ripple.document.removeEventListener('touchend', el._ripple.removeRipple)
  el._ripple.document.removeEventListener('mouseup', el._ripple.removeRipple)
  el._ripple.document.defaultView?.removeEventListener('blur', el._ripple.removeRipple)
  el._ripple.document.removeEventListener('touchcancel', el._ripple.removeRipple)
  el._ripple.document.removeEventListener('dragend', el._ripple.removeRipple)
  delete el._ripple
}

function updated(el: RippleHTMLElement, binding: DirectiveBinding<RippleOptions>) {
  const newBinding = {
    color: binding.value?.color,
    disabled: binding.value?.disabled,
  }

  const diff = newBinding.color !== el._ripple?.color || newBinding.disabled !== el._ripple?.disabled

  if (diff && el._ripple) {
    if (newBinding.disabled) {
      clearTasks(el)
    }
    Object.assign(el._ripple, newBinding)
  }
}

const Ripple: Directive & Plugin = {
  mounted,
  unmounted,
  updated,
  install(app: App) {
    app.directive('ripple', this)
  },
}

export type RippleInstance = typeof Ripple
export const _RippleComponent: typeof Ripple = Ripple
export { Ripple }

export default Ripple
