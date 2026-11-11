import { computed } from 'vue'
import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t } from '../locale/state'
import { defaultBreadcrumbEllipsis, defaultBreadcrumbLabel, defaultMoreActions } from '../locale/zh-CN'

export { IconMore, IconChevronDown as IconDown } from '@maple-design/icons-vue'

export function useBreadcrumbDropdownLabel() {
  const { t: localize } = injectLocaleProvider()
  return computed(
    () =>
      localize?.('splitButton.moreActions') ??
      t('splitButton.moreActions') ??
      (defaultLocaleReady.value ? 'More actions' : defaultMoreActions),
  )
}

export function useBreadcrumbLabels() {
  const { t: localize } = injectLocaleProvider()
  return {
    label: computed(
      () =>
        localize?.('breadcrumb.label') ??
        t('breadcrumb.label') ??
        (defaultLocaleReady.value ? 'Breadcrumb' : defaultBreadcrumbLabel),
    ),
    ellipsis: computed(
      () =>
        localize?.('breadcrumb.ellipsis') ??
        t('breadcrumb.ellipsis') ??
        (defaultLocaleReady.value ? 'Omitted breadcrumb items' : defaultBreadcrumbEllipsis),
    ),
  }
}
