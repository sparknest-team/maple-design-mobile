<script setup>
import { reactive, toRefs } from 'vue'

const values = reactive({
  center: false,
  top: false,
  bottom: false,
  left: false,
  right: false,
  overlayClass: false,
  overlayStyle: false,
  event: false,
})
const { center, top, bottom, left, right, overlayClass, overlayStyle, event } = toRefs(values)
</script>

<template>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button status="primary" block @click="overlayClass = true">背景层class</mp-button>
    <mp-button status="primary" block @click="overlayStyle = true">背景层样式</mp-button>
  </mp-space>

  <mp-popup v-model:open="overlayClass" overlay-class="custom-overlay">
    <div class="block">
      素胚勾勒出青花笔锋浓转淡, 瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
  <mp-popup
    v-model:open="overlayStyle"
    :overlay-style="{
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    }"
  >
    <div class="block">
      素胚勾勒出青花笔锋浓转淡, 瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
</template>

<style>
.custom-overlay {
  background: rgba(0, 0, 0, 0.3);
}
</style>

<style lang="less" scoped>
.block {
  padding: 24px;
  width: 280px;
}
</style>
