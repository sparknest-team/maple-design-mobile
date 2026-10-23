<template>
  <div :class="itemClass">
    <div
      :id="`${idBase}-header`"
      role="button"
      :tabindex="disabled ? -1 : 0"
      :aria-disabled="disabled"
      :aria-expanded="isActive"
      :aria-controls="`${idBase}-panel`"
      :class="headerClass"
      @click="handleClick"
      @keydown="handleKeydown"
    >
      <div v-if="mergedShowExpandIcon && expandIconPosition === 'left'" :class="n('expand-icon-wrap')">
        <slot name="expand-icon" v-bind="expandIconSlotProps">
          <ParentExpandIcon v-if="hasParentExpandIcon" />
          <DefaultExpandIcon v-else v-bind="expandIconSlotProps" />
        </slot>
      </div>
      <div v-if="$slots.title || title" :class="n('header-title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.extra" :class="n('header-extra')" @click.stop>
        <slot name="extra" />
      </div>
      <div v-if="mergedShowExpandIcon && expandIconPosition === 'right'" :class="n('expand-icon-wrap')">
        <slot name="expand-icon" v-bind="expandIconSlotProps">
          <ParentExpandIcon v-if="hasParentExpandIcon" />
          <DefaultExpandIcon v-else v-bind="expandIconSlotProps" />
        </slot>
      </div>
    </div>
    <Transition
      name="collapse-slider"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div
        v-show="isActive"
        :id="`${idBase}-panel`"
        role="region"
        :aria-labelledby="`${idBase}-header`"
        :class="n('content')"
      >
        <div v-if="contentMounted" :class="n('content-box')">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, inject, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { createNamespace } from '../utils/components'
import { collapseKey } from './context'
import { DefaultExpandIcon } from './platform'
import { collapseItemProps, type CollapseName } from './props'

defineOptions({ name: createNamespace('collapse-item').name })

const props = defineProps(collapseItemProps)
const { n, classes } = createNamespace('collapse-item')
const collapseCtx = inject(collapseKey)
const itemName = computed(() => props.name as CollapseName)
const disabledRef = computed(() => props.disabled)
const isActive = computed(() => collapseCtx?.activeNames.includes(itemName.value) ?? false)
const mergedDestroyOnHide = computed(() => Boolean(collapseCtx?.destroyOnHide || props.destroyOnHide))
const mergedShowExpandIcon = computed(() => collapseCtx?.showExpandIcon ?? props.showExpandIcon)
const expandIconPosition = computed(() => collapseCtx?.expandIconPosition ?? 'left')
const contentMounted = ref(mergedDestroyOnHide.value ? isActive.value : true)
const instanceId = useId()
const idBase = computed(() => `${n()}-${instanceId}-${String(itemName.value).replace(/[^\w-]/g, '-')}`)
const expandIconSlotProps = computed(() => ({
  active: isActive.value,
  disabled: props.disabled,
  position: expandIconPosition.value,
}))
const hasParentExpandIcon = computed(() => Boolean(collapseCtx?.slots['expand-icon']))
const ParentExpandIcon = defineComponent({
  name: 'ParentExpandIcon',
  setup() {
    return () => collapseCtx?.slots['expand-icon']?.(expandIconSlotProps.value)
  },
})
const itemClass = computed(() => classes(n(), [isActive.value, n('--active')], [props.disabled, n('--disabled')]))
const headerClass = computed(() => classes(n('header'), n(`header--icon-${expandIconPosition.value}`)))

onMounted(() => {
  collapseCtx?.addItem({
    name: itemName.value,
    disabled: disabledRef,
  })
})

onBeforeUnmount(() => {
  collapseCtx?.removeItem(itemName.value)
})

watch(itemName, (nextName, prevName) => {
  if (prevName !== undefined) {
    collapseCtx?.removeItem(prevName)
  }
  collapseCtx?.addItem({
    name: nextName,
    disabled: disabledRef,
  })
})

watch([isActive, mergedDestroyOnHide], ([active, destroy]) => {
  contentMounted.value = active || !destroy
})

function handleClick(e: Event) {
  if (!props.disabled) {
    collapseCtx?.handleClick(itemName.value, e)
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.target !== event.currentTarget) {
    return
  }
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleClick(event)
  }
}

function onEnter(el: Element) {
  ;(el as HTMLElement).style.height = `${el.scrollHeight}px`
}

function onAfterEnter(el: Element) {
  ;(el as HTMLElement).style.height = 'auto'
}

function onBeforeLeave(el: Element) {
  ;(el as HTMLElement).style.height = `${el.scrollHeight}px`
}

function onLeave(el: Element) {
  ;(el as HTMLElement).style.height = '0'
}

function onAfterLeave() {
  if (mergedDestroyOnHide.value) {
    contentMounted.value = false
  }
}
</script>
