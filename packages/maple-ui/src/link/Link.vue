<template>
  <a
    v-bind="$attrs"
    :href="blocked ? undefined : href"
    :target="blocked ? undefined : target"
    :rel="blocked ? undefined : rel"
    :class="
      classes(
        n(),
        n('--size-' + size),
        n('--status-' + status),
        n('--underline-' + underline),
        [disabled, n('--disabled')],
        [loading, n('--loading')],
        [!hoverable, n('--hoverless')],
      )
    "
    :aria-disabled="blocked || undefined"
    :aria-busy="loading || undefined"
    :tabindex="blocked ? -1 : ($attrs.tabindex as number | string | undefined)"
    @click="handleClick"
  >
    <span v-if="loading || icon || $slots.icon" :class="n('icon')" aria-hidden="true">
      <icon-loading v-if="loading" :class="n('spinner')" />
      <slot v-else name="icon"><icon-link /></slot>
    </span>
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '../utils/components'
import { IconLink, IconLoading } from './platform'
import { linkProps } from './props'

defineOptions({ name: createNamespace('link').name, inheritAttrs: false })
const props = defineProps(linkProps)
const emit = defineEmits<{ click: [event: MouseEvent] }>()
const { n, classes } = createNamespace('link')
const blocked = computed(() => props.disabled || props.loading)

function handleClick(event: MouseEvent) {
  if (blocked.value) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>
