<template>
  <div :class="cls">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, reactive, ref, shallowRef, toRefs } from 'vue'
import { isArray } from '@maplejs/maple-shared'
import { createNamespace } from '../utils/components'
import { collapseProps, type CollapseName, type CollapseToggleAllOptions } from './props'
import { collapseKey, type CollapseItemContext } from './provide'

const { name, n, classes } = createNamespace('collapse')

export default defineComponent({
  name,
  props: collapseProps,
  emits: {
    'update:activeNames': (_activeNames: CollapseName[]) => true,
    change: (_activeNames: CollapseName[], _ev: Event) => true,
  },
  setup(props, { emit, slots, expose }) {
    const { expandIconPosition, destroyOnHide, showExpandIcon, divider, offset, elevation } = toRefs(props)
    const items = shallowRef<CollapseItemContext[]>([])
    const innerActiveNames = ref<CollapseName[]>([...(props.defaultActiveNames ?? [])])
    const computedActiveNames = computed(() => {
      const activeNames = props.activeNames ?? innerActiveNames.value
      if (!isArray(activeNames)) {
        return [activeNames]
      }
      return activeNames
    })

    const updateActiveNames = (newActiveNames: CollapseName[], e?: Event) => {
      innerActiveNames.value = newActiveNames
      emit('update:activeNames', newActiveNames)
      emit('change', newActiveNames, e ?? new Event('change'))
    }

    const handleClick = (itemName: CollapseName, e: Event) => {
      let newActiveNames: CollapseName[] = []
      if (props.accordion) {
        if (!computedActiveNames.value.includes(itemName)) {
          newActiveNames = [itemName]
        }
      } else {
        newActiveNames = [...computedActiveNames.value]
        const index = newActiveNames.indexOf(itemName)
        if (index > -1) {
          newActiveNames.splice(index, 1)
        } else {
          newActiveNames.push(itemName)
        }
      }
      updateActiveNames(newActiveNames, e)
    }

    const addItem = (item: CollapseItemContext) => {
      if (!items.value.find((current) => current.name === item.name)) {
        items.value.push(item)
      }
    }

    const removeItem = (itemName: CollapseName) => {
      items.value = items.value.filter((item) => item.name !== itemName)
    }

    const toggleAll = (options: CollapseToggleAllOptions) => {
      if (props.accordion) {
        return
      }

      const nextNames = items.value
        .filter((item) => {
          const expanded = computedActiveNames.value.includes(item.name)
          if (options.skipDisabled && item.disabled.value) {
            return expanded
          }
          if (options.expand === 'inverse') {
            return !expanded
          }
          return options.expand
        })
        .map((item) => item.name)

      updateActiveNames(nextNames)
    }

    provide(
      collapseKey,
      reactive({
        activeNames: computedActiveNames,
        slots,
        showExpandIcon,
        expandIconPosition,
        destroyOnHide,
        divider,
        offset,
        elevation,
        handleClick,
        addItem,
        removeItem,
      }),
    )

    const cls = computed(() =>
      classes(
        n(),
        [!props.bordered, n('--borderless')],
        [!props.divider, n('--no-divider')],
        [props.offset, n('--offset')],
      ),
    )

    expose({
      toggleAll,
    })

    return {
      cls,
    }
  },
})
</script>
