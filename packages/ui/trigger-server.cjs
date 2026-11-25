// Both module formats can load Trigger before the ESM-only SSR renderer is needed.
exports.renderReference = (...args) =>
  import('./trigger-server.mjs').then(({ renderReference }) => renderReference(...args))
