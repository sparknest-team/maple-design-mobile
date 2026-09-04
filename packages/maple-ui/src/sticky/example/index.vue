<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

watchLang(use)
onThemeChange()

const scrollerRef = ref(null)
const fixed = ref(false)

const handleChange = (value) => {
  fixed.value = value
}
</script>

<template>
  <div class="example">
    <app-type>{{ t('basicUsage') }}</app-type>
    <mp-sticky offset-top="14.4vmin">
      <mp-button status="primary">{{ t('basicUsage') }}</mp-button>
    </mp-sticky>

    <app-type>{{ t('localSticky') }}</app-type>
    <div ref="scrollerRef" class="scroller">
      <mp-sticky :target="scrollerRef">
        <mp-button status="success">{{ t('localSticky') }}</mp-button>
      </mp-sticky>
      <div class="block"></div>
    </div>

    <app-type>{{ t('changeEvent') }}</app-type>
    <mp-sticky :offset-top="54" @change="handleChange">
      <mp-button status="warning">{{ t('changeEvent') }}</mp-button>
    </mp-sticky>
    <div class="change-status">{{ t('fixedStatus') }}: {{ fixed }}</div>
  </div>
</template>

<style scoped lang="less">
.example {
  min-height: 200vh;

  .scroller {
    height: 200px;
    overflow: auto;
    background: var(--mp-site-config-color-app-bar);
    border-radius: 4px;

    .block {
      width: 100%;
      height: 600px;
      background: var(--mp-site-config-color-type);
      opacity: 0.5;
    }
  }

  .change-status {
    margin-top: 12px;
    color: var(--mp-site-config-color-text);
  }
}
</style>
