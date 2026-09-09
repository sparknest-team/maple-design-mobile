/** Every caller still settles; only the newest request may mutate visible state. */
export function createRequestGuard() {
  let revision = 0
  return {
    begin() {
      const current = ++revision
      return () => current === revision
    },
    invalidate() {
      revision++
    },
  }
}
