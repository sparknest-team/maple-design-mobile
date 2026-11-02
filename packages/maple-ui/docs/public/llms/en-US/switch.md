<!-- Source: src/switch/docs/en-US.md; locale: en-US; page: /en-US/switch -->

# Switch

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

## Examples

### Controlled and default value

Example source: src/switch/example/demos/basic.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const enabled = ref(false)
</script>

<template>
  <mp-space wrap
    ><mp-switch v-model="enabled" aria-label="Enable notifications" /><output>{{ enabled }}</output
    ><mp-switch :default-value="true" aria-label="Initially enabled"
  /></mp-space>
</template>
```

### Three sizes

Example source: src/switch/example/demos/size.vue

```vue
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

Example source: src/switch/example/demos/disabled.vue

```vue
<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'tonal'] as const
</script>

<template>
  <mp-space wrap
    ><template v-for="variant in variants" :key="variant"
      ><mp-switch :variant="variant" disabled :aria-label="variant + ' off'" /><mp-switch
        :variant="variant"
        :default-value="true"
        disabled
        :aria-label="variant + ' on'" /></template
  ></mp-space>
</template>
```

### Read only

Example source: src/switch/example/demos/readonly.vue

```vue
<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'tonal'] as const
</script>

<template>
  <mp-space wrap
    ><template v-for="variant in variants" :key="variant"
      ><mp-switch :variant="variant" readonly :aria-label="variant + ' off'" /><mp-switch
        :variant="variant"
        :default-value="true"
        readonly
        :aria-label="variant + ' on'" /></template
  ></mp-space>
</template>
```

### Appearance combinations

Use this example for settings that take effect immediately. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/switch/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(false)
const __demoAppearance = __demoReactive({ variant: 'circle', size: 'md' })
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
            { label: 'circle', value: 'circle' },
            { label: 'round', value: 'round' },
            { label: 'line', value: 'line' },
            { label: 'tonal', value: 'tonal' },
          ]"
          aria-label="variant"
        />
      </div>
      <div>
        <span>size</span
        ><mp-select
          v-model="__demoAppearance['size']"
          :clearable="false"
          :options="[
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-switch v-model="value" v-bind="__demoAppearance"></mp-switch>
  </mp-space>
</template>
```

### Interaction states

Use this example for settings that take effect immediately. Adjust disabled, read-only and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

Example source: src/switch/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(false)
const __demoState = __demoReactive({ disabled: false, readonly: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
    </mp-space>
    <mp-switch v-model="value" v-bind="__demoState"></mp-switch>
  </mp-space>
</template>
```

### Four variants

Example source: src/switch/example/demos/type.vue

```vue
<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'tonal'] as const
</script>

<template>
  <mp-space wrap
    ><label v-for="variant in variants" :key="variant"
      >{{ variant }} <mp-switch :variant="variant" :aria-label="variant" /></label
  ></mp-space>
</template>
```

### Loading

Example source: src/switch/example/demos/loading.vue

```vue
<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'tonal'] as const
</script>

<template>
  <mp-space wrap
    ><template v-for="variant in variants" :key="variant"
      ><mp-switch :variant="variant" loading :aria-label="variant + ' off'" /><mp-switch
        :variant="variant"
        :default-value="true"
        loading
        :aria-label="variant + ' on'" /></template
  ></mp-space>
</template>
```

### Async allow, deny and rejection

Example source: src/switch/example/demos/switch-interception.vue

```vue
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

Example source: src/switch/example/demos/events.vue

```vue
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

### Custom colors

Example source: src/switch/example/demos/custom-color.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const enabled = ref(false)
</script>

<template>
  <mp-switch v-model="enabled" checked-color="#005f73" unchecked-color="#9b2226" aria-label="Custom color switch" />
</template>
```

### Custom text

Example source: src/switch/example/demos/custom-text.vue

```vue
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

Example source: src/switch/example/demos/custom-icon.vue

```vue
<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'tonal'] as const
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

Example source: src/switch/example/demos/custom.vue

```vue
<template>
  <mp-space wrap
    ><mp-switch :ripple="false" :handle-elevation="false" aria-label="No ripple or shadow" /><mp-switch
      :handle-elevation="4"
      aria-label="Elevated handle"
  /></mp-space>
</template>
```

### Custom values and events

Example source: src/switch/example/demos/custom-value.vue

```vue
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

## API

### Model and default value

Use ordinary `v-model`. `modelValue` is the actual switch value, matching checkedValue/uncheckedValue. `defaultValue` initializes uncontrolled state only at creation; changing it later does not reset the current state. A supplied model takes precedence. Initialization emits no `update:modelValue`.

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value | Controlled value; omit for internal state | string / number / boolean | undefined |
| default-value | Initial uncontrolled value; falls back to uncheckedValue | string / number / boolean | undefined |
| presentation | Field presentation inherited from FormItem / Form | FieldPresentation | undefined |
| read-pretty | Read-only presentation independent of readonly | boolean | undefined |
| before-commit | Cancellable interceptor before saving the editor | BeforeFieldCommit | undefined |
| open | Controlled editor visibility | boolean | undefined |
| default-open | Initial uncontrolled editor visibility | boolean | false |
| popup-container | Editor mount container | PopupContainer | undefined |
| checked-value | Checked value | string / number / boolean | true |
| unchecked-value | Unchecked value | string / number / boolean | false |
| variant | Appearance | circle / round / line / tonal | circle |
| size | Size; omitted value follows platform rules below | sm / md / lg | undefined |
| disabled | Disable interaction, including inherited form disabled state | boolean | undefined |
| readonly | Read only; focus and click remain available without toggling | boolean | undefined |
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

