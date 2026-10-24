<template>
  <div
    ref="card"
    v-ripple="{ disabled: !ripple || floater }"
    :class="
      classes(
        n(),
        [isRow, n('--direction-row')],
        [direction === 'row-reverse', n('--direction-row-reverse')],
        n(`--size-${mergedSize}`),
        n(`--variant-${variant}`),
        [hoverable, n('--hoverable')],

        [variant === 'default', formatElevation(elevation, 1)],
      )
    "
    :style="{
      zIndex: floated ? zIndex : undefined,
    }"
    @click="handleClick"
  >
    <div
      ref="cardFloater"
      :class="n('floater')"
      :style="{
        width: floaterWidth,
        height: floaterHeight,
        top: floaterTop,
        left: floaterLeft,
        overflow: floaterOverflow,
        position: floaterPosition,
        zIndex: floated ? zIndex : undefined,
        background: variant === 'outline' && !floated ? 'transparent' : undefined,
        transition: floated
          ? `background-color ${floatingDuration}ms, color ${floatingDuration}ms, width ${floatingDuration}ms, height ${floatingDuration}ms, top ${floatingDuration}ms, left ${floatingDuration}ms`
          : undefined,
      }"
    >
      <slot name="cover">
        <img
          v-if="src"
          :class="n('image')"
          :style="{
            objectFit: fit,
            height: toSizeUnit(imageHeight),
            width: toSizeUnit(imageWidth),
          }"
          :src="src"
          :alt="alt"
        />
      </slot>

      <div :class="n('container')">
        <slot name="header">
          <div v-if="title || $slots.title || $slots['title-action']" :class="n('title')" :style="titleStyle">
            <slot name="title" :slot-class="n('title-text')">
              <span v-if="title" :class="n('title-text')">{{ title }}</span>
            </slot>
            <span v-if="$slots['title-action']" :class="n('title-action')"><slot name="title-action" /></span>
          </div>
          <slot name="subtitle" :slot-class="n('subtitle')">
            <div v-if="subtitle" :class="n('subtitle')">{{ subtitle }}</div>
          </slot>
        </slot>
        <BaseDivider v-if="topDivider" :class="n('divider')" />
        <div v-if="$slots.default" :class="n('content')">
          <slot />
        </div>
        <slot name="description" :slot-class="n('description')">
          <div v-if="description" :class="n('description')">{{ description }}</div>
        </slot>
        <BaseDivider v-if="bottomDivider" :class="n('divider')" />
        <div v-if="$slots.footer" :class="n('footer')">
          <slot name="footer" />
        </div>
        <div
          v-if="$slots['floating-content'] && !isRow"
          :class="n('floating-content')"
          :style="{
            height: contentHeight,
            opacity,
            transition: `opacity ${floatingDuration * 2}ms`,
          }"
        >
          <slot name="floating-content" />
        </div>
      </div>

      <div
        v-if="showFloatingButtons"
        :class="classes(n('floating-buttons'), n('$--box'))"
        :style="{
          zIndex,
          opacity,
          transition: `opacity ${floatingDuration * 2}ms`,
        }"
      >
        <slot name="close-button">
          <BaseButton
            data-card-cover
            :class="classes(n('close-button'), n('$-elevation--6'))"
            aria-label="Close"
            @click.stop="close"
          >
            <BaseIcon data-card-cover :class="n('close-button-icon')"><MIconClose /></BaseIcon>
          </BaseButton>
        </slot>
      </div>
    </div>

    <div
      :class="n('holder')"
      :style="{
        width: holderWidth,
        height: holderHeight,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onActivated, onBeforeUnmount, onDeactivated, ref, shallowRef, watch } from 'vue'
import { IconClose as MIconClose } from '@maple-design/icons-vue'
import { doubleRaf, getRect } from '@maple-design/shared'
import BaseButton from '../button'
import { useLock } from '../context/lock'
import { useZIndex } from '../context/zIndex'
import BaseDivider from '../divider'
import BaseIcon from '../icon'
import vRipple from '../ripple'
import { createNamespace, formatElevation } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { useCardSize } from './platform'
import { cardProps } from './props'

defineOptions({ name: createNamespace('card').name })
const { n, classes } = createNamespace('card')
const props = defineProps(cardProps)
const emit = defineEmits<{ click: [event: Event]; 'update:floating': [value: boolean] }>()
const mergedSize = useCardSize(() => props.size)
const RIPPLE_DELAY = 500
const card = ref<null | HTMLElement>(null)
const cardFloater = ref<null | HTMLElement>(null)
const holderWidth = ref('auto')
const holderHeight = ref('auto')
const floaterWidth = ref('100%')
const floaterHeight = ref('100%')
const floaterTop = ref('auto')
const floaterLeft = ref('auto')
const floaterPosition = ref<'static' | 'absolute' | 'fixed' | 'relative' | 'sticky' | undefined>(undefined)
const floaterOverflow = ref('hidden')
const contentHeight = ref('0px')
const opacity = ref('0')
const isRow = computed(() => props.direction !== 'column')
const showFloatingButtons = ref(false)
const floated = ref(false)
const { zIndex } = useZIndex(() => props.floating && !isRow.value, 1)

