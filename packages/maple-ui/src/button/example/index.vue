<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

watchLang(use)
onThemeChange()

function handleClick() {
  Message.success(t('clickSuccess'))
}

function handleTouchstart() {
  Message.success(t('touchstartSuccess'))
}

function handleAutoLoadingClick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}
</script>

<template>
  <app-type>{{ t('themeColorButton') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-button>{{ t('defaultButton') }}</mp-button>
    <mp-button status="primary">{{ t('primaryButton') }}</mp-button>
    <mp-button status="info">{{ t('infoButton') }}</mp-button>
    <mp-button status="success">{{ t('successButton') }}</mp-button>
    <mp-button status="warning">{{ t('warningButton') }}</mp-button>
    <mp-button status="danger">{{ t('dangerButton') }}</mp-button>
  </mp-space>

  <app-type>{{ t('textButton') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-button variant="outline" status="primary">{{ t('outlineButton') }}</mp-button>
    <mp-button variant="outline">{{ t('outlineButton') }}</mp-button>
    <mp-button variant="text" status="primary">{{ t('plainTextButton') }}</mp-button>
    <mp-button variant="text">{{ t('plainTextButton') }}</mp-button>
    <mp-button variant="tonal" status="primary">{{ t('plainTextButton') }}</mp-button>
  </mp-space>

  <app-type>{{ t('disabledStatus') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-button disabled>{{ t('disabledStatus') }}</mp-button>
    <mp-button disabled variant="outline">{{ t('disabledStatus') }}</mp-button>
    <mp-button disabled variant="text">{{ t('disabledStatus') }}</mp-button>
  </mp-space>

  <app-type>{{ t('loadingStatus') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-button loading status="primary">{{ t('loadingStatus') }}</mp-button>
    <mp-button loading status="info" loading-type="rect">{{ t('loadingStatus') }}</mp-button>
    <mp-button loading status="success" loading-type="disappear">{{ t('loadingStatus') }}</mp-button>
    <mp-button loading status="danger" loading-type="cube">{{ t('loadingStatus') }}</mp-button>
    <mp-button loading status="warning" loading-type="wave">{{ t('loadingStatus') }}</mp-button>
  </mp-space>

  <app-type>{{ t('buttonSize') }}</app-type>
  <mp-space align="center" :size="['2.666vmin', '2.666vmin']">
    <mp-button status="primary">{{ t('normalButton') }}</mp-button>
    <mp-button status="success" size="sm">{{ t('smallButton') }}</mp-button>
    <mp-button status="warning" size="xs">{{ t('miniButton') }}</mp-button>
    <mp-button status="danger" size="lg">{{ t('largeButton') }}</mp-button>
  </mp-space>

  <app-type>{{ t('blockButton') }}</app-type>
  <mp-button block status="primary">{{ t('blockButton') }}</mp-button>

  <app-type>{{ t('customColor') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-button color="#66bb6a" text-color="#fff">{{ t('backgroundTextColor') }}</mp-button>
    <mp-button color="linear-gradient(to bottom right, #6750A4, #D0BCFF)" text-color="#fff">
      {{ t('linearGradientColor') }}
    </mp-button>
  </mp-space>

  <app-type>{{ t('roundButton') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-button round icon-container>
      <m-icon-bookmark />
    </mp-button>
    <mp-button status="primary" round icon-container>
      <m-icon-plus />
    </mp-button>
    <mp-button status="info" round icon-container>
      <m-icon-information />
    </mp-button>
    <mp-button status="success" round icon-container>
      <m-icon-check />
    </mp-button>
    <mp-button status="warning" round icon-container>
      <m-icon-warning />
    </mp-button>
    <mp-button status="danger" round icon-container>
      <m-icon-window-close />
    </mp-button>
  </mp-space>

  <app-type>{{ t('event') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-button status="success" @click="handleClick">{{ t('click') }}</mp-button>
    <mp-button status="success" @touchstart="handleTouchstart">{{ t('touchstart') }}</mp-button>
    <mp-button status="success" auto-loading @click="handleAutoLoadingClick">{{ t('autoLoading') }}</mp-button>
  </mp-space>

  <app-type>{{ t('themeColorButtonGroup') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-button-group status="default" variant="outline">
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
    </mp-button-group>

    <mp-button-group status="primary">
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
    </mp-button-group>
  </mp-space>

  <app-type>{{ t('buttonGroupSize') }}</app-type>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-button-group size="md" status="primary">
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
    </mp-button-group>

    <mp-button-group size="lg" status="primary">
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
    </mp-button-group>
  </mp-space>

  <app-type>{{ t('splitButton') }}</app-type>
  <mp-popover placement="bottom" same-width :offset-y="6">
    <mp-button-group status="primary">
      <mp-button @click.stop>{{ t('splitButton') }}</mp-button>
      <mp-button style="padding: 0 6px">
        <m-icon-menu-down :size="24" />
      </mp-button>
    </mp-button-group>

    <template #content>
      <mp-cell ripple>{{ t('splitButton') }}</mp-cell>
      <mp-cell ripple>{{ t('splitButton') }}</mp-cell>
      <mp-cell ripple>{{ t('splitButton') }}</mp-cell>
    </template>
  </mp-popover>

  <app-type>{{ t('modeButtonGroup') }}</app-type>
  <mp-space direction="column" :size="['3.666vmin', '3.666vmin']">
    <mp-button-group status="primary" variant="text">
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
    </mp-button-group>

    <mp-button-group status="primary" variant="outline">
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
    </mp-button-group>

    <mp-button-group>
      <mp-button status="warning" icon-container>
        <m-icon-warning />
      </mp-button>
      <mp-button status="info" icon-container>
        <m-icon-information />
      </mp-button>
      <mp-button status="success" icon-container>
        <m-icon-check />
      </mp-button>
    </mp-button-group>

    <mp-button-group status="primary">
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
    </mp-button-group>
  </mp-space>

  <app-type>{{ t('customButtonGroupColor') }}</app-type>
  <mp-button-group status="primary" color="linear-gradient(to bottom right, #6750A4, #D0BCFF)">
    <mp-button>{{ t('button') }}</mp-button>
    <mp-button>{{ t('button') }}</mp-button>
    <mp-button>{{ t('button') }}</mp-button>
  </mp-button-group>

  <app-type>{{ t('verticalButtonGroup') }}</app-type>
  <mp-space :size="['5vmin', '5vmin']">
    <mp-button-group status="primary" variant="text" vertical>
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
    </mp-button-group>

    <mp-button-group status="primary" variant="outline" vertical>
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
    </mp-button-group>

    <mp-button-group vertical>
      <mp-button status="warning" icon-container>
        <m-icon-warning />
      </mp-button>
      <mp-button status="info" icon-container>
        <m-icon-information />
      </mp-button>
      <mp-button status="success" icon-container>
        <m-icon-check />
      </mp-button>
    </mp-button-group>

    <mp-button-group status="primary" vertical>
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
      <mp-button>{{ t('button') }}</mp-button>
    </mp-button-group>
  </mp-space>
</template>
