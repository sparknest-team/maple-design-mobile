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
      mp-cascader-cover
      same-width
      :class="n('menu')"
      close-on-click-reference
      :close-on-key-escape="false"
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
          :style="{ color: textColor }"
        >
          <div :class="n('label')">
            <slot v-if="!isEmptyModelValue" name="selected">
              <template v-if="multiple">
                <div v-if="tag" :class="n('tags')">
                  <mp-tag
                    v-for="(l, i) in displayLabels"
                    :key="i"
                    round
                    :class="n('tag')"
                    mp-cascader-cover
                    closable
                    size="sm"
                    :status="mergedError ? 'danger' : 'default'"
                    @click.stop
                    @close="() => handleClose(i)"
                  >
                    <maybe-v-node :is="l" />
                  </mp-tag>
                </div>
                <div v-else :class="n('values')">
                  <template v-for="(l, i) in displayLabels" :key="i">
                    <maybe-v-node :is="l" />{{ i !== displayLabels.length - 1 ? separator : '' }}
                  </template>
                </div>
              </template>

              <maybe-v-node :is="displayLabel" v-else />
            </slot>
          </div>

          <span
            v-if="enableCustomPlaceholder"
            :class="classes(n('placeholder'), n('$--ellipsis'))"
            :style="{ color: placeholderColor }"
          >
            {{ placeholder }}
          </span>

          <slot name="arrow-icon" :focus="isFocusing" :menu-open="show">
            <mp-icon
              :class="classes(n('arrow'), [show, n('--arrow-rotate')])"
              mp-cascader-cover
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
        <div ref="menuEl" :class="classes(n('panel'), n('$-elevation--3'))">
          <div v-for="(column, columnIndex) in menuColumns" :key="columnIndex" :class="n('column')">
            <div
              v-for="option in column"
              :key="option[optionValueKey]"
              :class="
                classes(
                  n('option'),
                  [isOptionSelected(option, columnIndex), n('--selected')],
                  [isOptionHighlighted(option, columnIndex), n('--highlighted')],
                  [isOptionChecked(option, columnIndex), n('--checked')],
                  [option[optionDisabledKey], n('--disabled')],
                )
              "
              @click="handleMenuOptionClick(option, columnIndex)"
            >
              <div
                :class="classes(n('option-cover'), [isOptionSelected(option, columnIndex), n('--selected-background')])"
              ></div>
              <mp-hover-overlay
                :hovering="isOptionHighlighted(option, columnIndex) || isOptionActive(option, columnIndex)"
              />
              <mp-checkbox
                v-if="multiple"
                :model-value="isOptionChecked(option, columnIndex)"
                :indeterminate="isOptionIndeterminate(option, columnIndex)"
                :disabled="option[optionDisabledKey]"
                @click.stop
                @update:model-value="() => handleCheckboxChange(option, columnIndex)"
                @update:indeterminate="() => {}"
              />
              <slot
                name="option"
                :option="option"
                :active="isOptionActive(option, columnIndex)"
                :selected="isOptionSelected(option, columnIndex)"
                :highlighted="isOptionHighlighted(option, columnIndex)"
              >
                <span :class="n('option-label')">{{ option[optionLabelKey] }}</span>
              </slot>
              <mp-icon v-if="!isLeaf(option)" :class="n('option-arrow')" mp-cascader-cover name="chevron-right" />
            </div>
          </div>
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
          :style="{ color: textColor }"
        >
          <div :class="n('label')">
            <slot v-if="!isEmptyModelValue" name="selected">
              <template v-if="multiple">
                <div v-if="tag" :class="n('tags')">
                  <mp-tag
                    v-for="(l, i) in displayLabels"
                    :key="i"
                    round
                    :class="n('tag')"
                    mp-cascader-cover
                    closable
                    size="sm"
                    :status="mergedError ? 'danger' : 'default'"
                    @click.stop
                    @close="() => handleClose(i)"
                  >
                    <maybe-v-node :is="l" />
                  </mp-tag>
                </div>
                <div v-else :class="n('values')">
                  <template v-for="(l, i) in displayLabels" :key="i">
                    <maybe-v-node :is="l" />{{ i !== displayLabels.length - 1 ? separator : '' }}
                  </template>
                </div>
              </template>

              <maybe-v-node :is="displayLabel" v-else />
            </slot>
          </div>

          <span
            v-if="enableCustomPlaceholder"
            :class="classes(n('placeholder'), n('$--ellipsis'))"
            :style="{ color: placeholderColor }"
          >
            {{ placeholder }}
          </span>

          <slot name="arrow-icon" :focus="isFocusing" :menu-open="show">
            <mp-icon
              :class="classes(n('arrow'), [show, n('--arrow-rotate')])"
              mp-cascader-cover
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
            <mp-button :class="n('picker-cancel-button')" mp-cascader-cover text @click="handlePickerMultipleCancel">
              {{ pickerCancelText }}
            </mp-button>
            <div :class="n('picker-title')">{{ pickerTitleText }}</div>
            <mp-button :class="n('picker-done-button')" mp-cascader-cover text @click="handlePickerMultipleDone">
              {{ pickerDoneText }}
            </mp-button>
          </div>

          <div v-if="pickerDraftLabels.length" :class="n('picker-draft')">
            <mp-tag
              v-for="(l, i) in pickerDraftLabels"
              :key="i"
              round
              :class="n('picker-draft-tag')"
              mp-cascader-cover
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
            cascade
            :columns="options"
            :text-key="optionLabelKey"
            :value-key="optionValueKey"
            :children-key="optionChildrenKey"
            :model-value="pickerWheelValue"
            :selected-values="pickerSelectedValues"
            @update:model-value="handlePickerWheelUpdate"
            @confirm="handlePickerConfirm"
          />

          <div :class="n('picker-add')">
            <mp-button
              :class="n('picker-add-button')"
              mp-cascader-cover
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
          cascade
          :columns="options"
          :text-key="optionLabelKey"
          :value-key="optionValueKey"
          :children-key="optionChildrenKey"
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
          :style="{ color: textColor }"
        >
          <div :class="n('label')">
            <slot v-if="!isEmptyModelValue" name="selected">
              <template v-if="multiple">
                <div v-if="tag" :class="n('tags')">
                  <mp-tag
                    v-for="(l, i) in displayLabels"
                    :key="i"
                    round
                    :class="n('tag')"
                    mp-cascader-cover
                    closable
                    size="sm"
                    :status="mergedError ? 'danger' : 'default'"
                    @click.stop
                    @close="() => handleClose(i)"
                  >
                    <maybe-v-node :is="l" />
                  </mp-tag>
                </div>
                <div v-else :class="n('values')">
                  <template v-for="(l, i) in displayLabels" :key="i">
                    <maybe-v-node :is="l" />{{ i !== displayLabels.length - 1 ? separator : '' }}
                  </template>
                </div>
              </template>

              <maybe-v-node :is="displayLabel" v-else />
            </slot>
          </div>

          <span
            v-if="enableCustomPlaceholder"
            :class="classes(n('placeholder'), n('$--ellipsis'))"
            :style="{ color: placeholderColor }"
          >
            {{ placeholder }}
          </span>

          <slot name="arrow-icon" :focus="isFocusing" :menu-open="show">
            <mp-icon
              :class="classes(n('arrow'), [show, n('--arrow-rotate')])"
              mp-cascader-cover
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
            <mp-button :class="n('picker-cancel-button')" mp-cascader-cover text @click="handlePickerMultipleCancel">
              {{ pickerCancelText }}
            </mp-button>
            <div :class="n('picker-title')">{{ listTitleText }}</div>
            <mp-button :class="n('picker-done-button')" mp-cascader-cover text @click="handlePickerMultipleDone">
              {{ pickerDoneText }}
            </mp-button>
          </div>
          <div v-else :class="n('list-header')">
            <div :class="n('list-title')">{{ listTitleText }}</div>
            <mp-icon :class="n('list-close')" mp-cascader-cover name="window-close" @click="handleListClose" />
          </div>

          <div v-if="multiple && pickerDraftLabels.length" :class="n('picker-draft')">
            <mp-tag
              v-for="(l, i) in pickerDraftLabels"
              :key="i"
              round
              :class="n('picker-draft-tag')"
              mp-cascader-cover
              closable
              size="sm"
              @close="() => handlePickerDraftClose(i)"
            >
              {{ l }}
            </mp-tag>
          </div>

          <div :class="n('list-tabs')">
            <div
              v-for="(tab, i) in listTabs"
              :key="i"
              :class="classes(n('list-tab'), [listActiveTab === i, n('list-tab--active')])"
              @click="handleListTabClick(i)"
            >
              {{ tab.label }}
            </div>
          </div>

          <div :class="n('list-options')">
            <div
              v-for="option in listOptions"
              :key="option[optionValueKey]"
              :class="
                classes(
                  n('list-option'),
                  [isListOptionChecked(option), n('list-option--checked')],
                  [option[optionDisabledKey], n('list-option--disabled')],
                )
              "
              @click="handleListOptionClick(option)"
            >
              <span :class="n('list-option-label')">{{ option[optionLabelKey] }}</span>
              <mp-icon
                v-if="isListOptionChecked(option)"
                :class="n('list-option-check')"
                mp-cascader-cover
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
import { call, doubleRaf, isArray, isEmpty, preventDefault } from '@maplejs/maple-shared'
import { useEventListener, useVModel } from '@maplejs/maple-use'
import MpButton from '../button'
import MpCheckbox from '../checkbox'
import MpFieldDecorator from '../field-decorator'
import { useFormItem } from '../form-item'
import { useForm } from '../form/provide'
import MpHoverOverlay from '../hover-overlay'
import MpIcon from '../icon'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import MpMenu from '../menu'
import { _PickerComponent as MpPicker } from '../picker'
import MpPopup from '../popup'
import MpTag from '../tag'
import { createNamespace, MaybeVNode } from '../utils/components'
import { focusChildElementByKey, toPxNum } from '../utils/elements'
import { useFieldNames } from '../utils/options'
import { props, type CascaderOption } from './props'

