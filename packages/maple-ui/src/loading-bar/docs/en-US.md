# LoadingBar

### Intro

Display loading progress at the top of the page.

### Basic Usage

```html
<script setup>
import { ref } from 'vue'
import { LoadingBar } from '@nio-pow/maple-ui'

const hasCustomStyle = ref(false)

function setStyle() {
  if (hasCustomStyle.value) {
    LoadingBar.resetDefaultOptions()
  } else {
    LoadingBar.setDefaultOptions({
      errorColor: '#ff8800',
      color: '#10afef',
      height: '5px',
    })
  }

  hasCustomStyle.value = !hasCustomStyle.value
}

// mobile only
// LoadingBar.setDefaultOptions({
//   top: '54px'
// })
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-button type="primary" block @click="LoadingBar.start()">Start</mp-button>
    <mp-button type="primary" block @click="LoadingBar.finish()">Finish</mp-button>
    <mp-button type="primary" block @click="LoadingBar.error()">Error</mp-button>
    <mp-button type="primary" block @click="setStyle">
      {{ hasCustomStyle ? 'Clear Style' : 'Custom Style' }}
    </mp-button>
  </mp-space>
</template>
```

## API

### Methods

| Method | Description | Arguments | Return |
|---------------------|----------|--|---------|
| `LoadingBar.start`  | Start loading  | `-` | `-` |
| `LoadingBar.finish` | Finish loading  | `-` | `-` |
| `LoadingBar.error`  | Loading error  | `-` | `-` |
| `LoadingBar.setDefaultOptions` | Set default option configuration | _options: LoadingBarOptions_ | `-` |
| `LoadingBar.resetDefaultOptions` | Reset default option configuration | _-_ | `-` |

### LoadingBar Options

| Option       | Description            | Type | Default |
|--------------|------------------------|-----------|--------|
| `color`      | LoadingBar color       | _string_  | `-`    |
| `errorColor` | LoadingBar error color | _string_  | `-`    |
| `height`     | LoadingBar height      | _string \| number_ | `-` |
| `top`        | LoadingBar top         | _string \| number_ | `-` |
| `finishDelay` ***3.3.13*** | The delay time of the finish function, which can be used to increase the duration of loading animation | _number_ | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- |------------------------|
| `--loading-bar-color` | `var(--color-primary)` |
| `--loading-bar-error-color` | `var(--color-danger)`  |
| `--loading-bar-height` | `3px`                  |
