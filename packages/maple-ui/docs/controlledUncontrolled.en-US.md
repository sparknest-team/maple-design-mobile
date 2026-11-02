# Controlled state, defaults and clear values: learn by interaction

Start with Input behavior, then expand v-model and finally examine emptyValue. This guide describes current workspace behavior; the proposed unified contract is discussed separately at the end.

Register components and include styles as described in Quick Start. Each complete Vue example is independent. Input examples explicitly use `edit-mode="direct"` so popup confirmation drafts do not obscure ownership.

## 1. Separate the questions

| Question                                | What determines it?                          | Example                                                |
| --------------------------------------- | -------------------------------------------- | ------------------------------------------------------ |
| Who decides the final current value?    | modelValue and the component ownership check | Parent supplies A, rejects B, final value remains A    |
| Is this only an initial value?          | defaultValue                                 | Start with Hangzhou, let the user change it later      |
| What value does a clear action propose? | emptyValue, written empty-value in templates | null, an empty string, or a configured value           |
| Does a value look empty?                | Component type, options and formatting       | Input renders null as blank, but EMPTY as literal text |

Controlled means the parent owns the final value. It does not mean disabled, unfocusable, without input events, or stored on a server. The parent is the Vue component containing `<mp-input ... />`; its ref or form object holds the external state.

emptyValue answers the clear-output question. It does not automatically answer ownership or empty-value recognition. It is not a list of values considered empty.

## 2. Uncontrolled: provide a seed, let the component store later edits

```vue
<script setup lang="ts">
import { ref } from 'vue'

const seed = ref('Hangzhou')
const instanceKey = ref(0)
const lastRequest = ref<string | null>()
function record(next: string | null) {
  lastRequest.value = next
}
</script>

<template>
  <mp-input :key="instanceKey" :default-value="seed" edit-mode="direct" @update:model-value="record" />
  <p>Initial seed: {{ seed }}</p>
  <p>Last update request: {{ JSON.stringify(lastRequest) }}</p>
  <button type="button" @click="seed = 'Beijing'">Change default only</button>
  <button type="button" @click="instanceKey++">Remount</button>
</template>
```

| Action                             | Input text   | Parent seed | Explanation                                                            |
| ---------------------------------- | ------------ | ----------- | ---------------------------------------------------------------------- |
| Mount                              | Hangzhou     | Hangzhou    | The component reads the default                                        |
| Select all and replace with Suzhou | Suzhou       | Hangzhou    | The component stores the edit; recording an event does not modify seed |
| Change default only                | Still Suzhou | Beijing     | Defaults do not overwrite current edits                                |
| Remount                            | Beijing      | Beijing     | The new instance reads the current default                             |

An update listener only observes candidates. Without binding the recorded value back through modelValue, it does not control the component. Initialization does not emit an initial value to populate the parent.

Changing defaultValue is not a reset command. Use controlled binding when the application needs to replace the current value programmatically.

## 3. Controlled and accepting updates

```vue
<script setup lang="ts">
import { ref } from 'vue'

const text = ref<string | null>('A')
</script>

<template>
  <mp-input v-model="text" edit-mode="direct" />
  <p>Parent value: {{ JSON.stringify(text) }}</p>
  <button type="button" @click="text = 'C'">Parent sets C</button>
</template>
```

Select A and replace it with B. Parent text becomes B and the input follows that parent value. Click the button and the parent replaces it with C.

```text
Parent text=A → input receives A
User enters B → component emits update:modelValue(B)
Parent assigns text=B → prop becomes B → final display is B
```

Writing back means assigning the parent's own ref/form field and passing that value down again. The child does not directly modify the parent variable. v-model generates the write-back binding for you. [Vue documentation](https://vuejs.org/guide/components/v-model.html)

## 4. Controlled and rejecting updates

```vue
<script setup lang="ts">
import { ref } from 'vue'

const text = ref<string | null>('A')
const requested = ref<string | null>()
const count = ref(0)
function recordOnly(next: string | null) {
  requested.value = next
  count.value++
  // Deliberately do not assign text.value = next.
}
</script>

<template>
  <mp-input :model-value="text" edit-mode="direct" @update:model-value="recordOnly" />
  <p>Parent value: {{ JSON.stringify(text) }}</p>
  <p>Candidate: {{ JSON.stringify(requested) }}; requests: {{ count }}</p>
</template>
```

