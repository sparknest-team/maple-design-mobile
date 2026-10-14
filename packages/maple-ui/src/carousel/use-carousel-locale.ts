import { computed } from 'vue'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'

export function useCarouselLocale() {
  const { t: translate } = injectLocaleProvider()
  const message = (key: string) => String((translate || t)(key))
  return computed(() => ({
    label: message('carousel.label'),
    previous: message('carousel.previous'),
    next: message('carousel.next'),
    slide: (index: number, total: number) =>
      message('carousel.slide').replace('{index}', String(index)).replace('{total}', String(total)),
    goto: (index: number) => message('carousel.goto').replace('{index}', String(index)),
  }))
}
