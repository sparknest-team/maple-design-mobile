/** Stable explicit form prefix for field container IDs, including nested paths. */
export const getFormElementId = (prefix: string | undefined, field: string) => {
  const id = field.replace(/[[.]/g, '_').replace(/\]/g, '')
  return prefix ? `${prefix}-${id}` : `${id}`
}
