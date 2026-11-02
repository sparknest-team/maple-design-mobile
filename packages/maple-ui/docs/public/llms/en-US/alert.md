<!-- Source: src/alert/docs/en-US.md; locale: en-US; page: /en-US/alert -->

# Alert

## 案例

### Intro

Alerts display brief messages for the user without interrupting their use.

### Variant

Example source: src/alert/example/demos/variant.vue

```vue
<script setup>
import { ref } from 'vue'

const options = ['info', 'success', 'warning', 'danger', 'default'].map((value) => ({ label: value, value }))
const type = ref('info')
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-select v-model="type" variant="outline" size="sm" :options="options" />
    <mp-alert
      closable
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      :status="type"
    />
    <mp-alert
      closable
      variant="tonal"
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      :status="type"
    />
    <mp-alert
      closable
      variant="outline"
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      :status="type"
    />
  </mp-space>
</template>
```

### Title

Example source: src/alert/example/demos/title.vue

```vue
<script setup></script>

<template>
  <mp-alert title="傲慢与偏见" />
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

### Type

`type`: `info` / `success` / `warning` / `danger` / `default`. `default` has no built-in icon; use `#icon` to customize.

Example source: src/alert/example/demos/type.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" size="lg">
    <mp-alert
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
    />
    <mp-alert
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      status="success"
    />
    <mp-alert
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      status="warning"
    />
    <mp-alert
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      status="danger"
    />
    <mp-alert
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      status="default"
    />
  </mp-space>
</template>
```

### Custom Icon

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

### Allow To Close

Activate Close with a click, Space or Enter. The close event starts closing; closed follows the leave transition. Unmounting the component in close prevents observing its completed transition. This Demo retains the instance, counts both events, and reopens with a fresh key without changing other Alert instances.

Example source: src/alert/example/demos/allow-to-close.vue

```vue
<script setup>
import { ref } from 'vue'

const generation = ref(0)
const closeCount = ref(0)
const closedCount = ref(0)
</script>

<template>
  <section class="alert-close-demo">
    <mp-alert
      :key="generation"
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      closable
      @close="closeCount++"
      @closed="closedCount++"
    />
    <p role="status">Close: {{ closeCount }} · Closed: {{ closedCount }}</p>
    <mp-button :disabled="closedCount === generation" @click="generation++">Reopen / 重新打开</mp-button>
  </section>
</template>
```

### Custom Close Icon

Example source: src/alert/example/demos/custom-close-icon.vue

```vue
<script setup>
import { ref } from 'vue'

const showCloseIcon = ref(true)
</script>

<template>
  <mp-alert
    v-if="showCloseIcon"
    title="傲慢与偏见"
    message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
    closable
    @close="showCloseIcon = false"
  >
    <template #close-icon>
      <m-icon-close />
    </template>
  </mp-alert>
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

### center

Example source: src/alert/example/demos/center.vue

```vue
<script setup></script>

<template>
  <mp-alert message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。" center />
</template>
```

### banner

Example source: src/alert/example/demos/banner.vue

```vue
<script setup></script>

<template>
  <mp-alert message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。" banner />
</template>
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

### Appearance combinations

Use this example for the emphasis of informational messages. Adjust variant, status and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/alert/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive } from 'vue'

const __demoAppearance = __demoReactive({ variant: 'tonal', status: 'default' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>variant</span
        ><mp-select
          v-model="__demoAppearance['variant']"
          :clearable="false"
          :options="[
            { label: 'tonal', value: 'tonal' },
            { label: 'outline', value: 'outline' },
            { label: 'standard', value: 'standard' },
          ]"
          aria-label="variant"
        />
      </div>
      <div>
        <span>status</span
        ><mp-select
          v-model="__demoAppearance['status']"
          :clearable="false"
          :options="[
            { label: 'info', value: 'info' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
            { label: 'default', value: 'default' },
          ]"
          aria-label="status"
        />
      </div>
    </mp-space>
    <mp-alert title="傲慢与偏见" v-bind="__demoAppearance" />
  </mp-space>
</template>
```

## API

### Props

| Prop        | Description                                                                 | Type                | Default    |
| ----------- | --------------------------------------------------------------------------- | ------------------- | ---------- |
| status      | Type, optional values are `info`, `success`, `warning`, `danger`, `default` | _string_            | `info`     |
| `variant`   | Variant, optional values are `standard` `outline` `tonal`                   | _string_            | `standard` |
| `color`     | Background color                                                            | string              | `-`        |
| `title`     | Title                                                                       | string              | `-`        |
| `message`   | Message                                                                     | string              | `-`        |
| `elevation` | Elevation, optional values are true, false, and levels from 0-24            | _number \| boolean_ | `false`    |
| `closable` | Whether the alert is closeable                                              | boolean             | `false`    |

### Slots

| Name         | Description               | SlotProps |
| ------------ | ------------------------- | --------- |
| `default`    | The message of alert      | `-`       |
| `title`      | The title of alert        | `-`       |
| `icon`       | The prepend icon of alert | `-`       |
| `close-icon` | The close icon of alert   | `-`       |

### Events

| Event   | Description                                                                                        | Arguments      |
| ------- | -------------------------------------------------------------------------------------------------- | -------------- |
| `close` | Triggered when the Close button is clicked and can only be used when the Close button is displayed | `event: Event` |
| `closed` | Triggered after the leave transition completes | `-` |

### Style Variables

