<script setup>
import { ref } from 'vue'
import { Message } from '@maple-design/ui-vue'

const demoText = {
  basic: '基础用法',
  preview: '实时预览',
  previewHint: '点击悬浮按钮展开或收起，点击动作按钮查看提示。下方参数实时生效。',
  dragHint: '拖拽模式：按钮位于屏幕角落，可用触摸拖动；关闭拖拽回到预览区。',
  hiddenState: '按钮已隐藏',
  expandedState: '动作已展开',
  collapsedState: '动作已收起',
  profile: '查看用户',
  complete: '标记完成',
  notify: '发送提醒',
  type: '主题色按钮',
  trigger: '触发方式',
  direction: '动作菜单弹出方向',
  position: '触发器位置',
  default: '默认',
  primary: '主要',
  info: '信息',
  success: '成功',
  warning: '警告',
  danger: '危险',
  drag: '拖拽',
  disabled: '禁用',
  elevation: '海拔效果',
  triggerToggle: '触发器显示/隐藏',
  actionsToggle: '动作菜单展开/收起',
  customTrigger: '自定义触发器',
  toggle: '切换',
}

const open = ref(false)

function runAction(action) {
  Message.info(demoText[action] ?? String(action))
  open.value = false
}
</script>

<template>
  <div class="fab-demo-stage">
    <p>点击悬浮按钮展开或收起，点击动作按钮查看提示。下方参数实时生效。</p>
    <mp-fab v-model:open="open" :fixed="false" :popup-container="false" status="primary">
      <mp-button status="info" variant="tonal" :elevation="false" aria-label="查看用户" @click="runAction('profile')">
        <template #icon><m-icon-user-circle-fill /></template>
      </mp-button>
      <mp-button
        status="success"
        variant="tonal"
        :elevation="false"
        aria-label="标记完成"
        @click="runAction('complete')"
      >
        <template #icon><m-icon-checkbox-marked-circle-fill /></template>
      </mp-button>
      <mp-button status="warning" variant="tonal" :elevation="false" aria-label="发送提醒" @click="runAction('notify')">
        <template #icon><m-icon-bell-fill /></template>
      </mp-button>
    </mp-fab>
  </div>
</template>

<style scoped>
.fab-demo-stage {
  position: relative;
  box-sizing: border-box;
  min-height: 250px;
  padding: 16px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
.fab-demo-stage p {
  max-width: calc(100% - 72px);
  margin: 0;
  color: var(--mp-color-text-3);
  font-size: 13px;
  line-height: 1.5;
}
</style>
