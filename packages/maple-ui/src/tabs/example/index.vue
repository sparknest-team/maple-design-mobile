<script setup>
import { reactive, ref, toRefs } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const actives = reactive({
  active: 0,
  active2: 0,
  active3: 0,
  active4: 0,
  active5: 0,
  active6: 0,
  active7: 0,
  active8: 0,
  activeRelation: 0,
})
const { active, active2, active3, active4, active5, active6, active7, active8, activeRelation } = toRefs(actives)
const currentTheme = ref()

watchLang(use)
onThemeChange((theme) => {
  currentTheme.value = theme
})
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-tabs v-model:active="active">
    <mp-tab>{{ t('option') }}1</mp-tab>
    <mp-tab>{{ t('option') }}2</mp-tab>
    <mp-tab>{{ t('option') }}3</mp-tab>
  </mp-tabs>

  <app-type>{{ t('modifyStyle') }}</app-type>
  <mp-tabs
    v-model:active="active2"
    elevation
    color="var(--mp-color-primary)"
    active-color="var(--mp-color-on-primary)"
    inactive-color="var(--mp-color-on-info)"
  >
    <mp-tab>{{ t('option') }}1</mp-tab>
    <mp-tab>{{ t('option') }}2</mp-tab>
    <mp-tab>{{ t('option') }}3</mp-tab>
  </mp-tabs>

  <app-type>{{ t('disabled') }}</app-type>
  <mp-tabs
    v-model:active="active3"
    elevation
    color="var(--mp-color-primary)"
    active-color="var(--mp-color-on-primary)"
    inactive-color="var(--mp-color-on-info)"
    :disabled-color="currentTheme === 'darkTheme' ? '#bbb' : undefined"
  >
    <mp-tab>{{ t('option') }}1</mp-tab>
    <mp-tab>{{ t('option') }}2</mp-tab>
    <mp-tab disabled>{{ t('disabled') }}</mp-tab>
  </mp-tabs>

  <app-type>{{ t('enableScroll') }}</app-type>
  <mp-tabs
    v-model:active="active4"
    elevation
    color="var(--mp-color-primary)"
    active-color="var(--mp-color-on-primary)"
    inactive-color="var(--mp-color-on-info)"
  >
    <mp-tab>{{ t('option') }}1</mp-tab>
    <mp-tab>{{ t('option') }}2</mp-tab>
    <mp-tab>{{ t('option') }}3</mp-tab>
    <mp-tab>{{ t('option') }}4</mp-tab>
    <mp-tab>{{ t('option') }}5</mp-tab>
    <mp-tab>{{ t('option') }}6</mp-tab>
    <mp-tab>{{ t('option') }}7</mp-tab>
    <mp-tab>{{ t('option') }}8</mp-tab>
  </mp-tabs>

  <app-type>{{ t('tabVerticalLayout') }}</app-type>
  <mp-tabs
    v-model:active="active5"
    elevation
    item-vertical
    color="var(--mp-color-primary)"
    active-color="var(--mp-color-on-primary)"
    inactive-color="var(--mp-color-on-info)"
  >
    <mp-tab>
      <mp-icon class="icon" name="information" />
      <div>{{ t('option') }}1</div>
    </mp-tab>
    <mp-tab>
      <mp-icon class="icon" name="warning" />
      <div>{{ t('option') }}2</div>
    </mp-tab>
    <mp-tab>
      <mp-icon class="icon" name="error" />
      <div>{{ t('option') }}3</div>
    </mp-tab>
  </mp-tabs>

  <app-type>{{ t('tabsVerticalLayout') }}</app-type>
  <mp-tabs
    v-model:active="active6"
    class="vertical-tabs"
    elevation
    vertical
    color="var(--mp-color-primary)"
    active-color="var(--mp-color-on-primary)"
    inactive-color="var(--mp-color-on-info)"
  >
    <mp-tab>{{ t('option') }}1</mp-tab>
    <mp-tab>{{ t('option') }}2</mp-tab>
    <mp-tab>{{ t('option') }}3</mp-tab>
  </mp-tabs>

  <app-type>{{ t('viewRelation') }}</app-type>
  <mp-tabs
    v-model:active="activeRelation"
    elevation
    color="var(--mp-color-primary)"
    active-color="var(--mp-color-on-primary)"
    inactive-color="var(--mp-color-on-info)"
    offset-top="50"
  >
    <mp-tab>{{ t('option') }}1</mp-tab>
    <mp-tab>{{ t('option') }}2</mp-tab>
    <mp-tab>{{ t('option') }}3</mp-tab>
  </mp-tabs>

  <mp-tabs-items v-model:active="activeRelation" style="margin: 8px 0">
    <mp-tab-item>
      {{ t('text') }}
    </mp-tab-item>
    <mp-tab-item>
      {{ t('text2') }}
    </mp-tab-item>
    <mp-tab-item>
      {{ t('text3') }}
    </mp-tab-item>
  </mp-tabs-items>

  <app-type>{{ t('stickyLayout') }}</app-type>
  <mp-tabs
    v-model:active="active7"
    sticky
    elevation
    color="var(--mp-color-primary)"
    active-color="var(--mp-color-on-primary)"
    inactive-color="var(--mp-color-on-info)"
    offset-top="14.4vmin"
  >
    <mp-tab>{{ t('option') }}1</mp-tab>
    <mp-tab>{{ t('option') }}2</mp-tab>
    <mp-tab>{{ t('option') }}3</mp-tab>
  </mp-tabs>

  <app-type>{{ t('indicatorPosition') }}</app-type>
  <mp-tabs
    v-model:active="active8"
    elevation
    indicator-position="reverse"
    color="var(--mp-color-primary)"
    active-color="var(--mp-color-on-primary)"
    inactive-color="var(--mp-color-on-info)"
  >
    <mp-tab>{{ t('option') }}1</mp-tab>
    <mp-tab>{{ t('option') }}2</mp-tab>
    <mp-tab>{{ t('option') }}3</mp-tab>
  </mp-tabs>

  <mp-tabs
    v-model:active="active8"
    style="margin-top: 20px"
    elevation
    class="vertical-tabs"
    indicator-position="reverse"
    vertical
    color="var(--mp-color-primary)"
    active-color="var(--mp-color-on-primary)"
    inactive-color="var(--mp-color-on-info)"
  >
    <mp-tab>{{ t('option') }}1</mp-tab>
    <mp-tab>{{ t('option') }}2</mp-tab>
    <mp-tab>{{ t('option') }}3</mp-tab>
  </mp-tabs>

  <div style="height: 120vh"></div>
</template>

<style lang="less" scoped>
.vertical-tabs {
  width: 80px;
  height: 120px;
}

.icon {
  margin-bottom: 5px;
}

.mp-tab-item {
  color: var(--mp-color-text);
}
</style>
