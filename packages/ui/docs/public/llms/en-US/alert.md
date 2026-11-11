<!-- Source: src/alert/docs/en-US.md; locale: en-US; page: /en-US/alert -->

# Alert

### Intro

Alerts display brief messages for the user without interrupting their use.

## Basic examples

### Basic usage

Example source: src/alert/example/demos/basic.vue

```vue
<template>
  <mp-alert message="这是一条提示信息。" />
</template>
```

## Appearance and states

### Appearance configuration comparison

Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Appearance combinations

Use this example for the emphasis of informational messages. Adjust variant, status and compare the component with the same data. Keep the content unchanged while comparing the available settings.

#### Type

`type`: `info` / `success` / `warning` / `danger` / `default`. `default` has no built-in icon; use `#icon` to customize.

</details>

Example source: src/alert/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef } from 'vue'

const __demoAppearance = __demoReactive({ variant: 'tonal', status: 'default' })
const demoCompareFields = [
  { name: 'variant', values: ['tonal', 'outline', 'standard'] },
  { name: 'status', values: ['info', 'success', 'warning', 'danger', 'default'] },
]
const demoCompareAxis = demoRef('variant')
const demoComparedOptions = demoComputed(
  () => demoCompareFields.find((field) => field.name === demoCompareAxis.value)?.values ?? [],
)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical">
      <mp-form-item layout="vertical" size="sm" label="variant">
        <mp-radio-group
          v-model="__demoAppearance['variant']"
          aria-label="variant"
          :options="[
            { label: 'tonal', value: 'tonal' },
            { label: 'outline', value: 'outline' },
            { label: 'standard', value: 'standard' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="status">
        <mp-radio-group
          v-model="__demoAppearance['status']"
          aria-label="status"
          :options="[
            { label: 'info', value: 'info' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
            { label: 'default', value: 'default' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
    </mp-form>
    <p class="demo-config-comparison-hint">
      <span lang="zh-CN">选择一个对比维度；其他配置和内容保持一致。输入类示例共享同一个值，便于比较外观。</span
      ><span lang="en-US"
        >Compare one dimension while keeping the other settings and content identical. Input specimens share the same
        value.</span
      >
    </p>
    <mp-radio-group
      v-model="demoCompareAxis"
      aria-label="Compare configuration"
      :options="demoCompareFields.map((field) => ({ label: field.name, value: field.name }))"
    />
    <div class="demo-config-comparison">
      <section v-for="sample in demoComparedOptions" :key="String(sample)">
        <p>
          <code>{{ demoCompareAxis }}={{ sample }}</code>
        </p>
        <mp-alert title="傲慢与偏见" v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }" />
      </section>
    </div>
  </mp-space>
</template>

<style scoped>
.demo-config-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 20px;
  min-width: 0;
  max-width: 100%;
}
.demo-config-comparison > section {
  min-width: 0;
}
.demo-config-comparison p {
  margin: 0 0 8px;
}
html:not([lang='en-US']) .demo-config-comparison-hint > [lang='en-US'],
html[lang='en-US'] .demo-config-comparison-hint > [lang='zh-CN'] {
  display: none;
}
</style>
```

## Content and presentation

### Title, alignment and banners

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `message` | Content | Title, alignment and banners, Hide Icon, Action |
| `title` | Title | Title, alignment and banners, Hide Icon, Action |
| `center` | Whether to center content | Title, alignment and banners |
| `banner` | Full-width mode without rounded corners | Title, alignment and banners |
| `show-icon` | Whether to show the left icon | Hide Icon |
<!-- demo-config-notes:end -->


Compare title hierarchy, centered content and page-wide banners. Actions and dismiss behavior have separate examples.

Example source: src/alert/example/demos/content-comparison.vue

```vue
<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="title">
      <h4><span lang="zh-CN">标题</span><span lang="en-US">Title</span></h4>
      <mp-alert title="傲慢与偏见" />
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="center">
      <h4><span lang="zh-CN">居中</span><span lang="en-US">center</span></h4>
      <mp-alert
        message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
        center
      />
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="banner">
      <h4><span lang="zh-CN">通栏（Banner）</span><span lang="en-US">banner</span></h4>
      <mp-alert
        message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
        banner
      />
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
</style>
```

### Hide Icon

Example source: src/alert/example/demos/show-icon.vue

```vue
<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <mp-alert
    title="傲慢与偏见"
    message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
    :show-icon="false"
  />
</template>
```

### Action

Example source: src/alert/example/demos/action.vue

```vue
<script setup></script>

<template>
  <mp-alert
    title="傲慢与偏见"
    message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
  >
    <template #action>
      <mp-button size="xs" status="primary">详情</mp-button>
    </template>
  </mp-alert>
</template>
```

### Message

Example source: src/alert/example/demos/message.vue

```vue
<script setup></script>

<template>
  <mp-alert message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。" />
</template>
```

## Customization and slots

### Custom Icon

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `title` | Title | Custom Icon |
| `message` | Content | Custom Icon |
<!-- demo-config-notes:end -->


Example source: src/alert/example/demos/custom-icon.vue

```vue
<script setup></script>

<template>
  <mp-alert
    title="傲慢与偏见"
    message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
  >
    <template #icon>
      <m-icon-heart-fill />
    </template>
  </mp-alert>
</template>
```

## Interaction and control

### Dismiss controls and custom icons

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `title` | Title | Dismiss controls and custom icons |
| `message` | Content | Dismiss controls and custom icons |
| `closable` | Whether the alert is `closeable` | Dismiss controls and custom icons |
<!-- demo-config-notes:end -->


Operate the default and custom dismiss controls to compare the same dismissal behavior.

<details>
<summary>Configuration details and limits</summary>

#### Allow To Close

Activate Close with a click, Space or Enter. The close event starts closing; closed follows the leave transition. Unmounting the component in close prevents observing its completed transition. This Demo retains the instance, counts both events, and reopens with a fresh key without changing other Alert instances.

</details>

Example source: src/alert/example/demos/dismiss-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const generation = ref(0)

    const closeCount = ref(0)

    const closedCount = ref(0)
    return { generation, closeCount, closedCount }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const showCloseIcon = ref(true)
    return { showCloseIcon }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="allow-to-close">
      <h4><span lang="zh-CN">允许关闭</span><span lang="en-US">Allow To Close</span></h4>
      <section class="alert-close-demo">
        <mp-alert
          :key="scene1.generation"
          title="傲慢与偏见"
          message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
          closable
          @close="scene1.closeCount++"
          @closed="scene1.closedCount++"
        />
        <p role="status">Close: {{ scene1.closeCount }} · Closed: {{ scene1.closedCount }}</p>
        <mp-button :disabled="scene1.closedCount === scene1.generation" @click="scene1.generation++"
          >Reopen / 重新打开</mp-button
        >
      </section>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="custom-close-icon">
      <h4><span lang="zh-CN">自定义关闭图标</span><span lang="en-US">Custom Close Icon</span></h4>
      <mp-alert
        v-if="scene2.showCloseIcon"
        title="傲慢与偏见"
        message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
        closable
        @close="scene2.showCloseIcon = false"
      >
        <template #close-icon>
          <m-icon-close />
        </template>
      </mp-alert>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
</style>
```

## API

### Alert Props

| Prop | Description | Type | Default |
| ----------- | -------------------------------------------------------------------- | ------------------- | ---------- |
| status | Type, optional values are `info`, `success`, `warning`, `danger`, `default` | _AlertStatus_<br>`'default' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `info` |
| `variant` | Variant, optional values are `standard` `outline` `tonal` | _AlertVariant_<br>`'standard' \| 'outline' \| 'tonal'` | `standard` |
| `color` | Background color | _string_ | `-` |
| `title` | Title | _string_ | `-` |
| `message` | Content | _string_ | `-` |
| `show-icon` | Whether to show the left icon | _boolean_ | `true` |
| `closable` | Whether the alert is `closeable` | _boolean_ | `false` |
| `banner` | Full-width mode without rounded corners | _boolean_ | `false` |
| `center` | Whether to center content | _boolean_ | `false` |
| `elevation` | Elevation, optional values are `true`, `false`, and levels from `0-24` | _number \| boolean_ | `false` |

### Alert Slots

| Name | Description |
| ------------ | ---------- |
| `default` | Content |
| `title` | Title |
| `icon` | The prepend icon of alert |
| `action` | Right action |
| `close-icon` | The close icon of alert |

### Alert Events

| Event | Description | Callback arguments |
| -------- | ------------------ | -------------- |
| `close` | Triggered when the Close button is clicked and can only be used when the Close button is displayed | `event: MouseEvent` |
| `closed` | Triggered after the leave transition completes | `-` |

## Types

```ts
import type { AlertInstance, AlertProps, AlertStatus, AlertVariant } from 'ui'
```

## Usage notes



The close button supports keyboard activation. close fires once; closed fires after the leave transition finishes.

### Close labels and elevation types

The close control uses the shared `common.close` locale key and updates reactively with its language scope. The `close-icon` slot replaces only the graphic. Customize `locale.common.close` through Cedar ConfigProvider, or the `'common.close'` message through Maple LocaleProvider.

`elevation` accepts only booleans or numbers. Use `:elevation="4"` for a numeric level; the string `elevation="4"` is outside the public type. Keyboard activation and clicks emit a MouseEvent; `closed` still fires after the leave transition.

## CSS Variables

See `--mp-alert-*` variables under `:root` in `style/token.less`. All use the `--mp-alert-` prefix and support customization through [ThemeProvider](#/en-US/theme-provider).

Colored titles, content, icons and outline borders use readable system content colors. standard and tonal share the same level-1 background; standard adds a subtle decorative border. Default titles use content-primary; body text and icons use content-secondary. The content variable also sets the root inherited color, used by close icons and actions without an explicit color. Maple dark mode inherits these colors while retaining its geometry overrides: 16px padding, 22px icons, 12px icon/close gaps and 1.5 body line height. color changes only the background; callers must also verify foreground contrast. The table lists :root defaults, not theme overrides.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-alert-action-margin-left` | `var(--mp-sys-space-5)` | `margin-inline-start` |
| `--mp-alert-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-alert-border-width` | `1px` | `border` |
| `--mp-alert-close-duration` | `var(--mp-sys-motion-duration-slow)` | `transition` |
| `--mp-alert-close-margin-left` | `var(--mp-sys-space-4)` | `margin-inline-start` |
| `--mp-alert-font-size-content` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-alert-font-size-title` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-alert-font-weight-title` | `var(--mp-sys-font-weight-medium)` | `font-weight` |
| `--mp-alert-icon-margin-right` | `var(--mp-sys-space-4)` | `margin-inline-end` |
| `--mp-alert-icon-size` | `16px` | `font-size` |
| `--mp-alert-line-height` | `1.5715` | `line-height` |
| `--mp-alert-line-height-title` | `1.5` | `line-height` |
| `--mp-alert-outline-danger-border` | `var(--mp-sys-color-content-danger)` | `border-color` |
| `--mp-alert-outline-danger-content` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-outline-danger-icon` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-outline-danger-title` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-outline-default-border` | `var(--mp-sys-color-border-default)` | `border-color` |
| `--mp-alert-outline-default-content` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-outline-default-icon` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-outline-default-title` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-alert-outline-info-border` | `var(--mp-sys-color-content-info)` | `border-color` |
| `--mp-alert-outline-info-content` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-outline-info-icon` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-outline-info-title` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-outline-success-border` | `var(--mp-sys-color-content-success)` | `border-color` |
| `--mp-alert-outline-success-content` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-outline-success-icon` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-outline-success-title` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-outline-warning-border` | `var(--mp-sys-color-content-warning)` | `border-color` |
| `--mp-alert-outline-warning-content` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-outline-warning-icon` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-outline-warning-title` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-padding-horizontal` | `var(--mp-sys-space-6)` | `padding` |
| `--mp-alert-padding-horizontal-with-title` | `var(--mp-sys-space-6)` | `padding` |
| `--mp-alert-padding-vertical` | `var(--mp-sys-space-4)` | `padding` |
| `--mp-alert-padding-vertical-with-title` | `var(--mp-sys-space-6)` | `padding` |
| `--mp-alert-standard-danger-bg` | `rgb(var(--mp-danger-1))` | `background-color` |
| `--mp-alert-standard-danger-border` | `rgb(var(--mp-danger-3))` | `border-color` |
| `--mp-alert-standard-danger-content` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-standard-danger-icon` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-standard-danger-title` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-standard-default-bg` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-alert-standard-default-border` | `var(--mp-sys-color-border-default)` | `border-color` |
| `--mp-alert-standard-default-content` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-standard-default-icon` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-standard-default-title` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-alert-standard-info-bg` | `rgb(var(--mp-blue-1))` | `background-color` |
| `--mp-alert-standard-info-border` | `rgb(var(--mp-blue-3))` | `border-color` |
| `--mp-alert-standard-info-content` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-standard-info-icon` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-standard-info-title` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-standard-success-bg` | `rgb(var(--mp-success-1))` | `background-color` |
| `--mp-alert-standard-success-border` | `rgb(var(--mp-success-3))` | `border-color` |
| `--mp-alert-standard-success-content` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-standard-success-icon` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-standard-success-title` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-standard-warning-bg` | `rgb(var(--mp-warning-1))` | `background-color` |
| `--mp-alert-standard-warning-border` | `rgb(var(--mp-warning-3))` | `border-color` |
| `--mp-alert-standard-warning-content` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-standard-warning-icon` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-standard-warning-title` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-title-margin-bottom` | `var(--mp-sys-space-2)` | `margin-bottom` |
| `--mp-alert-tonal-danger-bg` | `rgb(var(--mp-danger-1))` | `background-color` |
| `--mp-alert-tonal-danger-content` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-tonal-danger-icon` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-tonal-danger-title` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-tonal-default-bg` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-alert-tonal-default-content` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-tonal-default-icon` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-tonal-default-title` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-alert-tonal-info-bg` | `rgb(var(--mp-blue-1))` | `background-color` |
| `--mp-alert-tonal-info-content` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-tonal-info-icon` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-tonal-info-title` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-tonal-success-bg` | `rgb(var(--mp-success-1))` | `background-color` |
| `--mp-alert-tonal-success-content` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-tonal-success-icon` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-tonal-success-title` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-tonal-warning-bg` | `rgb(var(--mp-warning-1))` | `background-color` |
| `--mp-alert-tonal-warning-content` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-tonal-warning-icon` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-tonal-warning-title` | `var(--mp-sys-color-content-warning)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-alert-border-radius: var(--mp-sys-radius-md);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Motion

Built-in motion follows `prefers-reduced-motion: reduce`. Reduced motion does not prevent loading-state or close-event updates.
