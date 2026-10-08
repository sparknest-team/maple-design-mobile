<template>
  <div
    ref="formItemRef"
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
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, ref, useSlots } from 'vue'
import { cloneDeep, normalizeToArray } from '@maplejs/maple-shared'
import MpFormDetails from '../form-details'
import { createRequestGuard } from '../utils/async-request'
import { createNamespace, useValidation } from '../utils/components'
import { props, type FormItemValidateTrigger } from './item-props'
import { bindFormItem, useFormItem, type FormItemEventHandlers, type FormItemProvider } from './item-provide'
import { useForm } from './provide'
import { getValueByPath, isEmptyValue, setValueByPath } from './utils'
import { hasValidateTrigger } from './validate-trigger'

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
    const { form } = useForm()
    const { errorMessage, validate: v, resetValidation } = useValidation()
    const validationTask = createRequestGuard()
    const validationStatus = ref<'success' | 'error' | 'validating'>()
    const initialValue = ref<any>()
    const hasCapturedInitial = ref(false)
    const formItemRef = ref<HTMLElement>()

    const fieldValue = computed(() => getValueByPath(form?.model.value, props.field))
    const { hasOuterLabel: parentHasOuterLabel } = useFormItem()
    const showLabel = computed(() => !props.noStyle && !props.hideLabel && (!!props.label || !!slots.label))
    const hasOuterLabel = computed(() => (props.noStyle ? parentHasOuterLabel.value : showLabel.value))
    const showAsterisk = computed(() => props.required && !props.hideAsterisk)
    const mergedLayout = computed(() => props.layout || form?.layout.value || 'vertical')
    const mergedDisabled = computed(() => props.disabled ?? form?.disabled.value ?? false)
    const mergedReadonly = computed(() => props.readonly ?? form?.readonly.value ?? false)
    const mergedSize = computed(() => props.size ?? form?.size.value)
    const mergedRules = computed(() => {
      const source = props.rules ?? form?.rules.value?.[props.field]
      const rules = normalizeToArray(source).filter(Boolean)

      if (props.required && !hasRequiredRule(rules)) {
        return [(value: any) => !isEmptyValue(value) || `${props.label || props.field || '该项'}不能为空`, ...rules]
      }

      return rules
    })
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
      error: computed(() => (props.validateStatus ?? validationStatus.value) === 'error' || !!errorMessage.value),
      errorMessage: computed(() => errorMessage.value),
      disabled: mergedDisabled,
      readonly: mergedReadonly,
      size: mergedSize,
      hasOuterLabel,
      feedback: computed(() => (props.feedback ? (props.validateStatus ?? validationStatus.value) : undefined)),
      eventHandlers,
      validateWithTrigger,
    }

    bindFormItem(formItemProvider)

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

    let active = true
    function validateWithTrigger(trigger: FormItemValidateTrigger) {
      if (!hasValidateTrigger(props.validateTrigger, trigger)) {
        return
      }
      nextTick(() => {
        if (active && hasValidateTrigger(props.validateTrigger, trigger)) {
          runValidation()
        }
      })
    }

    async function runValidation() {
      const isCurrent = validationTask.begin()
      validationStatus.value = mergedRules.value.length ? 'validating' : undefined
      const valid = await v(mergedRules.value, fieldValue.value)
      if (isCurrent()) {
        validationStatus.value = mergedRules.value.length ? (valid ? 'success' : 'error') : undefined
      }
      return { valid, isCurrent }
    }

    async function validate() {
      const { valid, isCurrent } = await runValidation()
      if (isCurrent()) {
        emit('validate', valid)
      }
      return valid
        ? undefined
        : {
            field: props.field,
            label: props.label || '',
            value: fieldValue.value,
            type: 'validator',
            isRequiredError: isEmptyValue(fieldValue.value) && (props.required || hasRequiredRule(mergedRules.value)),
            message: errorMessage.value,
          }
    }

    function clearValidate() {
      validationTask.invalidate()
      validationStatus.value = undefined
      resetValidation()
    }

    function resetField() {
      if (props.field && form?.model.value) {
        setValueByPath(form.model.value, props.field, cloneDeep(initialValue.value))
      }

      clearValidate()
    }

    function setField(data: unknown) {
      if (!data || typeof data !== 'object') {
        return
      }
      const fieldData = data as { value?: unknown; message?: string; status?: string }
      if ('value' in fieldData && props.field && form?.model.value) {
        setValueByPath(form.model.value, props.field, cloneDeep(fieldData.value))
      }
      if (fieldData.status === 'error' || fieldData.message) {
        errorMessage.value = fieldData.message || ''
      } else if ('status' in fieldData || 'message' in fieldData) {
        clearValidate()
      }
    }

    const unregisterField = form?.registerField({
      get field() {
        return props.field
      },
      validate,
      clearValidate,
      resetField,
      setField,
      getElement: () => formItemRef.value,
    })
    onBeforeUnmount(() => {
      active = false
      validationTask.invalidate()
      unregisterField?.()
    })

    return {
      n,
      classes,
      formItemRef,
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
