<template>
  <li v-ripple="{ disabled }" :class="cls" @click="handleClick">
    <slot>
      <mp-icon><MIconDotsVertical :rotate="90" /></mp-icon>
    </slot>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IconDotsVertical as MIconDotsVertical } from '@maplejs/icons-vue'
import MpIcon from '../icon'
import Ripple from '../ripple'
import { createNamespace, formatElevation } from '../utils/components'
import { getLegalPage } from './utils'

const { n, classes } = createNamespace('pagination')

export default defineComponent({
  name: createNamespace('pagination-item-ellipsis').name,
  components: {
    MIconDotsVertical,
    MpIcon,
  },
  directives: { Ripple },
  props: {
    current: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      default: 5,
    },
    pages: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    elevation: {
      type: [Boolean, Number, String],
      default: true,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const nextPage = computed(() =>
      getLegalPage(props.current + props.step, {
        min: 1,
        max: props.pages,
      }),
    )

    const handleClick = () => {
      if (!props.disabled) {
        emit('click', nextPage.value)
      }
    }

    const cls = computed(() =>
      classes(n('item'), n('item-ellipsis'), formatElevation(props.elevation, 2), [
        props.disabled,
        n('item--disabled'),
      ]),
    )

    return {
      cls,
      handleClick,
    }
  },
})
</script>
