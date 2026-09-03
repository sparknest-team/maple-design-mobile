<template>
  <div
    :class="
      classes(n(), n('$--box'), n(`--${mergedLayout}`), [noStyle, n('--no-style')], [showLabel, n('--with-label')])
    "
  >
    <div v-if="showLabel" :class="n('label')">
      <span v-if="showAsterisk && asteriskPosition === 'start'" :class="classes(n('asterisk'), n('asterisk--start'))">
        *
      </span>
      <slot name="label">{{ label }}</slot>
      <span v-if="showAsterisk && asteriskPosition === 'end'" :class="classes(n('asterisk'), n('asterisk--end'))">
        *
      </span>
    </div>

    <div :class="n('wrapper')">
      <div :class="n('content')">
        <slot />
      </div>

      <mp-form-details v-if="!noStyle" :error-message="errorMessage" :extra-message="extra">
        <template v-if="$slots.extra" #extra-message>
          <slot name="extra" />
        </template>
      </mp-form-details>

      <div v-if="!noStyle && !errorMessage && (help || $slots.help)" :class="n('help')">
        <slot name="help">{{ help }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref, useSlots } from 'vue'
import { call, cloneDeep, normalizeToArray } from '@maplejs/maple-shared'
import MpFormDetails from '../form-details'
import { createNamespace, useValidation } from '../utils/components'
import { props, type FormItemValidateTrigger } from './item-props'
import { bindFormItem, type FormItemEventHandlers, type FormItemProvider } from './item-provide'
import { useForm } from './provide'
import { getValueByPath, isEmptyValue, setValueByPath } from './utils'

const { name, n, classes } = createNamespace('form-item')

export default defineComponent({
  name,
  components: {
    MpFormDetails,
  },
  props,
  emits: ['validate'],
  setup(props, { emit }) {
    const slots = useSlots()
    const { bindForm, form } = useForm()
    const { errorMessage, validate: v, resetValidation, validateWithTrigger: vt } = useValidation()
    const initialValue = ref<any>()
    const hasCapturedInitial = ref(false)

    const fieldValue = computed(() => getValueByPath(form?.model.value, props.field))
    const hasOuterLabel = computed(() => !props.noStyle && !props.hideLabel && (!!props.label || !!slots.label))
    const showLabel = computed(() => hasOuterLabel.value)
    const showAsterisk = computed(() => props.required && !props.hideAsterisk)
    const mergedLayout = computed(() => props.layout || form?.layout.value || 'vertical')
    const mergedDisabled = computed(() => !!(props.disabled || form?.disabled.value))
    const mergedRules = computed(() => {
      const rules = normalizeToArray(props.rules).filter(Boolean)

      if (props.required && !hasRequiredRule(rules)) {
        return [(value: any) => !isEmptyValue(value) || `${props.label || props.field || '该项'}不能为空`, ...rules]
      }

      return rules
    })
    const triggers = computed(() => normalizeToArray(props.validateTrigger) as FormItemValidateTrigger[])

    const eventHandlers = computed<FormItemEventHandlers>(() => ({
      onChange: () => validateWithTrigger('change'),
      onInput: () => validateWithTrigger('input'),
      onFocus: () => validateWithTrigger('focus'),
      onBlur: () => validateWithTrigger('blur'),
      onClear: () => validateWithTrigger('clear'),
    }))

    onMounted(() => {
      captureInitialValue()
    })

    const formItemProvider: FormItemProvider = {
      error: computed(() => !!errorMessage.value),
      errorMessage: computed(() => errorMessage.value),
      disabled: mergedDisabled,
      hasOuterLabel,
      eventHandlers,
      validateWithTrigger,
    }

    bindFormItem(formItemProvider)

    call(bindForm, {
      validate,
      resetValidation: clearValidate,
      reset: resetField,
      get field() {
        return props.field
      },
    })

    function captureInitialValue() {
      if (hasCapturedInitial.value || !props.field || !form?.model.value) {
        return
      }

      initialValue.value = cloneDeep(getValueByPath(form.model.value, props.field))
      hasCapturedInitial.value = true
    }

    function hasRequiredRule(rules: any[]) {
      return rules.some((rule) => {
        if (typeof rule === 'object' && rule && !(typeof rule.safeParseAsync === 'function') && 'required' in rule) {
          return !!rule.required
        }

        return false
      })
    }

    function validateWithTrigger(trigger: FormItemValidateTrigger) {
      nextTick(() => {
        vt(triggers.value, trigger, mergedRules.value, fieldValue.value)
      })
    }

    async function validate() {
      const valid = await v(mergedRules.value, fieldValue.value)
      emit('validate', valid)
      return valid
    }

    function clearValidate() {
      resetValidation()
    }

    function resetField() {
      if (props.field && form?.model.value) {
        setValueByPath(form.model.value, props.field, cloneDeep(initialValue.value))
      }

      clearValidate()
    }

    return {
      n,
      classes,
      showLabel,
      showAsterisk,
      mergedLayout,
      errorMessage,
      validate,
      clearValidate,
      resetField,
      resetValidation: clearValidate,
      reset: resetField,
    }
  },
})
</script>
