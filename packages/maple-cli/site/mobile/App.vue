<template>
  <div style="position: relative">
    <header class="mobile-page-header">
      <mp-page-header
        class="app-bar mobile-page-header__content"
        :show-back="showBackIcon"
        :title="bigCamelizeComponentName"
        v-on="showBackIcon ? { back } : {}"
      >
        <template #extra>
          <mp-button
            v-if="!showBackIcon && github"
            style="margin-left: 2px; margin-right: 6px"
            text
            round
            color="transparent"
            text-color="#fff"
            @click="toGithub"
          >
            <mp-icon class="github" style="margin-top: 1px"><MIconGithub /></mp-icon>
          </mp-button>
          <mp-button
            v-if="themes.length > 1"
            class="theme-button"
            text
            color="transparent"
            text-color="#fff"
            @click.stop="showThemeMenu = true"
          >
            <mp-icon :size="28" class="palette-fill"><MIconPaletteFill /></mp-icon>
            <mp-icon class="arrow-down"><MIconChevronDown /></mp-icon>
          </mp-button>
          <select
            v-if="Object.keys(nonEmptyLanguages).length > 1"
            class="i18n-button"
            :aria-label="language === 'en-US' ? 'Language' : '语言'"
            :value="language"
            @change="changeLanguage(($event.target as HTMLSelectElement).value)"
            style="color: inherit; background: transparent; border: 0; font: inherit; cursor: pointer"
          >
            <option v-for="(value, key) in nonEmptyLanguages" :key="key" :value="key">{{ value }}</option>
          </select>
        </template>
      </mp-page-header>
    </header>
    <div class="router-view__block">
      <router-view />
    </div>

    <transition name="site-menu">
      <div class="theme-settings mp-elevation--3" v-if="showThemeMenu">
        <mp-cell
          v-for="t in themes"
          :key="t.value"
          class="mobile-theme-cell"
          :class="[currentTheme === t.value && 'mobile-theme-cell--active']"
          v-ripple
          @click="toggleTheme(t.value)"
        >
          {{ t[language] }}
        </mp-cell>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, type ComputedRef, type Ref } from 'vue'
import config from '@config'
import {
  IconChevronDown as MIconChevronDown,
  IconGithub as MIconGithub,
  IconPaletteFill as MIconPaletteFill,
  IconTranslate as MIconTranslate,
} from '@maplejs/icons-vue'
import {
  getBrowserTheme,
  getMobileIndex,
  persistTheme,
  setTheme,
  watchLang,
  type Theme,
} from '@maplejs/maple-cli/client'
import { pascalCase } from '@maplejs/maple-shared'
import { useRoute, useRouter } from 'vue-router'
import { inIframe, isPhone, removeEmpty } from '../utils'

export default defineComponent({
  components: { MIconGithub, MIconPaletteFill, MIconChevronDown, MIconTranslate },
  setup() {
    const bigCamelizeComponentName: Ref<string> = ref('')
    const route = useRoute()
    const router = useRouter()
    const showBackIcon: Ref<boolean> = ref(false)
    const showThemeMenu: Ref<boolean> = ref(false)
    const language: Ref<string> = ref('')
    const languages: Ref<Record<string, string>> = ref(config?.mobile?.header?.i18n ?? {})
    const themes: Ref<Record<string, any>[]> = ref(config?.mobile?.header?.themes ?? {})
    const nonEmptyLanguages: ComputedRef<Record<string, string>> = computed(() => removeEmpty(languages.value))
    const redirect = config?.mobile?.redirect ?? ''
    const github: Ref<string> = ref(config?.mobile?.header?.github ?? '')
    const darkMode: Ref<string> = ref(config?.mobile?.header?.darkMode ?? '')
    const currentTheme = ref(getBrowserTheme('demo'))

    const changeLanguage = (lang: string) => {
      language.value = lang
      router.push({ path: route.path, query: { ...route.query, language: lang }, hash: route.hash })

      if (!isPhone() && inIframe()) {
        ;(window.top as any).scrollToMenu(redirect.slice(1))
      }
    }

    const back = () => {
      window.location.href = `${getMobileIndex()}#${redirect}?language=${language.value}&replace=${redirect.slice(1)}`

      if (!isPhone() && inIframe()) {
        ;(window.top as any).scrollToMenu(redirect.slice(1))
      }
    }

    const toGithub = () => {
      if (inIframe() && !isPhone()) {
        window.top!.open(github.value)
      } else {
        window.location.href = github.value
      }
    }

    watchLang((newValue) => {
      language.value = newValue
    })

    watch(
      () => route.path,
      (to: string) => {
        const componentName = pascalCase(to.slice(1))
        const redirectName = pascalCase(redirect.slice(1))
        bigCamelizeComponentName.value = componentName === redirectName ? '' : componentName
        showBackIcon.value = componentName !== redirectName
      },
    )

    const setCurrentTheme = (theme: Theme) => {
      currentTheme.value = theme
      setTheme(theme)
      persistTheme(theme, 'demo')
    }

    const toggleTheme = (value: Theme) => {
      setCurrentTheme(value)
      showThemeMenu.value = false
    }

    ;(window as any).toggleTheme = toggleTheme
    setTheme(currentTheme.value)

    document.body.addEventListener('click', () => {
      showThemeMenu.value = false
    })

    return {
      bigCamelizeComponentName,
      showBackIcon,
      github,
      languages,
      themes,
      language,
      nonEmptyLanguages,
      currentTheme,
      darkMode,
      toGithub,
      back,
      changeLanguage,
      toggleTheme,
      showThemeMenu,
    }
  },
})
</script>

