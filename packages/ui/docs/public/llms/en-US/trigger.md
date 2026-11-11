<!-- Source: src/trigger/docs/en-US.md; locale: en-US; page: /en-US/trigger -->

# Trigger





Replacing or clearing the popup reference, or unmounting the component, removes the old window scroll listeners.

After closing or unbinding, pending positioning and scroll-close tasks do not affect a popup opened later.

mouse-enter-delay / mouse-leave-delay are interaction delays, separate from CSS enter/leave duration. Cancel, replacement, KeepAlive deactivation and unmount invalidate dequeued commits; retained requests cannot schedule while inactive or disposed. Reactivation accepts new requests without replaying old delays. Controlled open remains caller-owned.

Clicking another independent reference closes the previous top layer before opening the new one. Nested popups remain inside their parent. Controlled open state only receives a close request; the owner may reject it.

### Introduction

A style-agnostic floating-layer primitive for interaction, positioning, teleporting, stacking and open state. Prefer Tooltip, Popover or Menu for end-user features; use Trigger directly when building another floating component.

## Basic examples

### Basic usage

Example source: src/trigger/example/demos/basic.vue

```vue
<template>
  <div class="trigger-demo">
    <mp-trigger trigger="click" :popup-offset="10" show-arrow>
      <mp-button>点击打开</mp-button>
      <template #content>
        <div class="trigger-demo__panel">Trigger 只负责浮层行为，面板外观由使用者决定。</div>
      </template>
    </mp-trigger>
  </div>
</template>

<style scoped>
.trigger-demo {
  display: flex;
  justify-content: center;
  padding: calc(var(--mp-sys-space-8) * 2) var(--mp-sys-space-6);
}

.trigger-demo__panel {
  max-width: 260px;
  padding: var(--mp-sys-space-5) var(--mp-sys-space-6);
  color: var(--mp-sys-color-content-primary);
  background: var(--mp-sys-color-surface-overlay);
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: var(--mp-sys-radius-md);
}
</style>
```

## Layout and arrangement

### Placement and arrow

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `trigger` | `hover/click/focus/contextMenu/manual`, or an array | Placement and arrow |
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | Placement and arrow |
| `popup-offset` | Outward main-axis distance | Placement and arrow |
| `show-arrow` | Render the decorative arrow | Placement and arrow |
<!-- demo-config-notes:end -->


Example source: src/trigger/example/demos/placement.vue

```vue
<script setup lang="ts">
const placements = ['top', 'right', 'bottom', 'left'] as const
</script>

<template>
  <div class="trigger-placement-demo">
    <mp-trigger
      v-for="placement in placements"
      :key="placement"
      trigger="click"
      :placement="placement"
      :popup-offset="10"
      show-arrow
    >
      <mp-button variant="outline">{{ placement }}</mp-button>
      <template #content
        ><div class="trigger-placement-demo__panel">{{ placement }}</div></template
      >
    </mp-trigger>
  </div>
</template>

<style scoped>
.trigger-placement-demo {
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  gap: calc(var(--mp-sys-space-8) * 2);
  padding: calc(var(--mp-sys-space-8) * 3) calc(var(--mp-sys-space-8) + var(--mp-sys-space-4));
}

.trigger-placement-demo__panel {
  padding: var(--mp-sys-space-4) var(--mp-sys-space-5);
  color: var(--mp-sys-color-content-primary);
  background: var(--mp-sys-color-surface-overlay);
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: var(--mp-sys-radius-sm);
}
</style>
```

## Interaction and control

### Controlled state and offset

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `trigger` | `hover/click/focus/contextMenu/manual`, or an array | Controlled state and offset |
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | Controlled state and offset |
| `popup-offset` | Outward main-axis distance | Controlled state and offset |
| `popup-translate` | Screen-axis translation or placement map | Controlled state and offset |
<!-- demo-config-notes:end -->


`popup-offset` moves outward on the placement main axis. `popup-translate` adds a screen-axis x/y translation.

