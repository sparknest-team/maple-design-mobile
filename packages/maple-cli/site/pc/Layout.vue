<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import config from '@config'
import { Context } from '@maplejs/maple-ui'
import { useRoute, useRouter } from 'vue-router'
import { type SiteContext } from '../types'
import { MenuTypes, type Menu } from '../utils'
import AppAd from './components/AppAd.vue'
import AppHeader from './components/AppHeader.vue'
import AppMobile from './components/AppMobile.vue'
import AppSidebar from './components/AppSidebar.vue'
import { getPcSiteRoute } from './route-state'

const context = Context as SiteContext
const menu: Menu[] = config?.pc?.menu ?? []
const mobileRedirect = config?.mobile?.redirect
const doc = ref<HTMLElement | null>(null)
const sidebarOpen = ref(false)
const sidebarToggle = ref<HTMLButtonElement | null>(null)
const route = useRoute()
const router = useRouter()
const routeState = computed(() => getPcSiteRoute(route.path, route.hash, menu, mobileRedirect, config?.useMobile))
const language = computed(() => routeState.value.language)
const menuName = computed(() => routeState.value.menuName)
const hash = computed(() => routeState.value.hash)
const componentName = computed(() => routeState.value.componentName)
const useMobile = computed(() => routeState.value.useMobile)

const init = () => {
  nextTick(() => {
    const children = document.querySelector('.maple-site-sidebar')!.getElementsByClassName('mp-cell')
    const index = menu.findIndex((item) => item.doc === menuName.value && item.type !== MenuTypes.TITLE)

    if (index !== -1 && children[index]) {
      children[index].scrollIntoView({
        block: 'center',
        inline: 'start',
      })
    }
  })
}

const handleSidebarChange = (menu: Menu) => {
  if (doc.value) {
    doc.value.scrollTop = 0
  }
  router.push({ path: `/${language.value}/${menu.doc}` })
}

const closeSidebar = async () => {
  if (!sidebarOpen.value) {
    return
  }
  sidebarOpen.value = false
  await nextTick()
  sidebarToggle.value?.focus()
}

watch(
  () => route.fullPath,
  async () => {
    if (sidebarOpen.value) {
      sidebarOpen.value = false
      await nextTick()
      doc.value?.focus()
    }
  },
)

const confirmClose = () => {
  const key = 'MAPLE_UI_PLAYGROUND_HAS_BEEN_CLOSED'

  if (
    !localStorage.getItem(key) &&
    !window.confirm('The code will no longer be saved after closing. Are you sure you want to close?')
  ) {
    return
  }

  localStorage.setItem(key, 'true')
  context.showPlayground = false
}

onMounted(() => {
  init()

  window.addEventListener('message', (event) => {
    const { data } = event

    if (data.action === 'playground-close') {
      confirmClose()
    }
  })
})

