<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { iconNames as icons } from '@maplejs/icons-vue'
import * as MapleIcons from '@maplejs/icons-vue'
import { pascalCase } from '@maplejs/maple-shared'
import { Message } from '@maplejs/maple-ui'
import Clipboard from 'clipboard'

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

const iconNames = reactive(icons)
const iconListRef = ref(null)
const searchText = ref('')
const searchIcons = computed(() =>
  searchText.value ? iconNames.filter((name) => name.includes(searchText.value)) : iconNames,
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

let clipboard
onMounted(() => {
  const triggers = iconListRef.value?.querySelectorAll('.icon-example__icon') ?? []
  clipboard = new Clipboard(triggers, {
    text: (trigger) => {
      const iconName = trigger.getAttribute('data-clipboard-text') ?? ''
      return `<m-icon-${iconName} />`
    },
  })

  clipboard.on('success', (e) => {
    Message.success(`${'复制成功：'} ${e.text}!`)
  })
})

onBeforeUnmount(() => clipboard?.destroy())
</script>

<template>
  <div ref="iconListRef">
    <mp-input
      v-model.trim="searchText"
      class="icon-example__search"
      size="sm"
      variant="outline"
      placeholder="搜索图标"
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
        <div
          v-for="name in names"
          :key="name"
          v-ripple
          class="icon-example__icon mp-elevation--2"
          :style="{ background: 'var(--mp-paper-background)' }"
          :data-clipboard-text="name"
        >
          <component :is="resolveIcon(name)" />
          <div class="icon-example__icon-name">{{ name }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
@import '../../../style/elevation';

.icon-example {
  &__animation {
    display: flex;
    align-items: center;
    padding-left: 8px;
  }

  &__animation-icon {
    margin-left: 5px;
  }

  &__transform-demo {
    display: flex;
    gap: 24px;

    > div {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
  }

  &__icons {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(112px, 1fr));
    gap: 12px;
  }

  &__group {
    margin: 24px 8px 0;

    h3 {
      margin: 0 0 12px;
      font-size: 16px;
    }
    small {
      margin-left: 6px;
      color: var(--mp-text-color-secondary);
      font-weight: normal;
    }
  }

  &__icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    padding: 18px 10px;
    border: 1px solid var(--mp-border-color);
    border-radius: 8px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    transition: background-color 0.25s;
  }

  &__search {
    margin: 6px 8px 22px;
  }

  &__icon-name {
    width: 100%;
    font-size: 12px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 8px;
  }
}

.search-icon {
  margin-left: 6px;
}

.fade {
  opacity: 0;
  transition-property: opacity;
}
</style>
