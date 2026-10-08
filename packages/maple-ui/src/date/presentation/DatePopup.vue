<template>
  <mp-popup v-bind="popupProps" :open="open" @update:open="$emit('update:open', $event)">
    <div :class="n('panel')">
      <div :class="n('toolbar')">
        <mp-button :class="n('cancel-button')" v-bind="cover" variant="text" @click="$emit('cancel')">
          {{ cancelText }}
        </mp-button>
        <div :class="n('title')">{{ title }}</div>
        <mp-button
          v-if="!disableConfirm"
          :class="n('confirm-button')"
          v-bind="cover"
          variant="text"
          :disabled="!canConfirm"
          @click="$emit('confirm')"
        >
          {{ confirmText }}
        </mp-button>
      </div>
      <slot />
    </div>
  </mp-popup>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MpButton from '../../button'
import MpPopup, { type PopupProps } from '../../popup'
import { createNamespace } from '../../utils/components'

defineOptions({ name: createNamespace('date-field-popup').name })
const props = defineProps<{
  open?: boolean
  range?: boolean
  disableConfirm?: boolean
  canConfirm?: boolean
  title?: string
  cancelText?: string
  confirmText?: string
  popupProps?: Partial<PopupProps>
}>()
defineEmits(['update:open', 'confirm', 'cancel'])
const single = createNamespace('date')
const rangeNamespace = createNamespace('date-range')
const n = (element: string) => (props.range ? rangeNamespace : single).n(element)
const cover = computed(() => ({ [props.range ? 'mp-date-range-cover' : 'mp-date-cover']: '' }))
</script>
