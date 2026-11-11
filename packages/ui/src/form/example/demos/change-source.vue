<script setup>
import { reactive, ref } from 'vue'

const model = reactive({ input: 'Draft', textarea: 'Notes', number: 1, toggle: false })
const changes = ref([])
function record(field, value, event) {
  changes.value.unshift({ field, value, source: event?.type || 'programmatic' })
}
</script>
<template>
  <section>
    <p>打开字段、修改并保存，下方显示真实确认事件。Open a field, edit and save to inspect its confirmation source.</p>
    <mp-input v-model="model.input" edit-mode="popup" @change="(value, event) => record('input', value, event)" />
    <mp-textarea
      v-model="model.textarea"
      edit-mode="popup"
      @change="(value, event) => record('textarea', value, event)"
    />
    <mp-input-number
      v-model="model.number"
      edit-mode="popup"
      @change="(value, event) => record('number', value, event)"
    />
    <mp-switch v-model="model.toggle" edit-mode="popup" @change="(value, event) => record('switch', value, event)" />
    <pre role="status">{{ JSON.stringify(changes, null, 2) }}</pre>
  </section>
</template>
