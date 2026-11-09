import { computed, ComputedRef, Ref, ref, watch } from 'vue'
import { resolveDirection } from '../../_utils/direction'
import { CascaderOptionInfo } from '../types'

export const useSelectedPath = (
  options: Ref<CascaderOptionInfo[]>,
  {
    optionMap,
    filteredLeafOptions,
    showSearchPanel,
    expandChild,
  }: {
    optionMap: Map<string, CascaderOptionInfo>
    filteredLeafOptions: ComputedRef<CascaderOptionInfo[]>
    showSearchPanel?: ComputedRef<boolean>
    expandChild: Ref<boolean>
  },
) => {
  // active node key
  const activeKey = ref<string>()
  const activeOption = computed(() => {
    if (activeKey.value) {
      return optionMap.get(activeKey.value)
    }
    return undefined
  })

  // selected nodes key
  const selectedPath = ref<string[]>([])

  const displayColumns = computed(() => {
    const columns: CascaderOptionInfo[][] = [options.value]
    for (const key of selectedPath.value) {
      const option = optionMap.get(key)
      if (option?.children) {
        columns.push(option.children)
      }
    }
    return columns
  })

  const setSelectedPath = (key?: string) => {
    const option = getTargetOption(key)
    selectedPath.value = option?.path.map((item) => item.key) ?? []
  }

  const setActiveKey = (key?: string) => {
    activeKey.value = key
  }

  const enabledOptions = computed(() => {
    if (showSearchPanel?.value) {
      return filteredLeafOptions.value.filter((item) => !item.disabled)
    }
    if (activeOption.value && activeOption.value.parent) {
      return activeOption.value.parent.children?.filter((item) => !item.disabled)
    }
    return options.value.filter((item) => !item.disabled)
  })

  // Async candidates may replace the active node without a navigation key.
  watch([options, filteredLeafOptions, () => showSearchPanel?.value], () => {
    if (showSearchPanel?.value) {
      const candidates = filteredLeafOptions.value.filter((item) => !item.disabled)
      if (!candidates.some((item) => item.key === activeKey.value)) {
        activeKey.value = candidates[0]?.key
      }
    } else if (activeKey.value && !optionMap.has(activeKey.value)) {
      activeKey.value = undefined
      selectedPath.value = selectedPath.value.filter((key) => optionMap.has(key))
    }
  })

  const getTargetOption = (key?: string) => {
    let target = key ? optionMap.get(key) : undefined
    if (expandChild.value) {
      while (target && target.children && target.children.length > 0) {
        ;[target] = target.children
      }
    }
    return target
  }

  const getNextActiveNode = (direction: 'next' | 'preview') => {
    const _length = enabledOptions.value?.length ?? 0

    if (activeKey.value) {
      const enabledIndex = enabledOptions.value?.findIndex((item) => item.key === activeKey.value) ?? 0
      if (direction === 'next') {
        return enabledOptions.value?.[(_length + enabledIndex + 1) % _length]
      }
      return enabledOptions.value?.[(_length + enabledIndex - 1) % _length]
    }

    return enabledOptions.value?.[0]
  }

  // Physical arrow direction follows the target's current writing direction.
  const navigateLevel = (event: Event, physicalRight: boolean) => {
    if (showSearchPanel?.value) {
      return
    }
    event.preventDefault()
    const forward = physicalRight !== (resolveDirection(event.target as Element) === 'rtl')
    const node = activeOption.value
    if (!node || node.disabled) {
      return
    }
    if (forward && node.children) {
      setSelectedPath(node.key)
      const child = node.children.find((option) => !option.disabled)
      if (child) {
        setActiveKey(child.key)
      }
    } else if (!forward && node.parent) {
      setSelectedPath(node.parent.key)
      setActiveKey(node.parent.key)
    }
  }

  return {
    activeKey,
    activeOption,
    selectedPath,
    displayColumns,
    setActiveKey,
    setSelectedPath,
    getNextActiveNode,
    navigateLevel,
  }
}