The demo accepts requests through `v-model:open` and displays the parent's value. External controls update that value; Enter/Space activates the native trigger button, while Escape and outside clicks request closing. It does not demonstrate rejected controlled requests. Trigger is listed in the component menu so its right-side preview shows these demos instead of the home page.

Example source: src/trigger/example/demos/controlled.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div class="trigger-controlled-demo">
    <mp-space>
      <mp-button @click="open = true">外部打开</mp-button>
      <mp-button variant="outline" @click="open = false">外部关闭</mp-button>
    </mp-space>
    <mp-trigger
      v-model:open="open"
      trigger="click"
      placement="bottom-start"
      :popup-offset="10"
      :popup-translate="[16, 0]"
    >
      <mp-button variant="text">受控触发元素</mp-button>
      <template #content
        ><div class="trigger-controlled-demo__panel">open = {{ open }}</div></template
      >
    </mp-trigger>
  </div>
</template>

<style scoped>
.trigger-controlled-demo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--mp-sys-space-8);
  padding: calc(var(--mp-sys-space-8) * 2) var(--mp-sys-space-6);
}

.trigger-controlled-demo__panel {
  padding: var(--mp-sys-space-5) var(--mp-sys-space-6);
  color: var(--mp-sys-color-content-primary);
  background: var(--mp-sys-color-surface-overlay);
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: var(--mp-sys-radius-sm);
}
</style>
```

## Triggers and positioning

### Popup placement

placement is the preferred side; auto-fit-position defaults to true and can change the final side. It is not a position coordinate. top-start describes anchor placement and alignment, whereas top-left is a container corner. Top/bottom start and end mirror with reading direction; left/right remain physical, and vertical start/end remain top/bottom.

## Usage notes

### Configuration

These are actual :root defaults. Prefer component variables for business customization; internal positioning variables are not public API.

With Teleport, variables must be in the actual popup scope, for example through `popup-style`. Trigger-button variables do not automatically inherit into popups.

### Reduced motion

`allowClose()` restores the internal closing gate; there is no public counterpart to disable closing, and this method cannot prevent closure.

## API

### Trigger Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model:open` | Controlled open state | _boolean_ | `-` |
| `default-open` | Initial uncontrolled state | _boolean_ | `false` |
| `trigger` | `hover/click/focus/contextMenu/manual`, or an array | _TriggerEvent \| TriggerEvent[]_<br>`TriggerEvent: 'manual' \| 'focus' \| 'hover' \| 'click' \| 'contextMenu'` | `hover` |
| `disabled` | Prevent opening | _boolean_ | `false` |
| `reference` | External reference element | _string \| HTMLElement \| SVGElement_ | `-` |
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | _TriggerPlacement_<br>`'left' \| 'right' \| 'bottom' \| 'top' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end'` | `bottom` |
| `strategy` | Positioning strategy | _absolute \| fixed_ | `absolute` |
| `cover` | Cover the reference on the main axis | _boolean_ | `false` |
| `popup-offset` | Outward main-axis distance | _number_ | `0` |
| `popup-translate` | Screen-axis translation or placement map | _[number, number] \| Record_ | `-` |
| `align-point` | Position at the pointer | _boolean_ | `false` |
| `popup-container` | Render target; false renders locally | _string \| HTMLElement \| false_ | `body` |
| `auto-fit-position` | Flip and shift into the viewport | _boolean_ | `true` |
| `auto-fit-popup-width` | Match reference width | _boolean_ | `false` |
| `auto-fit-popup-min-width` | Match reference minimum width | _boolean_ | `false` |
| `auto-fix-position` | Observe reference element size changes; disabling this still observes the popup and positioning parent and responds to window changes | _boolean_ | `true` |
| `update-at-scroll` | Reposition while scrolling | _boolean_ | `false` |
| `scroll-to-close` | Close after the scroll threshold | _boolean_ | `false` |
| `scroll-to-close-distance` | Close threshold | _number_ | `0` |
| `show-arrow` | Render the decorative arrow | _boolean_ | `false` |
| `hide-empty` | Skip an empty content slot | _boolean_ | `false` |
| `prevent-focus` | Prevent positioning-layer mousedown from stealing focus | _boolean_ | `false` |
| `unmount-on-close` | Unmount after leave | _boolean_ | `true` |
| `animation-name` | Vue Transition name | _string_ | `trigger-fade` |
| `duration` | Transition duration | _number \| object_ | `-` |
| `auto-fit-transform-origin` | Derive transform origin from final placement | _boolean_ | `false` |
| `opened-class` | Merge into the first default-slot node when open; external references do not receive this class | _string \| array \| object_ | `-` |
| `reference-attrs` | Attributes applied to the actual reference or a function of open; original attributes are restored when removed, replaced or unmounted | _TriggerReferenceAttrs \| ((open: boolean) => TriggerReferenceAttrs)_ | `-` |
| `popup-class` / `popup-style` | Positioning-layer class/style | _ClassName / CSSProperties_ | `-` |
| `content-class` / `content-style` | Content-layer class/style | _ClassName / CSSProperties_ | `-` |
| `arrow-class` / `arrow-style` | Arrow class/style | _ClassName / CSSProperties_ | `-` |

