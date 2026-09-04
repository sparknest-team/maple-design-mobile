# Rate

### Intro

Used to rate things.

### Basic Usage

```html
<script setup>
import { ref } from 'vue'

const score = ref(3)
</script>

<template>
  <mp-rate v-model="score"/>
  <mp-rate v-model="score" icon="thumb-up-fill" empty-icon="thumb-up"/>
</template>
```

### Customize Total Rating

Set the total rating through the `count` attribute.

```html
<script setup>
import { ref } from 'vue'

const score = ref(3)
</script>

<template>
  <mp-rate v-model="score" :count="8"/>
</template>
```

### Customize Rating Icon Style

Set the selected and unselected icons through the `icon` and `empty-icon` properties.
Set the selected and unselected colors through the `color` and `empty-color` properties.

```html
<script setup>
import { ref } from 'vue'

const score = ref(3)
</script>

<template>
  <mp-rate
    icon="heart-fill" 
    empty-icon="heart" 
    color="red" 
    empty-color="red"
    v-model="score"
  />
</template>
```

### Customize Rating Icon Size And Gap

Use the `size` property to set the size of the score icon.
Set the interval between scores via the `gap` property.

```html
<script setup>
import { ref } from 'vue'

const score = ref(3)
</script>

<template>
  <mp-rate v-model="score" :size="28" :gap="8"/>
</template>
```

### Allow Half Rating

The `allow-half` attribute is used to set the rating to semi selective, and the `half-icon` attribute is used to set the style of semi selective.

```html
<script setup>
import { ref } from 'vue'

const score = ref(3.5)
</script>

<template>
  <mp-rate allow-half :count="8" v-model="score" />
  <mp-rate
    allow-half
    icon="heart-fill"
    half-icon="heart-half-full"
    empty-icon="heart"
    color="red"
    :count="8"
    v-model="score"
  />
</template>
```

### Disabled And Readonly

The `disabled` property sets the score to the no-click state, and `disabled-color` sets the icon color when disabled.
The score is set to read-only via the `readonly` property.

```html
<script setup>
import { ref } from 'vue'

const score = ref(3)
</script>

<template>
<mp-rate v-model="score" disabled/>
<mp-rate v-model="score" readonly/>
</template>
```

### Can Be Cleared

The `clearable` property allows users to clear score.

```html
<script setup>
import { ref } from 'vue'

const score = ref(3.5)
</script>

<template>
  <mp-rate v-model="score" clearable allow-half/>
</template>
```

### Listen Event

Other interaction logic is completed by calling the `change` event.

```html
<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const score = ref(3)

function handleChange(score) {
  Message({
    content: `click ${score}`,
    position: 'top'
  })
}
</script>

<template>
  <mp-rate v-model="score" @change="handleChange"/>
</template>
```

> For form validation of the rate, please use the [FormItem component](#/en-US/form-item).

## API

### props

| Prop             | Description | Type | Default | 
|------------------| ---- | ---- | ---- |
| `v-model`        | The current rating  | _number_ | `0` |
| `count`          | Total rating  | _number \| string_ | `5` |
| `color`          | The color of the icon when selected  | _string_ | `-` |
| `icon`           | The icon style when the entire icon is selected  | _string_ | `star` |
| `empty-color`    | The color of the icon when unchecked | _string_ | `#bdbdbd` |
| `empty-icon`     | Style of the icon when unchecked | _string_ | `star` |
| `size`           | Icon size, default unit is `px` | _number \| string_ | `-` |
| `gap`            | Icon spacing, default unit is `px` | _number \| string_ | `-` |
| `allow-half`           | Whether half selection is allowed | _boolean_ | `false` |
| `half-icon`      | The half-selected icon style only works if `allow-half` is `true` | _string_ | `star-half-full` |
| `disabled`       | Whether to disable rating | _boolean_ | `false` |
| `disabled-color` | The color of the icon when disabling grading is only effective when `disabled` is `true` and has higher priority than `color` and `empty-color` | _string_ | `-` |
| `readonly`       | Whether it is in readonly status. The rating cannot be modified in readonly status. | _boolean_ | `false` |
| `clearable`      | whether to allow to clear | _boolean_ | `false` |
| `ripple`         | Whether to use water ripple | _boolean_ | `true` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `change` | Triggered when the rating changes | `value: number` |

### Style Variables
Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default                      |
| --- |------------------------------|
| `--rate-color` | `var(--color-text)`          |
| `--rate-size` | `24px` |
| `--rate-primary-color` | `var(--color-primary)`       |
| `--rate-disabled-color` | `var(--color-text-disabled)` |
| `--rate-error-color` | `var(--color-danger)`        |
| `--rate-action-padding` | `4px`                        |
