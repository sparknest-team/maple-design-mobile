<script setup lang="ts">
import { reactive } from 'vue'

const headingLevels = [1, 2, 3, 4, 5, 6] as const
const model = reactive<{ size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; headingLevel: (typeof headingLevels)[number] }>({
  size: 'md',
  headingLevel: 4,
})
</script>

<template>
  <mp-space direction="column" align="stretch">
    <mp-form :model="model" layout="vertical" edit-mode="direct">
      <mp-form-item field="size" label="Section size">
        <mp-radio-group v-model="model.size" aria-label="Section size">
          <mp-radio value="xs">Extra small (xs)</mp-radio>
          <mp-radio value="sm">Compact (sm)</mp-radio>
          <mp-radio value="md">Default (md)</mp-radio>
          <mp-radio value="lg">Large (lg)</mp-radio>
          <mp-radio value="xl">Extra large (xl)</mp-radio>
        </mp-radio-group>
      </mp-form-item>
      <mp-form-item field="headingLevel" label="Heading level">
        <mp-radio-group v-model="model.headingLevel" aria-label="Heading level">
          <mp-radio v-for="level in headingLevels" :key="level" :value="level">h{{ level }}</mp-radio>
        </mp-radio-group>
      </mp-form-item>
    </mp-form>
    <output
      >Rendered tag <code>&lt;h{{ model.headingLevel }}&gt;</code></output
    >

    <mp-section
      :size="model.size"
      variant="outline"
      show-marker
      :heading-level="model.headingLevel"
      title="Member permissions"
    >
      <div class="section-size-content">Administrators can invite members and update project settings.</div>
    </mp-section>
  </mp-space>
</template>

<style scoped>
.section-size-content {
  border: 1px dashed currentColor;
  padding: 8px;
}
</style>
