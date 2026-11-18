// A detached card cannot observe insertion into an unknown document or shadow root.
// A single timer is shared only while expanded cards need reconnection detection.
const checks = new Set<() => void>()
let timer: ReturnType<typeof setInterval> | undefined

export function watchDetachedCard(check: () => void): () => void {
  checks.add(check)
  if (timer === undefined) {
    timer = setInterval(() => {
      for (const callback of Array.from(checks)) {
        callback()
      }
    }, 250)
  }
  return () => {
    checks.delete(check)
    if (!checks.size && timer !== undefined) {
      clearInterval(timer)
      timer = undefined
    }
  }
}
