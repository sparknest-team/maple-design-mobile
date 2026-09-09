import { computed } from 'vue'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import type { SwitchProps, SwitchSize } from './props'

export function useSwitchPlatform(props: Readonly<SwitchProps>) {
  const item = useFormItem()
  const { form } = useForm()
  return {
    size: computed<SwitchSize>(() => props.size ?? 'md'),
    disabled: computed(() => !!(props.disabled || item.mergedDisabled.value || form?.disabled.value)),
    readonly: computed(() => !!(props.readonly || form?.readonly.value)),
    error: computed(() => !!item.mergedError.value),
    notify: (type: 'onChange' | 'onFocus' | 'onBlur', _event: Event) => item.eventHandlers.value[type]?.(),
  }
}
