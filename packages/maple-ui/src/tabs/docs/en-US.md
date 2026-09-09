# Tabs

### Intro

Use `Tabs, Tab` to switch between tabbed groups and Use `TabsItems`, `TabItem` to achieve view linkage with Tabs.

### Basic Usage

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-tabs v-model:active="active">
    <mp-tab>Option1</mp-tab>
    <mp-tab>Option2</mp-tab>
    <mp-tab>Option3</mp-tab>
  </mp-tabs>
</template>
```

### Named TAB

The Tabs decide which tab is activated by default by matching the `active` to the Tab's `index`
You can also name a Tab by setting the `name` to the Tab, in which case the Tabs will match the name first.

```html
<script setup>
import { ref } from 'vue'

const active = ref('Option1')
</script>

<template>
  <mp-tabs v-model:active="active">
    <mp-tab name="Option1">Option1</mp-tab>
    <mp-tab name="Option2">Option2</mp-tab>
    <mp-tab name="Option3">Option3</mp-tab>
  </mp-tabs>
</template>
```

### Modify Style

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-tabs
    elevation
    color="var(--color-primary)"
    active-color="var(--color-white)"
    inactive-color="var(--button-info-text-color)"
    v-model:active="active"
  >
    <mp-tab>Option1</mp-tab>
    <mp-tab>Option2</mp-tab>
    <mp-tab>Option3</mp-tab>
  </mp-tabs>
</template>
```

### Tab Disabled

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-tabs
    elevation
    color="var(--color-primary)"
    active-color="var(--color-white)"
    inactive-color="var(--color-white)"
    disabled-color="#aaa"
    v-model:active="active"
  >
    <mp-tab>Option1</mp-tab>
    <mp-tab>Option2</mp-tab>
    <mp-tab disabled>disabled</mp-tab>
  </mp-tabs>
</template>
```

### Enable Scroll

Start scrolling automatically when the number of tabs is `more than four`.
Click the Tab to scroll automatically to the center of the viewport.

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-tabs
    elevation
    color="var(--color-primary)"
    active-color="var(--color-white)"
    inactive-color="var(--color-white)"
    v-model:active="active"
  >
    <mp-tab>Option1</mp-tab>
    <mp-tab>Option2</mp-tab>
    <mp-tab>Option3</mp-tab>
    <mp-tab>Option4</mp-tab>
    <mp-tab>Option5</mp-tab>
    <mp-tab>Option6</mp-tab>
    <mp-tab>Option7</mp-tab>
    <mp-tab>Option8</mp-tab>
  </mp-tabs>
</template>
```

### Tab Vertical Layout

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-tabs
    elevation
    item-vertical
    color="var(--color-primary)"
    active-color="var(--color-white)"
    inactive-color="var(--color-white)"
    v-model:active="active"
  >
    <mp-tab>
      <m-icon-info-circle-fill class="tabs-example-icon" />
      <div>Option1</div>
    </mp-tab>
    <mp-tab>
      <m-icon-warning class="tabs-example-icon" />
      <div>Option2</div>
    </mp-tab>
    <mp-tab>
      <m-icon-error class="tabs-example-icon" />
      <div>Option3</div>
    </mp-tab>
  </mp-tabs>
</template>

<style>
.tabs-example-icon {
  margin-bottom: 5px;
}
</style>
```

### Tabs Vertical Layout

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-tabs
    class="tabs-example-vertical"
    elevation
    orientation="vertical"
    color="var(--color-primary)"
    active-color="var(--color-white)"
    inactive-color="var(--color-white)"
    v-model:active="active"
  >
    <mp-tab>Option1</mp-tab>
    <mp-tab>Option2</mp-tab>
    <mp-tab>Option3</mp-tab>
  </mp-tabs>
</template>

<style>
.tabs-example-vertical {
  width: 80px !important;
  height: 120px !important;
}
</style>
```

### View Relation

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-tabs
    elevation
    color="var(--color-primary)"
    active-color="var(--color-white)"
    inactive-color="var(--color-white)"
    v-model:active="active"
  >
    <mp-tab>Option1</mp-tab>
    <mp-tab>Option2</mp-tab>
    <mp-tab>Option3</mp-tab>
  </mp-tabs>

  <mp-tabs-items v-model:active="active">
    <mp-tab-item>
      The way she came into the place. I knew right then and there. there was something different about this girl.
    </mp-tab-item>
    <mp-tab-item>
      The girl was persuasive. the girl I could not trust. The girl was bad. the girl was dangerous. I never know.
    </mp-tab-item>
    <mp-tab-item>
      She's so dangerous. the girl is so dangerous. Take away my money, throw away my time. You can call me honey. but
      you're no damn good for me.
    </mp-tab-item>
  </mp-tabs-items>
