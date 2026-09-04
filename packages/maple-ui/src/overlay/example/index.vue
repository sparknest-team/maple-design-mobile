<script setup>
import { reactive, toRefs } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

const values = reactive({
  baseOverlay: false,
  contentOverlay: false,
  clickOverlay: false,
})

const { baseOverlay, contentOverlay, clickOverlay } = toRefs(values)

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('overlayBase') }}</app-type>
  <mp-button status="primary" block @click="baseOverlay = true">
    {{ t('showOverlay') }}
  </mp-button>

  <app-type>{{ t('overlayContent') }}</app-type>
  <mp-button status="primary" block @click="contentOverlay = true">
    {{ t('overlayContent') }}
  </mp-button>

  <app-type>{{ t('clickEvent') }}</app-type>
  <mp-button status="primary" block @click="clickOverlay = true">
    {{ t('clickOverlay') }}
  </mp-button>

  <mp-overlay v-model:open="baseOverlay" />
  <mp-overlay v-model:open="contentOverlay">
    <div class="overlay-content">
      {{ t('text') }}
    </div>
  </mp-overlay>
  <mp-overlay v-model:open="clickOverlay" @click="Message.success('click')" />
</template>

<style lang="less" scoped>
.overlay-content {
  padding: 24px;
  width: 312px;
  background: var(--mp-color-fill-3);
  border-radius: 28px;
}
</style>
