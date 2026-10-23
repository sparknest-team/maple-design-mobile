import { computed, toRaw, type InjectionKey } from 'vue'
import { resolveOptionFields } from '../utils/option-data'

export interface MenuFieldNames {
  label?: string
  value?: string
  children?: string
  disabled?: string
}

export interface MenuNode {
  raw: Record<string, any>
  value: any
  disabled: boolean
  parent?: MenuNode
  children: MenuNode[]
  level: number
  type: 'item' | 'group' | 'divider'
}

const keyOf = (value: any) => toRaw(value)

export function createMenuTree(options: Record<string, any>[], fields: MenuFieldNames = {}) {
  const names = resolveOptionFields(fields)
  const flat: MenuNode[] = []
  function visit(raw: Record<string, any>, parent?: MenuNode, level = 0): MenuNode {
    const type = raw.type ?? 'item'
    const node: MenuNode = {
      raw,
      value:
        raw[names.value] !== undefined
          ? raw[names.value]
          : typeof raw[names.label] === 'function'
            ? undefined
            : raw[names.label],
      disabled: !!raw[names.disabled] || !!parent?.disabled,
      parent,
      children: [],
      level,
      type,
    }
    flat.push(node)
    const children = raw[names.children]
    if (Array.isArray(children)) {
      node.children = children
        .filter((child) => child.show !== false)
        .map((child) => visit(child, node, level + (type === 'group' ? 0 : 1)))
    }
    return node
  }
  const roots = options.filter((option) => option.show !== false).map((option) => visit(option))
  return { roots, flat, names }
}

export interface MenuSelectionOptions {
  modelValue?: any
  options?: Record<string, any>[]
  fieldNames?: MenuFieldNames
  disabled?: boolean
  size?: string
}

export function useMenuSelection(
  options: MenuSelectionOptions,
  emit: (value: any, option: Record<string, any>, event: Event, selectedValue?: any) => void,
) {
  const tree = computed(() => createMenuTree(options.options ?? [], options.fieldNames))
  const find = (value: any) => tree.value.flat.find((node) => Object.is(keyOf(node.value), keyOf(value)))
  const isSelected = (value: any) => value !== undefined && Object.is(keyOf(options.modelValue), keyOf(value))
  function select(value: any, fallback: Record<string, any>, event: Event) {
    const node = find(value)
    if (options.disabled || fallback.disabled || node?.disabled) {
      return
    }
    emit(value, node?.raw ?? fallback, event, value)
  }
  return {
    tree,
    isSelected,
    select,
    disabled: computed(() => !!options.disabled),
    size: computed(() => options.size ?? 'md'),
    ancestors(value: any) {
      const result: Record<string, any>[] = []
      let node = find(value)?.parent
      while (node) {
        result.push(node.raw)
        node = node.parent
      }
      return result
    },
  }
}

export type MenuSelection = ReturnType<typeof useMenuSelection>
export const menuSelectionKey: InjectionKey<MenuSelection> = Symbol('MenuSelection')
