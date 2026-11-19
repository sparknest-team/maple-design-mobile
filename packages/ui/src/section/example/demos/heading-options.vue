<script setup lang="ts">
import { ref } from 'vue'
import { copy } from '../messages'
import type { SectionVariant } from '../../props'

const variants = ['plain', 'line', 'card'] as const
const variant = ref<SectionVariant>('card')
const withTitle = ref(false)
const withDescription = ref(false)
</script>

<template>
  <mp-space direction="column" align="stretch">
    <mp-radio-group
      v-model="variant"
      :aria-label="copy.variantLabel"
      :options="variants.map((value) => ({ value, label: value }))"
    />
    <mp-space wrap>
      <mp-checkbox v-model="withTitle">{{ copy.withTitle }}</mp-checkbox>
      <mp-checkbox v-model="withDescription">{{ copy.withDescription }}</mp-checkbox>
    </mp-space>
    <mp-section
      :variant="variant"
      :title="withTitle ? copy.permissions : undefined"
      :description="withDescription ? copy.scope : undefined"
    >
      <dl>
        <dt>{{ copy.admin }}</dt>
        <dd>{{ copy.manage }}</dd>
        <dt>{{ copy.member }}</dt>
        <dd>{{ copy.update }}</dd>
      </dl>
    </mp-section>
  </mp-space>
</template>
