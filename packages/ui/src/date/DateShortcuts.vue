<template>
  <div :class="classes(n(), n(`--${position}`))">
    <Button
      v-for="(shortcut, index) in shortcuts"
      :key="index"
      variant="text"
      :disabled="blocked || shortcut.disabled"
      @click="emit('choose', shortcut)"
      @mouseenter="emit('preview', shortcut)"
      @mouseleave="emit('preview')"
      @focus="emit('preview', shortcut)"
      @blur="emit('preview')"
    >
      <component :is="shortcut.label" v-if="typeof shortcut.label === 'function'" />
      <template v-else>{{ shortcut.label }}</template>
    </Button>
  </div>
</template>
<script setup lang="ts">
import ButtonComponent from '../button/base'
import type { WithNativeListeners } from '../_utils/native-listener-types'
import { createNamespace } from '../utils/components'
import type { DateShortcut, DateShortcutsPosition } from './panel-tools-props'

const Button = ButtonComponent as WithNativeListeners<
  typeof ButtonComponent,
  'onBlur' | 'onFocus' | 'onMouseenter' | 'onMouseleave'
>

defineOptions({ name: createNamespace('date-shortcuts').name })
const { n, classes } = createNamespace('date-shortcuts')
defineProps<{ shortcuts: DateShortcut[]; position: DateShortcutsPosition; blocked: boolean }>()
const emit = defineEmits<{ choose: [shortcut: DateShortcut]; preview: [shortcut?: DateShortcut] }>()
</script>
