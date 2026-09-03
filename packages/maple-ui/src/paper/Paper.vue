<template>
  <div
    v-ripple="{ disabled: !ripple }"
    :class="
      classes(
        n(),
        n('$--box'),
        formatElevation(elevation, 2),
        [n('--cursor')],
        [round, n('--round')],
        [inline, n('$--inline-flex')],
      )
    "
    :style="{
      width: toSizeUnit(width),
      height: toSizeUnit(height),
      'border-radius': toSizeUnit(radius),
    }"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { call } from '@maplejs/maple-shared'
import Ripple from '../ripple'
import { createNamespace, formatElevation } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { props } from './props'

const { name, n, classes } = createNamespace('paper')

export default defineComponent({
  name,
  directives: { Ripple },
  props,
  emits: ['click'],
  setup(props, { emit }) {
    function handleClick(e: Event) {
      emit('click', e)
    }

    return {
      n,
      classes,
      formatElevation,
      toSizeUnit,
      handleClick,
    }
  },
})
</script>
