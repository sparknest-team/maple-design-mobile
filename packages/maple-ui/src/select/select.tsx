import { defineComponent, h, inject, reactive, ref, type StyleValue } from 'vue'
import FieldPresentation from '../_components/field-presentation/FieldPresentation.vue'
import { useFieldTexts } from '../_components/field-presentation/texts'
import { selectionEditorSurface } from '../_components/selected-options/context'
import SelectedOptions from '../_components/selected-options/SelectedOptions.vue'
import SelectionEditor from '../_components/selected-options/SelectionEditor.vue'
import MenuPresentation from '../_components/selection-field/MenuPresentation.vue'
import type { SelectionFieldItem } from '../_components/selection-field/props'
import SelectionField from '../_components/selection-field/SelectionField.vue'
import { isFunction } from '../_utils/is'
import Input from '../input'
import InputFeedback from '../input/InputFeedback.vue'
import { createNamespace } from '../utils/components'
import { selectEmits } from './emits'
import NativeEditorOwner from './native-editor-owner'
import { selectProps } from './props'
import SelectMenu from './SelectMenu'
import { useSelectController } from './use-select-controller'

const Select = defineComponent({
  name: createNamespace('select').name,
  inheritAttrs: false,
  props: selectProps,
  emits: selectEmits,
  setup(props, context) {
    const { slots, attrs, emit, expose } = context
    const { n, classes } = createNamespace('select')
    const controller = reactive(useSelectController(props, context))
    const texts = reactive(useFieldTexts())
    const fieldRef = ref<InstanceType<typeof SelectionField>>()
    const presentationRef = ref<InstanceType<typeof FieldPresentation>>()
    controller.registerPresentation({
      active: () => controller.computedOpen && controller.deferred,
      cancel: () => {
        controller.handleOpenChange(false)
        controller.session.reset()
      },
      focus: () => (controller.editMode === 'direct' ? fieldRef.value?.focus() : presentationRef.value?.focus()),
    })
    expose({
      refresh: () => controller.refresh(),
      focus: () => (controller.editMode === 'direct' ? fieldRef.value?.focus() : presentationRef.value?.focus()),
      blur: () => (controller.editMode === 'direct' ? fieldRef.value?.blur() : presentationRef.value?.blur()),
    })
    const renderLabel = ({ data }: { data: SelectionFieldItem }) => {
      if ((slots.label || isFunction(props.formatLabel)) && data) {
        const optionInfo = controller.optionInfoMap.get(String(data.key))
        if (optionInfo?.raw) {
          return slots.label?.({ data: optionInfo.raw }) ?? props.formatLabel?.(optionInfo.raw)
        }
      }
      return data?.label ?? ''
    }

    const editor = inject(selectionEditorSurface, undefined)
    const handleFieldKeydown = (event: KeyboardEvent) => {
      emit('keydown', event)
      if (!event.defaultPrevented) {
        controller.handleKeyDown(event)
      }
    }

    const renderEditor = () => (
      <SelectedOptions
        open={controller.computedOpen}
        multiple={props.multiple}
        items={controller.selectedItems.map((item) => ({
          ...item,
          text: String(item.label),
          label: renderLabel({ data: item }),
        }))}
        disabled={
          controller.mergedDisabled || controller.mergedReadonly || controller.session.pending || controller.loading
        }
        limit={props.limit}
        onRemove={(key) => controller.handleRemove(String(key))}
        onClear={controller.clearSelection}
      >
        {(props.filterable || props.creatable) && (
          <Input
            modelValue={controller.computedInputValue}
            editMode="direct"
            hint={false}
            variant="outline"
            disabled={controller.mergedDisabled || controller.session.pending}
            readonly={controller.mergedReadonly}
            inputAttrs={{
              role: 'combobox',
              'aria-haspopup': 'listbox',
              'aria-expanded': controller.computedOpen,
              'aria-controls': controller.computedOpen ? controller.listboxId : undefined,
              'aria-activedescendant': controller.activeDescendant,
              'aria-autocomplete': 'list',
            }}
            ariaLabel={texts.search}
            placeholder={texts.search}
            clearable
            onUpdate:modelValue={(value: string | null) => controller.handleInputValueChange(value ?? '')}
            onKeydown={handleFieldKeydown}
          />
        )}
        <SelectMenu controller={controller} v-slots={slots} />
      </SelectedOptions>
    )

    return () => {
      if (editor) {
        return renderEditor()
      }
      const { class: className, style, ...restAttrs } = attrs

      const Presentation = MenuPresentation
      const text = controller.fieldItems
        .map((item) => {
          const raw = controller.optionInfoMap.get(String(item.key))?.raw
          const formatted = raw && isFunction(props.formatLabel) ? props.formatLabel(raw) : item.label
          return String(typeof formatted === 'string' || typeof formatted === 'number' ? formatted : (item.label ?? ''))
        })
        .join(props.separator)
      if (controller.editMode !== 'direct' || controller.readPretty) {
        return (
          <FieldPresentation
            loading={controller.loading}
            ref={presentationRef}
            style={props.textAlign ? { '--mp-form-content-align': props.textAlign } : undefined}
            editMode={controller.editMode}
            openTriggerTarget={props.openTriggerTarget}
            readPretty={controller.readPretty}
            empty={controller.emptyPolicy.isEmpty(controller.committedValue)}
            emptyText={controller.emptyPolicy.emptyText}
            popupContainer={props.popupContainer}
            confirmDisabled={controller.loading}
            label={controller.presentationLabel}
            text={text}
            placeholder={props.placeholder}
            open={controller.computedOpen}
            disabled={controller.mergedDisabled}
            readonly={controller.mergedReadonly}
            limit={props.limit}
            needConfirm={controller.deferred}
            pending={controller.session.pending}
            error={controller.session.error || controller.presentationError}
            onOpen={controller.handleOpenChange}
            onCancel={controller.cancelSession}
            commit={() => controller.session.commit()}
            onConfirm={() => controller.session.commit()}
            v-slots={{
              read: slots.read ? () => slots.read?.({ value: controller.committedValue, text }) : undefined,
              default: () =>
                controller.nativeEditor ? (
                  controller.computedOpen && (
                    <NativeEditorOwner install={controller.provideNativeEditorOwner}>
                      {() =>
                        h(
                          Select,
                          {
                            ...props,
                            ...attrs,
                            editMode: 'direct',
                            readPretty: false,
                            beforeCommit: undefined,
                            open: undefined,
                            defaultOpen: true,
                            modelValue: controller.session.value,
                            disabled: controller.mergedDisabled || controller.session.pending,
                            readonly: controller.mergedReadonly,
                            'onUpdate:modelValue': controller.session.update,
                            onKeydown: (event: KeyboardEvent) => emit('keydown', event),
                            onSearch: (...args: any[]) => (emit as any)('search', ...args),
                            onChange: () => {},
                          },
                          slots,
                        )
                      }
                    </NativeEditorOwner>
                  )
                ) : (
                  <SelectionEditor kind="select">{renderEditor()}</SelectionEditor>
                ),
            }}
          />
        )
      }
      return (
        <Presentation
          controller={controller}
          v-slots={{
            default: () => (
              <SelectedOptions
                open={controller.computedOpen}
                multiple={props.multiple}
                items={controller.selectedItems.map((item) => ({
                  ...item,
                  text: String(item.label),
                  label: renderLabel({ data: item }),
                }))}
                disabled={
                  controller.mergedDisabled ||
                  controller.mergedReadonly ||
                  controller.session.pending ||
                  controller.loading
                }
                limit={props.limit}
                onRemove={(key) => controller.handleRemove(String(key))}
                onClear={controller.clearSelection}
              >
                <SelectMenu controller={controller} v-slots={slots} />
              </SelectedOptions>
            ),
            reference: () =>
              slots.trigger?.() ?? (
                <div class={[classes(n()), className]} style={style as StyleValue}>
                  <SelectionField
                    ref={fieldRef}
                    openTriggerTarget={props.openTriggerTarget}
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
                    loading={controller.loading || controller.session.pending}
                    loadingMode={props.loadingMode}
                    clearable={props.clearable && !controller.loading}
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
                    {...restAttrs}
                    onKeydown={handleFieldKeydown}
                    aria-controls={controller.computedOpen ? controller.listboxId : undefined}
                    aria-activedescendant={controller.activeDescendant}
                    onFocus={(event) => {
                      emit('focus', event)
                      controller.eventHandlers?.onFocus?.(event)
                    }}
                    onBlur={(event) => {
                      emit('blur', event)
                      !controller.deferred && controller.eventHandlers?.onBlur?.(event)
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

export default Select
