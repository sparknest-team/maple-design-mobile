<template>
  <SearchPopup
    :open="open"
    placement="top"
    :overlay="false"
    :class="n('popup')"
    :style="{ width: '100vw', height: '100vh', overflow: 'hidden' }"
    transition="mp-fade"
    safe-area-inset-top
    :aria-label="historyText"
    @update:open="$emit('update:open', $event)"
    @closed="$emit('closed')"
    ><slot
  /></SearchPopup>
</template>
<script setup lang="ts">
import SearchPopup from '../popup'
import { createNamespace } from '../utils/components'
import { useSearchLocale } from './use-search-locale'

const { historyText } = useSearchLocale()
defineProps<{ open: boolean }>()
defineEmits<{ 'update:open': [open: boolean]; closed: [] }>()
const { n } = createNamespace('search')
</script>
