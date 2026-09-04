<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'
import { t, use } from './locale/index'

const trigger = ref('click')
const placementValue = ref('top')
const placementOptions = ref([
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
])

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-tooltip content="Tooltip">
    <mp-button status="primary">{{ t('basicUsage') }}</mp-button>
  </mp-tooltip>

  <app-type>{{ t('contentSlot') }}</app-type>
  <mp-tooltip>
    <mp-button status="primary">{{ t('contentSlot') }}</mp-button>

    <template #content>
      <m-icon-star />
    </template>
  </mp-tooltip>

  <app-type>{{ t('placement') }}</app-type>
  <mp-select v-model="placementValue" :hint="false">
    <mp-option v-for="(item, index) in placementOptions" :key="index" :label="item" />
  </mp-select>
  <div class="placement-container">
    <mp-tooltip content="Tooltip" :placement="placementValue">
      <mp-button status="primary">
        <m-icon-star />
      </mp-button>
    </mp-tooltip>
  </div>

  <app-type>{{ t('themeColorTooltip') }}</app-type>
  <mp-space :size="['14vmin', '2.666vmin']">
    <mp-tooltip content="Tooltip">
      <mp-button>{{ t('defaultTooltip') }}</mp-button>
    </mp-tooltip>
    <mp-tooltip type="primary" content="Tooltip">
      <mp-button status="primary">{{ t('primaryTooltip') }}</mp-button>
    </mp-tooltip>
    <mp-tooltip type="info" content="Tooltip">
      <mp-button status="info">{{ t('infoTooltip') }}</mp-button>
    </mp-tooltip>
    <mp-tooltip type="success" content="Tooltip">
      <mp-button status="success">{{ t('successTooltip') }}</mp-button>
    </mp-tooltip>
    <mp-tooltip type="warning" content="Tooltip">
      <mp-button status="warning">{{ t('warningTooltip') }}</mp-button>
    </mp-tooltip>
    <mp-tooltip type="danger" content="Tooltip">
      <mp-button status="danger">{{ t('dangerTooltip') }}</mp-button>
    </mp-tooltip>
  </mp-space>

  <app-type>{{ t('customColor') }}</app-type>
  <mp-tooltip content="Tooltip" color="#d81b60" text-color="#fff">
    <mp-button status="primary">{{ t('customColor') }}</mp-button>
  </mp-tooltip>

  <app-type>{{ t('offset') }}</app-type>
  <mp-tooltip content="Tooltip" :offset-x="64" :offset-y="-10">
    <mp-button status="primary">{{ t('offset') }}</mp-button>
  </mp-tooltip>

  <app-type>{{ t('trigger') }}</app-type>
  <mp-select v-model="trigger" :hint="false">
    <mp-option label="click" />
    <mp-option label="hover" />
  </mp-select>
  <mp-tooltip content="Tooltip" style="margin-top: 15px" :trigger="trigger">
    <mp-button status="primary">{{ t('trigger') }}</mp-button>
  </mp-tooltip>

  <app-type>{{ t('events') }}</app-type>
  <mp-tooltip
    content="Tooltip"
    @open="Message.info('open')"
    @opened="Message.success('opened')"
    @close="Message.warning('close')"
    @closed="Message.error('closed')"
  >
    <mp-button status="primary">{{ t('events') }}</mp-button>
  </mp-tooltip>

  <app-type>{{ t('disabled') }}</app-type>
  <mp-tooltip content="Tooltip" disabled>
    <mp-button status="primary">{{ t('disabled') }}</mp-button>
  </mp-tooltip>

  <div style="margin-bottom: 100px"></div>
</template>

<style scoped lang="less">
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
