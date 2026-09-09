# TabBar

### Intro

Display navigation and key actions at the bottom of the page.

### Basic Usage

```html
<script setup>
import { IconHeartFill as MIconHeartFill, IconHomeFill as MIconHomeFill, IconSearch as MIconSearch, IconUserCircleFill as MIconUserCircleFill } from '@maplejs/icons-vue'
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-tab-bar v-model:active="active">
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-home-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-search /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-heart-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### Match By Name

```html
<script setup>
import { IconHeartFill as MIconHeartFill, IconHomeFill as MIconHomeFill, IconSearch as MIconSearch, IconUserCircleFill as MIconUserCircleFill } from '@maplejs/icons-vue'
import { ref } from 'vue'

const active = ref('home-fill')
</script>

<template>
  <mp-tab-bar v-model:active="active">
    <mp-tab-bar-item name="home-fill" label="label">
      <template #icon><mp-icon :size="22"><m-icon-home-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item name="search" label="label">
      <template #icon><mp-icon :size="22"><m-icon-search /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item name="heart-fill" label="label">
      <template #icon><mp-icon :size="22"><m-icon-heart-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item name="user" label="label">
      <template #icon><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### Show Badge

TabBar badges default to size xs and extend outside the top-right edge of the icon. The badge object can override size, position, offsetX and offsetY. Dots, counts and max are supported in both standard and variant modes.

```html
<script setup>
import { IconHeartFill as MIconHeartFill, IconHomeFill as MIconHomeFill, IconSearch as MIconSearch, IconUserCircleFill as MIconUserCircleFill } from '@maplejs/icons-vue'
import { ref, reactive } from 'vue'

const active = ref(0)
const variant = ref(false)
const badgeProps = reactive({
  status: 'primary',
  content: '66'
})
</script>

<template>
  <mp-switch v-model="variant" />
  <mp-tab-bar v-model:active="active" :variant="variant">
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-home-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label" badge>
      <template #icon><mp-icon :size="22"><m-icon-search /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label" :badge="badgeProps">
      <template #icon><mp-icon :size="22"><m-icon-heart-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label" :badge="{ content: 125, max: 99 }">
      <template #icon><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### Custom Color

```html
<script setup>
import { IconHeartFill as MIconHeartFill, IconHomeFill as MIconHomeFill, IconSearch as MIconSearch, IconUserCircleFill as MIconUserCircleFill } from '@maplejs/icons-vue'
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-tab-bar active-color="var(--mp-color-warning)" v-model:active="active">
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-home-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-search /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-heart-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### Change Event

```html
<script setup>
import { IconHeartFill as MIconHeartFill, IconHomeFill as MIconHomeFill, IconSearch as MIconSearch, IconUserCircleFill as MIconUserCircleFill } from '@maplejs/icons-vue'
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const active = ref(0)

function handleChange(active) {
  Message.info(`changed to ${active}`)
}
</script>

<template>
  <mp-tab-bar v-model:active="active" @change="handleChange">
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-home-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-search /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-heart-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### Click Event

```html
<script setup>
import { IconHeartFill as MIconHeartFill, IconHomeFill as MIconHomeFill, IconSearch as MIconSearch, IconUserCircleFill as MIconUserCircleFill } from '@maplejs/icons-vue'
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const active = ref(0)

function handleClick(active) {
  Message.success(`clicked ${active}`)
}
</script>

<template>
  <mp-tab-bar v-model:active="active">
    <mp-tab-bar-item label="label" @click="handleClick">
      <template #icon><mp-icon :size="22"><m-icon-home-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label" @click="handleClick">
      <template #icon><mp-icon :size="22"><m-icon-search /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label" @click="handleClick">
      <template #icon><mp-icon :size="22"><m-icon-heart-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label" @click="handleClick">
      <template #icon><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### Fab

Use the floating button for a primary action such as creating a post, taking a photo or adding an item. The plus button opens the composer without changing the selected tab.

The button is centered for an even number of tabs and right aligned for an odd number. Use the separate control to compare these layouts.

