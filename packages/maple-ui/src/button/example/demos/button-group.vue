<script setup lang="ts">
import { ref } from 'vue'

const size = ref('md')
const disabled = ref(false)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>Size</span>
        <mp-select
          v-model="size"
          aria-label="Button group size"
          :options="['xs', 'sm', 'md', 'lg', 'xl'].map((value) => ({ label: value, value }))"
          :clearable="false"
        />
      </div>
      <mp-checkbox v-model="disabled">Disable group</mp-checkbox>
    </mp-space>
    <mp-button-group status="primary" :size="size" :disabled="disabled">
      <mp-button>Inherited</mp-button>
      <mp-button status="success">Status override</mp-button>
      <mp-button :disabled="false">Enabled override</mp-button>
    </mp-button-group>
  </mp-space>
</template>
