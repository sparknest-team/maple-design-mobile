<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const lists = [...Array(40).keys()]

watchLang(use)
onThemeChange()

function handleClick() {
  console.log('back to top')
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <div>
    <mp-cell v-for="list in lists" :key="list">Scroll to bottom {{ list }}</mp-cell>
    <mp-back-top :duration="300" />
  </div>

  <app-type>{{ t('targetContainer') }}</app-type>
  <p class="back-top-hint">{{ t('targetContainerHint') }}</p>
  <div class="back-top-section">
    <div id="target-scroll" class="back-top-section__scroll">
      <mp-cell v-for="list in lists" :key="`target-${list}`">Scroll in container {{ list }}</mp-cell>
    </div>
    <mp-back-top
      target="#target-scroll"
      :visibility-height="120"
      :duration="300"
      :teleport="false"
      right="16"
      bottom="16"
    />
  </div>

  <app-type>{{ t('customPosition') }}</app-type>
  <div class="back-top-section">
    <div id="position-scroll" class="back-top-section__scroll">
      <mp-cell v-for="list in lists" :key="`position-${list}`">Scroll to bottom {{ list }}</mp-cell>
    </div>
    <mp-back-top target="#position-scroll" :duration="300" right="80" bottom="80" />
  </div>

  <app-type>{{ t('customContent') }}</app-type>
  <div class="back-top-section">
    <div id="content-scroll" class="back-top-section__scroll">
      <mp-cell v-for="list in lists" :key="`custom-${list}`">Scroll to bottom {{ list }}</mp-cell>
    </div>
    <mp-back-top target="#content-scroll" :duration="300" @click="handleClick">
      <mp-button type="primary" round>TOP</mp-button>
    </mp-back-top>
  </div>
</template>

<style scoped>
.back-top-section {
  position: relative;
}

.back-top-hint {
  margin: 0 0 8px;
  color: var(--mp-color-text-secondary);
  font-size: 14px;
}

.back-top-section__scroll {
  height: 320px;
  overflow: auto;
  border: 1px solid var(--mp-border-color);
  border-radius: 8px;
}
</style>
