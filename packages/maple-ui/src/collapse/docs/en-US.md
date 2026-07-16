# Collapse

### Intro

A content area which can be collapsed and expanded.

### Basic Usage

Use `v-model:active-names` to control the active panels. The value is always an array.

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref(['1'])

function handleChange(val) {
  console.log(val)
}
</script>

<template>
  <mp-collapse v-model:active-names="activeNames" @change="handleChange">
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

const activeNames = ref(['2'])
</script>

<template>
  <mp-collapse v-model:active-names="activeNames" :offset="false">
    <mp-collapse-item title="Title" name="1">Text</mp-collapse-item>
    <mp-collapse-item title="Title" name="2">Text</mp-collapse-item>
  </mp-collapse>
</template>
```

### Controlled Divider

Use `divider` prop to control the divider.

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref([])
const divider = ref(false)
</script>

<template>
  <mp-button @click="divider = !divider">
    {{ divider ? 'Hide Divider' : 'Show Divider' }}
  </mp-button>
  <mp-collapse v-model:active-names="activeNames" :divider="divider">
    <mp-collapse-item title="Title" name="1">Text</mp-collapse-item>
    <mp-collapse-item title="Title" name="2">Text</mp-collapse-item>
    <mp-collapse-item title="Title" name="3">Text</mp-collapse-item>
  </mp-collapse>
</template>
```

### Accordion Mode

Use `accordion` to enable accordion mode. `activeNames` remains an array and contains at most one item.

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref([])
</script>

<template>
  <mp-collapse v-model:active-names="activeNames" accordion :offset="false">
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

const activeNames = ref([1])
const disabled = ref(false)
</script>

<template>
  <mp-space direction="column" :size="[8, 8]">
    <mp-button @click="disabled = !disabled">
      {{ disabled ? 'Enable' : 'Disabled' }}
    </mp-button>

    <mp-collapse v-model:active-names="activeNames">
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

const activeNames = ref(['1'])
</script>

<template>
  <mp-collapse v-model:active-names="activeNames">
    <template #expand-icon="{ active }">
      <span>{{ active ? '▼' : '▶' }}</span>
    </template>
    <mp-collapse-item title="This is a Title" name="1">
      <template #extra>Extra</template>
      Text
    </mp-collapse-item>
    <mp-collapse-item name="2">
      <template #title>This is a Title</template>
      <template #expand-icon="{ active }">{{ active ? '^^' : 'vv' }}</template>
      This is a content
    </mp-collapse-item>
  </mp-collapse>
</template>
```

### Expand Icon Position

Use `expand-icon-position` to set the expand icon position.

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<template>
  <mp-collapse v-model:active-names="activeNames" expand-icon-position="left">
    <mp-collapse-item title="Title" name="1">Text</mp-collapse-item>
    <mp-collapse-item title="Title" name="2">Text</mp-collapse-item>
  </mp-collapse>
</template>
```

### Nested

Panels can be nested.

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
const nestedNames = ref(['1.1'])
</script>

<template>
  <mp-collapse v-model:active-names="activeNames" destroy-on-hide>
    <mp-collapse-item title="Title" name="1">
      <mp-collapse v-model:active-names="nestedNames" destroy-on-hide :elevation="false" :offset="false">
        <mp-collapse-item title="Title" name="1.1">Text</mp-collapse-item>
        <mp-collapse-item title="Title" name="1.2">Text</mp-collapse-item>
      </mp-collapse>
    </mp-collapse-item>
    <mp-collapse-item title="Title" name="2">Text</mp-collapse-item>
    <mp-collapse-item title="Title" name="3">Text</mp-collapse-item>
  </mp-collapse>
</template>
```

### Destroy On Hide

Use `destroy-on-hide` to destroy content after the panel collapses.

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<template>
  <mp-collapse v-model:active-names="activeNames" destroy-on-hide>
    <mp-collapse-item title="Title" name="1">Text</mp-collapse-item>
    <mp-collapse-item title="Title" name="2">Text</mp-collapse-item>
    <mp-collapse-item title="Title" name="3" :show-expand-icon="false">Text</mp-collapse-item>
  </mp-collapse>
</template>
```

