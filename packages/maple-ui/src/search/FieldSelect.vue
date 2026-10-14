<template><SearchSelect v-bind="$attrs" /></template>
<script setup lang="ts">
import SearchSelect from '../select'
import { useSearchFieldBoundary } from './field-form-boundary'

defineOptions({ inheritAttrs: false })
useSearchFieldBoundary()
</script>
