<template>
  <mp-popover
    ref="menu"
    v-model:show="computedPopupVisible"
    tabindex="-1"
    :class="n()"
    :disabled="disabled"
    :trigger="trigger"
    :reference="reference"
    :placement="resolvedPlacement"
    :strategy="strategy"
    :offset-x="offsetX"
    :offset-y="offsetY"
    :teleport="resolvedPopupContainer"
    :same-width="sameWidth"
    :elevation="elevation"
    :default-style="false"
    :popover-class="popoverClass"
    :close-on-click-reference="closeOnClickReference"
    :close-on-key-escape="false"
    @open="onOpen"
    @opened="onOpened"
    @close="onClose"
    @closed="onClosed"
    @click-outside="onClickOutside"
  >
    <slot />

    <template #content>
      <div
        ref="menuOptionsRef"
        :class="classes(n('menu'), formatElevation(elevation, 3), [scrollable, n('--scrollable')])"
      >
        <template v-for="option in options" :key="option[valueKey]">
          <mp-menu-children
            v-if="option[childrenKey]"
            ref="menuChildren"
            :parent-show="computedPopupVisible"
            :option="option"
            :options="option[childrenKey]"
            :highlight-options="highlightOptions"
            :disabled="option.disabled"
            @key-arrow-right-open="allowChildrenClose(option)"
            @mouseenter="allowChildrenClose(option)"
          />
          <mp-menu-option
            v-else
            :label="option[labelKey]"
            :value="option[valueKey]"
            :option="option"
            :ripple="option.ripple"
            :disabled="option.disabled"
            @mouseenter="allowChildrenClose()"
          />
        </template>

        <slot name="content" />
        <slot name="options" />
      </div>
    </template>
  </mp-popover>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { call, preventDefault } from '@maplejs/maple-shared'
import { useEventListener } from '@maplejs/maple-use'
import MpMenuOption from '../menu-option'
import { type MenuOptionProvider } from '../menu-option/provide'
import MpPopover from '../popover'
import { type Reference } from '../popover/usePopover'
import { useSelectController } from '../select/useSelectController'
import { createNamespace, formatElevation } from '../utils/components'
import { focusChildElementByKey } from '../utils/elements'
import MpMenuChildren from './MenuChildren.vue'
import { MenuOption, props } from './props'
import { useMenuOptions, type MenuProvider } from './provide'

const { name, n, classes } = createNamespace('menu')

export default defineComponent({
  name,
  components: { MpPopover, MpMenuOption, MpMenuChildren },
  props,
  setup(props) {
    const uncontrolledPopupVisible = ref(props.popupVisible ?? (props.defaultPopupVisible || props.show))
    const computedPopupVisible = computed({
      get: () => props.popupVisible ?? (props.show || uncontrolledPopupVisible.value),
      set: (visible: boolean) => {
        uncontrolledPopupVisible.value = visible
        call(props['onUpdate:popupVisible'], visible)
        call(props['onUpdate:show'], visible)
        call(props.onPopupVisibleChange, visible)
      },
    })
    const resolvedPlacement = computed(() => {
      const positionPlacementMap = {
        top: 'top',
        tl: 'top-start',
        tr: 'top-end',
        bottom: 'bottom',
        bl: 'bottom-start',
        br: 'bottom-end',
      } as const

      return props.position ? positionPlacementMap[props.position] : props.placement
    })
    const resolvedPopupContainer = computed(() => props.popupContainer ?? props.teleport)
    const menu = ref<InstanceType<typeof MpPopover>>()
    const menuOptionsRef = ref<HTMLElement>()
    const menuChildren = ref<InstanceType<typeof MpMenuChildren>[]>()
    const enhancedOptions = computed(() => enhance(props.options))

    const { menuOptions, length, bindMenuOptions } = useMenuOptions()

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

        const children = (enhancedOption._children ?? []).filter((option) => !option.disabled)
        const selectedChildren = children.filter((option) => props.modelValue.includes(option.value))

        return selectedChildren.length > 0 && selectedChildren.length < children.length
      },
    })

    const highlightOptions = computed(() => {
      const { multiple, modelValue } = props

      if (multiple) {
        return []
      }

      const selectedOption = enhancedOptions.value.find((option) => option.value === modelValue)
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

    function getEnhancedOption(value: any) {
      return enhancedOptions.value.find((option) => option.value === value)
    }

    function getOptionProvider(value: any) {
      return menuOptions.find((optionProvider) => optionProvider.value.value === value)
    }

    function getOptionChildren(option: MenuOption) {
      return option[props.childrenKey] as MenuOption[] | undefined
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
            option[props.childrenKey] = enhancedChildren
            option._children = flatten(enhancedChildren)
          }

          return option
        })
      }

      return flatten(baseEnhance(options))
    }

    function onSelect(optionProvider: MenuOptionProvider) {
      const { multiple } = props
      const hideOnSelect = props.hideOnSelect ?? props.closeOnSelect
      const { value, label, selected, disabled, ripple } = optionProvider
      const enhancedOption = getEnhancedOption(value.value)

      if (enhancedOption) {
        const childrenValues = (enhancedOption._children ?? [])
          .filter((option) => !option.disabled)
          .map((option) => option.value)

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

      call(props.onSelect, getOptionProviderKey(optionProvider), selectedOption)
      call(props['onUpdate:modelValue'], selectedValue)

      if (!multiple && hideOnSelect) {
        menu.value!.$el.focus()
        close()
      }
    }

    function broadcastParentOption(enhancedOption: MenuOption) {
      let parentOption = enhancedOption._parent

      while (parentOption) {
        const parentOptionProvider = getOptionProvider(parentOption.value)!
        const parentOptionChildren = getOptionChildren(parentOption)!.filter((option) => !option.disabled)

        const isAllChildrenUnselected = parentOptionChildren.every((option) => {
          const optionProvider = getOptionProvider(option.value)!
          return !optionProvider.selected.value
        })

        const isAllChildrenSelected = parentOptionChildren.every((option) => {
          const optionProvider = getOptionProvider(option.value)!
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
      if (props.disabled || !computedPopupVisible.value) {
        return
      }

      const { key } = event

      if (['Escape', 'ArrowDown', 'ArrowUp'].includes(key)) {
        preventDefault(event)
      }

      if (key === 'Escape') {
        menu.value!.$el.focus()
        close()
        call(props.onKeyEscape)
        return
      }

      if (key === 'ArrowDown' || key === 'ArrowUp') {
        focusChildElementByKey(
          menu.value!.$el,
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

        if (child.option.value === option.value) {
          // skip active option
          return
        }

        child.close()
      })
    }

    // expose
    function open() {
      menu.value?.open()
    }

    // expose
    function close() {
      menu.value?.close()
    }

    // expose
    function resize() {
      menu.value?.resize()
    }

    // expose
    function setReference(reference: Reference) {
      menu.value?.setReference(reference)
    }

    return {
      computedPopupVisible,
      resolvedPlacement,
      resolvedPopupContainer,
      menu,
      menuOptionsRef,
      menuChildren,
      highlightOptions,
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
@import '../popover/popover';
@import '../menu-option/menuOption';
@import './menu';
</style>
