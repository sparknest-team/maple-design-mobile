import type { PropType } from 'vue'
import { computed, defineComponent, inject, onBeforeUnmount, onDeactivated, ref } from 'vue'
import { IconCheck, IconLoading, IconRight } from '@maple-design/icons-vue'
import { isolateEditorForm } from '../_components/field-presentation/form-bridge'
import { isInteractiveAriaRole } from '../_utils/aria-role'
import { isFunction } from '../_utils/is'
import { isEditable } from '../_utils/is-editable'
import Checkbox from '../checkbox/base'
import { createNamespace, getPrefixCls } from '../utils/components'
import { useId } from '../utils/vue-compat'
import { CascaderContext, cascaderInjectionKey } from './context'
import type { CascaderOptionInfo } from './types'
import { getCheckedStatus, getOptionLabel } from './utils'

// Nested controls and nested cascaders own their click; ordinary option content does not.
function ownsOptionClick(event: Event): boolean {
  if (event.defaultPrevented) {
    return false
  }
  const boundary = event.currentTarget
  const path = typeof event.composedPath === 'function' ? event.composedPath() : []
  const elements = path.length
    ? path
    : (() => {
        const result: EventTarget[] = []
        let node = event.target as Node | null
        while (node) {
          result.push(node)
          node = node.parentNode
        }
        return result
      })()
  for (const item of elements) {
    if (item === boundary) {
      break
    }
    const element = item as Element
    if (element?.nodeType !== 1 || typeof element.matches !== 'function') {
      continue
    }
    if (element.hasAttribute('contenteditable') && isEditable(element as HTMLElement)) {
      return false
    }
    const interactiveRole = isInteractiveAriaRole(element.getAttribute('role'))
    if (interactiveRole) {
      return false
    }
    if (element.hasAttribute('tabindex') && (element as HTMLElement).tabIndex >= 0) {
      return false
    }
    if (
      element.matches(
        'li[data-cascader-key], button, a[href], input, select, textarea, summary, audio[controls], video[controls]',
      )
    ) {
      return false
    }
    if (
      element.matches('label') &&
      ((element as HTMLLabelElement).htmlFor || element.querySelector('input, button, select, textarea'))
    ) {
      return false
    }
  }
  return true
}

const { name } = createNamespace('cascader-option')

