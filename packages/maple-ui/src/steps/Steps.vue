<template>
  <div
    :class="classes(n(), [changeable, n('--changeable')])"
    :style="{ flexDirection: direction === 'horizontal' ? 'row' : 'column' }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { call } from '@maplejs/maple-shared'
import { createNamespace } from '../utils/components'
import { props, type StepStatus } from './props'
import { useStep, type StepsProvider } from './provide'

const { name, n, classes } = createNamespace('steps')

export default defineComponent({
  name,
  props,
  emits: ['change', 'update:current'],
  setup(props, { emit }) {
    const _current = ref(props.defaultCurrent)
    const current = computed(() => props.current ?? _current.value)
    const direction = computed(() => props.direction)
    const status = computed(() => props.status)
    const changeable = computed(() => props.changeable)
    const { bindStep } = useStep()

    function getStatus(step: number): StepStatus {
      if (step < current.value) {
        return 'finish'
      }
      if (step > current.value) {
        return 'wait'
      }
      return props.status
    }

    function clickStep(step: number, e: Event) {
      if (!props.changeable) {
        return
      }
      _current.value = step
      emit('update:current', step)
      emit('change', step, e)
    }

    const stepsProvider: StepsProvider = {
      current,
      direction,
      status,
      changeable,
      getStatus,
      clickStep,
    }

    bindStep(stepsProvider)

    return { n, classes, direction, changeable }
  },
})
</script>
