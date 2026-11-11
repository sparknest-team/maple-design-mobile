import type { BreadcrumbInstance, BreadcrumbRoute } from '@maple-design/ui-vue'
import { breadcrumbItemProps, breadcrumbProps } from '@maple-design/ui-vue'
import { breadcrumbItemProps as subItemProps, breadcrumbProps as subProps } from '@maple-design/ui-vue/breadcrumb'

function select(instance: BreadcrumbInstance, route: BreadcrumbRoute, event: Event) {
  instance.$emit('select', route, event)
  instance.$emit('select', route)
  // @ts-expect-error A selected child must be a breadcrumb route.
  instance.$emit('select', 'child')
}
void select
const rootProps: typeof subProps = breadcrumbProps
const rootItemProps: typeof subItemProps = breadcrumbItemProps
void [rootProps, rootItemProps]