Select all of A and try entering B. The candidate becomes B and the counter increases, but parent text stays A. The settled input remains A. Native editing text can appear briefly before the component reconciles; judge the final state after the current update settles.

| Item                | Before | After proposing B |
| ------------------- | ------ | ----------------- |
| Parent text         | A      | A                 |
| Candidate           | None   | B                 |
| Final model/display | A      | A                 |

An update event is not proof of acceptance. The parent can accept, reject or correct a candidate.

For an intentionally non-editable field, use readonly/disabled and their documented focus, copy and event semantics. Ignoring updates here demonstrates ownership; it is not the recommended way to implement readonly UI.

## 5. Accept conditionally

A boolean Switch makes the decision easy to see:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const enabled = ref(false)
const allowUpdate = ref(false)
const requested = ref<string | number | boolean | null>()
function decide(next: string | number | boolean | null) {
  requested.value = next
  if (allowUpdate.value && typeof next === 'boolean') {
    enabled.value = next
  }
}
</script>

<template>
  <label><input v-model="allowUpdate" type="checkbox" />Parent accepts updates</label>
  <mp-switch :model-value="enabled" @update:model-value="decide" />
  <p>Parent value: {{ enabled }}；Candidate: {{ JSON.stringify(requested) }}</p>
</template>
```

With the native checkbox unchecked, clicking Switch proposes true but leaves the parent and Switch false. Enable the checkbox, click again, and the parent accepts true.

This uses Switch's default boolean values. Adapt the parent type and decision if checkedValue/uncheckedValue are customized. When acceptance requires asynchronous work, show pending explicitly so a request is not mistaken for a completed change.

## 6. What does v-model generate?

```html
<mp-input v-model="text" />
```

The corresponding template binding is:

```html
<mp-input :model-value="text" @update:model-value="text = $event" />
```

Script functions assign `text.value = next`; templates unwrap refs automatically.

| Binding                             | Passes an external value? | Writes updates back?                                          | Meaning for strict controlled components |
| ----------------------------------- | ------------------------- | ------------------------------------------------------------- | ---------------------------------------- |
| default-value only                  | No                        | No                                                            | Component stores subsequent values       |
| Update listener only                | No                        | Depends on listener, but not controlling without binding back | Observation                              |
| model-value=A only                  | Yes                       | No                                                            | Final value remains A                    |
| model-value plus recording listener | Yes                       | No                                                            | Observe candidates, keep A               |
| model-value plus assignment handler | Yes                       | Yes                                                           | Parent may filter updates                |
| v-model=text                        | Yes                       | Automatically                                                 | Usually accepts every update             |

For components checking modelValue !== undefined, a v-model ref initialized to undefined still starts uncontrolled. Local proxy exceptions also exist; see section 15.

Adding an update listener to v-model and returning false does not cancel v-model's generated assignment. Use an explicit value binding and handler when rejection matters. Returning false from change is not a guard either. Do not execute the same save twice in both update and change handlers.

## 7. Does emptyValue conflict with controlled state?

The features are compatible. The specific problem is undefined carrying two meanings in a particular binding.

For models using this ownership rule, including Input, InputNumber, Switch, Slider and Select:

```ts
// Conceptual rule, not code users need to add.
const isControlled = modelValue !== undefined
```

An empty string, 0, false and a supported null are defined values. Validity remains component-specific: a defined 0 is not automatically a valid page number.

| Clear candidate | Parent decision                    | Returned modelValue | Result                                             |
| --------------- | ---------------------------------- | ------------------- | -------------------------------------------------- |
| null            | Accept                             | null                | Controlled if null is supported                    |
| Empty string    | Accept                             | Empty string        | Controlled                                         |
| undefined       | Accept unchanged                   | undefined           | Becomes uncontrolled                               |
| undefined       | Normalize to null                  | null                | Remains controlled                                 |
| Any candidate   | Ignore, retain A                   | A                   | Retains the original controlled state              |
| undefined       | Component was already uncontrolled | Unbound             | Internal empty state; no parent control to release |

Do not infer ownership loss from emptyValue alone. The mode changes when the parent actually passes undefined back, not merely when the factory runs or an event is observed.

## 8. The empty-value forms are different

Current resolveEmptyValue behavior uses each component's fallback when no override is provided:

| Configuration                    | Meaning                                                                 |
| -------------------------------- | ----------------------------------------------------------------------- |
| Omitted                          | Component's current default clear output                                |
| `:empty-value="undefined"`       | Same fallback; does not force undefined output                          |
| `:empty-value="() => undefined"` | Explicit undefined output, where the component type permits the factory |
| `:empty-value="null"`            | Explicit null output                                                    |
| `empty-value="EMPTY"`            | Literal EMPTY string, not necessarily a blank display                   |
| `:empty-value="0"`               | Numeric zero, if valid for this component                               |
| `:empty-value="() => []"`        | New empty array, subject to model and business constraints              |

The factory distinguishes absence from an explicit undefined result. Input's clear type is string/null or a matching factory; do not bypass its type to force an unsupported undefined factory. The next undefined example uses InputNumber, which supports it.

Vue binding matters: `empty-value="null"` is a string, while `:empty-value="null"` is null. An unbound `empty-value="0"` is not a numeric binding.

Verified current default paths:

| Component/path                               | Default candidate without an override                   |
| -------------------------------------------- | ------------------------------------------------------- |
| Input clear button                           | Empty string                                            |
| InputNumber clear button                     | undefined                                               |
| Select single without an empty-string option | Usually empty string                                    |
| Select single with a value='' option         | undefined, distinguishing that option from no selection |
| Select multiple                              | Usually []; protected disabled selections may remain    |

This is not an inventory of all component empty-value contracts. Dates, times and panels have additional paths. emptyValue does not bypass disabled/readonly, pending transactions or protected selections.

## 9. Input clears to null and stays controlled

```vue
<script setup lang="ts">
import { ref } from 'vue'