Props, event arguments and slots match. Cedar inherits form/global size (xs/sm map to sm, lg/xl to lg); Maple defaults to md. Both inherit disabled / readonly in field > FormItem > Form order; explicit false overrides the parent. Platform form adapters remain distinct.

before-change returning false, throwing or rejecting cancels the toggle; other successful results allow it. Pending promises enable loading and block duplicate input. Unmounting, KeepAlive deactivation, external value updates and disabled/readonly/loading changes invalidate pending results. Controlled state changes only when the parent updates model-value. External updates do not emit change. Enter and Space toggle without key-repeat changes. Disabled/loading suppress click and changes; readonly permits click without running the interceptor.
<!-- same-source-api:end -->

## Types and styling

Root and component entries export SwitchProps, SwitchVariant, SwitchSize, SwitchValue, SwitchBeforeChange and SwitchInstance.
Tokens use --mp-switch-* (Cedar: --c-switch-*). width/height/handle-size default to 40/24/16px; tonal-width/tonal-height/tonal-handle-size to 52/32/24px.
size-sm-scale=.8, size-lg-scale=1.2; hit-area=0px expands the click target without altering layout. Full tokens are in style/token.less.

## Migration

Maple standard becomes line; omitted variant now means circle. Remove lazy-change and return a result or Promise from before-change instead of calling change(value).
The change notification now includes the original event as its second argument. Custom colors target the track; thumb colors use tokens.

## Switch paired colors

Ten color defaults are governed (eight existing and two new). Prefix suffixes below with --c-switch- / --mp-switch-. The OpenSpec change is Cedar openspec/changes/govern-switch-colors; Maple dark now inherits the same semantic roles.

| Suffix | System role |
| --- | --- |
| track-background | content-secondary |
| track-active-background | content-brand |
| track-error-background | content-danger |
| handle-background | surface-default |
| handle-color | content-brand |
| text-color | surface-default |
| tonal-track-background | surface-muted |
| tonal-border-color | content-secondary |
| tonal-text-color | content-secondary |
| tonal-handle-color | surface-default |

Solid tracks are identifiable control marks (secondary/brand/danger), paired with surface-default cutout text/thumbs. tonal unchecked uses a muted track and secondary outline/thumb/text. Its icon uses opaque surface-default: dark surface-muted is translucent and cannot serve as contrasting foreground. Enabled errors reset track, thumb and text together. Disabled/loading suppress error while preserving checked identity; hover/active/focus do not erase state.

Migration: text-color/handle-color govern solid states; also override the new tonal-text-color/tonal-handle-color for tonal unchecked. tonal-border-color still controls its outline and thumb. Explicit checked-color/unchecked-color override ordinary tracks, not enabled error. loading-color overrides the spinner, otherwise it inherits thumb color. Custom tracks need paired foregrounds. Runtime current-track/loading-color/local-*/scale variables are not public theme defaults.

Run pnpm check:switch-themes or node bin/switch-theme-check.mjs (included in check:theme-contract): 4096 states, 8704 contrast pairs, minimum 4.681:1. Alpha is composited host → track → thumb → icon. Text ≥4.5, nontext/focus ≥3. Line text is not rendered and is excluded. Checks use md size and default/muted hosts; disabled/loading opacity, custom colors/slots, animation frames and browser layout/focus visibility are excluded. Geometry, motion and shadows remain outside this color contract.

Themes use default / maple brands and light / dark modes. Switch tonal is an appearance, not a theme. The variant and all eight dedicated variables now use tonal; no legacy aliases are retained.

### Motion variables

Built-in effects respect `prefers-reduced-motion: reduce`; loading and closing still update state immediately.

| Token | Default |
| --- | --- |
| `--mp-switch-loading-duration` | `1s` |

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `inline`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### Form state inheritance

Omitted `disabled` / `readonly` inherit FormItem, then Form; an explicit `false` overrides inherited state. Becoming disabled or read-only invalidates a pending `beforeChange`, so a late result cannot toggle the value. Outside a form, omitted values behave as false.


## Form disabled inheritance

The local disabled prop defaults to undefined, meaning inherit. Effective state resolves local ?? FormItem ?? Form ?? false. Explicit false is retained, so one field can stay enabled while the form disables all other inherited fields. Form disabled remains useful as a default policy, not an unconditional interaction lock.


`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes null unchanged; omitted values preserve the existing default. Editors render null as blank without converting ordinary empty-string input to null. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.


The change guard accepts `beforeChange(next, done)`. Declaring the second argument selects callback waiting; call done() to allow or done(false) to reject. Boolean/Promise completion is also supported and the first completion wins. Existing synchronous void hooks without the done argument still allow changes.

```vue
<mp-switch v-model="flag" :before-change="beforeChange" />
```
```ts
const beforeChange = (next, done) => {
  canChange(next).then(allowed => done(allowed))
}
```
