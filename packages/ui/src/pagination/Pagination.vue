<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
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
let quickJumpGeneration = 0
function quickJump(page: number) {
  const element = root.value
  const document = element?.ownerDocument
  const original = document?.activeElement
  const ownsFocus = !!original && !!element?.contains(original) && original.classList.contains(n('item-ellipsis'))
  const generation = ++quickJumpGeneration
  changeCurrent(page)
  if (!ownsFocus) {
    return
  }
  nextTick(() =>
    nextTick(() => {
      if (
        generation !== quickJumpGeneration ||
        !element?.isConnected ||
        !document ||
        current.value !== page ||
        original?.isConnected
      ) {
        return
      }
      const focused = document.activeElement
      if (focused && focused !== document.body && focused !== original) {
        return
      }
      element.querySelector<HTMLButtonElement>(`button.${n('item')}[aria-current="page"]:not(:disabled)`)?.focus()
    }),
  )
}
const jumperDraft = ref(String(current.value))
watch(current, (value) => {
  jumperDraft.value = String(value)
})
const migratingJumper = ref(false)
let migrationGeneration = 0
const isJumperMigrating = () => migratingJumper.value
watch(
  simpleMode,
  () => {
    const element = root.value
    const document = element?.ownerDocument
    const active = document?.activeElement
    const input =
      active?.tagName === 'INPUT' && active.closest(`.${n('jumper')}`) && element?.contains(active)
        ? (active as HTMLInputElement)
        : undefined
    const start = input?.selectionStart,
      end = input?.selectionEnd
    const generation = ++migrationGeneration
    migratingJumper.value = !!input
    nextTick(() =>
      nextTick(() => {
        if (generation !== migrationGeneration) {
          return
        }
        migratingJumper.value = false
        if (!input || !element?.isConnected || !document) {
          return
        }
        const focused = document.activeElement
        if (focused && focused !== document.body && focused !== input) {
          return
        }
        const replacement = element.querySelector<HTMLInputElement>(`.${n('jumper')} input`)
        if (!replacement || replacement.disabled) {
          return
        }
        replacement.focus()
        if (start != null && end != null) {
          replacement.setSelectionRange(start, end)
        }
      }),
    )
  },
  { flush: 'sync' },
)
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
      <PageJumper
        v-model="jumperDraft"
        :is-migrating="isJumperMigrating"
        :current="current"
        :pages="pages"
        :disabled="disabled"
        :size="size"
        simple
        @change="changeCurrent"
      />
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
          @click="quickJump"
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
          @click="quickJump"
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
        v-model="jumperDraft"
        :is-migrating="isJumperMigrating"
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
