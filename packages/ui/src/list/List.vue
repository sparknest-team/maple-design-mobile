<script setup lang="ts">
import { computed, onActivated, onDeactivated, ref, useSlots, watch } from 'vue'
import VirtualList from '../_components/virtual-list-v2'
import type { ScrollIntoViewOptions, VirtualListRef } from '../_components/virtual-list-v2/interface'
import Empty from '../empty'
import Loading from '../loading/Loading.vue'
import { createNamespace } from '../utils/components'
import { positiveLength } from '../utils/size-length'
import { listProps } from './props'
import type { ListExpose } from './props'
import { Scrollbar, useListEmpty } from './render-adapter'

defineOptions({ name: createNamespace('list').name })
const { n, classes } = createNamespace('list')
const props = defineProps(listProps)
const emit = defineEmits<{ scroll: [event: Event] }>()
const slots = useSlots()
const globalEmpty = useListEmpty()
const virtualRef = ref<VirtualListRef>()
const virtual = computed(() => Boolean(props.virtualListProps && !slots.default))
const viewport = computed(() => (!virtual.value && props.scrollbar ? Scrollbar : 'div'))
const viewportProps = computed(() => (!virtual.value && typeof props.scrollbar === 'object' ? props.scrollbar : {}))
const maxHeight = computed(() => positiveLength(props.maxHeight, ''))
const contentStyle = computed(() =>
  !virtual.value && maxHeight.value ? { maxHeight: maxHeight.value, overflowY: 'auto' as const } : undefined,
)
const virtualProps = computed(() => ({
  ...props.virtualListProps,
  height: props.virtualListProps?.height ?? (maxHeight.value || undefined),
}))
let active = true
let position: { element: HTMLElement; top: number; left: number } | undefined

function handleViewportScroll(event: Event) {
  if (virtual.value || !active) return
  const element = event.target as HTMLElement | null
  if (element?.isConnected) {
    position = { element, top: element.scrollTop, left: element.scrollLeft }
  }
  emit('scroll', event)
}

watch([viewport, virtual], () => { position = undefined })
onDeactivated(() => { active = false })
onActivated(() => {
  active = true
  if (position?.element.isConnected) {
    position.element.scrollTop = position.top
    position.element.scrollLeft = position.left
  }
})

function scrollIntoView(options: ScrollIntoViewOptions) {
  if (virtual.value) {
    virtualRef.value?.scrollTo(options)
  }
}
defineExpose<ListExpose>({ scrollIntoView })
</script>

<template>
  <div :class="classes(n(), n('--' + size), [bordered, n('--bordered')], [split, n('--split')])" :aria-busy="loading">
    <Loading :class="n('loading')" :loading="loading">
      <component
        :is="viewport"
        v-bind="viewportProps"
        :class="n('viewport')"
        :style="contentStyle"
        @scroll="handleViewportScroll"
      >
        <div v-if="slots.header" :class="n('header')"><slot name="header" /></div>
        <VirtualList
          v-if="virtual && data?.length"
          ref="virtualRef"
          v-bind="virtualProps"
          :data="data"
          :class="classes(n('content'), n('--virtual'))"
          :content-attrs="{ role: 'list' }"
          @scroll="emit('scroll', $event)"
        >
          <template #item="{ item, index }"><slot name="item" :item="item" :index="index" /></template>
        </VirtualList>
        <div v-else :class="n('content')" role="list">
          <slot v-if="slots.default" />
          <template v-else-if="data?.length"
            ><slot v-for="(item, index) in data" name="item" :item="item" :index="index"
          /></template>
          <div v-else-if="!loading" :class="n('empty')">
            <slot name="empty"><component :is="globalEmpty" v-if="globalEmpty" /><Empty v-else /></slot>
          </div>
        </div>
        <div v-if="slots.footer" :class="n('footer')"><slot name="footer" /></div>
      </component>
    </Loading>
  </div>
</template>
