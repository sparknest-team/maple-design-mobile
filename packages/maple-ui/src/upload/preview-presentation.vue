<template>
  <UploadPopup
    :popup-container="popupContainer"
    :open="Boolean(file)"
    placement="center"
    :aria-label="label"
    @update:open="(open) => !open && $emit('close')"
    @closed="$emit('closed')"
    ><video v-if="file" controls playsinline :src="file.url" style="width: 100%; max-height: 70vh"
  /></UploadPopup>
</template>
<script setup lang="ts">
import UploadPopup from '../popup'
import type { UploadFileItem } from './interfaces'
import type { UploadProps } from './props'

defineProps<{ file?: UploadFileItem; label: string; popupContainer?: UploadProps['popupContainer'] }>()
defineEmits<{ close: []; closed: [] }>()
</script>
