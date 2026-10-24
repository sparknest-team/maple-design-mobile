<script setup lang="ts">
import { computed, ref } from 'vue'
import { createNamespace } from '../utils/components'
import PageItem from './PageItem.vue'
import PageItemEllipsis from './PageItemEllipsis.vue'
import PageItemStep from './PageItemStep.vue'
import PageJumper from './PageJumper.vue'
import PageOptions from './PageOptions.vue'
import { usePaginationLocale } from './platform'
import { paginationProps } from './props'
import { useCompact } from './use-compact'
import { usePagination } from './use-pagination'

defineOptions({ name: createNamespace('pagination').name })
const props = defineProps(paginationProps)
const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
  (event: 'update:pageSize', value: number): void
  (event: 'change', value: number): void
  (event: 'page-size-change', value: number): void
}>()
const { n, classes } = createNamespace('pagination')
const root = ref<HTMLElement>()
const compact = useCompact(root, props)
const simpleMode = computed(() => props.simple || compact.value)
const { current, pageSize, total, pages, buffer, pageList, changeCurrent, changePageSize } = usePagination(props, emit)
const text = usePaginationLocale()
</script>

<template>
  <nav
    v-show="!(hideOnSinglePage && pages <= 1)"
    ref="root"
    :aria-label="text.navigation"
    :class="
      classes(
        n(),
        n(`--size-${size}`),
        [simpleMode, n('--simple')],
        [compact, n('--compact')],
        [disabled, n('--disabled')],
      )
    "
  >
    <span v-if="showTotal" :class="n('total')"
      ><slot name="total" :total="total">{{ text.total(total) }}</slot></span
    >
    <div v-if="simpleMode" :class="n('simple-wrap')">
      <PageItemStep
        type="previous"
        :current="current"
        :pages="pages"
        :disabled="disabled"
        :elevation="elevation"
        @click="changeCurrent"
      >
        <template v-if="$slots['page-item-step']" #default="slotProps"
          ><slot name="page-item-step" v-bind="slotProps"
        /></template>
      </PageItemStep>
      <PageJumper :current="current" :pages="pages" :disabled="disabled" :size="size" simple @change="changeCurrent" />
      <PageItemStep
        type="next"
        :current="current"
        :pages="pages"
        :disabled="disabled"
        :elevation="elevation"
        @click="changeCurrent"
      >
        <template v-if="$slots['page-item-step']" #default="slotProps"
          ><slot name="page-item-step" v-bind="slotProps"
        /></template>
      </PageItemStep>
    </div>
    <ul v-else :class="n('list')">
      <li>
        <PageItemStep
          type="previous"
          :current="current"
          :pages="pages"
          :disabled="disabled"
          :elevation="elevation"
          @click="changeCurrent"
        >
          <template v-if="$slots['page-item-step']" #default="slotProps"
            ><slot name="page-item-step" v-bind="slotProps"
          /></template>
        </PageItemStep>
      </li>
      <li v-for="item in pageList" :key="item.key">
        <PageItemEllipsis
          v-if="item.type === 'more'"
          :step="item.step"
          :current="current"
          :pages="pages"
          :disabled="disabled"
          :elevation="elevation"
          @click="changeCurrent"
        >
          <slot v-if="$slots['page-item-ellipsis']" name="page-item-ellipsis" />
        </PageItemEllipsis>
        <PageItem
          v-else
          :page-number="item.pageNumber"
          :current="current"
          :disabled="disabled"
          :elevation="elevation"
          :style="pageItemStyle"
          :active-style="activePageItemStyle"
          @click="changeCurrent"
        >
          <template v-if="$slots['page-item']" #default="slotProps"
            ><slot name="page-item" v-bind="slotProps"
          /></template>
        </PageItem>
      </li>
      <li v-if="showMore">
        <PageItemEllipsis
          :step="buffer * 2 + 1"
          :current="current"
          :pages="pages"
          :disabled="disabled"
          :elevation="elevation"
          @click="changeCurrent"
        >
          <slot v-if="$slots['page-item-ellipsis']" name="page-item-ellipsis" />
        </PageItemEllipsis>
      </li>
      <li>
        <PageItemStep
          type="next"
          :current="current"
          :pages="pages"
          :disabled="disabled"
          :elevation="elevation"
          @click="changeCurrent"
        >
          <template v-if="$slots['page-item-step']" #default="slotProps"
            ><slot name="page-item-step" v-bind="slotProps"
          /></template>
        </PageItemStep>
      </li>
    </ul>
    <div v-if="showPageSize || (!simpleMode && showJumper)" :class="n('controls')">
      <PageOptions
        v-if="showPageSize"
        :page-size="pageSize"
        :size-options="pageSizeOptions"
        :size="size"
        :disabled="disabled"
        :select-props="pageSizeProps"
        @change="changePageSize"
      />
      <PageJumper
        v-if="!simpleMode && showJumper"
        :current="current"
        :pages="pages"
        :disabled="disabled"
        :size="size"
        @change="changeCurrent"
      >
        <template v-if="$slots['jumper-prepend']" #jumper-prepend><slot name="jumper-prepend" /></template>
        <template v-if="$slots['jumper-append']" #jumper-append><slot name="jumper-append" /></template>
      </PageJumper>
    </div>
  </nav>
</template>
