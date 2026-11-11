<template><SearchSelect edit-mode="direct" v-bind="$attrs" :clearable="false" /></template>
<script setup lang="ts">
import SearchSelect from '../select'
import { useSearchFieldBoundary } from './field-form-boundary'

defineOptions({ inheritAttrs: false })
useSearchFieldBoundary()
</script>
