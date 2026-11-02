<script setup lang="ts">
import { ref } from 'vue'

const mixed = ref(false)
const variant = ref('default')
const size = ref('md')
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical" size="sm">
      <mp-form-item label="Variant" field="variant">
        <mp-radio-group
          v-model="variant"
          aria-label="Button group variant"
          :options="['default', 'text', 'outline', 'tonal']"
          variant="button"
        />
      </mp-form-item>
      <mp-form-item label="Size" field="size">
        <mp-radio-group
          v-model="size"
          aria-label="Button group size"
          :options="['xs', 'sm', 'md', 'lg', 'xl']"
          variant="button"
        />
      </mp-form-item>
      <mp-form-item label="Mixed variants"
        ><mp-checkbox v-model="mixed">Text override in middle</mp-checkbox></mp-form-item
      >
    </mp-form>
    <mp-space wrap align="flex-start" :size="24">
      <mp-button-group
        v-for="vertical in [false, true]"
        :key="String(vertical)"
        :aria-label="vertical ? 'Vertical page actions' : 'Horizontal page actions'"
        :vertical="vertical"
        :variant="variant"
        :size="size"
        status="primary"
      >
        <mp-button>Prev</mp-button><mp-button :variant="mixed ? 'text' : undefined">Info</mp-button
        ><mp-button>Next</mp-button>
      </mp-button-group>
    </mp-space>
  </mp-space>
</template>
