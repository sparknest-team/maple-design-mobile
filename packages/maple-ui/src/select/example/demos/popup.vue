<script setup>
import { computed, ref } from 'vue'

const listValue = ref()
const listMultiple = ref([])
const options = computed(() => [
  {
    label: '吃饭',
    value: 1,
  },
  {
    label: '睡觉',
    value: 2,
  },
  {
    label: '打游戏',
    value: 3,
    disabled: true,
  },
])
</script>

<template>
  <mp-space direction="column" :size="['3vmin', 0]">
    <mp-select v-model="listValue" presentation="popup" placeholder="请选择一个选项" :options="options" />
    <mp-select
      v-model="listMultiple"
      presentation="popup"
      multiple
      show-tags
      clearable
      placeholder="List 多选"
      :options="options"
    />
  </mp-space>

  <div class="space"></div>
</template>

<style lang="less" scoped>
.space {
  height: 200px;
}

.selected-icon {
  margin-right: 6px;
}

.prefix {
  margin-right: 6px;
}

.suffix {
  margin-left: 6px;
}

.arrow-icon-rotate {
  transform: rotate(180deg);
}
</style>
