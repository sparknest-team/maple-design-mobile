import { computed, nextTick, ref, watch, type Ref } from 'vue'
import { roundNumber, stepNumber, type StepMethod } from './number-arithmetic'
import { clampNumber, formatNumberValue, getNumberPrecision, parseNumberInput } from './number-value'
import type { InputNumberProps } from './props'

export interface NumberEvents {
  update: (value: number | undefined) => void
  input: (value: number | undefined, text: string, event: Event) => void
  change: (value: number | undefined, event: Event) => void
  clear: (event: Event) => void
}

export function useNumberValue(props: Readonly<InputNumberProps>, blocked: Ref<boolean>, events: NumberEvents) {
  const finite = (value: number | undefined) => clampNumber(value, -Infinity, Infinity)
  const local = ref(finite(props.defaultValue))
  const controlled = computed(() => props.modelValue !== undefined)
  const model = computed(() => (controlled.value ? finite(props.modelValue) : local.value))
  const precision = computed(() => getNumberPrecision(props.step ?? 1, props.precision))
  const format = (value: number | undefined) => {
    const text = formatNumberValue(value, precision.value)
    return text === '' ? '' : (props.formatter?.(text) ?? text)
  }
  const text = ref(format(model.value))
  const number = ref(model.value)
  let raw = model.value === undefined ? '' : String(model.value)
  let dirty = false
  let lastCommitted = model.value
  let pending = false
  let pendingValue: number | undefined
  let revision = 0

  function restore() {
    text.value = format(model.value)
    number.value = model.value
    raw = model.value === undefined ? '' : String(model.value)
    lastCommitted = model.value
    dirty = false
  }
  function update(value: number | undefined) {
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
  function legal(value: number | undefined) {
    const clamped = clampNumber(value, props.min ?? -Infinity, props.max ?? Infinity)
    return clamped === undefined
      ? undefined
      : clampNumber(roundNumber(clamped, precision.value), props.min ?? -Infinity, props.max ?? Infinity)
  }
  function edit(value: string, event: Event) {
    if (blocked.value) {
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
      update(parsed.number)
    }
  }
  function submit(value: number | undefined, event: Event) {
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
    submit(legal(value), event)
  }
  const isMin = computed(() => number.value !== undefined && number.value <= (props.min ?? -Infinity))
  const isMax = computed(() => number.value !== undefined && number.value >= (props.max ?? Infinity))
  function step(method: StepMethod, event: Event) {
    const amount = props.step ?? 1
    if (blocked.value || !Number.isFinite(amount) || amount <= 0 || (method === 'plus' ? isMax.value : isMin.value)) {
      return false
    }
    const start = number.value
    const candidate =
      start === undefined
        ? legal(props.min === undefined || props.min === -Infinity ? 0 : props.min)
        : legal(stepNumber(start, amount, method))
    if (candidate === undefined) {
      return false
    }
    return submit(candidate, event)
  }
  function clear(event: Event) {
    if (blocked.value || !props.clearable || text.value === '') {
      return
    }
    revision += 1
    dirty = false
    raw = ''
    text.value = ''
    number.value = undefined
    events.input(undefined, '', event)
    update(undefined)
    events.change(undefined, event)
    lastCommitted = undefined
    events.clear(event)
    restoreAfterCommit()
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
      revision += 1
      restore()
    },
  )
  watch(
    () => [props.min, props.max, props.precision, props.step, props.formatter],
    () => {
      // Configuration changes are not user edits and never write back to a form.
      if (!dirty) {
        restore()
      }
    },
  )
  watch(blocked, (value) => {
    if (value) {
      revision += 1
      restore()
    }
  })
  return { text, number, isMin, isMax, edit, commit, step, clear }
}
