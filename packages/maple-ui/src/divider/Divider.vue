<template>
  <div
    :class="
      classes(
        n(),
        n(`--orientation-${orientation}`),
        n(`--text-align-${textAlign}`),
        n(`--type-${type}`),
        [withText(), n('--with-text')],
        [withPresetSizeX, n(`--size-x-${sizeX}`)],
        [withPresetSizeY, n(`--size-y-${sizeY}`)],
        [hairline, n('--hairline')],
      )
    "
    :style="rootStyle"
    role="separator"
    :aria-orientation="orientation"
  >
    <slot>
      <span v-if="description" :class="n('text')">{{ description }}</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, type CSSProperties } from 'vue'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { dividerProps } from './props'

defineOptions({ name: createNamespace('divider').name })
const { n, classes } = createNamespace('divider')
const props = defineProps(dividerProps)
const slots = useSlots()
const SIZE_PRESETS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const

const withText = () => Boolean(slots.default || props.description)

const withPresetSizeX = computed(() => SIZE_PRESETS.includes(props.sizeX as (typeof SIZE_PRESETS)[number]))
const withPresetSizeY = computed(() => SIZE_PRESETS.includes(props.sizeY as (typeof SIZE_PRESETS)[number]))

const rootStyle = computed(() => {
  const { sizeX, sizeY, orientation, hairline } = props
  const styles: CSSProperties & Record<string, string | number | undefined> = {}

  if (props.thickness && !hairline) {
    styles['--mp-divider-border-width'] = toSizeUnit(props.thickness)
  }
  if (props.color) {
    styles['--mp-divider-color'] = props.color
  }
  if (props.opacity != null) {
    styles['--mp-divider-opacity'] = String(props.opacity)
    styles.opacity = props.opacity
  }

  if (!withPresetSizeX.value && sizeX != null) {
    const [start, end] = resolveSizePair(sizeX)
    if (orientation === 'horizontal') {
      styles.maxWidth = `calc(100% - ${start} - ${end})`
      styles.marginInlineStart = start
      styles.marginInlineEnd = end
    } else {
      styles.marginBlockStart = start
      styles.marginBlockEnd = end
    }
  }

  if (!withPresetSizeY.value && sizeY != null) {
    const [start, end] = resolveSizePair(sizeY)
    if (orientation === 'horizontal') {
      styles.marginBlockStart = start
      styles.marginBlockEnd = end
    } else {
      styles.maxHeight = `calc(100% - ${start} - ${end})`
      styles.marginInlineStart = start
      styles.marginInlineEnd = end
    }
  }

  return styles
})

function resolveSizePair(size: number | string | Array<number | string>) {
  if (Array.isArray(size)) {
    const start = toSizeUnit(size[0]) as string
    const end = toSizeUnit(size.length > 1 ? size[1] : size[0]) as string
    return [start, end] as const
  }
  const value = toSizeUnit(size) as string
  return [value, value] as const
}
</script>
