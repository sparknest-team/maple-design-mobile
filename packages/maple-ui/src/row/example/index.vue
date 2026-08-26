<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'
import Responsive from './Responsive.vue'
import ResponsiveObject from './ResponsiveObject.vue'

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('gridSystem') }}</app-type>
  <mp-row :gutter="[10, 10]">
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
  </mp-row>

  <app-type>{{ t('offset') }}</app-type>
  <mp-row :gutter="[10, 10]">
    <mp-col :span="16" :offset="8"><div class="item">offset: 8 span: 16</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
  </mp-row>

  <app-type>{{ t('justify') }}</app-type>
  <mp-row justify="center" :gutter="[20, 10]">
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
  </mp-row>
  <mp-row justify="end" :gutter="[20, 10]">
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
  </mp-row>
  <mp-row justify="space-between" :gutter="[20, 10]">
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
  </mp-row>

  <app-type>{{ t('align') }}</app-type>
  <mp-row align="center" :gutter="10">
    <mp-col :span="8"><div class="item" style="height: 36px">36</div></mp-col>
    <mp-col :span="8"><div class="item" style="height: 56px">56</div></mp-col>
  </mp-row>

  <app-type>{{ t('order') }}</app-type>
  <mp-row>
    <mp-col :span="6" :order="4"><div class="item">1 order-4</div></mp-col>
    <mp-col :span="6" :order="3"><div class="item">2 order-3</div></mp-col>
    <mp-col :span="6" :order="2"><div class="item">3 order-2</div></mp-col>
    <mp-col :span="6" :order="1"><div class="item">4 order-1</div></mp-col>
  </mp-row>

  <app-type>{{ t('flex') }}</app-type>
  <mp-row :gutter="[10, 10]">
    <mp-col flex="100px"><div class="item">100px</div></mp-col>
    <mp-col flex="auto"><div class="item">auto</div></mp-col>
  </mp-row>
  <mp-row :gutter="[10, 10]">
    <mp-col :flex="3"><div class="item">3</div></mp-col>
    <mp-col :flex="4"><div class="item">4</div></mp-col>
    <mp-col :flex="5"><div class="item">5</div></mp-col>
  </mp-row>

  <app-type>{{ t('responsive') }}</app-type>
  <responsive />

  <app-type>{{ t('responsiveObject') }}</app-type>
  <responsive-object />
</template>

<style scoped lang="less">
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 36px;
  box-sizing: border-box;
  color: var(--mp-color-text-1);
  border: 1px solid var(--mp-color-border-2);
  background: var(--mp-color-fill-2);
}
</style>
