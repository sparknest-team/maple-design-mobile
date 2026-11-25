import { type App, type Directive, type DirectiveBinding, type Plugin } from 'vue'
import { getRect, getStyle, supportTouch } from '@maple-design/shared-vue'
import context from '../context'
import { createNamespace } from '../utils/components'
import type { RippleDirectiveValue } from './props'

export type { RippleDirectiveValue } from './props'

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
  listening: boolean
  document: Document
  timers: Set<number>
  keyboardActive: boolean
  keyboardKey?: string
  migrationObserver?: MutationObserver
  lastTouchAt?: number
  color?: string
  disabled?: boolean
  tasker?: number | null
  styles?: Map<string, { value: string; priority: string; applied: string }>
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

function stopObserverIfIdle(element: RippleHTMLElement, state: RippleOptions) {
  if (!state.tasker && !ownedRipples(element).length) {
    state.migrationObserver?.disconnect()
    state.migrationObserver = undefined
  }
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
  state.migrationObserver?.disconnect()
  state.migrationObserver = undefined
  state.timers.forEach((timer) => window.clearTimeout(timer))
  state.timers.clear()
  state.tasker = null
  state.keyboardActive = false
  state.keyboardKey = undefined
  ownedRipples(element).forEach((ripple) => {
    waves.delete(ripple)
    ripple.remove()
  })
  restoreStyles(element)
}

function restoreStyles(element: RippleHTMLElement) {
  const styles = element._ripple?.styles
  if (!styles) {
    return
  }
  styles.forEach(({ value, priority, applied }, property) => {
    if (element.style.getPropertyValue(property) !== applied || element.style.getPropertyPriority(property)) {
      return
    }
    if (value) {
      element.style.setProperty(property, value, priority)
    } else {
      element.style.removeProperty(property)
    }
  })
  element._ripple!.styles = undefined
}

function setStyles(element: RippleHTMLElement) {
  if (element._ripple?.styles) {
    return
  }
  const { zIndex, position } = getStyle(element)
  const styles = new Map<string, { value: string; priority: string; applied: string }>()
  const set = (property: string, applied: string) => {
    styles.set(property, {
      value: element.style.getPropertyValue(property),
      priority: element.style.getPropertyPriority(property),
      applied,
    })
    element.style.setProperty(property, applied)
  }
  element._ripple!.styles = styles
  set('overflow-x', 'hidden')
  set('overflow-y', 'hidden')
  if (position === 'static') {
    set('position', 'relative')
  }
  if (zIndex === 'auto') {
    set('z-index', '1')
  }
}

function isTouchEvent(event: Event): event is TouchEvent {
  return 'touches' in event
}

