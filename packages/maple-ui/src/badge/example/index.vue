<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const value = ref(88)
const value1 = ref(188)
const max = ref(99)
const offset = ref(6)
const show = ref(true)

function handleChange() {
  show.value = !show.value
}

watchLang(use)
onThemeChange()
</script>

<template>
  <div class="example">
    <app-type>{{ t('themeColorBadge') }}</app-type>
    <mp-space :size="['2.666vmin', '4vmin']">
      <mp-badge dot />
      <mp-badge dot status="primary" />
      <mp-badge dot status="info" />
      <mp-badge dot status="success" />
      <mp-badge dot status="warning" />
      <mp-badge dot status="danger" />
    </mp-space>

    <app-type>{{ t('dotBadge') }}</app-type>
    <mp-badge dot status="danger">
      <mp-chip>{{ t('badge') }}</mp-chip>
    </mp-badge>

    <app-type>{{ t('customContentBadge') }}</app-type>
    <mp-space :size="['2.666vmin', '4vmin']">
      <mp-badge status="danger" content="badge">
        <mp-chip>{{ t('badge') }}</mp-chip>
      </mp-badge>
      <mp-badge status="danger" content="hot">
        <mp-chip>{{ t('badge') }}</mp-chip>
      </mp-badge>
      <mp-badge status="danger" :content="66">
        <mp-chip>{{ t('badge') }}</mp-chip>
      </mp-badge>
    </mp-space>

    <app-type>{{ t('maximum') }}</app-type>
    <mp-space :size="['2.666vmin', '4vmin']">
      <mp-badge status="danger" :content="value" :max="max">
        <mp-chip>{{ t('badge') }}</mp-chip>
      </mp-badge>
      <mp-badge status="danger" :content="value1" :max="max">
        <mp-chip>{{ t('badge') }}</mp-chip>
      </mp-badge>
    </mp-space>

    <app-type>{{ t('differentPositioningBadges') }}</app-type>
    <mp-space :size="['2.666vmin', '6vmin']">
      <mp-badge status="danger" dot>
        <mp-chip>{{ t('upperRight') }}</mp-chip>
      </mp-badge>
      <mp-badge status="danger" dot position="bottom-right">
        <mp-chip>{{ t('lowerRight') }}</mp-chip>
      </mp-badge>
      <mp-badge status="danger" dot position="top-left">
        <mp-chip>{{ t('upperLeft') }}</mp-chip>
      </mp-badge>
      <mp-badge status="danger" dot position="bottom-left">
        <mp-chip>{{ t('lowerLeft') }}</mp-chip>
      </mp-badge>
    </mp-space>

    <app-type>{{ t('offset') }}</app-type>
    <mp-space :size="['2.666vmin', '6vmin']">
      <mp-badge status="danger" dot :offset-x="offset" :offset-y="offset">
        <mp-chip>{{ t('badge') }}</mp-chip>
      </mp-badge>
      <mp-badge status="danger" dot position="bottom-right" :offset-x="offset" :offset-y="offset">
        <mp-chip>{{ t('badge') }}</mp-chip>
      </mp-badge>
    </mp-space>

    <app-type>{{ t('hidden') }}</app-type>
    <mp-space :size="['2.666vmin', '6vmin']">
      <mp-badge status="danger" dot :show="show">
        <mp-chip>{{ t('badge') }}</mp-chip>
      </mp-badge>

      <mp-button type="success" @click="handleChange">
        {{ t('clickToChangeTheState') }}
      </mp-button>
    </mp-space>

    <app-type>{{ t('customBadgeColor') }}</app-type>
    <mp-badge dot color="#6200ea">
      <mp-chip>{{ t('badge') }}</mp-chip>
    </mp-badge>

    <app-type>{{ t('customBadgeValue') }}</app-type>
    <mp-badge>
      <mp-chip>{{ t('badge') }}</mp-chip>

      <template #content>
        <mp-ellipsis style="max-width: 40px" :tooltip="{ sameWidth: false }">100000000</mp-ellipsis>
      </template>
    </mp-badge>

    <app-type>Inline 模式（带描述）</app-type>
    <mp-space :size="['2.666vmin', '4vmin']">
      <mp-badge type="inline" status="success" dot description="在线" />
      <mp-badge type="inline" status="warning" dot description="离开" />
      <mp-badge type="inline" status="danger" dot description="离线" />
    </mp-space>

    <app-type>尺寸</app-type>
    <mp-space :size="['2.666vmin', '4vmin']">
      <mp-badge type="inline" status="primary" :content="6" size="xs" description="xs" />
      <mp-badge type="inline" status="primary" :content="6" size="sm" description="sm" />
      <mp-badge type="inline" status="primary" :content="6" size="md" description="md" />
      <mp-badge type="inline" status="primary" :content="6" size="lg" description="lg" />
      <mp-badge type="inline" status="primary" :content="6" size="xl" description="xl" />
    </mp-space>

    <app-type>变体 outline</app-type>
    <mp-space :size="['2.666vmin', '4vmin']">
      <mp-badge type="inline" variant="outline" status="primary" :content="6" description="primary" />
      <mp-badge type="inline" variant="outline" status="success" :content="6" description="success" />
      <mp-badge type="inline" variant="outline" status="danger" :content="6" description="danger" />
    </mp-space>
  </div>
</template>
