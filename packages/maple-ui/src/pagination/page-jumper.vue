<template>
  <span :class="cls">
    <span v-if="!simple" :class="n('jumper-prepend')">
      <slot name="jumper-prepend">{{ (pt ? pt : t)('paginationJump') }}</slot>
    </span>
    <mp-input
      v-model="inputValue"
      mp-pagination-cover
      variant="standard"
      :hint="false"
      :disabled="disabled"
      @blur="handleChange"
      @keydown.enter="handleChange"
    />
    <span v-if="$slots['jumper-append']" :class="n('jumper-append')">
      <slot name="jumper-append" />
    </span>
    <template v-if="simple">
      <span>
        / {{ pages }}
        <div :class="n('simple-line')"></div>
      </span>
    </template>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { toNumber } from '@maplejs/maple-shared'
import MpInput from '../input'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import { createNamespace } from '../utils/components'
import { getLegalPage } from './utils'

const { n, classes } = createNamespace('pagination')

export default defineComponent({
  name: 'MpPaginationJumper',
  components: { MpInput },
  props: {
    current: {
      type: Number,
      required: true,
    },
    simple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    pages: {
      type: Number,
      required: true,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { t: pt } = injectLocaleProvider()
    const inputValue = ref(props.simple ? String(props.current) : '')

    const handleChange = (event?: KeyboardEvent | FocusEvent) => {
      ;(event?.target as HTMLInputElement | undefined)?.blur?.()

      const page = getLegalPage(toNumber(inputValue.value) || 1, {
        min: 1,
        max: Math.max(props.pages, 1),
      })
      emit('change', page)

      nextTick(() => {
        if (!props.simple) {
          inputValue.value = ''
        } else {
          inputValue.value = String(page)
        }
      })
    }

    watch(
      () => props.current,
      (value) => {
        if (props.simple && String(value) !== inputValue.value) {
          inputValue.value = String(value)
        }
      },
    )

    const cls = computed(() => classes(n('jumper'), [props.simple, n('simple')], [!props.simple, n('quickly')]))

    return {
      n,
      cls,
      t,
      pt,
      inputValue,
      handleChange,
    }
  },
})
</script>