const { name, n, classes } = createNamespace('cascader')

export default defineComponent({
  name,
  components: {
    MpIcon,
    MpMenu,
    MpPopup,
    MpPicker,
    MpButton,
    MpTag,
    MpCheckbox,
    MpHoverOverlay,
    MpFieldDecorator,
    MaybeVNode,
  },
  props,
  setup(props) {
    const { t: pt } = injectLocaleProvider()
    const isFocusing = ref(false)
    const show = useVModel(props, 'show', { defaultValue: false })
    const root = ref<HTMLElement | null>(null)
    const pickerRef = ref<InstanceType<typeof MpPicker> | null>(null)
    const pickerDraft = ref<any[]>([])
    const pickerWheelValue = ref<(string | number)[]>([])
    const listNavPath = ref<any[]>([])
    const listActiveTab = ref(0)
    const cursor = computed(() => (props.disabled || props.readonly ? '' : 'pointer'))
    const offsetY = ref(0)
    const { form } = useForm()
    const { mergedError, eventHandlers, hasOuterLabel } = useFormItem()
    const fieldNames = useFieldNames(props)
    const optionLabelKey = computed(() => fieldNames.value.label)
    const optionValueKey = computed(() => fieldNames.value.value)
    const optionChildrenKey = computed(() => fieldNames.value.children)
    const optionDisabledKey = computed(() => fieldNames.value.disabled)
    const menuEl = ref<HTMLElement | null>(null)
    const placement = computed(() => (props.variant === 'outlined' ? 'bottom' : 'cover-top'))
    const mergedHint = computed(() => (hasOuterLabel.value ? false : props.hint))
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
    const isEmptyModelValue = computed(() => isEmpty(props.modelValue))

    const pickerBindingProps = computed(() => ({ ...props.pickerProps }))
    const popupBindingProps = computed(() => ({ ...props.popupProps }))
    const pickerTitleText = computed(() => props.pickerProps?.title ?? (pt ? pt : t)('pickerTitle'))
    const pickerCancelText = computed(
      () => props.pickerProps?.cancelButtonText ?? (pt ? pt : t)('pickerCancelButtonText'),
    )
    const pickerAddText = computed(() => (pt ? pt : t)('cascaderPickerAddButtonText'))
    const pickerDoneText = computed(() => (pt ? pt : t)('cascaderPickerDoneButtonText'))
    const listTitleText = computed(() => props.pickerProps?.title ?? (pt ? pt : t)('pickerTitle'))
    const listPleaseSelectText = computed(() => (pt ? pt : t)('pickerTitle'))

    const enhancedOptions = computed(() => enhanceOptions(props.options, fieldNames.value))
    const expandedPath = ref<any[]>([])

    const activePath = computed(() => expandedPath.value)

    const menuColumns = computed(() => {
      const columns: CascaderOption[][] = []
      let currentOptions = props.options
      let index = 0

      while (currentOptions?.length) {
        columns.push(currentOptions)
        const activeValue = activePath.value[index]
        const activeOption = currentOptions.find((option) => option[fieldNames.value.value] === activeValue)
        currentOptions = activeOption?.[fieldNames.value.children] ?? []
        index++
      }

      return columns
    })

    const pickerValue = computed(() => normalizePickerValue(props.modelValue))

    const pickerDraftLabels = computed(() => {
      return pickerDraft.value.map((item) => {
        const path =
          props.pathMode && isArray(item) ? item : getPathByValue(item, enhancedOptions.value, fieldNames.value, false)
        return getLabelsByPath(path, enhancedOptions.value, fieldNames.value).join(' / ')
      })
    })

    const pickerSelectedValues = computed(() => {
      const values = new Set<string | number>()
      const pushLeafValue = (path: any[]) => {
        if (!path.length) {
          return
        }
        const option = getOptionByPath(path)
        if (option && isLeaf(option)) {
          values.add(path[path.length - 1])
        }
      }

      if (props.multiple) {
        pickerDraft.value.forEach((item) => {
          const path =
            props.pathMode && isArray(item)
              ? item
              : getPathByValue(item, enhancedOptions.value, fieldNames.value, false)
          pushLeafValue(path)
        })
        return [...values]
      }

      const path = getPathByValue(props.modelValue, enhancedOptions.value, fieldNames.value, props.pathMode)
      pushLeafValue(path)
      return [...values]
    })

    const listTabs = computed(() => {
      const tabs: { label: string; value?: any; isPlaceholder?: boolean }[] = []
      let currentOptions = props.options
      for (let i = 0; i < listNavPath.value.length; i++) {
        const value = listNavPath.value[i]
        const option = currentOptions.find((item) => item[fieldNames.value.value] === value)
        if (!option) {
          break
        }
        tabs.push({
          label: String(option[fieldNames.value.label] ?? value),
          value,
        })
        currentOptions = option[fieldNames.value.children] ?? []
      }
      const lastOption = listNavPath.value.length ? getOptionByPath(listNavPath.value) : undefined
      const needPlaceholder =
        !listNavPath.value.length ||
        Boolean(lastOption && !isLeaf(lastOption) && (lastOption[fieldNames.value.children]?.length ?? 0) > 0)
      if (needPlaceholder) {
        tabs.push({
          label: listPleaseSelectText.value,
          isPlaceholder: true,
        })
      }
      return tabs
    })

    const listOptions = computed(() => {
      let currentOptions = props.options
      for (let i = 0; i < listActiveTab.value; i++) {
        const value = listNavPath.value[i]
        const option = currentOptions.find((item) => item[fieldNames.value.value] === value)
        currentOptions = option?.[fieldNames.value.children] ?? []
      }
      return currentOptions
    })

    const displayLabel = computed(() => {
      if (props.multiple) {
        return ''
      }
      const path = getPathByValue(props.modelValue, enhancedOptions.value, fieldNames.value, props.pathMode)
      const labels = getLabelsByPath(path, enhancedOptions.value, fieldNames.value)
      return labels.join(' / ')
    })

    const displayLabels = computed(() => {
      if (!props.multiple) {
        return []
      }
      const values = props.modelValue ?? []
      if (!isArray(values)) {
        return []
      }
      if (props.pathMode) {
        return values
          .filter(isArray)
          .map((path: any[]) => getLabelsByPath(path, enhancedOptions.value, fieldNames.value).join(' / '))
      }
      return values.map((leaf: any) => {
        const path = getPathByValue(leaf, enhancedOptions.value, fieldNames.value, false)
        return getLabelsByPath(path, enhancedOptions.value, fieldNames.value).join(' / ')
      })
    })

    watch(
      () => props.modelValue,
      (value) => {
        if (props.presentation !== 'menu') {
          return
        }
        expandedPath.value = getPathByValue(value, enhancedOptions.value, fieldNames.value, props.pathMode)
      },
      { immediate: true, deep: true },
    )

    watch(
      () => props.multiple,
      () => {
        if (props.multiple && !isArray(props.modelValue)) {
          call(props['onUpdate:modelValue'], [])
        }
      },
    )

    watch(show, (visible) => {
      if (!visible) {
        return
      }
      if (props.presentation === 'picker' && props.multiple) {
        initPickerMultipleDraft()
      }
      if (props.presentation === 'list') {
        if (props.multiple) {
          initPickerMultipleDraft()
        }
        initListNav()
      }
    })

    useEventListener(() => window, 'keydown', handleKeydown)
    useEventListener(() => window, 'keyup', handleKeyup)

    function enhanceOptions(options: CascaderOption[], fieldNameMap: any, parent?: CascaderOption) {
      return options.map((option) => {
        const enhanced = { ...option, _parent: parent, _raw: option }
        const children = option[fieldNameMap.children]
        if (isArray(children) && children.length) {
          enhanced[fieldNameMap.children] = enhanceOptions(children, fieldNameMap, enhanced)
        }
        return enhanced
      })
    }

    function getPathByValue(value: any, options: CascaderOption[], fieldNameMap: any, pathMode: boolean): any[] {
      if (value == null || value === '') {
        return []
      }
      if (pathMode && isArray(value)) {
        return value
      }
      const target = pathMode ? value[value.length - 1] : value
      if (target == null) {
        return []
      }

      function findLeaf(list: CascaderOption[]): CascaderOption | undefined {
        for (const option of list) {
          if (option[fieldNameMap.value] === target) {
            return option
          }
          const children = option[fieldNameMap.children]
          if (isArray(children) && children.length) {
            const found = findLeaf(children)
            if (found) {
              return found
            }
          }
        }
      }

      const leaf = findLeaf(options)
      if (!leaf) {
        return []
      }
      const path: any[] = []
      let current: any = leaf
      while (current) {
        path.unshift(current[fieldNameMap.value])
        current = current._parent
      }
      return path
    }

    function getLabelsByPath(path: any[], options: CascaderOption[], fieldNameMap: any): string[] {
      const labels: string[] = []
      let currentOptions = options
      for (const value of path) {
        const option = currentOptions.find((o) => o[fieldNameMap.value] === value)
        if (!option) {
          break
        }
        labels.push(option[fieldNameMap.label])
        currentOptions = option[fieldNameMap.children] ?? []
      }
      return labels
    }

    function normalizePickerValue(value: any): any[] {
      if (props.pathMode && isArray(value)) {
        return value
      }
      return getPathByValue(value, enhancedOptions.value, fieldNames.value, props.pathMode)
    }

    function isOptionActive(option: CascaderOption, columnIndex: number) {
      // Navigating path highlight, excluding the actually selected node
      if (isOptionSelected(option, columnIndex)) {
        return false
      }
      return activePath.value[columnIndex] === option[fieldNames.value.value]
    }

    function getSelectedPath() {
      return getPathByValue(props.modelValue, enhancedOptions.value, fieldNames.value, props.pathMode)
    }

    // Directly selected node only (leaf, or checkStrictly selected node)
    function isOptionSelected(option: CascaderOption, columnIndex: number) {
      if (props.multiple || props.presentation === 'picker' || props.presentation === 'list') {
        return false
      }
      const selectedPath = getSelectedPath()
      if (!selectedPath.length) {
        return false
      }
      const selectedIndex = selectedPath.length - 1
      return columnIndex === selectedIndex && selectedPath[columnIndex] === option[fieldNames.value.value]
    }

    // Ancestors on the selected path (indirect), same as MenuSelect highlight
    function isOptionHighlighted(option: CascaderOption, columnIndex: number) {
      if (props.multiple || props.presentation === 'picker' || props.presentation === 'list') {
        return false
      }
      const selectedPath = getSelectedPath()
      if (selectedPath.length <= 1) {
        return false
      }
      return columnIndex < selectedPath.length - 1 && selectedPath[columnIndex] === option[fieldNames.value.value]
    }

    function isLeaf(option: CascaderOption) {
      const children = option[fieldNames.value.children]
      return !isArray(children) || children.length === 0
    }

    function getOptionPath(option: CascaderOption, columnIndex: number) {
      const path = expandedPath.value.slice(0, columnIndex)
      path.push(option[fieldNames.value.value])
      return path
    }

    function pathEquals(a: any[], b: any[]) {
      return isArray(a) && isArray(b) && a.length === b.length && a.every((item, index) => item === b[index])
    }

    function collectLeafPaths(option: CascaderOption, basePath: any[]): any[][] {
      const children = option[fieldNames.value.children]
      if (!isArray(children) || children.length === 0) {
        return [basePath]
      }
      return children.flatMap((child: CascaderOption) =>
        collectLeafPaths(child, [...basePath, child[fieldNames.value.value]]),
      )
    }

    function isPathSelected(path: any[]) {
      const values = isArray(props.modelValue) ? props.modelValue : []
      if (props.pathMode) {
        return values.some((item) => pathEquals(item, path))
      }
      return values.includes(path[path.length - 1])
    }

    function isOptionChecked(option: CascaderOption, columnIndex: number) {
      if (!props.multiple) {
        return false
      }
      const basePath = getOptionPath(option, columnIndex)
      if (props.checkStrictly || isLeaf(option)) {
        return isPathSelected(basePath)
      }
      const leafPaths = collectLeafPaths(option, basePath)
      return leafPaths.length > 0 && leafPaths.every((path) => isPathSelected(path))
    }

    function isOptionIndeterminate(option: CascaderOption, columnIndex: number) {
      if (!props.multiple || props.checkStrictly || isLeaf(option)) {
        return false
      }
      const basePath = getOptionPath(option, columnIndex)
      const leafPaths = collectLeafPaths(option, basePath)
      const selectedCount = leafPaths.filter((path) => isPathSelected(path)).length
      return selectedCount > 0 && selectedCount < leafPaths.length
    }

    function togglePaths(paths: any[][], checked: boolean) {
      let currentValues = isArray(props.modelValue) ? [...props.modelValue] : []

      if (props.pathMode) {
        if (checked) {
          paths.forEach((path) => {
            if (!currentValues.some((item) => pathEquals(item, path))) {
              currentValues.push(path)
            }
          })
        } else {
          currentValues = currentValues.filter((item) => !paths.some((path) => pathEquals(item, path)))
        }
      } else {
        const leaves = paths.map((path) => path[path.length - 1])
        if (checked) {
          leaves.forEach((leaf) => {
            if (!currentValues.includes(leaf)) {
              currentValues.push(leaf)
            }
          })
        } else {
          currentValues = currentValues.filter((item) => !leaves.includes(item))
        }
      }

      call(props['onUpdate:modelValue'], currentValues)
      call(props.onChange, currentValues)
      eventHandlers.value.onChange?.()
    }

    function handleCheckboxChange(option: CascaderOption, columnIndex: number) {
      const { disabled, readonly } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      if (option[fieldNames.value.disabled]) {
        return
      }

      const basePath = getOptionPath(option, columnIndex)
      expandedPath.value = basePath

      const paths = props.checkStrictly || isLeaf(option) ? [basePath] : collectLeafPaths(option, basePath)

      const checked = isOptionChecked(option, columnIndex)
      const indeterminate = isOptionIndeterminate(option, columnIndex)
      // Indeterminate -> clear; checked -> clear; unchecked -> select
      togglePaths(paths, !(checked || indeterminate))
    }

    function handleMenuOptionClick(option: CascaderOption, columnIndex: number) {
      const { disabled, readonly, multiple, checkStrictly, onChange, onClose } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      if (option[fieldNames.value.disabled]) {
        return
      }

      const nextPath = expandedPath.value.slice(0, columnIndex)
      nextPath.push(option[fieldNames.value.value])
      expandedPath.value = nextPath

      if (multiple) {
        // Parent nodes only expand; leaves (or checkStrictly) toggle selection
        if (checkStrictly || isLeaf(option)) {
          handleCheckboxChange(option, columnIndex)
        }
        return
      }

      // Non-leaf nodes only expand the next column unless checkStrictly
      if (!(checkStrictly || isLeaf(option))) {
        return
      }

      const value = props.pathMode ? nextPath : nextPath[nextPath.length - 1]
      call(props['onUpdate:modelValue'], value)
      call(onChange, value)
      eventHandlers.value.onChange?.()
      call(onClose, value)
      root.value?.focus()
      doubleRaf().then(() => {
        show.value = false
      })
    }

    function handlePickerConfirm(values: (string | number)[], indexes: number[], pickerOptions: any[]) {
      const { disabled, readonly, onChange, onClose } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      // Multiple picker: confirm means "add to draft cart", not commit
      if (props.multiple) {
        addPickerDraftPath(values)
        return
      }

      const value = props.pathMode ? values : values[values.length - 1]
      call(props['onUpdate:modelValue'], value)
      call(onChange, value)
      eventHandlers.value.onChange?.()
      call(onClose, value)
      show.value = false
    }

    function handlePickerCancel() {
      const { disabled, readonly, onClose } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      call(onClose, props.modelValue)
      show.value = false
    }

    function handlePickerWheelUpdate(values: (string | number)[]) {
      pickerWheelValue.value = values
    }

    function initPickerMultipleDraft() {
      const values = isArray(props.modelValue) ? props.modelValue : []
      pickerDraft.value = values.map((item) => (isArray(item) ? [...item] : item))
      const last = values[values.length - 1]
      if (last == null) {
        pickerWheelValue.value = []
        return
      }
      pickerWheelValue.value =
        props.pathMode && isArray(last)
          ? [...last]
          : getPathByValue(last, enhancedOptions.value, fieldNames.value, false)
    }

    function toPickerCommittedValue(path: (string | number)[]) {
      return props.pathMode ? [...path] : path[path.length - 1]
    }

    function getOptionByPath(path: (string | number)[]) {
      let currentOptions = props.options
      let option: CascaderOption | undefined
      for (const value of path) {
        option = currentOptions.find((item) => item[fieldNames.value.value] === value)
        if (!option) {
          return undefined
        }
        currentOptions = option[fieldNames.value.children] ?? []
      }
      return option
    }

    function isAddablePickerPath(path: (string | number)[]) {
      if (!path.length) {
        return false
      }
      const option = getOptionByPath(path)
      if (!option || option[fieldNames.value.disabled]) {
        return false
      }
      return props.checkStrictly || isLeaf(option)
    }

    function isPickerDraftDuplicate(path: (string | number)[]) {
      const next = toPickerCommittedValue(path)
      return pickerDraft.value.some((item) => {
        if (props.pathMode) {
          return pathEquals(item, next as any[])
        }
        return item === next
      })
    }

    function addPickerDraftPath(path: (string | number)[]) {
      if (!isAddablePickerPath(path) || isPickerDraftDuplicate(path)) {
        return
      }
      pickerDraft.value.push(toPickerCommittedValue(path))
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
      handlePickerCancel()
    }

    function handlePickerDraftClose(index: number) {
      pickerDraft.value.splice(index, 1)
    }

    function initListNav() {
      let path: any[] = []
      if (props.multiple) {
        const last = pickerDraft.value[pickerDraft.value.length - 1]
        if (last != null) {
          path =
            props.pathMode && isArray(last)
              ? [...last]
              : getPathByValue(last, enhancedOptions.value, fieldNames.value, false)
        }
      } else {
        path = getPathByValue(props.modelValue, enhancedOptions.value, fieldNames.value, props.pathMode)
      }
      listNavPath.value = path
      listActiveTab.value = path.length ? path.length - 1 : 0
      // if last is non-leaf with children, move to next (placeholder) tab
      const lastOption = path.length ? getOptionByPath(path) : undefined
      if (lastOption && !isLeaf(lastOption) && (lastOption[fieldNames.value.children]?.length ?? 0) > 0) {
        listActiveTab.value = path.length
      }
    }

    function handleListTabClick(index: number) {
      const tab = listTabs.value[index]
      if (tab?.isPlaceholder) {
        listNavPath.value = listNavPath.value.slice(0, index)
      } else {
        listNavPath.value = listNavPath.value.slice(0, index + 1)
      }
      listActiveTab.value = index
    }

    function handleListOptionClick(option: CascaderOption) {
      const { disabled, readonly, onChange, onClose } = props
      if (form?.disabled.value || form?.readonly.value || disabled || readonly || option[fieldNames.value.disabled]) {
        return
      }

      const nextPath = [...listNavPath.value.slice(0, listActiveTab.value), option[fieldNames.value.value]]

      if (!(props.checkStrictly || isLeaf(option))) {
        listNavPath.value = nextPath
        listActiveTab.value = nextPath.length
        return
      }

      listNavPath.value = nextPath
      listActiveTab.value = Math.max(0, nextPath.length - 1)

      if (props.multiple) {
        toggleListDraftPath(nextPath)
        return
      }

      const value = props.pathMode ? [...nextPath] : nextPath[nextPath.length - 1]
      call(props['onUpdate:modelValue'], value)
      call(onChange, value)
      eventHandlers.value.onChange?.()
      call(onClose, value)
      show.value = false
    }

    function isListOptionChecked(option: CascaderOption) {
      const path = [...listNavPath.value.slice(0, listActiveTab.value), option[fieldNames.value.value]]
      if (!(props.checkStrictly || isLeaf(option))) {
        return false
      }
      const committed = toPickerCommittedValue(path)
      if (props.multiple) {
        return pickerDraft.value.some((item) => {
          if (props.pathMode) {
            return pathEquals(item, committed as any[])
          }
          return item === committed
        })
      }
      if (props.pathMode) {
        return pathEquals(props.modelValue, committed as any[])
      }
      return props.modelValue === committed
    }

    function toggleListDraftPath(path: (string | number)[]) {
      if (!isAddablePickerPath(path)) {
        return
      }
      const committed = toPickerCommittedValue(path)
      const index = pickerDraft.value.findIndex((item) => {
        if (props.pathMode) {
          return pathEquals(item, committed as any[])
        }
        return item === committed
      })
      if (index >= 0) {
        pickerDraft.value.splice(index, 1)
        return
      }
      pickerDraft.value.push(committed)
    }

    function handleListClose() {
      handlePickerCancel()
    }

    function handleFocus() {
      const { disabled, readonly, onFocus } = props
      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }
      offsetY.value = toPxNum(0)
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

    function handleClick(e: Event) {
      const { disabled, onClick, readonly } = props
      if (form?.disabled.value || disabled) {
        return
      }
      call(onClick, e)
      if (form?.readonly.value || readonly) {
        return
      }
      if (props.presentation === 'picker' || props.presentation === 'list') {
        show.value = true
      }
    }

    function handleClear() {
      const { disabled, readonly, clearable, onClear, onChange } = props
      if (form?.disabled.value || form?.readonly.value || disabled || readonly || !clearable) {
        return
      }
      const changedModelValue = props.multiple ? [] : undefined
      expandedPath.value = []
      call(props['onUpdate:modelValue'], changedModelValue)
      call(onClear, changedModelValue)
      eventHandlers.value.onClear?.()
      call(onChange, changedModelValue)
      eventHandlers.value.onChange?.()
    }

    function handleClose(index: number) {
      const { disabled, readonly, onClose, onChange } = props
      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }
      const currentValues = (props.modelValue ?? []).filter(isArray)
      const changedModelValue = currentValues.filter((_, i) => i !== index)
      call(props['onUpdate:modelValue'], changedModelValue)
      call(onClose, changedModelValue)
      call(onChange, changedModelValue)
      eventHandlers.value.onChange?.()
    }

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

    // expose
    function focus() {
      offsetY.value = toPxNum(0)
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
      displayLabel,
      displayLabels,
      isEmptyModelValue,
      menuEl,
      placement,
      cursor,
      placeholderColor,
      enableCustomPlaceholder,
      fieldNames,
      optionLabelKey,
      optionValueKey,
      optionChildrenKey,
      optionDisabledKey,
      menuColumns,
      pickerRef,
      pickerValue,
      pickerWheelValue,
      pickerDraftLabels,
      pickerSelectedValues,
      pickerTitleText,
      pickerCancelText,
      pickerAddText,
      pickerDoneText,
      listTitleText,
      listTabs,
      listOptions,
      listActiveTab,
      pickerBindingProps,
      popupBindingProps,
      isOptionActive,
      isOptionSelected,
      isOptionHighlighted,
      isOptionChecked,
      isOptionIndeterminate,
      isListOptionChecked,
      isLeaf,
      n,
      classes,
      handleFocus,
      handleBlur,
      handleClickOutside,
      handleClear,
      handleClick,
      handleClose,
      handleRootBlur,
      handleMenuOptionClick,
      handleCheckboxChange,
      handlePickerConfirm,
      handlePickerCancel,
      handlePickerWheelUpdate,
      handlePickerMultipleAdd,
      handlePickerMultipleDone,
      handlePickerMultipleCancel,
      handlePickerDraftClose,
      handleListTabClick,
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
@import '../menu/menu';
@import '../field-decorator/fieldDecorator';
@import '../button/button';
@import '../tag/tag';
@import '../checkbox/checkbox';
@import '../hover-overlay/hoverOverlay';
@import '../popup/popup';
@import '../picker/picker';
@import './cascader';
</style>
