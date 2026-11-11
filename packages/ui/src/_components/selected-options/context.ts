import type { InjectionKey, VNodeChild } from 'vue'

export interface SelectedOptionItem {
  key: string | number | symbol
  label?: VNodeChild
  text?: string
  closable?: boolean
}
export const selectionListStyle: InjectionKey<boolean> = Symbol('selection-list-style')

export const selectionEditorSurface: InjectionKey<{ mobile: boolean }> = Symbol('selection-editor-surface')
