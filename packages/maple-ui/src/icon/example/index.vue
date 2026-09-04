<script setup>
import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { iconNames as icons } from '@maplejs/icons-vue'
import * as MapleIcons from '@maplejs/icons-vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { pascalCase } from '@maplejs/maple-shared'
import { Message } from '@maplejs/maple-ui'
import Clipboard from 'clipboard'
import { t, use } from './locale'

const iconNames = reactive(icons)
const iconName = ref('info-circle-fill')
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
    return names?.length ? [[t(key), names.sort()]] : []
  })
})

const app = getCurrentInstance()?.appContext.app
app?.component('IconInfoCircleFill', MapleIcons.IconInfoCircleFill)
app?.component('IconCheckboxMarkedCircleFill', MapleIcons.IconCheckboxMarkedCircleFill)

onMounted(() => {
  const clipboard = new Clipboard('.icon-example__icon', {
    text: (trigger) => {
      const iconName = trigger.getAttribute('data-clipboard-text') ?? ''
      return `<m-icon-${iconName} />`
    },
  })

  clipboard.on('success', (e) => {
    Message.success(`${t('copySuccess')} ${e.text}!`)
  })
})

watchLang(use)
onThemeChange()

function toggle() {
  iconName.value = iconName.value === 'info-circle-fill' ? 'checkbox-marked-circle-fill' : 'info-circle-fill'
}

function resolveIcon(name) {
  return MapleIcons[`Icon${pascalCase(name)}`]
}
</script>

<template>
  <app-type>{{ t('basic') }}</app-type>
  <mp-icon size="40" color="red">
    <m-icon-checkbox-marked-circle-fill />
  </mp-icon>
  <mp-icon size="40" color="red">
    <m-icon-info-circle-fill />
  </mp-icon>

  <app-type>{{ t('iconSize') }}</app-type>
  <mp-icon class="icon-example__animation-icon" size="20"><m-icon-checkbox-marked-circle-fill /></mp-icon>
  <mp-icon class="icon-example__animation-icon" size="28"><m-icon-checkbox-marked-circle-fill /></mp-icon>
  <mp-icon class="icon-example__animation-icon" size="36"><m-icon-checkbox-marked-circle-fill /></mp-icon>

  <app-type>{{ t('iconColor') }}</app-type>
  <mp-icon class="icon-example__animation-icon" size="28" color="var(--mp-color-primary)"
    ><m-icon-checkbox-marked-circle-fill
  /></mp-icon>
  <mp-icon class="icon-example__animation-icon" size="28" color="var(--mp-color-success)"
    ><m-icon-checkbox-marked-circle-fill
  /></mp-icon>

  <app-type>{{ t('rotateAndSpin') }}</app-type>
  <div class="icon-example__transform-demo">
    <div>
      <mp-icon size="32" :rotate="90"><m-icon-arrow-right /></mp-icon>
      <span>rotate="90"</span>
    </div>
    <div>
      <mp-icon size="32" spin><m-icon-refresh /></mp-icon>
      <span>spin</span>
    </div>
  </div>

  <app-type>{{ t('clickEvent') }}</app-type>
  <mp-icon
    class="icon-example__animation-icon"
    size="28"
    color="var(--mp-color-primary)"
    @click="Message.success(t('clickSuccess'))"
  >
    <m-icon-checkbox-marked-circle-fill />
  </mp-icon>

  <app-type>{{ t('iconAnimation') }}</app-type>
  <mp-icon
    class="icon-example__animation-icon"
    color="var(--mp-color-primary)"
    :size="30"
    :transition="300"
    :name="iconName"
    @click="toggle"
  />

  <app-type>{{ t('iconList') }}</app-type>

  <mp-input
    v-model.trim="searchText"
    class="icon-example__search"
    size="sm"
    variant="outlined"
    :placeholder="t('searchIcon')"
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
</template>

<style lang="less" scoped>
@import '../../style/elevation';

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
