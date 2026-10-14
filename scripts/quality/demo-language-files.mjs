// Directory-based translations keep their existing precedence. Flat demos may
// supply a language suffix; a plain file is the fallback, not a second example.
export function demoFilesForLanguage(demoFiles, language) {
  const localized = demoFiles.filter((file) => file.startsWith(`${language}/`))
  if (localized.length) {
    return localized
  }
  const common = demoFiles.filter((file) => !/^(?:zh-CN|en-US)\//.test(file))
  const available = new Set(common)
  const logicalNames = new Set(common.map((file) => file.replace(/\.(?:zh-CN|en-US)\.vue$/, '.vue')))
  return [...logicalNames]
    .flatMap((file) => {
      const translation = file.replace(/\.vue$/, `.${language}.vue`)
      return available.has(translation) ? [translation] : available.has(file) ? [file] : []
    })
    .sort()
}
