<script setup>
import { reactive, toRefs } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Snackbar } from '@maplejs/maple-ui'
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
  <mp-button type="primary" block @click="baseOverlay = true">
    {{ t('showOverlay') }}
  </mp-button>

  <app-type>{{ t('overlayContent') }}</app-type>
  <mp-button type="primary" block @click="contentOverlay = true">
    {{ t('overlayContent') }}
  </mp-button>

  <app-type>{{ t('clickEvent') }}</app-type>
  <mp-button type="primary" block @click="clickOverlay = true">
    {{ t('clickOverlay') }}
  </mp-button>

  <mp-overlay v-model:show="baseOverlay" />
  <mp-overlay v-model:show="contentOverlay">
    <div class="overlay-content">
      {{ t('text') }}
    </div>
  </mp-overlay>
  <mp-overlay v-model:show="clickOverlay" @click="Snackbar.success('click')" />
</template>

<style lang="less" scoped>
.overlay-content {
  padding: 24px;
  width: 312px;
  background: var(--mp-color-surface-container-highest);
  border-radius: 28px;
}
</style>
