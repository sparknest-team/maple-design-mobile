<template>
  <div :class="n()">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, useSlots, watch } from 'vue'
import { call, normalizeToArray, removeArrayBlank } from '@maplejs/maple-shared'
import { type CollapseItemProvider } from '../collapse-item/provide'
import { createNamespace } from '../utils/components'
import { props, type CollapseActiveNames } from './props'
import { useCollapseItem, type CollapseProvider } from './provide'

const { name, n } = createNamespace('collapse')

type CollapseToggleAllOptions = { expand: boolean | 'inverse'; skipDisabled?: boolean }

export default defineComponent({
  name,
  props,
  emits: ['change', 'update:activeNames'],
  setup(props, { emit }) {
    const slots = useSlots()
    const offset = computed(() => props.offset)
    const divider = computed(() => props.divider)
    const elevation = computed(() => props.elevation)
    const accordion = computed(() => props.accordion)
    const expandIconPosition = computed(() => props.expandIconPosition)
    const showExpandIcon = computed(() => props.showExpandIcon)
    const destroyOnHide = computed(() => props.destroyOnHide)
    const innerActiveNames = ref<CollapseActiveNames>([...(props.defaultActiveNames ?? [])])
    const normalizeValues = computed(() => props.activeNames ?? innerActiveNames.value)
    const { length, collapseItems, bindCollapseItems } = useCollapseItem()

    const collapseProvider: CollapseProvider = {
      offset,
      divider,
      elevation,
      accordion,
      expandIconPosition,
      showExpandIcon,
      destroyOnHide,
      slots,
      updateItem,
    }

    watch(
      () => length.value,
      () => nextTick().then(resize),
    )

    watch(
      () => props.activeNames,
      () => nextTick().then(resize),
    )

    watch(innerActiveNames, () => nextTick().then(resize))

    bindCollapseItems(collapseProvider)

    function updateItem(itemValue: number | string, targetExpand: boolean) {
      if (props.accordion) {
        updateActiveNames(targetExpand ? [itemValue] : [])
        return
      }

      const nextNames = targetExpand
        ? [...normalizeValues.value, itemValue]
        : normalizeValues.value.filter((value) => value !== itemValue)
      updateActiveNames(nextNames)
    }

    function updateActiveNames(activeNames: CollapseActiveNames) {
      innerActiveNames.value = activeNames
      emit('update:activeNames', activeNames)
      emit('change', activeNames)
    }

    function matchItems(): Array<CollapseItemProvider> | CollapseItemProvider | undefined {
      if (props.accordion) {
        const [value] = normalizeValues.value
        if (value == null) {
          return
        }

        const matchedNameItem = collapseItems.find(({ name }) => value === name.value)
        if (matchedNameItem == null) {
          return collapseItems.find(({ index, name }) => name.value == null && value === index.value)
        }

        return matchedNameItem
      }

      const matchedNameItems = collapseItems.filter(
        ({ name }) => name.value != null && normalizeValues.value.includes(name.value),
      )
      const matchedIndexItems = collapseItems.filter(
        ({ index, name }) => name.value == null && normalizeValues.value.includes(index.value),
      )

      return [...matchedNameItems, ...matchedIndexItems]
    }

    function resize() {
      const matchedItems: CollapseItemProvider[] = removeArrayBlank(normalizeToArray(matchItems()))

      collapseItems.forEach((collapseItem) => {
        collapseItem.init(matchedItems.includes(collapseItem))
      })
    }

    // expose
    const toggleAll = (options: CollapseToggleAllOptions) => {
      if (props.accordion) {
        return
      }

      const matchedItems = collapseItems.filter((item) => {
        const itemValue = item.name.value ?? item.index.value
        const expanded = normalizeValues.value.includes(itemValue)

        if (options.skipDisabled && item.disabled.value) {
          return expanded
        }

        if (options.expand === 'inverse') {
          return !expanded
        }

        return options.expand
      })

      const activeNames = matchedItems.map((item) => item.name.value ?? item.index.value)
      updateActiveNames(activeNames)
    }

    return {
      divider,
      n,
      toggleAll,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../styles/elevation';

.mp-collapse {
  position: relative;
  width: 100%;
  z-index: 0;
}
</style>
