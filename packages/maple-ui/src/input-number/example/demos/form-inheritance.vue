<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ quantity: 2, editable: 3 })
const disabled = ref(false)
const readonly = ref(false)
</script>
<template>
  <div class="number-demo">
    <mp-checkbox v-model="disabled">表单禁用</mp-checkbox>
    <mp-checkbox v-model="readonly">表单只读</mp-checkbox>
    <mp-form :model="model" :disabled="disabled" :readonly="readonly" size="lg">
      <mp-form-item field="quantity" label="继承状态">
        <mp-input-number v-model="model.quantity" clearable />
      </mp-form-item>
      <mp-form-item field="editable" label="显式覆盖">
        <mp-input-number v-model="model.editable" :disabled="false" :readonly="false" size="sm" />
      </mp-form-item>
    </mp-form>
  </div>
</template>
<style scoped>
.number-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
