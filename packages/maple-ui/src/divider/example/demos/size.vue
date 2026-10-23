<script setup>
const presets = ['xs', 'sm', 'md', 'lg', 'xl']
</script>

<template>
  <div>
    <div v-for="size in presets" :key="size">
      <code>inset="{{ size }}" spacing="{{ size }}"</code>
      <mp-divider :inset="size" :spacing="size" />
    </div>
    <p>数值 / Number · inset=24, spacing=16</p>
    <mp-divider :inset="24" :spacing="16" />
    <p>CSS 长度 / CSS length · inset=2rem</p>
    <mp-divider inset="2rem" />
    <p>非对称 / Asymmetric · inset=[8, 32], spacing=[12, 24]</p>
    <mp-divider :inset="[8, 32]" :spacing="[12, 24]" />
    <p>竖直 / Vertical · inset=[8, 24], spacing=[12, 20]</p>
    <div class="vertical-preview">
      <span>Before</span>
      <mp-divider orientation="vertical" :inset="[8, 24]" :spacing="[12, 20]" />
      <span>After</span>
    </div>
  </div>
</template>

<style scoped>
.vertical-preview {
  display: flex;
  align-items: center;
  height: 96px;
}
</style>
