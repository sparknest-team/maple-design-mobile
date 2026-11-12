import { isNumber, isObject } from '../_utils/is'
import { InputTagFieldNames, TagData, TagDataInfo } from './types'

export const getValueData = (
  value: Array<string | number | TagData>,
  fieldNames: Required<InputTagFieldNames>,
  fallbackOption?: (value: string | number) => TagData | null | undefined,
): TagDataInfo[] => {
  const result: TagDataInfo[] = []
  for (const item of value) {
    if (isObject(item)) {
      result.push({
        raw: item,
        value: item[fieldNames.value],
        label: item[fieldNames.label],
        closable: item[fieldNames.closable],
        tagProps: item[fieldNames.tagProps],
      })
    } else if (value || isNumber(value)) {
      const fallback = fallbackOption?.(item)
      const raw = {
        ...fallback,
        value: item,
        label: fallback?.[fieldNames.label] ?? String(item),
        closable: true,
      }
      result.push({
        raw,
        ...raw,
      })
    }
  }
  return result
}
