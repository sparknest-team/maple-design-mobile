import { defineComponent, Teleport, Transition } from 'vue'
import { call, preventDefault } from '@maplejs/maple-shared'
import { useEventListener } from '@maplejs/maple-use'
import { useLock } from '../context/lock'
import { useStack } from '../context/stack'
import { useZIndex } from '../context/zIndex'
import { createNamespace, useTeleport } from '../utils/components'
import { props } from './props'
import '../styles/common.less'
import './overlay.less'

const { name, n } = createNamespace('overlay')

export default defineComponent({
  name,
  inheritAttrs: false,
  props,
  emits: ['update:open', 'key-escape', 'click'],
  setup(props, { slots, attrs, emit }) {
    const { zIndex } = useZIndex(() => props.open, 3)
    const { onStackTop } = useStack(() => props.open, zIndex)
    const { disabled } = useTeleport()

    useLock(
      () => props.open,
      () => props.lockScroll,
    )

    useEventListener(() => window, 'keydown', handleKeydown)

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

    function handleClickOverlay() {
      emit('click')
      emit('update:open', false)
    }

    function renderOverlay() {
      return (
        <div
          class={n()}
          style={{
            zIndex: zIndex.value - 2,
          }}
          {...attrs}
        >
          <div
            class={n('overlay')}
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
      return <Transition name={n('--fade')}>{props.open && renderOverlay()}</Transition>
    }

    return () => {
      const { popupContainer } = props

      if (popupContainer) {
        return (
          <Teleport to={popupContainer} disabled={disabled.value}>
            {renderTransitionOverlay()}
          </Teleport>
        )
      }

      return renderTransitionOverlay()
    }
  },
})