```html
<script setup>
import { IconBellFill as MIconBellFill, IconHeartFill as MIconHeartFill, IconHomeFill as MIconHomeFill, IconPlus as MIconPlus, IconSearch as MIconSearch, IconUserCircleFill as MIconUserCircleFill } from '@maplejs/icons-vue'
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const active = ref(0)
const isEven = ref(true)
const composerOpen = ref(false)
const draft = ref('')
</script>

<template>
  <mp-space wrap role="group" :aria-label="'Floating button placement'">
    <mp-button :variant="isEven ? 'default' : 'outline'" :aria-pressed="isEven" @click="isEven = true">4 tabs: centered</mp-button>
    <mp-button :variant="isEven ? 'outline' : 'default'" :aria-pressed="!isEven" @click="isEven = false">5 tabs: right aligned</mp-button>
  </mp-space>
  <mp-tab-bar
    v-model:active="active"
    style="margin-top: 40px"
    :fab-props="{ 'aria-label': 'Create post' }"
    @fab-click="composerOpen = true"
  >
    <template #fab><mp-icon :size="24"><m-icon-plus /></mp-icon></template>
    <mp-tab-bar-item :label="'Home'">
      <template #icon><mp-icon :size="22"><m-icon-home-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="'Explore'">
      <template #icon><mp-icon :size="22"><m-icon-search /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="'Saved'">
      <template #icon><mp-icon :size="22"><m-icon-heart-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="'Inbox'">
      <template #icon><mp-icon :size="22"><m-icon-bell-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item v-if="!isEven" :label="'Profile'">
      <template #icon><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
  <mp-dialog
    v-model:open="composerOpen"
    :title="'Create post'"
    :confirm-button-text="'Create post'"
    @confirm="Message.success('Post action demo completed'); draft = ''"
  >
    <p>This is an interaction demo. Nothing is sent to a server.</p>
    <mp-textarea v-model="draft" :placeholder="'Share your thoughts'" :aria-label="'Share your thoughts'" />
  </mp-dialog>
</template>
```

### Variant

```html
<script setup>
import { IconHeartFill as MIconHeartFill, IconHomeFill as MIconHomeFill, IconSearch as MIconSearch, IconUserCircleFill as MIconUserCircleFill } from '@maplejs/icons-vue'
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-tab-bar variant v-model:active="active">
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-home-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-search /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-heart-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="label">
      <template #icon><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### Uncontrolled selection

```html
<script setup>
</script>
<template>
  <p>No v-model is needed. Saved is initially selected and tabs update on click. default-active is read only during initialization.</p>
  <mp-tab-bar default-active="favorites">
    <mp-tab-bar-item name="home" :label="'Home'" />
    <mp-tab-bar-item name="favorites" :label="'Saved'" />
    <mp-tab-bar-item name="profile" :label="'Profile'" />
  </mp-tab-bar>
</template>
```

### Numeric names and reordering

```html
<script setup>
import { ref } from 'vue'
const active = ref(0)
const reversed = ref(false)
</script>
<template>
  <p>Names 0, 10 and 20 are stable identifiers. Reordering preserves the selected name instead of selecting by position.</p>
  <mp-button @click="reversed = !reversed">Reverse order</mp-button>
  <mp-tab-bar v-model:active="active">
    <mp-tab-bar-item v-for="id in (reversed ? [20, 10, 0] : [0, 10, 20])" :key="id" :name="id" :label="String(id)" />
  </mp-tab-bar>
  <p aria-live="polite">Selected: {{ active }}</p>
</template>
```

### Custom selected label

```html
<script setup>
import { ref } from 'vue'
const active = ref('home')
const labels = {'home': 'Home', 'favorites': 'Saved', 'profile': 'Profile'}
</script>
<template>
  <p>The default slot receives active for changing label weight and markers.</p>
  <mp-tab-bar v-model:active="active">
    <mp-tab-bar-item v-for="name in ['home', 'favorites', 'profile']" :key="name" :name="name">
      <template #default="{ active: selected }">
        <span :style="{ fontWeight: selected ? 700 : 400 }">{{ selected ? '● ' : '' }}{{ labels[name] }}</span>
      </template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### Async selection guards

```html
<script setup>
import { ref } from 'vue'
const active = ref(0)
async function beforeChange(value) {
  if (value === 3) return false
  if (value === 4) throw new Error('Demo: rejected selection')
  await new Promise(resolve => setTimeout(resolve, value === 1 ? 1200 : 250))
  return true
}
</script>
<template>
  <p>Click Slow (1.2s), then Fast (0.25s): only Fast is selected. Denied and Error preserve the current selection. Click the current tab to cancel a pending switch.</p>
  <mp-tab-bar v-model:active="active" :before-change="beforeChange">
    <mp-tab-bar-item :label="'Home'" />
    <mp-tab-bar-item :label="'Slow'" />
    <mp-tab-bar-item :label="'Fast'" />
    <mp-tab-bar-item :label="'Denied'" />
    <mp-tab-bar-item :label="'Error'" />
  </mp-tab-bar>
  <p aria-live="polite">Selected: {{ active }}</p>
</template>
```

## API

### Props

#### TabBar Props

