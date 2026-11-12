import type { InjectionKey, Ref } from 'vue'

/** Internal pending work of the control currently rendered by a field editor. */
export const fieldEditorControlPending: InjectionKey<Ref<boolean>> = Symbol('field-editor-control-pending')
