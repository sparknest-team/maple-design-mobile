<script setup>
import { ref } from 'vue'

const success = ref(false)
const error = ref(false)
const info = ref(false)
const warning = ref(false)
const question = ref(false)
const empty = ref(false)
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-button status="success" block @click="success = true">成功</mp-button>
    <mp-button status="warning" block @click="warning = true">警告</mp-button>
    <mp-button status="info" block @click="info = true">信息</mp-button>
    <mp-button status="danger" block @click="error = true">错误</mp-button>
    <mp-button color="var(--mp-result-question-color)" text-color="#fff" block @click="question = true">
      疑问
    </mp-button>
    <mp-button color="var(--mp-result-empty-color)" text-color="#fff" block @click="empty = true"> 空值 </mp-button>
  </mp-space>

  <mp-popup v-model:open="success" unstyled>
    <mp-result class="result" status="success" title="成功" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button status="success" @click="success = false">知道了</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:open="error" unstyled>
    <mp-result class="result" status="danger" title="错误" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button status="danger" @click="error = false">知道了</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:open="warning" unstyled>
    <mp-result class="result" status="warning" title="警告" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button status="warning" @click="warning = false">知道了</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:open="info" unstyled>
    <mp-result class="result" status="info" title="信息" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button status="info" @click="info = false">知道了</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:open="question" unstyled>
    <mp-result class="result" status="question" title="疑问" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button color="var(--mp-result-question-color)" text-color="#fff" @click="question = false"
          >知道了
        </mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:open="empty" unstyled>
    <mp-result class="result" status="empty" title="空值" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button color="var(--mp-result-empty-color)" text-color="#fff" @click="empty = false">知道了 </mp-button>
      </template>
    </mp-result>
  </mp-popup>
</template>

<style scoped>
.result {
  width: 75vmin;
}
</style>
