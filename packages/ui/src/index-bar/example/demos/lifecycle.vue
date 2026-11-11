<script setup>
import { computed, KeepAlive, ref, watch } from 'vue'
import { AppType, watchLang } from '@maple-design/cli-vue/client'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang(
  (value) => {
    language.value = value
  },
  typeof window !== 'undefined' && window.location.hash.includes('language=') ? 'mobile' : 'pc',
)
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
  <app-type>{{ english ? 'Lifecycle and retained commands' : '生命周期与保留命令' }}</app-type>
  <mp-space wrap>
    <mp-button @click="command('C')">{{ english ? 'Scroll to C' : '跳转 C' }}</mp-button>
    <mp-button @click="active = !active">{{ english ? 'Toggle active' : '切换激活' }}</mp-button>
    <mp-button @click="mounted = !mounted">{{ english ? 'Toggle mounted' : '切换挂载' }}</mp-button>
    <mp-button @click="command('A')">{{ english ? 'Retained command A' : '保留命令 A' }}</mp-button>
  </mp-space>
  <p>{{ english ? 'Changes' : '变化事件' }}: {{ changes.join(' / ') }}</p>
  <div class="index-lifecycle-surface">
    <KeepAlive v-if="mounted">
      <mp-index-bar v-if="active" ref="bar" :duration="600" @change="record">
        <div v-for="index in ['A', 'B', 'C']" :key="index" class="index-lifecycle-group">
          <mp-index-anchor :index="index" />
          <p>{{ english ? 'Group' : '分组' }} {{ index }}</p>
        </div>
      </mp-index-bar>
    </KeepAlive>
  </div>
  <p>
    {{
      english
        ? 'Inactive/disposed retained commands do not scroll or notify. Activation restores active without another change event.'
        : '停用／卸载后保留命令不滚动、不通知；激活恢复当前定位，不重复变化事件。'
    }}
  </p>
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
