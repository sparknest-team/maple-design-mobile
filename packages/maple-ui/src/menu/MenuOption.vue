<template>
  <div
    ref="root"
    v-ripple="{ disabled: disabled || !ripple }"
    v-hover:desktop="handleHovering"
    role="menuitem"
    :class="
      classes(
        n(),
        n('$--box'),
        n(`--${size}`),
        [optionSelected, n('--selected-color')],
        [disabled, n('--disabled')],
        [childrenTrigger, n('--children-trigger')],
      )
    "
    :tabindex="disabled ? undefined : '-1'"
    :aria-disabled="disabled || undefined"
    @click="handleClick"
    @focus="isFocusing = true"
    @blur="isFocusing = false"
  >
    <div :class="classes(n('cover'), [optionSelected, n('--selected-background')])"></div>

    <mp-checkbox
      v-if="multiple"
      ref="checkbox"
      v-model="optionSelected"
      v-model:indeterminate="optionIndeterminate"
      :disabled="disabled"
      @click.stop
      @change="handleSelect"
    />

    <span v-if="$slots.icon" :class="n('icon')">
      <slot name="icon" />
    </span>

    <slot>
      <div :class="classes(n('text'))">
        <maybe-v-node :is="labelVNode" :class="n('$--ellipsis')" />
      </div>
    </slot>

    <div v-if="childrenTrigger" :class="n('arrow')">
      <mp-icon mp-menu-option-cover :class="n('arrow-icon')"><MIconChevronRight /></mp-icon>
    </div>

    <mp-hover-overlay :hovering="(hovering || highlight) && !disabled" :focusing="isFocusing && !disabled" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { IconChevronRight as MIconChevronRight } from '@maplejs/icons-vue'
import { isBoolean, isFunction, preventDefault } from '@maplejs/maple-shared'
import { useEventListener } from '@maplejs/maple-use'
import MpCheckbox from '../checkbox'
import Hover, { HoverOverlay as MpHoverOverlay, useHoverOverlay } from '../hover'
import MpIcon from '../icon'
import Ripple from '../ripple'
import { createNamespace, MaybeVNode } from '../utils/components'
import { props } from './option-props'
import { useMenu, type MenuOptionProvider } from './option-provide'

const { name, n, classes } = createNamespace('menu-option')

export default defineComponent({
  name,
  directives: { Ripple, Hover },
  components: {
    MIconChevronRight,
    MpCheckbox,
    MpHoverOverlay,
    MpIcon,
    MaybeVNode,
  },
  props,
  emits: ['key-arrow-x'],
  setup(props, { emit }) {
    const root = ref<HTMLElement>()
    const checkbox = ref<InstanceType<typeof MpCheckbox>>()
    const isFocusing = ref(false)
    const optionSelected = ref(false)
    const optionIndeterminate = ref(false)
    const selected = computed(() => optionSelected.value)
    const indeterminate = computed(() => optionIndeterminate.value)
    const value = computed<any>(() =>
      props.value !== undefined ? props.value : isFunction(props.label) ? undefined : props.label,
    )
    const disabled = computed(() => props.disabled)
    const ripple = computed(() => props.ripple)
    const { menu, bindMenu } = useMenu()
    const { size, multiple, onSelect, computeLabel } = menu
    const { hovering, handleHovering } = useHoverOverlay()

    const labelVNode = computed(() =>
      isFunction(props.label)
        ? props.label(
            props.option ?? {
              label: props.label,
              value: props.value,
              disabled: props.disabled,
              ripple: props.ripple,
            },
            optionSelected.value,
          )
        : props.label,
    )

    const menuOptionProvider: MenuOptionProvider = {
      label: labelVNode,
      value,
      selected,
      disabled,
      ripple,
      indeterminate,
      sync,
    }

    watch([() => props.label, () => props.value], computeLabel)

    bindMenu(menuOptionProvider)

    useEventListener(() => window, 'keydown', handleKeydown)
    useEventListener(() => window, 'keyup', handleKeyup)

    function handleClick(event: MouseEvent) {
      if (props.disabled) {
        return
      }

      if (!multiple.value && props.childrenTrigger) {
        return
      }

      if (multiple.value && optionIndeterminate.value) {
        optionIndeterminate.value = false
        optionSelected.value = false
        onSelect(menuOptionProvider, event)
        return
      }

      if (multiple.value && !optionIndeterminate.value) {
        optionSelected.value = !optionSelected.value
      }

      onSelect(menuOptionProvider, event)
    }

    function handleKeydown(event: KeyboardEvent) {
      if (!isFocusing.value && !checkbox.value?.isFocusing) {
        return
      }

      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        preventDefault(event)
        emit('key-arrow-x', event.key)
      }

      if (!isFocusing.value) {
        return
      }

      if (event.key === ' ' || event.key === 'Enter') {
        preventDefault(event)
      }

      if (event.key === 'Enter') {
        root.value!.click()
      }
    }

    function handleKeyup(event: KeyboardEvent) {
      if (!isFocusing.value) {
        return
      }

      if (event.key === ' ') {
        preventDefault(event)
        root.value!.click()
      }
    }

    async function handleSelect() {
      await nextTick()
      onSelect(menuOptionProvider)
    }

    function sync(checked: boolean, indeterminate?: boolean) {
      optionSelected.value = checked

      if (isBoolean(indeterminate)) {
        optionIndeterminate.value = indeterminate
      }
    }

    return {
      root,
      checkbox,
      optionSelected,
      optionIndeterminate,
      size,
      multiple,
      hovering,
      isFocusing,
      labelVNode,
      n,
      classes,
      handleHovering,
      handleClick,
      handleSelect,
    }
  },
})
</script>
