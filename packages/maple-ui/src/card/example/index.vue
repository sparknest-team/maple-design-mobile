<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const floating = ref(false)

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-card :title="t('title')" :description="t('description')" />

  <app-type>{{ t('showSubtitle') }}</app-type>
  <mp-card :title="t('title')" :subtitle="t('subtitle')" :description="t('description')" />

  <app-type>{{ t('showImage') }}</app-type>
  <mp-card :title="t('title')" :subtitle="t('subtitle')" :description="t('description')" src="cat.jpg" />

  <app-type>{{ t('useSlot') }}</app-type>
  <mp-card :title="t('title')" :subtitle="t('subtitle')" :description="t('description')" src="cat.jpg">
    <template #extra>
      <mp-space>
        <mp-button type="primary">{{ t('action1') }}</mp-button>
        <mp-button type="primary">{{ t('action2') }}</mp-button>
      </mp-space>
    </template>
  </mp-card>

  <app-type>{{ t('horizontal') }}</app-type>
  <mp-card :title="t('title')" :subtitle="t('description')" layout="row" src="cat.jpg">
    <template #extra>
      <mp-button text round>
        <mp-icon name="star" />
      </mp-button>
      <mp-button round text>
        <mp-icon name="heart" />
      </mp-button>
    </template>
  </mp-card>

  <app-type>{{ t('showRipple') }}</app-type>
  <mp-card :title="t('title')" :subtitle="t('subtitle')" :description="t('description')" ripple />

  <app-type>{{ t('floating') }}</app-type>
  <mp-card v-model:floating="floating" :title="t('title')" :subtitle="t('subtitle')" src="cat.jpg">
    <template #extra>
      <mp-button type="primary" @click="floating = true">{{ t('floating') }}</mp-button>
    </template>

    <template #floating-content>
      <mp-divider type="dashed" size-y="32px"></mp-divider>
      <div class="card-example-text">
        {{ t('description') }}
      </div>
    </template>
  </mp-card>

  <app-type>{{ t('outline') }}</app-type>
  <mp-card :title="t('title')" :subtitle="t('subtitle')" variant="outlined" :description="t('description')" />

  <app-type>{{ t('filled') }}</app-type>
  <mp-card :title="t('title')" :subtitle="t('subtitle')" variant="filled" :description="t('description')" />
</template>

<style scoped lang="less">
.card-example-text {
  padding: 0 16px 16px;
  font-size: 14px;
  line-height: 28px;
}
</style>
