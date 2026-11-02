<script setup lang="ts">
import { computed, ref } from 'vue'

const variant = ref('default')
const size = ref('md')
const background = ref('navy')
const variants = ['default', 'text', 'outline', 'tonal']
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger']
const backgrounds = [
  { label: 'Navy / 深蓝', value: 'navy', color: '#17224B' },
  { label: 'White / 白色', value: 'light', color: '#FFFFFF' },
  { label: 'Light gray / 浅灰', value: 'muted', color: '#F5F5F5' },
  { label: 'Dark gray / 深灰', value: 'dark', color: '#252525' },
]
const cardBackground = computed(() => backgrounds.find((item) => item.value === background.value)?.color)
</script>
<template>
  <mp-space direction="column" block align="stretch" :size="16">
    <mp-form layout="vertical" size="sm">
      <mp-form-item label="Variant" field="variant">
        <mp-radio-group v-model="variant" :options="variants" aria-label="Button variant" variant="button" />
      </mp-form-item>
      <mp-form-item label="Size" field="size">
        <mp-radio-group v-model="size" :options="sizes" aria-label="Button size" variant="button" />
      </mp-form-item>
      <mp-form-item label="Background" field="background">
        <mp-radio-group v-model="background" :options="backgrounds" aria-label="Button background" variant="button" />
      </mp-form-item>
    </mp-form>
    <mp-card
      class="button-variant-card"
      :data-background="background"
      :elevation="false"
      :style="{ '--mp-card-background': cardBackground }"
    >
      <mp-space wrap>
        <mp-button v-for="status in statuses" :key="status" :status="status" :variant="variant" :size="size">{{
          status
        }}</mp-button>
      </mp-space>
    </mp-card>
  </mp-space>
</template>
