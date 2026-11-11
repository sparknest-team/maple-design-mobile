<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const resolveContainer = (element: unknown) => (element instanceof HTMLElement ? element : undefined)

const scene1 = demoProxyRefs(
  (() => {
    const containerRef = ref<HTMLElement>()
    return { containerRef }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const containerRef = ref<HTMLElement>()
    return { containerRef }
  })(),
)

const scene3 = demoProxyRefs(
  (() => {
    const containerRef = ref<HTMLElement>()
    return { containerRef }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="top">
      <h4><span lang="zh-CN">顶部偏移</span><span lang="en-US">Top offset</span></h4>
      <p>Scroll inside the bordered area.</p>
      <div :ref="(element) => (scene1.containerRef = resolveContainer(element))" class="scroller">
        <div class="scroll-content">
          <mp-affix :target="scene1.containerRef" :offset-top="80"
            ><mp-button status="primary">Top offset</mp-button></mp-affix
          >
        </div>
      </div>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="bottom">
      <h4><span lang="zh-CN">底部偏移</span><span lang="en-US">Bottom offset</span></h4>
      <p>Scroll inside the bordered area.</p>
      <div :ref="(element) => (scene2.containerRef = resolveContainer(element))" class="scroller">
        <div class="scroll-content">
          <div style="height: 240px"></div>
          <mp-affix :target="scene2.containerRef" :offset-bottom="20"
            ><mp-button status="primary">Bottom offset</mp-button></mp-affix
          >
        </div>
      </div>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="container">
      <h4><span lang="zh-CN">指定滚动容器</span><span lang="en-US">Scroll container</span></h4>
      <p>Scroll inside the bordered area.</p>
      <div :ref="(element) => (scene3.containerRef = resolveContainer(element))" class="scroller">
        <div class="scroll-content">
          <div style="height: 40px"></div>
          <mp-affix :target="scene3.containerRef" :offset-top="20"
            ><mp-button status="primary">Scroll container</mp-button></mp-affix
          >
        </div>
      </div>
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
  .scroller {
    height: 200px;
    overflow: auto;
    border: 1px solid currentColor;
  }
  .scroll-content {
    min-height: 600px;
    padding: 16px;
  }
}
.demo-comparison-case--2 {
  .scroller {
    height: 200px;
    overflow: auto;
    border: 1px solid currentColor;
  }
  .scroll-content {
    min-height: 600px;
    padding: 16px;
  }
}
.demo-comparison-case--3 {
  .scroller {
    height: 200px;
    overflow: auto;
    border: 1px solid currentColor;
  }
  .scroll-content {
    min-height: 600px;
    padding: 16px;
  }
}
</style>
