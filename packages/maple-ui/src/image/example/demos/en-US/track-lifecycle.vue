<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
const open = ref(false)
const current = ref(0)
const loop = ref(true)
const images = ref(['/cat.jpg', '/cat2.jpg'])
function replaceImages() {
  images.value = [...images.value].reverse()
}
</script>
<template>
  <div>
    <mp-button @click="open = true">Open / 打开</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <mp-button @click="loop = !loop">Loop / 循环</mp-button>
    <mp-button @click="replaceImages">Replace images / 等长换图</mp-button>
    <p>
      Current / 当前: {{ current }}. Navigate across the loop edge; deactivate, close or replace images. Old work must
      not replay.
    </p>
    <KeepAlive>
      <mp-image-preview-group v-if="active" v-model:open="open" v-model:current="current" :images="images" :loop="loop">
        <template #actions>
          <mp-image-preview-action name="Replace images / 换图" @click="replaceImages">换图</mp-image-preview-action>
          <mp-image-preview-action name="Deactivate / 停用" @click="active = false">停用</mp-image-preview-action>
        </template>
      </mp-image-preview-group>
    </KeepAlive>
  </div>
</template>
