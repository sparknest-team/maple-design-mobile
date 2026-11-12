import { computed, shallowRef, watch } from 'vue'
import type { ComputedRef } from 'vue'
import type { PeopleSelectProps } from './props'
import type { PeopleSelectOption, PeopleSelectValue } from './types'

export function personIds(value: PeopleSelectValue): string[] {
  return Array.isArray(value) ? value : value == null ? [] : [value]
}

/** Keep selected names while remote searches replace the candidate list. */
export function useSelectedPeople(
  props: PeopleSelectProps,
  value: ComputedRef<PeopleSelectValue>,
  options: ComputedRef<readonly PeopleSelectOption[]>,
) {
  const cache = shallowRef(new Map<string, PeopleSelectOption>())
  watch(
    [options, value],
    () => {
      const next = new Map<string, PeopleSelectOption>()
      for (const id of personIds(value.value)) {
        const person = options.value.find((option) => option.value === id) ?? cache.value.get(id)
        if (person) {
          next.set(id, person)
        }
      }
      cache.value = next
    },
    { immediate: true, flush: 'sync' },
  )
  function resolve(id: string): PeopleSelectOption {
    const current = options.value.find((option) => option.value === id)
    if (current) {
      return current
    }
    if (typeof props.fallbackOption === 'function') {
      return props.fallbackOption(id)
    }
    if (props.fallbackOption !== false) {
      if (!props.multiple && props.label) {
        return { ...cache.value.get(id), value: id, label: props.label }
      }
      const cached = cache.value.get(id)
      if (cached) {
        return cached
      }
    }
    return {
      value: id,
      label:
        props.fallbackOption === false
          ? (props.defaultText ?? '-')
          : (!props.multiple && props.label) || id || (props.defaultText ?? '-'),
    }
  }
  return {
    people: computed(() => personIds(value.value).map(resolve)),
    resolve,
  }
}

/** Text for the deferred editor reference; options are normalized by the public wrapper. */
export function peopleText(value: PeopleSelectValue, props: PeopleSelectProps): string {
  return personIds(value)
    .map((id) => {
      const option = Array.isArray(props.options) ? props.options.find((person) => person.value === id) : undefined
      if (option) {
        return option.label
      }
      if (typeof props.fallbackOption === 'function') {
        return props.fallbackOption(id).label
      }
      return (!props.multiple && props.label) || id || (props.defaultText ?? '-')
    })
    .join(', ')
}
