<template>
  <div class="maple-site-header">
    <div class="maple-site-header__lead">
      <img class="maple-site-header__logo" :src="siteLogo" @click="backRoot" />
      <div v-if="title" class="maple-site-header__title" @click="backRoot">{{ title }}</div>
    </div>

    <nav
      v-if="sections.length > 1"
      class="maple-site-header__sections"
      :aria-label="language === 'en-US' ? 'Documentation areas' : '文档分区'"
    >
      <button
        v-for="section in sections"
        :key="section.id"
        type="button"
        class="maple-site-header__section"
        :aria-pressed="activeSection === section.id"
        @click="$emit('section-change', section)"
      >
        {{ section.text[language] }}
      </button>
    </nav>
    <div class="maple-site-header__tail">
      <DirectionToggle />
      <div
        v-if="isShowVersion"
        class="maple-site-header__versions"
        @mouseenter="isOpenVersionsMenu = true"
        @mouseleave="isOpenVersionsMenu = false"
      >
        <span style="font-size: 16px">{{ currentVersion }}</span>
        <mp-icon><MIconChevronDown /></mp-icon>
        <transition name="fade">
          <div
            v-show="isOpenVersionsMenu"
            class="maple-site-header__animation-list maple-site-header__animation-versions mp-elevation--5"
            :style="{ pointerEvents: isOpenVersionsMenu ? 'auto' : 'none' }"
          >
            <mp-cell
              v-for="(i, key) in versionItems"
              :key="key"
              v-ripple
              :class="{ 'maple-site-header__animation-list--active': currentVersion === i.label }"
              @click="open(i.link)"
            >
              {{ i.label }}
            </mp-cell>
          </div>
        </transition>
      </div>

      <a
        v-if="ai"
        v-ripple
        class="maple-site-header__link"
        style="width: auto; border-radius: 3px; padding: 0 12px; height: 40px"
        target="_blank"
        :href="ai"
      >
        <span>AI Agent</span>
      </a>
      <a
        v-if="changelog"
        v-ripple
        class="maple-site-header__link"
        style="margin-right: 8px"
        target="_blank"
        :href="changelog"
      >
        <mp-icon :size="28"><MIconHistory /></mp-icon>
      </a>
      <a v-if="playground" v-ripple class="maple-site-header__link" target="_blank" :href="playground">
        <mp-icon :size="24"><MIconCodeJson /></mp-icon>
      </a>
      <a v-if="github" v-ripple class="maple-site-header__link" target="_blank" :href="github">
        <mp-icon :size="28"><MIconGithub /></mp-icon>
      </a>
      <div
        v-if="themes.length > 1"
        class="maple-site-header__theme"
        @mouseenter="isOpenThemeMenu = true"
        @mouseleave="isOpenThemeMenu = false"
      >
        <mp-icon :size="28"><MIconPaletteFill /></mp-icon>
        <mp-icon><MIconChevronDown /></mp-icon>
        <transition name="fade">
          <div
            v-show="isOpenThemeMenu"
            class="maple-site-header__animation-list mp-elevation--5"
            :style="{ pointerEvents: isOpenThemeMenu ? 'auto' : 'none' }"
          >
            <mp-cell
              v-for="t in themes"
              :key="t.value"
              v-ripple
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
        style="color: inherit; background: transparent; border: 0; font: inherit; cursor: pointer"
        @change="handleLanguageChange(($event.target as HTMLSelectElement).value)"
      >
        <option v-for="(value, key) in nonEmptyLanguages" :key="key" :value="key">{{ value }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import type { ComputedRef, PropType, Ref } from 'vue'
import config from '@config'
import { getBrowserTheme, getPCLocationInfo, persistTheme, setTheme, Theme } from '@maple-design/cli-vue/client'
import {
  IconChevronDown as MIconChevronDown,
  IconCodeJson as MIconCodeJson,
  IconGithub as MIconGithub,
  IconHistory as MIconHistory,
  IconPaletteFill as MIconPaletteFill,
} from '@maple-design/icons-vue'
import { DirectionToggle } from '@sparknest/ui-doc-preview-vue'
import { useRouter } from 'vue-router'
import type { DocumentationSection } from '../../documentation-sections'
import { removeEmpty, resolveSiteAsset } from '../../utils'

export default defineComponent({
  components: { DirectionToggle, MIconChevronDown, MIconHistory, MIconCodeJson, MIconGithub, MIconPaletteFill },
  name: 'AppHeader',
  emits: ['section-change'],
  props: {
    sections: { type: Array as PropType<DocumentationSection[]>, default: () => [] },
    activeSection: String,
    language: {
      type: String,
    },
  },
  setup() {
    const title: Ref<string> = ref(config?.title)
    const siteLogo = resolveSiteAsset(config?.logo)
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
      persistTheme(theme, 'demo')

      for (const id of ['mobile', 'playground']) {
        const frame = document.getElementById(id) as HTMLIFrameElement | null
        frame?.contentWindow?.postMessage({ action: 'theme-change', data: theme, from: 'pc' }, '*')
      }
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
      siteLogo,
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

  @media screen and (max-width: 562px) {
    padding: 0 16px;

    &__versions,
    &__link,
    &__theme {
      display: none;
    }
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

<style scoped>
.maple-site-header__sections {
  margin: 0 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  overflow-x: auto;
}

.maple-site-header__section {
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
.maple-site-header__section:hover {
  background: var(--site-config-color-nav-button-hover-background);
}
.maple-site-header__section[aria-pressed='true'] {
  color: var(--mp-sys-color-content-brand);
  font-weight: 500;
}
.maple-site-header__section:focus-visible {
  outline: 2px solid var(--mp-sys-color-content-brand);
  outline-offset: -2px;
}

@media (max-width: 900px) {
  .maple-site-header {
    height: auto;
    min-height: 60px;
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px 16px;
  }
  .maple-site-header__sections {
    order: 3;
    width: 100%;
    margin: 0;
  }
}
</style>
