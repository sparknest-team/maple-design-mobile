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
  { label: '吃饭', value: 0 },
  { label: '睡觉', value: 1 },
  { label: '游戏', value: 2, disabled: true },
])
</script>

<template>
  <mp-checkbox-group v-model="optionsValue" :options="options" />
  <div class="relation">当前的值: {{ optionsValue }}</div>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.space {
  height: 40px;
}
</style>
