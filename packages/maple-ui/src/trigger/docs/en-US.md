# Trigger

A style-agnostic floating-layer primitive that manages trigger events, positioning, teleporting, and open state. Popover, Menu, Select, and related components are built on Trigger.

Trigger does not render a host DOM element. It binds trigger behavior to the first valid element in the default slot, while the `content` slot renders the floating content.

## Shared contract

| Prop | Contract |
| --- | --- |
| open | Boolean state; update:open requests a change |
| popupContainer | CSS selector, HTMLElement or false (inline); undefined defaults to body |
| placement | top/bottom/left/right, each optionally suffixed with -start/-end |
| cover | Boolean, false by default; covers the reference without extra placement values |
| autoFitPopupWidth | Matches the reference width |
| closeOnClickReference | Closes on a repeated reference click |
| popupStyle | Positioning container style, not content panel style |

open/close signal actual transition starts; opened/closed signal transition completion, including externally driven state changes.
update:open and open-change request a state change; they do not replace lifecycle notifications. Outside clicks emit click-outside.

## Migration and platform extensions

Cedar placement abbreviations tl/tr/bl/br/lt/lb/rt/rb become top-start/top-end/bottom-start/bottom-end/left-start/left-end/right-start/right-end.
Maple cover-top/bottom/left/right become bottom/top/right/left plus cover=true, preserving -start/-end suffixes.
Cover moves the popup inward by the reference's main-axis dimension.

Container priority is explicit top-level popupContainer (including false), then nested triggerProps/popupProps/pickerProps, then body.
Selectors resolve after client mounting; missing or invalid selectors warn and fall back to body. SSR does not require document or HTMLElement.
For asynchronously created containers, update the bound value after creating the container.

Cedar popupOffset is an outward main-axis distance and popupTranslate is a planar translation; Maple offsetX/offsetY use screen axes.
These are not aliases. Cedar retains trigger arrays, focus and delay extensions; Maple retains Popper strategy and a separate reference.
Popover and Menu forward cover.

## Foundation contract alignment

`open` is controlled; use `default-open` for an initially open uncontrolled popup, or accept updates through `v-model:open`. SVG icons and fragment component roots work directly as trigger elements. Only the state and reference foundations are aligned in this batch; positioning and full API alignment remain pending.

## Shared interaction contract (2026-09-08)

Trigger defaults to hover with 100 ms enter/leave delays. It accepts hover, click, focus, contextMenu, manual, and arrays. focusDelay defaults to 0. popupHoverStay, blurToClose, closeOnClickReference, clickOutsideToClose, escToClose and restoreFocus default to true.

reference accepts a selector or HTML/SVG element; setReference(undefined) restores the prop/slot target. Both libraries expose open, close, resize, getReference, setReference, allowClose and isTopLayer.

Outside dismissal uses click. Only the top layer handles each event, including backdrop clicks and Escape; nested teleported content remains internal. Controlled requests do not change visibility or move focus until accepted. Maple Menu/Popover keep their click defaults and zero hover delays, and Tooltip keeps zero hover delay. Direct Trigger users can retain the previous behavior with explicit trigger="click" and closeOnClickReference=false. Positioning engines and renderers remain platform adapters.

## Rendering and transitions

The shared renderer separates positioning, transition and content layers. `popupClass/popupStyle` target positioning; `contentClass/contentStyle` target content. `showArrow` defaults to false; `arrowClass/arrowStyle` customize the decorative arrow.

`unmountOnClose` defaults to **true**: content is created on first open and removed after leave finishes. Set it to false to retain content state. `duration` accepts milliseconds or `{ enter, leave }`. `opened/closed` fire once after the corresponding transition finishes; cancelled transitions emit neither completion event. Initially open content also runs its enter transition.

Maple Menu/MenuChildren/Select/Cascader explicitly retain content. Tooltip/Popover default to false and forward unmountOnClose. Popover appearance and popoverClass now target the content layer; popupClass still targets positioning. Direct Trigger users who require persistent content should set unmountOnClose=false.

For standalone Maple arrows, import `@maplejs/maple-ui/trigger/style`. Wrapper style entries include this dependency. Arrow tokens: `--mp-trigger-arrow-bg`, `--mp-trigger-size-arrow-width`, `--mp-trigger-arrow-border-radius`.

`focusReference()` restores focus to the reference without reopening a focus trigger. Menu uses it only after a close request is accepted.
