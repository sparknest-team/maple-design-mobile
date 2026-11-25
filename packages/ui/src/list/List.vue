<script setup lang="ts">
import { computed, onActivated, onDeactivated, ref, useSlots } from 'vue'
import VirtualList from '../_components/virtual-list-v2'
import type { ScrollIntoViewOptions, VirtualListRef } from '../_components/virtual-list-v2/interface'
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
const emptyRenderer = useListEmpty()
const virtualRef = ref<VirtualListRef>()
const isVirtual = () => !!props.virtualListProps && !slots.default
const maxHeight = computed(() => positiveLength(props.maxHeight, ''))
let active = true
let restoreScroll: (() => void) | undefined

function handleViewportScroll(event: Event) {
  if (isVirtual() || !active) {
    return
  }
  const element = event.target as HTMLElement | null
  if (element?.isConnected) {
    const { scrollTop, scrollLeft } = element
    restoreScroll = () => {
      if (element.isConnected) {
        Object.assign(element, { scrollTop, scrollLeft })
      }
    }
  }
  emit('scroll', event)
}

onDeactivated(() => {
  active = false
})
onActivated(() => {
  active = true
  restoreScroll?.()
})

function scrollIntoView(options: ScrollIntoViewOptions) {
  virtualRef.value?.scrollTo(options)
}
defineExpose<ListExpose>({ scrollIntoView })
</script>

<template>
  <div :class="classes(n(), n('--' + size), [bordered, n('--bordered')], [split, n('--split')])" :aria-busy="loading">
    <Loading :class="n('loading')" :loading="loading">
      <component
        :is="!isVirtual() && scrollbar ? Scrollbar : 'div'"
        v-bind="!isVirtual() && typeof scrollbar === 'object' ? scrollbar : undefined"
        :class="n('viewport')"
        :style="!isVirtual() && maxHeight ? { maxHeight, overflowY: 'auto' } : undefined"
        @vue:unmounted="restoreScroll = undefined"
        @scroll="handleViewportScroll"
      >
        <div v-if="slots.header" :class="n('header')"><slot name="header" /></div>
        <VirtualList
          v-if="isVirtual() && data?.length"
          ref="virtualRef"
          v-bind="virtualListProps"
          :height="virtualListProps?.height ?? (maxHeight || undefined)"
          :data="data"
          :class="classes(n('content'), n('--virtual'))"
          :content-attrs="{ role: 'list' }"
          @vue:mounted="restoreScroll = undefined"
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
            <slot name="empty"><component :is="emptyRenderer" /></slot>
          </div>
        </div>
        <div v-if="slots.footer" :class="n('footer')"><slot name="footer" /></div>
      </component>
    </Loading>
  </div>
</template>
