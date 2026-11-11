<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number | undefined>(1)
const logs = ref<string[]>([])
function log(name: string, next?: number) {
  logs.value = [name + ': ' + (next ?? 'Empty'), ...logs.value].slice(0, 6)
}
</script>
<template>
  <div class="number-demo">
    <label
      >Parent accepts updates
      <mp-input-number
        v-model="value"
        clearable
        model-event="input"
        @input="(next: number | undefined) => log('input', next)"
        @update:model-value="(next: number | undefined) => log('update', next)"
        @change="(next: number | undefined) => log('change', next)"
        @clear="() => log('clear')"
      />
    </label>
    <label
      >Fixed controlled value; parent rejects updates
      <mp-input-number :model-value="5" @update:model-value="(next: number | undefined) => log('rejected', next)" />
    </label>
    <p>The second input allows a draft, then restores 5 on commit. External updates never emit change.</p>
    <ol aria-live="polite">
      <li v-for="(entry, index) in logs" :key="index">{{ entry }}</li>
    </ol>
  </div>
</template>
<style scoped>
.number-demo,
.number-demo label {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
