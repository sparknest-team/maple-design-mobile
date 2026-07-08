<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

watchLang(use)
onThemeChange()
</script>
<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-divider />

  <app-type>{{ t('dashed') }}</app-type>
  <mp-divider dashed />

  <app-type>{{ t('inset') }}</app-type>
  <mp-divider inset />
  <mp-divider :inset="36" margin="36px 0" />
  <mp-divider inset="-36px" />

  <app-type>{{ t('vertical') }}</app-type>
  <div class="divider-example-vertical-container">
    <span>{{ t('text') }}</span>
    <mp-divider vertical />
    <span>{{ t('text') }}</span>
    <mp-divider vertical />
    <span>{{ t('text') }}</span>
  </div>

  <app-type>{{ t('withDesc') }}</app-type>
  <mp-divider :description="t('withDescText')" />

  <app-type>{{ t('custom') }}</app-type>
  <mp-divider>
    <mp-icon name="heart-outline" style="margin: 0 16px; color: var(--mp-color-danger)" />
  </mp-divider>

  <app-type>{{ t('hairline') }}</app-type>
  <mp-divider hairline />
</template>

<style lang="less" scoped>
.divider-example-vertical-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;

  span {
    font-size: 14px;
    color: #888;
  }
}
</style>