const text = ref<string | null>('A')
const updates = ref<string[]>([])
function accept(next: string | null) {
  updates.value.push(JSON.stringify(next))
  text.value = next
}
</script>

<template>
  <mp-input :model-value="text" :empty-value="null" edit-mode="direct" clearable @update:model-value="accept" />
  <p>Parent value: {{ JSON.stringify(text) }}</p>
  <p>Update log: {{ updates.join(' → ') }}</p>
</template>
```

| Action                               | Candidate    | Parent text  | Display |
| ------------------------------------ | ------------ | ------------ | ------- |
| Mount                                | None         | A            | A       |
| Click clear                          | null         | null         | Blank   |
| Type B                               | B            | B            | B       |
| Select all and delete with Backspace | Empty string | Empty string | Blank   |

null and an empty string look blank but are different model values. Current emptyValue controls the clear action; it does not transform manual deletion into null. If your business requires every empty text value to be null, assign `text.value = next === '' ? null : next` in the parent.

Likewise, an Input configured with literal EMPTY emits and displays EMPTY on clear. A clear button does not guarantee a blank final model.

## 10. Why can undefined clear change ownership?

This example observes current behavior. It is not the recommended configuration for a persistently controlled form.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const quantity = ref<number | null | undefined>(12)
const clearToUndefined = () => undefined
const describe = (value: unknown) => (value === undefined ? 'undefined' : JSON.stringify(value))
const lastRequest = ref('No update yet')
function accept(next: number | null | undefined) {
  lastRequest.value = describe(next)
  quantity.value = next
}
</script>

<template>
  <mp-input-number
    :model-value="quantity"
    :empty-value="clearToUndefined"
    edit-mode="direct"
    clearable
    @update:model-value="accept"
  />
  <p>Parent value: {{ describe(quantity) }}；Candidate: {{ lastRequest }}</p>
  <p>Controlled by the current check: {{ quantity !== undefined }}</p>
</template>
```

| Step                                                     | Parent quantity | quantity !== undefined | Final owner                                      |
| -------------------------------------------------------- | --------------- | ---------------------- | ------------------------------------------------ |
| Initially 12                                             | 12              | true                   | Parent                                           |
| Component proposes undefined, before handling            | Still 12        | true                   | Still parent                                     |
| Parent accepts unchanged                                 | undefined       | false                  | Component                                        |
| Later interaction while parent supplies no defined value | undefined       | false                  | Component may store subsequent values internally |

The trigger is the actual modelValue becoming undefined, not the blank display. A later defined parent value makes it controlled again. Current handoff retention varies between components; do not rely on mode changes for reset.

A ref's declared number/null type does not convert a runtime undefined event into null automatically.

## 11. Recommended: normalize at the parent boundary

