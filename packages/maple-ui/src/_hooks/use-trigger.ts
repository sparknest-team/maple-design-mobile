import type { Ref } from 'vue'
import { computed, ref, watch } from 'vue'
import type { EmitFn2 } from '../_utils/types'

export const useTrigger = ({
  open,
  defaultOpen,
  emit,
}: {
  open?: Ref<boolean | undefined>
  defaultOpen?: Ref<boolean>
  emit: EmitFn2<{
    'update:open': (visible: boolean) => true
    'open-change': (visible: boolean) => true
  }>
}) => {
  const _open = ref(defaultOpen?.value ?? false)
  const computedOpen = computed(() => open?.value ?? _open.value)

  const handleOpenChange = (visible: boolean) => {
    if (visible !== computedOpen.value) {
      _open.value = visible
      emit('update:open', visible)
      emit('open-change', visible)
    }
  }

  watch(computedOpen, (visible) => {
    if (_open.value !== visible) {
      _open.value = visible
    }
  })

  return {
    computedOpen,
    handleOpenChange,
  }
}
