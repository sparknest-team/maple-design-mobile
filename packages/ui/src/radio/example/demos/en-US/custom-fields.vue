<script setup>
import { computed, reactive, toRefs } from 'vue'

const values = reactive({
  value: false,
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: 0,
  value9: 0,
  optionValue: 0,
  fieldValue: 0,
})
const { value, value2, value3, value4, value5, value6, value9, optionValue, fieldValue } = toRefs(values)
const options = computed(() => [
  { label: 'Eat', value: 0 },
  { label: 'Sleep', value: 1 },
  { label: 'Game', value: 2, disabled: true },
])
const fieldOptions = computed(() => [
  { name: 'Eat', id: 0 },
  { name: 'Sleep', id: 1 },
  { name: 'Game', id: 2 },
])
</script>

<template>
  <mp-radio-group v-model="fieldValue" :options="fieldOptions" :field-names="{ label: 'name', value: 'id' }" />
  <div class="relation">Current value: {{ fieldValue }}</div>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.button {
  margin-right: 10px;
}

.space {
  height: 40px;
}
</style>
