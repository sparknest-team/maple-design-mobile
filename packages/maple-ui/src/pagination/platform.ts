import { computed } from 'vue'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'

export { IconChevronLeft as IconPrevious, IconChevronRight as IconNext, IconMore } from '@maple-design/icons-vue'
export function usePaginationLocale() {
  const { t: pt } = injectLocaleProvider()
  const translate = (key: string) => String((pt || t)(key))
  return computed(() => ({
    navigation: String((pt || t)('paginationNavigation') ?? 'Pagination'),
    previous: String((pt || t)('paginationPrevious') ?? 'Previous page'),
    next: String((pt || t)('paginationNext') ?? 'Next page'),
    goto: translate('paginationJump'),
    perPage: `${translate('paginationItem')} / ${translate('paginationPage')}`,
    total: (n: number) => translate('paginationTotal').replace('{0}', String(n)),
    count: (n: number) => `${n} ${translate('paginationItem')} / ${translate('paginationPage')}`,
    page: (n: number) => `${translate('paginationJump')} ${n}`,
  }))
}