</template>
```

### Affix Layout

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <div class="sticky-example">
    <mp-tabs
      sticky
      elevation
      color="var(--color-primary)"
      active-color="var(--color-white)"
      inactive-color="var(--color-white)"
      v-model:active="active"
    >
      <mp-tab>Option1</mp-tab>
      <mp-tab>Option2</mp-tab>
      <mp-tab>Option3</mp-tab>
    </mp-tabs>
  </div>
</template>

<style>
.sticky-example {
  height: 200vh;
}
</style>
```

### Indicator Position Reverse

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-tabs
    elevation
    indicator-position="reverse"
    color="var(--color-primary)"
    active-color="var(--color-white)"
    inactive-color="var(--color-white)"
    v-model:active="active"
  >
    <mp-tab>Option1</mp-tab>
    <mp-tab>Option2</mp-tab>
    <mp-tab>Option3</mp-tab>
  </mp-tabs>

  <mp-tabs
    class="tabs-example-vertical"
    elevation
    indicator-position="reverse"
    orientation="vertical"
    color="var(--color-primary)"
    active-color="var(--color-white)"
    inactive-color="var(--color-white)"
    v-model:active="active"
  >
    <mp-tab>Option1</mp-tab>
    <mp-tab>Option2</mp-tab>
    <mp-tab>Option3</mp-tab>
  </mp-tabs>
</template>

<style>
.tabs-example-vertical {
  width: 80px !important;
  height: 120px !important;
  margin-top: 20px;
}
</style>
```

## API

### Props

#### Tabs Props

| Prop               | Description                                                                  | Type     | Default      |
|--------------------|------------------------------------------------------------------------------|----------|--------------|
| `v-model:active`   | The `active` tab identifier matches `name` first, followed by `index`        | _string_ | `index`      |
| orientation | 组件整体朝向 | `horizontal \| vertical` | `horizontal` |
| `item-vertical`   | The layout direction of the tab, optional value of `horizontal` `vertical`   | _string_ | `horizontal` |
| `fixed-bottom`     | Whether fixed to the bottom of the window, can be used for bottom navigation | _boolean_ | `false`      |
| `color`            | The background color of the tabs                                             | _string_ | `-`       |
| `active-color`     | The primary color that the tab is activates                                  | _string_ | `-`    |
| `inactive-color`   | The primary color that the tab is not activated                              | _string_ | `-`    |
| `disabled-color`   | The primary color that the tab is disabled                                   | _string_ | `-`    |
| `indicator-color`  | The tab activates the color of the indicator                                 | _string_ | `-`    |
| `indicator-size`   | Tab activates the size of the indicator                                      | _string \| number_      | `2px`        |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_|   `false`    |
| `sticky`           | Whether to enable sticky layouts                                             | _boolean_ | `false`      |
| `sticky-css-mode`  | Whether to enable sticky layouts native css sticky mode                      | _boolean_ | `false`      |
| `sticky-z-index`   | Affix layouts z-index                                                       | _number_ | `10`          |
| `safe-area`        | Whether to enable bottom safe area adaptation                                | _boolean_ | `false`      |
| `offset-top`       | Distance offset top                                                          | _string \| number_      | `0`          |
| `scrollable`       | Whether to enable scrollable, optional value of `auto` `always`              | _string_ | `auto`      |
| `indicator-position` | The position of the indicator, optional value of `normal` `reverse`        | _string_ | `normal`     |
#### Tab Props

| Prop       | Description            | Type               | Default |
| ---------- | ---------------------- | ------------------ | ------- |
| `name`     | Tab's name             | _string \| number_ | `-` |
| `disabled` | Whether to disable tab | _boolean_          | `false` |
| `ripple`   | Whether to enable ripple effect | _boolean_ | `true`  |

#### TabsItems Props

| Prop             | Description                      | Type               | Default |
| ---------------- | -------------------------------- | ------------------ | ------- |
| `v-model:active` | The identity of the active tab   | _string \| number_ | `-`     |
| `can-swipe`      | Whether to allow swipe switch    | _boolean_          | `true`  |
| `animated`       | Whether to enable content switching animation | _boolean_          | `true`  |
| `loop`           | Whether to allow cycle switching | _boolean_          | `false` |

#### TabItem Props

| Prop   | Description | Type               | Default |
| ------ | ----------- | ------------------ | ------- |
| `name` | View's name | _string \| number_ | `-` |

### Methods

#### Tabs Methods

| Method   | Description                                                                         | Arguments | Return |
| -------- |-------------------------------------------------------------------------------------| --------- | ------ |
| `resize` | Call this method to redraw when a tabs changes position size                | `-`       | `-`    |
| `resizeAffix` | Call this method to redraw when a tabs sticky layouts changes position size | `-`  | `Promise<void>` |

#### TabsItems Methods

| Method     | Description                        | Arguments | Return |
| ---------- | ---------------------------------- | --------- | ------ |
| `getCarousel` | Get the `carousel` component instance | `-`       | `-`    |

### Events

#### Tabs Events

| Event    | Description                                                                         | Arguments                  |
| -------- | ----------------------------------------------------------------------------------- | -------------------------- |
| `click`  | Triggered when the tab is clicked, but not when the tab `disabled` status is `true` | `active: string \| number` |
| `change` | Triggered when switching tab                                                        | `active: string \| number` |

#### Tab Events

| Event   | Description                                                                         | Arguments                                      |
| ------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- |
| `click` | Triggered when the tab is clicked, but not when the tab `disabled` status is `true` | `active: string \| number` <br> `event: Event` |

### Slots

#### Tabs Slots

| Name | Description | SlotProps |
| --------- | ------------ | --------- |
| `default` | Tabs content | `-`       |

#### Tab Slots

| Name | Description | SlotProps |
| --------- | ------------- | --------- |
| `default` | Tab's content | `-`       |

#### TabsItems Slots

| Name | Description | SlotProps |
| --------- | ----------------- | --------- |
| `default` | TabsItems content | `-`       |

#### TabItem Slots

| Name | Description | SlotProps |
| --------- | ----------------- | --------- |
| `default` | TabItem's content | `-`       |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

#### Tabs Variables

| Variable                        | Default                |
| ------------------------------- | ---------------------- |
| `--tabs-item-horizontal-height` | `44px`                 |
| `--tabs-item-vertical-height`   | `66px`                 |
| `--tabs-radius`                 | `2px`                  |
| `--tabs-padding`                | `12px`                 |
| `--tabs-indicator-size`         | `2px`                  |
| `--tabs-indicator-border-radius`         | `0`         |
| `--tabs-indicator-background`   | `var(--color-primary)` |
| `--tabs-background`             | `#fff`                 |
| `--tabs-indicator-inner-size`             | `100%`                 |

