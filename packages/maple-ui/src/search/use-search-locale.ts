import { computed } from 'vue'
import { t } from '../locale'

/** Read the existing global Locale; no component-local dictionary. */
export function useSearchLocale() {
  return {
    searchText: computed(() => String(t('search.search') ?? 'Search')),
    cancelText: computed(() => String(t('search.cancel') ?? 'Cancel')),
    historyText: computed(() => String(t('search.history') ?? 'Search history')),
  }
}
