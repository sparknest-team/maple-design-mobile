<template>
  <div :class="n('wrap')">
    <div :class="classes(n(), n(`--${direction}`))">
      <template v-if="options.length">
        <mp-checkbox
          v-for="option in options"
          :key="option[valueKey]"
          :value="option[valueKey]"
          :disabled="option.disabled"
        >
          <template #default="{ checked }">
            <maybe-v-node :is="isFunction(option[labelKey]) ? option[labelKey](option, checked) : option[labelKey]" />
          </template>
        </mp-checkbox>
      </template>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { call, isFunction, uniq } from '@maplejs/maple-shared'
import MpCheckbox from '../checkbox'
import { useFormItem } from '../form-item'
import { createNamespace, MaybeVNode } from '../utils/components'
import { useFieldNames } from '../utils/options'
import { props } from './props'
import { useCheckboxes, type CheckboxGroupProvider } from './provide'

const { name, n, classes } = createNamespace('checkbox-group')

export default defineComponent({
  name,
  components: { MpCheckbox, MaybeVNode },
  props,
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const max = computed(() => props.max)
    const checkedCount = computed(() => props.modelValue.length)
    const { length, checkboxes, bindCheckboxes } = useCheckboxes()
    const { mergedError, eventHandlers } = useFormItem()
    const fieldNames = useFieldNames(props)
    const labelKey = computed(() => fieldNames.value.label)
    const valueKey = computed(() => fieldNames.value.value)

    const checkboxGroupProvider: CheckboxGroupProvider = {
      max,
      checkedCount,
      onChecked,
      onUnchecked,
      errorMessage: mergedError,
    }

    watch(() => props.modelValue, syncCheckboxes, { deep: true })

    watch(() => length.value, syncCheckboxes)

    bindCheckboxes(checkboxGroupProvider)

    function change(changedModelValue: any) {
      emit('update:modelValue', changedModelValue)
      emit('change', changedModelValue)
      eventHandlers.value.onChange?.()
    }

    function onChecked(changedValue: any) {
      const { modelValue } = props

      if (!modelValue.includes(changedValue)) {
        change([...modelValue, changedValue])
      }
    }

    function onUnchecked(changedValue: any) {
      const { modelValue } = props

      if (!modelValue.includes(changedValue)) {
        return
      }

      change(modelValue.filter((value) => value !== changedValue))
    }

    function syncCheckboxes() {
      checkboxes.forEach(({ sync }) => sync(props.modelValue))
    }

    // expose
    function checkAll() {
      const values: any[] = checkboxes.map(({ value }) => value.value)
      const changedModelValue: any[] = uniq(values)

      emit('update:modelValue', changedModelValue)

      return changedModelValue
    }

    // expose
    function inverseAll() {
      const values: any[] = checkboxes.filter(({ checked }) => !checked.value).map(({ value }) => value.value)
      const changedModelValue: any[] = uniq(values)

      emit('update:modelValue', changedModelValue)

      return changedModelValue
    }

    return {
      mergedError,
      labelKey,
      valueKey,
      n,
      classes,
      checkAll,
      inverseAll,
      isFunction,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../ripple/ripple';
@import '../icon/icon';
@import '../hover-overlay/hoverOverlay';
@import '../checkbox/checkbox';
@import './checkboxGroup';
</style>
