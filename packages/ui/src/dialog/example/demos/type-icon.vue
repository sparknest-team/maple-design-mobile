<script setup>
import { reactive, ref } from 'vue'
import { Dialog, Message } from '@maple-design/ui-vue'

const demoText = {
  functionCall: '函数调用',
  basicUsage: '基本使用',
  modifyTitle: '修改标题',
  updateDialog: '动态更新',
  hideButton: '隐藏按钮',
  handleUserBehavior: '处理用户行为',
  asyncClose: '异步关闭',
  confirmDialog: '确认对话框',
  alertDialog: 'Alert 对话框',
  openDialog: '打开对话框',
  typeIcon: '消息提示',
  formDialog: '对话框表单',
  name: '姓名',
  email: '邮箱',
  namePlaceholder: '请输入姓名',
  emailPlaceholder: '请输入邮箱',
  requiredField: '该字段为必填项',
  formSubmitted: '表单提交成功',
  confirmBox: '确认框',
  dangerConfirm: '危险操作确认',
  delete: '删除',
  componentCall: '组件调用',
  customFooter: '自定义底部',
  close: '关闭',
  cancel: '取消',
  confirm: '确认',
  customButtonText: '定制按钮文字',
  continue: '继续',
  exit: '退出',
  buttonLoading: '按钮 Loading',
  advancedProps: '高级用法',
  customWidth: '自定义宽度',
  hideFooter: '隐藏 Footer',
  hideTitle: '隐藏标题',
  customBody: '自定义 body',
  unmountOnClose: '关闭后卸载',
  simpleDialog: '简洁对话框',
  draggableDialog: '可拖动对话框',
  fullscreenDialog: '全屏对话框',
  layout: '布局',
  longContent: '长内容',
  longContentMessage: '长内容保持可滚动，标题和操作按钮保持可见。',
  title: '兰亭序',
  message: '兰亭临帖 行书如行云流水',
  confirmTitle: '确认操作',
  confirmMessage: '确定要执行此操作吗？',
  dangerTitle: '危险操作',
  dangerMessage: '删除后无法恢复，确定继续吗？',
  customSlots: '自定义插槽',
  typeLabelInfo: 'Info',
  typeLabelSuccess: 'Success',
  typeLabelWarning: 'Warning',
  typeLabelError: 'Error',
  typeTitleInfo: '信息提示',
  typeTitleSuccess: '成功提示',
  typeTitleWarning: '警告提示',
  typeTitleError: '错误提示',
  typeMessageInfo: '这是一条普通的信息提示。',
  typeMessageSuccess: '操作已成功完成。',
  typeMessageWarning: '请确认后再继续操作。',
  typeMessageError: '发生错误，请稍后重试。',
}

const typeOpen = ref(false)
const dialogType = ref('info')
const dialogTypes = ['info', 'success', 'warning', 'error']
function typeText(prefix, type) {
  const key = `${prefix}${type.charAt(0).toUpperCase()}${type.slice(1)}`
  return demoText[key] ?? String(key)
}
function openType(type) {
  Dialog[type]({
    title: typeText('typeTitle', type),
    message: typeText('typeMessage', type),
  })
}
function openComponentType(type) {
  dialogType.value = type
  typeOpen.value = true
}
</script>

<template>
  <mp-button v-for="type in dialogTypes" :key="type" status="primary" block @click="openType(type)">
    {{ typeText('typeLabel', type) }}
  </mp-button>
  <mp-button status="warning" block @click="openComponentType('warning')"> 组件调用 </mp-button>
  <mp-dialog
    v-model:open="typeOpen"
    :type="dialogType"
    :title="typeText('typeTitle', dialogType)"
    :message="typeText('typeMessage', dialogType)"
    @click-overlay="Message.info('click-overlay')"
  />
</template>

<style lang="less" scoped>
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
</style>
