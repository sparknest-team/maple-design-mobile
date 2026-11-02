<script setup lang="ts">
import { proxyRefs as demoProxyRefs, reactive, ref } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const widthOpen = ref(false)

    const simpleOpen = ref(false)

    const draggableOpen = ref(false)

    const fullscreenOpen = ref(false)
    return { widthOpen, simpleOpen, draggableOpen, fullscreenOpen }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const longContentOpen = ref(false)
    return { longContentOpen }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="layout">
      <h4><span lang="zh-CN">layout</span><span lang="en-US">Layout</span></h4>
      <mp-button status="warning" block @click="scene1.widthOpen = true">自定义宽度</mp-button>
      <mp-dialog v-model:open="scene1.widthOpen" :width="320" title="兰亭序" message="兰亭临帖 行书如行云流水" />
      <mp-button status="warning" block @click="scene1.simpleOpen = true">简洁对话框</mp-button>
      <mp-dialog v-model:open="scene1.simpleOpen" simple title="兰亭序" message="兰亭临帖 行书如行云流水" />
      <mp-button status="warning" block @click="scene1.draggableOpen = true">可拖动对话框</mp-button>
      <mp-dialog v-model:open="scene1.draggableOpen" draggable title="兰亭序" message="兰亭临帖 行书如行云流水" />
      <mp-button status="warning" block @click="scene1.fullscreenOpen = true">全屏对话框</mp-button>
      <mp-dialog v-model:open="scene1.fullscreenOpen" fullscreen title="兰亭序" message="兰亭临帖 行书如行云流水" />
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="long-content">
      <h4><span lang="zh-CN">long content</span><span lang="en-US">Long Content</span></h4>
      <mp-button status="warning" block @click="scene2.longContentOpen = true">长内容</mp-button>
      <mp-dialog
        v-model:open="scene2.longContentOpen"
        title="长内容"
        :body-style="{
          maxHeight: '50vh',
          overflowY: 'auto',
        }"
      >
        <p v-for="item in 12" :key="item">{{ item }}. 长内容保持可滚动，标题和操作按钮保持可见。</p>
      </mp-dialog>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
.demo-comparison-case--1 {
  .mp-button {
    margin-bottom: 11px;
  }

  .dialog-demo__footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 0 12px 12px;
  }

  :deep(.dialog-demo__body--custom) {
    font-weight: 500;
  }

  .dialog-demo__body-content {
    padding: 16px 20px;
  }
}
.demo-comparison-case--2 {
  .mp-button {
    margin-bottom: 11px;
  }

  .dialog-demo__footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 0 12px 12px;
  }

  :deep(.dialog-demo__body--custom) {
    font-weight: 500;
  }

  .dialog-demo__body-content {
    padding: 16px 20px;
  }
}
</style>
