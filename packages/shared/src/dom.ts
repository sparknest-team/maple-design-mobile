import { isWindow } from './predicates'

// Older Node runtimes can expose global without globalThis.
declare const global: typeof globalThis

function scheduler(): typeof globalThis {
  if (typeof globalThis === 'object') {
    return globalThis
  }
  if (typeof window !== 'undefined') {
    return window as unknown as typeof globalThis
  }
  if (typeof global !== 'undefined') {
    return global
  }
  return self as unknown as typeof globalThis
}

export function requestFrame(callback: FrameRequestCallback): number {
  const host = scheduler()
  if (host.requestAnimationFrame) {
    return host.requestAnimationFrame(callback)
  }
  return host.setTimeout(callback) as unknown as number
}

export function cancelFrame(handle: number | undefined): void {
  const host = scheduler()
  if (!host.cancelAnimationFrame) {
    host.clearTimeout(handle)
  } else {
    host.cancelAnimationFrame(handle as number)
  }
}

function afterFrames(count: number): Promise<unknown> {
  return new Promise((resolve) => {
    function advance(time: number) {
      if (--count === 0) {
        resolve(time)
      } else {
        requestFrame(advance)
      }
    }
    requestFrame(advance)
  })
}

export function raf(): Promise<unknown> {
  return afterFrames(1)
}

export function doubleRaf(): Promise<unknown> {
  return afterFrames(2)
}

export function getStyle(element: Element): CSSStyleDeclaration {
  return window.getComputedStyle(element)
}

export function getRect(element: Element | Window): DOMRect {
  if (!isWindow(element)) {
    return element.getBoundingClientRect()
  }
  const { innerWidth: width, innerHeight: height } = element
  const bounds = { x: 0, y: 0, top: 0, left: 0, right: width, bottom: height, width, height }
  return Object.assign({}, bounds, { toJSON: () => bounds })
}

export function getScrollLeft(element: Element | Window): number {
  const offset = 'scrollLeft' in element ? element.scrollLeft : element.scrollX
  return Math.max(0, offset)
}

export function getScrollTop(element: Element | Window): number {
  const offset = 'scrollTop' in element ? element.scrollTop : element.scrollY
  return Math.max(0, offset)
}

export function inViewport(element: HTMLElement): boolean {
  const box = getRect(element)
  const screen = getRect(window)
  return box.right >= 0 && box.bottom >= 0 && box.left <= screen.width && box.top <= screen.height
}

export function preventDefault(event: Event): void {
  if (event.cancelable === false) {
    return
  }
  event.preventDefault()
}
