<template>
  <div class="maple-site-header">
    <div class="maple-site-header__lead">
      <img class="maple-site-header__logo" :src="config.logo" @click="backRoot" />
      <div class="maple-site-header__title" v-if="title" @click="backRoot">{{ title }}</div>
    </div>

    <div class="maple-site-header__tail">
      <div
        class="maple-site-header__versions"
        @mouseenter="isOpenVersionsMenu = true"
        @mouseleave="isOpenVersionsMenu = false"
        v-if="isShowVersion"
      >
        <span style="font-size: 16px">{{ currentVersion }}</span>
        <mp-icon><MIconChevronDown /></mp-icon>
        <transition name="fade">
          <div
            class="maple-site-header__animation-list maple-site-header__animation-versions mp-elevation--5"
            v-show="isOpenVersionsMenu"
            :style="{ pointerEvents: isOpenVersionsMenu ? 'auto' : 'none' }"
          >
            <mp-cell
              v-for="(i, key) in versionItems"
              v-ripple
              :key="key"
              :class="{ 'maple-site-header__animation-list--active': currentVersion === i.label }"
              @click="open(i.link)"
            >
              {{ i.label }}
            </mp-cell>
          </div>
        </transition>
      </div>

      <a
        class="maple-site-header__link"
        style="width: auto; border-radius: 3px; padding: 0 12px; height: 40px"
        target="_blank"
        :href="ai"
        v-ripple
        v-if="ai"
      >
        <span>AI Agent</span>
      </a>
      <a
        class="maple-site-header__link"
        style="margin-right: 8px"
        target="_blank"
        :href="changelog"
        v-ripple
        v-if="changelog"
      >
        <mp-icon :size="28"><MIconHistory /></mp-icon>
      </a>
      <a class="maple-site-header__link" target="_blank" :href="playground" v-ripple v-if="playground">
        <mp-icon :size="24"><MIconCodeJson /></mp-icon>
      </a>
      <a class="maple-site-header__link" target="_blank" :href="github" v-ripple v-if="github">
        <mp-icon :size="28"><MIconGithub /></mp-icon>
      </a>
      <div
        class="maple-site-header__theme"
        @mouseenter="isOpenThemeMenu = true"
        @mouseleave="isOpenThemeMenu = false"
        v-if="themes.length > 1"
      >
        <mp-icon :size="28"><MIconPaletteFill /></mp-icon>
        <mp-icon><MIconChevronDown /></mp-icon>
        <transition name="fade">
          <div
            class="maple-site-header__animation-list mp-elevation--5"
            v-show="isOpenThemeMenu"
            :style="{ pointerEvents: isOpenThemeMenu ? 'auto' : 'none' }"
          >
            <mp-cell
              v-for="t in themes"
              v-ripple
              :key="t.value"
              :class="{ 'maple-site-header__animation-list--active': currentTheme === t.value }"
              @click="() => toggleTheme(t.value as Theme)"
              >{{ t[language as keyof typeof t] }}
            </mp-cell>
          </div>
        </transition>
      </div>
      <select
        v-if="Object.keys(nonEmptyLanguages).length > 1"
        class="maple-site-header__language"
        :aria-label="language === 'en-US' ? 'Language' : '语言'"
        :value="language"
        @change="handleLanguageChange(($event.target as HTMLSelectElement).value)"
        style="color: inherit; background: transparent; border: 0; font: inherit; cursor: pointer"
      >
        <option v-for="(value, key) in nonEmptyLanguages" :key="key" :value="key">{{ value }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import config from '@config'
import {
  IconChevronDown as MIconChevronDown,
  IconCodeJson as MIconCodeJson,
  IconGithub as MIconGithub,
  IconHistory as MIconHistory,
  IconPaletteFill as MIconPaletteFill,
  IconTranslate as MIconTranslate,
} from '@maplejs/icons-vue'
import { getBrowserTheme, getPCLocationInfo, persistTheme, setTheme, Theme } from '@maplejs/maple-cli/client'
import { useRouter } from 'vue-router'
import { removeEmpty } from '../../utils'

export default defineComponent({
  components: { MIconChevronDown, MIconHistory, MIconCodeJson, MIconGithub, MIconPaletteFill, MIconTranslate },
  name: 'AppHeader',
  props: {
    language: {
      type: String,
    },
  },
  setup() {
    const title: Ref<string> = ref(config?.title)
    const logo: Ref<string> = ref(config?.pc?.logo)
    const languages: Ref<Record<string, string>> = ref(config?.pc?.header?.i18n ?? {})
    const currentVersion: Ref<string> = ref(config?.pc?.header?.currentVersion ?? '')
    const versions = config?.pc?.header?.versions
    const isShowVersion: Ref<boolean> = ref(!!versions)
    const versionItems: Ref<Array<Record<string, any>>> = ref(
      (versions ?? []).find((i: any) => window.location.host.includes(i.name))?.items ?? versions?.[0]?.items ?? [],
    )
    const playground: Ref<string> = ref(config?.pc?.header?.playground)
    const github: Ref<string> = ref(config?.pc?.header?.github)
    const themes: Ref<Record<string, any>> = ref(config?.pc?.header?.themes ?? {})
    const changelog: Ref<string> = ref(config?.pc?.header?.changelog)
    const ai: Ref<string> = ref(config?.pc?.header?.ai)
    const redirect = config?.pc?.redirect ?? ''
    const darkMode: Ref<boolean> = ref(config?.pc?.header?.darkMode ?? false)
    const currentTheme = ref(getBrowserTheme('site'))

    const isOpenThemeMenu: Ref<boolean> = ref(false)
    const isOpenVersionsMenu: Ref<boolean> = ref(false)
    const router = useRouter()
    const nonEmptyLanguages: ComputedRef<Record<string, string>> = computed(() => removeEmpty(languages.value))

    const backRoot = () => {
      const { language: lang } = getPCLocationInfo()
      router.replace(`/${lang}${redirect}`)
    }

    const handleLanguageChange = (language: string) => {
      const current = router.currentRoute.value
      router.push({ path: current.path.replace(/^\/[^/]+/, `/${language}`), query: current.query, hash: current.hash })
    }

    const setCurrentTheme = (theme: Theme) => {
      currentTheme.value = theme
      setTheme(theme)
      persistTheme(theme, 'site')
    }

    const toggleTheme = (value: Theme) => {
      setCurrentTheme(value)
      isOpenThemeMenu.value = false
    }

    const open = (value: string) => {
      window.location.href = value
    }

    setTheme(currentTheme.value)

    return {
      logo,
      config,
      title,
      currentVersion,
      languages,
      isShowVersion,
      versionItems,
      themes,
      nonEmptyLanguages,
      playground,
      changelog,
      ai,
      github,
      isOpenVersionsMenu,
      isOpenThemeMenu,
      darkMode,
      currentTheme,
      open,
      backRoot,
      handleLanguageChange,
      toggleTheme,
    }
  },
})
</script>

<style lang="less">
.maple-site-header {
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 30px;
  justify-content: space-between;
  user-select: none;
  z-index: 9;
  background: var(--site-config-color-bar);
  border-bottom: 1px solid var(--site-config-color-border);
  box-sizing: border-box;

  &__lead {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__logo {
    width: 36px;
    height: 36px;
    margin-right: 10px;
    flex-shrink: 0;
    display: block;
    object-fit: contain;
    transition: 0.3s all ease-in-out;
  }

  &__title {
    font-size: 22px;
    margin-right: 12px;
  }

  &__tail {
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 562px) {
    &__tail {
      display: none;
    }
  }

  &__versions {
    border-radius: 3px;
    height: 40px;
    display: flex;
    align-items: center;
    padding-right: 10px;
    padding-left: 18px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.25s;
    margin-right: 4px;

    &:hover {
      background: var(--site-config-color-nav-button-hover-background);
    }
  }

  &__link {
    border-radius: 50%;
    width: 42px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    color: var(--site-config-color-text);
    transition: background-color 0.25s;
    margin-right: 6px;

    a {
      text-decoration: none;
    }

    &:hover {
      background: var(--site-config-color-nav-button-hover-background);
    }
  }

  &__language {
    border-radius: 3px;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.25s;

    &:hover {
      background: var(--site-config-color-nav-button-hover-background);
    }
  }

  &__theme {
    border-radius: 3px;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.25s;
    margin-right: 6px;

    &:hover {
      background: var(--site-config-color-nav-button-hover-background);
    }
  }

  &__animation-list {
    background: var(--site-config-color-bar);
    cursor: pointer;
    color: var(--site-config-color-text);
    border-radius: 2px;
    position: absolute;
    top: 40px;
    left: -20px;

    .mp-cell {
      width: 100px !important;
      color: var(--site-config-color-text);

      &__content {
        color: inherit !important;
      }
    }

    &--active {
      background: var(--site-config-color-pc-language-active-background) !important;
      color: var(--site-config-color-pc-language-active) !important;
    }
  }

  &__theme-animation-list {
    background: var(--site-config-color-bar);
    cursor: pointer;
    color: var(--site-config-color-text);
    border-radius: 2px;
    position: absolute;
    top: 40px;
    left: -20px;

    .mp-cell {
      width: 100px !important;
      color: var(--site-config-color-text);

      &__content {
        color: inherit !important;
      }
    }

    &--active {
      background: var(--site-config-color-pc-theme-active-background) !important;
      color: var(--site-config-color-pc-theme-active) !important;
    }
  }

  &__animation-versions {
    left: -7px;
  }
}
</style>

<style lang="less" scoped>
.fade-enter-active {
  animation-name: fade-in;
  animation-duration: 0.3s;
}

.fade-leave-active {
  animation-name: fade-leave;
  animation-duration: 0.3s;
}

@keyframes fade-in {
  0% {
    top: 30px;
    opacity: 0;
  }
  100% {
    top: 40px;
    opacity: 1;
  }
}

@keyframes fade-leave {
  0% {
    top: 40px;
    opacity: 1;
  }
  100% {
    top: 30px;
    opacity: 0;
  }
}
</style>
