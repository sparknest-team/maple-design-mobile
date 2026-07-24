<template>
  <div
    ref="root"
    :class="n()"
    :tabindex="disabled || formDisabled ? undefined : '0'"
    @focus="handleFocus"
    @blur="handleRootBlur"
  >
    <mp-menu
      v-if="presentation === 'menu'"
      v-model:show="show"
      mp-select-cover
      same-width
      close-on-click-reference
      :close-on-key-escape="false"
      :class="n('menu')"
      :popover-class="variant === 'standard' && mergedHint ? n('--standard-menu-margin') : undefined"
      :offset-y="offsetY"
      :disabled="formReadonly || readonly || formDisabled || disabled"
      :placement="placement"
      :default-style="false"
      @click-outside="handleClickOutside"
    >
      <mp-field-decorator
        v-bind="{
          value: modelValue,
          size,
          variant,
          placeholder,
          line,
          hint: mergedHint,
          textColor,
          focusColor,
          blurColor,
          isFocusing,
          isError: mergedError,
          formDisabled,
          disabled,
          clearable,
          cursor,
          onClick: handleClick,
          onClear: handleClear,
        }"
      >
        <template v-if="$slots['prepend-icon']" #prepend-icon>
          <slot name="prepend-icon" />
        </template>

        <div
          :class="classes(n('select'), [mergedError, n('--error')], [formDisabled || disabled, n('--disabled')])"
          :style="{
            textAlign,
            color: textColor,
          }"
        >
          <div :class="n('label')">
            <slot v-if="!isEmptyModelValue" name="selected">
              <template v-if="multiple">
                <div v-if="tag" :class="n('tags')">
                  <mp-tag
                    v-for="l in displayLabels"
                    :key="l"
                    round
                    :class="n('tag')"
                    mp-select-cover
                    closable
                    size="sm"
                    :status="mergedError ? 'danger' : 'default'"
                    @click.stop
                    @close="() => handleClose(l)"
                  >
                    <maybe-v-node :is="l" />
                  </mp-tag>
                </div>
                <div v-else :class="n('values')">
                  <template v-for="(l, labelIndex) in displayLabels" :key="l">
                    <maybe-v-node :is="l" />{{ labelIndex !== displayLabels.length - 1 ? separator : '' }}
                  </template>
                </div>
              </template>

              <maybe-v-node :is="displayLabel" v-else />
            </slot>
          </div>

          <span
            v-if="enableCustomPlaceholder"
            :class="classes(n('placeholder'), n('$--ellipsis'))"
            :style="{
              color: placeholderColor,
            }"
          >
            {{ placeholder }}
          </span>

          <slot name="arrow-icon" :focus="isFocusing" :menu-open="show">
            <mp-icon
              :class="classes(n('arrow'), [show, n('--arrow-rotate')])"
              mp-select-cover
              name="menu-down"
              :transition="300"
            />
          </slot>
        </div>

        <template #clear-icon="{ clear }">
          <slot name="clear-icon" :clear="clear" />
        </template>

        <template #append-icon>
          <slot name="append-icon" />
        </template>
      </mp-field-decorator>

      <template #menu>
        <div ref="menuEl" :class="classes(n('scroller'), n('$-elevation--3'))">
          <template v-if="options.length">
            <mp-option
              v-for="option in options"
              :key="option[valueKey]"
              :label="option[labelKey]"
              :value="option[valueKey]"
              :option="option"
              :disabled="option.disabled"
              :ripple="option.ripple"
            />
          </template>
          <slot />
        </div>
      </template>
    </mp-menu>

    <div v-else-if="presentation === 'picker'" :class="n('picker')">
      <mp-field-decorator
        v-bind="{
          value: modelValue,
          size,
          variant,
          placeholder,
          line,
          hint: mergedHint,
          textColor,
          focusColor,
          blurColor,
          isFocusing,
          isError: mergedError,
          formDisabled,
          disabled,
          clearable,
          cursor,
          onClick: handleClick,
          onClear: handleClear,
        }"
      >
        <template v-if="$slots['prepend-icon']" #prepend-icon>
          <slot name="prepend-icon" />
        </template>

        <div
          :class="classes(n('select'), [mergedError, n('--error')], [formDisabled || disabled, n('--disabled')])"
          :style="{
            textAlign,
            color: textColor,
          }"
        >
          <div :class="n('label')">
            <slot v-if="!isEmptyModelValue" name="selected">
              <template v-if="multiple">
                <div v-if="tag" :class="n('tags')">
                  <mp-tag
                    v-for="l in displayLabels"
                    :key="l"
                    round
                    :class="n('tag')"
                    mp-select-cover
                    closable
                    size="sm"
                    :status="mergedError ? 'danger' : 'default'"
                    @click.stop
                    @close="() => handleClose(l)"
                  >
                    <maybe-v-node :is="l" />
                  </mp-tag>
                </div>
                <div v-else :class="n('values')">
                  <template v-for="(l, labelIndex) in displayLabels" :key="l">
                    <maybe-v-node :is="l" />{{ labelIndex !== displayLabels.length - 1 ? separator : '' }}
                  </template>
                </div>
              </template>

              <maybe-v-node :is="displayLabel" v-else />
            </slot>
          </div>

          <span
            v-if="enableCustomPlaceholder"
            :class="classes(n('placeholder'), n('$--ellipsis'))"
            :style="{
              color: placeholderColor,
            }"
          >
            {{ placeholder }}
          </span>

          <slot name="arrow-icon" :focus="isFocusing" :menu-open="show">
            <mp-icon
              :class="classes(n('arrow'), [show, n('--arrow-rotate')])"
              mp-select-cover
              name="menu-down"
              :transition="300"
            />
          </slot>
        </div>

        <template #clear-icon="{ clear }">
          <slot name="clear-icon" :clear="clear" />
        </template>

        <template #append-icon>
          <slot name="append-icon" />
        </template>
      </mp-field-decorator>

      <mp-popup v-model:show="show" position="bottom" v-bind="popupBindingProps">
        <div v-if="multiple" :class="n('picker-panel')">
          <div :class="n('picker-toolbar')">
            <mp-button :class="n('picker-cancel-button')" mp-select-cover text @click="handlePickerMultipleCancel">
              {{ pickerCancelText }}
            </mp-button>
            <div :class="n('picker-title')">{{ pickerTitleText }}</div>
            <mp-button :class="n('picker-done-button')" mp-select-cover text @click="handlePickerMultipleDone">
              {{ pickerDoneText }}
            </mp-button>
          </div>

          <div v-if="pickerDraftLabels.length" :class="n('picker-draft')">
            <mp-tag
              v-for="(l, i) in pickerDraftLabels"
              :key="i"
              round
              :class="n('picker-draft-tag')"
              mp-select-cover
              closable
              size="sm"
              @close="() => handlePickerDraftClose(i)"
            >
              {{ l }}
            </mp-tag>
          </div>

          <mp-picker
            ref="pickerRef"
            v-bind="pickerBindingProps"
            :toolbar="false"
            :columns="pickerColumns"
            :model-value="pickerWheelValue"
            :selected-values="pickerSelectedValues"
            @update:model-value="handlePickerWheelUpdate"
            @confirm="handlePickerConfirm"
          />

          <div :class="n('picker-add')">
            <mp-button
              :class="n('picker-add-button')"
              mp-select-cover
              type="primary"
              block
              @click="handlePickerMultipleAdd"
            >
              {{ pickerAddText }}
            </mp-button>
          </div>
        </div>

        <mp-picker
          v-else
          v-bind="pickerBindingProps"
          :columns="pickerColumns"
          :model-value="pickerValue"
          :selected-values="pickerSelectedValues"
          @confirm="handlePickerConfirm"
          @cancel="handlePickerCancel"
        />
      </mp-popup>
    </div>

    <div v-else :class="n('list')">
      <mp-field-decorator
        v-bind="{
          value: modelValue,
          size,
          variant,
          placeholder,
          line,
          hint: mergedHint,
          textColor,
          focusColor,
          blurColor,
          isFocusing,
          isError: mergedError,
          formDisabled,
          disabled,
          clearable,
          cursor,
          onClick: handleClick,
          onClear: handleClear,
        }"
      >
        <template v-if="$slots['prepend-icon']" #prepend-icon>
          <slot name="prepend-icon" />
        </template>

        <div
          :class="classes(n('select'), [mergedError, n('--error')], [formDisabled || disabled, n('--disabled')])"
          :style="{
            textAlign,
            color: textColor,
          }"
        >
          <div :class="n('label')">
            <slot v-if="!isEmptyModelValue" name="selected">
              <template v-if="multiple">
                <div v-if="tag" :class="n('tags')">
                  <mp-tag
                    v-for="l in displayLabels"
                    :key="l"
                    round
                    :class="n('tag')"
                    mp-select-cover
                    closable
                    size="sm"
                    :status="mergedError ? 'danger' : 'default'"
                    @click.stop
                    @close="() => handleClose(l)"
                  >
                    <maybe-v-node :is="l" />
                  </mp-tag>
                </div>
                <div v-else :class="n('values')">
                  <template v-for="(l, labelIndex) in displayLabels" :key="l">
                    <maybe-v-node :is="l" />{{ labelIndex !== displayLabels.length - 1 ? separator : '' }}
                  </template>
                </div>
              </template>

              <maybe-v-node :is="displayLabel" v-else />
            </slot>
          </div>

          <span
            v-if="enableCustomPlaceholder"
            :class="classes(n('placeholder'), n('$--ellipsis'))"
            :style="{
              color: placeholderColor,
            }"
          >
            {{ placeholder }}
          </span>

          <slot name="arrow-icon" :focus="isFocusing" :menu-open="show">
            <mp-icon
              :class="classes(n('arrow'), [show, n('--arrow-rotate')])"
              mp-select-cover
              name="menu-down"
              :transition="300"
            />
          </slot>
        </div>

        <template #clear-icon="{ clear }">
          <slot name="clear-icon" :clear="clear" />
        </template>

        <template #append-icon>
          <slot name="append-icon" />
        </template>
      </mp-field-decorator>

      <mp-popup v-model:show="show" position="bottom" v-bind="popupBindingProps">
        <div :class="n('list-panel')">
          <div v-if="multiple" :class="n('picker-toolbar')">
            <mp-button :class="n('picker-cancel-button')" mp-select-cover text @click="handlePickerMultipleCancel">
              {{ pickerCancelText }}
            </mp-button>
            <div :class="n('picker-title')">{{ listTitleText }}</div>
            <mp-button :class="n('picker-done-button')" mp-select-cover text @click="handlePickerMultipleDone">
              {{ pickerDoneText }}
            </mp-button>
          </div>
          <div v-else :class="n('list-header')">
            <div :class="n('list-title')">{{ listTitleText }}</div>
            <mp-icon :class="n('list-close')" mp-select-cover name="window-close" @click="handleListClose" />
          </div>

          <div :class="n('list-options')">
            <div
              v-for="option in listSourceOptions"
              :key="option[valueKey]"
              :class="
                classes(
                  n('list-option'),
                  [isListOptionChecked(option), n('list-option--checked')],
                  [option.disabled || option[disabledKey], n('list-option--disabled')],
                )
              "
              @click="handleListOptionClick(option)"
            >
              <span :class="n('list-option-label')">{{ option[labelKey] }}</span>
              <mp-icon
                v-if="isListOptionChecked(option)"
                :class="n('list-option-check')"
                mp-select-cover
                name="check"
              />
            </div>
          </div>
        </div>
      </mp-popup>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { assert, call, doubleRaf, isArray, isEmpty, isFunction, preventDefault } from '@maplejs/maple-shared'
