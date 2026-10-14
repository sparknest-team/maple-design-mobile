import { computed, provide } from 'vue'
import { FORM_ITEM_BIND_CONTROL_KEY } from '../form/item-provide'
import { useInputForm } from '../input/use-input-form'
import type { VerificationCodeProps } from './props'

export function useVerificationForm(props: Readonly<VerificationCodeProps>) {
  const state = useInputForm(props)
  if (state.formItem) {
    provide(FORM_ITEM_BIND_CONTROL_KEY, {
      ...state.formItem,
      eventHandlers: computed(() => ({})),
      feedback: computed(() => undefined),
    })
  }
  return state
}