export default defineComponent({
  name,
  props: {
    option: {
      type: Object as PropType<CascaderOptionInfo>,
      required: true,
    },
    active: Boolean,
    expanded: Boolean,
    childMenuId: String,
    multiple: Boolean,
    checkStrictly: Boolean,
    searchOption: Boolean,
    multipleGroupOption: Boolean,
    pathLabel: Boolean,
    listboxOption: Boolean,
    listboxSelected: Boolean,
    optionId: String,
    tabIndex: { type: Number, default: 0 },
  },
  setup(props) {
    const prefixCls = getPrefixCls('cascader-option')
    const cascaderCtx = inject<Partial<CascaderContext>>(cascaderInjectionKey, {})
    const labelId = `${prefixCls}-${useId()}`

    isolateEditorForm()
    const isLoading = ref(false)
    const isBusy = computed(() => isLoading.value || Boolean(cascaderCtx.isOptionLoading?.(props.option.key)))
    let request = 0
    const invalidate = () => {
      request++
      isLoading.value = false
    }
    onDeactivated(invalidate)
    onBeforeUnmount(invalidate)
    const handlePathChange = (_event: Event) => {
      if (props.option.disabled || isBusy.value) {
        return
      }
      const task = cascaderCtx.expandOption?.(props.option)
      if (!task) {
        return
      }
      const token = ++request
      isLoading.value = true
      return task.finally(() => {
        if (token === request) {
          isLoading.value = false
        }
      })
    }
    const events = {
      onFocusin: () => {
        if (!props.option.disabled) {
          cascaderCtx.setActiveKey?.(props.option.key)
        }
      },
      onMouseenter: (event: Event) => {
        if (props.option.disabled) {
          return
        }
        cascaderCtx.setActiveKey?.(props.option.key)
        if (cascaderCtx.expandTrigger === 'hover') {
          return handlePathChange(event)
        }
      },
      onMouseleave: (event: MouseEvent) => {
        const element = event.currentTarget as HTMLElement
        const nodeRoot = element.getRootNode()
        const focusRoot = 'activeElement' in nodeRoot ? (nodeRoot as Document | ShadowRoot) : element.ownerDocument
        const focused = focusRoot.activeElement
        let focusedOption = focused?.closest<HTMLElement>('[data-cascader-key]')
        const panelSelector = `.${getPrefixCls('cascader')}-panel, .${getPrefixCls('cascader')}-editor-panel`
        const panel = element.closest(panelSelector)
        while (focusedOption && panel?.contains(focusedOption) && focusedOption.closest(panelSelector) !== panel) {
          focusedOption = focusedOption.parentElement?.closest<HTMLElement>('[data-cascader-key]')
        }
        if (
          focusedOption &&
          (element.contains(focusedOption) || panel?.contains(focusedOption)) &&
          focusedOption.getAttribute('aria-disabled') !== 'true'
        ) {
          cascaderCtx.setActiveKey?.(focusedOption.dataset.cascaderKey)
        } else {
          cascaderCtx.setActiveKey?.()
        }
      },
      onClick: (event: Event) => {
        if (!ownsOptionClick(event)) {
          return
        }
        if (props.option.disabled) {
          return
        }
        const task =
          cascaderCtx.expandTrigger !== 'hover' || props.option.isLeaf || props.checkStrictly
            ? handlePathChange(event)
            : undefined
        if (props.option.isLeaf || props.checkStrictly) {
          cascaderCtx.onClickOption?.(props.option, !checkedStatus.value.checked)
        }
        return task
      },
    }

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-active`]: props.active,
        [`${prefixCls}-selected`]: Boolean(checkedStatus.value.checked),
        [`${prefixCls}-indeterminate`]: checkedStatus.value.indeterminate,
        [`${prefixCls}-disabled`]: props.option.disabled,
      },
    ])

    const checkedStatus = computed(() => {
      if (!props.multiple || props.checkStrictly) {
        return {
          checked: cascaderCtx.valueMap?.has(props.option.key),
          indeterminate: false,
        }
      }
      return getCheckedStatus(props.option, cascaderCtx.valueMap)
    })

    const isMenuCheckbox = computed(() => props.multiple && !props.searchOption && !props.option.selectionDisabled)
    const isMenuRadio = computed(
      () => !props.multiple && (props.searchOption || props.option.isLeaf || props.checkStrictly),
    )

    const menuChecked = computed(() => {
      if (isMenuCheckbox.value && checkedStatus.value.indeterminate) return 'mixed'
      if (isMenuCheckbox.value || (isMenuRadio.value && !props.listboxOption)) {
        return Boolean(checkedStatus.value.checked)
      }
    })

    const renderLabelContent = () => {
      if (props.pathLabel) {
        return cascaderCtx?.formatLabel?.(props.option.path.map((item) => item.raw)) ?? getOptionLabel(props.option)
      }
      if (cascaderCtx.slots?.option) {
        return cascaderCtx.slots.option({ data: props.option })
      }
      if (isFunction(props.option.render)) {
        return props.option.render()
      }
      return props.option.label
    }

    const renderIcon = () => {
      if (isBusy.value) {
        return <IconLoading class={`${prefixCls}-loading-icon`} />
      }
      if (!props.searchOption && !props.option.isLeaf) {
        return <IconRight class={`${prefixCls}-expand-icon`} />
      }
      return null
    }

    return () => (
      <li
        tabindex={props.multipleGroupOption ? undefined : props.tabIndex}
        id={props.optionId}
        role={
          props.multipleGroupOption
            ? 'presentation'
            : props.listboxOption
              ? 'option'
              : isMenuCheckbox.value
                ? 'menuitemcheckbox'
                : isMenuRadio.value
                  ? 'menuitemradio'
                  : 'menuitem'
        }
        aria-selected={props.listboxOption ? props.listboxSelected : undefined}
        aria-checked={menuChecked.value}
        data-cascader-key={props.option.key}
        aria-busy={isBusy.value || undefined}
        aria-disabled={props.multipleGroupOption ? undefined : props.option.disabled}
        aria-haspopup={!props.option.isLeaf && !props.searchOption ? 'menu' : undefined}
        aria-expanded={!props.option.isLeaf && !props.searchOption ? props.expanded : undefined}
        aria-controls={!props.option.isLeaf && !props.searchOption && props.expanded ? props.childMenuId : undefined}
        title={props.option.label}
        class={cls.value}
        {...events}
      >
        {props.multiple && (
          <span class={`${prefixCls}-checkbox`} onClick={(event: MouseEvent) => event.stopPropagation()}>
            <Checkbox
              editMode="direct"
              {...(props.searchOption ? {} : { tabindex: -1 })}
              uninjectGroupContext
              modelValue={Boolean(checkedStatus.value.checked)}
              indeterminate={checkedStatus.value.indeterminate}
              disabled={props.option.disabled || props.option.selectionDisabled}
              ariaLabel={props.option.label}
              aria-labelledby={labelId}
              onUpdate:modelValue={(checked: unknown) => {
                if (props.option.disabled || props.option.selectionDisabled) {
                  return
                }
                cascaderCtx.onClickOption?.(props.option, Boolean(checked))
              }}
            />
          </span>
        )}
        <div class={`${prefixCls}-label`}>
          <span id={props.multiple ? labelId : undefined} class={`${prefixCls}-label-content`}>
            {renderLabelContent()}
          </span>
          {renderIcon()}
        </div>
        {!props.multiple && checkedStatus.value.checked && (
          <span class={`${prefixCls}-check`} aria-hidden="true">
            <IconCheck />
          </span>
        )}
      </li>
    )
  },
})
