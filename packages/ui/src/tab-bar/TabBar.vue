<template>
  <div
    ref="tabBarDom"
    role="group"
    :aria-busy="busy || undefined"
    :class="
      classes(
        n(),
        n('$--box'),
        [fixed, n('--fixed')],
        [border, n('--border')],
        [safeArea, n('--safe-area')],
        [variant === 'pill', n('--variant')],
      )
    "
    :style="{ zIndex: zIndex ?? 'var(--mp-tab-bar-z-index)' }"
    v-bind="$attrs"
  >
    <PendingFeedback :loading="busy" />
    <slot />

    <mp-button
      v-if="$slots.fab"
      :class="classes(n('fab'), [length % 2, n('--fab-right'), n('--fab-center')])"
      mp-tab-bar__fab
      v-bind="fabProps"
      @click="handleFabClick"
    >
      <slot name="fab"></slot>
    </mp-button>
  </div>

  <div v-if="fixed && placeholder" :class="n('placeholder')" :style="{ height: placeholderHeight }" />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onUpdated, ref, useSlots, watch } from 'vue'
import { call, getRect, isNumber, normalizeToArray } from '@maple-design/shared-vue'
import { onSmartMounted, onWindowResize } from '@maple-design/use-vue'
import PendingFeedback from '../_components/pending-feedback/PendingFeedback.vue'
import { useActionGuard } from '../_hooks/use-action-guard'
import MpButton from '../button/base'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { useElementResize } from '../utils/resize-observer'
import { props as tabBarProps } from './props'
import { useTabBarItems, type TabBarProvider } from './provide'

const { n, classes } = createNamespace('tab-bar')
const { n: nItem } = createNamespace('tab-bar-item')

const RIGHT_HALF_SPACE_CLASS = nItem('--right-half-space')
const LEFT_HALF_SPACE_CLASS = nItem('--left-half-space')
const RIGHT_SPACE_CLASS = nItem('--right-space')
const defaultFabProps = {
  status: 'primary',
}

defineOptions({ name: createNamespace('tab-bar').name })
const props = defineProps(tabBarProps)
const emit = defineEmits<{
  change: [active: number | string]
  'update:modelValue': [active: number | string]
  'guard-error': [error: unknown, value: number | string]
  'fab-click': []
}>()
const slots = useSlots()

const tabBarDom = ref<HTMLElement | null>(null)
// Native inset updates can change CSS geometry without a Vue update or window resize.
useElementResize(
  () => [tabBarDom.value],
  () => props.fixed && props.placeholder,
  () => resizePlaceholder(),
)
const internalActive = ref(props.defaultValue)
const active = computed(() => (props.modelValue === undefined ? internalActive.value : props.modelValue))
const guard = useActionGuard()
const busy = computed(() => props.loading || guard.pending.value)
let pendingTarget: number | string | undefined
let requestId = 0
const cancelPending = () => {
  guard.cancel()
  pendingTarget = undefined
  requestId++
}
watch(
  () => props.modelValue,
  (value, previous) => {
    cancelPending()
    // If control is released, continue from the last externally selected value.
    if (value === undefined && previous !== undefined) {
      internalActive.value = previous
    }
  },
  { flush: 'sync' },
)
watch(() => [props.beforeChange, props.loading], cancelPending, { flush: 'sync' })
onBeforeUnmount(cancelPending)
const activeColor = computed<string | undefined>(() => props.activeColor)
const inactiveColor = computed<string | undefined>(() => props.inactiveColor)
const variant = computed(() => props.variant)
const placeholderHeight = ref<string | undefined>()
const fabProps = ref({})
const { length, tabBarItems, bindTabBarItem } = useTabBarItems()

const tabBarProvider: TabBarProvider = {
  loading: computed(() => props.loading),
  active,
  activeColor,
  inactiveColor,
  variant,
  onToggle,
  isActive: (index) => selectedIndex.value === index,
}

const selectedIndex = computed(() => {
  if (!length.value) {
    return undefined
  }
  const named = tabBarItems.find((item) => item.name.value !== undefined && item.name.value === active.value)
  return (
    named?.index.value ??
    tabBarItems.find((item) => item.name.value === undefined && item.index.value === active.value)?.index.value
  )
})
bindTabBarItem(tabBarProvider)

