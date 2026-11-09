# Switch

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

## Reading direction

Switch inherits source dir: its unchecked handle starts at inline start and moves toward inline end when checked. Space/Enter still toggle. Direction changes do not modify values; disabled, readonly and loading states block commits.

## Basic examples

### Controlled and default value

```demo
../example/demos/basic.vue
```

## Appearance and states

### Appearance configuration comparison

Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Appearance combinations

Use this example for settings that take effect immediately. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

</details>

```demo
../example/demos/appearance-lab.vue
```

## Customization and slots

### Custom colors

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ----------------- | -------------- | ---------------------- |
| `variant` | Appearance | Custom text, Custom icons |
| `checked-color` | Checked track color | Custom colors |
| `unchecked-color` | Unchecked track color | Custom colors |
| `checked-text` | Checked label | Custom text |
| `unchecked-text` | Unchecked label | Custom text |
| `ripple` | Click ripple | Ripple and handle elevation |

<!-- demo-config-notes:end -->


```demo
../example/demos/custom-color.vue
```

### Custom text

```demo
../example/demos/custom-text.vue
```

### Custom icons

```demo
../example/demos/custom-icon.vue
```

### Ripple and handle elevation

```demo
../example/demos/custom.vue
```

## Interaction and control

### Interaction state comparison

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --------------- | --------------------------------------------------------- | -------------- |
| `disabled` | Disable interaction, including inherited form disabled state | Interaction state comparison |
| `readonly` | Read only; focus and click remain available without toggling | Interaction state comparison |
| `variant` | Appearance | Loading |
| `loading` | Loading; blocks clicks and changes | Loading |
| `default-value` | Initial uncontrolled value; falls back to uncheckedValue | Loading |
| `size` | Size; omitted value follows platform rules below | Focus and event order |

<!-- demo-config-notes:end -->


Toggle disabled, read-only and error states, then interact with the same instance. Recovery controls remain outside the target; error appearance alone does not validate data.

<details>
<summary>Configuration details and limits</summary>

#### Interaction states

Use this example for settings that take effect immediately. Adjust disabled, read-only and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

</details>

```demo
../example/demos/state-lab.vue
```

### Loading

```demo
../example/demos/loading.vue
```

### Focus and event order

```demo
../example/demos/events.vue
```

### Custom values and events

```demo
../example/demos/custom-value.vue
```

## Async and dynamic data

### Async allow, deny and rejection

```demo
../example/demos/switch-interception.vue
```

## Usage notes

### Configuration

Use the CSS Variables table below to customize dimensions and colors.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Value and default value

Use ordinary `v-model`. `modelValue` is the actual switch value and matches checkedValue/uncheckedValue types. `defaultValue` initializes uncontrolled state once; later changes do not reset it. Explicit binding takes precedence, with no initialization `update:modelValue`.

<!-- same-source-api:start -->

### Switch Props

| Prop | Meaning | Type | Default |
| ---------------- | ------------------------------------------------------------ | -------------------------------------------------------------------- | --------- |
| model-value | Controlled value; managed internally when omitted | string / number / boolean | undefined |
| default-value | Initial uncontrolled value; falls back to uncheckedValue | string / number / boolean | undefined |
| clearable | Show clearing in popup editing | boolean | false |
| empty-value | Value committed after clearing; accepts a value or factory | SwitchValue \| null \| (() => SwitchValue \| null) | undefined |
| empty-values | Empty-value recognition list; fully replaces inherited configuration | readonly unknown[] | Inherits the field empty-value policy |
| empty-text | Reading placeholder; field > FormItem > Form | string | - |
| edit-mode | Editing mode; inherits FormItem/Form when unset. See editing-mode guidance for platform-specific values | FieldEditMode<br>`'direct' \| 'popup'` | undefined |
| read-pretty | Plain reading display, independent of readonly | boolean | undefined |
| before-commit | Cancelable interceptor before saving the editor | BeforeFieldCommit | undefined |
| open | Controlled editor open state | boolean | undefined |
| default-open | Initial uncontrolled editor state | boolean | false |
| popup-container | Editor mount container | PopupContainer | undefined |
| checked-value | Checked value | string / number / boolean | true |
| unchecked-value | Unchecked value | string / number / boolean | false |
| variant | Appearance | circle / round / line / tonal | circle |
| size | Size; omitted value follows platform rules below | sm / md / lg | undefined |
| disabled | Disable interaction, including inherited form disabled state | boolean | undefined |
| readonly | Read only; focus and click remain available without toggling | boolean | undefined |
| loading | Loading; blocks clicks and changes | boolean | false |
| before-change | Switch interceptor, not an event | (payload, done, context) => boolean / void / Promise<boolean / void> | — |
| checked-text | Checked label | string | — |
| unchecked-text | Unchecked label | string | — |
| checked-color | Checked track color | string | — |
| unchecked-color | Unchecked track color | string | — |
| loading-color | Loading-icon color | string | — |
| ripple | Click ripple | boolean | true |
| handle-elevation | Thumb elevation: true means level 2; numbers are integer-clamped to 0–24 | boolean / number | true |

