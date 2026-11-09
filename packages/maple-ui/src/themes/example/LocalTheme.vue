<script setup lang="ts">
import { computed, ref } from 'vue'

const color = ref('#6750a4')
const styleVars = computed(() => ({
  '--mp-button-primary-color': color.value,
  '--mp-button-primary-foreground-color': '#ffffff',
  '--mp-button-border-radius': '16px',
}))
</script>

<template>
  <section class="local-theme-demo" aria-label="局部主题覆盖">
    <mp-radio-group v-model="color" orientation="horizontal">
      <mp-radio value="#6750a4">紫色 / Purple</mp-radio>
      <mp-radio value="#006b5f">青色 / Teal</mp-radio>
      <mp-radio value="#2456a6">蓝色 / Blue</mp-radio>
    </mp-radio-group>
    <div class="local-theme-demo__compare">
      <div>
        <p>跟随页面 / Page theme</p>
        <mp-button status="primary">默认按钮 / Default</mp-button>
      </div>
      <mp-theme-provider :style-vars="styleVars">
        <p>局部覆盖 / Local override</p>
        <mp-button status="primary">定制按钮 / Custom</mp-button>
      </mp-theme-provider>
    </div>
  </section>
</template>

<style scoped>
.local-theme-demo__compare {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
  gap: 16px;
  margin-top: 16px;
}
</style>
