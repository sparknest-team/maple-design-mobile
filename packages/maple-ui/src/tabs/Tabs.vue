<template><Render /></template>

<script setup lang="ts">
import { computed, h, nextTick, provide, ref, useAttrs, useId, useSlots, type VNode } from 'vue'
import { flatten, tabsInjectionKey, type TabEntry } from './context'
import { createNamespace, useTabsPlatform } from './platform'
import { tabsProps, type TabsKey } from './props'
import TabNav from './TabNav.vue'
import TabsItems from './TabsItems.vue'
import TabsNavs from './TabsNavs.vue'

defineOptions({ name: createNamespace('tabs').name, inheritAttrs: false })
const props = defineProps(tabsProps)
const emit = defineEmits<{
  'update:active': [key: TabsKey]
  change: [key: TabsKey]
  'tab-click': [key: TabsKey, event: Event]
  add: [event: Event]
  delete: [key: TabsKey, event: Event]
}>()
const slots = useSlots()
const attrs = useAttrs()
const { n, classes } = createNamespace('tabs')
const { size, rtl } = useTabsPlatform(computed(() => props.size))
const uid = useId()
const local = ref(props.defaultActive)
const focused = ref<TabsKey>()
const entriesState = ref<TabEntry[]>([])
const entries = computed(() => entriesState.value)
const active = computed(() => {
  if (props.active !== undefined) {
    return props.active
  }
  return (
    entries.value.find((tab) => tab.key === local.value && !tab.disabled)?.key ??
    entries.value.find((tab) => !tab.disabled)?.key
  )
})

function select(key: TabsKey) {
  if (key === active.value || !entries.value.some((tab) => tab.key === key && !tab.disabled)) {
    return
  }
  if (props.active === undefined) {
    local.value = key
  }
  emit('update:active', key)
  emit('change', key)
}
function click(key: TabsKey, event: Event) {
  if (!entries.value.some((tab) => tab.key === key && !tab.disabled)) {
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
      select(last.key)
    }
  }
}
provide(tabsInjectionKey, {
  props,
  entries,
  active,
  focused,
  rtl,
  select,
  click,
  add,
  remove: (key, event) => emit('delete', key, event),
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
    .filter((node) => typeof node.key === 'string' || typeof node.key === 'number')
  const explicitPanels = collect(nodes, 'tabs-items')
  const implicitNavs = panes.map((pane) => {
    const children = pane.children as { title?: () => VNode[] | VNode } | null
    return h(
      TabNav,
      {
        key: pane.key as TabsKey,
        title: pane.props?.title ?? String(pane.key),
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
      .filter((node) => typeof node.key === 'string' || typeof node.key === 'number'),
    ...implicitNavs,
  ]
  const panels = [...explicitPanels, ...panes]
  const next = navs.map((node) => ({
    key: node.key as TabsKey,
    disabled: node.props?.disabled === '' || !!node.props?.disabled,
    hasPanel: panels.some((panel) => panel.key === node.key),
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
      dir: attrs.dir ?? (rtl.value ? 'rtl' : undefined),
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
