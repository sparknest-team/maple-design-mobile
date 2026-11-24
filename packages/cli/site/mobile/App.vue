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
          <DirectionToggle />
          <mp-button
            v-if="!showBackIcon && github"
            style="margin-left: 2px; margin-right: 6px"
            text
            round
            color="transparent"
            text-color="#fff"
            @click="toGithub"
          >
            <DocsSourceIcon />
          </mp-button>
          <DocsSelect
            v-if="themes.length > 1"
            icon="theme"
            :label="language === 'en-US' ? 'Theme' : '主题'"
            :value="currentTheme"
            :options="themes.map((t) => ({ value: t.value, label: t[language] }))"
            @change="(value) => toggleTheme(value as Theme)"
          />
          <DocsSelect
            v-if="Object.keys(nonEmptyLanguages).length > 1"
            icon="language"
            :label="language === 'en-US' ? 'Language' : '语言'"
            :value="language"
            :options="Object.entries(nonEmptyLanguages).map(([value, label]) => ({ value, label }))"
            @change="changeLanguage"
          />
        </template>
      </mp-page-header>
    </header>
    <nav
      v-if="sections.length > 1 && (isDocumentation || isHome)"
      class="mobile-documentation-sections"
      :aria-label="language === 'en-US' ? 'Documentation areas' : '文档分区'"
    >
      <button
        v-for="section in sections"
        :key="section.id"
        type="button"
        class="mobile-documentation-section"
        :aria-pressed="activeSection?.id === section.id"
        @click="switchSection(section)"
      >
        {{ section.text[language] }}
      </button>
    </nav>
    <div class="router-view__block" :class="{ 'mobile-documentation': isDocumentation }">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, type ComputedRef, type Ref } from 'vue'
import config from '@config'
import {
  getBrowserTheme,
  getMobileIndex,
  persistTheme,
  setTheme,
  watchLang,
  watchTheme,
  type Theme,
} from '@maple-design/cli-vue/client'
import {
  IconChevronDown as MIconChevronDown,
  IconGithub as MIconGithub,
  IconPaletteFill as MIconPaletteFill,
  IconTranslate as MIconTranslate,
} from '@maple-design/icons-vue'
import { pascalCase } from '@maple-design/shared-vue'
import { DirectionToggle, DocsSelect, DocsSourceIcon } from '@sparknest/ui-doc-preview-vue'
import { useRoute, useRouter } from 'vue-router'
import { getDocumentationSection, isHomePath, sectionRoute, type DocumentationSection } from '../documentation-sections'
import { inIframe, isPhone, removeEmpty } from '../utils'

