<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'
import { Message } from '@maple-design/ui'

const scene1 = demoProxyRefs(
  (() => {
    const changeEvent = ref(0)

    function handleChange(active: number | string) {
      Message.info(`changed to ${active}`)
    }
    return { changeEvent, handleChange }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const clickEvent = ref(0)

    function handleClick(active: number | string) {
      Message.success(`clicked ${active}`)
    }
    return { clickEvent, handleClick }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="change-event">
      <h4><span lang="zh-CN">监听切换事件</span><span lang="en-US">Change Event</span></h4>
      <mp-tab-bar v-model="scene1.changeEvent" @change="scene1.handleChange">
        <mp-tab-bar-item label="首页">
          <template #icon
            ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
          ></template>
        </mp-tab-bar-item>
        <mp-tab-bar-item label="发现">
          <template #icon
            ><mp-icon :size="22"><m-icon-search /></mp-icon
          ></template>
        </mp-tab-bar-item>
        <mp-tab-bar-item label="收藏">
          <template #icon
            ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
          ></template>
        </mp-tab-bar-item>
        <mp-tab-bar-item label="我的">
          <template #icon
            ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
          ></template>
        </mp-tab-bar-item>
      </mp-tab-bar>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="click-event">
      <h4><span lang="zh-CN">监听点击事件</span><span lang="en-US">Click Event</span></h4>
      <mp-tab-bar v-model="scene2.clickEvent">
        <mp-tab-bar-item label="首页" @click="scene2.handleClick">
          <template #icon
            ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
          ></template>
        </mp-tab-bar-item>
        <mp-tab-bar-item label="发现" @click="scene2.handleClick">
          <template #icon
            ><mp-icon :size="22"><m-icon-search /></mp-icon
          ></template>
        </mp-tab-bar-item>
        <mp-tab-bar-item label="收藏" @click="scene2.handleClick">
          <template #icon
            ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
          ></template>
        </mp-tab-bar-item>
        <mp-tab-bar-item label="我的" @click="scene2.handleClick">
          <template #icon
            ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
          ></template>
        </mp-tab-bar-item>
      </mp-tab-bar>
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
</style>
