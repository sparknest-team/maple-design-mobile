import { computed, defineComponent, nextTick, onMounted, Teleport, Transition, watch } from 'vue'
import { call, preventDefault } from '@maplejs/maple-shared'
import { useEventListener, useInitialized } from '@maplejs/maple-use'
import { useLock } from '../context/lock'
import { useStack } from '../context/stack'
import { useZIndex } from '../context/zIndex'
import { createNamespace, useRouteListener, useTeleport } from '../utils/components'
import { props } from './props'
import { usePopupItems } from './provide'
import './style'

const { name, n, classes } = createNamespace('popup')

export default defineComponent({
  name,
  inheritAttrs: false,
  props,
  emits: ['update:open', 'open', 'close', 'opened', 'route-change', 'key-escape', 'closed', 'click-overlay'],
  setup(props, { slots, attrs, emit }) {
    const rendered = useInitialized(() => props.open, true)
    const { zIndex } = useZIndex(() => props.open, 3)
    const normalizedZIndex = computed(() => props.zIndex ?? zIndex.value)
    const { onStackTop } = useStack(() => props.open, normalizedZIndex)
    const { disabled } = useTeleport()
    const { bindPopupItems } = usePopupItems()

    useLock(
      () => props.open,
      () => props.lockScroll,
    )

    watch(
      () => props.open,
      (newValue: boolean) => {
        newValue ? emit('open') : emit('close')
      },
      { immediate: props.open },
    )

    onMounted(() => {
      if (props.open) {
        nextTick(() => emit('opened'))
      }
    })

    bindPopupItems({ open: computed(() => props.open) })

    useEventListener(() => window, 'keydown', handleKeydown)

    // internal for Dialog
    useRouteListener(() => emit('route-change'))

    function hidePopup() {
      const { maskClosable } = props

      emit('click-overlay')

      if (!maskClosable) {
        return
      }

      emit('update:open', false)
    }

    function renderOverlay() {
      const { maskClass = '', maskStyle } = props

      return (
        <div
          class={classes(n('overlay'), maskClass)}
          role="presentation"
          style={{
            zIndex: normalizedZIndex.value - 1,
            ...maskStyle,
          }}
          onClick={hidePopup}
        />
      )
    }

    function renderContent() {
      return (
        <div
          class={classes(
            n('content'),
            n(`--${props.position}`),
            [props.defaultStyle, n('--content-background-color')],
            [props.defaultStyle, n('$-elevation--3')],
            [props.safeArea, n('--safe-area')],
            [props.safeAreaTop, n('--safe-area-top')],
          )}
          style={{ zIndex: normalizedZIndex.value }}
          role="dialog"
          aria-modal="true"
          {...attrs}
          v-show={props.open}
        >
          {rendered.value && call(slots.default)}
        </div>
      )
    }

    function renderPopup() {
      return (
        <Transition
          name={n('$-fade')}
          onAfterEnter={(...args: any[]) => emit('opened', ...args)}
          onAfterLeave={(...args: any[]) => emit('closed', ...args)}
        >
          <div
            class={classes(n('$--box'), n(), [!props.mask, n('--pointer-events-none')])}
            style={{ zIndex: normalizedZIndex.value - 2 }}
            v-show={props.open}
          >
            {props.mask && renderOverlay()}
            <Transition name={props.transition || n(`$-pop-${props.position}`)}>{renderContent()}</Transition>
          </div>
        </Transition>
      )
    }

    function handleKeydown(event: KeyboardEvent) {
      if (!onStackTop() || event.key !== 'Escape' || !props.open) {
        return
      }

      emit('key-escape')

      if (!props.escToClose) {
        return
      }

      preventDefault(event)
      emit('update:open', false)
    }

    return () => {
      const { popupContainer } = props

      if (popupContainer) {
        return (
          <Teleport to={popupContainer} disabled={disabled.value}>
            {renderPopup()}
          </Teleport>
        )
      }

      return renderPopup()
    }
  },
})
