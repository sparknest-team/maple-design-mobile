<template>
  <div
    :class="
      classes(
        n(),
        n(`--orientation-${orientationValue}`),
        n(`--text-align-${textAlignValue}`),
        n(`--type-${typeValue}`),
        [withText(), n('--with-text')],
        [withPresetInset, n(`--inset-${insetValue}`)],
        [withPresetSpacing, n(`--spacing-${spacingValue}`)],
        [hairline, n('--hairline')],
      )
    "
    :style="rootStyle"
    role="separator"
    :aria-orientation="orientationValue"
  >
    <slot>
      <span v-if="description" :class="n('text')">{{ description }}</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, type CSSProperties } from 'vue'
import { createNamespace } from '../utils/components'
import { componentSizes, orientations } from '../utils/constants'
import { toSizeUnit } from '../utils/elements'
import {
  dividerProps,
  dividerTextAligns,
  dividerTypes,
  isValidDividerOpacity,
  isValidDividerThickness,
  resolveDividerSize,
  type DividerSize,
} from './props'

defineOptions({ name: createNamespace('divider').name })
const { n, classes } = createNamespace('divider')
const props = defineProps(dividerProps)
const slots = useSlots()
const orientationValue = computed(() => (orientations.includes(props.orientation) ? props.orientation : 'horizontal'))
const textAlignValue = computed(() => (dividerTextAligns.includes(props.textAlign) ? props.textAlign : 'center'))
const typeValue = computed(() => (dividerTypes.includes(props.type) ? props.type : 'solid'))
const insetValue = computed(() => resolveDividerSize(props.inset))
const spacingValue = computed(() => resolveDividerSize(props.spacing, 'md'))

const withText = () => Boolean(slots.default || props.description)

const withPresetInset = computed(() => componentSizes.includes(insetValue.value as (typeof componentSizes)[number]))
const withPresetSpacing = computed(() => componentSizes.includes(spacingValue.value as (typeof componentSizes)[number]))

const rootStyle = computed(() => {
  const { hairline } = props
  const inset = insetValue.value,
    spacing = spacingValue.value,
    orientation = orientationValue.value
  const styles: CSSProperties & Record<string, string | number | undefined> = {}

  if (isValidDividerThickness(props.thickness) && !hairline) {
    styles['--mp-divider-border-width'] = toSizeUnit(props.thickness)
  }
  if (props.color) {
    styles['--mp-divider-color'] = props.color
  }
  if (isValidDividerOpacity(props.opacity)) {
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

function resolveSpacingPair(size: DividerSize) {
  const unit = (value: number | string) => {
    const length = typeof value === 'string' ? value.trim() : value
    return toSizeUnit(typeof length === 'string' && Number.isFinite(Number(length)) ? Number(length) : length) as string
  }
  if (Array.isArray(size)) {
    const start = unit(size[0])
    const end = unit(size[1] ?? size[0])
    return [start, end] as const
  }
  const value = unit(size)
  return [value, value] as const
}
</script>
