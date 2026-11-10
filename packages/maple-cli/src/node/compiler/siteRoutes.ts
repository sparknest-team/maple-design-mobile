/** Join route groups without emitting array holes when a group is empty. */
export function joinSiteRoutes(...groups: string[][]): string {
  return groups.flat().join(',\n')
}

/** Documentation redirects stay within the same site and locale. */
export function documentationRedirect(markdown: string): string | undefined {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(markdown)?.[1]
  return frontmatter?.match(/^redirectTo:\s*(\/(?:zh-CN|en-US)\/[\w-]+)\s*$/m)?.[1]
}
