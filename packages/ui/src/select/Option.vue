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
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
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

    const handleMouseEnter = () => {
      if (!props.disabled) {
        selectCtx?.setActiveKey(key.value)
      }
    }

    const handleMouseLeave = () => {
      if (!props.disabled) {
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
      handleMouseEnter,
      handleMouseLeave,
    }
  },
})
</script>
