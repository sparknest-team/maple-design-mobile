<script setup>
import { ref } from 'vue'

const demoText = {
  uncontrolled: '非受控初始选中',
  uncontrolledHelp: '无需 v-model，初始选中收藏，点击即可切换。default-active 仅在初始化时读取。',
  'numeric-name': '数字名称与重排',
  numericHelp: '名称 0、10、20 是稳定标识，重排后仍选中同一名称，而不是原来的位置。',
  reorder: '反转顺序',
  current: '当前选中',
  'custom-label': '自定义选中标签',
  customLabelHelp: 'default 插槽接收 active，可根据选中状态改变字重和标记。',
  'async-change': '异步切换与拦截',
  asyncHelp:
    '先点慢速（1.2 秒），再点快速（0.25 秒），最终只切到快速；拒绝和异常都会保持当前选中。等待时点击当前标签可取消切换。',
  slow: '慢速',
  fast: '快速',
  denied: '拒绝',
  rejected: '异常',
  badgeHelp: '红点、66 和 99+ 放在图标外侧。切换变体，观察胶囊背景下的徽标位置。',
  fabDescription: '悬浮按钮用于发布、拍摄或新建等主要操作。点击加号打开发布框，不切换当前导航。',
  fabLayout: '悬浮按钮位置演示',
  fabCenter: '4 个导航项：按钮居中',
  fabRight: '5 个导航项：按钮靠右',
  publish: '发布动态',
  home: '首页',
  discover: '发现',
  favorites: '收藏',
  messages: '消息',
  profile: '我的',
  composerDescription: '这是发布入口的交互演示，内容不会发送到服务器。',
  draftPlaceholder: '分享此刻的想法',
  published: '发布操作演示完成',
  basicUsage: '基本使用',
  matchByName: '通过名称匹配',
  showBadge: '徽标提示',
  customColor: '自定义颜色',
  changeEvent: '监听切换事件',
  clickEvent: '监听点击事件',
  fab: '悬浮按钮',
  label: '标签',
  variant: '变体',
}

const active = ref('home')
</script>
<template>
  <p>default 插槽接收 active，可根据选中状态改变字重和标记。</p>
  <mp-tab-bar v-model:active="active">
    <mp-tab-bar-item v-for="name in ['home', 'favorites', 'profile']" :key="name" :name="name">
      <template #default="{ active: selected }">
        <span :style="{ fontWeight: selected ? 700 : 400 }"
          >{{ selected ? '● ' : '' }}{{ demoText[name] ?? String(name) }}</span
        >
      </template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