function computeRippleStyles(element: RippleHTMLElement, event: TouchEvent | KeyboardEvent | MouseEvent): RippleStyles {
  const { top, left, width, height }: DOMRect = getRect(element)
  const { clientWidth, clientHeight } = element

  const radius: number = Math.sqrt(clientWidth ** 2 + clientHeight ** 2) / 2
  const size: number = radius * 2

  const point = isTouchEvent(event) ? event.touches[0] : 'clientX' in event ? event : undefined
  const localX = point
    ? (point.clientX - left) * (width ? (element.offsetWidth || width) / width : 1) - element.clientLeft
    : clientWidth / 2
  const localY = point
    ? (point.clientY - top) * (height ? (element.offsetHeight || height) / height : 1) - element.clientTop
    : clientHeight / 2

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
  syncOwnerDocument(this)
  _ripple.removeRipple()

  if (_ripple.disabled || _ripple.tasker || !context.enableRipple) {
    return
  }
  watchOwnerDuringGesture(this, _ripple)

  const task = () => {
    const current = () => this._ripple === _ripple && !_ripple.disabled && context.enableRipple
    if (!current()) {
      if (this._ripple === _ripple) {
        _ripple.tasker = null
        stopObserverIfIdle(this, _ripple)
      }
      return
    }
    _ripple.tasker = null

    // Layout reads can synchronously disable or replace this directive.
    const stillActive = () => {
      if (current()) {
        return true
      }
      if (this._ripple === _ripple) {
        clearTasks(this)
      }
      return false
    }
    const { x, y, centerX, centerY, size }: RippleStyles = computeRippleStyles(this, event)
    if (!stillActive()) {
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
    if (!stillActive()) {
      return
    }

    this.appendChild(ripple)
    const wave = { expandUntil: performance.now() + 20, released: false }
    waves.set(ripple, wave)
    const ownsWave = () => stillActive() && waves.get(ripple) === wave
    const expansion = transitionTime(ripple, 'transform')
    if (!ownsWave()) {
      return
    }
    wave.expandUntil += expansion

    schedule(
      this,
      () => {
        if (!ownsWave()) {
          return
        }
        const expansion = transitionTime(ripple, 'transform')
        if (!ownsWave()) {
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
      stopObserverIfIdle(this, _ripple)
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
          if (!ownedRipples(this).length) {
            restoreStyles(this)
            stopObserverIfIdle(this, _ripple)
          }
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
  stopObserverIfIdle(this, _ripple)
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

// A page may contain hundreds of buttons. Share release events per document,
// and bind disabled hosts only when they become enabled.
const releaseGroups = new WeakMap<Document, { hosts: Set<RippleHTMLElement>; release: () => void }>()
const releaseEvents = ['touchend', 'mouseup', 'touchcancel', 'dragend'] as const

function releaseOnMovedHost(this: RippleHTMLElement) {
  if (this._ripple && this._ripple.document !== this.ownerDocument) {
    syncOwnerDocument(this)
  }
}

function setHostListeners(element: RippleHTMLElement, enabled: boolean) {
  function listen<K extends keyof HTMLElementEventMap>(
    event: K,
    handler: (this: RippleHTMLElement, event: HTMLElementEventMap[K]) => void,
    options?: AddEventListenerOptions,
  ) {
    if (enabled) {
      element.addEventListener(event, handler, options)
    } else {
      element.removeEventListener(event, handler)
    }
  }
  listen('touchstart', createTouchRipple, { passive: true })
  listen('mousedown', createMouseRipple, { passive: true })
  listen('touchmove', forbidRippleTask, { passive: true })
  listen('mouseup', releaseOnMovedHost)
  listen('touchend', releaseOnMovedHost)
  listen('touchcancel', releaseOnMovedHost)
  listen('dragstart', removeRipple, { passive: true })
  listen('keydown', createKeyboardRipple)
  listen('keyup', removeKeyboardRipple)
  listen('blur', removeKeyboardRipple)
}

function bindListeners(el: RippleHTMLElement) {
  const state = el._ripple
  if (!state || state.listening || state.disabled) {
    return
  }
  state.listening = true
  setHostListeners(el, true)

  let group = releaseGroups.get(state.document)
  if (!group) {
    const hosts = new Set<RippleHTMLElement>()
    const release = () => {
      for (const host of hosts) {
        host._ripple?.removeRipple()
      }
    }
    group = { hosts, release }
    releaseGroups.set(state.document, group)
    for (const event of releaseEvents) {
      state.document.addEventListener(event, release, { passive: true })
    }
    state.document.defaultView?.addEventListener('blur', release)
  }
  group.hosts.add(el)
}

function unbindListeners(el: RippleHTMLElement) {
  const state = el._ripple
  if (!state?.listening) {
    return
  }
  state.listening = false
  setHostListeners(el, false)

  const group = releaseGroups.get(state.document)
  if (group && group.hosts.delete(el) && !group.hosts.size) {
    for (const event of releaseEvents) {
      state.document.removeEventListener(event, group.release)
    }
    state.document.defaultView?.removeEventListener('blur', group.release)
    releaseGroups.delete(state.document)
  }
}

function syncOwnerDocument(el: RippleHTMLElement) {
  const state = el._ripple
  if (!state || state.document === el.ownerDocument) {
    return
  }
  clearTasks(el)
  unbindListeners(el)
  state.document = el.ownerDocument
  bindListeners(el)
}

function watchOwnerDuringGesture(el: RippleHTMLElement, state: RippleOptions) {
  if (state.migrationObserver || typeof MutationObserver === 'undefined') {
    return
  }
  let connected = el.isConnected
  const observer = new MutationObserver(() => {
    if (el._ripple !== state) {
      return
    }
    if (state.document !== el.ownerDocument) {
      syncOwnerDocument(el)
    } else if (connected && !el.isConnected) {
      clearTasks(el)
    } else if (el.isConnected) {
      connected = true
    }
  })
  const root = el.getRootNode()
  observer.observe(root, { childList: true, subtree: true })
  if (root !== state.document) {
    observer.observe(state.document, { childList: true, subtree: true })
  }
  state.migrationObserver = observer
}

function mounted(el: RippleHTMLElement, binding: DirectiveBinding<RippleDirectiveValue | undefined>) {
  el._ripple = {
    document: el.ownerDocument,
    listening: false,
    tasker: null,
    color: binding.value?.color,
    disabled: binding.value?.disabled,
    timers: new Set(),
    keyboardActive: false,
    removeRipple: removeRipple.bind(el),
  }
  bindListeners(el)
}

function unmounted(el: RippleHTMLElement) {
  clearTasks(el)
  unbindListeners(el)
  delete el._ripple
}

function updated(el: RippleHTMLElement, binding: DirectiveBinding<RippleDirectiveValue | undefined>) {
  syncOwnerDocument(el)
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
    if (newBinding.disabled) {
      unbindListeners(el)
    } else {
      bindListeners(el)
    }
  }
}

const Ripple: Directive<HTMLElement, RippleDirectiveValue | undefined> & Plugin = {
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
