import { getScrollLeft, getScrollTop } from '@maplejs/maple-shared'
import { easeInOutCubic } from '../utils/shared'

// Private consumer task: entry/settlement frames and interpolation share one owner.
// Unlike the generic scroll helper, cancellation must not jump to the target.
export function createIndexScrollTask(view: Window, isCurrent: () => boolean) {
  let cancelled = false
  const pending = new Map<number, (completed: boolean) => void>()
  const valid = () => !cancelled && isCurrent()
  const frame = () =>
    new Promise<boolean>((resolve) => {
      if (!valid()) {
        resolve(false)
        return
      }
      const id = view.requestAnimationFrame(() => {
        if (!pending.delete(id)) {
          return
        }
        resolve(valid())
      })
      pending.set(id, resolve)
    })
  const frames = async (count: number) => {
    for (let i = 0; i < count; i++) {
      if (!(await frame()) || !valid()) {
        return false
      }
    }
    return valid()
  }
  const scroll = async (target: HTMLElement | Window, left: number, top: number, duration: number) => {
    const start = Date.now()
    const initialLeft = getScrollLeft(target),
      initialTop = getScrollTop(target)
    const reduced = () =>
      typeof view.matchMedia === 'function' && view.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timed = Number.isFinite(duration) && duration > 0
    while (valid()) {
      if (!timed || reduced()) {
        target.scrollTo(left, top)
        return valid()
      }
      if (!(await frame()) || !valid()) {
        return false
      }
      const progress = Math.max(0, (Date.now() - start) / duration)
      if (reduced() || progress >= 1) {
        target.scrollTo(left, top)
        return valid()
      }
      const eased = easeInOutCubic(progress)
      target.scrollTo(initialLeft + (left - initialLeft) * eased, initialTop + (top - initialTop) * eased)
    }
    return false
  }
  return {
    valid,
    frames,
    scroll,
    cancel() {
      cancelled = true
      pending.forEach((resolve, id) => {
        view.cancelAnimationFrame(id)
        resolve(false)
      })
      pending.clear()
    },
  }
}
