import { type App, type Directive, type DirectiveBinding, type Plugin } from 'vue'
import { call, inViewport, removeItem } from '@maple-design/shared'
import { getAllParentScroller } from '../utils/elements'
import { createCache, type CacheInstance } from '../utils/shared'

export interface LazyOptions {
  loading?: string
  error?: string
  /** Total attempts, including the initial request. */
  attempt?: number
  throttleWait?: number
  filter?: (lazy: LazyContext) => void
  events?: string[]
}
export type LazyState = 'pending' | 'success' | 'error'
export type LazyContext = LazyOptions & {
  src: string
  arg: string | undefined
  currentAttempt: number
  attemptLock: boolean
  state: LazyState
  preloadImage?: HTMLImageElement
}
export type LazyHTMLElement = HTMLElement & { _lazy: LazyContext }
type ListenTarget = Window | HTMLElement
type Job = {
  context: LazyContext
  signature: string
  queued: boolean
  frame?: number
  cancelImage?: () => void
}
const BACKGROUND_IMAGE_ARG_NAME = 'background-image'
const LAZY_LOADING = 'lazy-loading'
const LAZY_ERROR = 'lazy-error'
const LAZY_ATTEMPT = 'lazy-attempt'
const EVENTS = ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
export const PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
const lazyElements: LazyHTMLElement[] = []
const jobs = new WeakMap<LazyHTMLElement, Job>()
const signatures = new WeakMap<LazyHTMLElement, string>()
const listenTargets = new Map<ListenTarget, string[]>()
export const imageCache: CacheInstance<string> = createCache<string>(100)
export const defaultLazyOptions: LazyOptions = {
  loading: PIXEL,
  error: PIXEL,
  attempt: 3,
  throttleWait: 300,
  events: EVENTS,
}
let timer: ReturnType<typeof setTimeout> | undefined
let lastCheck = 0
function cancelScheduledCheck() {
  if (timer !== undefined) {
    clearTimeout(timer)
  }
  timer = undefined
}
function scheduleCheck() {
  if (!lazyElements.length) {
    return
  }
  cancelScheduledCheck()
  const configured = Number(defaultLazyOptions.throttleWait)
  const wait = Number.isFinite(configured) ? Math.max(0, configured) : 300
  const remaining = wait - (performance.now() - lastCheck)
  if (remaining <= 0) {
    lastCheck = performance.now()
    checkAll()
  } else {
    timer = setTimeout(() => {
      timer = undefined
      lastCheck = performance.now()
      checkAll()
    }, remaining)
  }
}
function setSRC(el: LazyHTMLElement, src: string) {
  if (el._lazy.arg === BACKGROUND_IMAGE_ARG_NAME) {
    const escaped = src.replace(/["\\\n\r\f]/g, (char) =>
      char === '"' || char === '\\' ? '\\' + char : '\\' + char.charCodeAt(0).toString(16) + ' ',
    )
    el.style.backgroundImage = `url("${escaped}")`
  } else {
    el.setAttribute('src', src)
  }
}
function owns(el: LazyHTMLElement, job: Job) {
  return jobs.get(el) === job
}
function bindEvents(target: ListenTarget) {
  if (listenTargets.has(target)) {
    return
  }
  const events = [...new Set(defaultLazyOptions.events ?? [])]
  events.forEach((event) => target.addEventListener(event, scheduleCheck, { passive: true }))
  listenTargets.set(target, events)
}
function unbindEvents() {
  listenTargets.forEach((events, target) => events.forEach((event) => target.removeEventListener(event, scheduleCheck)))
  listenTargets.clear()
  cancelScheduledCheck()
}
function clear(el: LazyHTMLElement) {
  const job = jobs.get(el)
  jobs.delete(el)
  if (job) {
    if (job.frame !== undefined) {
      el.ownerDocument.defaultView?.cancelAnimationFrame(job.frame)
    }
    job.cancelImage?.()
  }
  removeItem(lazyElements, el)
  if (!lazyElements.length) {
    unbindEvents()
  }
}
function finish(el: LazyHTMLElement, job: Job, state: 'success' | 'error', src: string) {
  if (!owns(el, job)) {
    return
  }
  if (src) {
    setSRC(el, src)
  }
  job.context.state = state
  job.context.attemptLock = false
  clear(el)
  checkAll()
}
function normalizeAttempt(value: unknown) {
  const count = Number(value)
  return Number.isFinite(count) ? Math.max(1, Math.floor(count)) : 3
}
function attemptLoad(el: LazyHTMLElement, job: Job) {
  if (!owns(el, job) || job.context.attemptLock) {
    return
  }
  const context = job.context,
    src = context.src
  if (imageCache.has(src)) {
    finish(el, job, 'success', src)
    return
  }
  context.attemptLock = true
  context.currentAttempt++
  if (context.loading) {
    setSRC(el, context.loading)
  }
  const image = new Image()
  context.preloadImage = image
  const isCurrentImage = () => owns(el, job) && context.preloadImage === image && context.attemptLock
  const loaded = () => {
    if (!isCurrentImage()) {
      return
    }
    imageCache.add(src)
    finish(el, job, 'success', src)
  }
  const failed = () => {
    if (!isCurrentImage()) {
      return
    }
    job.cancelImage?.()
    context.attemptLock = false
    if (context.currentAttempt >= (context.attempt as number)) {
      finish(el, job, 'error', context.error ?? '')
    } else {
      attemptLoad(el, job)
    }
  }
  job.cancelImage = () => {
    image.removeEventListener('load', loaded)
    image.removeEventListener('error', failed)
    image.removeAttribute('src')
  }
  image.addEventListener('load', loaded)
  image.addEventListener('error', failed)
  image.src = src
}
function check(el: LazyHTMLElement) {
  const job = jobs.get(el),
    view = el.ownerDocument.defaultView
  if (!job || job.queued || !view) {
    return
  }
  job.queued = true
  job.frame = view.requestAnimationFrame(() => {
    if (!owns(el, job)) {
      return
    }
    job.frame = view.requestAnimationFrame(() => {
      if (!owns(el, job)) {
        return
      }
      job.frame = undefined
      job.queued = false
      if (inViewport(el)) {
        attemptLoad(el, job)
      }
    })
  })
}
function checkAll() {
  lazyElements.forEach(check)
}
function signature(el: HTMLElement, binding: DirectiveBinding<string>) {
  return JSON.stringify([
    binding.value,
    binding.arg,
    el.getAttribute(LAZY_LOADING),
    el.getAttribute(LAZY_ERROR),
    el.getAttribute(LAZY_ATTEMPT),
  ])
}
function mounted(el: LazyHTMLElement, binding: DirectiveBinding<string>) {
  clear(el)
  const context: LazyContext = {
    src: binding.value,
    arg: binding.arg,
    currentAttempt: 0,
    state: 'pending',
    attemptLock: false,
    loading: el.getAttribute(LAZY_LOADING) ?? defaultLazyOptions.loading,
    error: el.getAttribute(LAZY_ERROR) ?? defaultLazyOptions.error,
    attempt: normalizeAttempt(el.getAttribute(LAZY_ATTEMPT) ?? defaultLazyOptions.attempt),
  }
  el._lazy = context
  call(defaultLazyOptions.filter, context)
  context.attempt = normalizeAttempt(context.attempt)
  const job: Job = { context, signature: signature(el, binding), queued: false }
  jobs.set(el, job)
  signatures.set(el, job.signature)
  setSRC(el, PIXEL)
  lazyElements.push(el)
  getAllParentScroller(el).forEach(bindEvents)
  check(el)
}
function updated(el: LazyHTMLElement, binding: DirectiveBinding<string>) {
  if (signatures.get(el) !== signature(el, binding)) {
    mounted(el, binding)
  } else {
    check(el)
  }
}
function mergeLazyOptions(options: LazyOptions = {}) {
  for (const key of ['events', 'loading', 'error', 'attempt', 'throttleWait'] as const) {
    if (options[key] !== undefined) {
      Object.assign(defaultLazyOptions, { [key]: options[key] })
    }
  }
  defaultLazyOptions.filter = options.filter
}
const Lazy: Directive<LazyHTMLElement, string> & Plugin = {
  mounted,
  unmounted: clear,
  updated,
  install(app: App, options: LazyOptions = {}) {
    // Configuration and cache are module-wide; rebind exact old registrations.
    unbindEvents()
    mergeLazyOptions(options)
    lazyElements.forEach((el) => getAllParentScroller(el).forEach(bindEvents))
    app.directive('lazy', this)
  },
}
export type LazyInstance = typeof Lazy
export const _LazyComponent: typeof Lazy = Lazy
export default Lazy
