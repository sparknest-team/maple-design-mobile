<script setup>
import { ref } from 'vue'
import { onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const tabsRef = ref(null)
const active = ref(0)
const anchors = ref([100, window.innerHeight * 0.4, window.innerHeight * 0.8])
const anchor = ref(100)
const styleVars = ref({
  '--mp-tab-padding': '2px',
})

watchLang((lang) => {
  use(lang)
  if (tabsRef.value) {
    tabsRef.value.resize()
  }
})
onThemeChange()
</script>

<template>
  <mp-style-provider :style-vars="styleVars">
    <mp-tabs
      ref="tabsRef"
      v-model:active="active"
      elevation
      color="var(--mp-color-primary)"
      active-color="var(--mp-color-white)"
      inactive-color="var(--mp-color-white)"
      style="margin-top: 14px"
    >
      <mp-tab style="font-size: 13px">{{ t('basicUsage') }}</mp-tab>
      <mp-tab style="font-size: 13px">{{ t('customAnchors') }}</mp-tab>
      <mp-tab style="font-size: 13px">{{ t('dragHeadOnly') }}</mp-tab>
    </mp-tabs>
  </mp-style-provider>

  <mp-tabs-items v-model:active="active">
    <mp-tab-item>
      <mp-floating-panel v-if="active === 0" popup-container="body">
        <mp-cell v-for="i in 26" :key="i" :title="String.fromCharCode(i + 64)" border> </mp-cell>
      </mp-floating-panel>
    </mp-tab-item>
    <mp-tab-item>
      <mp-floating-panel v-if="active === 1" v-model:anchor="anchor" :anchors="anchors" popup-container="body">
        <div style="text-align: center; padding: 5px 15px">
          <p>{{ t('currentAnchorText') }} {{ Math.floor(anchor) }} px</p>
        </div>
      </mp-floating-panel>
    </mp-tab-item>
    <mp-tab-item>
      <mp-floating-panel v-if="active === 2" :content-draggable="false" popup-container="body">
        <mp-cell v-for="i in 26" :key="i" :title="String.fromCharCode(i + 64)" border> </mp-cell>
      </mp-floating-panel>
    </mp-tab-item>
  </mp-tabs-items>
</template>