#### Tab Variables

| Variable               | Default                      |
| ---------------------- | ---------------------------- |
| `--tab-padding`        | `12px`                       |
| `--tab-active-color`   | `var(--color-primary)`       |
| `--tab-inactive-color` | `#646566`                    |
| `--tab-disabled-color` | `var(--color-text-disabled)` |
| `--tab-font-size`      | `var(--font-size-md)`        |
| `--tab-font-weight`    | `400`                        |
| `--tab-active-font-size`      | `var(--font-size-md)`        |
| `--tab-active-font-weight`    | `400`                        |

## API

### Props

| Prop       | Description            | Type               | Default |
| ---------- | ---------------------- | ------------------ | ------- |
| `name`     | Tab's name             | _string \| number_ | `-` |
| `disabled` | Whether to disable tab | _boolean_          | `false` |
| `ripple`   | Whether to enable ripple effect | _boolean_ | `true`  |

### Events

#### Tab Events

| Event   | Description                                                                         | Arguments                                      |
| ------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- |
| `click` | Triggered when the tab is clicked, but not when the tab `disabled` status is `true` | `active: string \| number` <br> `event: Event` |

### Slots

| Name | Description | SlotProps |
| --------- | ------------- | --------- |
| `default` | Tab's content | `-`       |

## API

### Props

| Prop   | Description | Type               | Default |
| ------ | ----------- | ------------------ | ------- |
| `name` | View's name | _string \| number_ | `-` |

### Slots

| Name | Description | SlotProps |
| --------- | ----------------- | --------- |
| `default` | TabItem's content | `-`       |

## API

### Props

| Prop             | Description                      | Type               | Default |
| ---------------- | -------------------------------- | ------------------ | ------- |
| `v-model:active` | The identity of the active tab   | _string \| number_ | `-`     |
| `can-swipe`      | Whether to allow swipe switch    | _boolean_          | `true`  |
| `animated`       | Whether to enable content switching animation | _boolean_          | `true`  |
| `loop`           | Whether to allow cycle switching | _boolean_          | `false` |

### Slots

| Name | Description | SlotProps |
| --------- | ----------------- | --------- |
| `default` | TabsItems content | `-`       |

### Methods

| Method     | Description                        | Arguments | Return |
| ---------- | ---------------------------------- | --------- | ------ |
| `getCarousel` | Get the `carousel` component instance | `-`       | `-`    |