before-change uses (payload, done, context). Return true, call done(), or fulfill a Promise with a non-false result to allow switching. Return false, call done(false), throw, fulfill with false or reject to cancel. Synchronous void waits for done; fulfilled `Promise<void>` allows. Waiting automatically shows loading and blocks duplicate input. Exceptions cancel permission without adding an error event.
Pending results become stale after unmount, KeepAlive deactivation, external value updates or changes to disabled/readonly/loading.
Controlled mode only requests updates. Selection changes after the parent updates model-value. Without model-value, internal state is used.

### Switch Events

| Event | Arguments and timing |
| ------------------ | ---------------------------------------------------- |
| click | (event: Event), before interception when clicking is allowed |
| update:model-value | (nextValue: SwitchValue), after switching is allowed and before change |
| change | (nextValue: SwitchValue, event?: Event), once per commit |
| focus | (event: FocusEvent), on focus |
| blur | (event: FocusEvent), on blur |

Supports Enter/Space without repeated toggles on key repeat. disabled/loading emit neither click nor value changes; readonly may emit click without running the interceptor.
External model-value updates do not emit an extra change.

### Switch Slots

| Slot | Description | Prop |
| -------------- | ---------------------------------------------------- | ---- |
| checked | Checked label; overrides checked-text; hidden for line/sm | — |
| unchecked | Unchecked label; overrides unchecked-text; hidden for line/sm | — |
| checked-icon | Checked thumb icon; replaced while loading | — |
| unchecked-icon | Unchecked thumb icon; replaced while loading | — |

### Switch Methods

No public methods.

### Usage notes

Props, event arguments and slots match. Cedar inherits omitted size from Form/global settings: xs/sm map to sm; lg/xl map to lg. Maple defaults to md. Both inherit disabled/readonly from field > FormItem > Form, with explicit false overriding the parent. Form integration is local to each platform.
<!-- same-source-api:end -->

## Types

SwitchProps, SwitchVariant, SwitchSize, SwitchValue, SwitchBeforeChange and SwitchInstance are exported from both root and component entries.

## Inheriting Form disabled state

The default disabled=undefined means inheritance, resolved as local ?? FormItem ?? Form ?? false. Explicit false remains effective, allowing one field to stay enabled while unspecified fields follow Form. Form disabled is the form-wide default, not a lock preventing child overrides.

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.

```vue
<mp-switch v-model="flag" :before-change="beforeChange" />
```

```ts
const beforeChange = (next, done) => {
  canChange(next).then((allowed) => done(allowed))
}
```

Cancellable hooks use `(payload, done, context)`: closure payloads contain `{ action }`, change/commit payloads contain `{ value, previousValue }`, and Popup uses `{ reason }`. Context provides `signal` and an optional original `event`. Return a boolean/Promise, or call done()/done(false). Synchronous void waits for done; Promise&lt;void&gt; allows the operation. First completion wins. Pending state controls loading/disabled automatically. Cancellation invalidates stale results. Button refs are not exposed.

### Async operation feedback

Awaited before-* hooks show loading feedback and aria-busy. Rejection or failure restores interaction; repeated input does not start the same operation again. Ordinary event return Promises do not participate in loading.

