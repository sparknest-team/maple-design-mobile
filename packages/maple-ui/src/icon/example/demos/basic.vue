<script setup lang="ts">
import { IconCheckCircleFill } from '@maple-design/icons-vue'
</script>
<template>
  <div class="icon-demo-row">
    <div>
      <p>Resolver 自动按需导入</p>
      <mp-icon size="40" color="red"><m-icon-check-circle-fill /></mp-icon>
    </div>
    <div>
      <p>手动按需导入</p>
      <mp-icon size="40" color="red"><IconCheckCircleFill /></mp-icon>
    </div>
  </div>
</template>
<style scoped>
.icon-demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 32px;
}
p {
  margin: 0 0 12px;
  font-size: 14px;
}
</style>