export default defineComponent({
  components: {
    DocsSourceIcon,
    DocsSelect,
    DirectionToggle,
    MIconGithub,
    MIconPaletteFill,
    MIconChevronDown,
    MIconTranslate,
  },
  setup() {
    const bigCamelizeComponentName: Ref<string> = ref('')
    const route = useRoute()
    const router = useRouter()
    const showBackIcon: Ref<boolean> = ref(false)
    const showThemeMenu: Ref<boolean> = ref(false)
    const language: Ref<string> = ref('')
    const sections = config?.pc?.sections ?? []
    const activeSection = computed(() => getDocumentationSection(route.path, sections, route.query.section))
    const isHome = computed(() => isHomePath(route.path))
    const switchSection = (section: DocumentationSection) => {
      if (isHome.value) {
        return router.push({ path: '/home', query: { section: section.id, language: language.value } })
      }
      if (inIframe()) {
        ;(window.parent as any).onMobileRouteChange(
          `/${language.value}/${section.entry}`,
          language.value,
          section.entry,
          '',
          {},
        )
        return
      }
      return router.push(sectionRoute(section, language.value, true))
    }
    const languages: Ref<Record<string, string>> = ref(config?.mobile?.header?.i18n ?? {})
    const themes: Ref<Record<string, any>[]> = ref(config?.mobile?.header?.themes ?? {})
    const nonEmptyLanguages: ComputedRef<Record<string, string>> = computed(() => removeEmpty(languages.value))
    const isDocumentation = computed(() => (config?.mobile?.docs ?? []).includes(route.path.split('/').at(-1) ?? ''))
    const redirect = config?.mobile?.redirect ?? ''
    const github: Ref<string> = ref(config?.mobile?.header?.github ?? '')
    const darkMode: Ref<string> = ref(config?.mobile?.header?.darkMode ?? '')
    const currentTheme = ref(getBrowserTheme('demo'))

    const changeLanguage = (lang: string) => {
      language.value = lang
      router.push({
        path: route.path.replace(/^\/(?:zh-CN|en-US)(?=\/)/, `/${lang}`),
        query: { ...route.query, language: lang },
        hash: route.hash,
      })

      if (!isPhone() && inIframe()) {
        ;(window.top as any).scrollToMenu(redirect.slice(1))
      }
    }

    const back = () => {
      const section = activeSection.value
      if (section?.docs && route.path.split('/').at(-1) !== section.entry)
        router.push(sectionRoute(section, language.value))
      else router.push({ path: '/home', query: { section: section?.id ?? 'components', language: language.value } })
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
      () => [route.path, language.value] as const,
      ([to, lang]) => {
        const docName = to.split('/').at(-1) ?? ''
        const page = isDocumentation.value ? config?.pc?.menu?.find((item: any) => item.doc === docName) : undefined
        bigCamelizeComponentName.value = to === redirect ? '' : (page?.text?.[lang] ?? pascalCase(docName))
        showBackIcon.value = to !== redirect
      },
      { immediate: true },
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
    watchTheme((theme, from) => {
      if (from === 'pc' || from === 'playground') {
        setCurrentTheme(theme)
      }
    })

    document.body.addEventListener('click', () => {
      showThemeMenu.value = false
    })

    return {
      sections,
      activeSection,
      switchSection,
      isDocumentation,
      isHome,
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
.mobile-documentation {
  padding: 16px;
  min-width: 0;
  overflow-wrap: anywhere;
}
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

  > section[data-demo] {
    padding-bottom: 28px;
  }

  > section[data-demo] + section[data-demo] {
    padding-top: 20px;
    border-top: 1px solid var(--mp-color-border-1);
  }
}

.mobile-demo-group-heading {
  margin: 28px 0 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--mp-color-border-1);
  color: var(--mp-color-text-1);
  font-size: var(--mp-font-size-lg);
  font-weight: 600;

  &:first-child {
    margin-top: 0;
  }
}

html[lang='en-US'] .mobile-demo-group-heading > [lang='zh-CN'],
html:not([lang='en-US']) .mobile-demo-group-heading > [lang='en-US'],
html[lang='en-US'] .mobile-demo-case-heading > [lang='zh-CN'],
html:not([lang='en-US']) .mobile-demo-case-heading > [lang='en-US'] {
  display: none;
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

<style scoped>
.mobile-documentation-sections {
  margin-top: calc(48px + var(--site-mobile-page-header-safe-area-top));
  display: flex;
  gap: 4px;
  overflow-x: auto;
  padding: 6px 12px;
}

.mobile-documentation-section {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--site-config-color-text);
  font: inherit;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  padding: 8px 10px;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 4px;
}
.mobile-documentation-section:hover {
  background: var(--site-config-color-nav-button-hover-background);
}
.mobile-documentation-section[aria-pressed='true'] {
  color: var(--mp-sys-color-content-brand);
  font-weight: 500;
}
.mobile-documentation-section:focus-visible {
  outline: 2px solid var(--mp-sys-color-content-brand);
  outline-offset: -2px;
}

.mobile-documentation-sections + .router-view__block {
  padding-top: 8px;
}
</style>

<style>
.mobile-page-header__content {
  --docs-tools-trigger-color: var(--mp-page-header-title-color);
  --docs-tools-text: var(--site-config-color-text);
  --docs-tools-bg: var(--site-config-color-bar);
  --docs-tools-border: var(--site-config-color-border);
  --docs-tools-hover: var(--site-config-color-nav-button-hover-background);
  --docs-tools-brand: var(--mp-sys-color-content-brand);
}
</style>
