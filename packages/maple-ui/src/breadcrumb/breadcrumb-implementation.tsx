import { cloneVNode, computed, defineComponent, shallowRef } from 'vue'
import { createNamespace } from '../utils/components'
import BreadcrumbItem from './breadcrumb-item'
import { flatChildren } from './children'
import { useBreadcrumbLabels } from './platform'
import { breadcrumbProps } from './props'
import { useBreadcrumbItems } from './provide'
import type { BreadcrumbRoute } from './types'

const { name, n } = createNamespace('breadcrumb')

export default defineComponent({
  name,
  props: breadcrumbProps,
  emits: { select: (_route: BreadcrumbRoute, _event?: Event) => true },
  /**
   * @zh 自定义分隔符
   * @slot separator
   */
  /**
   * @zh routes 设置时生效，自定义渲染面包屑
   * @binding {BreadcrumbRoute} route
   * @binding {BreadcrumbRoute[]} routes
   * @binding {string[]} paths
   * @slot item-render
   */
  /**
   * @zh 自定义更多图标
   * @slot more-icon
   */
  setup(props, { slots, emit }) {
    const { length, bindBreadcrumbItems } = useBreadcrumbItems()
    const labels = useBreadcrumbLabels()

    const maxCount = computed(() =>
      Number.isFinite(props.maxCount) && props.maxCount > 0 ? Math.max(2, Math.floor(props.maxCount)) : 0,
    )
    const separator = computed(() => props.separator)
    const renderedLength = shallowRef(0)
    const total = computed(() => renderedLength.value || length.value)
    const needHide = computed(() => maxCount.value > 0 && total.value > maxCount.value + 1)
    const moreSlotData = computed(() => {
      const end = needHide.value ? total.value - maxCount.value : 0
      return {
        omittedItems: props.routes?.slice(1, end + 1) ?? [],
        count: needHide.value ? end : 0,
        start: needHide.value ? 1 : -1,
        end: needHide.value ? end : -1,
      }
    })

    bindBreadcrumbItems({
      length: total,
      maxCount,
      separator,
      needHide,
      moreSlotData,
      slots,
    })

    const defaultItemRender = (route: BreadcrumbRoute, _list: BreadcrumbRoute[], _paths: string[]) => {
      return route.label
    }

    const renderByRoutes = () => {
      if (!props.routes?.length) {
        return null
      }

      const paths: string[] = []

      return props.routes.map((route, idx, origin) => {
        paths.push((route.path || '').replace(/^\//, ''))
        const currentPaths = [...paths]
        return (
          <BreadcrumbItem
            key={`${route.path}-${idx}`}
            index={idx}
            droplist={route.children}
            onSelect={(selected: BreadcrumbRoute, event?: Event) => emit('select', selected, event)}
            href={slots['item-render'] || idx === origin.length - 1 ? undefined : route.path}
            v-slots={{
              default: () =>
                slots['item-render']?.({ route, routes: origin, paths: currentPaths }) ??
                defaultItemRender(route, origin, currentPaths),
            }}
          />
        )
      })
    }

    return () => {
      const children = flatChildren(slots.default?.() ?? [])
      renderedLength.value = props.routes?.length || children.length
      return (
        <div role="navigation" aria-label={labels.label.value} class={n()}>
          {props.routes?.length ? renderByRoutes() : children.map((child, index) => cloneVNode(child, { index }))}
        </div>
      )
    }
  },
})