Deferred `change` preserves the real confirmation event when available (for example, the save button). Programmatic editor handoff has no DOM event, so its second argument is optional. The event target can be the confirmation control rather than the input. `change` is a notification: its returned Promise is not awaited; use `before-commit` to approve asynchronous saves.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-switch-checked-text-color` | `var(--mp-switch-text-color)` | `color` |
| `--mp-switch-disabled-opacity` | `0.5` | `opacity` |
| `--mp-switch-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-switch-focus-width` | `2px` | `outline`, `outline-offset` |
| `--mp-switch-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-switch-gap` | `var(--mp-sys-space-2)` | `inset-inline-start`, `padding-inline` |
| `--mp-switch-handle-background` | `var(--mp-sys-color-surface-default)` | `background` |
| `--mp-switch-handle-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-switch-handle-size` | `16px` | `height`, `inset-inline-start`, `padding-inline`, `width` |
| `--mp-switch-height` | `24px` | `height` |
| `--mp-switch-hit-area` | `0px` | `inset` |
| `--mp-switch-line-handle-size` | `20px` | `height`, `inset-inline-start`, `padding-inline`, `width` |
| `--mp-switch-line-height` | `12px` | `height` |
| `--mp-switch-loading-duration` | `1s` | `animation` |
| `--mp-switch-radius` | `var(--mp-sys-radius-pill)` | `border-radius` |
| `--mp-switch-ripple-duration` | `400ms` | `animation` |
| `--mp-switch-ripple-scale` | `2.4` | `transform` |
| `--mp-switch-round-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-switch-shadow-color` | `#0003` | Component styling |
| `--mp-switch-size-lg-scale` | `1.2` | `font-size`, `height`, `inset-inline-start`, `min-width`, `padding-inline`, `width` |
| `--mp-switch-size-sm-scale` | `0.8` | `font-size`, `height`, `inset-inline-start`, `min-width`, `padding-inline`, `width` |
| `--mp-switch-text-color` | `var(--mp-sys-color-surface-default)` | `color` |
| `--mp-switch-tonal-border-color` | `var(--mp-sys-color-content-secondary)` | `background`, `border` |
| `--mp-switch-tonal-border-width` | `2px` | `border` |
| `--mp-switch-tonal-handle-color` | `var(--mp-sys-color-surface-default)` | `color` |
| `--mp-switch-tonal-handle-size` | `24px` | `height`, `inset-inline-start`, `padding-inline`, `width` |
| `--mp-switch-tonal-height` | `32px` | `height` |
| `--mp-switch-tonal-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-switch-tonal-track-background` | `var(--mp-sys-color-surface-muted)` | `background` |
| `--mp-switch-tonal-width` | `52px` | `min-width` |
| `--mp-switch-track-active-background` | `var(--mp-sys-color-content-brand)` | `background`, `outline` |
| `--mp-switch-track-background` | `var(--mp-sys-color-content-secondary)` | `background` |
| `--mp-switch-track-error-background` | `var(--mp-sys-color-content-danger)` | `background`, `border-color` |
| `--mp-switch-width` | `40px` | `min-width` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-switch-checked-text-color: var(--mp-switch-text-color);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Motion

Built-in motion follows `prefers-reduced-motion: reduce`. Reduced motion does not prevent loading-state or close-event updates.

### Track and handle colors

| Variable suffix: --mp-switch- | Default system role | Responsibility |
| ------------------------ | ----------------- | ---------------------------------------- |
| track-background | content-secondary | Ordinary unchecked solid track |
| track-active-background | content-brand | Checked track and keyboard-focus ring |
| track-error-background | content-danger | Interactive error track and tonal error border |
| handle-background | surface-default | Ordinary/checked/error thumb fill |
| handle-color | content-brand | Ordinary/checked/error thumb icon color |
| text-color | surface-default | Text on a solid track |
| checked-text-color | switch-text-color | Checked-track text; error retains existing foreground precedence |
| tonal-track-background | surface-muted | Tonal unchecked-track background |
| tonal-border-color | content-secondary | Tonal unchecked border and thumb fill |
| tonal-text-color | content-secondary | Tonal unchecked-track text |
| tonal-handle-color | surface-default | Tonal unchecked-thumb icon |

Defaults use the corresponding system roles, such as var(--mp-sys-color-content-secondary). Unchecked tonal uses tonal-text-color / tonal-handle-color; override both ordinary and tonal foregrounds when customizing every variant. Interactive error state uses paired text/handle colors, while disabled / loading suppresses error colors. Keep foregrounds readable on custom track colors.
