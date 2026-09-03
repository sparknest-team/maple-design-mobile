<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'
import Responsive from './Responsive.vue'
import ResponsiveObject from './ResponsiveObject.vue'

const collapsed = ref(false)

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUse') }}</app-type>
  <div class="toolbar">
    <span>{{ t('collapsed') }}</span>
    <mp-switch v-model="collapsed" />
  </div>
  <mp-grid :cols="3" :col-gap="12" :row-gap="16" :collapsed="collapsed">
    <mp-grid-item><div class="item">item</div></mp-grid-item>
    <mp-grid-item><div class="item">item</div></mp-grid-item>
    <mp-grid-item><div class="item">item</div></mp-grid-item>
    <mp-grid-item :offset="1"><div class="item">item | offset - 1</div></mp-grid-item>
    <mp-grid-item><div class="item">item</div></mp-grid-item>
    <mp-grid-item :span="3"><div class="item">item | span - 3</div></mp-grid-item>
    <mp-grid-item><div class="item">item</div></mp-grid-item>
    <mp-grid-item><div class="item">item</div></mp-grid-item>
    <mp-grid-item suffix>
      <template #default="{ overflow }">
        <div class="item">suffix | overflow: {{ overflow }}</div>
      </template>
    </mp-grid-item>
  </mp-grid>

  <app-type>{{ t('responsive') }}</app-type>
  <mp-grid :cols="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }" :col-gap="12" :row-gap="16">
    <mp-grid-item><div class="item">item</div></mp-grid-item>
    <mp-grid-item><div class="item">item</div></mp-grid-item>
    <mp-grid-item><div class="item">item</div></mp-grid-item>
    <mp-grid-item><div class="item">item</div></mp-grid-item>
    <mp-grid-item><div class="item">item</div></mp-grid-item>
    <mp-grid-item><div class="item">item</div></mp-grid-item>
    <mp-grid-item :span="{ xl: 4, xxl: 6 }" suffix>
      <div class="item">suffix</div>
    </mp-grid-item>
  </mp-grid>

  <app-type>{{ t('gridSystem') }}</app-type>
  <mp-row :gutter="[10, 10]">
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
  </mp-row>

  <app-type>{{ t('offset') }}</app-type>
  <mp-row :gutter="[10, 10]">
    <mp-col :span="16" :offset="8"><div class="item">offset: 8 span: 16</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
  </mp-row>

  <app-type>{{ t('justify') }}</app-type>
  <mp-row justify="center" :gutter="[20, 10]">
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
  </mp-row>

  <app-type>{{ t('responsiveRow') }}</app-type>
  <responsive />

  <app-type>{{ t('responsiveObject') }}</app-type>
  <responsive-object />
</template>

<style scoped lang="less">
.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  box-sizing: border-box;
  color: var(--mp-color-text-1);
  text-align: center;
  border: 1px solid var(--mp-color-border-2);
  background: var(--mp-color-fill-2);
}

:deep(.mp-grid-item:nth-child(2n) .item) {
  background: var(--mp-color-fill-3);
}
</style>
