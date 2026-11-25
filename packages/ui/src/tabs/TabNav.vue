<template>
  <div
    :class="[classes(n('tab'), [selected, n('--tab-active')], [disabled, n('--tab-disabled')]), ctx.props.tabClass]"
    :style="ctx.props.tabStyle"
  >
    <button
      :id="ctx.id(name, 'tab')"
      type="button"
      role="tab"
      :class="classes(n('tab-button'), [itemVertical, n('--item-vertical')])"
      :aria-selected="selected"
      :aria-keyshortcuts="ctx.props.editable && closable ? 'Delete' : undefined"
      :aria-disabled="disabled || undefined"
      :aria-controls="hasPanel ? ctx.id(name, 'panel') : undefined"
      :disabled="disabled"
      :tabindex="!disabled && name === ctx.tabStop.value ? 0 : -1"
      @click="ctx.click(name, $event)"
      @pointerenter="hover"
      @keydown="keydown"
      @focus="ctx.focused.value = name"
    >
      <span v-if="$slots.icon" :class="n('icon')"><slot name="icon" /></span>
      <span :id="ctx.id(name, 'title')" :class="n('tab-title')"
        ><slot name="title"
          ><slot>{{ title ?? String(name) }}</slot></slot
        ></span
      >
    </button>
    <button
      v-if="ctx.props.editable && closable"
      type="button"
      :class="n('close')"
      tabindex="-1"
      :disabled="disabled"
      :aria-labelledby="`${ctx.id(name, 'close')} ${ctx.id(name, 'title')}`"
      @click="ctx.remove(name, $event)"
    >
      <span :id="ctx.id(name, 'close')" :class="n('visually-hidden')">{{ text.close }}</span>
      <span aria-hidden="true">×</span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed, inject } from 'vue'
import { createNamespace } from '../utils/components'
import { focusScope, tabsInjectionKey } from './context'
import { tabNavProps } from './props'
import type { TabNavSlots } from './types'
import { useTabsLocale } from './use-tabs-configuration'

defineSlots<TabNavSlots>()
defineOptions({ name: createNamespace('tab-nav').name })
const props = defineProps(tabNavProps)
const ctx = inject(tabsInjectionKey)!
const { n, classes } = createNamespace('tabs')
const text = useTabsLocale()
const selected = computed(() => ctx.active.value === props.name)
const hasPanel = computed(() => ctx.entries.value.find((tab) => tab.name === props.name)?.hasPanel)
function hover(event: PointerEvent) {
  if (!props.disabled && ctx.props.trigger === 'hover' && event.pointerType === 'mouse') {
    ctx.select(props.name)
  }
}
function keydown(event: KeyboardEvent) {
  if (props.disabled) {
    return
  }
  if (event.key === 'Delete' && ctx.props.editable && props.closable) {
    event.preventDefault()
    ctx.remove(props.name, event)
    return
  }
  const vertical = ctx.props.orientation === 'vertical'
  const button = event.currentTarget as HTMLButtonElement
  const rtl = ctx.rtlAt(button)
  const previous = vertical ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft'
  const next = vertical ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight'
  const enabled = ctx.enabled.value
  let index = enabled.indexOf(props.name)
  if (event.key === 'Home') {
    index = 0
  } else if (event.key === 'End') {
    index = enabled.length - 1
  } else if (event.key === previous) {
    index = (index - 1 + enabled.length) % enabled.length
  } else if (event.key === next) {
    index = (index + 1) % enabled.length
  } else {
    return
  }
  event.preventDefault()
  const target = enabled[index]
  if (target === undefined) {
    return
  }
  ctx.focusTab(target, focusScope(button))
  if (ctx.props.activationMode === 'automatic') {
    ctx.select(target)
  }
}
</script>
