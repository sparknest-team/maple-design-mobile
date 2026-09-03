<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

watchLang(use)
onThemeChange()

const customColors = [
  '#F53F3F',
  '#7816FF',
  '#00B42A',
  '#00BEBE',
  '#FF7D00',
  '#EB0AA4',
  '#7BC616',
  '#86909C',
  '#B71DE8',
  '#0FC6C2',
  '#FFB400',
  '#168CFF',
  '#FF5722',
]

const dot = ref(false)
const offsetX = ref(0)
const offsetY = ref(0)
const show = ref(true)
const content = ref(1)

function toggleDot() {
  dot.value = !dot.value
}

function plusOffset() {
  offsetX.value += 1
  offsetY.value += 1
}

function minusOffset() {
  offsetX.value -= 1
  offsetY.value -= 1
}

function resetOffset() {
  offsetX.value = 0
  offsetY.value = 0
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-space wrap align="center" :size="16">
    <mp-badge :content="9">
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
    <mp-badge :content="9" dot>
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
    <mp-badge>
      <template #content>
        <m-icon-history class="badge-example__icon" />
      </template>
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
  </mp-space>

  <app-type>{{ t('inlineType') }}</app-type>
  <mp-space direction="column" :size="12">
    <div>{{ t('standalone') }}</div>
    <mp-space wrap :size="12">
      <mp-badge :content="1000" />
      <mp-badge :content="1000" dot />
    </mp-space>
    <div>{{ t('inlineWithDescription') }}</div>
    <mp-space wrap :size="12">
      <mp-badge :content="1000" mode="inline" :description="t('descriptionText')" />
      <mp-badge :content="1000" mode="inline" :description="t('descriptionText')" dot />
    </mp-space>
    <div>{{ t('inlinePositionStart') }}</div>
    <mp-space wrap :size="12">
      <mp-badge :content="1000" mode="inline" :description="t('descriptionText')" inline-position="start" />
      <mp-badge :content="1000" mode="inline" :description="t('descriptionText')" dot inline-position="start" />
    </mp-space>
  </mp-space>

  <app-type>{{ t('dotBadge') }}</app-type>
  <mp-space wrap align="center" :size="16">
    <mp-badge :content="9" dot :offset-x="6" :offset-y="-2">
      <a href="#">{{ t('link') }}</a>
    </mp-badge>
    <mp-badge :content="9" dot :offset-x="2" :offset-y="-2">
      <m-icon-bell class="badge-example__bell" />
    </mp-badge>
  </mp-space>

  <app-type>{{ t('customContent') }}</app-type>
  <mp-space wrap align="center" :size="16">
    <mp-badge content="NEW">
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
    <mp-badge content="HOT">
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
    <mp-badge content="NEW" mode="inline">
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
    <mp-badge content="HOT" mode="inline" inline-position="end">
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
  </mp-space>

  <app-type>{{ t('maximum') }}</app-type>
  <mp-space wrap align="center" :size="16">
    <mp-badge :max="10" :content="0">
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
    <mp-badge :max="10" :content="100">
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
    <mp-badge :content="100">
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
    <mp-badge :max="999" :content="1000">
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
  </mp-space>

  <app-type>{{ t('statusAndColor') }}</app-type>
  <mp-space direction="column" :size="12">
    <div>{{ t('customColorsEnd') }}</div>
    <mp-space wrap :size="12">
      <mp-badge
        v-for="color in customColors"
        :key="color"
        :color="color"
        :description="color"
        mode="inline"
        inline-position="end"
      />
    </mp-space>
    <div>{{ t('statusBadge') }}</div>
    <mp-space wrap :size="12">
      <mp-badge status="default" description="Default" mode="inline" />
      <mp-badge status="success" description="Success" mode="inline" />
      <mp-badge status="warning" description="Warning" mode="inline" />
      <mp-badge status="danger" description="Danger" mode="inline" />
    </mp-space>
    <mp-space wrap :size="16">
      <mp-badge status="default" description="Default" content="1" />
      <mp-badge status="success" description="Success" content="1" />
      <mp-badge status="warning" description="Warning" content="1" />
      <mp-badge status="danger" description="Danger" content="1" />
    </mp-space>
    <mp-space wrap :size="8">
      <mp-badge status="default" content="Default" />
      <mp-badge status="success" content="Success" />
      <mp-badge status="warning" content="Warning" />
      <mp-badge status="danger" content="Danger" />
      <mp-badge status="primary" content="Primary" />
      <mp-badge status="info" content="Info" />
    </mp-space>
    <div>{{ t('customBgAndText') }}</div>
    <mp-space wrap :size="12">
      <mp-badge description="red #7BC616" content="1" color="red" text-color="#7BC616" />
      <mp-badge description="green red" content="1" color="green" text-color="red" />
      <mp-badge description="yellow red" content="1" color="yellow" text-color="red" />
    </mp-space>
  </mp-space>

  <app-type>{{ t('size') }}</app-type>
  <mp-space direction="column" :size="16">
    <mp-space wrap :size="8">
      <mp-badge
        v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']"
        :key="`dot-${size}`"
        dot
        :content="1"
        :size="size"
        mode="inline"
        :description="t('descriptionText')"
      />
    </mp-space>
    <mp-space wrap :size="8">
      <mp-badge
        v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']"
        :key="`num-${size}`"
        :content="1"
        :size="size"
        mode="inline"
        :description="t('descriptionText')"
      />
    </mp-space>
    <mp-space wrap :size="16">
      <mp-badge v-for="size in ['xs', 'sm', 'md']" :key="`fdot-${size}`" dot :content="1" :size="size">
        <mp-avatar shape="square" :size="40">
          <m-icon-account-circle />
        </mp-avatar>
      </mp-badge>
      <mp-badge v-for="size in ['lg', 'xl']" :key="`fdot-${size}`" dot :max="999" :content="1000" :size="size">
        <mp-avatar shape="square" :size="40">
          <m-icon-account-circle />
        </mp-avatar>
      </mp-badge>
    </mp-space>
    <mp-space wrap :size="16">
      <mp-badge v-for="size in ['xs', 'sm', 'md']" :key="`fnum-${size}`" :content="1" :size="size">
        <mp-avatar shape="square" :size="40">
          <m-icon-account-circle />
        </mp-avatar>
      </mp-badge>
      <mp-badge v-for="size in ['lg', 'xl']" :key="`fnum-${size}`" :max="999" :content="1" :size="size">
        <mp-avatar shape="square" :size="40">
          <m-icon-account-circle />
        </mp-avatar>
      </mp-badge>
    </mp-space>
    <mp-space wrap :size="12">
      <mp-badge :content="1" size="xs">{{ t('descriptionText') }}</mp-badge>
      <mp-badge :content="1" size="sm">{{ t('descriptionText') }}</mp-badge>
      <mp-badge :content="1" size="md">{{ t('descriptionText') }}</mp-badge>
      <mp-badge :max="999" :content="1" size="lg">{{ t('descriptionText') }}</mp-badge>
      <mp-badge :max="999" :content="1" size="xl">{{ t('descriptionText') }}</mp-badge>
    </mp-space>
  </mp-space>

  <app-type>{{ t('position') }}</app-type>
  <mp-space wrap :size="8">
    <mp-button size="sm" @click="toggleDot">{{ t('toggleDot') }}</mp-button>
    <mp-button size="sm" @click="plusOffset">{{ t('plusOffset') }}</mp-button>
    <mp-button size="sm" @click="minusOffset">{{ t('minusOffset') }}</mp-button>
    <mp-button size="sm" @click="resetOffset">{{ t('resetOffset') }}</mp-button>
  </mp-space>
  <mp-divider />
  <mp-space wrap :size="24">
    <mp-badge :content="100" position="top-right" :dot="dot" :offset-x="offsetX" :offset-y="offsetY">
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
    <mp-badge :content="100" position="top-left" :dot="dot" :offset-x="offsetX" :offset-y="offsetY">
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
    <mp-badge :content="100" position="bottom-right" :dot="dot" :offset-x="offsetX" :offset-y="offsetY">
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
    <mp-badge :content="100" position="bottom-left" :dot="dot" :offset-x="offsetX" :offset-y="offsetY">
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
  </mp-space>
  <mp-space wrap align="center" :size="16" style="margin-top: 12px">
    <mp-badge :content="100" mode="inline" inline-position="start" :dot="dot" :offset-y="offsetY">
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
    <mp-badge :content="100" mode="inline" inline-position="end" :dot="dot" :offset-y="offsetY">
      <mp-avatar shape="square" :size="40">
        <m-icon-account-circle />
      </mp-avatar>
    </mp-badge>
  </mp-space>

  <app-type>{{ t('showAndHide') }}</app-type>
  <mp-space wrap align="center" :size="12">
    <span>{{ t('control') }}</span>
    <mp-switch v-model="show" />
    <mp-input-number v-model="content" size="sm" />
  </mp-space>
  <mp-divider />
  <mp-space direction="column" :size="12">
    <mp-badge :content="0" :show-zero="true" :show="show" description="show-zero true" />
    <mp-badge :content="0" :show-zero="false" :show="show" description="show-zero false" />
  </mp-space>
  <mp-divider />
  <mp-space wrap :size="12">
    <mp-badge :content="content" :show="show" :description="t('descriptionText')" />
    <mp-badge :content="content" :show="show" :description="t('descriptionText')" />
    <mp-badge :content="content" :show="show" :description="t('descriptionText')" dot />
  </mp-space>

  <app-type>{{ t('variant') }}</app-type>
  <mp-space direction="column" :size="16">
    <mp-space wrap :size="16">
      <mp-badge
        v-for="status in [undefined, 'success', 'warning', 'danger', 'primary', 'info']"
        :key="`v-${status || 'default'}`"
        variant="outline"
        content="1"
        :status="status"
      >
        <mp-avatar shape="square" :size="40">
          <m-icon-account-circle />
        </mp-avatar>
      </mp-badge>
    </mp-space>
    <mp-space wrap :size="8">
      <mp-badge
        v-for="status in [undefined, 'success', 'warning', 'danger', 'primary', 'info']"
        :key="`vi-${status || 'default'}`"
        variant="outline"
        content="1"
        :status="status"
        mode="inline"
        :description="t('descriptionText')"
      />
    </mp-space>
    <mp-space wrap :size="8">
      <mp-badge
        v-for="status in [undefined, 'success', 'warning', 'danger', 'primary', 'info']"
        :key="`vd-${status || 'default'}`"
        variant="outline"
        content="1"
        :status="status"
        dot
        :description="t('descriptionText')"
        mode="inline"
      />
    </mp-space>
  </mp-space>
</template>

<style>
.badge-example__icon {
  vertical-align: middle;
  color: var(--mp-color-text-2);
}

.badge-example__bell {
  color: #888;
  font-size: 18px;
  vertical-align: -3px;
}
</style>
