import { inject, onBeforeUnmount, watchEffect, type InjectionKey, type VNodeChild } from 'vue'
import type { CompatibleShallowRef as ShallowRef } from '../../_utils/compatible-shallow-ref'

/** The editor host owns one footer; a field can contribute its auxiliary actions. */
export const editorAuxiliaryActions: InjectionKey<ShallowRef<(() => VNodeChild) | undefined>> =
  Symbol('editor-auxiliary-actions')

/** Keep panel validation visible above the host footer, outside scrolling content. */
export const editorAuxiliaryFeedback: InjectionKey<ShallowRef<string | undefined>> = Symbol('editor-auxiliary-feedback')

export function useEditorFeedback(message: () => string | undefined) {
  const feedback = inject(editorAuxiliaryFeedback, undefined)
  watchEffect(() => {
    if (feedback) {
      feedback.value = message() || undefined
    }
  })
  onBeforeUnmount(() => {
    if (feedback) {
      feedback.value = undefined
    }
  })
  return Boolean(feedback)
}
