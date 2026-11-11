<script setup>
import { computed, ref } from 'vue'
import { iconNames as icons } from '@maple-design/icons-vue'
import * as MapleIcons from '@maple-design/icons-vue'
import { pascalCase } from '@maple-design/shared-vue'
import { Message } from '@maple-design/ui-vue'

const demoText = {
  basic: '基础用法',
  iconSize: '图标尺寸',
  iconColor: '图标颜色',
  rotateAndSpin: '旋转与持续旋转',
  clickEvent: '点击事件',
  iconAnimation: '动态名称（特殊场景，点击切换）',
  iconList: '图标列表 (点击复制)',
  copySuccess: '复制成功：',
  clickSuccess: '点击成功',
  searchIcon: '搜索图标',
  groupDirection: '方向',
  groupFeedback: '状态与反馈',
  groupEditing: '编辑',
  groupFiles: '文件',
  groupMedia: '媒体',
  groupCommunication: '通信与用户',
  groupBrands: '品牌',
  groupWeather: '天气',
  groupCommerce: '商业',
  groupGeneral: '通用',
}

const searchText = ref('')
const searchIcons = computed(() =>
  searchText.value ? icons.filter((name) => name.includes(searchText.value.trim().toLowerCase())) : icons,
)
const groupRules = [
  [
    'groupDirection',
    /(^|-)(arrow|caret|chevron|left|right|up|down|expand|shrink|swap|rotate|fullscreen|backward|forward)(-|$)/,
  ],
  ['groupFeedback', /(^|-)(alert|check|close|error|exclamation|info|question|success|warning|empty|stop)(-|$)/],
  [
    'groupEditing',
    /(^|-)(align|attachment|bold|brush|copy|delete|edit|eraser|filter|font|formula|italic|link|list|paste|quote|redo|scissor|sort|underline|undo|zoom)(-|$)/,
  ],
  ['groupFiles', /(^|-)(archive|book|bookmark|drive|file|folder|save|storage)(-|$)/],
  ['groupMedia', /(^|-)(camera|image|live|music|mute|pause|play|record|skip|sound|video|voice)(-|$)/],
  ['groupCommunication', /(^|-)(email|message|notification|phone|send|share|subscribe|user|robot)(-|$)/],
  ['groupBrands', /(alipay|bytedance|codepen|facebook|github|gitlab|google|lark|qq|tiktok|twitter|wechat|weibo|xigua)/],
  ['groupWeather', /(^|-)weather-|(^|-)sun(-|$)|(^|-)moon(-|$)/],
  ['groupCommerce', /(^|-)(barcode|cart|gift|shopping|tag)(-|$)/],
]
const iconGroups = computed(() => {
  const groups = new Map()
  for (const name of searchIcons.value) {
    const key = groupRules.find(([, rule]) => rule.test(name))?.[0] ?? 'groupGeneral'
    if (!groups.has(key)) {
      groups.set(key, [])
    }
    groups.get(key).push(name)
  }
  return [...groupRules.map(([key]) => key), 'groupGeneral'].flatMap((key) => {
    const names = groups.get(key)
    return names?.length ? [[demoText[key] ?? String(key), names.sort()]] : []
  })
})
function resolveIcon(name) {
  return MapleIcons[`Icon${pascalCase(name)}`]
}

async function copyIcon(name) {
  const markup = `<m-icon-${name} />`
  try {
    await navigator.clipboard.writeText(markup)
    Message.success(`已复制 ${markup}`)
  } catch {
    Message.error('复制失败，请检查浏览器剪贴板权限')
  }
}
</script>

<template>
  <div>
    <mp-input
      v-model.trim="searchText"
      class="icon-example__search"
      size="sm"
      variant="outline"
      placeholder="搜索图标名称"
      clearable
    >
      <template #suffix>
        <m-icon-search class="search-icon" />
      </template>
    </mp-input>

    <section v-for="[group, names] in iconGroups" :key="group" class="icon-example__group">
      <h3>
        {{ group }} <small>{{ names.length }}</small>
      </h3>
      <div class="icon-example__icons">
        <mp-button
          v-for="name in names"
          :key="name"
          class="icon-example__icon"
          variant="outline"
          @click="copyIcon(name)"
        >
          <span class="icon-example__icon-content">
            <component :is="resolveIcon(name)" :size="40" />
            <span class="icon-example__icon-name">{{ name }}</span>
          </span>
        </mp-button>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
@import '../../../style/elevation';

.icon-example {
  &__icons {
    width: 100%;
    display: grid;
    grid-template-columns: ~'repeat(auto-fill, minmax(min(100%, 168px), 1fr))';
    gap: 16px;
  }

  &__group {
    margin: 24px 8px 0;

    h3 {
      margin: 0 0 12px;
      font-size: 16px;
    }
    small {
      margin-left: 6px;
      color: var(--mp-color-text-3);
      font-weight: normal;
    }
  }

  &__icon {
    min-height: 132px;
    height: auto;
    justify-content: center;
    font: inherit;
    line-height: 1.5;
    color: var(--mp-color-text-1);
    background: var(--mp-paper-background);
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    padding: 20px 14px;
    border: 1px solid var(--mp-color-border-2);
    border-radius: 8px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    transition: background-color 0.25s;
  }

  &__search {
    width: auto;
    margin: 6px 8px 22px;
  }

  &__icon-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__icon-name {
    width: 100%;
    font-size: 13px;
    text-align: center;

    overflow-wrap: anywhere;
    white-space: normal;
    margin-top: 12px;
    line-height: 1.5;
  }
}

.search-icon {
  margin-left: 6px;
}
</style>
