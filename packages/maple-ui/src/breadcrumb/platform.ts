import { computed } from 'vue'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'

export { IconMore, IconChevronDown as IconDown } from '@maple-design/icons-vue'

export function useBreadcrumbDropdownLabel() {
  const { t: localize } = injectLocaleProvider()
  return computed(() => localize?.('splitButton.moreActions') ?? t('splitButton.moreActions') ?? 'More actions')
}

export function useBreadcrumbLabels() {
  const { t: localize } = injectLocaleProvider()
  return {
    label: computed(() => localize?.('breadcrumb.label') ?? t('breadcrumb.label') ?? 'Breadcrumb'),
    ellipsis: computed(
      () => localize?.('breadcrumb.ellipsis') ?? t('breadcrumb.ellipsis') ?? 'Omitted breadcrumb items',
    ),
  }
}
