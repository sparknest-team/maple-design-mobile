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
function handleBeforeChange(value, change) {
  setTimeout(() => {
    change(value)
  }, 500)
}
</script>

<template>
  <mp-counter v-model="values.value8" lazy-change :before-change="handleBeforeChange" />

  <div class="space"></div>
</template>

<style lang="less" scoped>
.space {
  height: 40px;
}
</style>
