<!-- Source: src/result/docs/en-US.md; locale: en-US; page: /en-US/result -->

# Result

### Intro

It is used to show the results to users.

## Basic examples

### Basic Usage

Next status cycles six local result states and updates the title and graphic; Reset status returns to info. These buttons neither send requests nor navigate. Result displays the supplied status without inferring it from title text.

Example source: src/result/example/demos/basic-usage.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const statuses = ['info', 'success', 'warning', 'danger', 'question', 'empty'] as const
const index = ref(0)
const status = computed(() => statuses[index.value])
</script>

<template>
  <mp-result data-demo-result :status="status" :title="'Result: ' + status" subtitle="Local state preview">
    <template #extra>
      <mp-space wrap>
        <mp-button status="primary" @click="index = (index + 1) % statuses.length">Next status</mp-button>
        <mp-button @click="index = 0">Reset status</mp-button>
      </mp-space>
      <p aria-live="polite">Current status: {{ status }}</p>
    </template>
  </mp-result>
</template>
```

## Content and presentation

### Status

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `status` | info / success / warning / danger / question / empty / 403 / 404 / 500 | Status |
| `title` | Title | Status |
| `subtitle` | Description | Status |
<!-- demo-config-notes:end -->


Result supports `info`, `success`, `warning`, `danger`, `question`, `empty`, `403`, `404`, and `500`. Built-in graphic entry animation follows `animation` and the system reduced-motion preference. The `icon` slot replaces the built-in graphic and receives the normalized `size`; its content controls its own size and animation.

Example source: src/result/example/demos/type.vue

```vue
<script setup>
import { ref } from 'vue'

const success = ref(false)
const error = ref(false)
const info = ref(false)
const warning = ref(false)
const question = ref(false)
const empty = ref(false)
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-button status="success" block @click="success = true">成功</mp-button>
    <mp-button status="warning" block @click="warning = true">警告</mp-button>
    <mp-button status="info" block @click="info = true">信息</mp-button>
    <mp-button status="danger" block @click="error = true">错误</mp-button>
    <mp-button color="var(--mp-result-question-color)" text-color="#fff" block @click="question = true">
      疑问
    </mp-button>
    <mp-button color="var(--mp-result-empty-color)" text-color="#fff" block @click="empty = true"> 空值 </mp-button>
  </mp-space>

  <mp-popup v-model:open="success" unstyled>
    <mp-result class="result" status="success" title="成功" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button status="success" @click="success = false">知道了</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:open="error" unstyled>
    <mp-result class="result" status="danger" title="错误" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button status="danger" @click="error = false">知道了</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:open="warning" unstyled>
    <mp-result class="result" status="warning" title="警告" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button status="warning" @click="warning = false">知道了</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:open="info" unstyled>
    <mp-result class="result" status="info" title="信息" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button status="info" @click="info = false">知道了</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:open="question" unstyled>
    <mp-result class="result" status="question" title="疑问" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button color="var(--mp-result-question-color)" text-color="#fff" @click="question = false"
          >知道了
        </mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:open="empty" unstyled>
    <mp-result class="result" status="empty" title="空值" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button color="var(--mp-result-empty-color)" text-color="#fff" @click="empty = false">知道了 </mp-button>
      </template>
    </mp-result>
  </mp-popup>
</template>

<style scoped>
.result {
  width: 75vmin;
}
</style>
```

## API

### Result Props

| Prop | Description | Type | Default |
| --------------- | ----------------------------------------------------------------- | ---------- | ----------- |
| `status` | info / success / warning / danger / question / empty / 403 / 404 / 500 | _ResultStatus_<br>`'success' \| 'empty' \| 'info' \| 'warning' \| 'danger' \| 'question' \| '403' \| '404' \| '500'` | `info` |
| `title` | Title | _string_ | `-` |
| `subtitle` | Description | _string_ | `-` |
| `image-size` | Image Size | _string \| number_ | `-` |
| `animation` | Whether to animate the status graphic | _boolean_ | `true` |

### Result Slots

| Slot | Description | Prop |
| -------------------- | --------- | ---- |
| `icon` | Custom status graphic | `{ size?: string }` |
| `title` | Custom title | `-` |
| `subtitle` | Custom description | `-` |
| `extra` | Custom action area | `-` |
| `default` | Additional result details | `-` |

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-result-background` | `var(--mp-color-bg-white)` | `background-color` |
| `--mp-result-border-radius` | `3px` | `border-radius` |
| `--mp-result-content-margin` | `20px 0 0` | `margin` |
| `--mp-result-danger-border-color` | `rgba(244, 67, 54, 0.3)` | `border-color` |
| `--mp-result-danger-color` | `var(--mp-sys-color-content-danger)` | `fill` |
| `--mp-result-empty-border-color` | `rgba(158, 158, 158, 0.3)` | `border-color` |
| `--mp-result-empty-color` | `#9e9e9e` | `fill` |
| `--mp-result-extra-margin` | `20px 0 0` | `margin` |
| `--mp-result-image-size` | `80px` | `height`, `width` |
| `--mp-result-info-border-color` | `rgba(0, 175, 239, 0.3)` | `border-color` |
| `--mp-result-info-color` | `var(--mp-sys-color-content-info)` | `fill` |
| `--mp-result-padding` | `24px` | `padding` |
| `--mp-result-question-border-color` | `rgba(96, 125, 139, 0.3)` | `border-color` |
| `--mp-result-question-color` | `#607d8b` | `fill` |
| `--mp-result-subtitle-color` | `rgba(0, 0, 0, 0.6)` | `color` |
| `--mp-result-subtitle-font-size` | `14px` | `font-size` |
| `--mp-result-subtitle-line-height` | `1.6` | `line-height` |
| `--mp-result-subtitle-margin` | `10px 0 0` | `margin` |
| `--mp-result-success-border-color` | `rgba(0, 196, 143, 0.3)` | `border-color` |
| `--mp-result-success-color` | `var(--mp-sys-color-content-success)` | `fill` |
| `--mp-result-title-color` | `#444` | `color` |
| `--mp-result-title-font-size` | `32px` | `font-size` |
| `--mp-result-title-font-weight` | `500` | `font-weight` |
| `--mp-result-title-margin` | `15px 0 0` | `margin` |
| `--mp-result-warning-border-color` | `rgba(255, 159, 0, 0.3)` | `border-color` |
| `--mp-result-warning-color` | `var(--mp-sys-color-content-warning)` | `fill` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-result-background: var(--mp-color-bg-white);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
