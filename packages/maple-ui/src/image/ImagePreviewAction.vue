<template>
  <button
    type="button"
    v-bind="$attrs"
    :class="[n(), { [n('--disabled')]: disabled }]"
    :title="name"
    :disabled="disabled"
    data-image-preview-interactive
    @mousedown.prevent
  >
    <span :class="n('content')"><slot /></span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace } from '../utils/components'

const { name, n } = createNamespace('image-preview-toolbar-action')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    name: String,
    disabled: Boolean,
  },
  setup() {
    return { n }
  },
})
</script>
