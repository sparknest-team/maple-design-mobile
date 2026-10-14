<script setup>
import { ref } from 'vue'

const open = ref(false)
const active = ref(true)
const source = ref('/cat.jpg')
const presses = ref(0)
const switchSource = () => {
  source.value = source.value === '/cat.jpg' ? '/cat2.jpg' : '/cat.jpg'
}
</script>
<template>
  <div>
    <mp-button @click="open = true">Open / 打开预览</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <p>Long presses / 长按通知: {{ presses }}. Cancel or deactivate; old input must not replay.</p>
    <KeepAlive>
      <mp-image-preview
        v-if="active"
        v-model:open="open"
        :src="source"
        interaction="touch"
        :keyboard="true"
        @long-press="presses++"
      >
        <template #actions>
          <mp-image-preview-action name="Switch source / 换图" @click="switchSource">换图</mp-image-preview-action>
          <mp-image-preview-action name="Deactivate / 停用" @click="active = false">停用</mp-image-preview-action>
        </template>
      </mp-image-preview>
    </KeepAlive>
  </div>
</template>
