<template>
  <mp-tooltip v-bind="tooltipProps">
    <div
      :class="
        classes(n(), [lineClamp, n('--clamp'), n('--line')], [expandTrigger, n('--cursor')], [expanding, n('--expand')])
      "
      mp-ellipsis-cover
      :style="rootStyles"
      @click="handleClick"
    >
      <span>
        <slot />
      </span>
    </div>

    <template #content>
      <slot name="tooltip-content">
        <span v-if="tooltipProps?.content">{{ tooltipProps.content }}</span>
        <slot v-else />
      </slot>
    </template>
  </mp-tooltip>
</template>

<script lang="ts">
import { computed, defineComponent, type CSSProperties } from 'vue'
import { useVModel } from '@maplejs/maple-use'
import MpTooltip, { tooltipProps as _tooltipProps } from '../tooltip'
import { createNamespace, type ExtractPublicPropTypes } from '../utils/components'
import { props } from './props'

const { name, n, classes } = createNamespace('ellipsis')

export default defineComponent({
  name,
  components: { MpTooltip },
  props,
  emits: ['update:expand'],
  setup(props, { emit }) {
    const expanding = useVModel(props, 'expand', { emit, eventName: 'update:expand' })
    const rootStyles = computed<CSSProperties>(() => (props.lineClamp ? { '-webkit-line-clamp': props.lineClamp } : {}))
    const tooltipProps = computed<ExtractPublicPropTypes<typeof _tooltipProps>>(() => {
      if (props.tooltip === false) {
        return {
          disabled: true,
        }
      }

      if (props.tooltip === true) {
        return {
          sameWidth: true,
        }
      }

      return { sameWidth: true, ...props.tooltip }
    })

    function handleClick() {
      if (!props.expandTrigger) {
        return
      }

      expanding.value = !expanding.value
    }

    return {
      tooltipProps,
      expanding,
      rootStyles,
      n,
      classes,
      handleClick,
    }
  },
})
</script>
