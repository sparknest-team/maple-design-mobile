<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number | undefined>(1)
const logs = ref<string[]>([])
function log(name: string, next?: number) {
  logs.value = [name + ': ' + (next ?? '空值'), ...logs.value].slice(0, 6)
}
</script>
<template>
  <div class="number-demo">
    <label
      >父组件接受更新
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
      >固定受控值，父组件不接受更新
      <mp-input-number :model-value="5" @update:model-value="(next: number | undefined) => log('rejected', next)" />
    </label>
    <p>第二个输入框允许编辑草稿，提交后恢复为 5。外部回填不会触发用户 change。</p>
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
