# Button

Both libraries use the same implementation and examples; package prefixes, themes and registration stay local.

## Examples

### Eight statuses

```html
<script setup lang="ts">
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
</script>
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button v-for="status in statuses" :key="status" :status="status">{{ status }}</mp-button>
  </div>
</template>
```

### Four variants

```html
<script setup lang="ts">
import { ref } from 'vue'
const variants = ['default', 'text', 'outline', 'tonal'] as const
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const size = ref<typeof sizes[number]>('md')
const variant = ref<typeof variants[number]>('default')
const component = ref<'button' | 'a'>('button')
const disabled = ref(false)
const loading = ref(false)
const clicks = ref(0)
</script>
<template>
  <div class="demo-panel">
    <div class="demo-controls">
      <div class="demo-control"><span class="demo-label">Size</span><mp-radio-group v-model="size"><mp-radio v-for="value in sizes" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group></div>
      <div class="demo-control"><span class="demo-label">Variant</span><mp-radio-group v-model="variant"><mp-radio v-for="value in variants" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group></div>
      <div class="demo-control"><span class="demo-label">Tag</span><mp-radio-group v-model="component"><mp-radio value="button">button</mp-radio><mp-radio value="a">a</mp-radio></mp-radio-group></div>
      <div class="demo-toggles"><span class="demo-toggle"><mp-switch v-model="disabled" aria-label="Disabled" />Disabled</span><span class="demo-toggle"><mp-switch v-model="loading" aria-label="Loading" />Loading</span></div>
    </div>
    <div class="demo-preview" data-button-preview>
      <mp-button v-for="status in statuses" :key="status" :variant="variant" :status="status" :size="size" :component="component" :disabled="disabled" :loading="loading" @click="clicks++">{{ status }}</mp-button>
    </div>
    <div aria-live="polite">Clicks: {{ clicks }}</div>
  </div>
</template>

<style scoped>
.demo-panel { display: grid; gap: 20px; }
.demo-controls { display: grid; gap: 16px; }
.demo-control { display: grid; gap: 8px; }
.demo-label { font-size: 13px; opacity: .7; }
.demo-toggles, .demo-preview { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.demo-toggle { display: inline-flex; align-items: center; gap: 8px; }
.demo-preview { min-height: 64px; padding-block: 8px; }
</style>
```

### Five sizes

```html
<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>
<template>
  <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 12px">
    <mp-button v-for="size in sizes" :key="size" :size="size">{{ size }}</mp-button>
  </div>
</template>
```

### Disabled buttons and links

```html
<script setup lang="ts">
import { ref } from 'vue'
const clicks = ref(0)
</script>
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button disabled @click="clicks++">Disabled button</mp-button>
    <mp-button component="a" href="#blocked-button-link" disabled @click="clicks++">Disabled link</mp-button>
    <mp-button component="a" href="#blocked-button-link" loading @click="clicks++">Loading link</mp-button>
  </div>
  <p aria-live="polite">Blocked clicks: {{ clicks }}</p>
</template>
```

### Loading layouts and animations

```html
<script setup lang="ts">
import { ref } from 'vue'
const modes = ['default', 'fill', 'line'] as const
const types = ['circle', 'wave', 'cube', 'rect', 'disappear'] as const
const variants = ['default', 'tonal', 'outline', 'text'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 20] as const
const size = ref<typeof sizes[number]>('sm')
const mode = ref<typeof modes[number]>('default')
const variant = ref<typeof variants[number]>('default')
</script>
<template>
  <div class="demo-panel">
    <div class="demo-controls">
      <div class="demo-control"><span class="demo-label">Loading size</span><mp-radio-group v-model="size"><mp-radio v-for="value in sizes" :key="value" :value="value">{{ typeof value === 'number' ? `${value}px` : value }}</mp-radio></mp-radio-group></div>
      <div class="demo-control"><span class="demo-label">Loading mode</span><mp-radio-group v-model="mode"><mp-radio v-for="value in modes" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group></div>
      <div class="demo-control"><span class="demo-label">Variant</span><mp-radio-group v-model="variant"><mp-radio v-for="value in variants" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group></div>
    </div>
    <div class="demo-preview" :data-loading-size="size">
      <mp-button v-for="type in types" :key="type" loading :size="size === 'xl' ? 'xl' : size === 'lg' ? 'lg' : 'md'" :loading-type="type" :loading-size="size" :loading-mode="mode" :variant="variant" status="primary">{{ type }}</mp-button>
    </div>
    <div class="demo-control"><span class="demo-label">Custom color / radius</span><div><mp-button loading loading-color="#e05279" :loading-radius="8">Custom spinner</mp-button></div></div>
  </div>
</template>

<style scoped>
.demo-panel { display: grid; gap: 20px; }
.demo-controls { display: grid; gap: 16px; }
.demo-control { display: grid; gap: 8px; }
.demo-label { font-size: 13px; opacity: .7; }
.demo-toggles, .demo-preview { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.demo-toggle { display: inline-flex; align-items: center; gap: 8px; }
.demo-preview { min-height: 64px; padding-block: 8px; }
</style>
```

