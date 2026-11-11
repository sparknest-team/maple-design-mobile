<template>
  <mp-row
    :ref="setFormItemRef"
    :div="mergedLayout !== 'horizontal' || !showLabel || noStyle"
    :wrap="layoutWrap"
    :class="[
      rowClass,
      classes(n(), n('$--box'), n(`--${mergedLayout}`), [noStyle, n('--no-style')], [showLabel, n('--with-label')]),
    ]"
    v-bind="rowProps"
    :data-presentation="presentationState.resolved.value === 'direct' ? undefined : presentationState.resolved.value"
  >
    <mp-col
      v-if="showLabel"
      v-bind="labelCol"
      :style="[labelStyle, labelHeightStyle]"
      :class="
        classes(
          n('label-col'),
          [labelAlign === 'left', n('label-col--left')],
          [fixedLabel, n('label-col--flex')],
          [measureLabel, n('label-col--auto')],
        )
      "
    >
      <FormItemLabel
        :measure-width="measureLabel"
        :registry="labelRegistry"
        :required="!presentationState.readPretty.value && showAsterisk"
        :show-colon="showColon"
        :asterisk-position="asteriskPosition"
        :component="labelComponent"
        :attrs="resolvedLabelAttrs"
        :tooltip="tooltip"
      >
        <slot name="label">{{ label }}</slot>
      </FormItemLabel>
    </mp-col>

    <mp-col :class="n('wrapper')" v-bind="wrapperCol" :style="wrapperStyle">
      <div
        ref="contentRef"
        :style="contentStyle"
        :class="[n('content'), { [n('content--flex')]: contentFlex }, contentClass]"
      >
        <slot />
      </div>

      <mp-form-details
        v-if="!noStyle"
        data-form-item-feedback
        :error-message="presentationState.readPretty.value ? '' : displayErrorMessage"
        :extra-message="extra"
      >
        <template v-if="$slots.extra" #extra-message>
          <slot name="extra" />
        </template>
      </mp-form-details>

      <div v-if="!noStyle && !displayErrorMessage && (help || $slots.help)" :class="n('help')">
        <slot name="help">{{ help }}</slot>
      </div>
    </mp-col>
  </mp-row>
</template>

<script lang="ts">
import type { ComponentPublicInstance, SlotsType } from 'vue'
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'
import { cloneDeep, normalizeToArray } from '@maple-design/shared-vue'
import { provideItemPresentation } from '../_components/field-presentation/context'
import Col from '../col'
import MpFormDetails from '../form-details'
import Row from '../row'
import { createRequestGuard } from '../utils/async-request'
import { createNamespace, useValidation } from '../utils/components'
import { provideEmptyValues } from '../utils/empty-value'
import { provideFormErrorDescription } from './error-description'
import { getFormElementId } from './form-id'
import FormItemLabel from './FormItemLabel.vue'
import { resolveFormItemStatus, type FormItemValidateStatus } from './item-decoration'
import { props, type FormItemValidateTrigger } from './item-props'
import { bindFormItem, useFormItem, type FormItemEventHandlers, type FormItemProvider } from './item-provide'
import { provideFormItemLabel } from './label-context'
import { useForm } from './provide'
import { isFormRule } from './rule-validation'
import type { FormItemSlots } from './types'
import { useFormContentHeight } from './use-form-content-height'
import { useFormItemLayout } from './use-form-item-layout'
import { getValueByPath, setValueByPath } from './utils'
import { hasValidateTrigger } from './validate-trigger'

const { name, n, classes } = createNamespace('form-item')