watch(
  language,
  (lang) => {
    if (lang) {
      document.title = config?.pc?.title[lang] as string
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="maple-site">
    <app-ad :language="language" />

    <app-header :language="language" />

    <button
      ref="sidebarToggle"
      class="maple-site-sidebar-toggle"
      type="button"
      aria-controls="maple-site-navigation"
      :aria-expanded="sidebarOpen"
      @click="sidebarOpen = !sidebarOpen"
    >
      {{ language === 'en-US' ? 'Documentation menu' : '文档目录' }}
    </button>

    <div class="maple-site-content" :class="{ 'maple-site-content--navigation-open': sidebarOpen }">
      <app-sidebar
        id="maple-site-navigation"
        :language="language"
        :menu="menu"
        :menu-name="menuName"
        @change="handleSidebarChange"
        @keydown.esc="closeSidebar"
      />

      <main
        ref="doc"
        class="maple-site-doc-container"
        tabindex="-1"
        :class="[!useMobile && 'maple-site-doc-container--pc-only']"
      >
        <router-view />
      </main>

      <app-mobile
        v-if="useMobile"
        :component-name="componentName"
        :language="language"
        :replace="menuName"
        :hash="hash"
      />
    </div>
  </div>

  <mp-popup placement="right" :open="context.showPlayground" @click-overlay="confirmClose">
    <div class="maple-site-playground-container">
      <iframe
        v-if="context.showPlayground"
        id="playground"
        class="maple-site-playground-iframe"
        :src="context.playgroundURL"
        allow="clipboard-write"
      >
      </iframe>
    </div>
  </mp-popup>
</template>

<style lang="less">
.hljs {
  background: var(--site-config-color-hl-background) !important;
  padding: 0 !important;
  transition: all 0.25s;
}

.hljs code {
  line-height: 31px;
}

.hljs-comment,
.hljs-meta,
.hljs-quote {
  color: var(--site-config-color-hl-group-a);
}

.hljs-keyword,
.hljs-name,
.hljs-selector-tag,
.hljs-tag {
  color: var(--site-config-color-hl-group-b);
}

.hljs-attribute,
.hljs-selector-id {
  color: var(--site-config-color-hl-group-c);
}

.hljs-addition,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-string {
  color: var(--site-config-color-hl-group-d);
}

.hljs-subst {
  color: var(--site-config-color-hl-group-e);
}

.hljs-link,
.hljs-regexp {
  color: var(--site-config-color-hl-group-f);
}

.hljs-doctag,
.hljs-section,
.hljs-title,
.hljs-type {
  color: var(--site-config-color-hl-group-g);
}

.hljs-bullet,
.hljs-literal,
.hljs-symbol,
.hljs-template-variable,
.hljs-variable {
  color: var(--site-config-color-hl-group-h);
}

.hljs-deletion,
.hljs-number {
  color: var(--site-config-color-hl-group-i);
}

.mp-popup__content {
  background-color: transparent;
}
</style>

<style lang="less">
@doc-active: {
  display: inline;
  font-family: inherit;
  padding: 0;
  white-space: pre-wrap;
};

iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: none;
}

.maple {
  &-introduce {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    padding: 90px 40px;
    border-top: 6px solid var(--site-config-color-introduce-border);
    border-radius: 2px;
    background: var(--site-config-color-bar);
    box-shadow:
      0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12);

    &__row {
      display: flex;
      align-items: center;
    }

    &__image {
      width: 60px;
      margin-right: 20px;
    }

    &__name {
      font-size: 60px;
    }

    &__des {
      color: var(--site-config-color-sub-text);
      font-size: 16px;
      margin-top: 16px;
      -webkit-font-smoothing: antialiased;
    }
  }

  &-component-preview {
    margin-top: 20px;
  }

  &-site {
    min-width: 0;

    &-sidebar-toggle {
      display: none;
    }

    &-content {
      display: flex;
      background: var(--site-config-color-body);
      min-height: calc(100vh - 60px - var(--site-ad-height));
    }

    &-doc-container {
      flex: 1 0 0;
      min-width: 0;
      padding: 0 32px;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        display: none;
      }

      &--pc-only {
        padding: 0 90px 0 30px;
      }
    }

    &-doc {
      h3 {
        display: flex;
        align-items: center;

        .router-link-active {
          font-size: 20px;
          margin-right: 8px;
          user-select: none;
          text-decoration: none;
        }
      }

      a:not(.loca-doc-preview__example a) {
        color: var(--site-config-color-link);
        -webkit-font-smoothing: antialiased;
        word-break: keep-all;
        font-size: 15px;
        @doc-active();

        &:hover {
          opacity: 0.8;
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        position: relative;
        color: var(--site-config-color-text);
        font-weight: normal;
        line-height: 1.5;
      }

      h1 {
        line-height: 40px;
        font-size: 30px;
        cursor: default;
        margin: 30px 0;
      }

      h2 {
        margin: 20px 0;
        font-size: 25px;
      }

      h3 {
        font-size: 18px;
        margin: 0;
      }

      h4 {
        margin: 18px 0 0;
      }

      p,
      ul,
      ol {
        -webkit-font-smoothing: antialiased;
        color: var(--site-config-color-text);
        font-size: 15px;
        line-height: 26px;
        border-radius: 4px;
        background: var(--site-config-color-bar);
        margin: 14px 0 0;
        padding: 0;

        li {
          margin-bottom: 4px;
        }
      }

      ul,
      ol {
        padding: 0 0 0 18px;
      }

      pre {
        margin: 0;
      }

      code {
        position: relative;
        display: block;
        padding: 10px 16px;
        overflow-x: auto;
        font-size: 13px;
        font-family: Consolas, Monaco, monospace;
        white-space: pre-wrap;
        word-wrap: break-word;
        color: var(--site-config-color-hl-code);
      }

      p code,
      li code,
      table code {
        -webkit-font-smoothing: antialiased;
        word-break: keep-all;
        color: var(--site-config-color-primary);
        font-size: 15px;
        @doc-active();
      }

      table {
        -webkit-font-smoothing: antialiased;
        width: 100%;
        margin-top: 12px;
        color: var(--site-config-color-text);
        background: var(--site-config-color-bar);
        font-size: 14px;
        line-height: 28px;
        border-collapse: collapse;
        border-radius: 4px;

        th {
          padding: 8px 16px;
          font-weight: 500;
          text-align: left;
          color: var(--site-config-color-sub-text);
          font-size: 13px;
          -webkit-font-smoothing: antialiased;
          border-bottom: 1px solid var(--site-config-color-border);
        }

        td {
          padding: 8px 16px;
          border-bottom: 1px solid var(--site-config-color-border);
          color: var(--site-config-color-text);
          font-family: Consolas, Monaco, monospace;

          code {
            white-space: pre-wrap;
            padding: 0;
            font-size: 13px;
          }

          a {
            font-size: 13px;
          }
        }

        em {
          color: var(--site-config-color-type);
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          font-size: 13px;
          @doc-active();
        }
      }

      strong {
        font-size: 12px;
        font-weight: normal;
      }

      table strong {
        border: 1px solid currentColor;
        padding: 2px 8px;
        border-radius: 12px;
      }

      .card {
        border-radius: var(--site-config-card-border-radius);
        background: var(--site-config-color-bar);
        padding: 20px;
        margin-bottom: 30px;
        box-shadow:
          0 2px 1px -1px rgba(0, 0, 0, 0.2),
          0 1px 1px 0 rgba(0, 0, 0, 0.14),
          0 1px 3px 0 rgba(0, 0, 0, 0.12);

        &:first-child {
          margin-top: 30px;
        }

        &--demo {
          box-shadow: none;
        }
      }
    }

    &-playground-container {
      width: calc(100vw - 256px);
      max-width: 1660px;
      height: 100vh;
    }

    &-playground-iframe {
      width: 100%;
      height: 100%;
    }
  }
}

@media (max-width: 1199px) {
  .maple-site-content {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    align-items: start;
  }

  .maple-site-sidebar {
    width: 220px;
    grid-column: 1;
    grid-row: 1 / span 2;
  }

  .maple-site-doc-container {
    grid-column: 2;
    padding: 0 24px;
  }

  .maple-site-mobile {
    grid-column: 2;
    position: static;
    width: calc(100% - 48px);
    max-width: 375px;
    height: 640px;
    margin: 24px auto;
  }
}

@media (max-width: 767px) {
  .maple-site-sidebar-toggle {
    display: block;
    min-height: 44px;
    margin: 12px 16px;
    padding: 8px 16px;
    border: 1px solid var(--site-config-color-border);
    border-radius: 4px;
    background: var(--site-config-color-bar);
    color: var(--site-config-color-text);
    font: inherit;
    cursor: pointer;
  }

  .maple-site-content {
    display: block;
  }

  .maple-site-sidebar {
    display: none;
    position: static;
    width: 100%;
    height: auto;
    max-height: 50vh;
  }

  .maple-site-content--navigation-open .maple-site-sidebar {
    display: block;
  }

  .maple-site-doc-container {
    padding: 0 16px;
  }

  .maple-site-doc {
    overflow-wrap: anywhere;

    table {
      display: block;
      overflow-x: auto;
    }
  }

  .maple-site-playground-container {
    width: 100vw;
  }
}
</style>
