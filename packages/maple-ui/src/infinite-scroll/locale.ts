import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t } from '../locale/state'
import { defaultInfiniteErrorText, defaultInfiniteFinishedText, defaultLoadingText } from '../locale/zh-CN'

export type InfiniteScrollLocaleKey = 'loading' | 'error' | 'finished'

const localeKeys: Record<InfiniteScrollLocaleKey, string> = {
  loading: 'infiniteScrollLoadingText',
  error: 'infiniteScrollErrorText',
  finished: 'infiniteScrollFinishedText',
}

const defaults: Record<InfiniteScrollLocaleKey, string> = {
  loading: defaultLoadingText,
  error: defaultInfiniteErrorText,
  finished: defaultInfiniteFinishedText,
}

export function useInfiniteScrollLocale() {
  const { t: providerTranslate } = injectLocaleProvider()
  return (key: InfiniteScrollLocaleKey) => {
    const value = providerTranslate ? providerTranslate(localeKeys[key]) : t(localeKeys[key])
    return value ?? (!providerTranslate && !defaultLocaleReady.value ? defaults[key] : '')
  }
}
