<template><Render /></template>

<script setup lang="ts">
import { computed, h, nextTick, onBeforeUnmount, provide, ref, useAttrs, watch, type VNode } from 'vue'
import { resolveDirection, useDirection } from '../_utils/direction'
import { createNamespace } from '../utils/components'
import { useId } from '../utils/vue-compat'
import { flatten, focusScope, tabsInjectionKey, type TabEntry } from './context'
import { tabsProps, type TabsName } from './props'
import TabNav from './TabNav.vue'
import TabsItems from './TabsItems.vue'
import TabsNavs from './TabsNavs.vue'
import type { TabsEmits, TabsSlots } from './types'
import { useTabsConfiguration } from './use-tabs-configuration'

defineOptions({ name: createNamespace('tabs').name, inheritAttrs: false })
const props = defineProps(tabsProps)
const emit = defineEmits<TabsEmits>()
const slots = defineSlots<TabsSlots>()
const attrs = useAttrs()
const { n, classes } = createNamespace('tabs')
const { size } = useTabsConfiguration(computed(() => props.size))
const { isRtl: rtl } = useDirection(undefined, () => attrs.dir)
const uid = useId()
const local = ref(props.defaultValue)
const focused = ref<TabsName>()
const entries = ref<TabEntry[]>([])
const enabled = computed(() => entries.value.filter((tab) => !tab.disabled).map((tab) => tab.name))
const active = computed(() => {
  if (props.modelValue !== undefined) {
    return props.modelValue
  }
  return local.value !== undefined && enabled.value.includes(local.value) ? local.value : enabled.value[0]
})
const tabStop = computed(
  () =>
    [focused.value, active.value].find((key) => key !== undefined && enabled.value.includes(key)) ?? enabled.value[0],
)

function select(key: TabsName) {
  if (key === active.value || !enabled.value.includes(key)) {
    return
  }
  if (props.modelValue === undefined) {
    local.value = key
  }
  emit('update:modelValue', key)
  emit('change', key)
}
function click(key: TabsName, event: Event) {
  if (!enabled.value.includes(key)) {
    return
  }
  select(key)
  emit('tab-click', key, event)
}
async function add(event: Event) {
  emit('add', event)
  if (props.autoSwitch) {
    await nextTick()
    const last = enabled.value.at(-1)
    if (last !== undefined) {
      select(last)
    }
  }
}
function id(key: TabsName, part: string) {
  return `${uid}-${part}-${typeof key}-${encodeURIComponent(key)}`
}
function focusTab(key: TabsName, scope: Document | ShadowRoot) {
  const button = scope.getElementById(id(key, 'tab')) as HTMLButtonElement | null
  if (button?.disabled) {
    return
  }
  focused.value = key
  button?.focus()
}
type PendingClose = { key: TabsName; index: number; origin: Element; scope: Document | ShadowRoot; cleanup: () => void }
let pendingClose: PendingClose | undefined
function clearPendingClose() {
  pendingClose?.cleanup()
  pendingClose = undefined
}
function remove(key: TabsName, event: Event) {
  clearPendingClose()
  const source = event.currentTarget as HTMLElement | null
  const document = source?.ownerDocument
  const scope = source && focusScope(source)
  const origin = scope?.activeElement
  const index = enabled.value.indexOf(key)
  if (source && document && scope && origin && source.parentElement?.contains(origin) && index >= 0) {
    const cancelOnFocus = () => {
      if (scope.activeElement !== origin) {
        clearPendingClose()
      }
    }
    document.addEventListener('focusin', cancelOnFocus, true)
    document.addEventListener('pointerdown', clearPendingClose, true)
    pendingClose = {
      key,
      index,
      origin,
      scope,
      cleanup: () => {
        document.removeEventListener('focusin', cancelOnFocus, true)
        document.removeEventListener('pointerdown', clearPendingClose, true)
      },
    }
  }
  emit('delete', key, event)
}
watch(
  entries,
  () => {
    const pending = pendingClose
    if (!pending || entries.value.some((tab) => tab.name === pending.key)) {
      return
    }
    nextTick(() => {
      if (pendingClose !== pending) {
        return
      }
      const { scope, origin, index } = pending
      const document = origin.ownerDocument
      const activeElement = scope.activeElement ?? document.activeElement
      const target = enabled.value[Math.min(index, enabled.value.length - 1)]
      clearPendingClose()
      if (target === undefined || (activeElement && activeElement !== document.body && activeElement !== origin)) {
        return
      }
      focusTab(target, scope)
    })
  },
  { flush: 'post' },
)
onBeforeUnmount(clearPendingClose)

