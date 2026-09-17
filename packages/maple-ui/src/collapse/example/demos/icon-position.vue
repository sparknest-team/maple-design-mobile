<template>
  <mp-space direction="column" :style="{ width: '100%' }">
    <mp-space>
      <mp-button @click="position = position === 'right' ? 'left' : 'right'">
        {{ position === 'right' ? 'Icon left' : 'Icon right' }}
      </mp-button>
      <mp-button @click="hideIcon = !hideIcon">
        {{ hideIcon ? 'Show icon' : 'Hide icon' }}
      </mp-button>
    </mp-space>
    <mp-collapse :default-active-names="['1']" :expand-icon-position="position" :show-expand-icon="!hideIcon">
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
        <template #extra>
          <mp-tag size="sm">city</mp-tag>
        </template>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="2" disabled>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
    </mp-collapse>
  </mp-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const position = ref<'left' | 'right'>('left')
const hideIcon = ref(false)
</script>
