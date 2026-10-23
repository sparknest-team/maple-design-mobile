<script setup lang="ts">
import { type Component } from 'vue'
import { ReviewSuite } from '@ui-foundation/ui-doc-preview'
import Select from '../../src/select'
import '../../src/select/style'

defineProps<{ cases: { name: string; label: string; component: Component }[] }>()
</script>
<template><ReviewSuite :cases="cases" :select="Select" /></template>
