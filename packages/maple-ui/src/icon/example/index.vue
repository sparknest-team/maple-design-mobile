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
const iconName = ref('information')
const searchText = ref('')
const searchIcons = computed(() =>
  searchText.value ? iconNames.filter((name) => name.includes(searchText.value)) : iconNames,
)

const app = getCurrentInstance()?.appContext.app
app?.component('IconInformation', MapleIcons.IconInformation)
app?.component('IconCheckboxMarkedCircle', MapleIcons.IconCheckboxMarkedCircle)

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
  iconName.value = iconName.value === 'information' ? 'checkbox-marked-circle' : 'information'
}

function resolveIcon(name) {
  return MapleIcons[`Icon${pascalCase(name)}`]
}
</script>

<template>
  <app-type>{{ t('basic') }}</app-type>
  <mp-icon size="40" color="red">
    <m-icon-checkbox-marked-circle />
  </mp-icon>
  <mp-icon size="40" color="red">
    <m-icon-information />
  </mp-icon>

  <app-type>{{ t('iconSize') }}</app-type>
  <mp-icon class="icon-example__animation-icon" size="20"><m-icon-checkbox-marked-circle /></mp-icon>
  <mp-icon class="icon-example__animation-icon" size="28"><m-icon-checkbox-marked-circle /></mp-icon>
  <mp-icon class="icon-example__animation-icon" size="36"><m-icon-checkbox-marked-circle /></mp-icon>

  <app-type>{{ t('iconColor') }}</app-type>
  <mp-icon class="icon-example__animation-icon" size="28" color="var(--mp-color-primary)"
    ><m-icon-checkbox-marked-circle
  /></mp-icon>
  <mp-icon class="icon-example__animation-icon" size="28" color="var(--mp-color-success)"
    ><m-icon-checkbox-marked-circle
  /></mp-icon>

  <app-type>{{ t('clickEvent') }}</app-type>
  <mp-icon
    class="icon-example__animation-icon"
    size="28"
    color="var(--mp-color-primary)"
    @click="Message.success(t('clickSuccess'))"
  >
    <m-icon-checkbox-marked-circle />
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
    size="small"
    variant="outlined"
    :placeholder="t('searchIcon')"
    clearable
  >
    <template #suffix>
      <m-icon-magnify class="search-icon" />
    </template>
  </mp-input>

  <div class="icon-example__icons">
    <div
      v-for="name in searchIcons"
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
</template>

<style lang="less" scoped>
@import '../../styles/elevation';

.icon-example {
  &__animation {
    display: flex;
    align-items: center;
    padding-left: 8px;
  }

  &__animation-icon {
    margin-left: 5px;
  }

  &__icons {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  &__icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 29%;
    padding: 6% 5%;
    margin: 0 2% 4%;
    border-radius: 10px;
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
