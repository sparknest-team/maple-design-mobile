export const LANGUAGE_IDS = ['vue', 'typescript', 'javascript', 'javascriptreact', 'typescriptreact']
export const TAG_LINK_RE = /(?<=<mp-)([\w-]+)/g
export const TAG_BIG_CAMELIZE_RE = /(?<=<Mp)([\w-]+)/g
// https://regexr.com/77ppf
export const ATTR_RE = /(?:<(mp-[\w-]+)[^>/]*)|(?:<(Mp[\w-]+)[^>/]*)/g
export const PROP_NAME_RE = /name=['"][\w-]*/
