<template>
  <div :class="cls">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, ref, shallowRef, toRefs, useSlots } from 'vue'
import { createNamespace } from '../utils/components'
import { collapseKey, type CollapseItemContext } from './context'
import { collapseProps, type CollapseName, type CollapseToggleAllOptions } from './props'

defineOptions({ name: createNamespace('collapse').name })

const props = defineProps(collapseProps)
const emit = defineEmits<{
  'update:activeNames': [activeNames: CollapseName[]]
  change: [activeNames: CollapseName[], ev: Event]
}>()
const slots = useSlots()
const { n, classes } = createNamespace('collapse')
const { expandIconPosition, destroyOnHide, showExpandIcon, divider, offset } = toRefs(props)
const items = shallowRef<CollapseItemContext[]>([])
const innerActiveNames = ref<CollapseName[]>([...(props.defaultActiveNames ?? [])])
const computedActiveNames = computed(() => {
  const activeNames = props.activeNames ?? innerActiveNames.value
  const names = Array.isArray(activeNames) ? activeNames : [activeNames]
  return props.accordion ? names.slice(0, 1) : names
})

function updateActiveNames(newActiveNames: CollapseName[], e?: Event) {
  innerActiveNames.value = newActiveNames
  emit('update:activeNames', newActiveNames)
  emit('change', newActiveNames, e ?? new Event('change'))
}

function handleClick(itemName: CollapseName, e: Event) {
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

function addItem(item: CollapseItemContext) {
  if (!items.value.find((current) => current.name === item.name)) {
    items.value.push(item)
  }
}

function removeItem(itemName: CollapseName) {
  items.value = items.value.filter((item) => item.name !== itemName)
}

function toggleAll(options: CollapseToggleAllOptions) {
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

defineExpose({
  toggleAll,
})
</script>
