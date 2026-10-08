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

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import MpButton from '../../button'
import MpPopup, { type PopupProps } from '../../popup'
import { createNamespace } from '../../utils/components'

const time = createNamespace('time')
const range = createNamespace('time-range')

/** Mobile presentation only: the field remains the sole owner of open/draft/commit. */
export default defineComponent({
  name: createNamespace('time-field-popup').name,
  components: { MpPopup, MpButton },
  props: {
    open: Boolean,
    range: Boolean,
    disableConfirm: Boolean,
    canConfirm: Boolean,
    title: String,
    cancelText: String,
    confirmText: String,
    popupProps: Object as PropType<Partial<PopupProps>>,
  },
  emits: ['update:open', 'confirm', 'cancel'],
  setup(props) {
    return {
      n: (element: string) => (props.range ? range : time).n(element),
      cover: computed(() => ({ [props.range ? 'mp-time-range-cover' : 'mp-time-cover']: '' })),
    }
  },
})
</script>
