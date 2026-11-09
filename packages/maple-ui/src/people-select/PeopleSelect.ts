import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useAsyncData } from '@maple-design/use'
import { useFieldPresentation } from '../_components/field-presentation/context'
import { usePresentationForm } from '../_components/field-presentation/form-bridge'
import { createNamespace } from '../utils/components'
import { useEmptyValues } from '../utils/empty-value'
import { peopleSelectEmits } from './emits'
import Person from './Person.vue'
import Presented from './presentation'
import { peopleSelectProps } from './props'
import type { PeopleSelectOption } from './types'

export default defineComponent({
  name: createNamespace('people-select').name,
  inheritAttrs: false,
  props: peopleSelectProps,
  emits: peopleSelectEmits,
  setup(props, { attrs, slots, emit, expose }) {
    const form = usePresentationForm({
      disabled: computed(() => props.disabled),
      readonly: computed(() => props.readonly),
    })
    const localValue = ref<string | null>(props.defaultValue)
    const value = computed(() => (props.modelValue !== undefined ? props.modelValue : localValue.value))
    const editMode = useFieldPresentation(
      () => props.editMode,
      () => props.readPretty,
    )
    const emptyPolicy = useEmptyValues(props)
    const mounted = ref(false)
    const remote = computed(() => typeof props.options === 'function' && !props.isLabel && !editMode.readPretty.value)
    const source = useAsyncData<readonly PeopleSelectOption[]>(() => [], {
      initialData: [],
      immediate: false,
    })
    const options = computed(() => (Array.isArray(props.options) ? props.options : source.data.value))
    const selectedCache = ref<PeopleSelectOption>()
    watch(
      [options, value],
      () => {
        const person = options.value.find((person) => person.value === value.value)
        if (person) {
          selectedCache.value = person
        } else if (selectedCache.value?.value !== value.value) {
          selectedCache.value = undefined
        }
      },
      { immediate: true },
    )
    const selected = computed<PeopleSelectOption>(() => {
      const current = options.value.find((person) => person.value === value.value)
      if (current) {
        return current
      }
      if (typeof props.fallbackOption === 'function' && value.value != null) {
        return props.fallbackOption(value.value)
      }
      if (props.fallbackOption !== false && props.label) {
        return { ...selectedCache.value, value: value.value ?? '', label: props.label }
      }
      if (props.fallbackOption !== false && selectedCache.value?.value === value.value) {
        return selectedCache.value
      }
      return {
        value: value.value ?? '',
        label: props.fallbackOption === false ? props.defaultText : props.label || value.value || props.defaultText,
      }
    })
    const readScope = computed(() => ({
      value: value.value,
      text: emptyPolicy.isEmpty(value.value) ? emptyPolicy.emptyText.value : selected.value.label,
      person: selected.value,
    }))
    const childOptions = options
    async function load(query: string) {
      if (!remote.value || typeof props.options !== 'function') {
        return
      }
      source.data.value = []
      const loader = props.options
      const result = await source.execute({
        loader: async (context) => {
          const options = await loader(query, context)
          if (!Array.isArray(options)) {
            throw new TypeError('Candidate loader must return an array')
          }
          return options
        },
      })
      if (result.status === 'error') {
        emit('load-error', result.error, 'options')
      }
    }
    onMounted(() => {
      mounted.value = true
    })
    watch([mounted, remote, () => props.options], () => {
      source.cancel()
      if (mounted.value && remote.value) {
        void load('')
      }
    })
    onBeforeUnmount(() => {
      mounted.value = false
    })
    function update(next: string | null) {
      localValue.value = next
      emit('update:modelValue', next)
    }
    const renderReadPerson = () => {
      if (emptyPolicy.isEmpty(value.value)) {
        return emptyPolicy.emptyText.value
      }
      const scope = {
        person: selected.value,
        disabled: form.mergedDisabled.value || !value.value || !!selected.value.disabled,
      }
      const actions = slots.actions ? slots.actions(scope) : props.renderActions?.(scope)
      return h(
        Person,
        {
          person: selected.value,
          showAvatar: props.showAvatar,
          disabled: scope.disabled,
          showPhone: props.showPhone,
          showChat: props.showChat,
          call: props.call,
          chat: props.chat,
          onActionError: (error: unknown, action: 'call' | 'chat') => emit('action-error', error, action),
        },
        actions == null ? undefined : { default: () => actions },
      )
    }
    const personSlots = () => ({
      ...slots,
      option:
        slots.option ??
        (({ data }: { data: PeopleSelectOption }) => h(Person, { person: data, showAvatar: props.showAvatar })),
      label:
        slots.label ??
        (({ data }: { data: PeopleSelectOption }) => h(Person, { person: data, showAvatar: props.showAvatar })),
      read: slots.read ? () => slots.read?.(readScope.value) : renderReadPerson,
    })
    const control = ref<InstanceType<typeof Presented>>()
    expose({
      refresh: () => load(''),
      focus: () => (control.value as any)?.focus?.(),
      blur: () => (control.value as any)?.blur?.(),
    })
    return () =>
      props.isLabel
        ? (slots.read?.(readScope.value) ?? personSlots().read!())
        : h(
            Presented,
            {
              ...attrs,
              ...props,
              ref: control,
              modelValue: value.value,
              options: childOptions.value,
              label: selected.value.label,
              fallbackOption: props.fallbackOption === false ? false : () => selected.value,
              loading: props.loading || source.loading.value,
              filterOption: props.filterOption ?? !remote.value,
              'onUpdate:modelValue': update,
              'onUpdate:open': (open: boolean) => emit('update:open', open),
              'onOpen-change': (open: boolean) => emit('open-change', open),
              onChange: (next: string | null) => emit('change', next),
              onClear: () => emit('clear'),
              onSearch: (query: string) => {
                emit('search', query)
                void load(query)
              },
            },
            personSlots(),
          )
  },
})
