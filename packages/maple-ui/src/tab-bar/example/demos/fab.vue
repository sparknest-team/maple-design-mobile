<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const fab = ref(0)
const isEven = ref(true)
const composerOpen = ref(false)
const draft = ref('')
const variant = ref(0)
function handlePublish() {
  Message.success('发布操作演示完成')
  draft.value = ''
}
</script>

<template>
  <p>悬浮按钮用于发布、拍摄或新建等主要操作。点击加号打开发布框，不切换当前导航。</p>
  <mp-space wrap role="group" aria-label="悬浮按钮位置演示">
    <mp-button :variant="isEven ? 'default' : 'outline'" :aria-pressed="isEven" @click="isEven = true"
      >4 个导航项：按钮居中</mp-button
    >
    <mp-button :variant="isEven ? 'outline' : 'default'" :aria-pressed="!isEven" @click="isEven = false"
      >5 个导航项：按钮靠右</mp-button
    >
  </mp-space>
  <mp-tab-bar
    v-model:active="fab"
    style="margin-top: 40px"
    :fab-props="{ 'aria-label': '发布动态' }"
    @fab-click="composerOpen = true"
  >
    <template #fab
      ><mp-icon :size="24"><m-icon-plus /></mp-icon
    ></template>
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
    <mp-tab-bar-item label="消息">
      <template #icon
        ><mp-icon :size="22"><m-icon-bell-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item v-if="!isEven" label="我的">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
  <mp-dialog v-model:open="composerOpen" title="发布动态" confirm-button-text="发布动态" @confirm="handlePublish">
    <p>这是发布入口的交互演示，内容不会发送到服务器。</p>
    <mp-textarea v-model="draft" placeholder="分享此刻的想法" aria-label="分享此刻的想法" />
  </mp-dialog>
</template>
