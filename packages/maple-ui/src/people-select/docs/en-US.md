# PeopleSelect

`options` accepts an array or a loader. Each component owns loading, cancellation and stale-result isolation. `fallback-option` synchronously reads independent reactive display data; update that data after a business request to refresh the label and avatar. Avatars come from `avatar`. Optional phone/chat buttons provide consistent presentation while all actions remain application functions.

## Global defaults and local overrides

```ts
import { PeopleSelect, type PeopleSelectProps } from '@maple-design/ui'

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

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit empty-values, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop         | Type               | Default and scope                                                           |
| ------------ | ------------------ | --------------------------------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text   | string             | Field > FormItem > Form > '-'; explicit '' is valid                         |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

| Prop                    | Description                                                  | Default |
| ----------------------- | ------------------------------------------------------------ | ------- |
| v-model / default-value | String ID; null explicitly clears the model                  | — / ''  |
| options                 | Array or (query, { signal }) => array/Promise                | —       |
| fallback-option         | boolean / (id) => PeopleSelectOption                         | true    |
| show-avatar             | Render avatar                                                | true    |
| show-phone / show-chat  | Read-mode phone/chat buttons                                 | false   |
| call / chat             | Application (person) => void/Promise                         | —       |
| render-actions          | ({ person, disabled }) => VNodeChild                         | —       |
| is-label / read-pretty  | Read mode; uses reactive fallback without loading candidates | false   |
| disabled / readonly     | Inherit form state when omitted                              | —       |
| empty-value             | Clear result; accepts null or a factory returning null       | ''      |

Person data is `{ value: string, label: string, avatar?: string, mobile?: string, disabled?: boolean }`.

Optionally pass signal to fetch to cancel stale requests. It is not an HTTP parameter and cannot roll back server operations. Even if signal is ignored, the component isolates stale results. Function results skip secondary local filtering by default; filter-option configures only local matching.

Events: update:model-value, change, clear, search, load-error(error, options), action-error(error, call|chat). Methods: refresh(), focus(), blur(). No separate request prop, external useAsyncData or special provider key is needed.

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

`loading-mode="line"` renders the shared FieldDecorator loading line. The default mode preserves the existing loading indicator. Loading does not implicitly make a field disabled or readonly.
