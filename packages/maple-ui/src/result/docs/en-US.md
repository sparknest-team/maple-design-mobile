# Result

### Intro

It is used to show the results to users.

### Basic Usage

```html
<template>
  <mp-result
    title="Success"
    subtitle="Hi, I'm a result description."
  >
    <template #footer>
      <mp-button type="success">OK</mp-button>
    </template>
  </mp-result>
</template>
```

### Status

Result status, optional values are `info`, `success`, `warning`, `danger`, `question`, `empty`.

```html
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
  <mp-space direction="column" size="large">
    <mp-button type="success" block @click="success = true">Success</mp-button>
    <mp-button type="warning" block @click="warning = true">Warning</mp-button>
    <mp-button type="info" block @click="info = true">Info</mp-button>
    <mp-button type="danger" block @click="error = true">Error</mp-button>
    <mp-button
      color="var(--result-question-color)"
      text-color="#fff"
      block
      @click="question = true"
    >
      Question
    </mp-button>
    <mp-button
      color="var(--result-empty-color)"
      text-color="#fff"
      block
      @click="empty = true"
    >
      Empty
    </mp-button>
  </mp-space>

  <mp-popup :default-style="false" v-model:open="success">
    <mp-result class="result" title="Success" subtitle="Hi, I'm a result description.">
      <template #footer>
        <mp-button type="success" @click="success = false">OK</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup :default-style="false" v-model:open="warning">
    <mp-result class="result" status="warning" title="Warning" subtitle="Hi, I'm a result description.">
      <template #footer>
        <mp-button type="warning" @click="warning = false">OK</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup :default-style="false" v-model:open="info">
    <mp-result class="result" status="info" title="Info" subtitle="Hi, I'm a result description.">
      <template #footer>
        <mp-button type="info" @click="info = false">OK</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup :default-style="false" v-model:open="error">
    <mp-result class="result" status="danger" title="Error" subtitle="Hi, I'm a result description.">
      <template #footer>
        <mp-button type="danger" @click="error = false">OK</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup :default-style="false" v-model:open="question">
    <mp-result class="result" status="question" title="Question" subtitle="Hi, I'm a result description.">
      <template #footer>
        <mp-button
          color="var(--result-question-color)"
          text-color="#fff"
          @click="question = false"
        >
          OK
        </mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup :default-style="false" v-model:open="empty">
    <mp-result class="result" status="empty" title="Empty" subtitle="Hi, I'm a result description.">
      <template #footer>
        <mp-button
          color="var(--result-empty-color)"
          text-color="#fff"
          @click="empty = false">
          OK
        </mp-button>
      </template>
    </mp-result>
  </mp-popup>
</template>

<style>
.result {
  width: 75vw !important;
}
</style>
```

### Note When Modifying The Background Color

Please try not to modify the background color to be transparent or translucent, which may affect the animation effect of the success type.

## API

### Props

| Prop          | Description                                                              | Type     | Default   |
|---------------|--------------------------------------------------------------------------|----------|-----------|
| `status`        | Image type, options `info` `success` `warning` `danger` `question` `empty` | _string_ | `success` |
| `title`       | The title of Result                                                      | _string_ | `-`       |
| `subtitle` | The description of Result                                                | _string_ | `-`       |
| `image-size`  | Image Size                                                               | _string \| number_   | `-`  |
| `animation`    | Whether to enable animation, valid for `success` type only               | _boolean_ | `true`    |

### Slots

| Name                | Description      | SlotProps |
|--------------------|---------| ---- |
| `image`            | Custom image   | `-`  |
| `title`            |  Custom title   | `-`  |
| `subtitle`      |  Custom description   | `-`  |
| `footer`           | Custom bottom content | `-`  |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                           | Default                    |
|------------------------------------|----------------------------|
| `--result-background`              | `#fff`                     |
| `--result-info-color`              | `var(--color-info)`        |
| `--result-info-border-color`       | `rgba(0, 175, 239, 0.3)`   |
| `--result-success-color`           | `var(--color-success)`     |
| `--result-success-border-color`    | `rgba(0, 196, 143, 0.3)`   |
| `--result-danger-color`             | `var(--color-danger)`      |
| `--result-danger-border-color`      | `rgba(244, 67, 54, 0.3)`   |
| `--result-warning-color`           | `var(--color-warning)`     |
| `--result-warning-border-color`    | `rgba(255, 159, 0, 0.3)`   |
| `--result-question-color`          | `#607d8b`                  |
| `--result-question-border-color`   | `rgba(96, 125, 139, 0.3)`  |
| `--result-empty-color`             | `#9e9e9e`                  |
| `--result-empty-border-color`      | `rgba(158, 158, 158, 0.3)` |
| `--result-padding`                 | `24px`                     |
| `--result-border-radius`           | `3px`                      |
| `--result-title-color`             | `#444`                     |
| `--result-title-font-size`         | `32px`                     |
| `--result-title-margin`            | `15px 0 0 0`               |
| `--result-image-size`              | `80px`                     |
| `--result-title-font-weight`       | `500`                      |
| `--result-subtitle-margin`      | `10px 0 0 0`               |
| `--result-subtitle-font-size`   | `14px`                     |
| `--result-subtitle-color`       | `rgba(0, 0, 0, 0.6)`       |
| `--result-subtitle-line-height` | `1.6`                      |