watch(
  () => JSON.stringify([length.value, ...tabBarItems.map((item) => [item.name.value, item.index.value])]),
  () => {
    cancelPending()
    matchBoundary()
  },
  { flush: 'post' },
)

watch(
  () => props.fabProps,
  (newValue) => {
    fabProps.value = { ...defaultFabProps, ...newValue }
  },
  { immediate: true, deep: true },
)

onWindowResize(resizePlaceholder)

onSmartMounted(() => {
  resizePlaceholder()

  if (!slots.fab) {
    return
  }

  addMarginClass(length.value)
})

onUpdated(() => {
  resizePlaceholder()
  removeMarginClass()

  if (!slots.fab) {
    return
  }

  addMarginClass(length.value)
})

function matchBoundary() {
  if (!length.value || selectedIndex.value !== undefined || !isNumber(active.value)) {
    return
  }
  // Explicit names are identifiers, not indices to clamp.
  if (tabBarItems.some((item) => item.name.value !== undefined)) {
    return
  }
  const next = Math.max(0, Math.min(active.value, length.value - 1))
  if (next !== active.value) {
    if (props.modelValue === undefined) {
      internalActive.value = next
    }
    emit('update:modelValue', next)
  }
}

async function onToggle(changedValue: number | string) {
  if (props.loading || (guard.pending.value && pendingTarget === changedValue)) {
    return
  }
  cancelPending()
  const currentRequest = requestId
  if (active.value === changedValue) {
    return
  }
  const from = active.value
  if (props.beforeChange) {
    pendingTarget = changedValue
    const outcome = await guard.run(changedValue, async (value) => {
      const results = await Promise.all(normalizeToArray(call(props.beforeChange, value)))
      return results.every(Boolean)
    })
    if (currentRequest !== requestId) {
      return
    }
    pendingTarget = undefined
    if (outcome.status !== 'allowed') {
      if (outcome.status === 'error') {
        emit('guard-error', outcome.error, changedValue)
      }
      return
    }
  }
  if (requestId !== currentRequest || active.value !== from || props.loading) {
    return
  }
  if (!tabBarItems.some((item) => (item.name.value ?? item.index.value) === changedValue)) {
    return
  }
  if (props.modelValue === undefined) {
    internalActive.value = changedValue
  }
  emit('update:modelValue', changedValue)
  emit('change', changedValue)
}

function removeMarginClass() {
  const tabBarItems: Element[] = getTabBarItems()
  tabBarItems.forEach((dom: Element) => {
    dom.classList.remove(RIGHT_HALF_SPACE_CLASS, LEFT_HALF_SPACE_CLASS, RIGHT_SPACE_CLASS)
  })
}

function addMarginClass(length: number) {
  const tabBarItems: Element[] = getTabBarItems()
  const itemsNum = tabBarItems.length
  const isEven = length % 2 === 0

  tabBarItems.forEach((tabBarItem: Element, i: number) => {
    handleMarginClass(isEven, tabBarItem, i, itemsNum)
  })
}

function handleMarginClass(isEven: boolean, dom: Element, i: number, length: number) {
  const isLast = i === length - 1
  if (!isEven && isLast) {
    dom.classList.add(RIGHT_SPACE_CLASS)
    return
  }

  const isFabLeft = i === length / 2 - 1
  const isFabRight = i === length / 2
  if (isFabLeft) {
    dom.classList.add(RIGHT_HALF_SPACE_CLASS)
  } else if (isFabRight) {
    dom.classList.add(LEFT_HALF_SPACE_CLASS)
  }
}

function getTabBarItems() {
  return Array.from(tabBarDom.value!.querySelectorAll(`.${nItem()}`))
}

function handleFabClick() {
  emit('fab-click')
}

function resizePlaceholder() {
  if (!props.fixed || !props.placeholder) {
    return
  }

  const { height } = getRect(tabBarDom.value!)
  placeholderHeight.value = toSizeUnit(height)
}
</script>
