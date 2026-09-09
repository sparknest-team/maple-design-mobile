# Switch

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

## Examples

### Controlled and default value

```html
<script setup lang="ts">
import { ref } from 'vue'
const enabled = ref(false)
</script>

<template>
  <mp-space wrap
    ><mp-switch v-model="enabled" aria-label="Enable notifications" /><output>{{ enabled }}</output
    ><mp-switch default-checked aria-label="Initially enabled"
  /></mp-space>
</template>
```

### Four variants

```html
<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'md3'] as const
</script>

<template>
  <mp-space wrap
    ><label v-for="variant in variants" :key="variant"
      >{{ variant }} <mp-switch :variant="variant" :aria-label="variant" /></label
  ></mp-space>
</template>
```

### Three sizes

```html
<script setup lang="ts">
const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <mp-space wrap
    ><label v-for="size in sizes" :key="size">{{ size }} <mp-switch :size="size" :aria-label="size" /></label
  ></mp-space>
</template>
```

### Disabled

```html
<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'md3'] as const
</script>

<template>
  <mp-space wrap
    ><template v-for="variant in variants" :key="variant"
      ><mp-switch :variant="variant" disabled :aria-label="variant + ' off'" /><mp-switch
        :variant="variant"
        default-checked
        disabled
        :aria-label="variant + ' on'" /></template
  ></mp-space>
</template>
```

### Read only

```html
<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'md3'] as const
</script>

<template>
  <mp-space wrap
    ><template v-for="variant in variants" :key="variant"
      ><mp-switch :variant="variant" readonly :aria-label="variant + ' off'" /><mp-switch
        :variant="variant"
        default-checked
        readonly
        :aria-label="variant + ' on'" /></template
  ></mp-space>
</template>
```

### Loading

```html
<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'md3'] as const
</script>

<template>
  <mp-space wrap
    ><template v-for="variant in variants" :key="variant"
      ><mp-switch :variant="variant" loading :aria-label="variant + ' off'" /><mp-switch
        :variant="variant"
        default-checked
        loading
        :aria-label="variant + ' on'" /></template
  ></mp-space>
</template>
```

### Custom colors

```html
<script setup lang="ts">
import { ref } from 'vue'
const enabled = ref(false)
</script>

<template>
  <mp-switch
    v-model="enabled"
    checked-color="#005f73"
    unchecked-color="#9b2226"
    aria-label="Custom color switch"
  />
</template>
```

### Custom text

```html
<template>
  <mp-space wrap
    ><mp-switch checked-text="ON" unchecked-text="OFF" aria-label="Text props" /><mp-switch
      variant="round"
      aria-label="Text slots"
      ><template #checked>ON</template><template #unchecked>OFF</template></mp-switch
    ></mp-space
  >
</template>
```

### Custom icons

```html
<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'md3'] as const
</script>

<template>
  <mp-space wrap
    ><mp-switch v-for="variant in variants" :key="variant" :variant="variant" :aria-label="variant"
      ><template #checked-icon>✓</template><template #unchecked-icon>×</template></mp-switch
    ></mp-space
  >
</template>
```

### Ripple and handle elevation

```html
<template>
  <mp-space wrap
    ><mp-switch :ripple="false" :handle-elevation="false" aria-label="No ripple or shadow" /><mp-switch
      :handle-elevation="4"
      aria-label="Elevated handle"
  /></mp-space>
</template>
```

### Custom values and events

```html
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('disabled')
const lastChange = ref('—')
</script>

<template>
  <mp-space direction="column"
    ><mp-switch
      v-model="value"
      checked-value="enabled"
      unchecked-value="disabled"
      aria-label="String value"
      @change="lastChange = String($event)"
    /><output aria-live="polite">Value: {{ value }}; change: {{ lastChange }}</output></mp-space
  >
</template>
```

### Async allow, deny and rejection

```html
<script setup lang="ts">
import { ref } from 'vue'
const result = ref('Ready')
const wait = () => new Promise<void>((resolve) => setTimeout(resolve, 500))
async function allow() {
  await wait()
  result.value = 'Allowed'
  return true
}
async function deny() {
  await wait()
  result.value = 'Blocked'
  return false
}
async function reject() {
  await wait()
  result.value = 'Rejected'
  throw new Error('Demo rejection')
}
</script>

<template>
  <mp-space direction="column">
    <label>Allow after 500ms <mp-switch :before-change="allow" aria-label="Async allow" /></label>
    <label>Return false <mp-switch :before-change="deny" aria-label="Async deny" /></label>
    <label>Reject Promise <mp-switch :before-change="reject" aria-label="Async rejection" /></label>
    <output aria-live="polite">{{ result }}</output>
  </mp-space>
</template>
```

