const absoluteAssetRE = /^(?:[a-z][a-z\d+.-]*:|\/\/|\/|#)/i

/** Resolve a public asset against Vite's configured base path. */
export function resolveSiteAsset(source = '') {
  if (!source || absoluteAssetRE.test(source)) {
    return source
  }

  const base = import.meta.env.BASE_URL || '/'
  return `${base.endsWith('/') ? base : `${base}/`}${source.replace(/^\.\//, '')}`
}
