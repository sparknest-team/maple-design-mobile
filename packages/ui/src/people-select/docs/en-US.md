# PeopleSelect

`options` accepts an array or a loader. Each component owns loading, cancellation and stale-result isolation. `fallback-option` synchronously reads independent reactive display data; update that data after a business request to refresh the label and avatar. Avatars come from `avatar`. Optional phone/chat buttons provide consistent presentation while all actions remain application functions.

## Global defaults and local overrides

```ts
import { PeopleSelect, type PeopleSelectProps } from '@maple-design/ui-vue'

PeopleSelect.setPropsDefaults({
  options: (query, { signal }) => peopleService.search(query, signal),
  fallbackOption: (id) => personCache.value[id] ?? { value: id, label: id },
  showPhone: true,
  showChat: true,
  call: (person) => businessPhone.call(person.mobile),
  chat: (person) => businessChat.open(person.value),
} satisfies PeopleSelectProps)
```

```vue
<mp-people-select v-model="personId" />
<mp-people-select v-model="personId" :options="loadMyTeam" :chat="openTeamChat" :show-phone="false" read-pretty />
<mp-people-select v-model="personId" :options="[]" />
```

Local props override global defaults. Arrays, including [], replace a global loader. Phone/chat buttons appear only in read mode and are hidden by default. Without an action function, without a selected person, or when disabled, the action cannot run. Returned Promises drive button loading; rejection emits action-error(error, call|chat). The UI never opens tel: links or imports a chat SDK.

Configure setPropsDefaults once before mounting. It changes the component definition, not an app/tenant-isolated context. For SSR or dynamic tenant defaults, use an application wrapper and props.

## Custom actions

```vue
<mp-people-select v-model="personId" read-pretty>
  <template #actions="{ person, disabled }">
    <business-person-actions :person="person" :disabled="disabled" />
  </template>
</mp-people-select>
```

Priority: actions slot → render-actions → built-in phone/chat buttons. Actions do not open the field editor or change its model.

## Basic examples

### Complete example

<demo src="../example/demos/en-US/injected-services.vue"></demo>

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### PeopleSelect Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| model-value / v-model | string / null | undefined | Controlled person identity; explicit null remains empty. |
| default-value | string | '' | Uncontrolled initial identity, read only at creation. |
| options | readonly PeopleSelectOption[] / PeopleSelectOptionsLoader | undefined | Candidate array or (query, { signal }) loader; explicit arrays take precedence. |
| fallback-option | PeopleSelectFallbackOption | true | Synchronous display fallback; may return a person object; false hides unmatched values. |
| label | string | '' | Reactive display name when the candidate is absent. |
| default-text | string | '-' | Default name text when person information is unavailable. |
| placeholder | string | undefined | Placeholder for the editable field. |
| name | string | undefined | Form name passed to the internal Select. |
| show-avatar | boolean | true | Show the person avatar; retain the name if the image fails. |
| show-phone | boolean | false | Show the phone button in person reading content; disabled without call. |
| show-chat | boolean | false | Show the chat button in person reading content; disabled without chat. |
| call | PeopleSelectAction | undefined | Explicit phone task; a returned Promise keeps that button waiting; failures emit action-error. |
| chat | PeopleSelectAction | undefined | Explicit chat task; a returned Promise keeps that button waiting; failures emit action-error. |
| render-actions | PeopleSelectRenderActions | undefined | Reading action renderer; the actions slot takes precedence. |
| is-label | boolean | false | Person reading entry without an editor field; read uses the same scope as read-pretty. |
| read-pretty | boolean | undefined | Common field reading state, inherited from the form when omitted; does not fetch function candidates. |
| edit-mode | FieldEditMode<br>`'direct' \| 'popup'` | undefined | Field editing entry, inherited from FormItem / Form when omitted, otherwise direct. |
| disabled | boolean | undefined | Inherited from the form when omitted; allows name reads but blocks opening, selection and clearing. |
| readonly | boolean | undefined | Inherited from the form when omitted; retains display reads and blocks editing. |
| filterable | boolean | true | Show the candidate search input. |
| filter-option | FilterOption | undefined | Local filtering policy; function candidates are not filtered again by default; arrays are filtered. |
| case-sensitive | boolean | false | Use case-sensitive built-in local search. |
| search-fields | readonly OptionSearchField[]<br>`OptionSearchField: 'label' \| 'value'` | ['label'] | Candidate fields used by built-in local search; defaults to label. |
| search-delay | number | 500 | Debounce delay in milliseconds for search notifications and requests. |
| clearable | boolean | false | Allow clearing an editable field; deferred modes clear the draft and publish after confirmation. |
| empty-value | string / null / function | '' | Published clear value; explicit null is retained; omission uses an empty string. |
| empty-values | readonly unknown[] | undefined | Empty-value recognition, inherited through field, FormItem and Form. |
| empty-text | string | undefined | Empty reading text; defaults to a dash after inheritance. |
| loading | boolean | false | Manual waiting feedback for the editor field; pauses selection and clearing without covering person reading content. |
| loading-mode | 'default' / 'line' | 'default' | Editor loading indicator; does not rewrite disabled or readonly. |
| before-commit | BeforeFieldCommit | undefined | Deferred confirmation protocol ({ value, previousValue }, done, { signal }); supports boolean returns, Promises or done; a synchronous undefined waits for done. |
| open | boolean | undefined | Controlled open state of the deferred editor. |
| default-open | boolean | false | Initial uncontrolled open state of the deferred editor. |
| popup-container | PopupContainer | undefined | Editor popup mount target: selector, HTMLElement or false. |

