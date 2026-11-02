<!-- Source: src/people-select/docs/en-US.md; locale: en-US; page: /en-US/people-select -->

# PeopleSelect

`options` accepts an array or a loader. Each component owns loading, cancellation and stale-result isolation. `resolve` independently resolves a selected ID. Avatars come from `avatar`. Optional phone/chat buttons provide consistent presentation while all actions remain application functions.

## Global defaults and local overrides

```ts
import { PeopleSelect, type PeopleSelectProps } from '@maple-design/ui'
PeopleSelect.setPropsDefaults({
  options: (query, { signal }) => peopleService.search(query, signal),
  resolve: (id, { signal }) => peopleService.get(id, signal),
  showPhone: true,
  showChat: true,
  call: person => businessPhone.call(person.mobile),
  chat: person => businessChat.open(person.value),
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

## Complete example

Example source: src/people-select/example/demos/en-US/injected-services.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const personId = ref<string | null>('alice')
const log = ref('')
const people = [
  {
    value: 'alice',
    label: 'Alice',
    mobile: '13800000000',
    avatar:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24"%3E%3Ccircle cx="12" cy="12" r="12" fill="%236579af"/%3E%3C/svg%3E',
  },
  { value: 'bob', label: 'Bob', mobile: '13900000000' },
]
const options = async (query: string) =>
  people.filter((person) => person.label.toLowerCase().includes(query.toLowerCase()))
const resolve = async (id: string) => people.find((person) => person.value === id)
async function call(person: { value: string; mobile?: string }) {
  log.value = `Call: ${person.mobile || person.value}`
}
async function chat(person: { value: string }) {
  log.value = `Chat: ${person.value}`
}
</script>
<template>
  <mp-space direction="column">
    <mp-people-select v-model="personId" :options="options" :resolve="resolve" clearable :empty-value="null" />
    <mp-people-select
      v-model="personId"
      :resolve="resolve"
      show-phone
      show-chat
      :call="call"
      :chat="chat"
      read-pretty
    />
    <p role="status">{{ log }}</p>
  </mp-space>
</template>
```

## API

| Prop | Description | Default |
|---|---|---|
| v-model / default-value | String ID; null explicitly clears the model | — / '' |
| options | Array or (query, { signal }) => array/Promise | — |
| resolve | (id, { signal }) => person/undefined/Promise | — |
| show-avatar | Render avatar | true |
| show-phone / show-chat | Read-mode phone/chat buttons | false |
| call / chat | Application (person) => void/Promise | — |
| render-actions | ({ person, disabled }) => VNodeChild | — |
| is-label / read-pretty | Read mode; resolves selection without loading candidates | false |
| disabled / readonly | Inherit form state when omitted | — |
| empty-value | Clear result; accepts null or a factory returning null | '' |

Person shape: `{ value: string, label: string, avatar?: string, mobile?: string, disabled?: boolean }`.

Pass signal to fetch to cancel obsolete work. It is not a payload or a server rollback. Ignored signals still cannot let old results overwrite newer results. Loader results are not locally filtered again by default. filter-option configures local matching only.

Events: update:model-value, change, clear, search, load-error(error, options|resolve), action-error(error, call|chat). Methods: refresh(), focus(), blur(). No separate request prop, mandatory useAsyncData, or dedicated provider key.


`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes null unchanged; omitted values preserve the existing default. Editors render null as blank without converting ordinary empty-string input to null. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.
