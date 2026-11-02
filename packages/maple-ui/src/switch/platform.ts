import { computed } from 'vue'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import type { SwitchProps, SwitchSize } from './props'

export function useSwitchPlatform(props: Readonly<SwitchProps>) {
  const { form } = useForm()
  const item = useFormItem({
    disabled: computed(() => props.disabled),
    readonly: computed(() => props.readonly),
    formDisabled: form?.disabled,
    formReadonly: form?.readonly,
  })
  return {
    size: computed<SwitchSize>(() => props.size ?? 'md'),
    disabled: item.mergedDisabled,
    readonly: item.mergedReadonly,
    error: computed(() => !!item.mergedError.value),
    notify: (type: 'onChange' | 'onFocus' | 'onBlur', _event: Event) => item.eventHandlers.value[type]?.(),
  }
}
