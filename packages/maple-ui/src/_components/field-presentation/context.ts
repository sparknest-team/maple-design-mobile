import {
  computed,
  inject,
  onBeforeUnmount,
  provide,
  ref,
  type ComputedRef,
  type InjectionKey,
  type PropType,
} from 'vue'

export type FieldPresentation = 'inline' | 'popup'
export type BeforeFieldCommit = (
  value: unknown,
  context: { previousValue: unknown; signal: AbortSignal },
) => void | false | Promise<void | false>
export const fieldPresentationProp = { type: String as PropType<FieldPresentation>, default: undefined }
export type ReadPretty = boolean
export const readPrettyProp = { type: Boolean, default: undefined }
export const beforeFieldCommitProp = Function as PropType<BeforeFieldCommit>
export interface ActiveEditor {
  field?: string
  active: () => boolean
  cancel: () => void
  focus: () => void
}
interface PresentationContext {
  presentation: ComputedRef<FieldPresentation | undefined>
  readPretty?: ComputedRef<ReadPretty | undefined>
  label?: ComputedRef<string | undefined>
  message?: ComputedRef<string>
  field?: ComputedRef<string>
  validate?: (value: unknown) => Promise<boolean>
  resetValidation?: () => void
  register?: (editor: ActiveEditor) => () => void
  resolved?: (value: FieldPresentation | undefined, readPretty?: boolean) => void
}
const formKey: InjectionKey<PresentationContext> = Symbol('form-presentation')
const itemKey: InjectionKey<PresentationContext> = Symbol('form-item-presentation')
export const fieldEditorBoundary: InjectionKey<boolean> = Symbol('field-editor-boundary')
/** Only the wrapped control owns inline Form notifications; its nested inputs do not. */
export const fieldControlFormEvents: InjectionKey<ComputedRef<boolean>> = Symbol('field-control-form-events')
export function provideFormPresentation(
  presentation: () => FieldPresentation | undefined,
  readPretty?: () => ReadPretty | undefined,
) {
  const editors = new Set<ActiveEditor>()
  provide(formKey, {
    presentation: computed(() => presentation() ?? 'inline'),
    readPretty: computed(() => readPretty?.()),
    register(editor) {
      editors.add(editor)
      return () => editors.delete(editor)
    },
  })
  provide(itemKey, undefined as unknown as PresentationContext)
  return {
    blocked() {
      const editor = [...editors].find((item) => item.active())
      editor?.focus()
      return Boolean(editor)
    },
    cancel(fields?: string | string[]) {
      const names = fields == null ? undefined : new Set(Array.isArray(fields) ? fields : [fields])
      for (const editor of editors) {
        if (!names || (editor.field && names.has(editor.field))) {
          editor.cancel()
        }
      }
    },
  }
}
export function provideItemPresentation(
  options: Omit<PresentationContext, 'presentation' | 'readPretty'> & {
    presentation: () => FieldPresentation | undefined
    readPretty?: () => ReadPretty | undefined
  },
) {
  const form = inject(formKey, undefined)
  const resolved = ref<FieldPresentation>()
  const resolvedReadPretty = ref<boolean>()
  const editors = new Set<ActiveEditor>()
  const context: PresentationContext = {
    ...options,
    presentation: computed(() => options.presentation() ?? form?.presentation.value),
    readPretty: computed(() => options.readPretty?.() ?? form?.readPretty?.value),
    register: (editor) => {
      editors.add(editor)
      const remove = form?.register?.({
        ...editor,
        get field() {
          return options.field?.value
        },
      })
      return () => {
        editors.delete(editor)
        remove?.()
      }
    },
    resolved: (value, pretty) => {
      resolvedReadPretty.value = pretty
      resolved.value = value
    },
  }
  provide(itemKey, context)
  return {
    resolved: computed(() => resolved.value ?? context.presentation.value ?? 'inline'),
    readPretty: computed(() => resolvedReadPretty.value ?? context.readPretty?.value ?? false),
    cancel() {
      for (const editor of editors) {
        editor.cancel()
      }
    },
  }
}
export function useFieldPresentation(
  presentation: () => FieldPresentation | undefined,
  readPretty?: () => ReadPretty | undefined,
) {
  const boundary = inject(fieldEditorBoundary, false)
  const item = boundary ? undefined : inject(itemKey, undefined)
  const form = boundary ? undefined : inject(formKey, undefined)
  const resolved = computed(() => {
    const supported: readonly string[] = ['inline', 'popup']
    for (const value of [presentation(), item?.presentation.value, form?.presentation.value]) {
      if (value && supported.includes(value)) {
        return value
      }
    }
    return 'inline' as FieldPresentation
  })
  const register = (editor: ActiveEditor) => {
    const remove = (item?.register ?? form?.register)?.(editor)
    onBeforeUnmount(() => remove?.())
  }
  return {
    readPretty: computed(() => readPretty?.() ?? item?.readPretty?.value ?? form?.readPretty?.value ?? false),
    presentation: resolved,
    nativeEditor: false,
    item,
    label: computed(() => item?.label?.value),
    register,
  }
}
