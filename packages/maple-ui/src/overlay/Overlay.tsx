import { computed, defineComponent, ref, Teleport, Transition } from 'vue'
import { call, preventDefault } from '@maplejs/maple-shared'
import { useEventListener } from '@maplejs/maple-use'
import { useLock } from '../context/lock'
import { useStack } from '../context/stack'
import { useZIndex } from '../context/zIndex'
import { createNamespace, useTeleport } from '../utils/components'
import { usePopupContainer } from '../utils/popup-container'
import { usePopupTransition } from '../utils/popup-transition'
import { props } from './props'
import './style'

const { name, n } = createNamespace('overlay')

export default defineComponent({
  name,
  inheritAttrs: false,
  props,
  emits: ['update:open', 'open', 'opened', 'close', 'closed', 'key-escape', 'click'],
  setup(props, { slots, attrs, emit }) {
    const localOpen = ref(props.defaultOpen)
    const mergedOpen = computed({
      get: () => props.open ?? localOpen.value,
      set: (value: boolean) => {
        if (props.open === undefined) {
          localOpen.value = value
        }
        emit('update:open', value)
      },
    })
    const transition = usePopupTransition(
      () => mergedOpen.value,
      () => props.unmountOnClose,
      (event) => emit(event),
    )
    const { shouldRender } = transition
    const { zIndex: managedZIndex } = useZIndex(() => mergedOpen.value, 3)
    const zIndex = computed(() => props.zIndex ?? managedZIndex.value)
    const { onStackTop } = useStack(() => mergedOpen.value, zIndex)
    const { disabled } = useTeleport()
    const popupTarget = usePopupContainer(() => props.popupContainer)

    useLock(
      () => mergedOpen.value || transition.leaving.value,
      () => props.lockScroll,
    )

    useEventListener(() => window, 'keydown', handleKeydown)

    function handleKeydown(event: KeyboardEvent) {
      if (!onStackTop(event) || event.key !== 'Escape' || !mergedOpen.value) {
        return
      }

      emit('key-escape', event)

      if (!props.escToClose) {
        return
      }

      preventDefault(event)
      mergedOpen.value = false
    }

    function handleClickOverlay(event: MouseEvent) {
      if (!onStackTop(event)) {
        return
      }
      emit('click', event)
      if (props.overlayClosable) {
        mergedOpen.value = false
      }
    }

    function renderOverlay() {
      return (
        <div
          class={n()}
          v-show={mergedOpen.value}
          style={{
            zIndex: zIndex.value - 2,
          }}
          {...attrs}
        >
          <div
            class={n('backdrop')}
            role="presentation"
            style={{
              zIndex: zIndex.value - 1,
            }}
            onClick={handleClickOverlay}
          />
          <div
            class={n('content')}
            style={{
              zIndex: zIndex.value,
            }}
          >
            {call(slots.default)}
          </div>
        </div>
      )
    }

    function renderTransitionOverlay() {
      return (
        <Transition name={n('--fade')} onAfterEnter={transition.opened} onAfterLeave={transition.closed}>
          {shouldRender.value && renderOverlay()}
        </Transition>
      )
    }

    return () => {
      const { popupContainer } = props

      if (popupContainer !== false) {
        return (
          <Teleport to={popupTarget.value} disabled={disabled.value}>
            {renderTransitionOverlay()}
          </Teleport>
        )
      }

      return renderTransitionOverlay()
    }
  },
})
