<script setup lang="ts">
import { onMounted, ref } from 'vue'

const scroller = ref<HTMLElement>()
const clicks = ref(0)
onMounted(() => {
  if (scroller.value) {
    scroller.value.scrollTop = 240
    scroller.value.dispatchEvent(new Event('scroll'))
  }
})
</script>

<template>
  <div class="back-top-demo">
    <p>在面板内滚动，超过 120px 时显示按钮。 {{ '点击次数：' }}{{ clicks }}</p>
    <div class="back-top-demo__frame">
      <div ref="scroller" class="back-top-demo__scroll">
        <p v-for="row in 30" :key="row">A · 滚动内容 {{ row }}</p>
      </div>
      <mp-back-top
        :target-container="() => scroller"
        :popup-container="false"
        :visible-height="120"
        :right="16"
        :bottom="16"
        aria-label="回到顶部"
        @click="clicks++"
        >TOP</mp-back-top
      >
    </div>
  </div>
</template>

<style scoped>
.back-top-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.back-top-demo > p {
  margin: 0;
}
.back-top-demo__frame {
  position: relative;
  display: flex;
  gap: 12px;
}
.back-top-demo__scroll {
  flex: 1;
  min-width: 0;
  height: 240px;
  overflow: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.back-top-demo__scroll p {
  padding: 8px 12px;
  margin: 0;
}
</style>
