import { defineComponent, reactive, ref, type StyleValue } from 'vue'
import type { SelectionFieldItem } from '../_components/selection-field/props'
import SelectionField from '../_components/selection-field/SelectionField.vue'
import { isFunction } from '../_utils/is'
import InputFeedback from '../input/InputFeedback.vue'
import { createNamespace } from '../utils/components'
import { selectEmits } from './emits'
import { presentations } from './presentations'
import { selectProps } from './props'
import SelectMenu from './SelectMenu'
import { useSelectController } from './use-select-controller'

export default defineComponent({
  name: createNamespace('select').name,
  inheritAttrs: false,
  props: selectProps,
  emits: selectEmits,
  setup(props, context) {
    const { slots, attrs, emit, expose } = context
    const { n, classes } = createNamespace('select')
    const controller = reactive(useSelectController(props, context))
    const fieldRef = ref<InstanceType<typeof SelectionField>>()
    expose({ focus: () => fieldRef.value?.focus(), blur: () => fieldRef.value?.blur() })
    const renderLabel = ({ data }: { data: SelectionFieldItem }) => {
      if ((slots.label || isFunction(props.formatLabel)) && data) {
        const optionInfo = controller.optionInfoMap.get(String(data.key))
        if (optionInfo?.raw) {
          return slots.label?.({ data: optionInfo.raw }) ?? props.formatLabel?.(optionInfo.raw)
        }
      }
      return data?.label ?? ''
    }

    return () => {
      const { class: className, style, ...restAttrs } = attrs

      const Presentation = presentations[props.presentation].component
      return (
        <Presentation
          controller={controller}
          v-slots={{
            default: () => <SelectMenu controller={controller} v-slots={slots} />,
            reference: () =>
              slots.trigger?.() ?? (
                <div class={[classes(n()), className]} style={style as StyleValue}>
                  <SelectionField
                    ref={fieldRef}
                    showTags={props.showTags}
                    separator={props.separator}
                    textAlign={props.textAlign}
                    hint={controller.mergedHint}
                    line={props.line}
                    textColor={props.textColor}
                    focusColor={props.focusColor}
                    blurColor={props.blurColor}
                    v-slots={{
                      label: renderLabel,
                      selected: slots.selected,
                      prefix: slots.prefix,
                      'arrow-icon': slots['arrow-icon'],
                      'loading-icon': slots['loading-icon'],
                      'search-icon': slots['search-icon'],
                      suffix: () =>
                        slots.suffix?.() ??
                        (controller.feedback ? <InputFeedback status={controller.feedback} /> : null),
                      'clear-icon': slots['clear-icon'],
                    }}
                    items={controller.fieldItems}
                    inputValue={controller.computedInputValue}
                    multiple={props.multiple}
                    disabled={controller.mergedDisabled}
                    readonly={controller.mergedReadonly}
                    error={controller.mergedError}
                    loading={props.loading}
                    clearable={props.clearable}
                    searchable={Boolean(props.filterable || props.creatable)}
                    open={controller.computedOpen}
                    maxTagCount={props.maxTagCount}
                    placeholder={props.placeholder}
                    size={controller.mergedSize}
                    tagNowrap={props.tagNowrap}
                    variant={controller.mergedVariant}
                    onUpdate:inputValue={controller.handleInputValueChange}
                    onRemove={(key) => controller.handleRemove(String(key))}
                    onClear={controller.handleClear}
                    onKeydown={controller.handleKeyDown}
                    {...restAttrs}
                    onFocus={(event) => {
                      emit('focus', event)
                      controller.eventHandlers?.onFocus?.(event)
                    }}
                    onBlur={(event) => {
                      emit('blur', event)
                      controller.eventHandlers?.onBlur?.(event)
                    }}
                  />
                </div>
              ),
          }}
        />
      )
    }
  },
})
