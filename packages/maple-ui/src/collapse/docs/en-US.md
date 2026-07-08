# Collapse

### Intro

A content area which can be collapsed and expanded.

### Basic Usage

Use `v-model` to control the name of active panels. `value` is an Array.

```html
<script setup>
import { ref } from 'vue'

const value = ref(['1'])

function handleChange(val) {
  console.log(val)
}
</script>

<template>
  <mp-collapse v-model="value" @change="handleChange">
    <mp-collapse-item title="Title" name="1">Text</mp-collapse-item>
    <mp-collapse-item title="Title" name="2">Text</mp-collapse-item>
  </mp-collapse>
</template>
```

### Hide Margin

Use `offset` prop to hide the margin.

```html
<script setup>
import { ref } from 'vue'

const value = ref(['2'])
</script>

<template>
  <mp-collapse v-model="value" :offset="false">
    <mp-collapse-item title="Title" name="1">Text</mp-collapse-item>
    <mp-collapse-item title="Title" name="2">Text</mp-collapse-item>
  </mp-collapse>
</template>
```

### Controlled Divider

Use `divider` prop to hide the divider.

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
const divider = ref(false)
</script>

<template>
  <mp-button @click="divider = !divider">
    {{ divider ? 'Hide Divider' : 'Show Divider' }}
  </mp-button>
  <mp-collapse v-model="value" :divider="divider">
    <mp-collapse-item title="Title" name="1">Text</mp-collapse-item>
    <mp-collapse-item title="Title" name="2">Text</mp-collapse-item>
    <mp-collapse-item title="Title" name="3">Text</mp-collapse-item>
  </mp-collapse>
</template>
```


### Accordion Mode

Use the `accordion` property to enable accordion mode. `value` can be a string or a number.

```html
<script setup>
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <mp-collapse v-model="value" accordion :offset="false">
    <mp-collapse-item title="Title" name="1">Text</mp-collapse-item>
    <mp-collapse-item title="Title" name="2">Text</mp-collapse-item>
  </mp-collapse>
</template>
```

### Disabled

Use the `disabled` prop to disable CollapseItem.

```html
<script setup>
import { ref } from 'vue'

const value = ref([1])
const disabled = ref(false)  
</script>

<template>
  <mp-space direction="column" :size="[8, 8]">
    <mp-button @click="disabled = !disabled">
      {{ disabled ? 'enable' : 'disable' }}
    </mp-button>
    
    <mp-collapse v-model="value">
      <mp-collapse-item title="Title" :name="1" :disabled="disabled">
        Text
      </mp-collapse-item>
      <mp-collapse-item title="Title" :name="2" :disabled="disabled">
        Text
      </mp-collapse-item>
    </mp-collapse>
  </mp-space>
</template>
```

### Custom Content

```html
<script setup>
import { ref } from 'vue'

const value = ref(['1'])  
</script>

<template>
  <mp-collapse v-model="value">
    <mp-collapse-item title="This is a Title" name="1" icon="account-circle">
      Text
    </mp-collapse-item>
    <mp-collapse-item name="2">
      <template #title>This is a Title</template>
      <template #icon>^_^</template>
      This is a content
    </mp-collapse-item>
  </mp-collapse>
</template>
```

### Toggle All

```html
<script setup>
import { ref } from 'vue'

const collapseRef = ref(null)
const toggleAllValue = ref(['2', '4'])  

function toggleAll() {
  collapseRef.value.toggleAll({ expand: 'inverse' })
}

function toggleAllSkipDisabled() {
  collapseRef.value.toggleAll({ expand: 'inverse', skipDisabled: true })
}

function openAll() {
  collapseRef.value.toggleAll({ expand: true })
}

function openAllSkipDisabled() {
  collapseRef.value.toggleAll({ expand: true, skipDisabled: true })
}

function closeAll() {
  collapseRef.value.toggleAll({ expand: false })
}

function closeAllSkipDisabled() {
  collapseRef.value.toggleAll({ expand: false, skipDisabled: true })
}
</script>

