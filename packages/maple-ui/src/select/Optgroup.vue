<template>
  <li :class="`${prefixCls}-title`">
    <slot name="label">
      {{ label }}
    </slot>
  </li>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace, getPrefixCls } from '../utils/components'

const { name, n, classes } = createNamespace('optgroup')
export default defineComponent({
  name,
  props: {
    /**
     * @zh 选项组的标题
     * @en Title of option group
     */
    label: {
      type: String,
    },
  },
  /**
   * @zh 选项组的标题
   * @en Title of option group
   * @slot label
   * @version 2.10.0
   */
  setup() {
    const prefixCls = getPrefixCls('select-group')

    return {
      prefixCls,
    }
  },
})
</script>
