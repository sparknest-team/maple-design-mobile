<template>
  <div :class="n('toolbar')" data-image-preview-toolbar>
    <PreviewAction
      v-for="action in resultActions"
      :key="action.key"
      :name="action.name"
      :disabled="action.disabled"
      @click="action.onClick"
    >
      <component :is="action.content" />
    </PreviewAction>
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type Component, type PropType } from 'vue'
import { createNamespace } from '../utils/components'
import PreviewAction from './ImagePreviewAction.vue'

export interface ActionType {
  key: string
  name: string
  content: Component
  onClick: () => void
  disabled?: boolean
}

const { n } = createNamespace('image-preview')

export default defineComponent({
  name: createNamespace('image-preview-toolbar').name,
  components: { PreviewAction },
  props: {
    actions: { type: Array as PropType<ActionType[]>, default: () => [] },
    actionsLayout: { type: Array as PropType<string[]>, default: () => [] },
  },
  setup(props) {
    const resultActions = computed(() => {
      const layout = new Set(props.actionsLayout)
      return props.actions
        .filter((item) => layout.has(item.key))
        .sort((pre, cur) => props.actionsLayout.indexOf(pre.key) - props.actionsLayout.indexOf(cur.key))
    })
    return { n, resultActions }
  },
})
</script>
