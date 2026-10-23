<script setup lang="ts">
import { ref } from 'vue'

const variant = ref('default')
const size = ref('md')
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>Variant</span>
        <mp-select
          v-model="variant"
          aria-label="Button group variant"
          :options="['default', 'text', 'outline', 'tonal'].map((value) => ({ label: value, value }))"
          :clearable="false"
        />
      </div>
      <div>
        <span>Size</span>
        <mp-select
          v-model="size"
          aria-label="Button group size"
          :options="['xs', 'sm', 'md', 'lg', 'xl'].map((value) => ({ label: value, value }))"
          :clearable="false"
        />
      </div>
    </mp-space>
    <mp-space align="start" :size="24">
      <mp-button-group
        v-for="vertical in [false, true]"
        :key="String(vertical)"
        :vertical="vertical"
        :variant="variant"
        :size="size"
        status="primary"
      >
        <mp-button>Previous</mp-button><mp-button>Next</mp-button>
      </mp-button-group>
    </mp-space>
  </mp-space>
</template>
