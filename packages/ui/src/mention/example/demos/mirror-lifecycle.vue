<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
const mounted = ref(true)
const disabled = ref(false)
const searches = ref(0)
const value = ref('第一行\n第二行\n第三行\n@al')
</script>

<template>
  <div>
    <mp-button html-type="button" @click="active = !active">切换 KeepAlive</mp-button>
    <mp-button html-type="button" @click="mounted = !mounted">卸载／挂载</mp-button>
    <mp-button html-type="button" @click="disabled = !disabled">切换禁用</mp-button>
    <p>搜索通知：{{ searches }}。在文本域滚动后输入 @al，停用再激活，继续输入检查镜像定位。</p>
    <KeepAlive v-if="mounted">
      <mp-mention
        v-if="active"
        v-model="value"
        type="textarea"
        :disabled="disabled"
        :options="['alice', 'alex']"
        :rows="3"
        @search="searches++"
      />
    </KeepAlive>
  </div>
</template>
