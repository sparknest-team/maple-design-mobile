<template>
  <component
    :is="tag"
    v-bind="linkProps"
    :class="
      classes(
        n(),
        n('$--box'),
        n('$--inline-flex'),
        n(`--${status}`),
        [underline !== 'none', n(`--underline-${underline}`)],
        [disabled || loading, n('--disabled')],
        [loading, n('--loading')],
        [isFocusing && !inMobile(), n('--focusing')],
      )
    "
    :aria-disabled="disabled || loading || undefined"
    :aria-busy="loading || undefined"
    :tabindex="disabled || loading ? -1 : undefined"
    @click="handleClick"
    @focus="isFocusing = true"
    @blur="isFocusing = false"
  >
    <span v-if="loading || showIcon" :class="n('icon')" aria-hidden="true">
      <MIconLoading v-if="loading" />
      <slot v-else name="icon"><MIconLink /></slot>
    </span>
    <slot />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { IconLink as MIconLink, IconLoading as MIconLoading } from '@maplejs/icons-vue'
import { inMobile } from '@maplejs/maple-shared'
import { createNamespace } from '../utils/components'
import { props } from './props'

const { name, n, classes } = createNamespace('link')

export default defineComponent({
  name,
  components: {
    MIconLoading,
    MIconLink,
  },
  props,
  emits: ['click'],
  setup(props, { emit, slots }) {
    const isFocusing = ref(false)
    const tag = 'a'
    const linkProps = computed(() => {
      const { disabled, loading, href, target, rel } = props

      if (disabled || loading) {
        return {}
      }

      if (href) {
        return { href, target, rel }
      }

      return {}
    })

    function handleClick(e: Event) {
      if (props.disabled || props.loading) {
        e.preventDefault()
        return
      }

      emit('click', e)
    }

    return {
      tag,
      linkProps,
      showIcon: computed(() => props.icon || Boolean(slots.icon)),
      isFocusing,
      inMobile,
      n,
      classes,
      handleClick,
    }
  },
})
</script>
