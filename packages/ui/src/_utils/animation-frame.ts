export function createFrame() {
  let pending: (() => void) | undefined
  return {
    request(view: Window, callback: FrameRequestCallback) {
      if (pending) {
        return
      }
      const cancel = () => view.cancelAnimationFrame(id)
      const id = view.requestAnimationFrame((time) => {
        if (pending !== cancel) {
          return
        }
        pending = undefined
        callback(time)
      })
      pending = cancel
    },
    cancel() {
      const cancel = pending
      pending = undefined
      cancel?.()
    },
  }
}
