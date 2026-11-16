import { computed, defineComponent, getCurrentInstance, ref } from 'vue'
import Menu, { MenuOption } from '../menu'
import { createNamespace } from '../utils/components'
import { useId } from '../utils/vue-compat'
import { IconDown, IconMore, useBreadcrumbDropdownLabel, useBreadcrumbLabels } from './platform'
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
    const dropdownLabel = useBreadcrumbDropdownLabel()
    const labels = useBreadcrumbLabels()
    const uid = useId()
    const linkId = () => (typeof attrs.id === 'string' && attrs.id ? attrs.id : `breadcrumb-link-${uid}`)
    const labelId = `breadcrumb-actions-${uid}`
    const dropdownVisible = ref(false)
    const reference = ref<HTMLElement>()
    const pressed = ref(false)
    const instance = getCurrentInstance()!

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
      const hasClick = Boolean(instance.vnode.props?.onClick || instance.vnode.props?.onClickOnce)
      const interactive = !displayMore.value && Boolean(props.href || hasDropdown.value || hasClick)
      const splitDropdown = Boolean(props.href && hasDropdown.value)
      const Tag = props.href && !displayMore.value ? 'a' : interactive ? 'button' : 'div'
      return (
        <div class={classes(n(), [hasDropdown.value, n('--with-dropdown')], [splitDropdown, n('--split-dropdown')])}>
          <Tag
            ref={splitDropdown ? undefined : reference}
            class={classes(n('content'), [pressed.value, n('--pressed')])}
            onPointerdown={(event: PointerEvent) => {
              if (interactive && event.pointerType !== 'mouse' && event.button === 0) {
                pressed.value = true
                ;(event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId)
              }
            }}
            onPointerup={() => {
              pressed.value = false
            }}
            onPointercancel={() => {
              pressed.value = false
            }}
            {...{
              onLostpointercapture: () => {
                pressed.value = false
              },
            }}
            type={Tag === 'button' ? 'button' : undefined}
            href={Tag === 'a' ? props.href : undefined}
            aria-current={isLast.value ? 'page' : undefined}
            onClick={handleClick}
            {...(displayMore.value ? { 'aria-label': labels.ellipsis.value } : undefined)}
            {...attrs}
            id={splitDropdown ? linkId() : typeof attrs.id === 'string' ? attrs.id : undefined}
            aria-haspopup={hasDropdown.value && !splitDropdown ? 'menu' : undefined}
            aria-expanded={hasDropdown.value && !splitDropdown ? dropdownVisible.value : undefined}
          >
            {displayMore.value
              ? (breadcrumb?.slots?.['more-icon']?.(breadcrumb.moreSlotData.value) ?? <IconMore />)
              : slots.default?.()}
            {hasDropdown.value && !splitDropdown && (
              <IconDown
                aria-hidden="true"
                class={classes(n('dropdown-icon'), [dropdownVisible.value, n('--dropdown-icon-active')])}
              />
            )}
          </Tag>
          {splitDropdown && (
            <button
              ref={reference}
              type="button"
              class={n('dropdown-trigger')}
              aria-labelledby={`${linkId()} ${labelId}`}
              aria-haspopup="menu"
              aria-expanded={dropdownVisible.value}
            >
              <span id={labelId} class={n('dropdown-label')}>
                {dropdownLabel.value}
              </span>
              <IconDown
                aria-hidden="true"
                class={classes(n('dropdown-icon'), [dropdownVisible.value, n('--dropdown-icon-active')])}
              />
            </button>
          )}
        </div>
      )
    }

    const renderDropdownContent = () =>
      slots.droplist?.() ?? props.droplist?.map((item) => <MenuOption value={item.path}>{item.label}</MenuOption>)

    const renderDropdown = () => (
      <Menu
        {...props.dropdownProps}
        reference={props.dropdownProps?.reference ?? reference.value}
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