### Sync, async and rejection recovery

```html
<script setup lang="ts">
import { ref } from 'vue'
const message = ref('Ready')
function sync() { message.value = 'Synchronous: no loading' }
async function run(fail = false) {
  message.value = 'Pending: duplicate clicks are blocked'
  await new Promise(resolve => setTimeout(resolve, 800))
  message.value = fail ? 'Rejected: loading released' : 'Resolved: loading released'
  if (fail) throw new Error('Demo rejection')
}
</script>
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button auto-loading @click="sync">Sync</mp-button>
    <mp-button auto-loading @click="() => run()">Resolve</mp-button>
    <mp-button auto-loading @click="() => run(true)">Reject</mp-button>
  </div>
  <p aria-live="polite">{{ message }}</p>
</template>
```

### Block buttons

```html
<template>
  <mp-button block status="primary">Full width</mp-button>
</template>
```

### Colors, ripple and elevation

```html
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button color="#6750a4" text-color="white" :elevation="6">Custom filled</mp-button>
    <mp-button color="linear-gradient(to bottom right, #6750a4, #d0bcff)" text-color="white">Gradient</mp-button>
    <mp-button color="#6750a4" variant="text">Custom text</mp-button>
    <mp-button color="#6750a4" variant="outline">Custom outline</mp-button>
    <mp-button color="#6750a4" variant="tonal">Custom tonal</mp-button>
    <mp-button :ripple="false" :elevation="false">No ripple or shadow</mp-button>
  </div>
</template>
```

### Icon slots and round buttons

```html
<script setup lang="ts">
import { ref } from 'vue'
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const size = ref<typeof sizes[number]>('md')
const items = [{'status': 'default', 'path': 'M12 5v14M5 12h14', 'label': 'Add'}, {'status': 'primary', 'path': 'm4 12 7-7v4h9v6h-9v4z', 'label': 'Reply'}, {'status': 'info', 'path': 'M12 11v6M12 7v1', 'label': 'Info'}, {'status': 'success', 'path': 'm5 12 4 4L19 6', 'label': 'Confirm'}, {'status': 'warning', 'path': 'M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13', 'label': 'Delete'}, {'status': 'danger', 'path': 'M6 6l12 12M6 18 18 6', 'label': 'Close'}] as const
</script>
<template>
  <div style="display: grid; gap: 8px; margin-bottom: 20px"><span style="font-size: 13px; opacity: .7">Size</span><mp-radio-group v-model="size"><mp-radio v-for="value in sizes" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group></div>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button v-for="item in items" :key="item.label" :status="item.status" :size="size" round icon-container :aria-label="item.label"><template #icon><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path :d="item.path" /></svg></template></mp-button>
  </div>
</template>
```

### Stacked icon and text