import { useEventListener, useVModel } from '@maplejs/maple-use'
import MpButton from '../button'
import MpFieldDecorator from '../field-decorator'
import { useFormItem } from '../form-item'
import { useForm } from '../form/provide'
import MpIcon from '../icon'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import MpMenu from '../menu'
import MpOption from '../option'
import { type OptionProvider } from '../option/provide'
import { _PickerComponent as MpPicker } from '../picker'
import MpPopup from '../popup'
import MpTag from '../tag'
import { createNamespace, MaybeVNode } from '../utils/components'
import { focusChildElementByKey, toPxNum } from '../utils/elements'
import { normalizeSelectOptionsToPickerColumns, useFieldNames } from '../utils/options'
import { props, type SelectOption } from './props'
import { useOptions, type SelectProvider } from './provide'
import { useSelectController } from './useSelectController'

const { name, n, classes } = createNamespace('select')

export default defineComponent({
  name,
  components: {
    MpIcon,
    MpMenu,
    MpPopup,
    MpPicker,
    MpButton,
    MpTag,
    MpOption,
    MpFieldDecorator,
    MaybeVNode,
  },
  props,
  setup(props) {
    const { t: pt } = injectLocaleProvider()
    const translate = (key: string) => (pt ? pt : t)(key as any)
    const isFocusing = ref(false)
    const show = useVModel(props, 'show', { defaultValue: false })
    const root = ref<HTMLElement | null>(null)
    const pickerRef = ref<InstanceType<typeof MpPicker> | null>(null)
    const pickerDraft = ref<any[]>([])
    const pickerWheelValue = ref<(string | number)[]>([])
    const multiple = computed(() => props.multiple)
    const focusColor = computed(() => props.focusColor)
    const isEmptyModelValue = computed(() => isEmpty(props.modelValue))
    const cursor = computed(() => (props.disabled || props.readonly ? '' : 'pointer'))
    const offsetY = ref(0)
    const { form } = useForm()
    const { mergedError, eventHandlers, hasOuterLabel } = useFormItem()
    const { length, options, bindOptions } = useOptions()
    const fieldNames = useFieldNames(props)
    const { label, labels, computeLabel, getSelectedValue } = useSelectController({
      modelValue: () => props.modelValue,
      multiple: () => props.multiple,
      optionProviders: () => options,
      optionProvidersLength: () => length.value,
    })
    const pickerColumns = computed(() => [normalizeSelectOptionsToPickerColumns(props.options, fieldNames.value)])
    const pickerValue = computed(() => (props.modelValue == null ? [] : [props.modelValue]))
    const isPopupPresentation = computed(() => props.presentation === 'picker' || props.presentation === 'list')
    const valueKey = computed(() => fieldNames.value.value)
    const labelKey = computed(() => fieldNames.value.label)
    const disabledKey = computed(() => fieldNames.value.disabled)
    const listSourceOptions = computed(() => props.options)
    const pickerLabel = computed(() => {
      if (!isPopupPresentation.value || props.multiple) {
        return ''
      }
      return findOptionLabel(props.modelValue)
    })
    const pickerDraftLabels = computed(() => pickerDraft.value.map((value) => findOptionLabel(value)))
    const pickerSelectedValues = computed(() => {
      if (props.multiple) {
        return pickerDraft.value
      }
      return props.modelValue == null ? [] : [props.modelValue]
    })
    const displayLabel = computed(() => (isPopupPresentation.value ? pickerLabel.value : label.value))
    const displayLabels = computed(() => {
      if (isPopupPresentation.value) {
        if (!props.multiple) {
          return []
        }
        const values = isArray(props.modelValue) ? props.modelValue : []
        return values.map((value) => findOptionLabel(value))
      }
      return labels.value
    })
    const pickerBindingProps = computed(() => ({ ...props.pickerProps }))
    const popupBindingProps = computed(() => ({ ...props.popupProps }))
    const pickerTitleText = computed(() => props.pickerProps?.title ?? translate('pickerTitle'))
    const pickerCancelText = computed(() => props.pickerProps?.cancelButtonText ?? translate('pickerCancelButtonText'))
    const pickerAddText = computed(() => translate('cascaderPickerAddButtonText'))
    const pickerDoneText = computed(() => translate('cascaderPickerDoneButtonText'))
    const listTitleText = computed(() => props.pickerProps?.title ?? translate('pickerTitle'))
    const presentation = computed(() => props.presentation)
    const menuEl = ref<HTMLElement | null>(null)
    const placement = computed(() => (props.variant === 'outlined' ? 'bottom' : 'cover-top'))
    const mergedHint = computed(() => {
      if (hasOuterLabel.value) {
        return false
      }

      return props.hint
    })
    const placeholderColor = computed(() => {
      const { blurColor, focusColor } = props

      if (mergedHint.value) {
        return undefined
      }

      if (mergedError.value) {
        return 'var(--mp-field-decorator-error-color)'
      }

      if (isFocusing.value) {
        return focusColor || 'var(--mp-field-decorator-focus-color)'
      }

      return blurColor || 'var(--mp-field-decorator-placeholder-color, var(--mp-field-decorator-blur-color))'
    })
    const enableCustomPlaceholder = computed(() => !mergedHint.value && isEmpty(props.modelValue))

    const selectProvider: SelectProvider = {
      multiple,
      focusColor,
      computeLabel,
      onSelect,
    }

    watch(
      () => props.multiple,
      () => {
        assert(
          props.multiple && isArray(props.modelValue),
          'Select',
          'The modelValue must be an array when multiple is true',
        )
      },
    )

    watch(show, (visible) => {
      if (visible && isPopupPresentation.value && props.multiple) {
        initPickerMultipleDraft()
      }
    })

    bindOptions(selectProvider)

    useEventListener(() => window, 'keydown', handleKeydown)
    useEventListener(() => window, 'keyup', handleKeyup)

    function handleKeydown(event: KeyboardEvent) {
      const { disabled, readonly } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly || !isFocusing.value) {
        return
      }

      const { key } = event

      if (key === ' ' && !show.value) {
        preventDefault(event)
        return
      }

      if (key === 'Escape' && show.value) {
        root.value!.focus()
        preventDefault(event)
        show.value = false
        return
      }

      if (key === 'Tab' && show.value) {
        root.value!.focus()
        preventDefault(event)
        handleBlur()
        return
      }

      if (key === 'Enter' && !show.value) {
        preventDefault(event)
        show.value = true
        return
      }

      if ((key === 'ArrowDown' || key === 'ArrowUp') && show.value && props.presentation === 'menu' && menuEl.value) {
        preventDefault(event)
        focusChildElementByKey(root.value!, menuEl.value, key)
      }
    }

    function handleKeyup(event: KeyboardEvent) {
      const { disabled, readonly } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly || show.value || !isFocusing.value) {
        return
      }

      const { key } = event

      if (key === ' ' && !show.value) {
        preventDefault(event)
        show.value = true
      }
    }

    function handleFocus() {
      const { disabled, readonly, onFocus } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      offsetY.value = toPxNum(props.offsetY)

      focus()
      call(onFocus)
      eventHandlers.value.onFocus?.()
    }

    function handleBlur() {
      const { disabled, readonly, onBlur } = props
      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      blur()
      call(onBlur)
      eventHandlers.value.onBlur?.()
    }

    function handleRootBlur() {
      if (show.value) {
        return
      }

      handleBlur()
    }

    function handleClickOutside() {
      if (!isFocusing.value) {
        return
      }

      handleBlur()
    }

    function findOptionLabel(targetValue: any) {
      const option = props.options.find((item) => item[fieldNames.value.value] === targetValue)
      return option?.[fieldNames.value.label] ?? targetValue ?? ''
    }

    function findOptionByValue(targetValue: any) {
      return props.options.find((item) => item[fieldNames.value.value] === targetValue)
    }

    function handlePickerConfirm(values: (string | number)[], indexes: number[], pickerOptions: any[]) {
      const { disabled, readonly, onChange, onClose } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      // Multiple picker: confirm means "add to draft cart", not commit
      if (props.multiple) {
        addPickerDraftValue(pickerOptions[0]?._raw?.[fieldNames.value.value] ?? values[0])
        return
      }

      const pickedOption = pickerOptions[0]?._raw
      const selectedValue = pickedOption?.[fieldNames.value.value] ?? values[0]

      call(props['onUpdate:modelValue'], selectedValue)
      call(onChange, selectedValue)
      eventHandlers.value.onChange?.()
      call(onClose, selectedValue)
      show.value = false
    }

    function handlePickerCancel(values: (string | number)[], indexes: number[], pickerOptions: any[]) {
      const { disabled, readonly, onClose } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      const pickedOption = pickerOptions[0]?._raw
      call(onClose, pickedOption?.[fieldNames.value.value] ?? values[0])
      show.value = false
    }

    function handlePickerWheelUpdate(values: (string | number)[]) {
      pickerWheelValue.value = values
    }

    function initPickerMultipleDraft() {
      const values = isArray(props.modelValue) ? props.modelValue : []
      pickerDraft.value = [...values]
      const last = values[values.length - 1]
      pickerWheelValue.value = last == null ? [] : [last]
    }

    function addPickerDraftValue(value: string | number | undefined) {
      if (value == null || value === '') {
        return
      }
      const option = findOptionByValue(value)
      if (!option || option.disabled || option[fieldNames.value.disabled]) {
        return
      }
      if (pickerDraft.value.includes(value)) {
        return
      }
      pickerDraft.value.push(value)
    }

    function handlePickerMultipleAdd() {
      const { disabled, readonly } = props
      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }
      pickerRef.value?.confirm()
    }

    function handlePickerMultipleDone() {
      const { disabled, readonly, onChange, onClose } = props
      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }
      const value = [...pickerDraft.value]
      call(props['onUpdate:modelValue'], value)
      call(onChange, value)
      eventHandlers.value.onChange?.()
      call(onClose, value)
      show.value = false
    }

    function handlePickerMultipleCancel() {
      const { disabled, readonly, onClose } = props
      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }
      call(onClose, props.modelValue)
      show.value = false
    }

    function handlePickerDraftClose(index: number) {
      pickerDraft.value.splice(index, 1)
    }

    function isListOptionChecked(option: SelectOption) {
      const value = option[fieldNames.value.value]
      if (props.multiple) {
        return pickerDraft.value.includes(value)
      }
      return props.modelValue === value
    }

    function handleListOptionClick(option: SelectOption) {
      const { disabled, readonly, onChange, onClose } = props

      if (
        form?.disabled.value ||
        form?.readonly.value ||
        disabled ||
        readonly ||
        option.disabled ||
        option[fieldNames.value.disabled]
      ) {
        return
      }

      const value = option[fieldNames.value.value]

      if (props.multiple) {
        const index = pickerDraft.value.indexOf(value)
        if (index >= 0) {
          pickerDraft.value.splice(index, 1)
        } else {
          pickerDraft.value.push(value)
        }
        return
      }

      call(props['onUpdate:modelValue'], value)
      call(onChange, value)
      eventHandlers.value.onChange?.()
      call(onClose, value)
      show.value = false
    }

    function handleListClose() {
      const { disabled, readonly, onClose } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      call(onClose, props.modelValue)
      show.value = false
    }

    function onSelect(option: OptionProvider) {
      const { disabled, readonly, multiple, onChange } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      const selectedValue = getSelectedValue(option)
      call(props['onUpdate:modelValue'], selectedValue)
      call(onChange, selectedValue)
      eventHandlers.value.onChange?.()

      if (!multiple) {
        root.value!.focus()
        doubleRaf().then(() => {
          show.value = false
        })
      }
    }

    function handleClear() {
      const { disabled, readonly, multiple, clearable, onClear, onChange } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly || !clearable) {
        return
      }

      const changedModelValue = multiple ? [] : undefined
      call(props['onUpdate:modelValue'], changedModelValue)
      call(onClear, changedModelValue)
      eventHandlers.value.onClear?.()
      call(onChange, changedModelValue)
      eventHandlers.value.onChange?.()
    }

    function handleClick(e: Event) {
      const { disabled, onClick, readonly } = props

      if (form?.disabled.value || disabled) {
        return
      }

      call(onClick, e)

      if (form?.readonly.value || readonly) {
        return
      }

      if (isPopupPresentation.value) {
        show.value = true
      }
    }

    function handleClose(text: any) {
      const { disabled, readonly, modelValue, onClose, onChange } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      let changedModelValue: any[]
      if (isPopupPresentation.value) {
        const option = props.options.find((item) => item[fieldNames.value.label] === text)
        const optionValue = option?.[fieldNames.value.value]
        changedModelValue = (modelValue as unknown as any[]).filter((value) => value !== optionValue)
      } else {
        const option = options.find(({ label }) => label.value === text)
        changedModelValue = (modelValue as unknown as any[]).filter(
          (value) => value !== (option!.value.value ?? option!.label.value),
        )
      }

      call(props['onUpdate:modelValue'], changedModelValue)
      call(onClose, changedModelValue)
      call(onChange, changedModelValue)
      eventHandlers.value.onChange?.()
    }

    // expose
    function focus() {
      offsetY.value = toPxNum(props.offsetY)
      isFocusing.value = true
    }

    // expose
    function blur() {
      isFocusing.value = false
      show.value = false
    }

    return {
      root,
      offsetY,
      isFocusing,
      show,
      mergedError,
      mergedHint,
      formDisabled: form?.disabled,
      formReadonly: form?.readonly,
      label,
      labels,
      displayLabel,
      displayLabels,
      pickerColumns,
      pickerValue,
      pickerWheelValue,
      pickerDraftLabels,
      pickerSelectedValues,
      pickerRef,
      pickerBindingProps,
      popupBindingProps,
      pickerTitleText,
      pickerCancelText,
      pickerAddText,
      pickerDoneText,
      listTitleText,
      listSourceOptions,
      valueKey,
      labelKey,
      disabledKey,
      isEmptyModelValue,
      menuEl,
      placement,
      cursor,
      placeholderColor,
      enableCustomPlaceholder,
      presentation,
      n,
      classes,
      isListOptionChecked,
      handleFocus,
      handleBlur,
      handleClickOutside,
      handleClear,
      handleClick,
      handleClose,
      handleRootBlur,
      handlePickerConfirm,
      handlePickerCancel,
      handlePickerWheelUpdate,
      handlePickerMultipleAdd,
      handlePickerMultipleDone,
      handlePickerMultipleCancel,
      handlePickerDraftClose,
      handleListOptionClick,
      handleListClose,
      focus,
      blur,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../styles/elevation';
@import '../icon/icon';
@import '../button/button';
@import '../menu/menu';
@import '../field-decorator/fieldDecorator';
@import '../tag/tag';
@import '../option/option';
@import '../popup/popup';
@import '../picker/picker';
@import './select';
</style>
