/** Join route groups without emitting array holes when a group is empty. */
export function joinSiteRoutes(...groups: string[][]): string {
  return groups.flat().join(',\n')
}