```html
<script setup lang="ts">
import { ref } from 'vue'
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const size = ref<typeof sizes[number]>('md')
const items = [{'status': 'default', 'path': 'M12 5v14M5 12h14', 'label': 'Add'}, {'status': 'primary', 'path': 'm4 12 7-7v4h9v6h-9v4z', 'label': 'Reply'}, {'status': 'info', 'path': 'M12 11v6M12 7v1', 'label': 'Info'}, {'status': 'success', 'path': 'm5 12 4 4L19 6', 'label': 'Confirm'}, {'status': 'warning', 'path': 'M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13', 'label': 'Delete'}, {'status': 'danger', 'path': 'M6 6l12 12M6 18 18 6', 'label': 'Close'}] as const
</script>
<template>
  <div style="display: grid; gap: 8px; margin-bottom: 20px"><span style="font-size: 13px; opacity: .7">Size</span><mp-radio-group v-model="size"><mp-radio v-for="value in sizes" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group></div>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button v-for="item in items" :key="item.label" :status="item.status" :size="size" stacked :aria-label="item.label"><template #icon><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path :d="item.path" /></svg></template>{{ item.label }}</mp-button>
  </div>
</template>
```

### Group inheritance and overrides

```html
<script setup lang="ts">
import { ref } from 'vue'
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
const variants = ['default', 'tonal', 'outline', 'text'] as const
const action = ref('Ready')
const pending = ref(false)
async function save() { action.value = 'Saving'; await new Promise(resolve => setTimeout(resolve, 800)); action.value = 'Saved' }
</script>
<template>
  <p>Sizes</p>
  <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 16px">
    <mp-button-group v-for="size in sizes" :key="size" :size="size" status="primary"><mp-button>{{ size }}</mp-button><mp-button>Next</mp-button></mp-button-group>
  </div>
  <p>Themes</p>
  <div style="display: flex; flex-wrap: wrap; gap: 16px">
    <mp-button-group v-for="status in statuses" :key="status" :status="status"><mp-button>{{ status }}</mp-button><mp-button>Next</mp-button></mp-button-group>
  </div>
  <p>Horizontal / vertical variants</p>
  <div v-for="vertical in [false, true]" :key="String(vertical)" style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 16px; margin-bottom: 16px">
    <mp-button-group v-for="variant in variants" :key="variant" :variant="variant" :vertical="vertical" status="primary"><mp-button>{{ variant }}</mp-button><mp-button>Next</mp-button><mp-button>Last</mp-button></mp-button-group>
  </div>
  <p>Inheritance / individual overrides</p>
  <div style="display: flex; flex-wrap: wrap; gap: 16px">
    <mp-button-group status="primary"><mp-button>Default</mp-button><mp-button status="success">Success</mp-button><mp-button variant="outline">Outline</mp-button><mp-button disabled>Off</mp-button></mp-button-group>
    <mp-button-group disabled><mp-button>Disabled</mp-button><mp-button :disabled="false">Enabled override</mp-button></mp-button-group>
  </div>
  <p>Custom colors / gradient</p>
  <div style="display: flex; flex-wrap: wrap; gap: 16px">
    <mp-button-group color="#6750a4" text-color="white"><mp-button>Custom</mp-button><mp-button>Next</mp-button></mp-button-group>
    <mp-button-group color="linear-gradient(to bottom right, #6750a4, #d0bcff)" text-color="white"><mp-button>Gradient</mp-button><mp-button>Next</mp-button></mp-button-group>
    <mp-button-group variant="outline" text-color="#6750a4"><mp-button>Outline</mp-button><mp-button>Next</mp-button></mp-button-group>
  </div>
  <p>Icons / stacked / independent loading</p>
  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px"><mp-switch v-model="pending" aria-label="Group loading" />Loading preview</div>
  <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 16px">
    <mp-button-group v-for="stacked in [false, true]" :key="String(stacked)" :stacked="stacked" status="primary">
      <mp-button :loading="pending" auto-loading @click="save"><template #icon><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></template>Save</mp-button>
      <mp-button @click="action = 'Edited'"><template #icon><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m4 16 12-12 4 4L8 20H4z" /></svg></template>Edit</mp-button>
    </mp-button-group>
    <mp-button-group><mp-button v-for="status in ['warning', 'info', 'success'] as const" :key="status" icon-container :status="status" :aria-label="status"><template #icon><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg></template></mp-button></mp-button-group>
  </div>
  <p aria-live="polite">{{ action }}</p>
</template>
```

