const locks = new WeakMap<HTMLElement, Map<string, { count: number; owned: boolean }>>()

export function acquireScrollLock(element: HTMLElement, className: string) {
  let classes = locks.get(element)
  if (!classes) {
    classes = new Map()
    locks.set(element, classes)
  }
  let entry = classes.get(className)
  if (!entry) {
    entry = { count: 0, owned: !element.classList.contains(className) }
    classes.set(className, entry)
    if (entry.owned) {
      element.classList.add(className)
    }
  }
  entry.count += 1
  let released = false
  return () => {
    if (released) {
      return
    }
    released = true
    entry!.count -= 1
    if (entry!.count === 0) {
      if (entry!.owned) {
        element.classList.remove(className)
      }
      classes!.delete(className)
      if (classes!.size === 0) {
        locks.delete(element)
      }
    }
  }
}
