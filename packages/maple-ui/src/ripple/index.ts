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
  timers: Set<number>
  keyboardActive: boolean
  color?: string
  disabled?: boolean
  tasker?: number | null
}

interface RippleHTMLElement extends HTMLElement {
  _ripple?: RippleOptions
}

const ANIMATION_DURATION = 250

function schedule(element: RippleHTMLElement, task: () => void, delay: number) {
  const state = element._ripple
  if (!state) {
    return
  }
  const timer = window.setTimeout(() => {
    state.timers.delete(timer)
    if (element._ripple === state) {
      task()
    }
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
  element.querySelectorAll(`.${n()}`).forEach((ripple) => ripple.remove())
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

function computeRippleStyles(element: RippleHTMLElement, event: TouchEvent | KeyboardEvent): RippleStyles {
  const { top, left }: DOMRect = getRect(element)
  const { clientWidth, clientHeight } = element

  const radius: number = Math.sqrt(clientWidth ** 2 + clientHeight ** 2) / 2
  const size: number = radius * 2

  const localX: number = isTouchEvent(event) ? event.touches[0].clientX - left : clientWidth / 2
  const localY: number = isTouchEvent(event) ? event.touches[0].clientY - top : clientHeight / 2

  const centerX: number = (clientWidth - radius * 2) / 2
  const centerY: number = (clientHeight - radius * 2) / 2

  const x: number = localX - radius
  const y: number = localY - radius

  return { x, y, centerX, centerY, size }
}

function createRipple(this: RippleHTMLElement, event: TouchEvent | KeyboardEvent) {
  const _ripple = this._ripple as RippleOptions
  if (!_ripple) {
    return
  }
  _ripple.removeRipple()

  if (_ripple.disabled || _ripple.tasker || !context.enableRipple) {
    return
  }

  const task = () => {
    _ripple.tasker = null

    const { x, y, centerX, centerY, size }: RippleStyles = computeRippleStyles(this, event)
    const ripple: RippleHTMLElement = document.createElement('div')
    ripple.classList.add(n())
    ripple.style.opacity = `0`
    ripple.style.transform = `translate(${x}px, ${y}px) scale3d(.3, .3, .3)`
    ripple.style.width = `${size}px`
    ripple.style.height = `${size}px`
    _ripple.color && (ripple.style.backgroundColor = _ripple.color)
    ripple.dataset.createdAt = String(performance.now())

    setStyles(this)

    this.appendChild(ripple)

    schedule(
      this,
      () => {
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
    const ripples: NodeListOf<RippleHTMLElement> = this.querySelectorAll(`.${n()}`)
    if (!ripples.length) {
      return
    }

    const lastRipple: RippleHTMLElement = ripples[ripples.length - 1]
    const delay: number = ANIMATION_DURATION - performance.now() + Number(lastRipple.dataset.createdAt)

    schedule(
      this,
      () => {
        lastRipple.style.opacity = `0`

        schedule(this, () => lastRipple.parentNode?.removeChild(lastRipple), ANIMATION_DURATION)
      },
      delay,
    )
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

function createKeyboardRipple(this: RippleHTMLElement, event: KeyboardEvent) {
  if (!this._ripple || this._ripple.keyboardActive || !(event.key === ' ' || event.key === 'Enter')) {
    return
  }

  createRipple.call(this, event)
  this._ripple.keyboardActive = true
}

function removeKeyboardRipple(this: RippleHTMLElement) {
  if (!this._ripple?.keyboardActive) {
    return
  }

  removeRipple.call(this)
  this._ripple.keyboardActive = false
}

function mounted(el: RippleHTMLElement, binding: DirectiveBinding<RippleOptions>) {
  el._ripple = {
    tasker: null,
    color: binding.value?.color,
    disabled: binding.value?.disabled,
    timers: new Set(),
    keyboardActive: false,
    removeRipple: removeRipple.bind(el),
  }

  el.addEventListener('touchstart', createRipple, { passive: true })
  el.addEventListener('touchmove', forbidRippleTask, { passive: true })
  el.addEventListener('dragstart', removeRipple, { passive: true })
  el.addEventListener('keydown', createKeyboardRipple)
  el.addEventListener('keyup', removeKeyboardRipple)
  el.addEventListener('blur', removeKeyboardRipple)

  document.addEventListener('touchend', el._ripple.removeRipple, { passive: true })
  document.addEventListener('touchcancel', el._ripple.removeRipple, { passive: true })
  document.addEventListener('dragend', el._ripple.removeRipple, { passive: true })
}

function unmounted(el: RippleHTMLElement) {
  clearTasks(el)
  el.removeEventListener('keydown', createKeyboardRipple)
  el.removeEventListener('keyup', removeKeyboardRipple)
  el.removeEventListener('blur', removeKeyboardRipple)
  el.removeEventListener('touchstart', createRipple)
  el.removeEventListener('touchmove', forbidRippleTask)
  el.removeEventListener('dragstart', removeRipple)

  if (!el._ripple || !el._ripple.removeRipple) {
    // may be null in nuxt
    return
  }

  document.removeEventListener('touchend', el._ripple!.removeRipple)
  document.removeEventListener('touchcancel', el._ripple!.removeRipple)
  document.removeEventListener('dragend', el._ripple!.removeRipple)
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
