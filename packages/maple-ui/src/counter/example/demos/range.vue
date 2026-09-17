<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 0,
  value2: 0,
  value3: 0,
  value4: 0,
  value5: 0,
  value6: 0,
  value7: 0,
  value8: 0,
})
</script>

<template>
  <mp-counter v-model="values.value2" :min="0" :max="5" />
</template>

<style lang="less" scoped>
.space {
  height: 40px;
}
</style>