### Toggle All

```html
<script setup>
import { ref } from 'vue'

const collapseRef = ref(null)
const activeNames = ref(['2', '4'])

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

  <mp-collapse v-model:active-names="activeNames" ref="collapseRef">
    <mp-collapse-item title="Title" name="1">Text</mp-collapse-item>
    <mp-collapse-item title="Title" name="2">Text</mp-collapse-item>
    <mp-collapse-item title="Title" disabled name="3">Text</mp-collapse-item>
    <mp-collapse-item title="Title" disabled name="4">Text</mp-collapse-item>
  </mp-collapse>
</template>
```

## API

### Props

#### Collapse Props

| Prop                         | Description                                                 | Type                          | Default |
| ---------------------------- | ----------------------------------------------------------- | ----------------------------- | ------- |
| `active-names` **(v-model)** | Names of current active panels                              | _(string \| number)[]_        | `-`     |
| `default-active-names`       | Default active panel names (uncontrolled)                   | _(string \| number)[]_        | `[]`    |
| `accordion`                  | Whether to be accordion mode                                | _boolean_                     | `false` |
| `elevation`                  | Elevation level, options `true` `false` and level of `0-24` | _string \| number \| boolean_ | `true`  |
| `offset`                     | Whether to show margin                                      | _boolean_                     | `true`  |
| `divider`                    | Whether to show divider                                     | _boolean_                     | `true`  |
| `expand-icon-position`       | Expand icon position                                        | _'left' \| 'right'_           | `right` |
| `show-expand-icon`           | Whether to show expand icon                                 | _boolean_                     | `-`     |
| `destroy-on-hide`            | Whether to destroy content when hidden                      | _boolean_                     | `false` |

#### CollapseItem Props

| Prop               | Description                              | Type               | Default        |
| ------------------ | ---------------------------------------- | ------------------ | -------------- |
| `name`             | Unique identifier, defaults to index     | _string \| number_ | `index`        |
| `title`            | Title                                    | _string_           | `-`            |
| `icon`             | Expand icon name                         | _string_           | `chevron-down` |
| `disabled`         | Whether to disable collapse              | _boolean_          | `false`        |
| `show-expand-icon` | Whether to show expand icon              | _boolean_          | `true`         |
| `destroy-on-hide`  | Whether to destroy content when hidden   | _boolean_          | `false`        |

### Methods

| Method      | Description               | Arguments                           | Return |
| ----------- | ------------------------- | ----------------------------------- | ------ |
| `toggleAll` | Expand or close all items | `options: CollapseToggleAllOptions` | `-`    |

### CollapseToggleAllOptions

| Option         | Description                                                                                                      | Type                   | Default |
| -------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------- | ------- |
| `expand`       | Set `'inverse'` to switch the status of all items; set `boolean` to expand or collapse all items                 | _'inverse' \| boolean_ | `-`     |
| `skipDisabled` | Skip the disabled item                                                                                           | _boolean_              | `false` |

### Events

#### Collapse Events

| Event    | Description                       | Arguments                             |
| -------- | --------------------------------- | ------------------------------------- |
| `change` | Emitted when active names changed | `activeNames: (string \| number)[]` |

### Slots

#### Collapse Slots

| Name          | Description         | SlotProps                                                              |
| ------------- | ------------------- | ---------------------------------------------------------------------- |
| `default`     | Content of collapse | `-`                                                                    |
| `expand-icon` | Expand icon         | `active: boolean`<br>`disabled: boolean`<br>`position: 'left' \| 'right'` |

#### CollapseItem Slots

| Name          | Description   | SlotProps                                                              |
| ------------- | ------------- | ---------------------------------------------------------------------- |
| `default`     | Content       | `-`                                                                    |
| `title`       | Title         | `-`                                                                    |
| `extra`       | Extra content | `-`                                                                    |
| `expand-icon` | Expand icon   | `active: boolean`<br>`disabled: boolean`<br>`position: 'left' \| 'right'` |

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
