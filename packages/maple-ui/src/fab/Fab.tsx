import { computed, defineComponent, ref, Transition, watch } from 'vue'
import { IconClose, IconPlus } from '@maplejs/icons-vue'
import { call, isBoolean } from '@maplejs/maple-shared'
import { useClickOutside, useVModel } from '@maplejs/maple-use'
import Button from '../button'
import Drag from '../drag'
import Icon from '../icon'
import { createNamespace, flatFragment } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { resolvePopupContainer } from '../utils/popup-container'
import { props } from './props'
import './style'

const { name, classes, n } = createNamespace('fab')

export default defineComponent({
  name,
  inheritAttrs: false,
  props,
  emits: ['click', 'close', 'open', 'opened', 'closed', 'update:active'],
  setup(props, { slots, attrs, emit }) {
    const isActive = useVModel(props, 'active', { emit, eventName: 'update:active' })
    const popupContainer = computed(() => resolvePopupContainer(props.popupContainer))
    const host = ref<null | HTMLElement>(null)
    const dragRef = ref<InstanceType<typeof Drag> | null>(null)

    watch(
      () => props.trigger,
      () => {
        isActive.value = false
      },
    )

    watch(
      () => props.disabled,
      () => {
        isActive.value = false
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

      if (props.trigger !== 'click' || props.disabled) {
        return
      }

      if (childrenLength === 0) {
        emit('click', isActive.value, e)
        return
      }

      isActive.value = value
      emit('click', isActive.value, e)
      call(isActive.value ? (...args: any[]) => emit('open', ...args) : (...args: any[]) => emit('close', ...args))
    }

    function handleMouse(value: boolean, childrenLength: number) {
      if (props.trigger !== 'hover' || props.disabled || childrenLength === 0) {
        return
      }

      isActive.value = value
      call(isActive.value ? (...args: any[]) => emit('open', ...args) : (...args: any[]) => emit('close', ...args))
    }

    function handleClickOutside() {
      if (props.trigger !== 'click' || props.disabled) {
        return
      }

      if (isActive.value !== false) {
        isActive.value = false
        emit('close')
      }
    }

    function renderTrigger() {
      if (slots.trigger) {
        return props.open ? slots.trigger({ active: isActive.value }) : null
      }

      const iconName = isActive.value ? props.activeIcon : props.inactiveIcon
      const builtinIcon = iconName === 'plus' ? IconPlus : iconName === 'close' ? IconClose : undefined

      return (
        <Button
          v-show={props.open}
          mp-fab-cover
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
                class={classes([isActive.value, n('trigger-active-icon'), n('trigger-inactive-icon')])}
                name={isActive.value ? props.activeIcon : props.inactiveIcon}
                size={isActive.value ? props.activeIconSize : props.inactiveIconSize}
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
          direction={dragProps.direction}
          attraction={dragProps.attraction}
          boundary={dragProps.boundary}
          onClick={(e: Event) => handleClick(e, !isActive.value, children.length)}
          {...attrs}
        >
          <div
            class={classes(n(), n(`--direction-${props.direction}`), [props.safeArea, n('--safe-area')])}
            ref={host}
            onMouseleave={() => handleMouse(false, children.length)}
            onMouseenter={() => handleMouse(true, children.length)}
          >
            <Transition name={n(`--active-transition`)}>{renderTrigger()}</Transition>

            <Transition
              name={n(`--actions-transition-${props.direction}`)}
              onAfterEnter={(...args: any[]) => emit('opened', ...args)}
              onAfterLeave={(...args: any[]) => emit('closed', ...args)}
            >
              <div
                class={n('actions')}
                role="presentation"
                v-show={props.open && isActive.value && children.length}
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
