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
    <mp-button status="primary" block @click="center = true">居中弹出</mp-button>
    <mp-button status="primary" block @click="bottom = true">下方弹出</mp-button>
    <mp-button status="primary" block @click="top = true">上方弹出</mp-button>
    <mp-button status="primary" block @click="left = true">左侧弹出</mp-button>
    <mp-button status="primary" block @click="right = true">右侧弹出</mp-button>
  </mp-space>

  <mp-popup v-model:open="center">
    <div class="block">
      素胚勾勒出青花笔锋浓转淡, 瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
  <mp-popup v-model:open="bottom" placement="bottom">
    <div class="block">
      素胚勾勒出青花笔锋浓转淡, 瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
  <mp-popup v-model:open="top" placement="top">
    <div class="block">
      素胚勾勒出青花笔锋浓转淡, 瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
  <mp-popup v-model:open="left" placement="left">
    <div class="block">
      素胚勾勒出青花笔锋浓转淡, 瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
  <mp-popup v-model:open="right" placement="right">
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
