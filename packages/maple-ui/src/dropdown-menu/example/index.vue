<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { IconMore } from '@maplejs/icons-vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const selected = ref('edit')
const selectedLabel = ref('')
const controlledOpen = ref(false)
const placements = ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end'] as const
const longOptions = Array.from({ length: 8 }, (_, index) => `Option ${index + 1}`)
const inlineIcon = (text: string) => h('span', { 'aria-hidden': 'true' }, text)

const actionOptions = computed(() => [
  { label: t('edit'), value: 'edit' },
  { label: t('copy'), value: 'copy' },
  { type: 'divider' },
  { label: t('delete'), value: 'delete' },
])
const selectionOptions = computed(() => [
  { label: t('edit'), value: 'edit' },
  { label: t('copy'), value: 'copy' },
  { label: t('delete'), value: 'delete' },
])
const groupOptions = computed(() => [
  {
    type: 'group',
    label: t('fileActions'),
    children: [
      { label: t('create'), value: 'new' },
      { label: t('open'), value: 'open' },
    ],
  },
  {
    type: 'group',
    label: t('editActions'),
    children: [
      { label: t('copy'), value: 'copy' },
      { label: t('paste'), value: 'paste' },
    ],
  },
])
const submenuOptions = computed(() => [
  { label: t('home'), value: 'home' },
  {
    label: t('product'),
    children: [
      { label: t('overview'), value: 'overview' },
      {
        label: t('solution'),
        children: [
          { label: t('enterprise'), value: 'enterprise' },
          { label: t('team'), value: 'team' },
        ],
      },
    ],
  },
  { label: t('about'), value: 'about' },
])
const contentOptions = computed(() => [
  { label: t('edit'), value: 'edit', icon: inlineIcon('✎'), extra: '⌘ E' },
  {
    label: ({ active }: { active: boolean }) => h('strong', active ? t('copied') : t('copy')),
    value: 'copy',
    icon: inlineIcon('⧉'),
    extra: '⌘ C',
  },
  { label: t('delete'), value: 'delete', icon: inlineIcon('⌫'), extra: '⌫', disabled: true },
])

const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  selectedLabel.value = String(option.label ?? '')
}

watchLang((lang: string) => {
  use(lang)
  selected.value = 'edit'
  selectedLabel.value = t('edit')
})
onThemeChange()
</script>

<template>
  <app-type>{{ t('overflowActions') }}</app-type>
  <mp-dropdown-menu :options="actionOptions">
    <mp-button icon-container :aria-label="t('overflowActions')">
      <mp-icon><IconMore /></mp-icon>
    </mp-button>
  </mp-dropdown-menu>

  <app-type>{{ t('contextMenu') }}</app-type>
  <mp-dropdown-menu trigger="contextMenu" align-point style="display: block">
    <div class="dropdown-menu-example-area">{{ t('contextMenuTip') }}</div>

    <template #content>
      <mp-menu-option label="Option 1" />
      <mp-menu-option label="Option 2" />
      <mp-menu-option label="Option 3" />
    </template>
  </mp-dropdown-menu>

  <app-type>{{ t('selection') }}</app-type>
  <mp-space direction="column">
    <mp-dropdown-menu v-model="selected" :options="selectionOptions" @select="handleSelect">
      <mp-button>{{ selectedLabel || t('pleaseSelect') }}</mp-button>
    </mp-dropdown-menu>
    <span>{{ t('currentValue') }}：{{ selected || '-' }}，{{ t('lastSelected') }}：{{ selectedLabel || '-' }}</span>
  </mp-space>

  <app-type>{{ t('group') }}</app-type>
  <mp-dropdown-menu :options="groupOptions">
    <mp-button>{{ t('group') }}</mp-button>
  </mp-dropdown-menu>

  <app-type>{{ t('submenu') }}</app-type>
  <mp-dropdown-menu :options="submenuOptions">
    <mp-button>{{ t('submenu') }}</mp-button>
  </mp-dropdown-menu>

  <app-type>{{ t('optionContent') }}</app-type>
  <mp-dropdown-menu :options="contentOptions">
    <mp-button>{{ t('optionContent') }}</mp-button>
  </mp-dropdown-menu>

  <app-type>{{ t('trigger') }}</app-type>
  <mp-space>
    <mp-dropdown-menu trigger="click">
      <mp-button>{{ t('click') }}</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
      </template>
    </mp-dropdown-menu>

    <mp-dropdown-menu trigger="hover">
      <mp-button>{{ t('hover') }}</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
      </template>
    </mp-dropdown-menu>
  </mp-space>

  <app-type>{{ t('disabledState') }}</app-type>
  <mp-space>
    <mp-dropdown-menu disabled>
      <mp-button disabled>{{ t('menuDisabled') }}</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
      </template>
    </mp-dropdown-menu>

    <mp-dropdown-menu>
      <mp-button>{{ t('optionDisabled') }}</mp-button>

      <template #content>
        <mp-menu-option :label="t('available')" />
        <mp-menu-option :label="t('disabledOption')" disabled />
        <mp-menu-option :label="t('anotherAvailable')" />
      </template>
    </mp-dropdown-menu>
  </mp-space>

  <app-type>{{ t('popupMaxHeight') }}</app-type>
  <mp-space>
    <mp-dropdown-menu :popup-max-height="120">
      <mp-button>{{ t('limited') }}</mp-button>

      <template #content>
        <mp-menu-option v-for="item in longOptions" :key="item" :label="item" />
      </template>
    </mp-dropdown-menu>

    <mp-dropdown-menu :popup-max-height="false">
      <mp-button>{{ t('unlimited') }}</mp-button>

      <template #content>
        <mp-menu-option v-for="item in longOptions" :key="item" :label="item" />
      </template>
    </mp-dropdown-menu>
  </mp-space>

  <app-type>{{ t('controlled') }}</app-type>
  <mp-space direction="column">
    <mp-button @mousedown.stop @click.stop="controlledOpen = !controlledOpen">
      {{ controlledOpen ? t('closeMenu') : t('openMenu') }}
    </mp-button>

    <mp-dropdown-menu v-model:open="controlledOpen">
      <mp-button>{{ t('menuTrigger') }}</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
      </template>
    </mp-dropdown-menu>
  </mp-space>

  <app-type>{{ t('footer') }}</app-type>
  <mp-dropdown-menu>
    <mp-button>{{ t('footer') }}</mp-button>

    <template #content>
      <mp-menu-option label="Option 1" />
      <mp-menu-option label="Option 2" />
    </template>

    <template #footer>
      <div class="dropdown-menu-example-footer">{{ t('customFooter') }}</div>
    </template>
  </mp-dropdown-menu>

  <app-type>{{ t('placement') }}</app-type>
  <mp-space>
    <mp-dropdown-menu v-for="placement in placements" :key="placement" :placement="placement">
      <mp-button>{{ placement }}</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
        <mp-menu-option label="Option 3" />
      </template>
    </mp-dropdown-menu>
  </mp-space>
</template>

<style>
.dropdown-menu-example-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-color-fill-2);
}

.dropdown-menu-example-footer {
  padding: 8px 12px;
}
</style>
