import type { PropType } from 'vue'
import { computed, defineComponent, inject, onBeforeUnmount, onDeactivated, ref } from 'vue'
import { IconCheck, IconLoading, IconRight } from '@maple-design/icons-vue'
import { isolateEditorForm } from '../_components/field-presentation/form-bridge'
import { isFunction } from '../_utils/is'
import Checkbox from '../checkbox'
import { createNamespace, getPrefixCls } from '../utils/components'
import { CascaderContext, cascaderInjectionKey } from './context'
import type { CascaderOptionInfo } from './types'
import { getCheckedStatus, getOptionLabel } from './utils'

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
    multiple: Boolean,
    checkStrictly: Boolean,
    searchOption: Boolean,
    pathLabel: Boolean,
  },
  setup(props) {
    const prefixCls = getPrefixCls('cascader-option')
    const cascaderCtx = inject<Partial<CascaderContext>>(cascaderInjectionKey, {})

    isolateEditorForm()
    const isLoading = ref(false)
    let request = 0
    const invalidate = () => {
      request++
      isLoading.value = false
    }
    onDeactivated(invalidate)
    onBeforeUnmount(invalidate)
    const handlePathChange = (_event: Event) => {
      if (props.option.disabled || isLoading.value) {
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
        const focused = element.ownerDocument.activeElement
        const focusedOption = focused?.closest<HTMLElement>('[data-cascader-key]')
        const panel = element.closest(`.${getPrefixCls('cascader')}-panel, .${getPrefixCls('cascader')}-editor-panel`)
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
      if (isLoading.value) {
        return <IconLoading class={`${prefixCls}-loading-icon`} />
      }
      if (!props.searchOption && !props.option.isLeaf) {
        return <IconRight class={`${prefixCls}-expand-icon`} />
      }
      return null
    }

    return () => (
      <li
        tabindex="0"
        role="menuitem"
        data-cascader-key={props.option.key}
        aria-disabled={props.option.disabled}
        aria-haspopup={!props.option.isLeaf && !props.searchOption ? 'menu' : undefined}
        aria-expanded={!props.option.isLeaf && !props.searchOption ? props.expanded : undefined}
        title={props.option.label}
        class={cls.value}
        {...events}
      >
        {props.multiple && (
          <span class={`${prefixCls}-checkbox`} onClick={(event: MouseEvent) => event.stopPropagation()}>
            <Checkbox
              editMode="direct"
              uninjectGroupContext
              modelValue={Boolean(checkedStatus.value.checked)}
              indeterminate={checkedStatus.value.indeterminate}
              disabled={props.option.disabled || props.option.selectionDisabled}
              ariaLabel={props.option.label}
              onUpdate:modelValue={(checked: unknown) => {
                if (props.option.disabled || props.option.selectionDisabled) {
                  return
                }
                const task = handlePathChange(new Event('change'))
                cascaderCtx.onClickOption?.(props.option, Boolean(checked))
                return task
              }}
            />
          </span>
        )}
        <div class={`${prefixCls}-label`}>
          <span class={`${prefixCls}-label-content`}>{renderLabelContent()}</span>
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