export default defineComponent({
  name,
  components: {
    FormItemLabel,
    MpFormDetails,
    MpRow: Row,
    MpCol: Col,
  },
  props,
  slots: Object as SlotsType<FormItemSlots>,
  emits: { validate: (_valid: boolean) => true },
  setup(props, { emit }) {
    const slots = useSlots()
    const { form } = useForm()
    const { errorMessage, validate: v, resetValidation } = useValidation()
    const validationTask = createRequestGuard()
    const validationStatus = ref<FormItemValidateStatus>()
    const initialValue = ref<any>()
    const initialValues = new Map<string, any>()
    let fieldMounted = false
    let fieldVersion = 0
    const formItemRef = ref<HTMLElement>()

    const fieldValue = computed(() => getValueByPath(form?.model.value, props.field))
    const emptyPolicy = provideEmptyValues(props, true)
    const presentationState = provideItemPresentation({
      editMode: () => props.editMode,
      readPretty: () => props.readPretty,
      label: computed(() => props.label),
      field: computed(() => props.field),
      message: computed(() => errorMessage.value),
      validate: async (candidate) => (await runValidation({ value: candidate })).valid,
      resetValidation: () => clearValidate(),
    })

    const { hasOuterLabel: parentHasOuterLabel } = useFormItem()
    const showLabel = computed(() => !props.noStyle && !props.hideLabel && (!!props.label || !!slots.label))
    const hasOuterLabel = computed(() => (props.noStyle ? parentHasOuterLabel.value : showLabel.value))
    const showAsterisk = computed(() => props.required && !props.hideAsterisk)
    const resolvedLayout = useFormItemLayout(
      () => ({ ...props, hideLabel: !showLabel.value }),
      () => form?.layoutOptions.value ?? {},
      'vertical',
    )
    const {
      layout: mergedLayout,
      contentAlign,
      contentJustify,
      labelAlign,
      labelCol,
      wrapperCol: resolvedWrapperCol,
      labelStyle,
      wrapperStyle,
      wrap: layoutWrap,
      fixedLabel,
      measureLabel,
    } = resolvedLayout
    const contentStyle = computed(() => ({
      '--mp-form-content-align': contentAlign.value,
      '--mp-form-content-justify': contentJustify.value,
      textAlign: contentAlign.value,
      justifyContent: props.contentFlex ? contentJustify.value : undefined,
    }))
    const contentRef = ref<HTMLElement>()
    const labelHeightStyle = useFormContentHeight(
      contentRef,
      () => showLabel.value && mergedLayout.value !== 'vertical',
    )
    const wrapperCol = computed(() => ({
      ...resolvedWrapperCol.value,
      ...(form?.id.value && props.field ? { id: getFormElementId(form.id.value, props.field) } : {}),
    }))
    function setFormItemRef(instance: Element | ComponentPublicInstance | null) {
      formItemRef.value = instance ? (('$el' in instance ? instance.$el : instance) as HTMLElement) : undefined
    }
    const mergedDisabled = computed(() => props.disabled ?? form?.disabled.value ?? false)
    const mergedReadonly = computed(() => props.readonly ?? form?.readonly.value ?? false)
    const mergedSize = computed(() => props.size ?? form?.size.value)
    const mergedRules = computed(() => {
      const source = props.rules ?? form?.rules.value?.[props.field]
      const rules = normalizeToArray(source).filter(isFormRule)

      if (props.required) {
        return [
          (value: any) => !emptyPolicy.isEmpty(value) || `${props.label || props.field || '该项'}不能为空`,
          ...rules,
        ]
      }

      return rules
    })
    watch([() => props.field, mergedRules], () => form?.invalidateSubmitInputs?.(), { deep: true, flush: 'sync' })
    const eventHandlers = computed<FormItemEventHandlers>(() => ({
      onChange: () => validateWithTrigger('change'),
      onInput: () => validateWithTrigger('input'),
      onFocus: () => validateWithTrigger('focus'),
      onBlur: () => validateWithTrigger('blur'),
      onClear: () => validateWithTrigger('clear'),
    }))

    onMounted(() => {
      fieldMounted = true
      captureInitialValue()
      registerCurrentField()
    })

    const displayStatus = computed(() => resolveFormItemStatus(props.validateStatus, validationStatus.value))
    const displayErrorMessage = computed(() => (displayStatus.value === 'error' ? errorMessage.value : ''))
    const { labelId } = provideFormErrorDescription(
      () => !presentationState.readPretty.value && Boolean(displayErrorMessage.value),
      () => props.noStyle,
    )
    const labelContext = provideFormItemLabel({
      generated: labelId,
      noStyle: () => props.noStyle,
      visible: () => showLabel.value,
      attributes: () => props.labelAttrs,
    })
    const resolvedLabelAttrs = computed(() => ({
      ...props.labelAttrs,
      ...(labelContext.ownId.value ? { id: labelContext.ownId.value } : {}),
      ...(presentationState.readPretty.value ? { for: undefined } : {}),
    }))

    const formItemProvider: FormItemProvider = {
      error: computed(() => displayStatus.value === 'error'),
      errorMessage: displayErrorMessage,
      disabled: mergedDisabled,
      readonly: mergedReadonly,
      size: mergedSize,
      hasOuterLabel,
      feedback: computed(() => (props.feedback ? displayStatus.value : undefined)),
      eventHandlers,
      validateWithTrigger,
    }

    bindFormItem(formItemProvider)

    function captureInitialValue() {
      const name = props.field
      if (!name) {
        initialValue.value = undefined
        return
      }
      if (!initialValues.has(name) && form?.model.value) {
        initialValues.set(name, cloneDeep(getValueByPath(form.model.value, name)))
      }
      initialValue.value = initialValues.get(name)
    }
    watch(() => form?.model.value, captureInitialValue, { flush: 'sync' })

    let active = true
    function validateWithTrigger(trigger: FormItemValidateTrigger) {
      if (!hasValidateTrigger(props.validateTrigger, trigger)) {
        return
      }
      const version = fieldVersion
      nextTick(() => {
        if (active && version === fieldVersion && hasValidateTrigger(props.validateTrigger, trigger)) {
          runValidation()
        }
      })
    }

    async function runValidation(candidate?: { value: unknown }) {
      const isCurrent = validationTask.begin()
      validationStatus.value = mergedRules.value.length ? 'validating' : undefined
      const candidateModel = candidate ? cloneDeep(form?.model.value ?? {}) : form?.model.value
      if (candidate && props.field) {
        setValueByPath(candidateModel, props.field, candidate.value)
      }
      try {
        const valid = await v(mergedRules.value, candidate ? candidate.value : fieldValue.value, {
          model: candidateModel,
          field: props.field,
        })
        if (isCurrent()) {
          validationStatus.value = mergedRules.value.length ? (valid ? 'success' : 'error') : undefined
        }
        return { valid, isCurrent }
      } catch (error) {
        if (isCurrent()) {
          validationStatus.value = errorMessage.value ? 'error' : undefined
        }
        throw error
      }
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
            isRequiredError: emptyPolicy.isEmpty(fieldValue.value) && props.required,
            message: errorMessage.value,
          }
    }

    function clearValidate() {
      validationTask.invalidate()
      validationStatus.value = undefined
      resetValidation()
    }

    function resetField() {
      presentationState.cancel()
      if (props.field && form?.model.value) {
        setValueByPath(form.model.value, props.field, cloneDeep(initialValue.value))
      }

      clearValidate()
    }

    function setField(data: unknown) {
      if (!data || typeof data !== 'object') {
        return
      }
      const fieldData = data as { value?: unknown; message?: string; status?: FormItemValidateStatus | '' }
      if ('value' in fieldData && props.field && form?.model.value) {
        setValueByPath(form.model.value, props.field, cloneDeep(fieldData.value))
      }
      if ('status' in fieldData || 'message' in fieldData) {
        validationTask.invalidate()
        // Invalidate the rule runner too, before applying the explicit message.
        resetValidation()
        validationStatus.value =
          fieldData.status === '' ? undefined : (fieldData.status ?? (fieldData.message ? 'error' : undefined))
        errorMessage.value = fieldData.message || ''
      }
    }

    const fieldController = {
      get field() {
        return props.field
      },
      validate,
      clearValidate,
      resetField,
      setField,
      getElement: () => formItemRef.value,
    }
    let unregisterField: (() => void) | undefined
    function registerCurrentField() {
      if (props.field) {
        unregisterField = form?.registerField(fieldController)
      }
    }
    function unregisterCurrentField() {
      unregisterField?.()
      unregisterField = undefined
    }
    watch(
      () => props.field,
      () => {
        if (!fieldMounted) {
          return
        }
        fieldVersion++
        unregisterCurrentField()
        presentationState.cancel()
        clearValidate()
        captureInitialValue()
        registerCurrentField()
      },
      { flush: 'sync' },
    )
    onBeforeUnmount(() => {
      active = false
      fieldMounted = false
      validationTask.invalidate()
      unregisterCurrentField()
    })

    return {
      presentationState,
      resolvedLabelAttrs,
      n,
      classes,
      formItemRef,
      setFormItemRef,
      labelRegistry: form,
      labelAlign,
      labelCol,
      wrapperCol,
      labelStyle,
      labelHeightStyle,
      contentRef,
      contentStyle,
      wrapperStyle,
      layoutWrap,
      fixedLabel,
      measureLabel,
      showLabel,
      showAsterisk,
      mergedLayout,
      displayErrorMessage,
      validate,
      clearValidate,
      resetField,
      resetValidation: clearValidate,
      reset: resetField,
    }
  },
})
</script>
