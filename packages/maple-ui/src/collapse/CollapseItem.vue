<template>
  <div :class="itemClass">
    <div :class="headerClass" @click="handleClick">
      <div
        :class="n('header-heading')"
        :role="validHeadingLevel ? 'heading' : undefined"
        :aria-level="validHeadingLevel"
      >
        <div
          :id="`${idBase}-header`"
          role="button"
          :tabindex="disabled ? -1 : 0"
          :aria-disabled="disabled"
          :aria-expanded="isExpanded"
          :aria-controls="`${idBase}-panel`"
          :class="n('header-button')"
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
          <div v-if="mergedShowExpandIcon && expandIconPosition === 'right'" :class="n('expand-icon-wrap')">
            <slot name="expand-icon" v-bind="expandIconSlotProps">
              <ParentExpandIcon v-if="hasParentExpandIcon" />
              <DefaultExpandIcon v-else v-bind="expandIconSlotProps" />
            </slot>
          </div>
        </div>
      </div>
      <div v-if="$slots.extra" :class="n('header-extra')" @click.stop>
        <slot name="extra" />
      </div>
    </div>
    <Transition
      name="collapse-slider"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
      @leave-cancelled="onLeaveCancelled"
    >
      <div
        v-show="isExpanded"
        :id="`${idBase}-panel`"
        :role="region ? 'region' : undefined"
        :aria-labelledby="region ? `${idBase}-header` : undefined"
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
import { collapseItemProps, type CollapseExpandIconSlotProps, type CollapseItemSlots, type CollapseName } from './props'

defineOptions({ name: createNamespace('collapse-item').name })

const props = defineProps(collapseItemProps)
defineSlots<CollapseItemSlots>()
const { n, classes } = createNamespace('collapse-item')
const collapseCtx = inject(collapseKey)
const itemName = computed(() => props.name as CollapseName)
const validHeadingLevel = computed(() =>
  Number.isInteger(props.headingLevel) && props.headingLevel! >= 1 && props.headingLevel! <= 6
    ? props.headingLevel
    : undefined,
)
const disabledRef = computed(() => props.disabled)
const isExpanded = computed(() => collapseCtx?.expandedNames.includes(itemName.value) ?? false)
const mergedDestroyOnHide = computed(() => Boolean(collapseCtx?.destroyOnHide || props.destroyOnHide))
const mergedShowExpandIcon = computed(() => collapseCtx?.showExpandIcon ?? props.showExpandIcon)
const expandIconPosition = computed(() => collapseCtx?.expandIconPosition ?? 'left')
const contentMounted = ref(mergedDestroyOnHide.value ? isExpanded.value : true)
const instanceId = useId()
const idBase = computed(() => `${n()}-${instanceId}-${String(itemName.value).replace(/[^\w-]/g, '-')}`)
const expandIconSlotProps = computed<CollapseExpandIconSlotProps>(() => ({
  expanded: isExpanded.value,
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
const itemClass = computed(() => classes(n(), [isExpanded.value, n('--active')], [props.disabled, n('--disabled')]))
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

let leaving = false
watch([isExpanded, mergedDestroyOnHide], ([expanded, destroy], [wasExpanded]) => {
  if (expanded || !destroy) {
    contentMounted.value = true
  } else if (!wasExpanded && !leaving) {
    contentMounted.value = false
  }
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
  leaving = true
  ;(el as HTMLElement).style.height = `${el.scrollHeight}px`
}

function onLeave(el: Element) {
  ;(el as HTMLElement).style.height = '0'
}

function onLeaveCancelled() {
  leaving = false
}

function onAfterLeave() {
  leaving = false
  if (!isExpanded.value && mergedDestroyOnHide.value) {
    contentMounted.value = false
  }
}
</script>
