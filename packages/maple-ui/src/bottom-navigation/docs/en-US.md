# BottomNavigation

### Intro

Display navigation and key actions at the bottom of the page.

### Basic Usage

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-bottom-navigation v-model:active="active">
    <mp-bottom-navigation-item label="label" icon="home-fill" />
    <mp-bottom-navigation-item label="label" icon="search" />
    <mp-bottom-navigation-item label="label" icon="heart-fill" />
    <mp-bottom-navigation-item label="label" icon="user-circle-fill" />
  </mp-bottom-navigation>
</template>
```

### Match By Name

```html
<script setup>
import { ref } from 'vue'

const active = ref('home-fill')
</script>

<template>
  <mp-bottom-navigation v-model:active="active">
    <mp-bottom-navigation-item name="home-fill" label="label" icon="home-fill" />
    <mp-bottom-navigation-item name="search" label="label" icon="search" />
    <mp-bottom-navigation-item name="heart-fill" label="label" icon="heart-fill" />
    <mp-bottom-navigation-item name="user" label="label" icon="user-circle-fill" />
  </mp-bottom-navigation>
</template>
```

### Show Badge

```html
<script setup>
import { ref, reactive } from 'vue'

const active = ref(0)
const badgeProps = reactive({
  type: 'primary',
  value: '66'
})
</script>

<template>
  <mp-bottom-navigation v-model:active="active">
    <mp-bottom-navigation-item label="label" icon="home-fill" />
    <mp-bottom-navigation-item label="label" icon="search" badge />
    <mp-bottom-navigation-item label="label" icon="heart-fill" :badge="badgeProps" />
    <mp-bottom-navigation-item label="label" icon="user-circle-fill" />
  </mp-bottom-navigation>
</template>
```

### Custom Color

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-bottom-navigation active-color="var(--color-warning)" v-model:active="active">
    <mp-bottom-navigation-item label="label" icon="home-fill" />
    <mp-bottom-navigation-item label="label" icon="search" />
    <mp-bottom-navigation-item label="label" icon="heart-fill" />
    <mp-bottom-navigation-item label="label" icon="user-circle-fill" />
  </mp-bottom-navigation>
</template>
```

### Change Event

```html
<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const active = ref(0)

function handleChange(active) {
  Message.info(`changed to ${active}`)
}
</script>

<template>
  <mp-bottom-navigation v-model:active="active" @change="handleChange">
    <mp-bottom-navigation-item label="label" icon="home-fill" />
    <mp-bottom-navigation-item label="label" icon="search" />
    <mp-bottom-navigation-item label="label" icon="heart-fill" />
    <mp-bottom-navigation-item label="label" icon="user-circle-fill" />
  </mp-bottom-navigation>
</template>
```

### Click Event

```html
<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const active = ref(0)

function handleClick(active) {
  Message.success(`clicked ${active}`)
}
</script>

<template>
  <mp-bottom-navigation v-model:active="active">
    <mp-bottom-navigation-item label="label" icon="home-fill" @click="handleClick" />
    <mp-bottom-navigation-item label="label" icon="search" @click="handleClick" />
    <mp-bottom-navigation-item label="label" icon="heart-fill" @click="handleClick"/>
    <mp-bottom-navigation-item label="label" icon="user-circle-fill" @click="handleClick"/>
  </mp-bottom-navigation>
</template>
```

### Fab

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
const isEven = ref(true)
</script>

<template>
  <mp-bottom-navigation
    class="bottom-navigation-example"
    v-model:active="active"
    @fab-click="isEven = !isEven"
  >
    <mp-bottom-navigation-item label="label" icon="home-fill" />
    <mp-bottom-navigation-item label="label" icon="search" />
    <mp-bottom-navigation-item label="label" icon="heart-fill" />
    <mp-bottom-navigation-item label="label" icon="bell-fill" />
    <mp-bottom-navigation-item v-if="!isEven" label="label" icon="user-circle-fill" />

    <template #fab>
      <m-icon-heart-fill />
    </template>
  </mp-bottom-navigation>
</template>

<style>
.bottom-navigation-example {   
  margin-top: 40px;
}
</style>
```

### Variant

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-bottom-navigation variant v-model:active="active">
    <mp-bottom-navigation-item label="label" icon="home-fill" />
    <mp-bottom-navigation-item label="label" icon="search" />
    <mp-bottom-navigation-item label="label" icon="heart-fill" />
    <mp-bottom-navigation-item label="label" icon="user-circle-fill" />
  </mp-bottom-navigation>
</template>
```

## API

### Props

#### BottomNavigation Props

