<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('girdSystem') }}</app-type>
  <mp-row :gutter="[10, 10]">
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
  </mp-row>

  <app-type>{{ t('offset') }}</app-type>
  <mp-row :gutter="[10, 10]">
    <mp-col :span="16" :offset="8">
      <div class="item">offset: 8 span: 16</div>
    </mp-col>
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
  </mp-row>

  <app-type>{{ t('alignment') }}</app-type>
  <mp-row :gutter="[20, 10]">
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
  </mp-row>
  <mp-row justify="center" :gutter="[20, 10]">
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
  </mp-row>
  <mp-row justify="flex-end" :gutter="[20, 10]">
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
  </mp-row>
  <mp-row justify="space-around" :gutter="[20, 10]">
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
  </mp-row>
  <mp-row justify="space-between" :gutter="[20, 10]">
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
    <mp-col :span="8">
      <div class="item">span: 8</div>
    </mp-col>
  </mp-row>
</template>

<style scoped lang="less">
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 36px;
  color: #fff;
  background: var(--mp-site-config-color-app-bar);
}
</style>
