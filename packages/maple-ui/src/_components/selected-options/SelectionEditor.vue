<template>
  <div :class="classes(n(), n(`--${kind}`), [mobile, n('--mobile'), n('--desktop')])"><slot /></div>
</template>
<script setup lang="ts">
import { provide } from 'vue'
import { createNamespace } from '../../utils/components'
import { selectionEditorSurface } from './context'
import { mobile } from './platform'

defineOptions({ name: createNamespace('selection-editor').name })
defineProps<{ kind: 'select' | 'cascader' | 'auto-complete' | 'tree-select' | 'people-select' }>()
const { n, classes } = createNamespace('selection-editor')
provide(selectionEditorSurface, { mobile })
</script>