| Prop            | Description                                         | Type | Default |
|-----------------|-----------------------------------------------------| ---- | ---- |
| `v-model:active` | Identifier of current tab                           | _number \| string_ | `0` |
| `fixed`         |  Whether to fixed bottom                            | _boolean_ | `false` |
| `border`        | Whether to show border                              | _boolean_ | `false` |
| `safe-area`       | Whether to enable bottom safe area adaptation | _boolean_ | `false` |
| `z-index`       | Z-index                                             | _number \| string_ | `1` |
| `active-color`  | Color of active tab item                            | _string_ | `-` |
| `inactive-color` | Color of inactive tab item                          | _string_ | `-` |
| `placeholder` ***3.2.11***  | Whether to generate placeholder elements of the same height at the bottom (`fixed` required)  | _boolean_ | `false` |
| `fab-props`     | Fab button props                                    | _ButtonProps_ | `{ type: 'primary' }` |
| `variant` ***3.2.0***      | Variant mode | _boolean_ | `false` |

#### BottomNavigationItem Props

|Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| `name` | Identifier | _string_ | `-` |
| `icon` | Icon name, equivalent to the [name](#/en-US/icon) of Icon component | _string_ | `-` |
| `label` | Label text content | _string_ | - |
| `namespace` | Icon namespace, extensible custom icon library, equivalent to the [namespace](#/en-US/icon)  of Icon component | _string_ | `mp-icon` |
| `badge` | Logo in the upper right corner of the icon | _boolean \| BadgeProps_ | `false` |

### Events

#### BottomNavigation Events

|Event | Description | Arguments |
| ---- | ---- | ---- |
| `before-change` | The callback function before switching labels, which returns falsy value to prevent switching, supports the return of promise | `active: number \| string` |
| `change` | Triggered when switching labels | `active: number \| string` |
| `fab-click` | Triggered when clicking fab button | `-` |

#### BottomNavigationItem Events

|Event | Description | Arguments |
| ---- | ---- | ---- |
| `click` | Triggered when clicking | `active: number \| string` |

### Slots

#### BottomNavigation Slots

| Name | Description                                                | SlotProps |
| ---- |------------------------------------------------------------| ----|
| `default` | Content of bottom navigation                               | `-` |
| `fab` | Support for inserting a custom Fab button into a component | `-` |

#### BottomNavigationItem Slots

| Name | Description | SlotProps |
| ---- | ---- | ----|
| `default` | Custom label text content that overwrites the content of `label`  | `-` |
| `icon` | Custom Icon | `active: boolean` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

#### BottomNavigation Variables

| Variable | Default |
| --- | --- |
| `--bottom-navigation-height` | `50px` |
| `--bottom-navigation-variant-height` | `66px` |
| `--bottom-navigation-z-index` | `1` |
| `--bottom-navigation-background-color` | `var(--color-fill-2)` |
| `--bottom-navigation-border-color` | `var(--color-border-2)` |
| `--bottom-navigation-fab-offset` | `4px` |

#### BottomNavigationItem Variables

| Variable | Default |
| --- | --- |
| `--bottom-navigation-item-font-size` | `var(--font-size-sm)` |
| `--bottom-navigation-item-inactive-color` | `#646566` |
| `--bottom-navigation-item-active-color` | `var(--color-primary)` |
| `--bottom-navigation-item-active-background-color` | `var(--color-fill-2)` |
| `--bottom-navigation-item-line-height` | `1` |
| `--bottom-navigation-item-icon-size` | `22px` |
| `--bottom-navigation-item-icon-margin-bottom` | `5px` |
| `--bottom-navigation-fab-border-radius` | `50%` |
| `--bottom-navigation-item-variant-icon-container-height` | `30px` |
| `--bottom-navigation-item-variant-icon-container-border-radius` | `100px` |
| `--bottom-navigation-item-variant-icon-container-max-width` | `58px` |
| `--bottom-navigation-item-variant-active-background-color` | `var(--color-primary)` |
| `--bottom-navigation-item-variant-active-color` | `var(--color-white)` |

### Props

| Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| `name` | Identifier | _string_ | `-` |
| `icon` | Icon name, equivalent to the [name](/#/en-US/icon) of Icon component | _string_ | `-` |
| `label` | Label text content | _string_ | - |
| `badge` | Logo in the upper right corner of the icon | _boolean \| BadgeProps_ | `false` |

### Events

| Event | Description | Arguments |
| ---- | ---- | ---- |
| `click` | Triggered when clicking | `active: number \| string` |

### Slots

| Name | Description | SlotProps |
| ---- | ---- | ----|
| `default` | Custom label text content that overwrites the content of `label`  | `-` |
| `icon` | Custom Icon | `active: boolean` |

