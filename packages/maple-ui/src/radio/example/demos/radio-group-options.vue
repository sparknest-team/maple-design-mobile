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
  { label: '吃饭', value: 0 },
  { label: '睡觉', value: 1 },
  { label: '打游戏', value: 2, disabled: true },
])
</script>

<template>
  <mp-radio-group v-model="optionValue" :options="options" />
  <div class="relation">当前的值: {{ optionValue }}</div>
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
