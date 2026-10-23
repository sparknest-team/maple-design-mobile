# Switch

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

## Examples

### Controlled and default value

```demo
../example/demos/basic.vue
```

### Three sizes

```demo
../example/demos/size.vue
```

### Disabled

```demo
../example/demos/disabled.vue
```

### Read only

```demo
../example/demos/readonly.vue
```

### Four variants

```demo
../example/demos/type.vue
```

### Loading

```demo
../example/demos/loading.vue
```

### Custom colors

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

### Custom values and events

```demo
../example/demos/custom-value.vue
```

### Async allow, deny and rejection

```demo
../example/demos/switch-interception.vue
```

### Focus and event order

```demo
../example/demos/events.vue
```

### Appearance combinations

Use this example for settings that take effect immediately. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

### Interaction states

Use this example for settings that take effect immediately. Adjust disabled, read-only and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

```demo
../example/demos/state-lab.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value | Controlled value; omit for internal state | string / number / boolean | undefined |
| default-checked | Initial uncontrolled checked state; initialization only | boolean | false |
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
