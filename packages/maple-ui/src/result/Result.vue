<template>
  <div :class="classes(n(), n('$--box'))">
    <slot name="image">
      <div v-if="status" :class="n('image-container')">
        <div
          :class="classes(n('image'), n(status))"
          :style="{
            width: circleSize,
            height: circleSize,
            borderWidth: borderSize,
          }"
        >
          <component :is="status" :border-size="borderSize" :animation="animation" />
        </div>
      </div>
    </slot>
    <slot name="title">
      <div v-if="title" :class="n('title')">{{ title }}</div>
    </slot>
    <slot name="subtitle">
      <div v-if="subtitle" :class="n('subtitle')">{{ subtitle }}</div>
    </slot>
    <div v-if="$slots.footer" :class="n('footer')">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import Danger from './Danger.vue'
import Empty from './Empty.vue'
import Info from './Info.vue'
import { props } from './props'
import Question from './Question.vue'
import Success from './Success.vue'
import Warning from './Warning.vue'

const { name, n, classes } = createNamespace('result')

export default defineComponent({
  name,
  components: {
    Info,
    Success,
    Warning,
    Danger,
    Question,
    Empty,
  },
  props,
  setup(props) {
    const circleSize = computed(
      () => `calc(${props.imageSize ? toSizeUnit(props.imageSize) : 'var(--mp-result-image-size)'} * 0.9)`,
    )
    const borderSize = computed(
      () => `calc(${props.imageSize ? toSizeUnit(props.imageSize) : 'var(--mp-result-image-size)'} * 0.05)`,
    )

    return {
      circleSize,
      borderSize,
      n,
      classes,
    }
  },
})
</script>
