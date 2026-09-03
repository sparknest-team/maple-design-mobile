import { useParent } from '@maplejs/maple-use'
import { BREADCRUMB_BIND_BREADCRUMB_ITEM_KEY, type BreadcrumbProvider } from './provide'

export function useBreadcrumbItem() {
  const { parentProvider, bindParent, index } = useParent<BreadcrumbProvider, null>(BREADCRUMB_BIND_BREADCRUMB_ITEM_KEY)

  return {
    index,
    breadcrumb: parentProvider,
    bindBreadcrumb: bindParent,
  }
}
