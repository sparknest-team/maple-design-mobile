<script setup lang="ts">
const title = 'Project overview with a long title that does not fit on one line'
const description = 'Review the delivery schedule, dependencies and upcoming milestones for each team.'
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
    Tap the title or description to read the full text.
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
