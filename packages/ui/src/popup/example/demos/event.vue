<script setup>
import { reactive, toRefs } from 'vue'
import { Message } from '@maple-design/ui-vue'

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
  <mp-button status="primary" block @click="event = true">注册事件</mp-button>
  <mp-popup
    v-model:open="event"
    @open="Message.info('open')"
    @opened="Message.success('opened')"
    @close="Message.warning('close')"
    @closed="Message.error('closed')"
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
