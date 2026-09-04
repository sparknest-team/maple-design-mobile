<script lang="ts">
import { defineComponent } from 'vue'
import MpLoading from '../loading'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import { createNamespace } from '../utils/components'
import { listProps } from './props'

const { name, n, classes } = createNamespace('list')

export default defineComponent({
  name,
  components: { MpLoading },
  props: listProps,
  setup() {
    const { t: pt } = injectLocaleProvider()

    return {
      pt,
      t,
      n,
      classes,
    }
  },
})
</script>

<template>
  <div
    :class="
      classes(
        n(),
        n(`--${size}`),
        bordered ? n('--bordered') : undefined,
        split ? n('--split') : undefined,
        n('$--box'),
      )
    "
    :aria-busy="loading"
  >
    <div v-if="$slots.header" :class="n('header')">
      <slot name="header" />
    </div>

    <div :class="n('content')" role="list">
      <slot v-if="$slots.default" />
      <template v-else-if="data?.length">
        <slot v-for="(item, index) in data" name="item" :item="item" :index="index" />
      </template>
      <slot v-else-if="!loading" name="empty">
        <div :class="n('empty')">{{ (pt ? pt : t)('emptyDescription') }}</div>
      </slot>
    </div>

    <div v-if="loading" :class="n('loading')">
      <mp-loading size="xs" :radius="10" />
    </div>

    <div v-if="$slots.footer" :class="n('footer')">
      <slot name="footer" />
    </div>
  </div>
</template>
