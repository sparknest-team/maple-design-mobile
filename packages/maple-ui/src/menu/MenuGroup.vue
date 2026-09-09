<template>
  <MenuView :options="viewOptions">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>
  </MenuView>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '../utils/components'
import { props as groupProps } from './group-props'
import { groupAppearance } from './platform'
import MenuView from './render'

defineOptions({ name: createNamespace('menu-group').name })
const props = defineProps(groupProps)
const viewOptions = computed(() => ({ kind: 'group', ...groupAppearance(), title: props.title }))
</script>
