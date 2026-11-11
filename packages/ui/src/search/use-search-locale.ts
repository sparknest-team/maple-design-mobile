import { computed } from 'vue'
import { defaultLocaleReady, t } from '../locale/state'
import { defaultSearchCancel, defaultSearchHistory, defaultSearchSearch } from '../locale/zh-CN'

/** Read the existing global Locale; no component-local dictionary. */
export function useSearchLocale() {
  return {
    searchText: computed(() =>
      String(t('search.search') ?? (defaultLocaleReady.value ? 'Search' : defaultSearchSearch)),
    ),
    cancelText: computed(() =>
      String(t('search.cancel') ?? (defaultLocaleReady.value ? 'Cancel' : defaultSearchCancel)),
    ),
    historyText: computed(() =>
      String(t('search.history') ?? (defaultLocaleReady.value ? 'Search history' : defaultSearchHistory)),
    ),
  }
}