```vue
<script setup lang="ts">
import { ref } from 'vue'

const quantity = ref<number | null>(12)
const lastRequest = ref('No update yet')
function acceptNormalized(next: number | null | undefined) {
  lastRequest.value = next === undefined ? 'undefined' : JSON.stringify(next)
  quantity.value = next ?? null
}
</script>

<template>
  <mp-input-number
    :model-value="quantity"
    :empty-value="null"
    edit-mode="direct"
    clearable
    @update:model-value="acceptNormalized"
  />
  <p>组件Candidate: {{ lastRequest }}</p>
  <p>Final parent value: {{ JSON.stringify(quantity) }}</p>
  <p>Controlled by the current check: {{ quantity !== undefined }}</p>
</template>
```

This handles the clear button and other update paths producing undefined: null → null, undefined → null, 0 → 0, other numbers unchanged. The parent's quantity remains defined, preserving final controlled ownership.

Why use a handler as well as empty-value=null? InputNumber's clear-button path calls resolveEmptyValue, while manual deletion followed by commit can directly produce undefined. modelEvent='input' may propose the empty value earlier. emptyValue is not an input parser or a normalizer for every submission path.

Avoid `next || null`, which also discards valid zero. Use `next ?? null` for null/undefined only. Do not apply this nullable-number example to a model such as pagination that does not accept null.

A writable computed setter can perform the same normalization behind v-model; a readonly computed cannot accept assignments. Separate local updates from persistence. Usually update the form synchronously and save on explicit submission; if acceptance must wait for approval, keep the old value and show pending deliberately.

## 12. A valid empty-string option differs from no selection

```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<string | null>(null)
const options = [
  { label: 'All', value: '' },
  { label: 'Enabled only', value: 'enabled' },
]
</script>

<template>
  <mp-select v-model="selected" :options="options" :empty-value="null" edit-mode="direct" clearable />
  <p>Parent value: {{ JSON.stringify(selected) }}</p>
</template>
```

| Action              | Parent selected | Meaning                        |
| ------------------- | --------------- | ------------------------------ |
| Initially           | null            | No selection                   |
| Choose All          | Empty string    | A valid selected option        |
| Choose Enabled only | enabled         | Another valid option           |
| Clear               | null            | No selection, still controlled |

Do not use selected === '' to mean both All and no selection. Element Plus illustrates a similar case but exposes separate empty-values and value-on-clear APIs. Our emptyValue does not automatically provide its empty-values functionality.

For multiple selection, initialize and clear according to the array model. A nullable single-selection example does not imply that every multi-selection should use null. Protected disabled selections can survive clear; emptyValue does not override that rule.

## 13. Value and popup visibility are separate models

```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<string | null>(null)
const panelOpen = ref(false)
const allowClose = ref(true)
const options = [
  { label: 'Hangzhou', value: 'hz' },
  { label: 'Beijing', value: 'bj' },
]
function acceptOpen(next: boolean) {
  if (next || allowClose.value) panelOpen.value = next
}
</script>

<template>
  <label><input v-model="allowClose" type="checkbox" />Accept close requests</label>
  <mp-select
    v-model="selected"
    :open="panelOpen"
    :options="options"
    :empty-value="null"
    edit-mode="direct"
    clearable
    @update:open="acceptOpen"
  />
  <p>Value: {{ JSON.stringify(selected) }}; open: {{ panelOpen }}</p>
  <button type="button" @click="panelOpen = false">Parent closes directly</button>
</template>
```

The value binding accepts updates directly; the visibility handler can reject close requests. Disable Accept close requests: value changes can still be accepted while close requests are ignored. Parent closes directly changes panelOpen itself.

There is no single global controlled flag for the whole component. Each model has its own owner. v-model:open is shorthand for open plus its update assignment.

This example uses Select's direct editing mode. Confirmation presentations additionally own a draft: selecting edits the draft, confirmation submits it and cancellation discards it. A visible draft changing does not prove the committed model is uncontrolled.

## 14. Initialize, reset and serialize form data

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive<{ name: string | null; quantity: number | null }>({
  name: null,
  quantity: null,
})
const payloadText = ref('Not submitted yet')
function updateQuantity(next: number | null | undefined) {
  form.quantity = next ?? null
}
function reset() {
  form.name = null
  form.quantity = null
}
function submit() {
  const payload = {
    name: form.name === null ? undefined : form.name,
    quantity: form.quantity === null ? undefined : form.quantity,
  }
  payloadText.value = JSON.stringify(payload)
}
</script>

