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

| Configuration     | Purpose               | Related examples            |
| ----------------- | --------------------- | --------------------------- |
| `variant`         | Appearance            | Custom text, Custom icons   |
| `checked-color`   | Checked track color   | Custom colors               |
| `unchecked-color` | Unchecked track color | Custom colors               |
| `checked-text`    | Checked label         | Custom text                 |
| `unchecked-text`  | Unchecked label       | Custom text                 |
| `ripple`          | Click ripple          | Ripple and handle elevation |

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

| Configuration   | Purpose                                                      | Related examples             |
| --------------- | ------------------------------------------------------------ | ---------------------------- |
| `disabled`      | Disable interaction, including inherited form disabled state | Interaction state comparison |
| `readonly`      | Read only; focus and click remain available without toggling | Interaction state comparison |
| `variant`       | Appearance                                                   | Loading                      |
| `loading`       | Loading; blocks clicks and changes                           | Loading                      |
| `default-value` | Initial uncontrolled value; falls back to uncheckedValue     | Loading                      |
| `size`          | Size; omitted value follows platform rules below             | Focus and event order        |

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

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit empty-values, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop         | Type               | Default and scope                                                           |
| ------------ | ------------------ | --------------------------------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text   | string             | Field > FormItem > Form > '-'; explicit '' is valid                         |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Value and default value

Use ordinary `v-model`. `modelValue` is the actual switch value and matches checkedValue/uncheckedValue types. `defaultValue` initializes uncontrolled state once; later changes do not reset it. Explicit binding takes precedence, with no initialization `update:modelValue`.

<!-- same-source-api:start -->

### Props

| Prop             | Meaning                                                                                                 | Type                                                                 | Default   |
| ---------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------- |
| model-value      | Controlled value; managed internally when omitted                                                       | string / number / boolean                                            | undefined |
| default-value    | Initial uncontrolled value; falls back to uncheckedValue                                                | string / number / boolean                                            | undefined |
| clearable        | Show clearing in popup editing                                                                          | boolean                                                              | false     |
| empty-value      | Value committed after clearing; accepts a value or factory                                              | SwitchValue \| null \| (() => SwitchValue \| null)                   | undefined |
| edit-mode        | Editing mode; inherits FormItem/Form when unset. See editing-mode guidance for platform-specific values | FieldEditMode                                                        | undefined |
| read-pretty      | Plain reading display, independent of readonly                                                          | boolean                                                              | undefined |
| before-commit    | Cancelable interceptor before saving the editor                                                         | BeforeFieldCommit                                                    | undefined |
| open             | Controlled editor open state                                                                            | boolean                                                              | undefined |
| default-open     | Initial uncontrolled editor state                                                                       | boolean                                                              | false     |
| popup-container  | Editor mount container                                                                                  | PopupContainer                                                       | undefined |
| checked-value    | Checked value                                                                                           | string / number / boolean                                            | true      |
| unchecked-value  | Unchecked value                                                                                         | string / number / boolean                                            | false     |
| variant          | Appearance                                                                                              | circle / round / line / tonal                                        | circle    |
| size             | Size; omitted value follows platform rules below                                                        | sm / md / lg                                                         | undefined |
| disabled         | Disable interaction, including inherited form disabled state                                            | boolean                                                              | undefined |
| readonly         | Read only; focus and click remain available without toggling                                            | boolean                                                              | undefined |
| loading          | Loading; blocks clicks and changes                                                                      | boolean                                                              | false     |
| before-change    | Switch interceptor, not an event                                                                        | (payload, done, context) => boolean / void / Promise<boolean / void> | —         |
| checked-text     | Checked label                                                                                           | string                                                               | —         |
| unchecked-text   | Unchecked label                                                                                         | string                                                               | —         |
| checked-color    | Checked track color                                                                                     | string                                                               | —         |
| unchecked-color  | Unchecked track color                                                                                   | string                                                               | —         |
| loading-color    | Loading-icon color                                                                                      | string                                                               | —         |
| ripple           | Click ripple                                                                                            | boolean                                                              | true      |
| handle-elevation | Thumb elevation: true means level 2; numbers are integer-clamped to 0–24                                | boolean / number                                                     | true      |

before-change returning false, throwing or rejecting cancels switching. Other normal completion allows it. While awaiting a Promise or done, loading is automatic and repeated input is blocked.
Pending results become stale after unmount, KeepAlive deactivation, external value updates or changes to disabled/readonly/loading.
Controlled mode only requests updates. Selection changes after the parent updates model-value. Without model-value, internal state is used.

### Events

| Event              | Arguments and timing                                                   |
| ------------------ | ---------------------------------------------------------------------- |
| click              | (event: Event), before interception when clicking is allowed           |
| update:model-value | (nextValue: SwitchValue), after switching is allowed and before change |
| change             | (nextValue: SwitchValue, event: Event), once per commit                |
| focus              | (event: FocusEvent), on focus                                          |
| blur               | (event: FocusEvent), on blur                                           |

