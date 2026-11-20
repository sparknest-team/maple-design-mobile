<script setup>
import { ref } from 'vue'

const list = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index))
const active = ref('A')

function handleChange(value) {
  active.value = String(value)
}
</script>

<template>
  <h3>Basic Usage · Active {{ active }}</h3>
  <div class="index-bar-demo-surface">
    <mp-index-bar duration="300" @change="handleChange">
      <div v-for="item in list" :key="item">
        <mp-index-anchor
          :index="item"
          class="index-bar-example-anchor"
          :style="{
            background: 'var(--mp-tag-status-primary-color)',
            color: 'var(--mp-tag-status-primary-text-color)',
          }"
        >
          Title {{ item }}
        </mp-index-anchor>
        <mp-cell>{{ item }} Item</mp-cell>
        <mp-cell>{{ item }} Item</mp-cell>
      </div>
    </mp-index-bar>
  </div>
</template>

<style lang="less">
.index-bar-demo-surface {
  position: relative;
  height: 520px;
  overflow-y: auto;
  overscroll-behavior: contain;
  border: 1px solid var(--mp-color-border-2);
  border-radius: 8px;

  .mp-index-bar__anchor-list-container {
    position: sticky;
    top: 0;
    right: auto;
    bottom: auto;
    left: auto;
    width: 100%;
    height: 0;
    transform: none;
    pointer-events: none;
  }

  .mp-index-bar__anchor-list {
    position: absolute;
    top: 26px;
    right: 0;
    background: transparent !important;
    pointer-events: auto;
  }
}

.index-bar-example-anchor {
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  transition: all 0.25s;
}
</style>
