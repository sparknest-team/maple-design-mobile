<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
const mounted = ref(true)
const floating = ref(false)
const ripple = ref(true)
const duration = ref(250)
</script>
<template>
  <div>
    <mp-button @click="floating = !floating">Float / 浮起与回落</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <mp-button @click="mounted = !mounted">Mount / 卸载与挂载</mp-button>
    <mp-button @click="ripple = !ripple">Ripple wait / 涟漪等待</mp-button>
    <mp-button @click="duration = duration ? 0 : 250">Duration / 零与默认时长</mp-button>
    <p>
      Toggle floating rapidly, suspend during500ms ripple wait or layout settlement, then activate. Old tasks must not
      reset a newer phase. Underlying doubleRaf frames are not physically canceled.
    </p>
    <KeepAlive v-if="mounted">
      <mp-card
        v-if="active"
        v-model:floating="floating"
        :ripple="ripple"
        :floating-duration="duration"
        title="Floating lifecycle / 浮起生命周期"
      >
        Card content / 卡片内容
        <template #floating-content>
          <mp-button @click.stop="floating = false">Collapse / 回落</mp-button>
          <mp-button @click.stop="active = false">Deactivate / 停用</mp-button>
          <mp-button @click.stop="mounted = false">Unmount / 卸载</mp-button>
        </template>
      </mp-card>
    </KeepAlive>
  </div>
</template>
