<template>
  <div
    :class="
      classes(
        n(),
        n(`--orientation-${orientation}`),
        n(`--text-align-${textAlign}`),
        n(`--type-${type}`),
        [withText(), n('--with-text')],
        [withPresetInset, n(`--inset-${inset}`)],
        [withPresetSpacing, n(`--spacing-${spacing}`)],
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
const SIZE_PRESETS = ['xs', 'sm', 'md', 'lg', 'xl'] as const

const withText = () => Boolean(slots.default || props.description)

const withPresetInset = computed(() => SIZE_PRESETS.includes(props.inset as (typeof SIZE_PRESETS)[number]))
const withPresetSpacing = computed(() => SIZE_PRESETS.includes(props.spacing as (typeof SIZE_PRESETS)[number]))

const rootStyle = computed(() => {
  const { inset, spacing, orientation, hairline } = props
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

  if (!withPresetInset.value && inset != null) {
    const [start, end] = resolveSpacingPair(inset)
    if (orientation === 'horizontal') {
      styles.maxWidth = `calc(100% - ${start} - ${end})`
      styles.marginInlineStart = start
      styles.marginInlineEnd = end
    } else {
      styles.maxHeight = `calc(100% - ${start} - ${end})`
      styles.marginBlockStart = start
      styles.marginBlockEnd = end
    }
  }

  if (!withPresetSpacing.value && spacing != null) {
    const [start, end] = resolveSpacingPair(spacing)
    if (orientation === 'horizontal') {
      styles.marginBlockStart = start
      styles.marginBlockEnd = end
    } else {
      styles.marginInlineStart = start
      styles.marginInlineEnd = end
    }
  }

  return styles
})

function resolveSpacingPair(size: number | string | Array<number | string>) {
  if (Array.isArray(size)) {
    const start = toSizeUnit(size[0]) as string
    const end = toSizeUnit(size.length > 1 ? size[1] : size[0]) as string
    return [start, end] as const
  }
  const value = toSizeUnit(size) as string
  return [value, value] as const
}
</script>
