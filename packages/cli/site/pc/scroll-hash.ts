import type { Router } from 'vue-router'

// Keep the passive section indicator out of Vue Router's navigation pipeline.
export function createScrollHashSync(router: Router) {
  const history = router.options.history
  let navigationTarget: object | undefined
  const removeBefore = router.beforeEach((to) => {
    navigationTarget = to
  })
  const finish = (to: object) => {
    if (navigationTarget === to) navigationTarget = undefined
  }
  const removeAfter = router.afterEach(finish)
  const removeError = router.onError((_error, to) => finish(to))

  return {
    dispose() {
      removeBefore()
      removeAfter()
      removeError()
    },
    replace(hash: string) {
      if (navigationTarget) return
      const { path, query } = router.currentRoute.value
      const target = router.resolve({ path, query, hash }).fullPath
      // During a popstate, the browser location changes before the route commits.
      if (history.location.split('#')[0] !== target.split('#')[0]) return
      if (history.location !== target) history.replace(target)
    },
  }
}
