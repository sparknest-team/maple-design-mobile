import { computed, ref } from 'vue'

export const siteLanguages = ['zh-CN', 'en-US'] as const
export type SiteLanguage = (typeof siteLanguages)[number]
const storageKey = 'maple-site-language'
export function normalizeLanguage(value: unknown, fallback: SiteLanguage = 'zh-CN'): SiteLanguage {
  return siteLanguages.includes(value as SiteLanguage) ? (value as SiteLanguage) : fallback
}
export function getSavedLanguage(fallback: SiteLanguage = 'zh-CN'): SiteLanguage {
  try {
    return normalizeLanguage(window.localStorage.getItem(storageKey), fallback)
  } catch {
    return fallback
  }
}
export function saveLanguage(value: unknown): SiteLanguage {
  const language = normalizeLanguage(value)
  if (typeof document !== 'undefined') {
    document.documentElement.lang = language
  }
  try {
    window.localStorage.setItem(storageKey, language)
  } catch {
    /* Storage may be unavailable. */
  }
  return language
}

// Demo titles are site metadata; demo SFCs do not need translation imports.
export function createDemoMessages(messages: Record<string, Record<string, string>>) {
  const language = ref<SiteLanguage>('zh-CN')
  const current = computed(() => messages[language.value] ?? messages['zh-CN'] ?? {})
  return {
    use: (value: string) => {
      language.value = normalizeLanguage(value)
    },
    t: (key: string) => current.value[key] ?? messages['zh-CN']?.[key] ?? key,
  }
}

/** Both the desktop docs route and the mobile demo route carry the site language. */
export function resolveDemoLanguage(hash: string, platform?: 'pc' | 'mobile'): string {
  const queryIndex = hash.indexOf('?')
  const query = new URLSearchParams(queryIndex < 0 ? '' : hash.slice(queryIndex + 1))
  const [, routeLanguage, page] = hash.slice(0, queryIndex < 0 ? undefined : queryIndex).split('/')

  if (platform === 'mobile') {
    return query.get('language') || 'zh-CN'
  }
  if (platform === 'pc') {
    return routeLanguage || 'zh-CN'
  }

  // Desktop: #/en-US/input; mobile/iframe: #/input?language=en-US.
  return query.get('language') || (page ? routeLanguage : undefined) || 'zh-CN'
}
