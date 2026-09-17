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
</script>

<template>
  <mp-checkbox v-model="value2" :value="1"> 当前的值: {{ value2 }} </mp-checkbox>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.space {
  height: 40px;
}
</style>
