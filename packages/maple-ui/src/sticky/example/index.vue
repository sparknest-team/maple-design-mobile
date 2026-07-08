<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

watchLang(use)
onThemeChange()
</script>

<template>
  <div class="example">
    <app-type>{{ t('basicUsage') }}</app-type>
    <mp-sticky offset-top="14.4vmin">
      <mp-button type="primary">{{ t('basicUsage') }}</mp-button>
    </mp-sticky>

    <app-type>{{ t('localSticky') }}</app-type>
    <div class="scroller">
      <mp-sticky>
        <mp-button type="success">{{ t('localSticky') }}</mp-button>
      </mp-sticky>
      <div class="block"></div>
    </div>
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
}
</style>
