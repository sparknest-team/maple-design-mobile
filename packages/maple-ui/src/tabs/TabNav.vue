<template>
  <div
    :class="[classes(n('tab'), [selected, n('--tab-active')], [disabled, n('--tab-disabled')]), ctx.props.tabClass]"
    :style="ctx.props.tabStyle"
  >
    <button
      :id="ctx.id(name, 'tab')"
      ref="button"
      type="button"
      role="tab"
      :class="classes(n('tab-button'), [itemVertical, n('--item-vertical')])"
      :aria-selected="selected"
      :aria-keyshortcuts="ctx.props.editable && closable ? 'Delete' : undefined"
      :aria-disabled="disabled || undefined"
      :aria-controls="hasPanel ? ctx.id(name, 'panel') : undefined"
      :disabled="disabled"
      :tabindex="tabIndex"
      @click="ctx.click(name, $event)"
      @pointerenter="hover"
      @keydown="keydown"
      @focus="ctx.focused.value = name"
    >
      <span v-if="$slots.icon" :class="n('icon')"><slot name="icon" /></span>
      <span :class="n('tab-title')"
        ><slot name="title"
          ><slot>{{ title }}</slot></slot
        ></span
      >
    </button>
    <button
      v-if="ctx.props.editable && closable"
      type="button"
      :class="n('close')"
      tabindex="-1"
      aria-hidden="true"
      :disabled="disabled"
      :aria-label="`Close ${title ?? String(name)}`"
      @click="ctx.remove(name, $event)"
    >
      ×
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed, inject, nextTick, ref } from 'vue'
import { resolveDirection } from '../_utils/direction'
import { createNamespace } from '../utils/components'
import { tabsInjectionKey } from './context'
import { tabNavProps } from './props'
import type { TabNavSlots } from './types'

defineSlots<TabNavSlots>()
defineOptions({ name: createNamespace('tab-nav').name })
const props = defineProps(tabNavProps)
const ctx = inject(tabsInjectionKey)!
const { n, classes } = createNamespace('tabs')
const button = ref<HTMLButtonElement>()
const name = computed(() => props.name)
const selected = computed(() => ctx.active.value === name.value)
const hasPanel = computed(() => ctx.entries.value.find((tab) => tab.name === name.value)?.hasPanel)
const tabIndex = computed(() => {
  if (props.disabled) {
    return -1
  }
  const enabled = ctx.entries.value.filter((tab) => !tab.disabled)
  const target =
    enabled.find((tab) => tab.name === ctx.focused.value)?.name ??
    enabled.find((tab) => tab.name === ctx.active.value)?.name ??
    enabled[0]?.name
  return name.value === target ? 0 : -1
})
function hover(event: PointerEvent) {
  if (!props.disabled && ctx.props.trigger === 'hover' && event.pointerType === 'mouse') {
    ctx.select(name.value)
  }
}
async function keydown(event: KeyboardEvent) {
  if (props.disabled) {
    return
  }
  if (event.key === 'Delete' && ctx.props.editable && props.closable) {
    event.preventDefault()
    const removedKey = name.value
    const document = button.value?.ownerDocument
    const index = ctx.entries.value.filter((tab) => !tab.disabled).findIndex((tab) => tab.name === removedKey)
    ctx.remove(removedKey, event)
    await nextTick()
    if (!ctx.entries.value.some((tab) => tab.name === removedKey)) {
      const enabled = ctx.entries.value.filter((tab) => !tab.disabled)
      const target = enabled[Math.min(index, enabled.length - 1)]
      if (target) {
        ctx.focused.value = target.name
        document?.getElementById(ctx.id(target.name, 'tab'))?.focus()
      }
    }
    return
  }
  const vertical = ctx.props.orientation === 'vertical'
  const rtl = resolveDirection(button.value, ctx.rtl.value ? 'rtl' : 'ltr') === 'rtl'
  const previous = vertical ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft'
  const next = vertical ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight'
  const enabled = ctx.entries.value.filter((tab) => !tab.disabled)
  let index = enabled.findIndex((tab) => tab.name === name.value)
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
  if (!target) {
    return
  }
  ctx.focused.value = target.name
  button.value?.ownerDocument.getElementById(ctx.id(target.name, 'tab'))?.focus()
  if (ctx.props.activationMode === 'automatic') {
    ctx.select(target.name)
  }
}
</script>
