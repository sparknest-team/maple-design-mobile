import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'

export type InfiniteScrollLocaleKey = 'loading' | 'error' | 'finished'

const localeKeys: Record<InfiniteScrollLocaleKey, string> = {
  loading: 'infiniteScrollLoadingText',
  error: 'infiniteScrollErrorText',
  finished: 'infiniteScrollFinishedText',
}

export function useInfiniteScrollLocale() {
  const { t: providerTranslate } = injectLocaleProvider()
  return (key: InfiniteScrollLocaleKey) => (providerTranslate ?? t)(localeKeys[key]) ?? ''
}
