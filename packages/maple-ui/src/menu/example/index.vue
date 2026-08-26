<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

const selected = ref()
const open = ref(false)
const multipleValue = ref([])
const optionsValue = ref()
const cascadeValue = ref()
const longOptions = Array.from({ length: 10 }, (_, index) => ({ label: `Option ${index + 1}`, value: index + 1 }))
const options = computed(() => [
  { label: t('eat'), value: 'eat' },
  { label: t('sleep'), value: 'sleep' },
  { label: t('play'), value: 'play', disabled: true },
])
const cascadeOptions = computed(() => [
  { label: t('home'), value: 'home' },
  {
    label: t('product'),
    value: 'product',
    children: [
      { label: t('overview'), value: 'overview' },
      {
        label: t('solution'),
        value: 'solution',
        children: [
          { label: t('enterprise'), value: 'enterprise' },
          { label: t('team'), value: 'team' },
        ],
      },
    ],
  },
])

watchLang((lang) => {
  use(lang)
  selected.value = undefined
  multipleValue.value = []
  optionsValue.value = undefined
  cascadeValue.value = undefined
})
onThemeChange()

const handleSelect = (_value, option) => Message(String(option.label))
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-menu>
    <mp-button status="primary">{{ t('openMenu') }}</mp-button>
    <template #content>
      <mp-menu-option :label="t('create')" />
      <mp-menu-option :label="t('copy')" />
      <mp-menu-option :label="t('move')" />
    </template>
  </mp-menu>

  <app-type>{{ t('selection') }}</app-type>
  <mp-menu v-model="selected" @select="handleSelect">
    <mp-button status="primary">{{ selected || t('please') }}</mp-button>
    <template #content>
      <mp-menu-option :label="t('edit')" value="edit" />
      <mp-menu-option :label="t('copy')" value="copy" />
      <mp-menu-option :label="t('delete')" value="delete" />
    </template>
  </mp-menu>

  <app-type>{{ t('trigger') }}</app-type>
  <mp-space :size="[12, 12]">
    <mp-menu trigger="click"
      ><mp-button>{{ t('click') }}</mp-button
      ><template #content><mp-menu-option label="Option 1" /><mp-menu-option label="Option 2" /></template
    ></mp-menu>
    <mp-menu trigger="hover"
      ><mp-button>{{ t('hover') }}</mp-button
      ><template #content><mp-menu-option label="Option 1" /><mp-menu-option label="Option 2" /></template
    ></mp-menu>
  </mp-space>

  <app-type>{{ t('disabledState') }}</app-type>
  <mp-space :size="[12, 12]">
    <mp-menu disabled
      ><mp-button disabled>{{ t('menuDisabled') }}</mp-button
      ><template #content><mp-menu-option label="Option 1" /></template
    ></mp-menu>
    <mp-menu
      ><mp-button>{{ t('optionDisabled') }}</mp-button
      ><template #content
        ><mp-menu-option :label="t('edit')" /><mp-menu-option :label="t('delete')" disabled /></template
    ></mp-menu>
  </mp-space>

  <app-type>{{ t('group') }}</app-type>
  <mp-menu>
    <mp-button>{{ t('group') }}</mp-button>
    <template #content>
      <mp-menu-group :title="t('fileActions')"
        ><mp-menu-option :label="t('create')" /><mp-menu-option :label="t('open')"
      /></mp-menu-group>
      <mp-menu-group :title="t('editActions')"
        ><mp-menu-option :label="t('copy')" /><mp-menu-option :label="t('paste')"
      /></mp-menu-group>
    </template>
  </mp-menu>

  <app-type>{{ t('submenu') }}</app-type>
  <mp-menu v-model="cascadeValue" :options="cascadeOptions">
    <mp-button>{{ cascadeValue || t('submenu') }}</mp-button>
  </mp-menu>

  <app-type>{{ t('optionContent') }}</app-type>
  <mp-menu>
    <mp-button>{{ t('optionContent') }}</mp-button>
    <template #content>
      <mp-menu-option><template #icon>✏️</template>{{ t('edit') }}<template #suffix>⌘ E</template></mp-menu-option>
      <mp-menu-option><template #icon>📄</template>{{ t('copy') }}<template #suffix>⌘ C</template></mp-menu-option>
    </template>
  </mp-menu>

  <app-type>{{ t('popupMaxHeight') }}</app-type>
  <mp-space :size="[12, 12]">
    <mp-menu :popup-max-height="120" :options="longOptions"><mp-button>120px</mp-button></mp-menu>
    <mp-menu :popup-max-height="false" :options="longOptions"
      ><mp-button>{{ t('unlimited') }}</mp-button></mp-menu
    >
  </mp-space>

  <app-type>{{ t('controlled') }}</app-type>
  <mp-space :size="[12, 12]">
    <mp-button @mousedown.stop @click.stop="open = !open">{{ open ? t('closeMenu') : t('openMenu') }}</mp-button>
    <mp-menu v-model:open="open"
      ><mp-button>{{ t('menuTrigger') }}</mp-button
      ><template #content><mp-menu-option label="Option 1" /><mp-menu-option label="Option 2" /></template
    ></mp-menu>
  </mp-space>

  <app-type>{{ t('footer') }}</app-type>
  <mp-menu
    ><mp-button>{{ t('footer') }}</mp-button
    ><template #content><mp-menu-option label="Option 1" /><mp-menu-option label="Option 2" /></template
    ><template #footer
      ><div style="padding: 8px 12px">{{ t('customFooter') }}</div></template
    ></mp-menu
  >

  <app-type>{{ t('placement') }}</app-type>
  <mp-space :size="[12, 12]">
    <mp-menu
      v-for="item in ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end']"
      :key="item"
      :placement="item"
      ><mp-button>{{ item }}</mp-button
      ><template #content><mp-menu-option label="Option 1" /><mp-menu-option label="Option 2" /></template
    ></mp-menu>
  </mp-space>

  <app-type>{{ t('contextMenu') }}</app-type>
  <mp-menu trigger="contextMenu" align-point>
    <div
      style="
        display: flex;
        height: 160px;
        align-items: center;
        justify-content: center;
        background: var(--mp-color-fill-2);
      "
    >
      {{ t('contextMenuTip') }}
    </div>
    <template #content><mp-menu-option label="Option 1" /><mp-menu-option label="Option 2" /></template>
  </mp-menu>

  <app-type>{{ t('extended') }}</app-type>
  <mp-space direction="column" :size="[12, 12]">
    <mp-menu v-model="multipleValue" multiple :options="options"
      ><mp-button>{{ t('multiple') }}：{{ multipleValue.length }}</mp-button></mp-menu
    >
    <mp-menu v-model="optionsValue" :options="options"
      ><mp-button>{{ t('selectOptions') }}</mp-button></mp-menu
    >
  </mp-space>
</template>
