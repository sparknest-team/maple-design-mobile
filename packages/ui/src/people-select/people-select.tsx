import { computed, defineComponent, inject, ref } from 'vue'
import { selectionEditorSurface } from '../_components/selected-options/context'
import { useFormItem } from '../form/item-provide'
import Select, { type SelectInstance } from '../select'
import { createNamespace } from '../utils/components'
import { peopleSelectEmits } from './emits'
import { peopleSelectProps } from './props'
import { peopleText } from './selection'
import type { PeopleSelectValue } from './types'

const { name } = createNamespace('people-select')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: peopleSelectProps,
  emits: peopleSelectEmits,
  setup(props, { emit, attrs, slots, expose }) {
    const select = ref<SelectInstance>()
    expose({ focus: () => select.value?.focus(), blur: () => select.value?.blur() })
    const localValue = ref<PeopleSelectValue>(props.defaultValue)
    const value = computed(() => (props.modelValue !== undefined ? props.modelValue : localValue.value))
    const editor = inject(selectionEditorSurface, undefined)
    const { mergedDisabled, mergedReadonly } = useFormItem({
      disabled: computed(() => props.disabled),
      readonly: computed(() => props.readonly),
    })
    const options = computed(() => (Array.isArray(props.options) ? props.options : []).map((option) => ({ ...option })))
    const blocked = () => mergedDisabled.value || mergedReadonly.value || props.loading
    const label = computed(() => peopleText(value.value, props))
    const commit = (next: unknown) => {
      if (blocked()) {
        return
      }
      const text: PeopleSelectValue =
        next === null
          ? null
          : props.multiple
            ? Array.isArray(next)
              ? next.filter((id): id is string => typeof id === 'string')
              : []
            : typeof next === 'string'
              ? next
              : ''
      if (props.modelValue === undefined) {
        localValue.value = text
      }
      emit('update:modelValue', text)
      emit('change', text)
    }
    return () =>
      props.isLabel ? (
        <div>{label.value}</div>
      ) : (
        <Select
          ref={select}
          {...attrs}
          {...{ name: props.name }}
          placeholder={props.placeholder}
          multiple={props.multiple}
          clearable={props.clearable}
          emptyValue={props.emptyValue}
          filterable={props.filterable}
          filterOption={props.filterOption}
          caseSensitive={props.caseSensitive}
          searchFields={props.searchFields}
          searchDelay={props.searchDelay}
          disabled={mergedDisabled.value}
          readonly={mergedReadonly.value}
          open={editor && !mergedDisabled.value && !mergedReadonly.value ? true : undefined}
          modelValue={value.value}
          options={options.value}
          loading={props.loading}
          loadingMode={props.loadingMode}
          showExtraOptions={false}
          fallbackOption={
            props.fallbackOption === false
              ? false
              : (id) =>
                  typeof props.fallbackOption === 'function'
                    ? props.fallbackOption(String(id))
                    : { value: id, label: props.label || String(id) }
          }
          onSearch={(query: string) => {
            if (!mergedDisabled.value && !mergedReadonly.value) {
              emit('search', query)
            }
          }}
          onChange={commit}
          onClear={() => {
            if (!blocked()) {
              emit('clear')
            }
          }}
          v-slots={slots}
        />
      )
  },
})
