import type { Router } from 'vue-router'

const chunkFailure =
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Loading chunk .+ failed|Unable to preload CSS/i

/** A preview rebuild replaces hashed assets. Retry the requested route with the new entry once. */
export function installRouteRecovery(router: Router) {
  const key = `maple-site-route-retry:${window.location.pathname}`
  let retry: string | null = null
  try {
    retry = window.sessionStorage.getItem(key)
  } catch {
    /* Storage can be unavailable in embedded previews. */
  }
  router.onError((error, to) => {
    if (!chunkFailure.test(String(error?.message ?? error)) || retry === to.fullPath) {
      return
    }
    retry = to.fullPath
    try {
      window.sessionStorage.setItem(key, retry)
    } catch {
      /* The in-memory guard still prevents repeated retries. */
    }
    window.location.assign(router.resolve(to.fullPath).href)
    window.location.reload()
  })
  router.afterEach((_to, _from, failure) => {
    if (!failure) {
      retry = null
      try {
        window.sessionStorage.removeItem(key)
      } catch {
        /* No persistent guard was stored. */
      }
    }
  })
}
