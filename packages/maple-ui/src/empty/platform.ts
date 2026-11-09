import { computed, type Ref } from 'vue'
import { IconEmpty as DefaultEmptyIcon } from '@maple-design/icons-vue'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'

export { DefaultEmptyIcon }

export function useDefaultDescription() {
  const { t: pt } = injectLocaleProvider()
  return computed(() => (pt ? pt : t)('emptyDescription'))
}

export function useConfigEmpty(_hasCustomContent: Readonly<Ref<boolean>>) {
  return computed(() => null as unknown)
}

export function provideSkipConfigEmpty() {}
