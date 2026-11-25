<template>
  <div class="maple-logo">
    <h1 class="maple-home__title">
      <img class="maple-home__image" :src="logo" />
      <span>{{ title }}</span>
    </h1>
    <h2 class="maple-home__desc">{{ description[lang] }}</h2>
    <p v-if="version" class="maple-home__version">{{ version }}</p>
  </div>

  <RouterLink v-for="page in documentPages" :key="page.doc" class="maple-home__cell" :to="`/${lang}/${page.doc}`">{{
    page.text[lang]
  }}</RouterLink>
  <div
    class="maple-home__cell"
    :class="{ 'maple-home__cell--child': component.parent }"
    v-for="component in components"
    :key="component.doc"
    v-ripple
    @click="toComponent(component)"
  >
    <span>{{ component.text[lang] }}</span>
    <mp-icon size="14"><MIconChevronRight /></mp-icon>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import config from '@config'
import { watchLang, watchPlatform } from '@maple-design/cli-vue/client'
import { IconChevronRight as MIconChevronRight } from '@maple-design/icons-vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { getDocumentationSection, getSectionMenu } from '../documentation-sections'
import { inIframe, isPhone, resolveSiteAsset } from '../utils'

export default {
  components: { MIconChevronRight, RouterLink },
  name: 'AppHome',
  setup() {
    const title = ref(config?.title ?? '')
    const logo = ref(resolveSiteAsset(config?.logo))
    const description = ref(config?.mobile?.title ?? {})
    const version = ref(config?.pc?.header?.currentVersion ?? '')
    const menu = ref(config?.pc?.menu ?? [])
    const route = useRoute()
    const sections = config?.pc?.sections ?? []
    const visible = computed(() =>
      getSectionMenu(menu.value, getDocumentationSection(route.path, sections, route.query.section), sections),
    )
    const components = computed(() => visible.value.filter((item: any) => item.type === 2))
    const documentPages = computed(() =>
      visible.value.filter((item: any) => item.type === 3 && (config?.mobile?.docs ?? []).includes(item.doc)),
    )
    const lang = ref('zh-CN')
    const platform = ref('mobile')
    const router = useRouter()

    watchLang((newValue) => {
      lang.value = newValue
    })

    watchPlatform((newValue) => {
      platform.value = newValue
    })

    const toComponent = (component: any) => {
      router.push({
        path: `/${component.doc}`,
        query: {
          language: lang.value,
          platform: platform.value,
          replace: component.doc,
        },
      })

      if (!isPhone() && inIframe()) {
        // @ts-ignore
        window.top.scrollToMenu(component.doc)
      }
    }

    return {
      components,
      documentPages,
      lang,
      toComponent,
      logo,
      title,
      description,
      version,
    }
  },
}
</script>

<style lang="less">
.maple-logo {
  padding-top: 30px;
}

.maple-home__title {
  margin: 0 0 16px;
  font-size: 34px;
}

.maple-home__title,
.maple-home__desc {
  padding: 0 12px;
  font-weight: normal;
  line-height: 1;
  user-select: none;
}

.maple-home__desc {
  color: var(--site-config-color-sub-text);
  font-size: 14px;
  line-height: 22px;
}

.maple-home__version {
  margin: 4px 0 0;
  padding: 0 12px;
  color: var(--site-config-color-sub-text);
  font-size: 12px;
  line-height: 18px;
  user-select: none;
}

.maple-home__image {
  width: 36px;
  height: 36px;
}

.maple-home__image,
.maple-home__title span {
  display: inline-block;
  vertical-align: middle;
}

.maple-home__title span {
  margin-left: 16px;
}

.maple-home__cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
  padding: 10px 12px;
  font-size: 15px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.3s;
  color: var(--site-config-color-text);

  &:hover {
    color: var(--site-config-color-mobile-cell-hover);
  }

  &--child {
    padding-left: 28px;
    font-size: 14px;
    color: var(--site-config-color-sub-text);
  }
}
</style>
