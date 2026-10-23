<template>
  <div
    v-ripple="{ disabled: !ripple }"
    :class="classes(n(), [border, n('--border')], n('--cursor'))"
    :style="borderOffsetStyles"
    @click="handleClick"
  >
    <div v-if="icon || $slots.icon" :class="classes(n('icon'), iconClass)">
      <slot name="icon">
        <mp-registered-icon :name="icon" />
      </slot>
    </div>

    <div :class="n('content')">
      <slot>
        <div v-if="title" :class="classes(n('title'), titleClass)">
          {{ title }}
        </div>
      </slot>

      <slot name="description">
        <div v-if="description" :class="classes(n('description'), descriptionClass)">
          {{ description }}
        </div>
      </slot>
    </div>

    <div v-if="$slots.extra" :class="classes(n('extra'), extraClass)">
      <slot name="extra" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent } from 'vue'
import MpRegisteredIcon from '../icon/RegisteredIcon.vue'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { props } from './props'

const { name, n, classes } = createNamespace('cell')

export default defineComponent({
  name,
  components: { MpRegisteredIcon },
  directives: { Ripple },
  props,
  emits: ['click'],
  setup(props, { emit }) {
    const borderOffsetStyles = computed<CSSProperties>(() => {
      if (props.borderOffset == null) {
        return {}
      }

      return {
        '--mp-cell-border-left': toSizeUnit(props.borderOffset),
        '--mp-cell-border-right': toSizeUnit(props.borderOffset),
      }
    })

    function handleClick(e: Event) {
      emit('click', e)
    }

    return {
      borderOffsetStyles,
      n,
      classes,
      toSizeUnit,
      handleClick,
    }
  },
})
</script>
