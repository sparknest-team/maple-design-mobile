<script setup>
import { KeepAlive, ref, watch } from 'vue'

const mounted = ref(true),
  active = ref(true),
  bar = ref(),
  changes = ref([])
let retained
watch(bar, (value) => {
  if (value) {
    retained = value
  }
})
const command = (index) => retained?.scrollTo(index)
const record = (value) => {
  changes.value.push(value)
}
</script>

<template>
  <h3>生命周期与保留命令</h3>
  <mp-space wrap>
    <mp-button @click="command('C')">跳转 C</mp-button>
    <mp-button @click="active = !active">切换激活</mp-button>
    <mp-button @click="mounted = !mounted">切换挂载</mp-button>
    <mp-button @click="command('A')">保留命令 A</mp-button>
  </mp-space>
  <p>变化事件: {{ changes.join(' / ') }}</p>
  <div class="index-lifecycle-surface">
    <KeepAlive v-if="mounted">
      <mp-index-bar v-if="active" ref="bar" :duration="600" @change="record">
        <div v-for="index in ['A', 'B', 'C']" :key="index" class="index-lifecycle-group">
          <mp-index-anchor :index="index" />
          <p>分组 {{ index }}</p>
        </div>
      </mp-index-bar>
    </KeepAlive>
  </div>
  <p>停用／卸载后保留命令不滚动、不通知；激活恢复当前定位，不重复变化事件。</p>
</template>

<style lang="less">
.index-lifecycle-surface {
  height: 180px;
  overflow: auto;
  position: relative;
  border: 1px solid var(--mp-color-border-2);
}
.index-lifecycle-group {
  height: 240px;
}
</style>
