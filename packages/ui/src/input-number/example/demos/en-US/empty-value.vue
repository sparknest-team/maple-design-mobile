<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ quantity: -1 as number | null | undefined })
const restored = ref<number | null | undefined>(12)
</script>
<template>
  <mp-space direction="column">
    <p>-1 means missing and renders blank; 0 remains a valid number. Clearing produces -1.</p>
    <mp-form :model="model" layout="vertical">
      <mp-form-item field="quantity" label="Quantity">
        <mp-input-number
          v-model="model.quantity"
          edit-mode="direct"
          clearable
          :empty-values="[null, undefined, -1]"
          :empty-value="-1"
        />
      </mp-form-item>
    </mp-form>
    <mp-space wrap>
      <mp-button @click="model.quantity = 0">Set to 0</mp-button>
      <mp-button @click="model.quantity = -1">Set to -1</mp-button>
    </mp-space>
    <p>
      Current model: <output>{{ String(model.quantity) }}</output>
    </p>
    <p>This field clears to 0 without treating 0 as missing.</p>
    <mp-form layout="vertical">
      <mp-form-item label="Clear restores valid zero">
        <mp-input-number v-model="restored" edit-mode="direct" clearable :empty-value="0" />
        <output>{{ String(restored) }}</output>
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
