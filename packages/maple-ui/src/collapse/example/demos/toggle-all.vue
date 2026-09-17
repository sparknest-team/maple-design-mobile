<template>
  <mp-space direction="column" :style="{ width: '100%' }">
    <mp-space wrap>
      <mp-button @click="toggleAll({ expand: 'inverse' })">Toggle all</mp-button>
      <mp-button @click="toggleAll({ expand: 'inverse', skipDisabled: true })">Toggle all (skip disabled)</mp-button>
      <mp-button @click="toggleAll({ expand: true })">Expand all</mp-button>
      <mp-button @click="toggleAll({ expand: true, skipDisabled: true })">Expand all (skip disabled)</mp-button>
      <mp-button @click="toggleAll({ expand: false })">Collapse all</mp-button>
      <mp-button @click="toggleAll({ expand: false, skipDisabled: true })">Collapse all (skip disabled)</mp-button>
    </mp-space>
    <mp-collapse ref="collapseRef" v-model:active-names="activeNames">
      <mp-collapse-item title="Panel 1" name="1">
        <div>Content 1</div>
      </mp-collapse-item>
      <mp-collapse-item title="Panel 2" name="2">
        <div>Content 2</div>
      </mp-collapse-item>
      <mp-collapse-item title="Panel 3" name="3" disabled>
        <div>Content 3</div>
      </mp-collapse-item>
      <mp-collapse-item title="Panel 4" name="4" disabled>
        <div>Content 4</div>
      </mp-collapse-item>
    </mp-collapse>
  </mp-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const collapseRef = ref<{
  toggleAll: (options: { expand: boolean | 'inverse'; skipDisabled?: boolean }) => void
}>()
const activeNames = ref<(string | number)[]>(['2', '4'])

const toggleAll = (options: { expand: boolean | 'inverse'; skipDisabled?: boolean }) => {
  collapseRef.value?.toggleAll(options)
}
</script>
