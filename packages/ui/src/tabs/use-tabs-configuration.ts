import { computed, type ComputedRef } from 'vue'
import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t } from '../locale/state'
import { defaultTabsAdd, defaultTabsClose, defaultTabsNext, defaultTabsPrevious } from '../locale/zh-CN'
import type { ComponentSize } from '../utils/constants'

// Maple has no global size/RTL provider. Explicit size/default setters and DOM dir remain supported.
export function useTabsConfiguration(size: ComputedRef<ComponentSize | undefined>) {
  return { size: computed(() => size.value ?? 'md') }
}

export function useTabsLocale() {
  const { t: localize } = injectLocaleProvider()
  const get = (key: 'tabs.close' | 'tabs.add' | 'tabs.previous' | 'tabs.next', initial: string, fallback: string) =>
    localize?.(key) ?? t(key) ?? (defaultLocaleReady.value ? fallback : initial)
  return computed(() => ({
    close: get('tabs.close', defaultTabsClose, 'Close'),
    add: get('tabs.add', defaultTabsAdd, 'Add tab'),
    previous: get('tabs.previous', defaultTabsPrevious, 'Previous tabs'),
    next: get('tabs.next', defaultTabsNext, 'Next tabs'),
  }))
}
