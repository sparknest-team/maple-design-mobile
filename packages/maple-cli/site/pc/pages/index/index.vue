<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import config from '@config'
import { getPCLocationInfo, onThemeChange } from '@maple-design/cli/client'
import { IconGithub as MIconGithub, IconTwitter as MIconTwitter } from '@maple-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { resolveSiteAsset } from '../../../utils'
import AppAd from '../../components/AppAd.vue'
import AppHeader from '../../components/AppHeader.vue'

const route = useRoute()
const router = useRouter()
const github = config?.pc?.header?.github
const siteLogo = resolveSiteAsset(config?.logo)
const title: Ref<string> = ref(config?.title)
const language: Ref<string> = ref(config?.defaultLanguage)
const indexPage: Ref<Record<string, any>> = ref(config?.pc?.indexPage)

const getStar = () => {
  router.push(`/${language.value}/quickstart`)
}

const toGithub = () => {
  window.open(github)
}

const setLocale = () => {
  const { language: lang } = getPCLocationInfo()
  if (!lang) return

  language.value = lang
  document.title = config?.pc.title[lang] as string
}

const to = (url: string) => {
  window.open(url)
}

onThemeChange(undefined, 'site')

watch(
  () => route.path,
  () => {
    language.value = getPCLocationInfo().language
    setLocale()
  },
  { immediate: true },
)
</script>

