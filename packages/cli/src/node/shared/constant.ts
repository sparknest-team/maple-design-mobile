import { resolve } from 'path'
import { getDirname } from './fsUtils.js'

export const dirname = getDirname(import.meta.url)

export const CWD = process.cwd()
export const MAPLE_CONFIG = resolve(CWD, 'maple.config.mjs')
export const COMPONENT_REUSE_JSON = resolve(CWD, 'component-reuse.json')
export const VITEST_CONFIG = resolve(dirname, '../config/vitest.config.js')
export const SRC_DIR = resolve(CWD, 'src')
export const ES_DIR = resolve(CWD, 'es')
export const LIB_DIR = resolve(CWD, 'lib')
export const UMD_DIR = resolve(CWD, 'umd')
export const TYPES_DIR = resolve(CWD, 'types')

export const VITE_RESOLVE_EXTENSIONS = ['.vue', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs', '.less', '.scss', '.css']
export const PUBLIC_DIR_INDEXES = ['index.vue', 'index.tsx', 'index.ts', 'index.jsx', 'index.js']
export const GENERATORS_DIR = resolve(dirname, '../../../template/generators')
export const UI_PACKAGE_JSON = resolve(CWD, 'package.json')
export const CLI_PACKAGE_JSON = resolve(dirname, '../../../package.json')
export const CHECKLIST_FILE = resolve(CWD, 'CHECKLIST.md')

// site
export const SITE_OUTPUT_PATH = resolve(CWD, 'site')
export const SITE_CONFIG = resolve(CWD, '.maple/site.config.json')

// template highlight
export const HL_DIR = resolve(CWD, 'highlight')
export const HL_COMPONENT_NAME_RE = /.*(\/|\\)(.+)(\/|\\)docs(\/|\\)/
export const HL_API_RE = /##\s*API(?:\r\n|\n)+/

export const HL_EN_TITLE_ATTRIBUTES_RE = /###\s*(?:[A-Za-z][\w-]*[ \t]+)?Props(?:\r\n|\n)+/i
export const HL_EN_TITLE_EVENTS_RE = /###\s*(?:[A-Za-z][\w-]*[ \t]+)?Events(?:\r\n|\n)+/i
export const HL_EN_TITLE_SLOTS_RE = /###\s*(?:[A-Za-z][\w-]*[ \t]+)?Slots(?:\r\n|\n)+/i
export const HL_EN_MD = 'en-US.md'
export const HL_EN_WEB_TYPES_JSON = resolve(HL_DIR, 'web-types.en-US.json')

export const HL_ZH_TITLE_ATTRIBUTES_RE = /###\s*(?:[A-Za-z][\w-]*[ \t]+)?(?:Props|属性)(?:\r\n|\n)+/i
export const HL_ZH_TITLE_EVENTS_RE = /###\s*(?:[A-Za-z][\w-]*[ \t]+)?(?:Events|事件)(?:\r\n|\n)+/i
export const HL_ZH_TITLE_SLOTS_RE = /###\s*(?:[A-Za-z][\w-]*[ \t]+)?(?:Slots|插槽)(?:\r\n|\n)+/i
export const HL_ZH_MD = 'zh-CN.md'
export const HL_ZH_WEB_TYPES_JSON = resolve(HL_DIR, 'web-types.zh-CN.json')

// icons

// extension
export const EXTENSION_ENTRY = resolve(CWD, 'src/extension.ts')