Interaction timing and dismissal props also include `mouse-enter-delay`, `mouse-leave-delay`, `focus-delay`, `popup-hover-stay`, `blur-to-close`, `close-on-click-reference`, `click-outside-to-close`, `esc-to-close`, and `restore-focus`.

### Trigger Events

`update:open`、`open-change`、`open`、`opened`、`close`、`closed`、`click-outside`、`resize`。

### Trigger Slots / Methods

default provides the reference; `content` supplies popup `content`. Exposes `open()`, `close()`, `resize()`, `allowClose()`, `getReference()`, `setReference()`, `focusReference()`, `isTopLayer()`.

### Accessibility

`trigger="focus"` supports keyboard focus; Escape closes only the topmost popup. Trigger does not define business `role`/ARIA relationships; semantic wrappers supply them.

## Native event modifiers on reference elements

Native `click`, `mouseenter`, `mouseleave`, `focusin`, `focusout`, `contextmenu` listeners and `.once`, `.capture`, `.passive` modifiers bind to the actual reference element, not the popup. `.once` follows the native element's listener lifetime. Replacing a callback does not reactivate a consumed listener; replacing the reference or removing and readding a listener starts a new lifetime. Deactivation/unmount unbind listeners. Listeners only notify; returned Promises do not drive opening/loading, and errors enter Vue's event error chain.

`aria-describedby` from `reference-attrs` is merged and deduplicated with existing reference descriptions; cleanup or reference replacement restores the original attribute.

Fixed positioning uses the actual `fixed` containing block when an ancestor has a transform, filter, perspective, or containing CSS property. Axis-aligned scaling is accounted for; rotated or skewed coordinate systems are not guaranteed. For accessible same-origin iframe references, the reference and popup documents share coordinate conversion and event handling; cross-origin or unrelated browsing contexts are not supported. With `update-at-scroll`, scrolling either document or a scrollable ancestor updates the popup.

## CSS Variables

Tooltip/Popover define arrow appearance themselves. Override their component variables rather than Trigger arrow-background.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-trigger-arrow-background` | `var(--mp-sys-color-surface-overlay)` | `background-color` |
| `--mp-trigger-arrow-radius` | `var(--mp-sys-radius-sm)` | `border-radius` |
| `--mp-trigger-arrow-size` | `var(--mp-sys-space-4)` | `height`, `width` |
| `--mp-trigger-transition-duration` | `var(--mp-sys-motion-duration-fast)` | `transition` |
| `--mp-trigger-transition-easing` | `var(--mp-sys-motion-easing-standard)` | `transition` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-trigger-arrow-background: var(--mp-sys-color-surface-overlay);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Reduced motion

Built-in CSS transitions follow `prefers-reduced-motion: reduce`. Removing transitions does not change final visibility, selected/expanded state or event semantics. Applications control custom animations inside slots.
