<template>
  <mp-space direction="column" style="width: 100%">
    <mp-space>
      <mp-button variant="outline" @click="disabled = !disabled">{{ disabled ? '启用组合' : '禁用组合' }}</mp-button>
      <mp-button variant="outline" @click="readonly = !readonly">{{ readonly ? '允许编辑' : '组合只读' }}</mp-button>
    </mp-space>
    <mp-input-group variant="outline" :disabled="disabled" :readonly="readonly" :hint="false">
      <mp-input-group-label>https://</mp-input-group-label>
      <mp-input v-model="domain" placeholder="输入域名" clearable />
      <mp-input-group-label>.com</mp-input-group-label>
    </mp-input-group>
    <mp-input-group variant="filled" :disabled="disabled" :readonly="readonly" :hint="false">
      <mp-input v-model="first" placeholder="继承组合状态" clearable />
      <mp-input default-value="可独立编辑" :disabled="false" :readonly="false" clearable />
    </mp-input-group>
    <mp-input-group size="lg" variant="outline" :disabled="disabled" :readonly="readonly" :hint="false">
      <mp-input-group-label>密码</mp-input-group-label>
      <mp-input-password v-model="password" placeholder="密码切换继承禁用状态" clearable />
    </mp-input-group>
  </mp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(false)
const readonly = ref(false)
const domain = ref('example')
const first = ref('继承状态')
const password = ref('CedarMaple')
</script>
