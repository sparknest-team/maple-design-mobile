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
</script>

<template>
  <mp-radio-group v-model="value9" direction="vertical">
    <mp-radio :value="0">吃饭</mp-radio>
    <mp-radio :value="1">睡觉</mp-radio>
  </mp-radio-group>
  <div class="relation">当前的值: {{ value9 }}</div>

  <div class="space"></div>
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
