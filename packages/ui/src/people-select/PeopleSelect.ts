import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useAsyncData } from '@maple-design/use-vue'
import { useFieldPresentation } from '../_components/field-presentation/context'
import { usePresentationForm } from '../_components/field-presentation/form-bridge'
import { createNamespace } from '../utils/components'
import { useEmptyValues } from '../utils/empty-value'
import { peopleSelectEmits } from './emits'
import Person from './Person.vue'
import Presented from './presentation'
import { peopleSelectProps } from './props'
import { useSelectedPeople } from './selection'
import type { PeopleSelectOption, PeopleSelectValue } from './types'

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
    const localValue = ref<PeopleSelectValue>(props.defaultValue)
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
    const selection = useSelectedPeople(props, value, options)
    const selected = computed<PeopleSelectOption>(
      () =>
        selection.people.value[0] ?? {
          value: '',
          label: props.label || props.defaultText,
        },
    )
    const readScope = computed(() => ({
      value: value.value,
      text: emptyPolicy.isEmpty(value.value)
        ? emptyPolicy.emptyText.value
        : selection.people.value.map((person) => person.label).join(', '),
      person: selected.value,
      ...(props.multiple ? { people: selection.people.value } : {}),
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
    function update(next: PeopleSelectValue) {
      localValue.value = next
      emit('update:modelValue', next)
    }
    const renderReadPerson = () => {
      if (emptyPolicy.isEmpty(value.value)) {
        return emptyPolicy.emptyText.value
      }
      const renderPerson = (person: PeopleSelectOption) => {
        const scope = {
          person,
          disabled: form.mergedDisabled.value || !person.value || !!person.disabled,
        }
        const actions = slots.actions ? slots.actions(scope) : props.renderActions?.(scope)
        return h(
          Person,
          {
            key: person.value,
            person,
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
      return props.multiple
        ? h('span', { class: 'mp-people-select-people' }, selection.people.value.map(renderPerson))
        : renderPerson(selected.value)
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
              label: props.multiple ? '' : selected.value.label,
              fallbackOption: props.fallbackOption === false ? false : selection.resolve,
              loading: props.loading || source.loading.value,
              filterOption: props.filterOption ?? !remote.value,
              'onUpdate:modelValue': update,
              'onUpdate:open': (open: boolean) => emit('update:open', open),
              'onOpen-change': (open: boolean) => emit('open-change', open),
              onChange: (next: PeopleSelectValue) => emit('change', next),
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
