import { inBrowser, isWindow } from './predicates'

function getGlobalThis(): typeof globalThis {
  if (typeof globalThis !== 'undefined') {
    return globalThis
  }
  if (inBrowser()) {
    return window as unknown as typeof globalThis
  }
  return typeof global !== 'undefined' ? global : (self as unknown as typeof globalThis)
}

// Resolve the scheduler at call time so SSR and browser fallback behavior agree.
export function requestFrame(callback: FrameRequestCallback): number {
  const target = getGlobalThis()
  return target.requestAnimationFrame
    ? target.requestAnimationFrame(callback)
    : (target.setTimeout(callback) as unknown as number)
}

export function cancelFrame(handle: number | undefined): void {
  const target = getGlobalThis()
  if (target.cancelAnimationFrame) {
    target.cancelAnimationFrame(handle as number)
  } else {
    target.clearTimeout(handle)
  }
}

export function raf(): Promise<unknown> {
  return new Promise((resolve) => requestFrame(resolve))
}

export function doubleRaf(): Promise<unknown> {
  return new Promise((resolve) => requestFrame(() => requestFrame(resolve)))
}

export function getStyle(element: Element): CSSStyleDeclaration {
  return window.getComputedStyle(element)
}

export function getRect(element: Element | Window): DOMRect {
  if (isWindow(element)) {
    const width = element.innerWidth
    const height = element.innerHeight
    const rect = { x: 0, y: 0, top: 0, left: 0, right: width, bottom: height, width, height }
    return { ...rect, toJSON: () => rect }
  }
  return element.getBoundingClientRect()
}

export function getScrollLeft(element: Element | Window): number {
  return Math.max('scrollLeft' in element ? element.scrollLeft : element.scrollX, 0)
}

export function getScrollTop(element: Element | Window): number {
  return Math.max('scrollTop' in element ? element.scrollTop : element.scrollY, 0)
}

export function inViewport(element: HTMLElement): boolean {
  const { top, bottom, left, right } = getRect(element)
  const { width, height } = getRect(window)
  return left <= width && right >= 0 && top <= height && bottom >= 0
}

export function preventDefault(event: Event): void {
  if (event.cancelable !== false) {
    event.preventDefault()
  }
}
