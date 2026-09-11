<template>
  <div
    ref="itemRef"
    :class="
      classes(
        n(),
        n(`--${mergedShape}`),
        [props.bordered, n('--bordered')],
        [props.hoverable, n('--hoverable')],
        [hasTriggerIcon, n('--with-trigger')],
      )
    "
    :style="outerStyle"
    @click="handleClick"
  >
    <span ref="contentRef" :class="n(showImage ? 'image' : 'text')" :style="contentStyle">
      <template v-if="props.imageUrl">
        <slot v-if="hasError" name="error">
          <img v-if="props.error" :src="props.error" role="img" :alt="props.alt" :style="imageStyle" />
          <span v-else :class="n('image-icon')"><ImageErrorIcon /></span>
        </slot>
        <template v-else>
          <img
            v-show="isLoaded || props.lazy"
            :src="props.imageUrl"
            role="img"
            :alt="props.alt"
            :loading="props.lazy ? 'lazy' : undefined"
            :style="imageStyle"
            @load="handleLoad"
            @error="handleError"
          />
          <template v-if="!isLoaded">
            <img v-if="props.loading" :src="props.loading" role="img" :alt="props.alt" :style="imageStyle" />
            <span v-else :class="n('image-icon')">
              <slot><ImageLoadingIcon /></slot>
            </span>
          </template>
        </template>
      </template>
      <slot v-else />
    </span>
    <span v-if="hasTriggerIcon" :class="n(`trigger-icon-${props.triggerType}`)" :style="mergedTriggerIconStyle">
      <slot name="trigger-icon" />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, nextTick, onMounted, ref, useSlots, watch, type CSSProperties } from 'vue'
import { createNamespace } from '../utils/components'
import { avatarGroupInjectionKey } from './context'
import { ImageErrorIcon, ImageLoadingIcon, toSizeUnit, useElementResize } from './platform'
import { avatarProps } from './props'

defineOptions({ name: createNamespace('avatar').name })

const props = defineProps(avatarProps)
const emit = defineEmits<{
  click: [event: MouseEvent]
  load: []
  error: []
}>()
const slots = useSlots()
const { n, classes } = createNamespace('avatar')
const group = inject(avatarGroupInjectionKey, undefined)
const itemRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const scale = ref(1)
const isLoaded = ref(false)
const hasError = ref(false)
const slottedImage = ref(false)

const mergedShape = computed(() => group?.shape.value ?? props.shape)
const mergedSize = computed(() => group?.size.value ?? props.size)
const mergedAutoFixFontSize = computed(() => group?.autoFixFontSize.value ?? props.autoFixFontSize)
const hasTriggerIcon = computed(() => Boolean(slots['trigger-icon']))
const showImage = computed(() => Boolean(props.imageUrl) || slottedImage.value)

const outerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  const size = mergedSize.value
  if (size != null && size !== '') {
    const unit = toSizeUnit(size)
    style.width = unit
    style.height = unit
    if (typeof size === 'number' || /^-?\d+(\.\d+)?$/.test(String(size))) {
      style.fontSize = `${Number(size) / 2}px`
    }
  }
  if (props.color) {
    style.backgroundColor = props.color
  }
  if (props.borderColor) {
    style.borderColor = props.borderColor
  }
  return style
})

const imageStyle = computed<CSSProperties>(() => ({ objectFit: props.objectFit }))
const contentStyle = computed<CSSProperties>(() =>
  showImage.value || scale.value === 1 ? {} : { transform: `scale(${scale.value})` },
)

const mergedTriggerIconStyle = computed<CSSProperties>(() => {
  const style = { ...(props.triggerIconStyle ?? {}) }
  if (props.triggerType === 'button' && !style.color && props.color) {
    style.color = props.color
  }
  return style
})

function resetImage() {
  isLoaded.value = false
  hasError.value = false
}

function updateScale() {
  if (!mergedAutoFixFontSize.value || showImage.value) {
    scale.value = 1
    return
  }
  nextTick(() => {
    const avatarWidth = itemRef.value?.offsetWidth ?? 0
    const contentWidth = contentRef.value?.scrollWidth ?? 0
    scale.value = avatarWidth && contentWidth > avatarWidth ? avatarWidth / (contentWidth + 8) : 1
  })
}

function handleClick(event: MouseEvent) {
  emit('click', event)
}

function handleLoad() {
  isLoaded.value = true
  hasError.value = false
  emit('load')
}

function handleError() {
  hasError.value = true
  emit('error')
}

function detectSlottedImage() {
  const child = contentRef.value?.firstElementChild
  slottedImage.value = Boolean(child && ['IMG', 'PICTURE'].includes(child.tagName))
}

watch(
  () => props.imageUrl,
  () => {
    resetImage()
    updateScale()
  },
)
watch([mergedSize, mergedAutoFixFontSize], updateScale)
useElementResize(
  () => [itemRef.value],
  () => mergedAutoFixFontSize.value && !showImage.value,
  () => updateScale(),
)
onMounted(() => {
  detectSlottedImage()
  updateScale()
})
</script>
