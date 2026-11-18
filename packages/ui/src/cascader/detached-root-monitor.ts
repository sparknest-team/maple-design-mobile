// A detached node cannot observe insertion into an unknown closed ShadowRoot.
// Share one low-frequency timer only while both ends of an open popup are detached.
const checks = new Set<() => void>()
let timer: ReturnType<typeof setInterval> | undefined

export function watchDetachedRoots(check: () => void): () => void {
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