Supports Enter/Space without repeated toggles on key repeat. disabled/loading emit neither click nor value changes; readonly may emit click without running the interceptor.
External model-value updates do not emit an extra change.

### Slots

| Slot           | Description                                                   | Arguments |
| -------------- | ------------------------------------------------------------- | --------- |
| checked        | Checked label; overrides checked-text; hidden for line/sm     | —         |
| unchecked      | Unchecked label; overrides unchecked-text; hidden for line/sm | —         |
| checked-icon   | Checked thumb icon; replaced while loading                    | —         |
| unchecked-icon | Unchecked thumb icon; replaced while loading                  | —         |

### Methods

No public methods.

### Platform notes

Props, event arguments and slots match. Cedar inherits omitted size from Form/global settings: xs/sm map to sm; lg/xl map to lg. Maple defaults to md. Both inherit disabled/readonly from field > FormItem > Form, with explicit false overriding the parent. Form integration is local to each platform.
<!-- same-source-api:end -->

### Types

SwitchProps, SwitchVariant, SwitchSize, SwitchValue, SwitchBeforeChange and SwitchInstance are exported from both root and component entries.

### Style variables

| Token: Maple uses --mp-, Cedar uses --c-                   | Default                                                 |
| ---------------------------------------------------------- | ------------------------------------------------------- |
| --mp-switch-width / height / handle-size                   | 40px / 24px / 16px                                      |
| --mp-switch-size-sm-scale / size-lg-scale                  | .8 / 1.2                                                |
| --mp-switch-tonal-width / tonal-height / tonal-handle-size | 52px / 32px / 24px                                      |
| --mp-switch-line-height / line-handle-size                 | 12px / 20px                                             |
| --mp-switch-hit-area                                       | 0px; outward hit-area expansion without changing layout |
| --mp-switch-track-background / track-active-background     | Neutral / theme color                                   |
| --mp-switch-handle-background / handle-color               | White / theme color                                     |
| --mp-switch-disabled-opacity                               | .5                                                      |
| --mp-switch-round-radius / gap                             | 4px / 4px                                               |

See style/token.less for all variables. Legacy platform-specific Switch geometry tokens are not guaranteed to remain.

## Migration

Maple standard becomes line. Omitting variant now selects circle. Both platforms use four variants; standard is not retained as an alias.
lazy-change is removed. before-change moves from a (value, change) callback to return-value/Promise control; applications no longer call change manually.
Maple change now includes the original event as its second argument. checked-color/unchecked-color control the track consistently; tokens customize thumbs.

### Color variables and tonal foreground migration

| Variable suffix: --mp-switch- | Default system role | Responsibility                                                   |
| ----------------------------- | ------------------- | ---------------------------------------------------------------- |
| track-background              | content-secondary   | Ordinary unchecked solid track                                   |
| track-active-background       | content-brand       | Checked track and keyboard-focus ring                            |
| track-error-background        | content-danger      | Interactive error track and tonal error border                   |
| handle-background             | surface-default     | Ordinary/checked/error thumb fill                                |
| handle-color                  | content-brand       | Ordinary/checked/error thumb icon color                          |
| text-color                    | surface-default     | Text on a solid track                                            |
| checked-text-color            | content-on-bright   | Checked-track text; error retains existing foreground precedence |
| tonal-track-background        | surface-muted       | Tonal unchecked-track background                                 |
| tonal-border-color            | content-secondary   | Tonal unchecked border and thumb fill                            |
| tonal-text-color              | content-secondary   | Added: tonal unchecked-track text                                |
| tonal-handle-color            | surface-default     | Added: tonal unchecked-thumb icon                                |

Defaults reference corresponding system roles, e.g. var(--mp-sys-color-content-secondary). Unchecked tonal uses tonal-text-color/tonal-handle-color; customize ordinary and tonal foregrounds together for all variants. Interactive errors use ordinary text/thumb pairing; disabled/loading suppress errors. Callers must check custom-track contrast. Shadows, dimensions and motion are outside this color contract.

### Theme names and variant names

Theme entries are Themes.default.light/dark and Themes.maple.light/dark. Switch tonal is a variant, not a theme. Public variants and eight dedicated variables consistently use tonal without old-name aliases.

### Motion variables

Built-in motion follows `prefers-reduced-motion: reduce`. Reduced motion does not prevent loading-state or close-event updates.

| Token                          | Default |
| ------------------------------ | ------- |
| `--mp-switch-loading-duration` | `1s`    |

### Form field presentation and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-`direct` modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

### Form state inheritance

Omitted `disabled` / `readonly` inherit FormItem, then Form; an explicit `false` overrides inherited state. Becoming `disabled` or read-only invalidates a pending `beforeChange`, so a late result cannot toggle the value. Outside a form, omitted values behave as `false`.

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

### Before-hook waiting feedback

Before-hook waits show visible feedback and aria-busy. Rejected or failed operations recover; duplicate submissions do not start another copy. Notification event Promises never drive loading.
