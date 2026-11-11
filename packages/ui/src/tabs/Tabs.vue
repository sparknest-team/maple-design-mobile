<template><Render /></template>

<script setup lang="ts">
import { computed, h, nextTick, onBeforeUnmount, provide, ref, useAttrs, useId, watch, type VNode } from 'vue'
import { useDirection } from '../_utils/direction'
import { createNamespace } from '../utils/components'
import { flatten, tabsInjectionKey, type TabEntry } from './context'
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
const entriesState = ref<TabEntry[]>([])
const entries = computed(() => entriesState.value)
const active = computed(() => {
  if (props.modelValue !== undefined) {
    return props.modelValue
  }
  return (
    entries.value.find((tab) => tab.name === local.value && !tab.disabled)?.name ??
    entries.value.find((tab) => !tab.disabled)?.name
  )
})

function select(key: TabsName) {
  if (key === active.value || !entries.value.some((tab) => tab.name === key && !tab.disabled)) {
    return
  }
  if (props.modelValue === undefined) {
    local.value = key
  }
  emit('update:modelValue', key)
  emit('change', key)
}
function click(key: TabsName, event: Event) {
  if (!entries.value.some((tab) => tab.name === key && !tab.disabled)) {
    return
  }
  select(key)
  emit('tab-click', key, event)
}
async function add(event: Event) {
  emit('add', event)
  if (props.autoSwitch) {
    await nextTick()
    const last = entries.value.filter((tab) => !tab.disabled).at(-1)
    if (last) {
      select(last.name)
    }
  }
}
type PendingClose = { key: TabsName; index: number; origin: Element; document: Document; cleanup: () => void }
let pendingClose: PendingClose | undefined
function clearPendingClose() {
  pendingClose?.cleanup()
  pendingClose = undefined
}
function remove(key: TabsName, event: Event) {
  clearPendingClose()
  const source = event.currentTarget as HTMLElement | null
  const document = source?.ownerDocument
  const origin = document?.activeElement
  const enabled = entries.value.filter((tab) => !tab.disabled)
  const index = enabled.findIndex((tab) => tab.name === key)
  if (source && document && origin && source.parentElement?.contains(origin) && index >= 0) {
    const cancelOnFocus = (next: FocusEvent) => {
      if (next.target !== origin) {
        clearPendingClose()
      }
    }
    const cancelOnPointer = () => clearPendingClose()
    document.addEventListener('focusin', cancelOnFocus, true)
    document.addEventListener('pointerdown', cancelOnPointer, true)
    pendingClose = {
      key,
      index,
      origin,
      document,
      cleanup: () => {
        document.removeEventListener('focusin', cancelOnFocus, true)
        document.removeEventListener('pointerdown', cancelOnPointer, true)
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
      const { document, origin, index } = pending
      const activeElement = document.activeElement
      const enabled = entries.value.filter((tab) => !tab.disabled)
      const target = enabled[Math.min(index, enabled.length - 1)]
      clearPendingClose()
      if (!target || (activeElement && activeElement !== document.body && activeElement !== origin)) {
        return
      }
      focused.value = target.name
      document.getElementById(`${uid}-tab-${typeof target.name}-${encodeURIComponent(String(target.name))}`)?.focus()
    })
  },
  { flush: 'post' },
)
onBeforeUnmount(clearPendingClose)

provide(tabsInjectionKey, {
  props,
  entries,
  active,
  focused,
  rtl,
  select,
  click,
  add,
  remove,
  id: (key, part) => `${uid}-${part}-${typeof key}-${encodeURIComponent(String(key))}`,
})

function collect(nodes: VNode[] | VNode, component: string): VNode[] {
  return flatten(nodes).flatMap((node) => {
    const nodeName = (node.type as { name?: string })?.name
    if (
      ['tabs', 'tab-nav', 'tab-item', 'tab-pane', component === 'tabs-navs' ? 'tabs-items' : 'tabs-navs'].some(
        (name) => nodeName === createNamespace(name).name,
      )
    ) {
      return []
    }
    const children = node.children as { default?: () => VNode[] | VNode } | null
    const nested = Array.isArray(node.children) ? (node.children as VNode[]) : (children?.default?.() ?? [])
    return (node.type as { name?: string })?.name === createNamespace(component).name
      ? flatten(nested)
      : collect(nested, component)
  })
}
const Render = () => {
  const nodes = slots.default?.() ?? []
  const rootNodes = flatten(nodes)
  const panes = rootNodes
    .filter((node) => (node.type as { name?: string })?.name === createNamespace('tab-pane').name)
    .filter((node) => typeof node.props?.name === 'string' || typeof node.props?.name === 'number')
  const explicitPanels = collect(nodes, 'tabs-items')
  const implicitNavs = panes.map((pane) => {
    const children = pane.children as { title?: () => VNode[] | VNode } | null
    return h(
      TabNav,
      {
        key: pane.key ?? pane.props?.name,
        name: pane.props?.name as TabsName,
        title: pane.props?.title ?? String(pane.props?.name),
        disabled: pane.props?.disabled,
        closable: pane.props?.closable,
        itemVertical: pane.props?.itemVertical,
      },
      children?.title ? { title: children.title } : undefined,
    )
  })
  const navs = [
    ...collect(nodes, 'tabs-navs')
      .filter((node) => (node.type as { name?: string })?.name === createNamespace('tab-nav').name)
      .filter((node) => typeof node.props?.name === 'string' || typeof node.props?.name === 'number'),
    ...implicitNavs,
  ]
  const panels = [...explicitPanels, ...panes]
  const next = navs.map((node) => ({
    name: node.props?.name as TabsName,
    disabled: node.props?.disabled === '' || !!node.props?.disabled,
    hasPanel: panels.some((panel) => panel.props?.name === node.props?.name),
  }))
  if (JSON.stringify(next) !== JSON.stringify(entriesState.value)) {
    entriesState.value = next
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
      dir: attrs.dir,
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
