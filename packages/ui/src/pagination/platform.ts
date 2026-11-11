import { computed } from 'vue'
import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t } from '../locale/state'
import {
  defaultPaginationItem,
  defaultPaginationJump,
  defaultPaginationNavigation,
  defaultPaginationNext,
  defaultPaginationPage,
  defaultPaginationPrevious,
  defaultPaginationTotal,
} from '../locale/zh-CN'

export { IconChevronLeft as IconPrevious, IconChevronRight as IconNext, IconMore } from '@maple-design/icons-vue'
const defaults: Record<string, string> = {
  paginationItem: defaultPaginationItem,
  paginationPage: defaultPaginationPage,
  paginationNavigation: defaultPaginationNavigation,
  paginationPrevious: defaultPaginationPrevious,
  paginationNext: defaultPaginationNext,
  paginationJump: defaultPaginationJump,
  paginationTotal: defaultPaginationTotal,
}

export function usePaginationLocale() {
  const { t: pt } = injectLocaleProvider()
  const localize = (key: string) => {
    if (pt) {
      return pt(key)
    }
    const value = t(key)
    return defaultLocaleReady.value ? value : (value ?? defaults[key])
  }
  const translate = (key: string) => String(localize(key))
  return computed(() => ({
    navigation: String(localize('paginationNavigation') ?? 'Pagination'),
    previous: String(localize('paginationPrevious') ?? 'Previous page'),
    next: String(localize('paginationNext') ?? 'Next page'),
    goto: translate('paginationJump'),
    perPage: `${translate('paginationItem')} / ${translate('paginationPage')}`,
    total: (n: number) => translate('paginationTotal').replace('{0}', String(n)),
    count: (n: number) => `${n} ${translate('paginationItem')} / ${translate('paginationPage')}`,
    page: (n: number) => `${translate('paginationJump')} ${n}`,
  }))
}
