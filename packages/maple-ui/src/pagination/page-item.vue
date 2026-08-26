<template>
  <li v-ripple="{ disabled }" :class="cls" :style="mergedStyle" @click="handleClick">
    <slot :page="pageNumber">
      {{ pageNumber }}
    </slot>
  </li>
</template>

<script lang="ts">
import type { CSSProperties, PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import Ripple from '../ripple'
import { createNamespace, formatElevation } from '../utils/components'

const { n, classes } = createNamespace('pagination')

export default defineComponent({
  name: createNamespace('pagination-item').name,
  directives: { Ripple },
  props: {
    pageNumber: Number,
    current: Number,
    disabled: {
      type: Boolean,
      default: false,
    },
    style: Object as PropType<CSSProperties>,
    activeStyle: Object as PropType<CSSProperties>,
    elevation: {
      type: [Boolean, Number, String],
      default: true,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const isActive = computed(() => props.current === props.pageNumber)

    const handleClick = () => {
      if (!props.disabled) {
        emit('click', props.pageNumber)
      }
    }

    const cls = computed(() =>
      classes(
        n('item'),
        formatElevation(props.elevation, 2),
        [isActive.value && !props.disabled, n('item--active')],
        [props.disabled, n('item--disabled')],
        [isActive.value && props.disabled, n('item--disabled--active')],
      ),
    )

    const mergedStyle = computed(() => (isActive.value ? props.activeStyle : props.style))

    return {
      cls,
      mergedStyle,
      handleClick,
    }
  },
})
</script>
