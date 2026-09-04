<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { imagePreview, Message } from '@maplejs/maple-ui'
import { t, use } from './locale'
import PreviewDemos from './preview/index.vue'

const previewOpen = ref(false)
const reloadKey = ref('')

watchLang(use)
onThemeChange()

function reloadImage() {
  reloadKey.value = String(Date.now())
}
</script>

<template>
  <h2 class="image-example-category">{{ t('basicDisplay') }}</h2>

  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-image src="/cat.jpg" />

  <app-type>{{ t('setSize') }}</app-type>
  <mp-image src="/cat.jpg" width="120" height="80" object-fit="cover" />

  <app-type>{{ t('fitMode') }}</app-type>
  <mp-space :size="['4vmin', '4vmin']" wrap>
    <div v-for="mode in ['fill', 'cover', 'none', 'contain', 'scale-down']" :key="mode" class="image-example-fit-item">
      <mp-image width="20vmin" height="20vmin" :object-fit="mode" src="/cat.jpg" preview-disabled />
      <div class="image-example-text">{{ mode }}</div>
    </div>
  </mp-space>

  <app-type>{{ t('setPosition') }}</app-type>
  <mp-image
    width="28vmin"
    height="20vmin"
    object-fit="cover"
    object-position="left top"
    src="/cat.jpg"
    preview-disabled
  />

  <app-type>{{ t('setRadius') }}</app-type>
  <mp-space :size="['4vmin', '4vmin']">
    <mp-image width="20vmin" height="20vmin" object-fit="cover" :radius="10" src="/cat.jpg" preview-disabled />
    <mp-image width="20vmin" height="20vmin" object-fit="cover" radius="50%" src="/cat.jpg" preview-disabled />
  </mp-space>

  <h2 class="image-example-category">{{ t('contentDescription') }}</h2>

  <app-type>{{ t('setAltTitle') }}</app-type>
  <mp-image width="28vmin" src="/cat.jpg" alt="cat" title="Maple Cat" preview-disabled />

  <app-type>{{ t('caption') }}</app-type>
  <mp-space :size="['4vmin', '4vmin']">
    <mp-image width="28vmin" src="/cat.jpg" title="Maple Cat" description="Maple Design" preview-disabled />
    <mp-image
      width="28vmin"
      src="/cat2.jpg"
      title="Maple Cat"
      description="Maple Design"
      footer-position="outer"
      preview-disabled
    />
  </mp-space>

  <app-type>{{ t('footerExtra') }}</app-type>
  <mp-image width="28vmin" src="/cat.jpg" title="Maple Cat" description="Maple Design" preview-disabled>
    <template #extra>
      <span class="image-example-extra">Maple</span>
    </template>
  </mp-image>

  <app-type>{{ t('keepFooterOnError') }}</app-type>
  <mp-image
    width="28vmin"
    src="invalid-image.jpg"
    title="Maple Cat"
    description="Maple Design"
    hide-footer="never"
    preview-disabled
  />

  <h2 class="image-example-category">{{ t('loadingAndFallback') }}</h2>

  <app-type>{{ t('useLazyLoad') }}</app-type>
  <mp-image lazy width="28vmin" src="/cat.jpg" preview-disabled />

  <app-type>{{ t('lazyPlaceholder') }}</app-type>
  <mp-space :size="['4vmin', '4vmin']">
    <mp-image lazy width="28vmin" src="/cat.jpg" preview-disabled />
    <mp-image width="28vmin" fallback-src="/cat2.jpg" src="invalid-image.jpg" preview-disabled />
  </mp-space>

  <app-type>{{ t('loadingState') }}</app-type>
  <mp-button size="small" @click="reloadImage">{{ t('reload') }}</mp-button>
  <mp-space :size="['4vmin', '4vmin']">
    <mp-image show-loader width="28vmin" :src="`/cat.jpg?reload=${reloadKey}`" preview-disabled />
    <mp-image width="28vmin" :src="`/cat.jpg?reload=${reloadKey}`" preview-disabled>
      <template #loader>
        <img class="image-example-progressive" src="/cat2.jpg" alt="" />
      </template>
    </mp-image>
  </mp-space>

  <app-type>{{ t('useFailureSlot') }}</app-type>
  <mp-image width="20vmin" height="20vmin" src="ca.jpg" preview-disabled>
    <template #error>
      <svg viewBox="0 0 24 24" style="width: 100%; height: 100%">
        <path
          fill="currentColor"
          d="M21,5V11.59L18,8.58L14,12.59L10,8.59L6,12.59L3,9.58V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5M18,11.42L21,14.43V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V12.42L6,15.41L10,11.41L14,15.41"
        />
      </svg>
    </template>
  </mp-image>

  <h2 class="image-example-category">{{ t('previewEntry') }}</h2>

  <app-type>{{ t('disablePreview') }}</app-type>
  <mp-image preview-disabled width="28vmin" src="/cat.jpg" />

  <app-type>{{ t('previewSrc') }}</app-type>
  <mp-image width="20vmin" height="20vmin" object-fit="cover" src="/cat.jpg" preview-src="/cat2.jpg" radius="8" />

  <app-type>{{ t('controlledPreview') }}</app-type>
  <mp-button status="primary" block @click="previewOpen = true">{{ t('openPreview') }}</mp-button>
  <mp-image v-model:preview-open="previewOpen" width="28vmin" src="/cat.jpg" />

  <app-type>{{ t('previewProps') }}</app-type>
  <mp-image width="28vmin" src="/cat.jpg" :preview-props="{ closable: true, scaleStep: 1 }" />
  <div class="image-example-tip">{{ t('clickImagePreview') }}</div>

  <app-type>{{ t('popupContainer') }}</app-type>
  <div id="maple-image-preview-container" class="image-example-popup-container">
    <mp-image width="28vmin" src="/cat.jpg" :preview-props="{ popupContainer: '#maple-image-preview-container' }" />
  </div>

  <h2 class="image-example-category">{{ t('mobileFeatures') }}</h2>

  <app-type>{{ t('useRipple') }}</app-type>
  <mp-image ripple width="28vmin" src="/cat.jpg" preview-disabled />

  <app-type>{{ t('inlineBlock') }}</app-type>
  <mp-image :block="false" width="20vmin" height="20vmin" object-fit="cover" src="/cat.jpg" preview-disabled />
  <mp-image :block="false" width="20vmin" height="20vmin" object-fit="cover" src="/cat2.jpg" preview-disabled />

  <preview-demos />
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

.image-example-category {
  margin: 28px 0 12px;
  color: var(--mp-site-config-color-text);
  font-size: 18px;
  font-weight: 600;
}

.image-example-category:first-child {
  margin-top: 0;
}

.image-example-tip {
  margin-top: 8px;
  color: var(--mp-site-config-color-text);
  font-size: 12px;
  opacity: 0.7;
}

.image-example-extra {
  padding: 2px 8px;
  color: #fff;
  font-size: 12px;
  background: rgb(0 0 0 / 45%);
  border-radius: 10px;
}

.image-example-progressive {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(5px);
}

.image-example-popup-container {
  position: relative;
  height: 180px;
  padding: 12px;
  overflow: hidden;
  background: var(--mp-color-fill-2);
}
</style>
