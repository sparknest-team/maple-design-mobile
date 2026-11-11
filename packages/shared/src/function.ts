import { isArray } from './predicates'

export function call<P extends any[], R>(
  fn?: ((...args: P) => R) | ((...args: P) => R)[] | null,
  ...args: P
): R | R[] | undefined {
  if (isArray(fn)) {
    return fn.map((callback) => callback(...args))
  }
  if (fn) {
    return fn(...args)
  }
}

export function throttle<F extends (...args: any[]) => any>(fn: F, delay = 200) {
  let timer: ReturnType<typeof setTimeout> | undefined
  let start = 0
  return function loop(this: unknown, ...args: Parameters<F>): void {
    const now = performance.now()
    const elapsed = now - start
    if (!start) {
      start = now
    }
    if (timer) {
      clearTimeout(timer)
    }
    if (elapsed >= delay) {
      fn.apply(this, args)
      start = now
    } else {
      timer = setTimeout(() => loop.apply(this, args), delay - elapsed)
    }
  }
}
