<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
const mounted = ref(true)
const open = ref(false)
const value = ref('Item 101')
const options = Array.from({ length: 200 }, (_, index) => 'Item ' + (index + 1))
</script>
<template>
  <div>
    <mp-button @click="open = !open">Open / 关闭与打开</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <mp-button @click="mounted = !mounted">Mount / 卸载与挂载</mp-button>
    <p>
      Scroll the menu, deactivate or unmount, then reopen. Old scrollbar events must not move or notify the new active
      phase. Native smooth/Thumb dragging still needs separate browser validation.
    </p>
    <KeepAlive v-if="mounted">
      <mp-select
        v-if="active"
        v-model="value"
        v-model:open="open"
        :options="options"
        edit-mode="popup"
        style="width: 240px"
      />
    </KeepAlive>
  </div>
</template>