<template>
  <div class="maple-doc-index">
    <app-ad :language="language" />
    <app-header :language="language" />
    <div class="maple-doc-index__layout">
      <div class="maple-doc-index__main-container">
        <div class="maple-doc-index__logo-container">
          <div class="maple-doc-index__logo-background-mask"></div>
          <img class="maple-doc-index__logo" :src="siteLogo" alt="" />
        </div>
        <div class="maple-doc-index__info-container">
          <p class="maple-doc-index__eyebrow" v-if="indexPage.eyebrow">{{ indexPage.eyebrow[language] }}</p>
          <p class="maple-doc-index__product">{{ title }}</p>
          <h1 class="maple-doc-index__title">{{ indexPage.headline?.[language] || title }}</h1>
          <div class="maple-doc-index__description">{{ indexPage.description[language] }}</div>

          <mp-space size="lg">
            <mp-button class="maple-doc-index__link-button" type="primary" style="line-height: 1.2" @click="getStar">
              {{ indexPage.started[language] }}
            </mp-button>
            <a v-if="indexPage.companion" class="maple-doc-index__companion-link" :href="indexPage.companion.href">
              {{ indexPage.companion.label[language] }}
            </a>
            <mp-button v-else class="maple-doc-index__github-button" style="line-height: 1.2" @click="toGithub">
              {{ indexPage.viewOnGithub[language] }}
            </mp-button>
          </mp-space>
        </div>
      </div>

      <section class="maple-doc-index__pair" v-if="indexPage.companion">
        <div>
          <h2>{{ indexPage.companion.title[language] }}</h2>
          <p>{{ indexPage.companion.description[language] }}</p>
        </div>
        <div class="maple-doc-index__platforms">
          <a :href="indexPage.companion.href"><span>01 / DESKTOP</span><strong>Cedar ↗</strong></a>
          <div aria-current="page"><span>02 / MOBILE</span><strong>Maple</strong></div>
        </div>
      </section>

      <div class="maple-doc-index__features" v-if="indexPage.features">
        <div class="maple-doc-index__feature" v-for="feature in indexPage.features" :key="feature.name[language]">
          <div class="maple-doc-index__feature-name">{{ feature.name[language] }}</div>
          <div class="maple-doc-index__feature-description">{{ feature.description[language] }}</div>
        </div>
      </div>

      <div class="maple-doc-index__team-members" v-if="indexPage.teamMembers">
        <div class="maple-doc-index__team-members-title">{{ indexPage.teamMembers.label[language] }}</div>

        <div class="maple-doc-index__team-members-container">
          <div
            class="maple-doc-index__team-member"
            v-for="member in indexPage.teamMembers.members"
            :key="member.name[language]"
          >
            <img
              v-if="member.avatar"
              class="maple-doc-index__team-member-avatar"
              :src="member.avatar"
              :alt="member.name[language]"
            />
            <div
              v-else
              class="maple-doc-index__team-member-avatar maple-doc-index__team-member-avatar--placeholder"
              aria-hidden="true"
            >
              {{ member.name[language].slice(0, 1) }}
            </div>
            <div class="maple-doc-index__team-member-name">{{ member.name[language] }}</div>
            <div class="maple-doc-index__team-member-title">{{ member.title[language] }}</div>
            <div class="maple-doc-index__team-member-description">{{ member.description[language] }}</div>
            <div class="maple-doc-index__team-member-social" v-if="member.github || member.twitter">
              <mp-icon
                class="maple-doc-index__team-member-social-icon"
                :size="24"
                @click="to(member.github)"
                v-if="member.github"
                ><MIconGithub
              /></mp-icon>
              <mp-icon
                class="maple-doc-index__team-member-social-icon"
                :size="24"
                @click="to(member.twitter)"
                v-if="member.twitter"
                ><MIconTwitter
              /></mp-icon>
            </div>
          </div>
        </div>
      </div>

      <div class="maple-doc-index__contributors" v-if="indexPage.contributors">
        <div class="maple-doc-index__contributors-title">{{ indexPage.contributors.label[language] }}</div>

        <a class="maple-doc-index__contributors-link" :href="indexPage.contributors.link">
          <img class="maple-doc-index__contributors-image" :src="indexPage.contributors.image" />
        </a>
      </div>

      <div class="maple-doc-index__sponsors" v-if="indexPage.sponsors">
        <div class="maple-doc-index__sponsors-title">{{ indexPage.sponsors.label[language] }}</div>

        <a class="maple-doc-index__sponsors-link" :href="indexPage.sponsors.link">
          <img class="maple-doc-index__sponsors-image" :src="indexPage.sponsors.image" />
        </a>
      </div>

      <div class="maple-doc-index__footer">
        <div class="maple-doc-index__license">{{ indexPage.license[language] }}</div>
        <div class="maple-doc-index__copyright">{{ indexPage.copyright[language] }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.maple-doc-index {
  min-height: 100vh;
  background: var(--site-config-color-index-page-background);
  color: var(--site-config-color-text);

  &__layout {
    width: 100%;
    max-width: 1120px;
    margin: auto;
    padding: 80px 32px 0;
    box-sizing: border-box;
  }
  &__main-container {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 64px;
    padding: 36px 0 80px;
  }
  &__info-container {
    flex: 1;
    min-width: 0;
  }
  &__eyebrow {
    color: var(--site-config-color-primary);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    margin: 0 0 24px;
  }
  &__product {
    font-size: 18px;
    margin: 0 0 12px;
    color: var(--site-config-color-index-page-second-text-color);
  }
  &__title {
    font-size: clamp(34px, 4.4vw, 56px);
    font-weight: 750;
    line-height: 1.2;
    letter-spacing: -1.5px;
    white-space: pre-line;
    margin: 0;
  }
  &__description {
    max-width: 660px;
    font-size: 17px;
    line-height: 1.9;
    margin: 24px 0 30px;
    color: var(--site-config-color-index-page-second-text-color);
  }
  &__logo-container {
    width: 160px;
    flex: 0 0 160px;
  }
  &__logo {
    display: block;
    width: 100%;
  }
  &__logo-background-mask {
    display: none;
  }
  &__link-button,
  &__github-button {
    min-height: 44px;
    padding: 0 24px;
  }
  &__companion-link {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: var(--site-config-color-text);
    text-decoration: none;
    font-weight: 600;
  }
  a:focus-visible {
    outline: 2px solid var(--site-config-color-primary);
    outline-offset: 5px;
    border-radius: 4px;
  }
  a:hover {
    color: var(--site-config-color-primary);
  }
  &__pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 40px;
    padding: 32px;
    border: 1px solid var(--site-config-color-border);
    border-radius: 16px;
  }
  &__pair h2 {
    font-size: 24px;
    line-height: 1.4;
    margin: 0 0 12px;
  }
  &__pair p {
    line-height: 1.8;
    margin: 0;
    color: var(--site-config-color-index-page-second-text-color);
  }
  &__platforms {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  &__platforms > * {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    border-radius: 10px;
    background: var(--site-config-color-side-bar-active-background);
    color: inherit;
    text-decoration: none;
  }
  &__platforms span {
    font-size: 11px;
    letter-spacing: 1px;
    color: var(--site-config-color-index-page-second-text-color);
  }
  &__platforms strong {
    font-size: 24px;
  }
  &__features {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    margin: 32px 0 72px;
  }
  &__feature {
    padding: 28px;
    border: 1px solid var(--site-config-color-border);
    border-radius: 12px;
    background: var(--site-config-color-index-page-feature-background);
  }
  &__feature-name {
    font-size: 18px;
    font-weight: 650;
  }
  &__feature-description {
    font-size: 14px;
    line-height: 1.9;
    margin-top: 12px;
    color: var(--site-config-color-index-page-second-text-color);
  }
  &__team-members,
  &__contributors,
  &__sponsors {
    padding-top: 32px;
    margin-bottom: 48px;
    border-top: 1px solid var(--site-config-color-border);
  }
  &__team-members-title,
  &__contributors-title,
  &__sponsors-title {
    font-size: 20px;
    font-weight: 600;
  }
  &__team-members-container {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    margin-top: 24px;
  }
  &__team-member {
    display: grid;
    grid-template-columns: 48px auto;
    column-gap: 16px;
    align-content: start;
  }
  &__team-member-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    grid-row: span 3;
  }
  &__team-member-avatar--placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--site-config-color-primary);
    background: var(--site-config-color-side-bar-active-background);
    font-size: 20px;
  }
  &__team-member-name {
    font-weight: 600;
    line-height: 24px;
  }
  &__team-member-title,
  &__team-member-description {
    font-size: 12px;
    line-height: 22px;
    color: var(--site-config-color-index-page-second-text-color);
  }
  &__team-member-social {
    grid-column: 2;
  }
  &__team-member-social-icon {
    margin-right: 12px;
    cursor: pointer;
  }
  &__contributors-image,
  &__sponsors-image {
    max-width: 100%;
  }
  &__footer {
    padding: 24px 0;
    border-top: 1px solid var(--site-config-color-border);
    font-size: 12px;
    line-height: 1.8;
    color: var(--site-config-color-index-page-second-text-color);
  }

  @media (max-width: 767px) {
    &__layout {
      padding: 48px 20px 0;
    }
    &__main-container {
      gap: 20px;
      padding: 0 0 40px;
    }
    &__logo-container {
      display: none;
    }
    &__pair {
      grid-template-columns: 1fr;
      gap: 24px;
      padding: 24px;
    }
    &__features {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }
    &__feature {
      padding: 20px;
    }
    &__team-members-container {
      gap: 24px;
    }
  }
  @media (max-width: 420px) {
    &__features {
      grid-template-columns: 1fr;
    }
    &__platforms > * {
      padding: 18px;
    }
  }
}
</style>