let generation = 0
let active = true
let disposed = false
let dropdownFloaterTop = 'auto'
let dropdownFloaterLeft = 'auto'
let dropper: ReturnType<typeof setTimeout> | undefined
const floater = shallowRef<ReturnType<typeof setTimeout> | null>(null)

useLock(
  () => props.floating,
  () => !isRow.value,
)

const wantsFloating = () => props.floating && !isRow.value
const available = () => active && !disposed
function current(token: number, element: HTMLElement | null) {
  return available() && token === generation && card.value === element
}

watch(
  wantsFloating,
  (value) => {
    const token = ++generation
    let consumed = false
    nextTick(() => {
      if (!available() || token !== generation || consumed || value !== wantsFloating()) {
        return
      }
      consumed = true
      if (value) {
        floating()
      } else if (floater.value !== null || floated.value || floaterPosition.value !== undefined) {
        dropdown()
      }
    })
  },
  { immediate: true, flush: 'sync' },
)

function floating() {
  if (!available() || !wantsFloating()) {
    return
  }
  const token = ++generation
  const element = card.value
  let consumed = false
  clearTimeout(floater.value ?? undefined)
  clearTimeout(dropper)
  dropper = undefined
  floater.value = setTimeout(
    async () => {
      if (!element || !current(token, element) || !wantsFloating() || consumed) {
        return
      }
      consumed = true
      const { width, height, left, top } = getRect(element)
      // Measurement can invoke application-provided geometry hooks.
      if (!current(token, element) || !wantsFloating()) {
        return
      }
      holderWidth.value = toSizeUnit(width)!
      holderHeight.value = toSizeUnit(height)!
      floaterWidth.value = holderWidth.value
      floaterHeight.value = holderHeight.value
      floaterTop.value = toSizeUnit(top)!
      floaterLeft.value = toSizeUnit(left)!
      floaterPosition.value = 'fixed'
      dropdownFloaterTop = floaterTop.value
      dropdownFloaterLeft = floaterLeft.value
      showFloatingButtons.value = true

      // The existing non-abortable helper still settles; only this continuation
      // owns permission to expand. It is not a CSS animation-duration timer.
      await doubleRaf()
      if (!current(token, element) || !wantsFloating()) {
        return
      }
      floaterTop.value = '0'
      floaterLeft.value = '0'
      floaterWidth.value = '100vw'
      floaterHeight.value = '100vh'
      contentHeight.value = 'auto'
      opacity.value = '1'
      floaterOverflow.value = 'auto'
      floated.value = true
    },
    props.ripple ? RIPPLE_DELAY : 0,
  )
}

function dropdown() {
  if (!available() || wantsFloating()) {
    return
  }
  const token = ++generation
  const element = card.value
  let consumed = false
  clearTimeout(dropper)
  clearTimeout(floater.value ?? undefined)
  floater.value = null
  floaterWidth.value = holderWidth.value
  floaterHeight.value = holderHeight.value
  floaterTop.value = dropdownFloaterTop
  floaterLeft.value = dropdownFloaterLeft
  contentHeight.value = '0px'
  opacity.value = '0'
  showFloatingButtons.value = false
  dropper = setTimeout(() => {
    if (!current(token, element) || wantsFloating() || consumed) {
      return
    }
    consumed = true
    dropper = undefined
    holderWidth.value = 'auto'
    holderHeight.value = 'auto'
    floaterWidth.value = '100%'
    floaterHeight.value = '100%'
    floaterTop.value = 'auto'
    floaterLeft.value = 'auto'
    dropdownFloaterTop = 'auto'
    dropdownFloaterLeft = 'auto'
    floaterOverflow.value = 'hidden'
    floaterPosition.value = undefined
    floated.value = false
  }, props.floatingDuration)
}
function close() {
  if (available()) {
    emit('update:floating', false)
  }
}
function handleClick(e: Event) {
  if (available()) {
    emit('click', e)
  }
}
onBeforeUnmount(() => {
  disposed = true
  cleanup()
})
onDeactivated(cleanup)
onActivated(() => {
  if (disposed || active) {
    return
  }
  active = true
  if (wantsFloating()) {
    floating()
  } else if (floaterPosition.value !== undefined || floated.value) {
    dropdown()
  }
})
function cleanup() {
  active = false
  generation++
  clearTimeout(floater.value ?? undefined)
  clearTimeout(dropper)
  floater.value = null
  dropper = undefined
}
</script>
