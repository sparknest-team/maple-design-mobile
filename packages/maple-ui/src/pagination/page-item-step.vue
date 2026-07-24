<template>
  <component :is="simple ? 'span' : 'li'" v-ripple="{ disabled: mergedDisabled }" :class="cls" @click="handleClick">
    <slot :type="isNext ? 'next' : 'previous'">
      <mp-icon :name="isNext ? 'chevron-right' : 'chevron-left'" />
    </slot>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import MpIcon from '../icon'
import Ripple from '../ripple'
import { createNamespace, formatElevation } from '../utils/components'
import { getLegalPage } from './utils'

const { n, classes } = createNamespace('pagination')

export default defineComponent({
  name: 'MpPaginationItemStep',
  components: { MpIcon },
  directives: { Ripple },
  props: {
    pages: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    simple: {
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
    const isNext = props.type === 'next'

    const mergedDisabled = computed(() => {
      if (props.disabled) {
        return true
      }
      if (!props.pages) {
        return true
      }
      if (isNext && props.current === props.pages) {
        return true
      }
      return !isNext && props.current <= 1
    })

    const nextPage = computed(() =>
      getLegalPage(props.current + (isNext ? 1 : -1), {
        min: 1,
        max: props.pages,
      }),
    )

    const handleClick = () => {
      if (!mergedDisabled.value) {
        emit('click', nextPage.value)
      }
    }

    const cls = computed(() =>
      classes(
        n('item'),
        isNext ? n('next') : n('prev'),
        [mergedDisabled.value, n('item--disabled')],
        [props.simple, n('item--simple'), formatElevation(props.elevation, 2)],
      ),
    )

    return {
      cls,
      isNext,
      mergedDisabled,
      handleClick,
    }
  },
})
</script>
