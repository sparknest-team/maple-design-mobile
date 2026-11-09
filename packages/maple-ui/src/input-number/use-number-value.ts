import { computed, nextTick, onDeactivated, onScopeDispose, ref, watch, type Ref } from 'vue'
import { invokeBeforeCommit } from '../_components/field-presentation/context'
import { useActionGuard } from '../_hooks/use-action-guard'
import { resolveEmptyValue, useEmptyValues } from '../utils/empty-value'
import { roundNumber, stepNumber, type StepMethod } from './number-arithmetic'
import {
  clampNumber,
  formatNumberValue,
  getNumberPrecision,
  parseNumberInput,
  resolveNumberBounds,
} from './number-value'
import type { InputNumberProps } from './props'

export interface NumberEvents {
  update: (value: number | null | undefined) => void
  input: (value: number | null | undefined, text: string, event: Event) => void
  change: (value: number | null | undefined, event: Event) => void
  clear: (event: Event) => void
  step?: (value: number, direction: StepMethod, event: Event) => void
  commitError?: (error: unknown) => void
}

export function useNumberValue(props: Readonly<InputNumberProps>, blocked: Ref<boolean>, events: NumberEvents) {
  const guard = useActionGuard()
  const bounds = computed(() => resolveNumberBounds(props.min, props.max))
  let queuedCommit: Event | undefined
  let requestGeneration = 0
  const finite = (value: number | null | undefined): number | null | undefined =>
    value === null ? null : clampNumber(value, -Infinity, Infinity)
  const local = ref(finite(props.defaultValue))
  const controlled = computed(() => props.modelValue !== undefined)
  const model = computed(() => (controlled.value ? finite(props.modelValue) : local.value))
  const emptyPolicy = useEmptyValues(props, [undefined, null])
  const precision = computed(() => getNumberPrecision(props.step ?? 1, props.precision))
  const format = (value: number | null | undefined) => {
    const text = formatNumberValue(emptyPolicy.isEmpty(value) ? undefined : value, precision.value)
    return text === '' ? '' : (props.formatter?.(text) ?? text)
  }
  const text = ref(format(model.value))
  const number = ref(model.value)
  let raw = model.value == null ? '' : String(model.value)
  let dirty = false
  let lastCommitted = model.value
  let pending = false
  let pendingValue: number | null | undefined
  let revision = 0

  function restore() {
    text.value = format(model.value)
    number.value = model.value
    raw = model.value == null ? '' : String(model.value)
    lastCommitted = model.value
    dirty = false
  }
  function update(value: number | null | undefined) {
    pending = true
    pendingValue = value
    if (!controlled.value) {
      local.value = value
    }
    events.update(value)
  }
  function restoreAfterCommit() {
    const current = ++revision
    nextTick(() => {
      if (current === revision) {
        restore()
        pending = false
      }
    })
  }
  function legal(value: number | null | undefined) {
    const clamped = clampNumber(value ?? undefined, bounds.value.min, bounds.value.max)
    return clamped === undefined
      ? undefined
      : clampNumber(roundNumber(clamped, precision.value), bounds.value.min, bounds.value.max)
  }
  function edit(value: string, event: Event) {
    if (blocked.value || props.disableInput || guard.pending.value) {
      return
    }
    const parsed = parseNumberInput(value, props.parser)
    if (!parsed.intermediate && parsed.number === undefined) {
      return
    }
    revision += 1
    dirty = true
    raw = parsed.text
    text.value = raw === '' ? '' : (props.formatter?.(raw) ?? raw)
    number.value = parsed.number
    events.input(parsed.number, text.value, event)
    if (props.modelEvent === 'input' && (raw === '' || !parsed.intermediate)) {
      request(parsed.number, event, () => {
        update(parsed.number)
        if (queuedCommit && Object.is(legal(parsed.number), parsed.number)) {
          const commitEvent = queuedCommit
          queuedCommit = undefined
          submit(parsed.number, commitEvent)
        }
        return true
      })
    }
  }
  function request(value: number | null | undefined, event: Event, publish: () => boolean) {
    if (guard.pending.value) {
      return false
    }
    if (!props.beforeCommit || Object.is(value, model.value)) {
      return publish()
    }
    const previousValue = model.value
    const hook = props.beforeCommit
    const generation = requestGeneration
    void guard
      .run(value, (next, { signal }) => invokeBeforeCommit(hook, next, { previousValue, signal }), event)
      .then((outcome) => {
        if (generation !== requestGeneration || blocked.value) {
          return
        }
        if (outcome.status === 'allowed') {
          publish()
          if (queuedCommit) {
            const commitEvent = queuedCommit
            queuedCommit = undefined
            commit(commitEvent)
          }
        } else if (outcome.status === 'rejected' || outcome.status === 'error') {
          queuedCommit = undefined
          restore()
          if (outcome.status === 'error') {
            events.commitError?.(outcome.error)
          }
        }
      })
    return false
  }
  function cancelCommit() {
    requestGeneration += 1
    queuedCommit = undefined
    guard.cancel()
  }
  onScopeDispose(cancelCommit)
  onDeactivated(() => {
    cancelCommit()
    restore()
  })
  function submit(value: number | null | undefined, event: Event) {
    const changed = !Object.is(value, lastCommitted)
    text.value = format(value)
    number.value = value
    raw = value === undefined ? '' : String(value)
    dirty = false
    if (!Object.is(value, model.value)) {
      update(value)
    }
    lastCommitted = value
    if (changed) {
      events.change(value, event)
    }
    restoreAfterCommit()
    return changed
  }
  function commit(event: Event) {
    if (guard.pending.value) {
      queuedCommit = event
      return
    }
    if (blocked.value) {
      restore()
      return
    }
    if (!dirty) {
      restore()
      return
    }
    // A trailing decimal point is a valid completed number; a lone sign/dot isn't.
    const value = raw === '' ? undefined : Number(raw)
    if (value !== undefined && (!Number.isFinite(value) || raw.trim() === '')) {
      restore()
      return
    }
    const candidate = legal(value)
    request(candidate, event, () => submit(candidate, event))
  }
  const isMin = computed(() => number.value != null && number.value <= bounds.value.min)
  const isMax = computed(() => number.value != null && number.value >= bounds.value.max)
  function step(method: StepMethod, event: Event) {
    const amount = props.step ?? 1
    const unavailable =
      method === 'plus'
        ? props.disableIncrement || props.incrementButton === false
        : props.disableDecrement || props.decrementButton === false
    if (
      blocked.value ||
      guard.pending.value ||
      unavailable ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      (method === 'plus' ? isMax.value : isMin.value)
    ) {
      return false
    }
    const start = emptyPolicy.isEmpty(number.value) ? undefined : number.value
    const candidate =
      start == null
        ? legal(bounds.value.min === -Infinity ? 0 : bounds.value.min)
        : legal(stepNumber(start, amount, method))
    if (candidate === undefined) {
      return false
    }
    return request(candidate, event, () => {
      const changed = submit(candidate, event)
      if (changed) {
        events.step?.(candidate, method, event)
      }
      return changed
    })
  }
  function clear(event: Event) {
    if (blocked.value || guard.pending.value || props.disableInput || !props.clearable || text.value === '') {
      return
    }
    const cleared = resolveEmptyValue(props, undefined)
    request(cleared, event, () => {
      events.clear(event)
      const changed = !Object.is(cleared, model.value)
      revision += 1
      dirty = false
      raw = cleared === undefined ? '' : String(cleared)
      text.value = format(cleared)
      number.value = cleared
      events.input(cleared, text.value, event)
      update(cleared)
      if (changed) {
        events.change(cleared, event)
      }
      lastCommitted = cleared
      restoreAfterCommit()
      return true
    })
  }
  watch(
    () => props.modelValue,
    (value) => {
      if (value === undefined) {
        local.value = undefined
      }
      if (pending && Object.is(value, pendingValue)) {
        pending = false
        if (dirty) {
          return
        }
      }
      cancelCommit()
      revision += 1
      restore()
    },
    { flush: 'sync' },
  )
  watch(
    () => [
      props.min,
      props.max,
      props.precision,
      props.step,
      props.formatter,
      props.parser,
      props.beforeCommit,
      props.emptyValue,
      emptyPolicy.emptyValues.value?.slice(),
      props.modelEvent,
      props.disableInput,
      props.disableIncrement,
      props.disableDecrement,
      props.incrementButton,
      props.decrementButton,
    ],
    () => {
      const wasPending = guard.pending.value
      cancelCommit()
      if (wasPending) {
        restore()
      }
      // Configuration changes are not user edits and never write back to a form.
      if (!dirty) {
        restore()
      }
    },
    { flush: 'sync' },
  )
  watch(
    blocked,
    (value) => {
      if (value) {
        cancelCommit()
        revision += 1
        restore()
      }
    },
    { flush: 'sync' },
  )
  return { bounds, text, number, isMin, isMax, edit, commit, step, clear, commitPending: guard.pending }
}
