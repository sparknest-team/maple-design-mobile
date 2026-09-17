import { computed, type ComputedRef } from 'vue'
import { IconEmpty as DefaultEmptyIcon } from '@maplejs/icons-vue'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'

export { DefaultEmptyIcon }

export function useDefaultDescription() {
  const { t: pt } = injectLocaleProvider()
  return computed(() => (pt ? pt : t)('emptyDescription'))
}

export function useConfigEmpty(_hasCustomContent: ComputedRef<boolean>) {
  return computed(() => null as unknown)
}

export function provideSkipConfigEmpty() {}
