<!-- Source: src/themes/docs/en-US.md; locale: en-US; page: /en-US/themes -->

# Theme Customization

Start with a built-in theme, then override the CSS variables you need. Themes control colors, corners and fonts. Use [SafeArea](#/en-US/safe-area) for device-edge spacing.

One theme boundary for the entire application or a subtree. A provider around the application is its global theme; nesting creates local overrides with the same rules. Providers never mutate html or other application roots.

## Choose an approach

| Goal | Recommended approach |
| ------------------------------- | ------------------------------------------------------------------ |
| One brand across the app | `<mp-theme-provider :theme="Themes.maple[mode]">` |
| Customize a region or component | `<mp-theme-provider :style-vars="…">` |
| Find supported overrides | The variable guide below and each component's CSS variable table |

## Basic examples

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

## Local themes and customization

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
    <mp-radio-group v-model="color" orientation="horizontal">
      <mp-radio value="#6750a4">紫色 / Purple</mp-radio>
      <mp-radio value="#006b5f">青色 / Teal</mp-radio>
      <mp-radio value="#2456a6">蓝色 / Blue</mp-radio>
    </mp-radio-group>
    <div class="local-theme-demo__compare">
      <div>
        <p>跟随页面 / Page theme</p>
        <mp-button status="primary">默认按钮 / Default</mp-button>
      </div>
      <mp-theme-provider :style-vars="styleVars">
        <p>局部覆盖 / Local override</p>
        <mp-button status="primary">定制按钮 / Custom</mp-button>
      </mp-theme-provider>
    </div>
  </section>
</template>

<style scoped>
.local-theme-demo__compare {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
  gap: 16px;
  margin-top: 16px;
}
</style>
```

## Brands and states

### Firefly button surfaces

Keep the existing status × variant API: yellow primary, neutral secondary and violet tertiary. Switch the card surface to compare transparent buttons, then inspect violet selection and focus across the related controls.

Example source: src/themes/example/FireflyScenes.vue

```vue
<script setup>
import { computed, ref } from 'vue'
import { watchTheme } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import { Themes } from '@maple-design/ui-vue'

const mode = ref('light')
const background = ref('light')
watchTheme((theme) => {
  mode.value = theme.toLowerCase().includes('dark') ? 'dark' : 'light'
  background.value = mode.value === 'dark' ? 'navy' : 'light'
})
const variants = ['default', 'text', 'outline', 'tonal']
const roles = [
  { status: 'primary', label: '黄色主行动', labelEn: 'Yellow primary action' },
  { status: 'secondary', label: '中性次级操作', labelEn: 'Neutral secondary action' },
  { status: 'tertiary', label: '紫色辅助品牌', labelEn: 'Violet auxiliary brand' },
]
const backgrounds = [
  { label: 'Navy / 深蓝', value: 'navy', color: '#17224B', text: '#FFFFFF' },
  { label: 'White / 白色', value: 'light', color: '#FFFFFF', text: '#17224B' },
  { label: 'Light gray / 浅灰', value: 'muted', color: '#F5F5F5', text: '#17224B' },
  { label: 'Dark gray / 深灰', value: 'dark', color: '#252525', text: '#FFFFFF' },
]
// Read the actual preset so this example cannot silently redefine secondary as violet.
const palette = computed(() => Themes.firefly[mode.value])
const cardVars = computed(() => {
  const surface = backgrounds.find((item) => item.value === background.value)
  return {
    ...palette.value,
    '--mp-sys-color-surface-page': surface.color,
    '--mp-sys-color-content-primary': surface.text,
    '--mp-button-state-layer-color': surface.color,
  }
})
const interactionVars = computed(() => ({
  ...palette.value,
  // Public aliases inherited from the document must also be set for a local preset.
  '--mp-link-text-color': palette.value['--mp-link-primary-color'],
  '--mp-link-text-color-primary': palette.value['--mp-link-primary-color'],
  '--mp-link-text-color-hover': palette.value['--mp-link-primary-color'],
  '--mp-link-text-color-active': palette.value['--mp-link-primary-color'],
}))
const service = ref('drive')
const agreement = ref(true)
const reminder = ref(true)
const level = ref(60)
const contact = ref('')
</script>

<template>
  <section class="firefly-button-scenes" :aria-label="english ? 'Firefly brand roles' : '萤火虫品牌角色'">
    <p>
      {{
        english
          ? 'Primary is yellow, secondary is neutral, and tertiary is violet. Switch the card background to compare transparent text and outline buttons; yellow text belongs on dark surfaces.'
          : 'primary 为黄色主行动，secondary 为中性次级，tertiary 为紫色辅助。切换整张卡片背景对照文字与描边按钮；黄色文字适合深色背景。'
      }}
    </p>
    <mp-form-item layout="vertical" size="sm" :label="english ? 'Card background' : '卡片背景'">
      <mp-radio-group
        v-model="background"
        :aria-label="english ? 'Card background' : '卡片背景'"
        :options="backgrounds"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-theme-provider :style-vars="cardVars" class="firefly-button-scenes__panel" :data-surface="background">
      <div v-for="role in roles" :key="role.status" class="firefly-button-scenes__family">
        <p>{{ english ? role.labelEn : role.label }} / {{ role.status }}</p>
        <mp-space wrap>
          <mp-button
            v-for="variant in variants"
            :key="variant"
            :status="role.status"
            :variant="variant"
            :data-brand-status="role.status"
            :data-brand-variant="variant"
            :elevation="false"
            >{{ variant }}</mp-button
          >
        </mp-space>
      </div>
    </mp-theme-provider>
    <mp-theme-provider :style-vars="interactionVars" class="firefly-interactions">
      <h3>{{ english ? 'Violet selection and focus' : '紫色选择与焦点反馈' }}</h3>
      <mp-space direction="column" block align="stretch" :size="16">
        <mp-radio-group v-model="service" :aria-label="english ? 'Service selection' : '体验项目选择'">
          <mp-radio value="drive">{{ english ? 'Test drive' : '预约试驾' }}</mp-radio>
          <mp-radio value="visit">{{ english ? 'Visit' : '到店体验' }}</mp-radio>
        </mp-radio-group>
        <mp-checkbox v-model="agreement">{{ english ? 'Receive service updates' : '接收服务信息' }}</mp-checkbox>
        <mp-switch v-model="reminder" :aria-label="english ? 'Service reminder' : '体验提醒'" />
        <mp-slider v-model="level" :aria-label="english ? 'Preference level' : '偏好程度'" />
        <mp-input
          v-model="contact"
          :aria-label="english ? 'Firefly focus example' : '萤火虫焦点示例'"
          :placeholder="english ? 'Focus to see the violet border' : '点击输入，查看紫色焦点边框'"
        />
        <mp-link status="primary">{{ english ? 'View service details' : '查看服务详情' }}</mp-link>
      </mp-space>
    </mp-theme-provider>
  </section>
</template>

<style scoped>
.firefly-button-scenes__panel,
.firefly-interactions {
  margin-top: 16px;
  padding: 20px;
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: 16px;
  background: var(--mp-sys-color-surface-page);
  color: var(--mp-sys-color-content-primary);
}
.firefly-button-scenes__family + .firefly-button-scenes__family {
  margin-top: 20px;
}
.firefly-button-scenes__family p,
.firefly-interactions h3 {
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
    <mp-collapse>
      <mp-collapse-item title="字段变体、尺寸与状态 / Field variants, sizes and states" name="fields">
        <p>比较描边、填充、下划线与不同尺寸；切换禁用、只读和错误状态。</p>
        <ControlSizes />
      </mp-collapse-item>
      <mp-collapse-item title="选择、开关与上传 / Selection, switches and uploads" name="selection">
        <p>按需检查选择高亮、加载态和附件列表；上传仅在本地模拟。</p>
        <FormStates />
      </mp-collapse-item>
    </mp-collapse>
  </section>
</template>
```

## ThemeProvider examples

### Variable overrides

Example source: src/theme-provider/example/demos/basic.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
</script>

<template>
  <div>
    <mp-button variant="outline" @click="active = !active">切换局部变量 / Toggle local variables</mp-button>
    <mp-theme-provider tag="section" :style-vars="active ? { '--mp-demo-color': 'teal' } : null">
      <p style="color: var(--mp-demo-color, currentColor)">局部颜色 / Local color</p>
      <mp-theme-provider :style-vars="{ '--mp-demo-color': 'coral' }">
        <p style="color: var(--mp-demo-color)">嵌套覆盖 / Nested override</p>
      </mp-theme-provider>
    </mp-theme-provider>
    <p>外部不受影响 / Outside remains unchanged</p>
  </div>
</template>
```

### Application roots and nesting

Example source: src/theme-provider/example/demos/local-theme.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const theme = ref<'light' | 'dark'>('dark')
</script>
<template>
  <div>
    <mp-button @click="theme = theme === 'dark' ? 'light' : 'dark'">切换局部主题 / Toggle local theme</mp-button>
    <mp-theme-provider :theme="theme" class="theme-region">
      <p>外层主题 / Outer: {{ theme }}</p>
      <mp-button status="primary">主题按钮 / Themed button</mp-button>
      <mp-select :options="[{ label: 'Body popup inherits theme', value: 1 }]" placeholder="打开弹层 / Open popup" />
      <mp-theme-provider theme="light" class="theme-region">
        <p>嵌套亮色 / Nested light</p>
        <mp-button variant="outline">亮色按钮 / Light button</mp-button>
      </mp-theme-provider>
    </mp-theme-provider>
    <p>外部保持原主题 / Outside is unchanged</p>
  </div>
</template>
<style scoped>
.theme-region {
  margin-top: 16px;
  padding: 16px;
  color: var(--mp-color-text-1);
  background: var(--mp-color-bg-2);
  border: 1px solid var(--mp-color-border-2);
}
</style>
```

```vue
<mp-theme-provider :theme="mode">
  <App />
  <mp-theme-provider theme="light"><Preview /></mp-theme-provider>
</mp-theme-provider>
```

Omit theme to inherit. Use light/dark or a Themes preset object for an explicit boundary. Explicit themes replace inherited presets while style-vars overrides continue to inherit. style-vars overrides defaults, inner keys win, and null clears this layer. Explicit boundaries re-evaluate loaded component aliases. tag changes the wrapper; use a suitable layout host or display: contents where necessary.

Library declarative popups inherit their owning Vue provider with body, custom popup-container and inline targets. Services created outside a provider need a popup-container inside the themed region. Third-party Teleports need an explicit theme host; foreign documents must load the library styles.

## Application usage

### 1. Choose a built-in theme

| Code Theme | Light | Dark | Style |
| ------- | ---------------------- | --------------------- | ------------------------------ |
| Default | `Themes.default.light` | `Themes.default.dark` | Teal |
| Maple | `Themes.maple.light` | `Themes.maple.dark` | Red-orange |
| Alps | `Themes.alps.light` | `Themes.alps.dark` | Dark primary buttons and orange selection controls |
| Firefly | `Themes.firefly.light` | `Themes.firefly.dark` | Yellow-green primary buttons, dark-blue text and rounded fields |

Alps/Firefly light themes follow brand styling; dark themes are Maple adaptations. Business code loads brand fonts; system fallback applies otherwise.


#### Firefly color roles and existing APIs

| Purpose | Maple usage | Horo role |
| ------------------ | ------------------------------------- | --------------- |
| Yellow solid primary action | `status="primary" variant="default"` | primary |
| Neutral secondary action | `status="secondary"` | secondary |
| Purple auxiliary solid action | `status="tertiary" variant="default"` | tertiary; Firefly only |
| Purple text action | `status="tertiary" variant="text"` | text |
| Neutral text action | `status="default" variant="text"` | text_secondary |
| Yellow text on dark surfaces | `status="primary" variant="text"` | text_bg |

Yellow primary stays `#EAFF68`. Auxiliary purple fill uses `#CFC7FF`; light-mode text uses `#9A89EB`. secondary is neutral, not purple. text/outline stay transparent without extra supporting button backgrounds. Examples compare whole-card backgrounds. Raw light text does not guarantee contrast on every light background.

Selection, focus, sliders, date ranges and emphasized links use auxiliary purple. Body/general emphasis retain readable dark text adaptation. tonal/dark are Maple extensions of existing APIs, not claims of original Horo dark samples.

### 2. Set page background/text

Configure component themes together with business page backgrounds. Apply these styles to the element inside ThemeProvider that wraps the page:

```css
.app-page {
  color: var(--mp-color-text);
  background-color: var(--mp-color-body);
  color-scheme: var(--mp-color-scheme);
}
```

### 3. Override theme variables

Extend an existing theme, using corresponding bases for light/dark. The following adjusts only button corners:

```vue
<script setup>
import { ref } from 'vue'
import { Themes } from '@maple-design/ui-vue'
const mode = ref('dark')
</script>
<template>
  <mp-theme-provider :theme="Themes.maple[mode]" :style-vars="{ '--mp-button-border-radius': '12px' }">
    <App />
  </mp-theme-provider>
</template>
```

## Unit conversion

`Themes.toRem(theme, { rootFontSize, unitPrecision })` and `Themes.toViewport(theme, { viewportWidth, viewportUnit, unitPrecision })` return new objects. The defaults are 16px and 375px respectively, precision 6, and viewport unit `vmin`. The reference size must be finite and positive, precision an integer from 0 to 100, and the unit a CSS viewport unit. Invalid options throw `RangeError`.

`Themes.convert(theme, converter)` replaces `px` numbers in values as text. The callback receives a signed numeric string and returns the replacement. This is not a CSS parser: matching text in strings and URLs is also replaced, so pass only dimension variables suitable for conversion.

## Finding variables

| Stack level | Example | Use case |
| -------- | --------------------------------------------------------------- | ------------------------------- |
| Brand palette steps | `--mp-primary-1` … `--mp-primary-10` | Build a complete brand palette with RGB-channel values |
| Semantic roles | `--mp-sys-color-content-primary`、`--mp-sys-color-surface-page` | General business text/page backgrounds |
| Component variables | `--mp-button-primary-color`、`--mp-button-border-radius` | Target a particular component |

Use RGB channels through `rgb(var(--mp-primary-6))`. Use complete color/dimension values as documented. `--mp-sys-font-family` is the font entry; applications supply font files.

See [Design Token layers](#/en-US/design-tokens) and component style-variable tables. For form interaction, see [Form](#/en-US/form).

## Installation and defaults

```ts
import { ThemeProvider } from '@maple-design/ui-vue'
app.use(ThemeProvider)
ThemeProvider.setPropsDefaults({ theme: 'light', tag: 'section', styleVars: () => ({}) })
```

Defaults apply to subsequently created instances; explicit props take precedence. Variable objects are copied for each instance. SSR renders the same theme boundary as the client, without retaining theme state across requests.

## API

### ThemeProvider Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| theme | Light/dark mode or preset; inherit when omitted | `ThemeProviderTheme` | — |
| style-vars | CSS variables for this boundary; null clears the overrides | `StyleVars \| null` | `{}` |
| tag | Wrapper element tag | `string` | `'div'` |

The default slot supplies component content. No events.

## Types

Exports ThemeProvider, themeProviderProps, ThemeProviderProps, ThemeProviderInstance, ThemeProviderDefaults, ThemeProviderTheme, ThemeProviderMode, StyleVarName and StyleVars. Variables accept full --mp- names or camelCase names with the library prefix; values are CSS strings and dimensions require units.

## CSS Variables

<!-- component-css-variables:start -->

This component declares no independent public CSS variables. Use the configuration and layout APIs documented on this page.

Internal custom properties and measurement values are implementation details and are not customization APIs.

<!-- component-css-variables:end -->
