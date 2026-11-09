<template>
  <div :class="classes(n(), formatElevation(elevation, 1), n('$--box'))" :aria-busy="mergedLoading || undefined">
    <Loading v-if="mergedLoading" v-bind="typeof loading === 'object' ? loading : {}" />
    <div
      ref="viewport"
      tabindex="0"
      role="region"
      :aria-label="regionLabel"
      :class="n('main')"
      :style="{ 'max-height': toSizeUnit(scrollerHeight) }"
      @scroll="onScroll"
      @keydown="onKeydown"
    >
      <table :class="n('table')" :style="{ width: toSizeUnit(fullWidth) }">
        <slot />
      </table>
    </div>
    <div v-if="$slots.footer" :class="n('footer')">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { inlineScrollLeft, setInlineScrollLeft, useDirection } from '../_utils/direction'
import Loading from '../loading/Loading.vue'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import { createNamespace, formatElevation } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { props } from './props'

const { name, n, classes } = createNamespace('table')

export default defineComponent({
  name,
  props,
  components: { Loading },
  setup(props) {
    const { t: translate } = injectLocaleProvider()
    const regionLabel = computed(() =>
      String(translate?.('table.scrollable') ?? t('table.scrollable') ?? 'Scrollable table'),
    )
    const mergedLoading = computed(() =>
      typeof props.loading === 'object' && props.loading ? Boolean(props.loading.loading) : Boolean(props.loading),
    )
    const viewport = ref<HTMLElement>()
    const { dir } = useDirection(() => viewport.value)
    let readingOffset = 0
    const onScroll = () => {
      if (viewport.value) {
        readingOffset = inlineScrollLeft(viewport.value)
      }
    }
    watch(
      dir,
      () => {
        if (viewport.value) {
          setInlineScrollLeft(viewport.value, readingOffset)
        }
      },
      { flush: 'post' },
    )
    const onKeydown = (event: KeyboardEvent) => {
      if (
        event.target !== event.currentTarget ||
        !viewport.value ||
        !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)
      ) {
        return
      }
      const element = viewport.value
      const max = Math.max(0, element.scrollWidth - element.clientWidth)
      if (!max) {
        return
      }
      event.preventDefault()
      const grow = dir.value === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
      setInlineScrollLeft(
        element,
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? max
            : inlineScrollLeft(element) + (event.key === grow ? 40 : -40),
      )
    }
    return { mergedLoading, viewport, onScroll, onKeydown, toSizeUnit, n, classes, formatElevation, regionLabel }
  },
})
</script>
