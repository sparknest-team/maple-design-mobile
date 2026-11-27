// Maple previously published both #/en-US/button and #/button?language=en-US.
export function legacyRoute(hash: string): string | undefined {
  const match = /^#\/(?:(zh-CN|en-US)\/)?([\w-]+)(?:\?([^#]*))?(#.*)?$/.exec(hash)
  if (!match) {
    return
  }
  const params = new URLSearchParams(match[3])
  const lang = (match[1] ?? params.get('language')) === 'en-US' ? 'en-US' : 'zh-CN'
  params.delete('language')
  if (match[2] === 'index') {
    return '/' + lang + '/'
  }
  const aliases: Record<string, string> = { styles: 'style', 'design-tokens': 'designTokens' }
  const query = params.toString()
  return '/' + lang + '/' + (aliases[match[2]] ?? match[2]) + '/' + (query ? '?' + query : '') + (match[4] ?? '')
}
