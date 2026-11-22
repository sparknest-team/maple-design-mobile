import type { Data } from './types'

export const omit = <T extends Data, K extends keyof any>(object: T, path: Array<K>): Omit<T, K> => {
  const result = { ...object }

  for (const item of path) {
    if (item in result) {
      // @ts-expect-error 索引签名不接受 delete 任意键
      delete result[item]
    }
  }

  return result
}
