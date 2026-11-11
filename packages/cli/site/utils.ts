export interface Menu {
  doc: string
  text: Record<string, string>
  type: MenuTypes
  useMobile?: boolean
  parent?: string
}

export enum MenuTypes {
  TITLE = 1,
  COMPONENT = 2,
  DOCUMENTATION = 3,
}

export function removeEmpty(object: Record<string, string> = {}) {
  return Object.keys(object).reduce((record: Record<string, string>, key) => {
    const value = object[key]
    value && (record[key] = value)
    return record
  }, {})
}

const absoluteAssetRE = /^(?:[a-z][a-z\d+.-]*:|\/\/|\/|#)/i

/** Resolve a public asset against Vite's configured base path. */
export function resolveSiteAsset(source = '') {
  if (!source || absoluteAssetRE.test(source)) {
    return source
  }

  const base = import.meta.env.BASE_URL || '/'
  return `${base.endsWith('/') ? base : `${base}/`}${source.replace(/^\.\//, '')}`
}

export function isPhone() {
  return /Android|webOS|iPhone|iPod|BlackBerry|Pad/i.test(navigator.userAgent)
}

export function inIframe() {
  return window.self !== window.top
}

export function utoa(data: string): string {
  return btoa(unescape(encodeURIComponent(data)))
}
