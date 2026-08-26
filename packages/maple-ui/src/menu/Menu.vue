<template>
  <mp-trigger
    ref="menu"
    v-model:open="computedOpen"
    :disabled="disabled"
    :trigger="trigger"
    :reference="reference"
    :placement="placement"
    :strategy="strategy"
    :offset-x="offsetX"
    :offset-y="offsetY"
    :popup-container="popupContainer"
    :same-width="autoFitPopupWidth"
    :popup-class="popupClass"
    :close-on-click-reference="closeOnClickReference"
    :align-point="alignPoint"
    :esc-to-close="false"
    @open="$emit('open')"
    @opened="$emit('opened')"
    @close="$emit('close')"
    @closed="$emit('closed')"
    @click-outside="$emit('click-outside', $event)"
  >
    <slot />

    <template #content>
      <div :class="classes(n('panel'), formatElevation(elevation, 3))">
        <div
          ref="menuOptionsRef"
          role="menu"
          :class="classes(n('menu'), [popupMaxHeight !== false, n('--max-height')])"
          :style="menuPanelStyle"
        >
          <template v-for="option in options" :key="option[valueKey]">
            <mp-menu-children
              v-if="option[childrenKey]"
              ref="menuChildren"
              :parent-show="computedOpen"
              :option="option"
              :options="option[childrenKey]"
              :field-names="fieldNames"
              :highlight-options="highlightOptions"
              :disabled="Boolean(option[disabledKey])"
              @key-arrow-right-open="allowChildrenClose(option)"
              @mouseenter="allowChildrenClose(option)"
            />
            <mp-menu-option
              v-else
              :label="option[labelKey]"
              :value="option[valueKey]"
              :option="option"
              :ripple="option.ripple"
              :disabled="Boolean(option[disabledKey])"
              @mouseenter="allowChildrenClose()"
            />
          </template>

          <slot name="content" />
        </div>
        <div v-if="$slots.footer" :class="n('footer')">
          <slot name="footer" />
        </div>
      </div>
    </template>
  </mp-trigger>
</template>

<script lang="ts">
import { computed, defineComponent, ref, type CSSProperties } from 'vue'
import { preventDefault } from '@maplejs/maple-shared'
import { useEventListener } from '@maplejs/maple-use'
import MpMenuOption from '../menu-option'
import { type MenuOptionProvider } from '../menu-option/provide'
import { useSelectController } from '../select/useSelectController'
import MpTrigger, { type Reference, type TriggerInstance } from '../trigger'
import { createNamespace, formatElevation } from '../utils/components'
import { focusChildElementByKey } from '../utils/elements'
import { useFieldNames } from '../utils/options'
import MpMenuChildren from './MenuChildren.vue'
import { MenuOption, props } from './props'
import { useMenuOptions, type MenuProvider } from './provide'

const { name, n, classes } = createNamespace('menu')

