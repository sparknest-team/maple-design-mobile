import { defineComponent, type InjectionKey, type PropType, type Ref } from 'vue'
import type { OptionRequestState } from '../_hooks/use-option-request'
import { createNamespace } from '../utils/components'
import type { SelectOption, SelectOptionInfo } from './types'

export const selectNativeEditorOwner: InjectionKey<
  | {
      onSelect?: (event: Event) => void
      source: OptionRequestState<SelectOption>
      selectedOptions: Ref<Record<string, SelectOptionInfo | undefined> | undefined>
    }
  | undefined
> = Symbol('select-native-editor-owner')

/** Install ownership only around this field's native editor, never around user option slots. */
export default defineComponent({
  name: createNamespace('select-native-editor-owner').name,
  props: { install: { type: Function as PropType<() => void>, required: true } },
  setup(props, { slots }) {
    props.install()
    return () => slots.default?.()
  },
})
