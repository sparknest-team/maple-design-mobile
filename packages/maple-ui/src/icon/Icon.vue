<template>
  <span
    :class="classes(n(), [animateInProgress, animationClass == null ? n('--shrinking') : animationClass])"
    :style="{
      color,
      'transition-duration': `${toNumber(transition)}ms`,
      fontSize: toSizeUnit(size),
    }"
    @click="emit('click', $event)"
  >
    <slot v-if="$slots.default" />
    <component :is="iconComponent" v-else />
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, nextTick, ref, watch } from 'vue'
import { pascalCase, toNumber } from '@maplejs/maple-shared'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { props } from './props'

const { name, n, classes } = createNamespace('icon')

export default defineComponent({
  name,
  props,
  emits: ['click'],
  setup(props, { emit }) {
    const instance = getCurrentInstance()
    const nextName = ref<string | undefined>('')
    const animateInProgress = ref(false)
    const iconComponent = computed(() => {
      const componentName = `Icon${pascalCase(nextName.value ?? '')}`
      return instance?.appContext.components[componentName]
    })

    watch(() => props.name, handleNameChange, { immediate: true })

    async function handleNameChange(newName?: string, oldName?: string) {
      const { transition } = props

      if (oldName == null || toNumber(transition) === 0) {
        nextName.value = newName
        return
      }

      animateInProgress.value = true

      await nextTick()

      setTimeout(() => {
        if (oldName != null) {
          nextName.value = newName
        }

        animateInProgress.value = false
      }, toNumber(transition))
    }

    return {
      nextName,
      iconComponent,
      animateInProgress,
      n,
      classes,
      toNumber,
      toSizeUnit,
      emit,
    }
  },
})
</script>