### Native form, focus and touch events

```html
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('Editable')
const submissions = ref(0)
const event = ref('Use Tab, Enter or touch')
</script>
<template>
  <form @submit.prevent="submissions++" @reset.prevent="value = 'Editable'" style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-input v-model="value" aria-label="Example field" placeholder="Example field" style="width: 100%; max-width: 280px" />
    <mp-button html-type="submit">Submit</mp-button>
    <mp-button html-type="reset">Reset</mp-button>
    <mp-button :focusable="false">Skip Tab</mp-button>
    <mp-button @touchstart="event = 'touchstart'" @focus="event = 'focus'" @blur="event = 'blur'" @click="event = 'click'">Event target</mp-button>
  </form>
  <p aria-live="polite">Submissions: {{ submissions }}; {{ event }}</p>
</template>
```

## API

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| status | Semantic color; inherits group, otherwise default | `SemanticStatus` | `undefined` |
| variant | Appearance; inherits group, otherwise default | `default / text / outline / tonal` | `undefined` |
| size | Size; inherits group, otherwise md | `xs / sm / md / lg / xl` | `undefined` |
| html-type | Native button type | `button / submit / reset` | `button` |
| component | Root tag; link attributes fall through | `button / a` | `button` |
| round | Round button | `boolean` | `false` |
| block | Full available width | `boolean` | `false` |
| loading | Loading; blocks activation and navigation | `boolean` | `false` |
| loading-type | Spinner animation; same as Loading.type | `circle / wave / cube / rect / disappear` | `circle` |
| loading-mode | Inline, covering, or bottom progress line | `default / fill / line` | `default` |
| loading-size | Spinner size; inherits button size, or xs when replacing an inline icon | `ComponentSize / number` | `undefined` |
| loading-color | Loading indicator color | `string` | `currentColor` |
| loading-radius | Circle spinner radius | `string / number` | `undefined` |
| auto-loading | Wait for click/touchstart Promise results; sync callbacks do not flash loading | `boolean` | `false` |
| icon-container | Icon container appearance | `boolean` | `false` |
| disabled | Disabled; inherits group, explicit false overrides | `boolean` | `undefined` |
| ripple | Click ripple | `boolean` | `true` |
| focusable | Allow sequential Tab focus; does not prevent programmatic focus | `boolean` | `true` |
| autofocus | Native autofocus | `boolean` | `false` |
| text-color | Custom text color | `string` | `undefined` |
| color | Custom background or variant base color | `string` | `undefined` |
| elevation | Default variant shadow; true=2, false=off, rounded/clamped 0–24; group owns grouped elevation | `boolean / number` | `true` |
| stacked | Stack icon and text; inherits group when omitted | `boolean` | `undefined` |

### Events

| Event | Arguments and behavior |
| --- | --- |
| click | `(event: Event) => void / Promise<unknown>` |
| touchstart | `(event: Event) => void / Promise<unknown>` |

Handlers may return promises and multiple listeners are supported. With auto-loading, all listeners must settle before unblocking, including after rejection. Unmounting or KeepAlive deactivation invalidates pending completion. Listener return values are read directly; events are not dispatched a second time. Native focus/blur attributes fall through. Disabled/busy clicks prevent navigation and propagation.

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| default | Button label; retained while loading | — |
| icon | Leading icon; above label when stacked | — |

### Methods

No custom public methods.
<!-- same-source-api:end -->

## ButtonGroup

Props: size=md, status=default, variant=default, color/text-color=undefined, disabled/stacked/vertical=false, elevation=true. Uses the default slot and exposes buttonGroupProvider (reactive group configuration). No custom events.

## Migration

Cedar loading-type=default/fill/line becomes loading-mode=default/fill/line; loading-type now selects spinner animation. Maple uses loading-mode=fill to retain the previous covering layout. Both default ripple and focusable to true. CSS tokens now use the shared Button token names (with --c-/--mp- prefixes); see style/token.less.

## Types

ButtonProps、ButtonVariant、ButtonLoadingMode、ButtonHandler、ButtonInstance、ButtonGroupProps、ButtonGroupInstance。
