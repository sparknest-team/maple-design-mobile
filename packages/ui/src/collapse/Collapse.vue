<template>
  <div :class="cls">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, ref, shallowRef, toRefs } from 'vue'
import { createNamespace } from '../utils/components'
import { collapseKey, type CollapseItemContext } from './context'
import { collapseProps, type CollapseName, type CollapseSlots, type CollapseToggleAllOptions } from './props'

defineOptions({ name: createNamespace('collapse').name })

const props = defineProps(collapseProps)
const emit = defineEmits<{
  'update:modelValue': [expandedNames: CollapseName[]]
  change: [expandedNames: CollapseName[], ev: Event]
}>()
const slots = defineSlots<CollapseSlots>()
const { n, classes } = createNamespace('collapse')
const { expandIconPosition, destroyOnHide, showExpandIcon, divider, offset } = toRefs(props)
const items = shallowRef<CollapseItemContext[]>([])
const innerExpandedNames = ref<CollapseName[]>([...(props.defaultValue ?? [])])
const computedExpandedNames = computed(() => {
  const expandedNames = props.modelValue ?? innerExpandedNames.value
  const names = Array.isArray(expandedNames) ? expandedNames : [expandedNames]
  return props.accordion ? names.slice(0, 1) : names
})

function updateExpandedNames(newExpandedNames: CollapseName[], e?: Event) {
  innerExpandedNames.value = newExpandedNames
  emit('update:modelValue', newExpandedNames)
  emit('change', newExpandedNames, e ?? new Event('change'))
}

function handleClick(itemName: CollapseName, e: Event) {
  let newExpandedNames: CollapseName[] = []
  if (props.accordion) {
    if (!computedExpandedNames.value.includes(itemName)) {
      newExpandedNames = [itemName]
    }
  } else {
    newExpandedNames = [...computedExpandedNames.value]
    const index = newExpandedNames.indexOf(itemName)
    if (index > -1) {
      newExpandedNames.splice(index, 1)
    } else {
      newExpandedNames.push(itemName)
    }
  }
  updateExpandedNames(newExpandedNames, e)
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
      const expanded = computedExpandedNames.value.includes(item.name)
      if (options.skipDisabled && item.disabled.value) {
        return expanded
      }
      if (options.expand === 'inverse') {
        return !expanded
      }
      return options.expand
    })
    .map((item) => item.name)

  updateExpandedNames(nextNames)
}

provide(
  collapseKey,
  reactive({
    expandedNames: computedExpandedNames,
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
