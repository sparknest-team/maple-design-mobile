<template>
  <component
    :is="component"
    v-show="isValid"
    :id="optionId"
    ref="itemRef"
    :class="[cls, { [`${prefixCls}-has-suffix`]: Boolean($slots.suffix) }]"
    role="option"
    :aria-selected="isSelected"
    :aria-disabled="disabled"
    @click="handleClick"
    @touchstart.passive="startTap"
    @touchmove.passive="checkTap"
    @pointercancel="cancelTap"
    @touchcancel="cancelTap"
    @touchend="finishTap"
    @pointerenter="handlePointerEnter"
    @pointerleave="handlePointerLeave"
  >
    <span v-if="$slots.icon" :class="`${prefixCls}-icon`">
      <slot name="icon" />
    </span>
    <span :class="`${prefixCls}-content`"
      ><slot :selected="isSelected">{{ label }}</slot></span
    >
    <span v-if="$slots.suffix" :class="`${prefixCls}-suffix`">
      <slot name="suffix" />
    </span>
    <span v-if="isSelected" :class="`${prefixCls}-check`" aria-hidden="true"><IconCheck /></span>
  </component>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue'
import { IconCheck } from '@maple-design/icons-vue'
import { isEqual } from '../_utils/is-equal'
import { createNamespace, getPrefixCls } from '../utils/components'
import { selectInjectionKey } from './context'
import { optionProps } from './props'
import { getKeyFromValue, isValidOption } from './utils'

const { name, n, classes } = createNamespace('option')
export default defineComponent({
  name,
  components: {
    IconCheck,
  },
  props: { ...optionProps, internal: Boolean },
  setup(props) {
    const { disabled, tagProps: _tagProps, index } = toRefs(props)
    const prefixCls = getPrefixCls('select-option')
    const selectCtx = inject(selectInjectionKey, undefined)
    const instance = getCurrentInstance()
    const itemRef = ref<HTMLElement>()

    const tagProps = ref(_tagProps.value)

    watch(_tagProps, (cur, pre) => {
      if (!isEqual(cur, pre)) {
        tagProps.value = cur
      }
    })

    const textContent = ref('')
    const value = computed(() => props.value ?? props.label ?? textContent.value)
    const label = computed(() => props.label ?? textContent.value)
    const key = computed(() => getKeyFromValue(value.value, selectCtx?.fieldNames?.value))
    const component = computed(() => selectCtx?.component ?? 'li')

    const setTextContent = () => {
      if (!props.label && itemRef.value) {
        const text = itemRef.value.textContent ?? ''
        if (textContent.value !== text) {
          textContent.value = text
        }
      }
    }

    onMounted(() => setTextContent())
    onUpdated(() => setTextContent())

    const isSelected = computed(() => selectCtx?.valueKeys.includes(key.value) ?? false)
    const optionId = computed(() =>
      props.internal || selectCtx?.component !== 'div' ? selectCtx?.getOptionId?.(key.value) : undefined,
    )
    const isActive = computed(() => selectCtx?.activeKey === key.value)

    const optionInfo = reactive({
      raw: {
        value,
        label,
        disabled,
        tagProps,
      },
      ref: itemRef,
      index,
      key,
      origin: 'slot' as const,
      value,
      label,
      disabled,
      tagProps,
    })

    const isValid = computed(
      () =>
        props.internal ||
        isValidOption(optionInfo, {
          inputValue: selectCtx?.inputValue,
          filterOption: selectCtx?.filterOption,
          caseSensitive: selectCtx?.caseSensitive,
          searchFields: selectCtx?.searchFields,
        }),
    )

    if (!props.internal) {
      if (instance) {
        selectCtx?.addSlotOptionInfo(instance.uid, optionInfo)
      }

      onBeforeUnmount(() => {
        if (instance) {
          selectCtx?.removeSlotOptionInfo(instance.uid)
        }
      })
    }

    const handleClick = (ev: MouseEvent) => {
      if (!props.disabled) {
        selectCtx?.onSelect(key.value, ev)
      }
    }

    let tap: { id: number; x: number; y: number; time: number } | undefined
    const cancelTap = () => {
      tap = undefined
    }
    const startTap = (event: TouchEvent) => {
      const touch = event.touches[0]
      tap =
        event.touches.length === 1 && !props.disabled
          ? { id: touch.identifier, x: touch.clientX, y: touch.clientY, time: event.timeStamp }
          : undefined
    }
    const checkTap = (event: TouchEvent) => {
      const touch = event.changedTouches[0]
      if (
        !touch ||
        touch.identifier !== tap?.id ||
        !tap ||
        Math.hypot(touch.clientX - tap.x, touch.clientY - tap.y) > 8
      )
        cancelTap()
    }
    const finishTap = (event: TouchEvent) => {
      checkTap(event)
      const start = tap
      cancelTap()
      const target = event.target
      if (
        !start ||
        event.touches.length ||
        event.timeStamp - start.time > 500 ||
        !event.cancelable ||
        event.defaultPrevented ||
        !(target instanceof HTMLElement) ||
        target.closest('button, a, input, select, textarea, [contenteditable="true"], [role="button"]')
      )
        return

      // Safari can end the first tap without dispatching a click. Replace its compatibility click once.
      event.preventDefault()
      target.click()
    }

    const handlePointerEnter = (event: PointerEvent) => {
      if (event.pointerType !== 'touch' && !props.disabled) {
        selectCtx?.setActiveKey(key.value)
      }
    }

    const handlePointerLeave = (event: PointerEvent) => {
      if (event.pointerType !== 'touch' && !props.disabled) {
        selectCtx?.setActiveKey()
      }
    }

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-selected`]: isSelected.value,
        [`${prefixCls}-active`]: isActive.value,
        [`${prefixCls}-multiple`]: selectCtx?.multiple,
      },
    ])

    return {
      optionId,
      prefixCls,
      cls,
      selectCtx,
      itemRef,
      component,
      isSelected,
      isValid,
      handleClick,
      startTap,
      checkTap,
      cancelTap,
      finishTap,
      handlePointerEnter,
      handlePointerLeave,
    }
  },
})
</script>
