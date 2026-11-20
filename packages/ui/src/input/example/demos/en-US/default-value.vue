<script setup lang="ts">
import { ref } from 'vue'

const seed = ref('A: initial text')
const instanceKey = ref(0)
const lastUpdate = ref<string | null>(null)
const updateCount = ref(0)
const controlled = ref('')
function record(value: string) {
  lastUpdate.value = value
  updateCount.value += 1
}
function remount() {
  instanceKey.value += 1
  lastUpdate.value = null
  updateCount.value = 0
}
</script>

<template>
  <div>
    <p>
      1. Uncontrolled: defaultValue supplies the initial text. Typing updates the component itself; the seed below stays
      unchanged.
    </p>
    <mp-input
      :key="instanceKey"
      edit-mode="direct"
      :default-value="seed"
      aria-label="Uncontrolled input"
      @update:model-value="record"
    />
    <p>
      defaultValue = <code>{{ seed }}</code>
    </p>
    <p role="status">
      update:modelValue × {{ updateCount }}; last emitted value =
      <code>{{ lastUpdate === null ? '(none)' : JSON.stringify(lastUpdate) }}</code>
    </p>
    <mp-space wrap>
      <mp-button @click="seed = seed.startsWith('A:') ? 'B: new default' : 'A: initial text'"
        >Change defaultValue only</mp-button
      >
      <mp-button @click="remount">Remount input</mp-button>
    </mp-space>
    <p>
      Try typing, then change defaultValue: the current text stays. Remount to read the latest defaultValue.
      Initialization never emits update:modelValue.
    </p>
    <p>2. Controlled: v-model is the source of truth. Its initial empty string takes precedence over defaultValue.</p>
    <mp-input
      v-model="controlled"
      edit-mode="direct"
      default-value="This default is ignored"
      aria-label="Controlled input"
    />
    <p role="status">
      v-model = <code>{{ JSON.stringify(controlled) }}</code>
    </p>
    <mp-space wrap>
      <mp-button @click="controlled = 'Parent supplied text'">Update parent value</mp-button>
      <mp-button @click="controlled = ''">Clear parent value</mp-button>
    </mp-space>
    <p>
      For a form, initialize the bound field in the parent. defaultValue does not write an initial value into the parent
      form.
    </p>
  </div>
</template>
