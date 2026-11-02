# Ripple Directive

Current-source revalidation,2026-10-16:36 Ripple tests pass,including11 dispatch/12 motion/three mouse cases;pre/post hashes match. Mouse press,document release,blur and touch-compatibility suppression are controlled evidence,not a new product repair or trusted-input acceptance. The800ms Date.now gate adds no timer/CSS duration. Classification hash is manually reviewed;adoption/OS boundaries remain separate.

### Intro

When the element is clicked, a water wave spreading effect is generated.

## Basic examples

### Basic Usage

Supports touch, the primary mouse button, and Enter/Space on the host. Mouse waves start at the press position and release on mouseup in the owning document or window blur. Non-primary and touch-generated compatibility mouse events are ignored; an 800ms window after touch is the fallback when sourceCapabilities is unavailable. Keyboard waves start at the center; use native buttons. Simulator clicks do not certify real touch behavior.

```demo
../example/demos/basic-usage.vue
```

## Appearance and states

### Custom Color

```demo
../example/demos/custom-color.vue
```

### Disabled Status

```demo
../example/demos/disabled-status.vue
```

## Content and presentation

### Longer motion tokens

```demo
../example/demos/motion-token.vue
```

### Styles

MapleResolver directive resolution automatically imports `@maple-design/ui/ripple/style`. When registering Ripple without the resolver, explicitly import that style in the application entry. Runtime code does not import CSS, so the package can be imported on the server. Unmounting or disabling cancels pending animations; keyboard state belongs to each instance.

## API

### Options

| Arguments | Description | Type | Default |
| --- | --- | --- | --- |
| `color` | `currentColor` | _string_ | `currentColor` |
| `disabled` | Whether to disable link | _boolean_ | `false` |

### Style variables

The following CSS variables support customization with [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--mp-ripple-cubic-bezier` | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` |
| `--mp-ripple-color` | `currentColor` |

### Managed defaults

| Token | Default |
| --- | --- |
| `--mp-ripple-cubic-bezier` | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` |

### Motion variables

| Token | Default |
| --- | --- |
| `--mp-ripple-expand-duration` | `200ms` |
| `--mp-ripple-fade-duration` | `140ms` |

expand-duration controls transform expansion; cubic-bezier controls its easing. fade-duration controls linear opacity appearance/disappearance. Put variables on the actual directive host so generated ripples inherit them. color overrides ripple-color. Both platforms default to 200ms/140ms.

250ms is the minimum display/post-fade cleanup wait, not visual duration or the complete lifecycle. Runtime reads computed ripple duration/delay. Fade starts no earlier than the later of creation+250ms or activation+expansion duration; deletion waits max(250ms, fade duration). 600ms/800ms overrides are not truncated. 0ms/unstyled cases retain cleanup floors. prefers-reduced-motion: reduce hides decorative ripples without changing host events. Expansion is sampled at creation/activation; fade at fade start. Arbitrary midphase CSS changes/custom animations are not guaranteed.

Repeated release does not duplicate work. Disabling/unmounting cleans owned timers/direct child ripples without removing nested instances. Document listeners bind to the mount-time ownerDocument; rebinding after cross-document movement is out of scope. Enter/Space activate on this host and end only on matching keyup/blur. Plain divs must provide their own interactive semantics, keyboard behavior and accessible names; v-ripple supplies none. Real touch devices and live OS-preference switching remain unvalidated.

### Independent source-copy directives

Cedar/Maple independently maintain matching directive bodies, animation and keyboard lifecycles, adapting local dependencies, namespaces and token defaults only. Copy checks compile both actual style entries and check declarations/consumers without mistaking style imports for runtime differences.
