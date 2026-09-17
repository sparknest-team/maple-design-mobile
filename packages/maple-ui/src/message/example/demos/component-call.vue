<script setup>
import { h, onBeforeUnmount, reactive, resolveComponent, toRefs } from 'vue'

const shows = reactive({
  show1: false,
  show2: false,
  show3: false,
  show4: false,
  show5: false,
  show9: false,
  showClosable: false,
})
const { show1, show2, show3, show4, show5, show9, showClosable } = toRefs(shows)
function changeValue(type) {
  shows[type] = !shows[type]
}
</script>

<template>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button status="primary" block @click="changeValue('show1')">基本使用</mp-button>
    <mp-button status="primary" block @click="changeValue('show3')">垂直排列</mp-button>
    <mp-button status="primary" block @click="changeValue('show2')">底部显示</mp-button>
    <mp-button status="primary" block @click="changeValue('show4')">显示时长</mp-button>
    <mp-button status="primary" block @click="changeValue('show5')">自定义图标</mp-button>
    <mp-button status="primary" block @click="changeValue('show9')">禁止穿透点击</mp-button>
    <mp-button status="primary" block @click="changeValue('showClosable')">可关闭</mp-button>
  </mp-space>

  <div class="message-demo">
    <mp-message v-model:open="show1"> 这是一条消息提示 </mp-message>

    <mp-message v-model:open="show2" position="bottom">
      这是一条消息提示
      <template #action>
        <mp-button status="primary" :elevation="false" size="sm" @click="show2 = false">关闭</mp-button>
      </template>
    </mp-message>

    <mp-message v-model:open="show3" :vertical="true">
      这是一条消息提示
      <template #action>
        <mp-button status="primary" :elevation="false" size="sm" @click="show3 = false">关闭</mp-button>
      </template>
    </mp-message>

    <mp-message v-model:open="show4" :duration="100000" :elevation="5"> 这是一条消息提示 </mp-message>

    <mp-message v-model:open="show5">
      这是一条消息提示
      <template #icon>
        <m-icon-heart />
      </template>
    </mp-message>

    <mp-message v-model:open="show9" :forbid-click="true"> 这是一条消息提示 </mp-message>

    <mp-message v-model:open="showClosable" closable :duration="0" status="info"> 这是一条消息提示 </mp-message>
  </div>
</template>
