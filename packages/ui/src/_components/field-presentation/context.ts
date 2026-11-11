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
import { invokeBeforeHook, type BeforeHookDone } from '../../_hooks/use-action-guard'

/** Field editing mode; independent of layout and readPretty. */
export type FieldEditMode = 'direct' | 'popup'
export const fieldEditModeProp = {
  type: String as PropType<FieldEditMode>,
  default: undefined,
  validator: (value: string) => ['direct', 'popup'].includes(value),
}
export const defaultSelectionPresentation: FieldEditMode = 'popup'
export type BeforeFieldCommit = (
  payload: { value: unknown; previousValue: unknown },
  done: BeforeHookDone,
  context: { signal: AbortSignal; event?: Event },
) => void | boolean | Promise<void | boolean>
/** Undefined waits for done; return a boolean or Promise for return-based completion. */
export function invokeBeforeCommit(
  hook: BeforeFieldCommit | undefined,
  value: unknown,
  context: { previousValue: unknown; signal: AbortSignal },
) {
  if (!hook) {
    return undefined
  }
  return invokeBeforeHook(
    (done) => hook({ value, previousValue: context.previousValue }, done, { signal: context.signal }),
    context,
  )
}
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
  editMode: ComputedRef<FieldEditMode | undefined>
  readPretty?: ComputedRef<ReadPretty | undefined>
  label?: ComputedRef<string | undefined>
  message?: ComputedRef<string>
  field?: ComputedRef<string>
  validate?: (value: unknown) => Promise<boolean>
  resetValidation?: () => void
  register?: (editor: ActiveEditor) => () => void
  resolved?: (value: FieldEditMode | undefined, readPretty?: boolean) => void
}
const formKey: InjectionKey<PresentationContext> = Symbol('form-presentation')
const itemKey: InjectionKey<PresentationContext> = Symbol('form-item-presentation')
export const fieldEditorBoundary: InjectionKey<boolean> = Symbol('field-editor-boundary')
/** Physical editor panel presence, distinct from form-event ownership boundaries. */
export const fieldEditorPanel: InjectionKey<boolean> = Symbol('field-editor-panel')
/** Whether Enter without an open child popup belongs to the editor. */
export const fieldEditorEnterSubmits: InjectionKey<ComputedRef<boolean>> = Symbol('field-editor-enter-submits')
/** Only the wrapped control owns inline Form notifications; its nested inputs do not. */
export const fieldControlFormEvents: InjectionKey<ComputedRef<boolean>> = Symbol('field-control-form-events')
export function provideFormPresentation(
  editMode: () => FieldEditMode | undefined,
  readPretty?: () => ReadPretty | undefined,
) {
  const editors = new Set<ActiveEditor>()
  provide(formKey, {
    editMode: computed(() => editMode()),
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
  options: Omit<PresentationContext, 'editMode' | 'readPretty'> & {
    editMode: () => FieldEditMode | undefined
    readPretty?: () => ReadPretty | undefined
  },
) {
  const form = inject(formKey, undefined)
  const resolved = ref<FieldEditMode>()
  const resolvedReadPretty = ref<boolean>()
  const editors = new Set<ActiveEditor>()
  const context: PresentationContext = {
    ...options,
    editMode: computed(() => options.editMode() ?? form?.editMode.value),
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
    resolved: computed(() => resolved.value ?? context.editMode.value ?? 'direct'),
    readPretty: computed(() => resolvedReadPretty.value ?? context.readPretty?.value ?? false),
    cancel() {
      for (const editor of editors) {
        editor.cancel()
      }
    },
  }
}
export function useFieldPresentation(
  editMode: () => FieldEditMode | undefined,
  readPretty?: () => ReadPretty | undefined,
  defaultPresentation: FieldEditMode = 'direct',
) {
  const boundary = inject(fieldEditorBoundary, false)
  const item = boundary ? undefined : inject(itemKey, undefined)
  const form = boundary ? undefined : inject(formKey, undefined)
  const resolved = computed(() => {
    const supported: readonly string[] = ['direct', 'popup']
    for (const value of [editMode(), item?.editMode.value, form?.editMode.value]) {
      if (value && supported.includes(value)) {
        return value
      }
    }
    return (boundary ? 'direct' : defaultPresentation) as FieldEditMode
  })
  const register = (editor: ActiveEditor) => {
    const remove = (item?.register ?? form?.register)?.(editor)
    onBeforeUnmount(() => remove?.())
  }
  return {
    readPretty: computed(() => readPretty?.() ?? item?.readPretty?.value ?? form?.readPretty?.value ?? false),
    editMode: resolved,
    nativeEditor: false,
    item,
    label: computed(() => item?.label?.value),
    register,
  }
}

/** Loading owned by the field, consumed by native field-specific renderers. */
