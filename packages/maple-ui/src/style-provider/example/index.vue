<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
</script>

<template>
  <div>
    <mp-button variant="outline" @click="active = !active">切换局部变量 / Toggle local variables</mp-button>
    <mp-style-provider tag="section" :style-vars="active ? { '--mp-demo-color': 'teal' } : null">
      <p style="color: var(--mp-demo-color, currentColor)">局部颜色 / Local color</p>
      <mp-style-provider :style-vars="{ '--mp-demo-color': 'coral' }">
        <p style="color: var(--mp-demo-color)">嵌套覆盖 / Nested override</p>
      </mp-style-provider>
    </mp-style-provider>
    <p>外部不受影响 / Outside remains unchanged</p>
  </div>
</template>
