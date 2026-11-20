<script setup lang="ts">
import { ref } from 'vue'

const content = ref('第一行')
const boundedContent = ref('第一行\n第二行')
const maxRows = ref(5)
function fill() {
  boundedContent.value = '一\n二\n三\n四\n五\n六'
}
</script>
<template>
  <mp-space direction="column" size="lg" fill>
    <mp-textarea default-value="原生三行" :rows="3" aria-label="原生行数" />
    <mp-textarea v-model="content" auto-size placeholder="随内容增高" />
    <mp-space wrap>
      <mp-button @click="fill">填入六行</mp-button>
      <mp-button @click="maxRows = maxRows === 5 ? 2 : 5">切换行数上限 {{ maxRows }}</mp-button>
    </mp-space>
    <template v-for="box in ['border-box', 'content-box']" :key="box">
      <p>{{ box }} · 2–{{ maxRows }} 行</p>
      <mp-textarea
        v-model="boundedContent"
        :auto-size="{ minRows: 2, maxRows }"
        :textarea-attrs="{
          'aria-label': '限制行数：' + box,
          style: {
            boxSizing: box,
            lineHeight: '20px',
            padding: '4px',
            borderStyle: 'solid',
            borderWidth: '1px 2px 3px 4px',
          },
        }"
      />
    </template>
  </mp-space>
</template>
