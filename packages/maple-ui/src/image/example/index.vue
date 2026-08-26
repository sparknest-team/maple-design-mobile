<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const previewOpen = ref(false)

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-image src="cat.jpg" />

  <app-type>{{ t('setSize') }}</app-type>
  <mp-image src="cat.jpg" width="120" height="80" fit="cover" />

  <app-type>{{ t('fitMode') }}</app-type>
  <mp-space :size="['4vmin', '4vmin']" wrap>
    <div v-for="mode in ['fill', 'cover', 'none', 'contain', 'scale-down']" :key="mode" class="image-example-fit-item">
      <mp-image width="20vmin" height="20vmin" :fit="mode" src="cat.jpg" :preview="false" />
      <div class="image-example-text">{{ mode }}</div>
    </div>
  </mp-space>

  <app-type>{{ t('setPosition') }}</app-type>
  <mp-image width="28vmin" height="20vmin" fit="cover" position="left top" src="cat.jpg" :preview="false" />

  <app-type>{{ t('setRadius') }}</app-type>
  <mp-space :size="['4vmin', '4vmin']">
    <mp-image width="20vmin" height="20vmin" fit="cover" :radius="10" src="cat.jpg" :preview="false" />
    <mp-image width="20vmin" height="20vmin" fit="cover" radius="50%" src="cat.jpg" :preview="false" />
  </mp-space>

  <app-type>{{ t('useRipple') }}</app-type>
  <mp-image ripple width="28vmin" src="cat.jpg" :preview="false" />

  <app-type>{{ t('useLazyLoad') }}</app-type>
  <mp-image lazy width="28vmin" src="cat.jpg" :preview="false" />

  <app-type>{{ t('lazyPlaceholder') }}</app-type>
  <mp-image lazy width="28vmin" loading="cat2.jpg" error="cat.jpg" src="cat.jpg" :preview="false" />

  <app-type>{{ t('useFailureSlot') }}</app-type>
  <mp-image width="20vmin" height="20vmin" src="ca.jpg" :preview="false">
    <template #error>
      <svg viewBox="0 0 24 24" style="width: 100%; height: 100%">
        <path
          fill="currentColor"
          d="M21,5V11.59L18,8.58L14,12.59L10,8.59L6,12.59L3,9.58V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5M18,11.42L21,14.43V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V12.42L6,15.41L10,11.41L14,15.41"
        />
      </svg>
    </template>
  </mp-image>

  <app-type>{{ t('inlineBlock') }}</app-type>
  <mp-image :block="false" width="20vmin" height="20vmin" fit="cover" src="cat.jpg" :preview="false" />
  <mp-image :block="false" width="20vmin" height="20vmin" fit="cover" src="cat2.jpg" :preview="false" />

  <app-type>{{ t('setAltTitle') }}</app-type>
  <mp-image width="28vmin" src="cat.jpg" alt="cat" title="Maple Cat" :preview="false" />

  <app-type>{{ t('disablePreview') }}</app-type>
  <mp-image :preview="false" width="28vmin" src="cat.jpg" />

  <app-type>{{ t('previewSrc') }}</app-type>
  <mp-image width="20vmin" height="20vmin" fit="cover" src="cat.jpg" preview-src="cat2.jpg" radius="8" />

  <app-type>{{ t('controlledPreview') }}</app-type>
  <mp-button type="primary" block @click="previewOpen = true">{{ t('openPreview') }}</mp-button>
  <mp-image v-model:preview-open="previewOpen" width="28vmin" src="cat.jpg" :preview="true" />

  <app-type>{{ t('previewProps') }}</app-type>
  <mp-image width="28vmin" src="cat.jpg" :preview-props="{ closable: true, zoom: 3 }" />
  <div class="image-example-tip">{{ t('clickImagePreview') }}</div>
</template>

<style scoped lang="less">
.image-example-fit-item {
  color: var(--mp-site-config-color-text);
  text-align: center;

  .image-example-text {
    margin-top: 8px;
    font-size: 12px;
  }
}

.image-example-tip {
  margin-top: 8px;
  color: var(--mp-site-config-color-text);
  font-size: 12px;
  opacity: 0.7;
}
</style>
