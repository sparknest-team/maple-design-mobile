<!-- Source: src/themes/docs/en-US.md; locale: en-US; page: /en-US/themes -->

# Theme Customization

Start with a built-in theme, then override the CSS variables you need. Themes control colors, corners and fonts. Use [SafeArea](#/en-US/safe-area) for device-edge spacing.

## Choose an approach

| Goal                            | Recommended approach                                               |
| ------------------------------- | ------------------------------------------------------------------ |
| One brand across the app        | `StyleProvider.setStyleVars()` with a built-in light or dark theme |
| Customize a region or component | `<mp-style-provider :style-vars="…">`                              |
| Find supported overrides        | The variable guide below and each component's CSS variable table   |

## Examples

### Built-in theme preview

Switch the brand and light/dark mode in the theme menu. Compare the same booking form, including editable fields, selection, switches and validation. Submission stays local. The booking fixture currently uses Chinese labels.

Example source: src/themes/example/BrandForm.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const model = reactive({ name: '', city: 'shanghai', notice: true, service: 'test-drive', note: '' })
const result = ref('')
const cities = [
  { label: '上海', value: 'shanghai' },
  { label: '北京', value: 'beijing' },
]
</script>

<template>
  <section class="theme-form-preview" aria-label="主题表单预览">
    <h2>预约试驾</h2>
    <p>切换主题，比较按钮、输入框、选择控件和文字的外观。</p>
    <mp-form :model="model" layout="vertical" @submit-success="result = '预约信息校验通过（本地演示）'">
      <mp-form-item field="name" label="联系人" required>
        <mp-input v-model="model.name" aria-label="联系人" placeholder="请输入姓名" clearable />
      </mp-form-item>
      <mp-form-item field="city" label="体验城市">
        <mp-select v-model="model.city" :options="cities" aria-label="体验城市" />
      </mp-form-item>
      <mp-form-item field="service" label="体验项目">
        <mp-radio-group v-model="model.service">
          <mp-radio value="test-drive">试驾</mp-radio>
          <mp-radio value="visit">到店体验</mp-radio>
        </mp-radio-group>
      </mp-form-item>
      <mp-form-item field="note" label="备注">
        <mp-textarea v-model="model.note" aria-label="备注" placeholder="其他体验需求" />
      </mp-form-item>
      <mp-form-item field="notice" label="预约提醒">
        <mp-switch v-model="model.notice" aria-label="预约提醒" />
      </mp-form-item>
      <mp-button status="primary" block html-type="submit">提交预约</mp-button>
      <p v-if="result" role="status">{{ result }}</p>
    </mp-form>
  </section>
</template>

<style scoped>
.theme-form-preview {
  min-width: 0;
  color: var(--mp-sys-color-content-primary);
  background: var(--mp-sys-color-surface-page);
}
</style>
```

### Local customization

Choose a color. Only the customized button changes; the other button follows the page theme. This example overrides button colors and corners without changing the global theme.

Example source: src/themes/example/LocalTheme.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const color = ref('#6750a4')
const styleVars = computed(() => ({
  '--mp-button-primary-color': color.value,
  '--mp-button-primary-foreground-color': '#ffffff',
  '--mp-button-border-radius': '16px',
}))
</script>

<template>
  <section class="local-theme-demo" aria-label="局部主题覆盖">
    <mp-radio-group v-model="color" direction="row">
      <mp-radio value="#6750a4">紫色 / Purple</mp-radio>
      <mp-radio value="#006b5f">青色 / Teal</mp-radio>
      <mp-radio value="#2456a6">蓝色 / Blue</mp-radio>
    </mp-radio-group>
    <div class="local-theme-demo__compare">
      <div>
        <p>跟随页面 / Page theme</p>
        <mp-button status="primary">默认按钮 / Default</mp-button>
      </div>
      <mp-style-provider :style-vars="styleVars">
        <p>局部覆盖 / Local override</p>
        <mp-button status="primary">定制按钮 / Custom</mp-button>
      </mp-style-provider>
    </div>
  </section>
</template>

<style scoped>
.local-theme-demo__compare {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
</style>
```

### Firefly button surfaces

Compare light pages and dark brand panels. Both preserve original yellow and lavender text; light pages use dark button backings, while dark panels can use transparent backgrounds.

Example source: src/themes/example/FireflyScenes.vue

```vue
<script setup>
import { ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const english = ref(false)
watchLang((value) => {
  english.value = value === 'en-US'
})

const variants = ['default', 'text', 'outline', 'tonal']
const statuses = ['primary', 'secondary']
const shared = {
  '--mp-button-primary-color': '#EAFF68',
  '--mp-button-secondary-color': '#CFC7FF',
  '--mp-button-solid-text-color': '#17224B',
  '--mp-button-primary-state-layer-color': '#CFDF26',
  '--mp-button-border-radius': '99999px',
  '--mp-button-primary-foreground-color': '#EAFF68',
  '--mp-button-primary-tonal-color': '#30391F',
  '--mp-button-primary-plain-background-color': '#17224B',
  '--mp-button-secondary-foreground-color': '#CFC7FF',
  '--mp-button-secondary-tonal-color': '#322D49',
  '--mp-button-secondary-plain-background-color': '#17224B',
}
const scenes = [
  {
    name: 'light',
    styleVars: {
      ...shared,
      '--mp-sys-color-surface-page': '#FFFFFF',
      '--mp-sys-color-content-primary': '#17224B',
      '--mp-button-focus-color': '#6754B5',
      '--mp-button-state-layer-color': '#FFFFFF',
    },
  },
  {
    name: 'dark',
    styleVars: {
      ...shared,
      '--mp-sys-color-surface-page': '#17224B',
      '--mp-sys-color-content-primary': '#FFFFFF',
      '--mp-button-focus-color': '#CFC7FF',
      '--mp-button-state-layer-color': '#17224B',
      '--mp-button-primary-plain-background-color': 'transparent',
      '--mp-button-secondary-plain-background-color': 'transparent',
    },
  },
]
</script>

<template>
  <section class="firefly-button-scenes" :aria-label="english ? 'Firefly button surfaces' : '萤火虫按钮使用场景'">
    <p>
      {{
        english
          ? 'Original yellow and lavender text stays unchanged on both page surfaces. Dark button backings provide readable contrast.'
          : '浅黄、浅紫文字在两种页面背景下都保持原始颜色；通过按钮后方的深色承托底保证可读性。'
      }}
    </p>
    <div class="firefly-button-scenes__grid">
      <mp-style-provider
        v-for="scene in scenes"
        :key="scene.name"
        :style-vars="scene.styleVars"
        class="firefly-button-scenes__panel"
        :data-surface="scene.name"
      >
        <h3>
          {{
            scene.name === 'dark'
              ? english
                ? 'Dark brand surface · original colors'
                : '深色品牌区 · 原始浅色文字'
              : english
                ? 'Light content surface · dark button backings'
                : '浅色内容区 · 按钮深色承托底'
          }}
        </h3>
        <div v-for="status in statuses" :key="status" class="firefly-button-scenes__family">
          <p>{{ status === 'primary' ? (english ? 'Yellow' : '黄色') : english ? 'Violet' : '紫色' }}</p>
          <mp-space wrap>
            <mp-button
              v-for="variant in variants"
              :key="variant"
              :status="status"
              :variant="variant"
              :data-brand-status="status"
              :data-brand-variant="variant"
              :elevation="false"
              >{{ variant }}</mp-button
            >
          </mp-space>
        </div>
      </mp-style-provider>
    </div>
  </section>
</template>

<style scoped>
.firefly-button-scenes__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 16px;
}
.firefly-button-scenes__panel {
  padding: 20px;
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: 16px;
  background: var(--mp-sys-color-surface-page);
  color: var(--mp-sys-color-content-primary);
}
.firefly-button-scenes__panel h3 {
  margin: 0 0 20px;
  color: inherit;
  font-size: 16px;
}
.firefly-button-scenes__family + .firefly-button-scenes__family {
  margin-top: 20px;
}
.firefly-button-scenes__family p {
  margin: 0 0 12px;
  color: inherit;
  background: transparent;
}
</style>
```

### More component states

Expand a group when you need to compare field variants, sizes, disabled, readonly, error or upload states. Controls remain available so you can restore the example.

Example source: src/themes/example/ThemeDetails.vue

```vue
<script setup>
import ControlSizes from '../../field-decorator/example/demos/control-sizes.vue'
import FormStates from './FormStates.vue'
</script>

<template>
  <section class="theme-details" aria-label="更多主题对照">
    <details>
      <summary>字段变体、尺寸与状态 / Field variants, sizes and states</summary>
      <p>比较描边、填充、下划线与不同尺寸；切换禁用、只读和错误状态。</p>
      <ControlSizes />
    </details>
    <details>
      <summary>选择、开关与上传 / Selection, switches and uploads</summary>
      <p>按需检查选择高亮、加载态和附件列表；上传仅在本地模拟。</p>
      <FormStates />
    </details>
  </section>
</template>

<style scoped>
.theme-details details {
  margin-top: 16px;
  padding: 16px;
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: var(--mp-sys-radius-md);
}
.theme-details summary {
  cursor: pointer;
  font-weight: 600;
  line-height: 1.6;
}
</style>
```

## Use in your app

### 1. Choose a built-in theme

| Theme   | Light                  | Dark                  | Style                                   |
| ------- | ---------------------- | --------------------- | --------------------------------------- |
| Default | `Themes.default.light` | `Themes.default.dark` | Teal                                    |
| Maple   | `Themes.maple.light`   | `Themes.maple.dark`   | Red-orange                              |
| Alps    | `Themes.alps.light`    | `Themes.alps.dark`    | Dark actions, orange selection controls |
| Firefly | `Themes.firefly.light` | `Themes.firefly.dark` | Lime actions, navy text, rounded fields |

Alps / Firefly light themes are based on brand styles; dark themes are Maple adaptations. Load licensed brand fonts in your app or use the system fallback.

Firefly preserves both original brand colors: pale yellow `#EAFF68` for primary and lavender `#CFC7FF` for secondary. Solid buttons pair original fills with navy text; text and outline buttons pair original text with navy backings, while tonal buttons use dark tinted surfaces. Readability comes from the background instead of turning yellow text brown. On an existing dark brand panel, locally set plain-background-color to transparent to blend text and outline buttons into the panel. Selection and focus retain violet; semantic statuses retain their own colors.

```ts
import { StyleProvider, Themes } from '@maple-design/ui'

// Apply before mounting, or again when the user switches themes.
StyleProvider.setStyleVars(Themes.maple.light)
StyleProvider.setStyleVars(Themes.maple.dark)
```

Light objects remove `html[maple-theme="dark"]`; dark objects set it. **Each call replaces the previously injected variables instead of merging incrementally.**

#### Preserve original light text by surface

Both original text colors remain available on either page surface. On light pages, dark button backings provide contrast. On a dark banner or brand region, a local `StyleProvider` can make those backings transparent. Hover and pressed layers retain dark tinted surfaces to preserve readability. The theme demo compares both scenes.

```vue
<script setup>
const onBrandSurface = {
  '--mp-button-primary-foreground-color': '#EAFF68',
  '--mp-button-secondary-foreground-color': '#CFC7FF',
  '--mp-button-primary-plain-background-color': 'transparent',
  '--mp-button-secondary-plain-background-color': 'transparent',
  '--mp-button-primary-tonal-color': '#30391F',
  '--mp-button-secondary-tonal-color': '#322D49',
  '--mp-button-state-layer-color': '#17224B',
  '--mp-button-focus-color': '#CFC7FF',
}
</script>

<template>
  <mp-style-provider :style-vars="onBrandSurface" style="background: #17224b; padding: 20px">
    <mp-button status="primary" variant="text">Yellow</mp-button>
    <mp-button status="secondary" variant="outline">Violet</mp-button>
  </mp-style-provider>
</template>
```

### 2. Set page colors

Add page text, background and color-scheme to your global stylesheet:

```css
body {
  color: var(--mp-color-text);
  background-color: var(--mp-color-body);
  color-scheme: var(--mp-color-scheme);
}
```

### 3. Extend the theme

Extend a built-in object and use the matching base when switching light/dark mode. This example changes button corners:

```ts
StyleProvider.setStyleVars({
  ...Themes.maple.light,
  '--mp-button-border-radius': '16px',
})
```

For scoped overrides, prefer actual component variables. A local palette override does not recalculate component aliases inherited from the root. See [StyleProvider](#/en-US/style-provider). Body Teleports need variables on their actual host.

## Find a variable

| Layer               | Examples                                                        | Use                                          |
| ------------------- | --------------------------------------------------------------- | -------------------------------------------- |
| Palette             | `--mp-primary-1` … `--mp-primary-10`                            | Full brand scales, expressed as RGB channels |
| Semantic roles      | `--mp-sys-color-content-primary`, `--mp-sys-color-surface-page` | App text and surfaces                        |
| Component variables | `--mp-button-primary-color`, `--mp-button-border-radius`        | Targeted component customization             |

Use RGB channels as `rgb(var(--mp-primary-6))`. Follow component tables for complete colors and dimensional values. `--mp-sys-font-family` selects the font family; applications supply font files.

See [Design Tokens](#/en-US/design-tokens) for the full hierarchy and [Form](#/en-US/form) for form behavior.
