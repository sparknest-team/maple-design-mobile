import { computed } from 'vue'
import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t } from '../locale/state'
import {
  defaultCarouselGoto,
  defaultCarouselLabel,
  defaultCarouselNext,
  defaultCarouselPrevious,
  defaultCarouselSlide,
} from '../locale/zh-CN'

export function useCarouselLocale() {
  const { t: translate } = injectLocaleProvider()
  const defaults: Record<string, string> = {
    'carousel.label': defaultCarouselLabel,
    'carousel.previous': defaultCarouselPrevious,
    'carousel.next': defaultCarouselNext,
    'carousel.slide': defaultCarouselSlide,
    'carousel.goto': defaultCarouselGoto,
  }
  const message = (key: string) =>
    String(translate ? translate(key) : (t(key) ?? (!defaultLocaleReady.value ? defaults[key] : undefined)))
  return computed(() => ({
    label: message('carousel.label'),
    previous: message('carousel.previous'),
    next: message('carousel.next'),
    slide: (index: number, total: number) =>
      message('carousel.slide').replace('{index}', String(index)).replace('{total}', String(total)),
    goto: (index: number) => message('carousel.goto').replace('{index}', String(index)),
  }))
}
