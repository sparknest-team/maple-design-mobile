import { useId } from '../utils/vue-compat'
import type { SearchResolvedProps } from './props'

/** One accessible editor; the reference remains the sole native form value carrier. */
export function useSearchInput(
  props: SearchResolvedProps,
  popupActive: () => boolean,
  referenceAttrs: () => Record<string, unknown> = () => ({}),
) {
  const generated = 'search-' + useId()
  const getInputId = () => String(props.inputAttrs?.id ?? referenceAttrs().id ?? generated)
  const getReferenceId = () => (popupActive() ? generated + '-reference' : getInputId())
  const getPopupId = () => (popupActive() ? getInputId() : generated + '-history')
  const getLabel = () => {
    const label = props.ariaLabel ?? props.inputAttrs?.['aria-label'] ?? referenceAttrs()['aria-label'] ?? props.label
    return label == null ? undefined : String(label)
  }
  const getReferenceAttrs = () => ({
    ...props.inputAttrs,
    id: getReferenceId(),
    'aria-label': getLabel(),
    'aria-hidden': popupActive() ? true : props.inputAttrs?.['aria-hidden'],
    tabindex: popupActive() ? -1 : props.inputAttrs?.tabindex,
    'aria-busy': props.loading || props.inputAttrs?.['aria-busy'] || referenceAttrs()['aria-busy'] || undefined,
  })
  const getPopupAttrs = () => ({
    ...props.inputAttrs,
    id: getPopupId(),
    'aria-label': getLabel(),
    // The reference owns successful native submission, including implicit forms.
    // An explicit form attribute still associates editor constraints with that form.
    name: undefined,
    form: popupActive() ? (props.inputAttrs?.form ?? referenceAttrs().form) : '',
    'aria-hidden': popupActive() ? props.inputAttrs?.['aria-hidden'] : true,
    tabindex: popupActive() ? props.inputAttrs?.tabindex : -1,
    'aria-busy': props.loading || props.inputAttrs?.['aria-busy'] || referenceAttrs()['aria-busy'] || undefined,
  })
  return { getReferenceId, getPopupId, getLabel, getReferenceAttrs, getPopupAttrs }
}
