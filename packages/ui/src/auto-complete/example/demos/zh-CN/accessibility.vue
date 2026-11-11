<template>
  <label :for="inputId">前端框架</label>
  <mp-auto-complete
    v-model="value"
    :options="options"
    :input-attrs="{ id: inputId, 'aria-describedby': helpId }"
    style="width: 100%; max-width: 320px"
  />
  <p :id="helpId">使用方向键浏览建议，Enter 选择，Escape 关闭。</p>
</template>

<script setup lang="ts">
import { ref, useId } from 'vue'

const inputId = useId()
const helpId = useId()
const value = ref('')
const options = ['Vue', 'React', 'Angular']
</script>
