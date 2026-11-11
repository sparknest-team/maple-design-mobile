<template>
  <component
    :is="tag"
    ref="rootRef"
    :aria-busy="loading || undefined"
    :class="
      classes(
        n(),
        n(`--size-${size}`),
        n(`--variant-${variant}`),
        [disabled, n('--disabled')],
        [readonly, n('--readonly')],
        [error, n('--error')],
        [focused, n('--focus')],
        [hasHint, n('--hint')],
        [floating, n('--floating')],
        [!hintCenter, n('--multiline')],
      )
    "
    :style="[geometry, colors]"
    :title="title"
    @mousedown="emit('mousedown', $event)"
  >
    <span v-if="$slots.prefix" :class="n('prefix')"><slot name="prefix" /></span>
    <span ref="middleRef" :class="n('middle')"><slot /></span>
    <span v-if="hasHint && decorativeHint" :class="n('placeholder')" aria-hidden="true">{{ placeholder }}</span>
    <label v-else-if="hasHint" :for="id" :class="n('placeholder')">{{ placeholder }}</label>
    <span v-if="showClear || $slots.suffix || (loading && loadingMode === 'default')" :class="n('suffix')">
      <slot v-if="showClear" name="clear-icon" :clear="handleClear">
        <button
          type="button"
          :class="n('clear-btn')"
          :aria-label="t('common.clear')"
          @mousedown.prevent
          @click.stop="handleClear"
        >
          <IconCloseCircleFill aria-hidden="true" />
        </button>
      </slot>
      <span v-if="loading && loadingMode === 'default'" :class="n('loading-icon')" aria-hidden="true">
        <Loading :size="indicatorSize"
          ><template v-if="$slots['loading-icon']" #icon><slot name="loading-icon" /></template
        ></Loading>
      </span>
      <slot name="suffix" />
    </span>
    <span v-if="loading && loadingMode === 'line'" :class="n('loading-line')" aria-hidden="true"><span /></span>
    <template v-if="line">
      <fieldset
        v-if="variant === 'outline' && hasHint"
        :class="classes(n('border'), n('border--notched'))"
        aria-hidden="true"
      >
        <legend :class="classes(n('legend'), [floating, n('legend--open')])">
          <span>{{ placeholder }}</span>
        </legend>
      </fieldset>
      <span v-else :class="n('border')" aria-hidden="true" />
      <fieldset
        v-if="variant === 'outline' && hasHint"
        :class="classes(n('border-state'), n('border--notched'))"
        aria-hidden="true"
      >
        <legend :class="classes(n('legend'), [floating, n('legend--open')])">
          <span>{{ placeholder }}</span>
        </legend>
      </fieldset>
      <span v-else :class="n('border-state')" aria-hidden="true" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { IconCloseCircleFill } from '@maple-design/icons-vue'
import Loading from '../loading/Loading.vue'
import { createNamespace } from '../utils/components'
import { fieldDecoratorProps } from './props'
import { useFieldGeometry } from './use-field-geometry'
import { useFieldLocale } from './use-field-locale'

defineOptions({ name: createNamespace('field-decorator').name })
const props = defineProps({ ...fieldDecoratorProps, decorativeHint: Boolean })
const indicatorSize = computed(() => ({ xs: 12, sm: 14, md: 16, lg: 18, xl: 20 })[props.size])
const emit = defineEmits<{ clear: [event: Event]; mousedown: [event: MouseEvent] }>()
const { n, classes } = createNamespace('field-decorator')
const { t } = useFieldLocale()
const rootRef = ref<HTMLElement>()
const middleRef = ref<HTMLElement>()
const geometry = useFieldGeometry(rootRef, middleRef)
const hasValue = computed(() =>
  Array.isArray(props.value) ? props.value.length > 0 : props.value != null && props.value !== '',
)
const hasHint = computed(() => props.hint && Boolean(props.placeholder))
const floating = computed(() => hasHint.value && (props.focused || props.composing || hasValue.value))
const showClear = computed(() => props.clearable && hasValue.value && !props.disabled && !props.readonly)
const colors = computed(() => ({
  '--mp-field-custom-text': props.textColor,
  '--mp-field-custom-focus': props.focusColor,
  '--mp-field-custom-blur': props.blurColor,
  cursor: props.disabled ? undefined : props.cursor,
}))
function handleClear(event: Event = new Event('clear')) {
  if (!showClear.value) {
    return
  }
  event.stopPropagation()
  emit('clear', event)
}
</script>
