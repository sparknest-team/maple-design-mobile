import { computed, defineComponent } from 'vue'
import { bindFormItem } from '../../form/item-provide'

export function formHost(state, handlers, render) {
  return defineComponent({
    setup() {
      bindFormItem({
        disabled: computed(() => state.disabled),
        readonly: computed(() => state.readonly),
        error: computed(() => state.error),
        size: computed(() => state.size),
        eventHandlers: computed(() => handlers),
        errorMessage: computed(() => ''),
        hasOuterLabel: computed(() => false),
        validateWithTrigger() {},
      })
      return render
    },
  })
}
