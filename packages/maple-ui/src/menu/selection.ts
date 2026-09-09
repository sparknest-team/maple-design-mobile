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
}
const keyOf = (value: any) => toRaw(value)

export function createMenuTree(options: Record<string, any>[], fields: MenuFieldNames = {}) {
  const names = resolveOptionFields(fields)
  const flat: MenuNode[] = []
  function visit(raw: Record<string, any>, parent?: MenuNode): MenuNode {
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
    }
    flat.push(node)
    const children = raw[names.children]
    if (Array.isArray(children)) {
      node.children = children.map((child) => visit(child, node))
    }
    return node
  }
  const roots = options.map((option) => visit(option))
  return { roots, flat, names }
}

export interface MenuSelectionOptions {
  modelValue?: any
  options?: Record<string, any>[]
  fieldNames?: MenuFieldNames
  multiple?: boolean
  disabled?: boolean
  size?: string
}

export function useMenuSelection(
  options: MenuSelectionOptions,
  emit: (value: any, option: Record<string, any>, event: Event, selectedValue?: any) => void,
) {
  const tree = computed(() => createMenuTree(options.options ?? [], options.fieldNames))
  const registered = new Set<() => any>()
  const values = computed<any[]>(() =>
    options.multiple ? (Array.isArray(options.modelValue) ? options.modelValue : []) : [options.modelValue],
  )
  const selected = computed(() => new Set(values.value.map(keyOf)))
  const find = (value: any) => tree.value.flat.find((node) => Object.is(keyOf(node.value), keyOf(value)))
  const isSelected = (value: any) => selected.value.has(keyOf(value)) && value !== undefined
  const descendants = (node: MenuNode): MenuNode[] =>
    node.children.flatMap((child) => (child.disabled ? [] : [child, ...descendants(child)]))
  const isIndeterminate = (value: any) => {
    const node = find(value)
    if (!options.multiple || !node) {
      return false
    }
    const children = descendants(node)
    const count = children.filter((child) => isSelected(child.value)).length
    return count > 0 && count < children.length
  }
  function select(value: any, fallback: Record<string, any>, event: Event) {
    const node = find(value)
    if (options.disabled || fallback.disabled || node?.disabled) {
      return
    }
    if (!options.multiple) {
      emit(value, node?.raw ?? fallback, event, value)
      return
    }
    const next = new Set(selected.value)
    const remove = isSelected(value) || isIndeterminate(value)
    for (const target of [value, ...(node ? descendants(node).map((child) => child.value) : [])]) {
      if (remove) {
        next.delete(keyOf(target))
      } else {
        next.add(keyOf(target))
      }
    }
    let parent = node?.parent
    while (parent) {
      const children = parent.children.filter((child) => !child.disabled)
      if (children.length && children.every((child) => next.has(keyOf(child.value)))) {
        next.add(keyOf(parent.value))
      } else {
        next.delete(keyOf(parent.value))
      }
      parent = parent.parent
    }
    // Preserve source order and selected values absent from the current asynchronous options.
    const order = [
      ...tree.value.flat.map((node) => node.value),
      ...[...registered].map((get) => get()),
      ...values.value,
      value,
    ]
    const seen = new Set<any>()
    emit(
      order.filter((item) => {
        const key = keyOf(item)
        if (!next.has(key) || seen.has(key)) {
          return false
        }
        seen.add(key)
        return true
      }),
      node?.raw ?? fallback,
      event,
      value,
    )
  }
  return {
    tree,
    isSelected,
    isIndeterminate,
    select,
    multiple: computed(() => !!options.multiple),
    disabled: computed(() => !!options.disabled),
    size: computed(() => options.size ?? 'md'),
    register(getValue: () => any) {
      registered.add(getValue)
      return () => {
        registered.delete(getValue)
      }
    },
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
