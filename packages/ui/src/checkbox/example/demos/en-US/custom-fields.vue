<script setup>
import { computed, reactive, toRefs } from 'vue'

const values = reactive({
  value: false,
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: [],
  value9: [],
  value10: false,
  value11: [],
  group: null,
  indeterminate: true,
  optionsValue: [],
  fieldValue: [],
})
const {
  value,
  value2,
  value3,
  value4,
  value5,
  value6,
  value9,
  group,
  value10,
  value11,
  indeterminate,
  optionsValue,
  fieldValue,
} = toRefs(values)
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
  <mp-checkbox-group v-model="fieldValue" :options="fieldOptions" :field-names="{ label: 'name', value: 'id' }" />
  <div class="relation">Current value: {{ fieldValue }}</div>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.space {
  height: 40px;
}
</style>
