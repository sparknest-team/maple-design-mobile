<script setup lang="ts">
const title = '项目进度总览：本季度各团队的交付计划与关键里程碑'
const description = '查看各团队的交付时间、任务依赖，以及下个阶段需要关注的里程碑。'
</script>

<template>
  <mp-card style="width: 100%; max-width: 280px">
    <template #title>
      <mp-tooltip :content="title" trigger="click">
        <button type="button" class="long-text">{{ title }}</button>
      </mp-tooltip>
    </template>
    <template #description>
      <mp-tooltip :content="description" trigger="click">
        <button type="button" class="long-text">{{ description }}</button>
      </mp-tooltip>
    </template>
    点按标题或说明，即可查看全文。
  </mp-card>
</template>

<style scoped>
.long-text {
  display: block;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: start;
}
</style>
