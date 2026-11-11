import { computed, defineComponent, ref, Transition, useId, watch, type SlotsType, type VNodeChild } from 'vue'
import { IconClose, IconPlus } from '@maple-design/icons-vue'
import { call, isBoolean } from '@maple-design/shared-vue'
import { useClickOutside } from '@maple-design/use-vue'
import Button from '../button'
import Drag from '../drag'
import Icon from '../icon'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import { createNamespace, flatFragment } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { resolvePopupContainer } from '../utils/popup-container'
import { props, type FabTriggerProps } from './props'

const { name, classes, n } = createNamespace('fab')

export default defineComponent({
  name,
  inheritAttrs: false,
  slots: Object as SlotsType<{
    trigger: (scope: { open: boolean; triggerProps: FabTriggerProps }) => VNodeChild
    default: () => VNodeChild
  }>,
  props,
  emits: {
    click: (_open: boolean, _event: Event) => true,
    close: () => true,
    open: () => true,
    opened: (_element: Element) => true,
    closed: (_element: Element) => true,
    'update:open': (_value: boolean) => true,
  },
  setup(props, { slots, attrs, emit }) {
    const localOpen = ref(props.defaultOpen)
    const isOpen = computed({
      get: () => props.open ?? localOpen.value,
      set: (value: boolean) => {
        if (value === isOpen.value) {
          return
        }
        if (props.open === undefined) {
          localOpen.value = value
        }
        emit('update:open', value)
      },
    })
    const popupContainer = computed(() => resolvePopupContainer(props.popupContainer))
    const host = ref<null | HTMLElement>(null)
    const actions = ref<null | HTMLElement>(null)
    const actionsId = `fab-actions-${useId()}`
    const { t: localT } = injectLocaleProvider()
    let pointerInside = false
    let lastTrigger: HTMLElement | null = null
    const dragRef = ref<InstanceType<typeof Drag> | null>(null)

    watch(
      () => props.trigger,
      () => {
        isOpen.value = false
      },
    )

    watch(
      () => props.disabled,
      () => {
        isOpen.value = false
      },
    )

    watch(
      () => [props.position, props.fixed, props.top, props.bottom, props.left, props.right],
      () => {
        dragRef.value?.reset()
      },
    )

    useClickOutside(host, 'click', handleClickOutside)

    function handleClick(e: Event, value: boolean, childrenLength: number) {
      e.stopPropagation()

      if (!props.visible || (props.trigger !== 'click' && !('detail' in e && e.detail === 0)) || props.disabled) {
        return
      }

      if (childrenLength === 0) {
        emit('click', isOpen.value, e)
        return
      }

      isOpen.value = value
      emit('click', value, e)
      value ? emit('open') : emit('close')
    }

    function handleMouse(value: boolean, childrenLength: number) {
      pointerInside = value
      if (!value && host.value?.contains(host.value.ownerDocument.activeElement)) {
        return
      }
      if (!props.visible || props.trigger !== 'hover' || props.disabled || childrenLength === 0) {
        return
      }

      isOpen.value = value
      value ? emit('open') : emit('close')
    }

    function handleClickOutside() {
      if (!props.visible || props.trigger !== 'click' || props.disabled) {
        return
      }

      if (isOpen.value !== false) {
        isOpen.value = false
        emit('close')
      }
    }

    function renderTrigger(childrenLength: number) {
      const explicitLabel = attrs['aria-label']
      const labelledby = attrs['aria-labelledby']
      const triggerProps: FabTriggerProps = {
        ...(typeof explicitLabel === 'string' ? { 'aria-label': explicitLabel } : {}),
        ...(typeof labelledby === 'string' ? { 'aria-labelledby': labelledby } : {}),
        ...(childrenLength ? { 'aria-expanded': isOpen.value, 'aria-controls': actionsId } : {}),
      }
      if (slots.trigger) {
        return slots.trigger({ open: isOpen.value, triggerProps })
      }

      const iconName = isOpen.value ? props.openIcon : props.closedIcon
      const builtinIcon = iconName === 'plus' ? IconPlus : iconName === 'close' ? IconClose : undefined

      return (
        <Button
          mp-fab-cover
          {...triggerProps}
          aria-label={
            typeof explicitLabel === 'string'
              ? explicitLabel
              : labelledby == null
                ? ((localT || t)('fab.actions') ?? 'Actions')
                : undefined
          }
          class={n('trigger')}
          status={props.status}
          color={props.color}
          disabled={props.disabled}
          elevation={props.elevation}
          variant="tonal"
          v-slots={{
            icon: () => (
              <Icon
                mp-fab-cover
                class={classes([isOpen.value, n('trigger-active-icon'), n('trigger-inactive-icon')])}
                name={isOpen.value ? props.openIcon : props.closedIcon}
                size={isOpen.value ? props.openIconSize : props.closedIconSize}
                transition={200}
                animationClass={n('--trigger-icon-animation')}
                v-slots={
                  builtinIcon
                    ? {
                        default: () => {
                          const BuiltinIcon = builtinIcon
                          return <BuiltinIcon />
                        },
                      }
                    : undefined
                }
              />
            ),
          }}
        />
      )
    }

    return () => {
      const children = flatFragment(call(slots.default) ?? [])
      const dragProps = isBoolean(props.drag) ? {} : props.drag
      const { 'aria-label': _label, 'aria-labelledby': _labelledby, ...dragAttrs } = attrs

      return (
        <Drag
          ref={dragRef}
          class={classes(n(`--position-${props.position}`), [!props.fixed, n('--absolute')])}
          style={{
            top: toSizeUnit(props.top),
            bottom: toSizeUnit(props.bottom),
            left: toSizeUnit(props.left),
            right: toSizeUnit(props.right),
          }}
          zIndex={props.zIndex}
          popupContainer={props.popupContainer === false ? false : popupContainer.value}
          disabled={props.disabled || !props.drag || !props.fixed}
          axis={dragProps.axis}
          attraction={dragProps.attraction}
          boundary={dragProps.boundary}
          onClick={(e: Event) => handleClick(e, !isOpen.value, children.length)}
          {...dragAttrs}
        >
          <div
            class={classes(n(), n(`--direction-${props.placement}`), [props.safeArea, n('--safe-area')])}
            ref={host}
            v-show={props.visible}
            onMouseleave={() => handleMouse(false, children.length)}
            onMouseenter={() => handleMouse(true, children.length)}
            onFocusin={(event: FocusEvent) => {
              const target = event.target
              if (target instanceof HTMLElement && !actions.value?.contains(target)) {
                lastTrigger = target
              }
            }}
            onFocusout={(event: FocusEvent) => {
              const next = event.relatedTarget
              if (
                props.visible &&
                !props.disabled &&
                props.trigger === 'hover' &&
                !pointerInside &&
                isOpen.value &&
                !(next instanceof Node && host.value?.contains(next))
              ) {
                isOpen.value = false
                emit('close')
              }
            }}
            onKeydown={(event: KeyboardEvent) => {
              if (event.key === 'Escape' && isOpen.value && props.visible && !props.disabled) {
                event.stopPropagation()
                isOpen.value = false
                emit('close')
                if (actions.value?.contains(event.target as Node)) {
                  lastTrigger?.focus({ preventScroll: true })
                }
              }
            }}
          >
            <Transition name={n(`--active-transition`)}>{renderTrigger(children.length)}</Transition>

            <Transition
              name={n(`--actions-transition-${props.placement}`)}
              onAfterEnter={(element: Element) => emit('opened', element)}
              onAfterLeave={(element: Element) => emit('closed', element)}
            >
              <div
                ref={actions}
                id={actionsId}
                class={n('actions')}
                role="presentation"
                v-show={isOpen.value && children.length}
                onClick={(e) => e.stopPropagation()}
              >
                {children.map((child) => (
                  <div class={n('action')} key={child.key ?? undefined}>
                    {child}
                  </div>
                ))}
              </div>
            </Transition>
          </div>
        </Drag>
      )
    }
  },
})
