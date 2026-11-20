import { computed, inject, provide, ref, watch, type ComputedRef, type InjectionKey } from 'vue'
import { useId } from '../utils/vue-compat'

interface FormDescription {
  id: ComputedRef<string | undefined>
  feedback?: () => { element?: HTMLElement; text: string; sourceId: string } | undefined
}

const errorDescriptionKey: InjectionKey<FormDescription> = Symbol('form-error-description')

export function provideFormErrorDescription(
  visible: () => boolean,
  noStyle: () => boolean,
  helpVisible: () => boolean = () => false,
  feedback?: (kind: 'error' | 'help') => { element?: HTMLElement; text: string },
) {
  const parent = inject(errorDescriptionKey, undefined)
  const uniqueId = useId()
  const id = `mp-form-error-${uniqueId}`
  const helpId = `mp-form-error-help-${uniqueId}`
  const current = computed(() => (noStyle() ? parent?.id.value : visible() ? id : helpVisible() ? helpId : undefined))
  provide(errorDescriptionKey, {
    id: current,
    feedback: () => {
      if (noStyle()) {
        return parent?.feedback?.()
      }
      if (!feedback || !current.value) {
        return undefined
      }
      return { ...feedback(current.value === helpId ? 'help' : 'error'), sourceId: current.value }
    },
  })
  return { current, helpId, labelId: `mp-form-label-${uniqueId}` }
}

export function provideFormErrorDescriptionBoundary() {
  provide(errorDescriptionKey, { id: computed(() => undefined) })
}

export function provideEditorErrorDescription(panel: () => HTMLElement | undefined, container: () => unknown) {
  const parent = inject(errorDescriptionKey, undefined)
  if (!parent?.feedback) {
    return { localId: undefined, text: computed(() => '') }
  }
  const localId = ref<string>()
  const text = ref('')
  const sourceId = ref<string>()
  // Read the DOM after Teleport has moved the panel to its updated container.
  watch(
    [panel, () => parent.feedback?.(), container],
    ([destination, source]) => {
      sourceId.value = source?.sourceId
      const crossesRoot = source?.element && destination && source.element.getRootNode() !== destination.getRootNode()
      text.value = crossesRoot ? source.text : ''
      if (text.value && !localId.value) {
        // Editors belonging to independent apps may share the same body.
        const words = crypto.getRandomValues(new Uint32Array(4))
        localId.value = 'mp-editor-error-' + Array.from(words, (word) => word.toString(16).padStart(8, '0')).join('')
      }
    },
    { immediate: true, flush: 'post' },
  )
  provide(errorDescriptionKey, {
    id: computed(() => (text.value ? localId.value : (sourceId.value ?? parent.id.value))),
    feedback: parent?.feedback,
  })
  return { localId, text }
}

export function useFormErrorDescription() {
  const errorId = inject(errorDescriptionKey, undefined)?.id
  return {
    errorId,
    describe(value: unknown) {
      const ids = typeof value === 'string' ? value.split(/[ \t\n\f\r]+/).filter(Boolean) : []
      if (errorId?.value && !ids.includes(errorId.value)) {
        ids.push(errorId.value)
      }
      return ids.join(' ') || undefined
    },
  }
}
