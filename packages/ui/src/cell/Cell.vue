<template>
  <div
    v-ripple="{ disabled: !ripple }"
    :class="classes(n(), [border, n('--border')], [interactive || rootButton(), n('--cursor')])"
    :style="borderOffsetStyles"
    @click="handleClick"
    @keydown="handleRootKeydown"
  >
    <div
      :class="n('action')"
      :role="interactive && !rootButton() ? 'button' : undefined"
      :tabindex="interactive && !rootButton() ? 0 : undefined"
      :aria-label="interactive && !rootButton() ? (actionAriaLabel ?? actionLabel()) : undefined"
      @keydown="handleActionKeydown"
    >
      <div v-if="icon || $slots.icon" :class="classes(n('icon'), iconClass)">
        <slot name="icon">
          <mp-registered-icon :name="icon" />
        </slot>
      </div>

      <div :class="n('content')">
        <slot>
          <div v-if="title" :class="classes(n('title'), titleClass)">
            {{ title }}
          </div>
        </slot>

        <slot name="description">
          <div v-if="description" :class="classes(n('description'), descriptionClass)">
            {{ description }}
          </div>
        </slot>
      </div>
    </div>

    <div v-if="$slots.extra" :class="classes(n('extra'), extraClass)">
      <slot name="extra" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent } from 'vue'
import MpRegisteredIcon from '../icon/RegisteredIcon.vue'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { props } from './props'

const { name, n, classes } = createNamespace('cell')

export default defineComponent({
  name,
  components: { MpRegisteredIcon },
  directives: { Ripple },
  props,
  emits: ['click'],
  setup(props, { emit, attrs }) {
    const rootButton = () => attrs.role === 'button'
    const actionLabel = () => (typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : undefined)
    const interactive = computed(() => props.clickable ?? props.ripple)
    const borderOffsetStyles = computed<CSSProperties>(() => {
      if (
        props.borderOffset == null ||
        (typeof props.borderOffset === 'number' && !Number.isFinite(props.borderOffset))
      ) {
        return {}
      }

      return {
        '--mp-cell-border-left': toSizeUnit(props.borderOffset),
        '--mp-cell-border-right': toSizeUnit(props.borderOffset),
      }
    })

    function handleClick(e: Event) {
      emit('click', e)
    }

    function activate(event: KeyboardEvent) {
      if (event.target !== event.currentTarget || (event.key !== 'Enter' && event.key !== ' ')) {
        return
      }
      event.preventDefault()
      ;(event.currentTarget as HTMLElement).click()
    }

    function handleActionKeydown(event: KeyboardEvent) {
      if (interactive.value && !rootButton()) {
        activate(event)
      }
    }

    function handleRootKeydown(event: KeyboardEvent) {
      if (rootButton()) {
        activate(event)
      }
    }

    return {
      rootButton,
      actionLabel,
      interactive,
      handleActionKeydown,
      handleRootKeydown,
      borderOffsetStyles,
      n,
      classes,
      toSizeUnit,
      handleClick,
    }
  },
})
</script>