provide(tabsInjectionKey, {
  props,
  entries,
  enabled,
  tabStop,
  active,
  focused,
  rtl,
  rtlAt: (element) => resolveDirection(element, rtl.value ? 'rtl' : 'ltr') === 'rtl',
  select,
  click,
  add,
  remove,
  id,
  focusTab,
})

const paneName = createNamespace('tab-pane').name
const leaves = new Set([createNamespace('tabs').name, TabNav.name, createNamespace('tab-item').name, paneName])

function componentName(node: VNode) {
  return (node.type as { name?: string }).name
}
function named(node: VNode) {
  return typeof node.props?.name === 'string' || typeof node.props?.name === 'number'
}
function collect(nodes: VNode[], navs: VNode[], panels: VNode[]) {
  for (const node of nodes) {
    const name = componentName(node)
    if (name && leaves.has(name)) {
      continue
    }
    const children = node.children as { default?: () => VNode[] | VNode } | null
    const nested = flatten(Array.isArray(node.children) ? (node.children as VNode[]) : (children?.default?.() ?? []))
    if (name === TabsNavs.name) {
      navs.push(...nested.filter((child) => componentName(child) === TabNav.name && named(child)))
    } else if (name === TabsItems.name) {
      panels.push(...nested)
    } else {
      collect(nested, navs, panels)
    }
  }
}
const Render = () => {
  const nodes = slots.default?.() ?? []
  const rootNodes = flatten(nodes)
  const panes = rootNodes.filter((node) => componentName(node) === paneName && named(node))
  const navs: VNode[] = []
  const panels: VNode[] = []
  collect(rootNodes, navs, panels)
  const implicitNavs = panes.map((pane) => {
    const children = pane.children as { title?: () => VNode[] | VNode } | null
    return h(
      TabNav,
      {
        key: pane.key ?? pane.props?.name,
        name: pane.props?.name as TabsName,
        title: pane.props?.title,
        disabled: pane.props?.disabled,
        closable: pane.props?.closable,
        itemVertical: pane.props?.itemVertical,
      },
      children?.title ? { title: children.title } : undefined,
    )
  })
  navs.push(...implicitNavs)
  panels.push(...panes)
  const next = navs.map((node) => ({
    name: node.props?.name as TabsName,
    disabled: node.props?.disabled === '' || !!node.props?.disabled,
    hasPanel: panels.some((panel) => panel.props?.name === node.props?.name),
  }))
  if (JSON.stringify(next) !== JSON.stringify(entries.value)) {
    entries.value = next
  }
  return h(
    'div',
    {
      ...attrs,
      class: [
        classes(
          n(),
          n(`--variant-${props.variant}`),
          n(`--size-${size.value}`),
          [props.orientation === 'vertical', n('--vertical')],
          [props.justify, n('--justify')],
          [props.indicatorPosition === 'reverse', n('--indicator-reverse')],
        ),
        attrs.class,
      ],
    },
    panes.length
      ? [
          ...rootNodes.filter((node) => !panes.includes(node)),
          h(TabsNavs, null, { default: () => implicitNavs }),
          h(TabsItems, null, { default: () => panes }),
        ]
      : nodes,
  )
}
</script>