### Focus and event order

```html
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(false)
const events = ref<string[]>([])
function record(name: string) {
  events.value = [...events.value.slice(-7), name]
}
</script>

<template>
  <p>Use Tab to focus, then Space or Enter to toggle.</p>
  <mp-switch
    v-model="value"
    size="md"
    aria-label="Event sequence"
    @focus="record('focus')"
    @blur="record('blur')"
    @click="record('click')"
    @update:model-value="record(`update: ${$event}`)"
    @change="record(`change: ${$event}`)"
  />
  <p aria-live="polite">{{ events.join(' → ') || 'No events yet' }}</p>
  <mp-button @click="events = []">Clear events</mp-button>
</template>
```

## API

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value | Controlled value; omit for internal state | string / number / boolean | undefined |
| default-checked | Initial uncontrolled checked state; initialization only | boolean | false |
| checked-value | Checked value | string / number / boolean | true |
| unchecked-value | Unchecked value | string / number / boolean | false |
| variant | Appearance | circle / round / line / md3 | circle |
| size | Size; omitted value follows platform rules below | sm / md / lg | undefined |
| disabled | Disable interaction, including inherited form disabled state | boolean | false |
| readonly | Read only; focus and click remain available without toggling | boolean | false |
| loading | Loading; blocks clicks and changes | boolean | false |
| before-change | Change interceptor, not an event | (nextValue: SwitchValue) => boolean / void / Promise<boolean / void> | — |
| checked-text | Checked label | string | — |
| unchecked-text | Unchecked label | string | — |
| checked-color | Checked track color | string | — |
| unchecked-color | Unchecked track color | string | — |
| loading-color | Spinner color | string | — |
| ripple | Click ripple | boolean | true |
| handle-elevation | Thumb shadow; true means level 2; numbers are truncated and clamped to 0–24 | boolean / number | true |

### Events

| Event | Arguments and timing |
| --- | --- |
| click | `(event: Event)`, before interception |
| update:model-value | `(nextValue: SwitchValue)`, before change after an accepted toggle |
| change | `(nextValue: SwitchValue, event: Event)`, once per committed toggle |
| focus | `(event: FocusEvent)`, when focused |
| blur | `(event: FocusEvent)`, when blurred |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| checked | Checked label; overrides checked-text; hidden for line/sm | — |
| unchecked | Unchecked label; overrides unchecked-text; hidden for line/sm | — |
| checked-icon | Checked thumb icon; replaced while loading | — |
| unchecked-icon | Unchecked thumb icon; replaced while loading | — |

### Methods

No public methods.

### Platform notes

Props, event arguments and slots match. Cedar inherits form/global size (xs/sm map to sm, lg/xl to lg); Maple defaults to md. Both inherit form disabled state; Maple also inherits Form readonly, while Cedar uses component readonly. Platform form adapters remain distinct.

before-change returning false, throwing or rejecting cancels the toggle; other successful results allow it. Pending promises enable loading and block duplicate input. Unmounting, KeepAlive deactivation, external value updates and disabled/readonly/loading changes invalidate pending results. Controlled state changes only when the parent updates model-value. External updates do not emit change. Enter and Space toggle without key-repeat changes. Disabled/loading suppress click and changes; readonly permits click without running the interceptor.
<!-- same-source-api:end -->

## Types and styling

Root and component entries export SwitchProps, SwitchVariant, SwitchSize, SwitchValue, SwitchBeforeChange and SwitchInstance.
Tokens use --mp-switch-* (Cedar: --c-switch-*). width/height/handle-size default to 40/24/16px; md3-width/md3-height/md3-handle-size to 52/32/24px.
size-sm-scale=.8, size-lg-scale=1.2; hit-area=0px expands the click target without altering layout. Full tokens are in style/token.less.

## Migration

Maple standard becomes line; omitted variant now means circle. Remove lazy-change and return a result or Promise from before-change instead of calling change(value).
The change notification now includes the original event as its second argument. Custom colors target the track; thumb colors use tokens.
