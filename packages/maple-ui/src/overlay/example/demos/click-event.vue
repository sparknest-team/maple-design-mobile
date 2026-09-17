<script setup>
import { reactive, toRefs } from 'vue'
import { Message } from '@maplejs/maple-ui'

const values = reactive({
  baseOverlay: false,
  contentOverlay: false,
  clickOverlay: false,
})
const { baseOverlay, contentOverlay, clickOverlay } = toRefs(values)
</script>

<template>
  <mp-button status="primary" block @click="clickOverlay = true"> 点击背景层 </mp-button>

  <mp-overlay v-model:open="baseOverlay" />
  <mp-overlay v-model:open="contentOverlay">
    <div class="overlay-content">
      素胚勾勒出青花笔锋浓转淡, 瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半。
    </div>
  </mp-overlay>
  <mp-overlay v-model:open="clickOverlay" @click="Message.success('click')" />
</template>

<style lang="less" scoped>
.overlay-content {
  padding: 24px;
  width: 312px;
  background: var(--mp-color-fill-3);
  border-radius: 28px;
}
</style>
