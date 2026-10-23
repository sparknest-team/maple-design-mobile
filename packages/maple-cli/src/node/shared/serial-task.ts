/** Run watcher-triggered rebuilds one at a time, including after a failed run. */
export function createSerialTask() {
  let pending: Promise<unknown> = Promise.resolve()
  return <T>(task: () => Promise<T>): Promise<T> => {
    const next = pending.catch(() => undefined).then(task)
    pending = next
    return next
  }
}
