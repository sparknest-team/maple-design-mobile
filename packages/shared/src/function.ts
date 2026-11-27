export function call<P extends any[], R>(
  fn?: ((...args: P) => R) | ((...args: P) => R)[] | null,
  ...args: P
): R | R[] | undefined {
  if (!fn) {
    return undefined
  }
  if (typeof fn === 'function') {
    return fn(...args)
  }
  return fn.map((handler) => handler(...args))
}

export function throttle<F extends (...args: any[]) => any>(fn: F, delay = 200) {
  let previous = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  let latest: (() => void) | undefined

  function flush(): void {
    const now = performance.now()
    const elapsed = now - previous
    // The first call measures against the clock origin, subsequent ones
    // measure against the first observation or the last delivered call.
    if (!previous) {
      previous = now
    }
    if (elapsed >= delay) {
      const deliver = latest
      latest = undefined
      deliver?.()
      previous = now
    } else {
      timer = setTimeout(flush, delay - elapsed)
    }
  }

  return function (this: unknown, ...args: Parameters<F>): void {
    if (timer !== undefined) {
      clearTimeout(timer)
    }
    latest = () => Reflect.apply(fn, this, args)
    flush()
  }
}
