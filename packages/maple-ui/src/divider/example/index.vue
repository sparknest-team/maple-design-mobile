<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-divider />

  <app-type>{{ t('type') }}</app-type>
  <mp-divider />
  <mp-divider type="dashed" />
  <mp-divider type="dotted" />
  <mp-divider type="double" :thickness="3" />

  <app-type>{{ t('size') }}</app-type>
  <mp-divider size-x="md" />
  <mp-divider :size-x="36" size-y="lg" />
  <mp-divider :size-x="[24, 0]" />

  <app-type>{{ t('vertical') }}</app-type>
  <div class="divider-example-vertical-container">
    <span>{{ t('text') }}</span>
    <mp-divider orientation="vertical" />
    <span>{{ t('text') }}</span>
    <mp-divider orientation="vertical" type="dashed" />
    <span>{{ t('text') }}</span>
  </div>

  <app-type>{{ t('withDesc') }}</app-type>
  <mp-divider :description="t('withDescText')" />
  <mp-divider :description="t('alignStart')" text-align="start" />
  <mp-divider :description="t('alignEnd')" text-align="end" />

  <app-type>{{ t('custom') }}</app-type>
  <mp-divider type="dashed">
    <mp-icon name="heart-outline" style="margin: 0 16px; color: var(--mp-color-danger)" />
  </mp-divider>

  <app-type>{{ t('color') }}</app-type>
  <mp-divider color="var(--mp-color-primary)" />
  <mp-divider :thickness="3" color="#6750A4" :opacity="0.5" />
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
