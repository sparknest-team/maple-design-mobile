<template>
  <mp-trigger
    ref="menu"
    v-model:open="open"
    trigger="hover"
    placement="right-start"
    cascade-optimization
    :disabled="disabled"
    :popup-container="false"
    :close-on-click-reference="false"
  >
    <mp-menu-option
      ref="trigger"
      children-trigger
      :label="option[labelKey]"
      :value="option[valueKey]"
      :option="option"
      :ripple="option.ripple"
      :disabled="Boolean(option[disabledKey])"
      :highlight="highlightOptions.some((_option) => _option[valueKey] === option[valueKey])"
      @key-arrow-x="handleArrowRight"
      @mouseenter="handleMouseenter"
    />

    <template v-if="options.length" #content>
      <div ref="menuOptions">
        <template v-for="menuOption in options" :key="menuOption[valueKey]">
          <mp-menu-children
            v-if="menuOption[childrenKey]"
            ref="menuChildren"
            :parent-show="open"
            :option="menuOption"
            :options="menuOption[childrenKey]"
            :field-names="fieldNames"
            :highlight-options="highlightOptions"
            :disabled="Boolean(menuOption[disabledKey])"
            @key-arrow-x="handleArrowLeft"
            @key-arrow-right-open="allowChildrenClose(menuOption)"
            @mouseenter="allowChildrenClose(menuOption)"
          />
          <mp-menu-option
            v-else
            :label="menuOption[labelKey]"
            :value="menuOption[valueKey]"
            :option="menuOption"
            :ripple="menuOption.ripple"
            :disabled="Boolean(menuOption[disabledKey])"
            @key-arrow-x="handleArrowLeft"
            @mouseenter="allowChildrenClose()"
          />
        </template>
      </div>
    </template>
  </mp-trigger>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, type PropType } from 'vue'
import { raf } from '@maplejs/maple-shared'
import MpMenuOption from '../menu-option/MenuOption.vue'
import { type MenuOptionKeyArrowX } from '../menu-option/props'
import type { TriggerInstance } from '../trigger'
import MpTrigger from '../trigger/Trigger.vue'
import { createNamespace, pickProps } from '../utils/components'
import { focusChildElementByKey } from '../utils/elements'
import { useFieldNames, type FieldNames } from '../utils/options'
import { props as menuProps, type MenuOption } from './props'

const { name } = createNamespace('menu-children')

export default defineComponent({
  name,
  components: {
    MpTrigger,
    MpMenuOption,
  },
  props: {
    parentShow: Boolean,
    disabled: Boolean,
    option: {
      type: Object as PropType<MenuOption>,
      required: true,
    },
    highlightOptions: pickProps(menuProps, 'options'),
    ...pickProps(menuProps, ['options']),
    fieldNames: Object as PropType<FieldNames>,
  },
  emits: ['key-arrow-x', 'key-arrow-right-open', 'mouseenter'],
  setup(props, { emit }) {
    const open = ref(false)
    const menu = ref<TriggerInstance>()
    const trigger = ref<InstanceType<typeof MpMenuOption>>()
    const menuOptions = ref<HTMLElement>()
    const menuChildren = ref<{ option: MenuOption; allowClose(): void; close(): void }[]>()
    const fieldNames = useFieldNames(props)
    const labelKey = computed(() => fieldNames.value.label)
    const valueKey = computed(() => fieldNames.value.value)
    const childrenKey = computed(() => fieldNames.value.children)
    const disabledKey = computed(() => fieldNames.value.disabled)

    watch(
      () => props.parentShow,
      (value) => {
        if (!value) {
          open.value = false
        }
      },
      { immediate: true },
    )

    async function handleArrowRight(key: MenuOptionKeyArrowX) {
      emit('key-arrow-x', key)

      if (key !== 'ArrowRight') {
        return
      }

      emit('key-arrow-right-open')
      menu.value?.open()
      await raf()
      focusChildElementByKey(menu.value!.$el, menuOptions.value!, 'ArrowDown')
    }

    function handleArrowLeft(key: MenuOptionKeyArrowX) {
      if (key !== 'ArrowLeft') {
        return
      }

      allowClose()
      close()
      trigger.value?.$el.focus()
    }

    function close() {
      menu.value?.close()
    }

    function allowClose() {
      menu.value?.allowClose()
    }

    function allowChildrenClose(option?: MenuOption) {
      menuChildren.value?.forEach((child) => {
        child.allowClose()

        if (option == null) {
          child.close()
          return
        }

        if (child.option[valueKey.value] === option[valueKey.value]) {
          // skip active option
          return
        }

        child.close()
      })
    }

    function handleMouseenter() {
      emit('mouseenter')
    }

    return {
      open,
      menu,
      trigger,
      menuOptions,
      menuChildren,
      labelKey,
      valueKey,
      childrenKey,
      disabledKey,
      close,
      handleArrowLeft,
      handleArrowRight,
      handleMouseenter,
      allowClose,
      allowChildrenClose,
    }
  },
})
</script>
