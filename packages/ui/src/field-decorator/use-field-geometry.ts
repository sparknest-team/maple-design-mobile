import { computed, onUpdated, ref, watch, type Ref } from 'vue'
import { createFrame } from '../_utils/animation-frame'
import { useDirection } from '../_utils/direction'
import { onActiveLifecycle } from '../utils/active-target'

/** Observe the content column, including a hidden popup becoming visible. */
export function useFieldGeometry(root: Ref<HTMLElement | undefined>, middle: Ref<HTMLElement | undefined>) {
  const { dir, isRtl } = useDirection(() => root.value)
  const offset = ref<number>()
  const width = ref<number>()
  let enabled = false
  let binding:
    | {
        host: HTMLElement
        content: HTMLElement
        view: Window
        schedule: () => void
        dispose: () => void
      }
    | undefined

  function sync() {
    if (!enabled) {
      return
    }
    const host = root.value
    const content = middle.value
    const view = host?.ownerDocument.defaultView
    if (binding && binding.host === host && binding.content === content && binding.view === view) {
      binding.schedule()
      return
    }
    binding?.dispose()
    if (!host || !content || !view) {
      return
    }
    bind(host, content, view)
  }

  function bind(host: HTMLElement, content: HTMLElement, view: Window & typeof globalThis) {
    const frame = createFrame()
    let revision = 0
    function measure() {
      const ticket = ++revision
      const current = () =>
        binding?.schedule === schedule && ticket === revision && root.value === host && middle.value === content
      if (!current()) {
        return
      }
      const rootWidth = host.clientWidth
      if (!current() || !rootWidth) {
        return
      }
      const left = content.offsetLeft
      if (!current()) {
        return
      }
      const contentWidth = content.offsetWidth
      if (!current()) {
        return
      }
      const nextOffset = isRtl.value ? rootWidth - left - contentWidth : left
      if (!current()) {
        return
      }
      offset.value = nextOffset
      if (current()) {
        width.value = contentWidth
      }
    }
    function schedule() {
      if (binding?.schedule !== schedule) {
        return
      }
      if (host.ownerDocument.defaultView !== view) {
        sync()
        return
      }
      if (typeof view.requestAnimationFrame === 'function') {
        frame.request(view, measure)
      } else {
        measure()
      }
    }
    const observer = view.ResizeObserver && new view.ResizeObserver(schedule)
    binding = {
      host,
      content,
      view,
      schedule,
      dispose() {
        binding = undefined
        frame.cancel()
        observer?.disconnect()
        view.removeEventListener('resize', schedule)
      },
    }
    observer?.observe(host)
    observer?.observe(content)
    view.addEventListener('resize', schedule)
    measure()
  }
  watch([root, middle, dir], sync, { flush: 'post' })
  onUpdated(sync)
  onActiveLifecycle(
    () => {
      if (!enabled) {
        enabled = true
        sync()
      }
    },
    () => {
      enabled = false
      binding?.dispose()
    },
  )

  return computed(() => ({
    '--mp-internal-field-hint-origin': isRtl.value ? 'right center' : undefined,
    '--mp-internal-field-content-offset': offset.value === undefined ? undefined : `${offset.value}px`,
    '--mp-internal-field-content-width': width.value === undefined ? undefined : `${width.value}px`,
  }))
}
