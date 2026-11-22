<template><slot /></template>
<script setup lang="ts">
import { getCurrentInstance, onUpdated, type VNode } from 'vue'

const props = defineProps<{ onChanged: (subTree?: VNode) => void; revision?: number }>()
const instance = getCurrentInstance()!
onUpdated(() => props.onChanged(instance.subTree))
</script>