| Prop            | Description                                         | Type | Default |
|-----------------|-----------------------------------------------------| ---- | ---- |
| `v-model:active` | Selected name or index; controlled when provided | _number \| string_ | `undefined` |
| `default-active` | Initial uncontrolled selection; read once | _number \| string_ | `0` |
| `before-change` | Guard selection; truthy permits, falsy/throw/rejection cancels. Only the latest request may commit | _(active: number \| string) => boolean \| Promise&lt;boolean&gt;_ | `-` |
| `fixed`         |  Whether to fixed bottom                            | _boolean_ | `false` |
| `border`        | Whether to show border                              | _boolean_ | `false` |
| `safe-area`       | Whether to enable bottom safe area adaptation | _boolean_ | `false` |
| `z-index`       | Z-index                                             | _number \| string_ | `1` |
| `active-color`  | Color of active tab item                            | _string_ | `-` |
| `inactive-color` | Color of inactive tab item                          | _string_ | `-` |
| `placeholder` ***3.2.11***  | Whether to generate placeholder elements of the same height at the bottom (`fixed` required)  | _boolean_ | `false` |
| `fab-props`     | Fab button props                                    | _ButtonProps_ | `{ status: 'primary' }` |
| `variant` ***3.2.0***      | Variant mode | _boolean_ | `false` |

Without active, selection is maintained internally. When active is provided, updates are emitted to the caller. Releasing control retains the last controlled value. Explicit numeric names take precedence over unnamed item indices; named items are never matched by index.

#### TabBarItem Props

|Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| `name` | Identifier | _number \| string_ | `-` |
| `icon` | Icon name, equivalent to the [name](#/en-US/icon) of Icon component | _string_ | `-` |
| `label` | Label text content | _string_ | - |
| `badge` | Logo in the upper right corner of the icon | _boolean \| BadgeProps_ | `false` |

### Events

#### TabBar Events

|Event | Description | Arguments |
| ---- | ---- | ---- |
| `change` | Triggered when switching labels | `active: number \| string` |
| `fab-click` | Triggered when clicking fab button | `-` |

#### TabBarItem Events

|Event | Description | Arguments |
| ---- | ---- | ---- |
| `click` | Triggered when clicking | `active: number \| string` |

### Slots

#### TabBar Slots

| Name | Description                                                | SlotProps |
| ---- |------------------------------------------------------------| ----|
| `default` | Content of bottom navigation                               | `-` |
| `fab` | Support for inserting a custom Fab button into a component | `-` |

#### TabBarItem Slots

| Name | Description | SlotProps |
| ---- | ---- | ----|
| `default` | Custom label text content that overwrites the content of `label`  | `active: boolean` |
| `icon` | Custom Icon | `active: boolean` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

#### TabBar Variables

| Variable | Default |
| --- | --- |
| `--mp-tab-bar-height` | `50px` |
| `--mp-tab-bar-variant-height` | `66px` |
| `--mp-tab-bar-z-index` | `1` |
| `--mp-tab-bar-background-color` | `var(--mp-color-bg-2)` |
| `--mp-tab-bar-border-color` | `var(--color-border-2)` |
| `--mp-tab-bar-fab-offset` | `4px` |

#### TabBarItem Variables

| Variable | Default |
| --- | --- |
| `--mp-tab-bar-item-font-size` | `var(--font-size-sm)` |
| `--mp-tab-bar-item-inactive-color` | `var(--mp-color-text-2)` |
| `--mp-tab-bar-item-active-color` | `var(--color-primary)` |
| `--mp-tab-bar-item-active-background-color` | `transparent` |
| `--mp-tab-bar-item-line-height` | `1` |
| `--mp-tab-bar-item-icon-size` | `22px` |
| `--mp-tab-bar-item-icon-margin-bottom` | `5px` |
| `--mp-tab-bar-fab-border-radius` | `50%` |
| `--mp-tab-bar-item-variant-icon-container-height` | `30px` |
| `--mp-tab-bar-item-variant-icon-container-border-radius` | `100px` |
| `--mp-tab-bar-item-variant-icon-container-max-width` | `58px` |
| `--mp-tab-bar-item-variant-active-background-color` | `color-mix(in srgb, var(--mp-color-primary) 14%, var(--mp-tab-bar-background-color))` |
| `--mp-tab-bar-item-variant-active-color` | `var(--mp-color-primary)` |

### Props

| Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| `name` | Identifier | _number \| string_ | `-` |
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
| `default` | Custom label text content that overwrites the content of `label`  | `active: boolean` |
| `icon` | Custom Icon | `active: boolean` |

