<script setup lang="ts">
import { reactive } from 'vue'

const footerAlignments = ['start', 'center', 'end'] as const
const sectionVariants = ['heading-line', 'plain', 'tonal', 'outline'] as const
const headingLevels = [1, 2, 3, 4, 5, 6] as const
const model = reactive<{
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  headingLevel: (typeof headingLevels)[number]
  footerAlign: (typeof footerAlignments)[number]
  sectionVariant: (typeof sectionVariants)[number]
}>({
  size: 'md',
  headingLevel: 4,
  footerAlign: 'end',
  sectionVariant: 'heading-line',
})
</script>

<template>
  <mp-space direction="column" align="stretch">
    <mp-form :model="model" layout="vertical" edit-mode="direct">
      <mp-form-item field="size" label="Card size">
        <mp-radio-group v-model="model.size" aria-label="Card size">
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
      <mp-form-item field="footerAlign" label="Footer alignment">
        <mp-radio-group v-model="model.footerAlign" aria-label="Footer alignment">
          <mp-radio v-for="value in footerAlignments" :key="value" :value="value">{{ value }}</mp-radio>
        </mp-radio-group>
      </mp-form-item>
      <mp-form-item field="sectionVariant" label="Section variant">
        <mp-radio-group v-model="model.sectionVariant" aria-label="Section variant">
          <mp-radio v-for="value in sectionVariants" :key="value" :value="value">{{ value }}</mp-radio>
        </mp-radio-group>
      </mp-form-item>
    </mp-form>
    <output
      >Rendered tag <code>&lt;h{{ model.headingLevel }}&gt;</code></output
    >

    <mp-card
      :size="model.size"
      :heading-level="model.headingLevel"
      :footer-align="model.footerAlign"
      title="Project overview"
      description="Project settings apply to the whole team."
      top-divider
      bottom-divider
    >
      <mp-section
        :size="model.size"
        :heading-level="model.headingLevel"
        :variant="model.sectionVariant"
        title="Member permissions"
        description="Permissions are grouped by role."
      >
        Administrators can invite members.
      </mp-section>
      <template #footer>Last updated today</template>
    </mp-card>
  </mp-space>
</template>