See `style/token.less` for the complete `--mp-alert-*` contract. Override these variables with [StyleProvider](#/en-US/style-provider). The public names are shared with Cedar; only the `--mp-` / `--c-` brand prefix differs.

### Complete token defaults

Colored title/content/icon and outline borders use readable system content roles. Standard and tonal share palette step 1 backgrounds, with only standard showing a weak decorative border. Neutral title uses content-primary; content/icon use content-secondary. The content token also supplies inherited close/action colors. Maple dark inherits the same color defaults, while keeping its existing geometry overrides (padding 16px, icon 22px, icon/close margins 12px, line-height 1.5). Custom color only changes the background; verify all foregrounds when overriding it. The table lists root defaults, not theme overrides.

| Variable | Default |
| --- | --- |
| `--mp-alert-padding-vertical` | `var(--mp-sys-space-4)` |
| `--mp-alert-padding-horizontal` | `var(--mp-sys-space-6)` |
| `--mp-alert-padding-vertical-with-title` | `var(--mp-sys-space-6)` |
| `--mp-alert-padding-horizontal-with-title` | `var(--mp-sys-space-6)` |
| `--mp-alert-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-alert-border-width` | `1px` |
| `--mp-alert-font-size-content` | `var(--mp-sys-font-size-md)` |
| `--mp-alert-font-size-title` | `var(--mp-sys-font-size-lg)` |
| `--mp-alert-font-weight-title` | `var(--mp-sys-font-weight-medium)` |
| `--mp-alert-line-height` | `1.5715` |
| `--mp-alert-line-height-title` | `1.5` |
| `--mp-alert-title-margin-bottom` | `var(--mp-sys-space-2)` |
| `--mp-alert-icon-size` | `16px` |
| `--mp-alert-icon-margin-right` | `var(--mp-sys-space-4)` |
| `--mp-alert-action-margin-left` | `var(--mp-sys-space-5)` |
| `--mp-alert-close-margin-left` | `var(--mp-sys-space-4)` |
| `--mp-alert-standard-info-bg` | `rgb(var(--mp-blue-1))` |
| `--mp-alert-standard-info-border` | `rgb(var(--mp-blue-3))` |
| `--mp-alert-standard-info-title` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-standard-info-content` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-standard-info-icon` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-standard-success-bg` | `rgb(var(--mp-success-1))` |
| `--mp-alert-standard-success-border` | `rgb(var(--mp-success-3))` |
| `--mp-alert-standard-success-title` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-standard-success-content` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-standard-success-icon` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-standard-warning-bg` | `rgb(var(--mp-warning-1))` |
| `--mp-alert-standard-warning-border` | `rgb(var(--mp-warning-3))` |
| `--mp-alert-standard-warning-title` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-standard-warning-content` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-standard-warning-icon` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-standard-danger-bg` | `rgb(var(--mp-danger-1))` |
| `--mp-alert-standard-danger-border` | `rgb(var(--mp-danger-3))` |
| `--mp-alert-standard-danger-title` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-standard-danger-content` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-standard-danger-icon` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-standard-default-bg` | `var(--mp-color-fill-2)` |
| `--mp-alert-standard-default-border` | `var(--mp-sys-color-border-default)` |
| `--mp-alert-standard-default-title` | `var(--mp-sys-color-content-primary)` |
| `--mp-alert-standard-default-content` | `var(--mp-sys-color-content-secondary)` |
| `--mp-alert-standard-default-icon` | `var(--mp-sys-color-content-secondary)` |
| `--mp-alert-tonal-info-bg` | `rgb(var(--mp-blue-1))` |
| `--mp-alert-tonal-info-title` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-tonal-info-content` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-tonal-info-icon` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-tonal-success-bg` | `rgb(var(--mp-success-1))` |
| `--mp-alert-tonal-success-title` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-tonal-success-content` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-tonal-success-icon` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-tonal-warning-bg` | `rgb(var(--mp-warning-1))` |
| `--mp-alert-tonal-warning-title` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-tonal-warning-content` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-tonal-warning-icon` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-tonal-danger-bg` | `rgb(var(--mp-danger-1))` |
| `--mp-alert-tonal-danger-title` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-tonal-danger-content` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-tonal-danger-icon` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-tonal-default-bg` | `var(--mp-color-fill-2)` |
| `--mp-alert-tonal-default-title` | `var(--mp-sys-color-content-primary)` |
| `--mp-alert-tonal-default-content` | `var(--mp-sys-color-content-secondary)` |
| `--mp-alert-tonal-default-icon` | `var(--mp-sys-color-content-secondary)` |
| `--mp-alert-outline-info-border` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-outline-info-title` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-outline-info-content` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-outline-info-icon` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-outline-success-border` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-outline-success-title` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-outline-success-content` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-outline-success-icon` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-outline-warning-border` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-outline-warning-title` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-outline-warning-content` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-outline-warning-icon` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-outline-danger-border` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-outline-danger-title` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-outline-danger-content` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-outline-danger-icon` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-outline-default-border` | `var(--mp-sys-color-border-default)` |
| `--mp-alert-outline-default-title` | `var(--mp-sys-color-content-primary)` |
| `--mp-alert-outline-default-content` | `var(--mp-sys-color-content-secondary)` |
| `--mp-alert-outline-default-icon` | `var(--mp-sys-color-content-secondary)` |

### Motion variables

Built-in effects respect `prefers-reduced-motion: reduce`; loading and closing still update state immediately.

| Token | Default |
| --- | --- |
| `--mp-alert-close-duration` | `var(--mp-sys-motion-duration-slow)` |
