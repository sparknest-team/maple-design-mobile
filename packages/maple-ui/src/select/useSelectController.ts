import { ref, watch } from 'vue'
import { isEmpty } from '@maplejs/maple-shared'
import { sameOptionValue } from '../utils/option-data'
import { type OptionProvider } from './option-provide'

export interface UseSelectControllerOptions {
  modelValue: () => any
  multiple: () => boolean
  optionProviders: () => OptionProvider[]
  optionProvidersLength: () => number
  optionIsIndeterminate?: (option: OptionProvider) => boolean
}

export function useSelectController(options: UseSelectControllerOptions) {
  const {
    multiple: multipleGetter,
    modelValue: modelValueGetter,
    optionProviders: optionProvidersGetter,
    optionProvidersLength: optionProvidersLengthGetter,
    optionIsIndeterminate,
  } = options
  const label = ref<any>('')
  const labels = ref<any[]>([])

  watch(modelValueGetter, syncOptions, { deep: true })
  watch(optionProvidersLengthGetter, syncOptions)
  watch(() => optionProvidersGetter().map((option) => [option.value.value, option.label.value]), syncOptions, {
    deep: true,
    immediate: true,
  })

  function computeLabel() {
    const multiple = multipleGetter()
    const modelValue = modelValueGetter()

    if (multiple) {
      labels.value = (Array.isArray(modelValue) ? modelValue : []).map(findLabel)
    }

    if (!multiple && !isEmpty(modelValue)) {
      label.value = findLabel(modelValue)
    }

    if (!multiple && isEmpty(modelValue)) {
      label.value = ''
    }
  }

  function findLabel(targetValue: any) {
    const options = optionProvidersGetter()

    let option = options.find(({ value }) => sameOptionValue(value.value, targetValue))

    if (!option) {
      option = options.find(({ label }) => sameOptionValue(label.value, targetValue))
    }

    return option?.label.value ?? ''
  }

  function getOptionProviderKey({ value, label }: OptionProvider) {
    return value.value ?? label.value
  }

  function getSelectedValue(option: OptionProvider) {
    const multiple = multipleGetter()
    const options = optionProvidersGetter()

    return multiple
      ? options.filter(({ selected }) => selected.value).map(getOptionProviderKey)
      : getOptionProviderKey(option)
  }

  function syncOptions() {
    const multiple = multipleGetter()
    const modelValue = modelValueGetter()
    const options = optionProvidersGetter()

    if (multiple) {
      options.forEach((option) =>
        option.sync(
          Array.isArray(modelValue) && modelValue.some((value) => sameOptionValue(value, getOptionProviderKey(option))),
          optionIsIndeterminate ? optionIsIndeterminate(option) : undefined,
        ),
      )
    } else {
      options.forEach((option) => option.sync(sameOptionValue(modelValue, getOptionProviderKey(option))))
    }

    computeLabel()
  }

  return {
    label,
    labels,
    getOptionProviderKey,
    computeLabel,
    getSelectedValue,
  }
}
