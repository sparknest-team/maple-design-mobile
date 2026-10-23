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
      Drag the menu thumb, release/context-cancel/blur, then move again. Hover the footer target during drag to suspend.
      Fresh activation must not replay old input.
    </p>
    <KeepAlive v-if="mounted">
      <mp-select
        v-if="active"
        v-model="value"
        v-model:open="open"
        :options="options"
        :scrollbar="true"
        presentation="popup"
        style="width: 240px"
      >
        <template #footer>
          <mp-button @mouseenter="active = false">Hover to deactivate / 移入停用</mp-button>
        </template>
      </mp-select>
    </KeepAlive>
  </div>
</template>
