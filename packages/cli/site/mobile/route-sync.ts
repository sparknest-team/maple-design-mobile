import { type NavigationFailure, type RouteLocationNormalizedLoaded } from 'vue-router'

export function shouldSyncMobileRoute(from: RouteLocationNormalizedLoaded, failure: NavigationFailure | void): boolean {
  return !failure && from.matched.length > 0
}

export function getDesktopPath(path: string, language: string): string {
  const unlocalized = path.replace(/^\/(?:zh-CN|en-US)(?=\/)/, '')
  return `/${language}${unlocalized}`
}