<style lang="less">
* {
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

:root {
  --site-mobile-page-header-safe-area-top: constant(safe-area-inset-top);
  --site-mobile-page-header-safe-area-top: env(safe-area-inset-top, 0px);
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  -webkit-tap-highlight-color: transparent;
  background: var(--site-config-color-mobile-body);
  color: var(--site-config-color-text);
  transition:
    background-color 0.25s,
    color 0.25s;
}

::-webkit-scrollbar {
  display: none;
  width: 0;
  background: transparent;
}

.app-type {
  width: 100%;
  padding: 15px 0;
  color: var(--site-config-color-sub-text);
  font-size: 14px;
  min-height: 50px;
}

.mobile-page-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  padding-top: var(--site-mobile-page-header-safe-area-top);
  font-weight: bold;
  background: var(--site-config-color-app-bar);
}

.site {
  &-menu-enter-from,
  &-menu-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }

  &-menu-enter-active,
  &-menu-leave-active {
    transition-property: opacity, transform;
    transition-duration: 0.25s;
  }
}

.settings {
  position: fixed;
  z-index: 200;
  top: calc(48px + var(--site-mobile-page-header-safe-area-top));
  right: 5px;
  background: var(--site-config-color-bar);
}

.theme-settings {
  position: fixed;
  z-index: 200;
  top: calc(48px + var(--site-mobile-page-header-safe-area-top));
  right: 68px;
  background: var(--site-config-color-bar);
}

.router-view__block {
  padding: calc(55px + var(--site-mobile-page-header-safe-area-top)) 15px 15px;
}

.mobile-language-cell {
  color: var(--site-config-color-text) !important;
  background: var(--site-config-color-bar) !important;
  cursor: pointer !important;

  &--active {
    color: var(--site-config-color-mobile-language-active) !important;
    background: var(--site-config-color-mobile-language-active-background) !important;
  }
}

.mobile-theme-cell {
  color: var(--site-config-color-text) !important;
  background: var(--site-config-color-bar) !important;
  cursor: pointer !important;

  &--active {
    color: var(--site-config-color-mobile-theme-active) !important;
    background: var(--site-config-color-mobile-theme-active-background) !important;
  }
}

.arrow-left {
  font-size: 28px !important;
}

.github {
  font-size: 28px !important;
}

.i18n {
  font-size: 24px !important;
}

.palette {
  font-size: 24px !important;
}

.arrow-down {
  font-size: 22px !important;
}

.i18n-button {
  padding-right: 6px !important;
  margin-right: 4px;
  padding-left: 12px !important;
}

.theme-button {
  padding-right: 6px !important;
  margin-right: 4px;
  padding-left: 12px !important;
}

.app-bar {
  --mp-page-header-title-color: #fff;
  --mp-page-header-subtitle-color: rgba(255, 255, 255, 0.72);
  --mp-page-header-back-color: #fff;

  background: var(--site-config-color-app-bar) !important;

  .mp-page-header {
    min-height: 54px;
    padding: 0 6px;

    &__main {
      flex: 1;
    }

    &__back {
      width: 42px;
      height: 54px;
      margin-left: -6px;
    }

    &__extra {
      display: flex;
      align-items: center;
      height: 54px;
      margin-left: 0;
    }
  }
}
</style>
