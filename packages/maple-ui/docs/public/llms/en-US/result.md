<!-- Source: src/result/docs/en-US.md; locale: en-US; page: /en-US/result -->

# Result

## Examples

### Intro

It is used to show the results to users.

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

### Status

Result status, optional values are `info`, `success`, `warning`, `danger`, `question`, `empty`.

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

### Note When Modifying The Background Color

Please try not to modify the background color to be transparent or translucent, which may affect the animation effect of the success type.

## API

### Props

| Prop          | Description                                                              | Type     | Default   |
|---------------|--------------------------------------------------------------------------|----------|-----------|
| `status` | info / success / warning / danger / question / empty / 403 / 404 / 500 | _ResultStatus_ | `info` |
| `title`       | The title of Result                                                      | _string_ | `-`       |
| `subtitle` | The description of Result                                                | _string_ | `-`       |
| `image-size`  | Image Size                                                               | _string \| number_   | `-`  |
| `animation`    | Whether to animate the status graphic                                    | _boolean_ | `true`    |

### Slots

| Name                | Description      | SlotProps |
|--------------------|---------| ---- |
| `icon`             | Custom status graphic | `{ size?: string }` |
| `title`            |  Custom title   | `-`  |
| `subtitle`      |  Custom description   | `-`  |
| `extra`            | Custom action area | `-` |
| `default`          | Additional result details | `-` |

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
