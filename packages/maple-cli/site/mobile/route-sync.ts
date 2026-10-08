import { type NavigationFailure, type RouteLocationNormalizedLoaded } from 'vue-router'

export function shouldSyncMobileRoute(from: RouteLocationNormalizedLoaded, failure: NavigationFailure | void): boolean {
  return !failure && from.matched.length > 0
}
