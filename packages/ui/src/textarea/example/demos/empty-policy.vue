<script setup>
import { computed, ref } from 'vue'

const sentinel = ref(false)
const emptyValue = computed(() => (sentinel.value ? 'CLEARED' : null))
const emptyValues = [undefined, null, '', 'CLEARED']
const direct = ref('Direct draft')
const deferred = ref('Deferred draft')
function reset() {
  direct.value = 'Direct draft'
  deferred.value = 'Deferred draft'
}
</script>
<template>
  <mp-space direction="column">
    <mp-space wrap>
      <mp-button @click="sentinel = !sentinel">切换清空值 / Toggle empty value</mp-button>
      <mp-button @click="reset">重置示例 / Reset values</mp-button>
    </mp-space>
    <p role="status">empty-value: {{ JSON.stringify(emptyValue) }}</p>
    <mp-textarea
      v-model="direct"
      edit-mode="direct"
      :empty-value="emptyValue"
      :empty-values="emptyValues"
      clearable
      aria-label="Direct text"
      placeholder="直接编辑 / Direct"
    />
    <mp-textarea
      v-model="deferred"
      edit-mode="popup"
      :empty-value="emptyValue"
      :empty-values="emptyValues"
      clearable
      aria-label="Deferred text"
      placeholder="确认后保存 / Deferred"
    />
    <p>
      先切换清空值再清空；延迟编辑确认后回写。Change the policy before clearing; deferred changes publish on confirm.
    </p>
    <pre class="empty-policy-model">{{ JSON.stringify({ direct, deferred }) }}</pre>
  </mp-space>
</template>
<style scoped>
.empty-policy-model {
  max-width: 100%;
  overflow-x: auto;
}
</style>
