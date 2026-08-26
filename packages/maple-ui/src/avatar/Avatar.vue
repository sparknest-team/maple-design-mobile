<template>
  <div
    ref="avatarElement"
    :class="
      classes(
        n(),
        n('$--box'),
        [isInternalSize(size), n(`--${size}`)],
        [shape === 'circle', n('--round')],
        [bordered, n('--bordered')],
        [hoverable, n('--hoverable')],
      )
    "
    :style="{
      width: !isInternalSize(size) ? toSizeUnit(size) : undefined,
      height: !isInternalSize(size) ? toSizeUnit(size) : undefined,
      borderColor,
      backgroundColor: color,
    }"
    @click="handleClick"
  >
    <template v-if="imageUrl">
      <img
        v-if="lazy"
        v-lazy="imageUrl"
        role="img"
        :class="n('image')"
        :src="imageUrl"
        :alt="alt"
        :style="{ objectFit }"
        :lazy-loading="loading"
        :lazy-error="error"
        @load="handleLoad"
      />

      <img
        v-else
        role="img"
        :class="n('image')"
        :src="imageUrl"
        :alt="alt"
        :style="{ objectFit }"
        @load="handleLoad"
        @error="handleError"
      />
    </template>

    <div v-else ref="textElement" :class="n('text')" :style="{ transform: `scale(${scale})` }">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated, ref, type Ref } from 'vue'
import { call } from '@maplejs/maple-shared'
import { onSmartMounted } from '@maplejs/maple-use'
import Lazy, { type LazyHTMLElement } from '../lazy'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { props } from './props'

const isInternalSize = (size: any) => ['mini', 'small', 'normal', 'large'].includes(size)

const { name, n, classes } = createNamespace('avatar')

export default defineComponent({
  name,
  directives: { Lazy },
  props,
  emits: ['error', 'click', 'load'],
  setup(props, { emit }) {
    const avatarElement: Ref<HTMLElement | null> = ref(null)
    const textElement: Ref<HTMLElement | null> = ref(null)
    const scale: Ref<number> = ref(1)

    onSmartMounted(getScale)
    onUpdated(getScale)

    function getScale() {
      if (!avatarElement.value || !textElement.value) {
        scale.value = 1
        return
      }

      const avatarElementWidth = avatarElement.value.offsetWidth
      const textElementWidth = textElement.value.offsetWidth

      if (avatarElementWidth > textElementWidth) {
        scale.value = 1
      } else {
        scale.value = avatarElementWidth / textElementWidth
      }
    }

    function handleLoad(e: Event) {
      const el: LazyHTMLElement = e.currentTarget as LazyHTMLElement
      const { lazy } = props

      if (lazy) {
        el._lazy.state === 'success' && emit('load', e)
        el._lazy.state === 'error' && emit('error', e)
      } else {
        emit('load', e)
      }
    }

    function handleError(e: Event) {
      emit('error', e)
    }

    function handleClick(e: Event) {
      emit('click', e)
    }

    return {
      avatarElement,
      textElement,
      scale,
      n,
      classes,
      isInternalSize,
      toSizeUnit,
      handleLoad,
      handleError,
      handleClick,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import './avatar';
</style>
