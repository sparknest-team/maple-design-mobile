<script setup>
import { onMounted, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const list = ref([])

onMounted(() => {
  for (let i = 0; i < 26; i++) {
    list.value.push(String.fromCharCode(65 + i))
  }
})

watchLang(use)
onThemeChange()

function handleChange(value) {
  console.log(value)
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-index-bar duration="300" :sticky-offset-top="54" @change="handleChange">
    <div v-for="item in list" :key="item">
      <mp-index-anchor
        :index="item"
        class="index-bar-example-anchor"
        :style="{ background: 'var(--mp-chip-primary-color)', color: 'var(--mp-chip-primary-text-color)' }"
      >
        {{ t('title') }} {{ item }}
      </mp-index-anchor>
      <mp-cell>{{ item }} {{ t('text') }}</mp-cell>
      <mp-cell>{{ item }} {{ t('text') }}</mp-cell>
    </div>
  </mp-index-bar>
</template>

<style lang="less">
.index-bar-example-anchor {
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  transition: all 0.25s;
}
</style>
