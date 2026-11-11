import type { Router } from 'vue-router'

// Like Cedar's active-header-links: replace the URL without navigating the
// viewport or adding a back entry. Keep preview navigation separate from this.
export function createScrollHashSync(router: Router) {
  let pending = false
  return {
    get pending() {
      return pending
    },
    async replace(hash: string) {
      if (pending || router.currentRoute.value.hash === hash) return
      const { path, query } = router.currentRoute.value
      const scrollBehavior = router.options.scrollBehavior
      pending = true
      router.options.scrollBehavior = undefined
      try {
        await router.replace({ path, query, hash })
      } finally {
        router.options.scrollBehavior = scrollBehavior
        pending = false
      }
    },
  }
}