### PeopleSelect Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:model-value | value: string / null | Publish the person identity without collecting listener return values. |
| change | value: string / null | Person value change notification. |
| update:open / open-change | open: boolean | Deferred editor open-state notifications. |
| clear | — | Clear action notification; deferred modes still require draft confirmation. |
| search | query: string | Search notification; options explicitly supplies the loader. |
| load-error | error: unknown, source: 'options' | Current candidate read failure notification. |
| action-error | error: unknown, action: 'call' / 'chat' | Explicit phone or chat task failure notification; error listeners are not awaited. |

### PeopleSelect Slots

| Slot | Prop | Description |
| --- | --- | --- |
| default | — | Forward custom Select Option content. |
| read | PeopleSelectReadScope | Both reading entries receive { value, text, person }; empty content can also be customized. |
| actions | PeopleSelectActionScope | Person reading actions with { person, disabled }. |
| option / label | { data: PeopleSelectOption } | Candidate and selected person content; renders name and avatar by default. |
| selected / trigger / prefix / suffix / empty / header / footer | — | Use the same Select slots and their presentation scope. |
| arrow-icon | { focus, menuOpen } | Field arrow icon state. |
| clear-icon | { clear(event?) } | Clear node; call clear to perform the standard clear action. |
| loading-icon / search-icon | — | Field loading or search icon content. |

### PeopleSelect Methods

| Method | Returns | Description |
| --- | --- | --- |
| refresh() | `Promise<void>` | Reload current candidates; pure reading does not fetch; disabled and readonly states allow explicit reads. |
| focus() / blur() | void | Operate the current real editor input; pure reading has no input; disabled deferred fields do not open. |

Disabled and readonly states retain initial candidate reads and explicit refresh to resolve names; ordinary searching, selection and clearing are blocked. Disabled also blocks built-in person actions; readonly does not automatically block business actions in reading content. is-label / read-pretty do not fetch function candidates and use arrays, label, fallback-option or selected cache for display. Manual loading controls editor feedback; reading actions wait for their explicit call / chat functions independently. Ordinary events only notify and do not collect Promises.

Person data is `{ value: string, label: string, avatar?: string, mobile?: string, disabled?: boolean }`.

Optionally pass signal to fetch to cancel stale requests. It is not an HTTP parameter and cannot roll back server operations. Even if signal is ignored, the component isolates stale results. Function results skip secondary local filtering by default; filter-option configures only local matching.

Public types include PeopleSelectReadScope, PeopleSelectSlots, PeopleSelectEmits and existing data, task and instance types, available from the root and people-select entry points.

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.

`fallback-option` is independent of options, returns no Promise and sends no requests. Display prefers a current option, then fallback; false disables display of unmatched values.

### Receiving cancellation signals in business requests

The component creates an AbortController per operation and passes signal to the loader. Business code must forward it through request layers. fetch supports AbortSignal natively; Axios 0.22+ supports signal; ofetch/Ky forward or merge it into fetch. Other wrappers must adapt abort events to their own cancellation methods. Client cancellation cannot undo completed server operations.

```ts
async function loadPeople(query, { signal }) {
  const response = await fetch(`/api/people?q=${encodeURIComponent(query)}`, { signal })
  if (!response.ok) throw new Error('People request failed')
  return response.json()
}

// Axios: preserve signal through your service wrapper.
async function loadWithAxios(query, { signal }) {
  const { data } = await axios.get('/api/people', { params: { q: query }, signal })
  return data
}

// Other fetch wrappers:
const loadWithOfetch = (query, { signal }) => ofetch('/api/people', { query: { q: query }, signal })
const loadWithKy = (query, { signal }) => ky.get('/api/people', { searchParams: { q: query }, signal }).json()
```

[AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) · [Axios cancellation](https://axios-http.com/docs/cancellation) · [ofetch](https://github.com/unjs/ofetch) · [Ky](https://github.com/sindresorhus/ky#cancellation)

### Shared field loading

`loading-mode="line"` uses FieldDecorator's shared loading line; default mode retains the component's existing indicator. Loading does not imply disabled or readonly.

Focus/blur delegate through the current Select reference to the real input. In an editable deferred mode, focus opens the editor first. Disabled, readonly, or reading deferred fields do not open; direct readonly fields remain focusable. is-label has no input and methods do not open an editor. Reopening uses the current target, and disposed methods do not affect other inputs.

Public SelectInstance/SelectExpose and PeopleSelectInstance/PeopleSelectExpose reflect the existing methods. PeopleSelectExpose is available from the root and component subentry. refresh() returns `Promise<void>` and reloads function-based options through the existing protocol; it does not represent completion of saving or business actions.

Editing entry enums retain platform differences: Cedar uses direct / click / dblclick; Maple uses direct / popup.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-people-select-avatar-radius` | `50%` | `border-radius` |
| `--mp-people-select-avatar-size` | `24px` | `height`, `width` |
| `--mp-people-select-content-gap` | `8px` | `gap` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-people-select-avatar-size: 24px;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