<template>
  <mp-input v-model="form.name" :empty-value="null" edit-mode="direct" clearable />
  <mp-input-number
    :model-value="form.quantity"
    :empty-value="null"
    edit-mode="direct"
    clearable
    @update:model-value="updateQuantity"
  />
  <button type="button" @click="reset">Reset parent data</button>
  <button type="button" @click="submit">Build payload</button>
  <p>Payload: {{ payloadText }}</p>
</template>
```

This uses an ordinary reactive object without depending on Form layout/validation APIs. The parent initializes and resets its fields. defaultValue does not populate an empty parent form; initialize form.name directly when a name is required initially.

Serialization maps UI null to undefined object properties, which JSON omits, without changing the UI model itself. If the API expects explicit JSON null, retain null in the payload instead.

UI empty values and transport formats need not match. A backend's omitted-field convention does not require modelValue to be undefined. Empty strings are still sent unchanged in this example; omit them explicitly at the serialization boundary if your business requires it.

## 15. Current exceptions

These describe current behavior, not an implemented target contract:

| Scope                                | Difference                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------------------ |
| Maple ActionSheet.open               | Default useVModel local proxy can change internal state                                    |
| Maple NumberKeyboard.open/modelValue | Both use the default proxy                                                                 |
| Maple FloatingPanel.modelValue       | Proxy anchor plus separate gesture display height                                          |
| Maple Popup with beforeClose         | Internal visible can intercept external open=false and emit update:open(true) on rejection |
| Both Collapse implementations        | Nullish fallback; null falls back internally, use [] to collapse all                       |

For the first three, ignoring update does not guarantee the display remains unchanged. Passing the same external value again may not trigger the proxy watcher. Both libraries have equivalent useVModel helpers, but Input/Switch/Slider manage their own ownership.

InputNumber may retain intermediate text, Input has IME composition, and Popup can retain transition DOM. Distinguish final models from editing/gesture state and animation retention.

## 16. Documentation patterns worth borrowing

These are references for explanation style, not interchangeable APIs, empty values or handoff rules. All examples above were written for our components.

| Reference                                                                                                                            | Useful teaching pattern                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| [Reka controlled state](https://www.reka-ui.com/docs/guides/controlled-state)                                                        | Place explicit write-back, v-model and defaultValue side by side              |
| [React Input](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)                     | Explain ownership through visible reversion when updates are ignored          |
| [Radix async Dialog submission](https://www.radix-ui.com/primitives/docs/components/dialog#close-after-asynchronous-form-submission) | Show why a parent closes only after saving                                    |
| [Element Plus Select empty values](https://element-plus.org/en-US/component/select.html#empty-values)                                | Separate empty recognition and clear output using a valid empty-string option |
| [Naive UI controlled state](https://www.naiveui.com/zh-CN/docs/controlled-uncontrolled)                                              | State how undefined affects ownership explicitly                              |

React's native controlled text input should not receive null/undefined. Our Input supports null and renders it blank. Borrow explanations, not framework-specific empty-value constraints. A value-only binding can also be intentional; it is an error only relative to an expectation of accepting edits.

## 17. Proposed design and existing emptyValue

The unified design is not implemented. The recommendation is parent-owned final state, initialize-only defaults, defined domain values for standard clear output, and separate drafts/gestures/animation.

Retain configurable emptyValue output rather than treating every () => undefined as invalid. It remains useful with explicit parent normalization, published APIs and intentional business behavior. Passing the result back unchanged as undefined must still mean uncontrolled under the chosen predicate.

Audit all empty paths separately: clear buttons, keyboard deletion, panel clearing and Form reset. Fixing the button alone leaves gaps. Changing published default empty values, ownership handoff or proxy behavior requires a versioned migration; changing documentation does not implement that behavior.

## 18. Troubleshooting order

1. Identify the exact state: modelValue, open or a draft.
2. Inspect the actual external value, not only the ref's static type or blank display.
3. Record update candidates and inspect whether/how the parent assigns them.
4. Distinguish clear button, manual deletion, panel confirmation and Form reset.
5. Check whether emptyValue is omitted, null, a string or an undefined-returning factory.
6. Check the proxy/guard exceptions in section 15.

Source references: both libraries' packages/_-ui/src/input/use-input-value.ts, input-number/use-number-value.ts, select/use-select-controller.ts and empty-value helpers; packages/_-use/src/useVModel.ts; Maple's listed proxy components and Popup. Expected-value tables explain audited paths; they are not a claim that every component and browser interaction has been verified.
