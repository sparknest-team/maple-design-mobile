<template>
  <div
    :class="
      classes(n(), n('$--box'), n(`--${variant}`), [size !== 'md', n(`--size-${size}`)], [disabled, n('--disabled')])
    "
    @click="handleClick"
  >
    <div
      :class="
        classes(
          n('controller'),
          [isFocusing, n('--focus')],
          [isError, n('--error')],
          [formDisabled || disabled, n('--disabled')],
        )
      "
      :style="{
        color,
        cursor,
        overflow: isFloating ? 'visible' : 'hidden',
        '--mp-field-middle-offset-left': middleOffsetLeft,
        '--mp-field-middle-offset-width': middleOffsetWidth,
        '--mp-field-middle-offset-height': middleOffsetHeight,
      }"
    >
      <div :class="classes(n('icon'), [!hint, n('--icon-non-hint')])">
        <slot name="prefix" />
      </div>

      <div ref="middleEl" :class="classes(n('middle'), [!hint, n('--middle-non-hint')])">
        <slot />
      </div>

      <label
        v-if="placeholder && hint"
        :class="
          classes(
            n('placeholder'),
            n('$--ellipsis'),
            [isFocusing, n('--focus')],
            [hintCenter, n('--hint-center')],
            [formDisabled || disabled, n('--disabled')],
            [isError, n('--error')],
            [transitionDisabled, n('--transition-disabled')],
            computePlaceholderState(),
          )
        "
        :style="{
          color,
        }"
        :for="id"
      >
        <span>{{ placeholder }}</span>
      </label>

      <div :class="classes(n('icon'), [!hint, n('--icon-non-hint')])">
        <slot v-if="clearable && !isEmpty(value)" name="clear-icon" :clear="handleClear">
          <mp-icon :class="n('clear-icon')" mp-field-decorator-cover @click="handleClear"
            ><MIconCloseCircleFill
          /></mp-icon>
        </slot>
        <slot name="suffix" />
      </div>
    </div>

    <template v-if="line">
      <fieldset
        v-if="variant === 'outlined' || variant === 'filled'"
        :class="classes(n('line'), [isError, n('--line-error')], [formDisabled || disabled, n('--line-disabled')])"
      >
        <legend
          :class="classes(n('line-legend'), [isFloating, n('line-legend--hint')])"
          :style="{ width: legendWidth }"
        >
          <teleport v-if="placeholder && hint" to="body">
            <span ref="placeholderTextEl" :class="classes(n('placeholder-text'), n('$--ellipsis'))">{{
              placeholder
            }}</span>
          </teleport>
        </legend>
      </fieldset>
      <fieldset
        v-if="variant === 'outlined' || variant === 'filled'"
        :class="
          classes(
            n('state-line'),
            [isFocusing, n('--state-line-focus')],
            [isError, n('--state-line-error')],
            [formDisabled || disabled, n('--state-line-disabled')],
          )
        "
        :style="{ borderColor: color }"
      >
        <legend
          :class="classes(n('line-legend'), [isFloating, n('line-legend--hint')])"
          :style="{ width: legendWidth }"
        />
      </fieldset>

      <div
        v-else
        :class="classes(n('line'), [formDisabled || disabled, n('--line-disabled')], [isError, n('--line-error')])"
        :style="{ background: !isError ? blurColor : undefined }"
      >
        <div
          :class="
            classes(
              n('dot'),
              [isFocusing, n('--line-focus')],
              [formDisabled || disabled, n('--line-disabled')],
              [isError, n('--line-error')],
            )
          "
          :style="{ background: !isError ? focusColor : undefined }"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onUpdated, ref, watch } from 'vue'
import { IconCloseCircleFill as MIconCloseCircleFill } from '@maplejs/icons-vue'
import { call, doubleRaf, getStyle, isEmpty } from '@maplejs/maple-shared'
import { onSmartMounted, onWindowResize } from '@maplejs/maple-use'
import { useCarouselResizeDispatcher } from '../carousel/provide'
import MpIcon from '../icon'
import { usePopup } from '../popup/provide'
import { createNamespace } from '../utils/components'
import { props } from './props'

const { name, n, classes } = createNamespace('field-decorator')

export default defineComponent({
  name,
  components: {
    MIconCloseCircleFill,
    MpIcon,
  },
  props,
  emits: ['clear', 'click'],
  setup(props, { emit }) {
    const placeholderTextEl = ref<HTMLElement | null>(null)
    const middleEl = ref<HTMLElement | null>(null)
    const legendWidth = ref('')
    const middleOffsetLeft = ref('0px')
    const middleOffsetWidth = ref('0px')
    const middleOffsetHeight = ref('0px')
    const transitionDisabled = ref(true)
    const isFloating = computed(() => props.hint && (!isEmpty(props.value) || props.isFocusing))
    const { popup, bindPopup } = usePopup()
    const { bindCarouselResizeDispatcher } = useCarouselResizeDispatcher()

    const color = computed<string | undefined>(() =>
      !props.isError ? (props.isFocusing ? props.focusColor : props.blurColor) : undefined,
    )

    onWindowResize(resize)

    onSmartMounted(() => {
      resize()

      nextTick().then(() => {
        transitionDisabled.value = false
      })
    })

    onUpdated(resize)

    call(bindPopup, null)
    call(bindCarouselResizeDispatcher, {
      onResize() {
        nextTick().then(resize)
      },
    })

    if (popup) {
      watch(
        () => popup.open.value,
        async (show) => {
          if (show) {
            await doubleRaf()
            resize()
          }
        },
      )
    }

    function computePlaceholderState() {
      const { hint, value, composing } = props

      if (!hint && (!isEmpty(value) || composing)) {
        return n('--placeholder-hidden')
      }

      if (isFloating.value) {
        return n('--placeholder-hint')
      }
    }

    function handleClear(e: Event) {
      emit('clear', e)
    }

    function handleClick(e: Event) {
      emit('click', e)
    }

    function resize() {
      middleOffsetLeft.value = `${middleEl.value!.offsetLeft}px`
      middleOffsetWidth.value = `${middleEl.value!.offsetWidth}px`
      middleOffsetHeight.value = `${middleEl.value!.offsetHeight}px`

      if ((props.variant === 'outlined' || props.variant === 'filled') && placeholderTextEl.value) {
        const placeholderTextStyle = getStyle(placeholderTextEl.value)
        legendWidth.value = `calc(${placeholderTextStyle.width} * 0.75 + var(--mp-field-current-placeholder-space) * 2)`
      }
    }

    return {
      placeholderTextEl,
      middleEl,
      middleOffsetLeft,
      middleOffsetWidth,
      middleOffsetHeight,
      color,
      legendWidth,
      isFloating,
      transitionDisabled,
      resize,
      computePlaceholderState,
      n,
      classes,
      isEmpty,
      handleClear,
      handleClick,
    }
  },
})
</script>
