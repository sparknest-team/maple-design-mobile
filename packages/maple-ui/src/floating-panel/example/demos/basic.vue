<script setup>
import { ref } from 'vue'

const tabsRef = ref(null)
const active = ref('basic')
const anchors = ref([100, window.innerHeight * 0.4, window.innerHeight * 0.8])
const anchor = ref(100)
const styleVars = ref({
  '--mp-tab-padding': '2px',
})
</script>

<template>
  <mp-style-provider :style-vars="styleVars">
    <mp-tabs v-model:active="active" style="margin-top: 14px">
      <mp-tabs-navs ref="tabsRef">
        <mp-tab-nav key="basic" title="基本使用" />
        <mp-tab-nav key="anchors" title="自定义锚点" />
        <mp-tab-nav key="head" title="仅头部拖拽" />
      </mp-tabs-navs>

      <mp-tabs-items>
        <mp-tab-item key="basic">
          <mp-floating-panel v-if="active === 'basic'" popup-container="body">
            <mp-cell v-for="i in 26" :key="i" :title="String.fromCharCode(i + 64)" border />
          </mp-floating-panel>
        </mp-tab-item>
        <mp-tab-item key="anchors">
          <mp-floating-panel
            v-if="active === 'anchors'"
            v-model:anchor="anchor"
            :anchors="anchors"
            popup-container="body"
          >
            <div style="text-align: center; padding: 5px 15px">
              <p>面板锚点高度为 {{ Math.floor(anchor) }} px</p>
            </div>
          </mp-floating-panel>
        </mp-tab-item>
        <mp-tab-item key="head">
          <mp-floating-panel v-if="active === 'head'" :content-draggable="false" popup-container="body">
            <mp-cell v-for="i in 26" :key="i" :title="String.fromCharCode(i + 64)" border />
          </mp-floating-panel>
        </mp-tab-item>
      </mp-tabs-items>
    </mp-tabs>
  </mp-style-provider>
</template>
