import { computed, defineComponent, inject, ref } from 'vue'
import { selectionEditorSurface } from '../_components/selected-options/context'
import { useFormItem } from '../form/item-provide'
import Select from '../select'
import { createNamespace } from '../utils/components'
import { peopleSelectProps } from './props'

const { name } = createNamespace('people-select')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: peopleSelectProps,
  emits: {
    'update:modelValue': (value: string | null) => value === null || typeof value === 'string',
    change: (value: string | null) => value === null || typeof value === 'string',
    clear: () => true,
    search: (query: string) => typeof query === 'string',
  },
  setup(props, { emit, attrs, slots }) {
    const localValue = ref<string | null>(props.defaultValue)
    const value = computed(() => (props.modelValue !== undefined ? props.modelValue : localValue.value))
    const editor = inject(selectionEditorSurface, undefined)
    const { mergedDisabled, mergedReadonly } = useFormItem({
      disabled: computed(() => props.disabled),
      readonly: computed(() => props.readonly),
    })
    const options = computed(() => (Array.isArray(props.options) ? props.options : []).map((option) => ({ ...option })))
    const blocked = () => mergedDisabled.value || mergedReadonly.value || props.loading
    const label = computed(
      () =>
        (Array.isArray(props.options) ? props.options : []).find((option) => option.value === value.value)?.label ||
        props.label ||
        value.value ||
        props.defaultText,
    )
    const commit = (next: unknown) => {
      if (blocked()) {
        return
      }
      // PeopleSelect has one string identity; clearing keeps the published empty string.
      const text = next === null ? null : typeof next === 'string' ? next : ''
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
          {...attrs}
          {...{ name: props.name }}
          placeholder={props.placeholder}
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
