<template>
  <div v-if="quick" :class="n()" role="group" aria-label="快捷选择">
    <Button
      v-for="(item, index) in quick.items.value"
      :key="index"
      variant="text"
      status="primary"
      :class="n('item')"
      :disabled="quick.disabled(item)"
      @click="quick.choose(index)"
      ><template v-if="typeof item.label === 'function'"><component :is="item.label" /></template
      ><template v-else>{{ item.label }}</template></Button
    >
  </div>
</template>
<script setup lang="ts">
import Button from '../button'
import { createNamespace } from '../utils/components'
import { useRangeQuickPanel } from './range-quick-selection'

defineOptions({ name: createNamespace('date-range-quick-panel').name })
const { n } = createNamespace('date-range-quick-panel')
const quick = useRangeQuickPanel()
</script>
