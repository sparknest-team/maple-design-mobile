<script setup>
import { ref } from 'vue'

const tabsRef = ref(null)
const active = ref('basic')
const anchors = ref([80, 180, 320])
const anchor = ref(80)
const styleVars = ref({
  '--mp-tab-padding': '2px',
})
</script>

<template>
  <mp-theme-provider class="floating-panel-demo-surface" :style-vars="styleVars">
    <mp-tabs v-model="active" style="margin-top: 14px">
      <mp-tabs-navs ref="tabsRef">
        <mp-tab-nav name="basic" title="基本使用" />
        <mp-tab-nav name="anchors" title="自定义锚点" />
        <mp-tab-nav name="head" title="仅头部拖拽" />
      </mp-tabs-navs>

      <mp-tabs-items>
        <mp-tab-item name="basic">
          <mp-floating-panel v-if="active === 'basic'" :anchors="[80, 320]" :popup-container="false">
            <mp-cell v-for="i in 26" :key="i" :title="String.fromCharCode(i + 64)" border />
          </mp-floating-panel>
        </mp-tab-item>
        <mp-tab-item name="anchors">
          <mp-floating-panel v-if="active === 'anchors'" v-model="anchor" :anchors="anchors" :popup-container="false">
            <template #header>
              <div class="panel-height-controls">
                <mp-button
                  html-type="button"
                  :disabled="anchor === 80"
                  @click="anchor = anchors[Math.max(0, anchors.indexOf(anchor) - 1)]"
                >
                  收起
                </mp-button>
                <span aria-live="polite">{{ anchor }} px</span>
                <mp-button
                  html-type="button"
                  :disabled="anchor === 320"
                  @click="anchor = anchors[Math.min(anchors.length - 1, anchors.indexOf(anchor) + 1)]"
                >
                  展开
                </mp-button>
              </div>
            </template>
            <div style="text-align: center; padding: 5px 15px">
              <p>面板锚点高度为 {{ Math.floor(anchor) }} px</p>
            </div>
          </mp-floating-panel>
        </mp-tab-item>
        <mp-tab-item name="head">
          <mp-floating-panel
            v-if="active === 'head'"
            :anchors="[80, 320]"
            :content-draggable="false"
            :popup-container="false"
          >
            <mp-cell v-for="i in 26" :key="i" :title="String.fromCharCode(i + 64)" border />
          </mp-floating-panel>
        </mp-tab-item>
      </mp-tabs-items>
    </mp-tabs>
  </mp-theme-provider>
</template>

<style scoped>
.panel-height-controls {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 40px;
}
.floating-panel-demo-surface {
  position: relative;
  height: 400px;
  overflow: hidden;
  transform: translateZ(0);
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: 8px;
}
</style>
