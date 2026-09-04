import { computed, defineComponent, nextTick, onMounted, ref, Teleport, Transition, watch } from 'vue'
import { call, preventDefault } from '@maplejs/maple-shared'
import { useEventListener } from '@maplejs/maple-use'
import { useLock } from '../context/lock'
import { useStack } from '../context/stack'
import { useZIndex } from '../context/zIndex'
import { createNamespace, useTeleport } from '../utils/components'
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
    const rendered = ref(mergedOpen.value)
    const shouldRender = computed(() => mergedOpen.value || (!props.unmountOnClose && rendered.value))
    const { zIndex: managedZIndex } = useZIndex(() => mergedOpen.value, 3)
    const zIndex = computed(() => props.zIndex ?? managedZIndex.value)
    const { onStackTop } = useStack(() => mergedOpen.value, zIndex)
    const { disabled } = useTeleport()

    useLock(
      () => mergedOpen.value,
      () => props.lockScroll,
    )

    useEventListener(() => window, 'keydown', handleKeydown)

    watch(
      mergedOpen,
      (open) => {
        if (open) {
          rendered.value = true
          emit('open')
        } else {
          emit('close')
        }
      },
      { immediate: mergedOpen.value },
    )

    onMounted(() => {
      if (mergedOpen.value) {
        nextTick(() => emit('opened'))
      }
    })

    function handleKeydown(event: KeyboardEvent) {
      if (!onStackTop() || event.key !== 'Escape' || !mergedOpen.value) {
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
        <Transition
          name={n('--fade')}
          onAfterEnter={(...args: any[]) => emit('opened', ...args)}
          onAfterLeave={(...args: any[]) => emit('closed', ...args)}
        >
          {shouldRender.value && renderOverlay()}
        </Transition>
      )
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
