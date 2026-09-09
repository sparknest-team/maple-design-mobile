import { computed, defineComponent, ref } from 'vue'
import Menu, { MenuOption } from '../menu'
import { createNamespace } from '../utils/components'
import { IconDown, IconMore } from './platform'
import { breadcrumbItemProps } from './props'
import { useBreadcrumb } from './provide'
import type { BreadcrumbRoute } from './types'

const { name, n, classes } = createNamespace('breadcrumb-item')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: breadcrumbItemProps,
  emits: {
    click: (_event: MouseEvent) => true,
    select: (_route: BreadcrumbRoute, _event?: Event) => true,
  },
  /**
   * @zh 自定义分隔符
   * @slot separator
   */
  /**
   * @zh 自定义下拉菜单
   * @slot droplist
   */
  setup(props, { slots, attrs, emit }) {
    const { index, breadcrumb, bindBreadcrumb } = useBreadcrumb()
    const dropdownVisible = ref(false)

    bindBreadcrumb?.(null)

    const total = computed(() => breadcrumb?.length?.value ?? 0)
    const maxCount = computed(() => breadcrumb?.maxCount?.value ?? 0)
    const needHide = computed(() => breadcrumb?.needHide?.value ?? false)
    const itemIndex = computed(() => props.index ?? index?.value ?? 0)

    const shouldRender = computed(() => {
      if (needHide.value) {
        if (itemIndex.value > 1 && itemIndex.value <= total.value - maxCount.value) {
          return false
        }
      }
      return true
    })

    const displayMore = computed(() => (needHide.value ? itemIndex.value === 1 : false))
    const isLast = computed(() => Boolean(breadcrumb) && itemIndex.value === total.value - 1)
    const hasDropdown = computed(() => !displayMore.value && Boolean(props.droplist?.length || slots.droplist))

    const showSeparator = computed(() => (breadcrumb ? itemIndex.value < total.value - 1 : true))

    const handleVisibleChange = (visible: boolean) => {
      dropdownVisible.value = visible
    }

    const renderSeparator = () => {
      if (!showSeparator.value) {
        return null
      }
      const separatorElement =
        slots.separator?.() ??
        props.separator ??
        breadcrumb?.slots?.separator?.() ??
        breadcrumb?.separator?.value ??
        '/'
      return (
        <div aria-hidden="true" class={n('separator')}>
          {separatorElement}
        </div>
      )
    }

    const handleClick = (event: MouseEvent) => {
      if (!displayMore.value) {
        emit('click', event)
      }
    }

    const renderItem = () => {
      const Tag = props.href && !displayMore.value ? 'a' : 'div'
      return (
        <div class={classes(n(), [hasDropdown.value, n('--with-dropdown')])}>
          <Tag
            class={n('content')}
            href={Tag === 'a' ? props.href : undefined}
            aria-current={isLast.value ? 'page' : undefined}
            onClick={handleClick}
            {...(displayMore.value ? { 'aria-label': 'ellipses of breadcrumb items' } : undefined)}
            {...attrs}
          >
            {displayMore.value
              ? (breadcrumb?.slots?.['more-icon']?.(breadcrumb.moreSlotData.value) ?? <IconMore />)
              : slots.default?.()}
            {hasDropdown.value && (
              <IconDown
                aria-hidden="true"
                class={classes(n('dropdown-icon'), [dropdownVisible.value, n('--dropdown-icon-active')])}
              />
            )}
          </Tag>
        </div>
      )
    }

    const renderDropdownContent = () =>
      slots.droplist?.() ?? props.droplist?.map((item) => <MenuOption value={item.path}>{item.label}</MenuOption>)

    const renderDropdown = () => (
      <Menu
        {...props.dropdownProps}
        v-slots={{ content: renderDropdownContent }}
        open={dropdownVisible.value}
        onUpdate:open={handleVisibleChange}
        onSelect={(value: unknown, _option: Record<string, any>, event: Event) => {
          const route = props.droplist?.find((item) => item.path === value)
          if (route) {
            emit('select', route, event)
          }
        }}
      >
        {renderItem()}
      </Menu>
    )

    return () => {
      if (!shouldRender.value) {
        return null
      }
      return (
        <>
          {hasDropdown.value ? renderDropdown() : renderItem()}
          {renderSeparator()}
        </>
      )
    }
  },
})