<template>
  <mp-button @click="toggleAll" style="margin: 8px">Toggle All</mp-button>
  <mp-button @click="toggleAllSkipDisabled" style="margin: 8px">
    Toggle All(Skip Disabled)
  </mp-button>
  <mp-button @click="openAll" style="margin: 8px">Open All</mp-button>
  <mp-button @click="openAllSkipDisabled" style="margin: 8px">
    Open All(Skip Disabled)
  </mp-button>
  <mp-button @click="closeAll" style="margin: 8px">Close All</mp-button>
  <mp-button @click="closeAllSkipDisabled" style="margin: 8px">
    Close All(Skip Disabled)
  </mp-button>

  <mp-collapse v-model="toggleAllValue" ref="collapseRef">
    <mp-collapse-item title="title" name="1">This is a content.</mp-collapse-item>
    <mp-collapse-item title="title" name="2">This is a content.</mp-collapse-item>
    <mp-collapse-item title="title" disabled name="3">This is a content.</mp-collapse-item>
    <mp-collapse-item title="title" disabled name="4">This is a content.</mp-collapse-item>
  </mp-collapse>
</template>
```

## API

### Props

#### Collapse Props

| Prop        | Description                                                 | Type                                                                                | Default |
| ----------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------- |
| `v-model`   | Names of current active panels                              | accordion mode： _string \| number_ <br> non-accordion mode：_string[] \| number[]_ | `-`     |
| `accordion` | Whether to be accordion mode                                | _boolean_                                                                           | `false` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _string \| number \| boolean_                                                       | `true`  |
| `offset`    | Whether to show margin                                      | _boolean_                                                                           | `true`  |
| `divider`   | Whether to show divider                                     | _boolean_                                                                           | `true`  |

#### CollapseItem Props

| Prop       | Description                 | Type               | Default        |
| ---------- | --------------------------- | ------------------ | -------------- |
| `name`     | Unique identifier, defaults to index value       | _string \| number_ | `index`        |
| `title`    | Title                       | _string \| number_ | `-`            |
| `icon`     | Icon name                   | _string_           | `chevron-down` |
| `disabled` | Whether to disable collapse | _boolean_          | `false`        |

### Methods

| Method      | Description                                                                                                                                          | Arguments                 | Return                               |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------ |
| `toggleAll` | Expand or close all items | `options: CollapseToggleAllOptions` | `-` |

### CollapseToggleAllOptions

| Option              | Description                      | Type               | Default |
| ---- | ---- | ---- | ------ |
| `expand` | Set `'inverse'` to switch the status of all items, including disabled items; set `boolean` to control the expansion or collapse of all items | _'inverse' \| boolean_ | `-` |
| `skipDisabled` | Skip the disabled item | _boolean_ | `false` |

### Events

#### Collapse Events

| Event    | Description                       | arguments |
| -------- | --------------------------------- | --------- |
| `change` | Emitted when active index changed | `value`   |


### Slots

#### Collapse Slots

| Name      | Description         | SlotProps |
| --------- | ------------------- | --------- |
| `default` | Content of collapse | `-`       |

#### CollapseItem Slots

| Name      | Description       | SlotProps |
| --------- | ----------------- | --------- |
| `default` | Content           | `-`       |
| `title`   | Title             | `-`       |
| `icon`    | Custom right icon | `-`       |

### Style Variables
Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                       | Default                          |
| ------------------------------ | -------------------------------- |
| `--collapse-background`        | `var(--color-surface-container-highest)`                           |
| `--collapse-text-color`        | `#232222`                        |
| `--collapse-header-font-size`  | `var(--font-size-lg)`            |
| `--collapse-header-padding`    | `10px 12px`                      |
| `--collapse-content-font-size` | `var(--font-size-md)`            |
| `--collapse-content-padding`   | `0 12px 10px`                    |
| `--collapse-item-margin-top`   | `16px`                           |
| `--collapse-disable-color`     | `#bdbdbd`                        |
| `--collapse-border-top`        | `thin solid var(--color-outline)`|
