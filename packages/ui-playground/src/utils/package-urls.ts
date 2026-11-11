export function getMaplePackageUrls(version: string) {
  if (version === 'preview') {
    return { module: './maple.esm.js', css: './maple.css', touchEmulator: './touch-emulator.js' }
  }
  const suffix = version === 'latest' ? '' : `@${version}`
  return {
    module: `https://esm.sh/@maple-design/ui-vue${suffix}?external=vue`,
    css: `https://cdn.jsdelivr.net/npm/@maple-design/ui-vue${suffix}/es/maple.css`,
    touchEmulator: `https://cdn.jsdelivr.net/npm/@maple-design/touch-emulator-vue${suffix}/iife.js`,
  }
}
