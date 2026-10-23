<script setup lang="ts">
import { ref } from 'vue'

const direction = ref<'row' | 'column'>('row')
const gap = ref(8)
const wrap = ref(false)
const count = ref(3)
</script>

<template>
  <div>
    <mp-space wrap :size="8">
      <mp-button @click="direction = direction === 'row' ? 'column' : 'row'">Toggle direction</mp-button>
      <mp-button @click="gap = gap === 8 ? 24 : 8">Toggle gap</mp-button>
      <mp-button @click="wrap = !wrap">Toggle wrap</mp-button>
      <mp-button :disabled="count >= 6" @click="count++">Add item</mp-button>
      <mp-button :disabled="count <= 1" @click="count--">Remove item</mp-button>
    </mp-space>
    <p aria-live="polite">{{ direction }} / gap {{ gap }} / wrap {{ wrap }} / items {{ count }}</p>
    <div style="max-width: 100%; overflow: auto">
      <mp-space
        data-demo-layout
        :direction="direction"
        :size="[8, gap]"
        :wrap="wrap"
        style="width: 260px; max-width: 100%"
      >
        <div
          v-for="item in count"
          :key="item"
          style="width: 72px; padding: 8px; box-sizing: border-box; border: 1px solid currentColor"
        >
          Item {{ item }}
        </div>
      </mp-space>
    </div>
  </div>
</template>