export default defineComponent({
  name,
  components: { MpTrigger, MpMenuOption, MpMenuChildren },
  props,
  emits: [
    'open-change',
    'select',
    'update:open',
    'update:modelValue',
    'key-escape',
    'open',
    'opened',
    'close',
    'closed',
    'click-outside',
  ],
  setup(props, { emit }) {
    const uncontrolledOpen = ref(props.open ?? props.defaultOpen)
    const computedOpen = computed({
      get: () => props.open ?? uncontrolledOpen.value,
      set: (visible: boolean) => {
        uncontrolledOpen.value = visible
        emit('update:open', visible)
        emit('open-change', visible)
      },
    })
    const menu = ref<TriggerInstance>()
    const menuOptionsRef = ref<HTMLElement>()
    const menuChildren = ref<InstanceType<typeof MpMenuChildren>[]>()
    const enhancedOptions = computed(() => enhance(props.options))

    const { menuOptions, length, bindMenuOptions } = useMenuOptions()
    const fieldNames = useFieldNames(props)
    const labelKey = computed(() => fieldNames.value.label)
    const valueKey = computed(() => fieldNames.value.value)
    const childrenKey = computed(() => fieldNames.value.children)
    const disabledKey = computed(() => fieldNames.value.disabled)

    const menuPanelStyle = computed<CSSProperties | undefined>(() => {
      if (typeof props.popupMaxHeight === 'number') {
        return { maxHeight: `${props.popupMaxHeight}px` }
      }
      if (props.popupMaxHeight === false) {
        return { maxHeight: 'none', overflowY: 'hidden' }
      }
      return undefined
    })

    const { computeLabel, getSelectedValue, getOptionProviderKey } = useSelectController({
      modelValue: () => props.modelValue,
      multiple: () => props.multiple,
      optionProviders: () => menuOptions,
      optionProvidersLength: () => length.value,
      optionIsIndeterminate(optionProvider) {
        const enhancedOption = getEnhancedOption(optionProvider.value.value)
        if (!enhancedOption) {
          return false
        }

        const children = (enhancedOption._children ?? []).filter((option) => !isOptionDisabled(option))
        const selectedChildren = children.filter((option) => props.modelValue.includes(getOptionValue(option)))

        return selectedChildren.length > 0 && selectedChildren.length < children.length
      },
    })

    const highlightOptions = computed(() => {
      const { multiple, modelValue } = props

      if (multiple) {
        return []
      }

      const selectedOption = enhancedOptions.value.find((option) => getOptionValue(option) === modelValue)
      const highlightOptions: MenuOption[] = []
      let parent = selectedOption?._parent

      while (parent) {
        highlightOptions.push(parent)
        parent = parent._parent
      }

      return highlightOptions
    })

    const menuProvider: MenuProvider = {
      size: computed(() => props.size),
      multiple: computed(() => props.multiple),
      computeLabel,
      onSelect,
    }

    bindMenuOptions(menuProvider)

    useEventListener(() => window, 'keydown', handleKeydown)

    function getOptionValue(option: MenuOption) {
      return option[valueKey.value]
    }

    function isOptionDisabled(option: MenuOption) {
      return Boolean(option[disabledKey.value])
    }

    function getEnhancedOption(value: any) {
      return enhancedOptions.value.find((option) => getOptionValue(option) === value)
    }

    function getOptionProvider(value: any) {
      return menuOptions.find((optionProvider) => optionProvider.value.value === value)
    }

    function getOptionChildren(option: MenuOption) {
      return option[childrenKey.value] as MenuOption[] | undefined
    }

    function flatten(options: MenuOption[]) {
      const flattenOptions: MenuOption[] = []

      baseFlatten(options)

      function baseFlatten(options: MenuOption[]) {
        options.forEach((option) => {
          flattenOptions.push(option)

          const children = getOptionChildren(option)
          if (children) {
            baseFlatten(children)
          }
        })
      }

      return flattenOptions
    }

    function enhance(options: MenuOption[]) {
      function baseEnhance(options: MenuOption[], parent?: MenuOption) {
        return options.map((option) => {
          option = { ...option, _rawOption: option }

          if (parent) {
            option._parent = parent
          }

          const children = getOptionChildren(option)

          if (children) {
            const enhancedChildren = baseEnhance(children, option)
            option[childrenKey.value] = enhancedChildren
            option._children = flatten(enhancedChildren)
          }

          return option
        })
      }

      return flatten(baseEnhance(options))
    }

    function onSelect(optionProvider: MenuOptionProvider, ev?: Event) {
      const { multiple } = props
      const { value, label, selected, disabled, ripple } = optionProvider
      const enhancedOption = getEnhancedOption(value.value)

      if (enhancedOption) {
        const childrenValues = (enhancedOption._children ?? [])
          .filter((option) => !isOptionDisabled(option))
          .map((option) => getOptionValue(option))

        if (multiple && selected.value) {
          menuOptions.forEach((optionProvider) => {
            if (childrenValues.includes(optionProvider.value.value)) {
              optionProvider.sync(true, false)
            }
          })

          broadcastParentOption(enhancedOption)
        }

        if (multiple && !selected.value) {
          menuOptions.forEach((optionProvider) => {
            if (childrenValues.includes(optionProvider.value.value)) {
              optionProvider.sync(false, false)
            }
          })

          broadcastParentOption(enhancedOption)
        }
      }

      const selectedValue = getSelectedValue(optionProvider)
      const selectedOption: MenuOption = enhancedOption?._rawOption ?? {
        value: value.value,
        label: label.value,
        disabled: disabled.value,
        ripple: ripple.value,
      }

      emit('select', getOptionProviderKey(optionProvider), selectedOption, ev)
      emit('update:modelValue', selectedValue)

      if (!multiple && props.hideOnSelect) {
        menu.value?.getReference()?.focus()
        close()
      }
    }

    function broadcastParentOption(enhancedOption: MenuOption) {
      let parentOption = enhancedOption._parent

      while (parentOption) {
        const parentOptionProvider = getOptionProvider(getOptionValue(parentOption))!
        const parentOptionChildren = getOptionChildren(parentOption)!.filter((option) => !isOptionDisabled(option))

        const isAllChildrenUnselected = parentOptionChildren.every((option) => {
          const optionProvider = getOptionProvider(getOptionValue(option))!
          return !optionProvider.selected.value
        })

        const isAllChildrenSelected = parentOptionChildren.every((option) => {
          const optionProvider = getOptionProvider(getOptionValue(option))!
          return optionProvider.selected.value
        })

        if (isAllChildrenUnselected) {
          parentOptionProvider.sync(false, false)
        } else if (isAllChildrenSelected) {
          parentOptionProvider.sync(true, false)
        } else {
          parentOptionProvider.sync(false, true)
        }

        parentOption = parentOption._parent
      }
    }

    function handleKeydown(event: KeyboardEvent) {
      if (props.disabled || !computedOpen.value) {
        return
      }

      const { key } = event

      if (['Escape', 'ArrowDown', 'ArrowUp'].includes(key)) {
        preventDefault(event)
      }

      if (key === 'Escape') {
        menu.value?.getReference()?.focus()
        close()
        emit('key-escape')
        return
      }

      if (key === 'ArrowDown' || key === 'ArrowUp') {
        focusChildElementByKey(
          menu.value!.getReference()!,
          menuOptionsRef.value!,
          key,
          (activeElement, nextActiveElement, isActiveInReferenceElements) => {
            if (isActiveInReferenceElements) {
              return true
            }

            return getActiveElementParent(activeElement) === getActiveElementParent(nextActiveElement)
          },
        )
      }
    }

    function getActiveElementParent(activeElement: HTMLElement) {
      if (activeElement.classList.contains('mp-menu-option--children-trigger')) {
        return activeElement.parentNode?.parentNode
      }

      if (activeElement.classList.contains('mp-checkbox__action')) {
        const optionElement = activeElement.parentNode?.parentNode?.parentNode

        if (optionElement) {
          return getActiveElementParent(optionElement as HTMLElement)
        }
      }

      return activeElement.parentNode
    }

    function allowChildrenClose(option?: MenuOption) {
      menuChildren.value?.forEach((child) => {
        child.allowClose()

        if (option == null) {
          child.close()
          return
        }

        if (getOptionValue(child.option) === getOptionValue(option)) {
          return
        }

        child.close()
      })
    }

    function open() {
      menu.value?.open()
    }

    function close() {
      menu.value?.close()
    }

    function resize() {
      menu.value?.resize()
    }

    function setReference(reference: Reference) {
      menu.value?.setReference(reference)
    }

    return {
      computedOpen,
      menu,
      menuOptionsRef,
      menuChildren,
      highlightOptions,
      menuPanelStyle,
      labelKey,
      valueKey,
      childrenKey,
      disabledKey,
      fieldNames,
      n,
      classes,
      allowChildrenClose,
      formatElevation,
      open,
      close,
      resize,
      setReference,
    }
  },
})
</script>

<style lang="less">
@import '../styles/elevation';
@import '../styles/common';
@import '../menu-option/menuOption';
@import './menu';
</style>
