export function mobilePreviewUrl(
  base: string,
  componentName: string,
  language: string,
  replace: string,
  hash = '',
  query: Record<string, unknown> = {},
) {
  const parameters = new URLSearchParams({ language, platform: 'pc', replace })
  for (const [key, value] of Object.entries(query)) {
    if (['language', 'platform', 'replace'].includes(key)) continue
    for (const item of Array.isArray(value) ? value : [value]) {
      if (item != null) parameters.append(key, String(item))
    }
  }
  return `${base}#/${componentName}?${parameters}${hash ? `#${hash.replace(/^#/, '')}` : ''}`
}
